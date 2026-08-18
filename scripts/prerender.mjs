/**
 * Build-time prerenderer.
 *
 * Create React App ships a single empty index.html, which means Google receives
 * a page with no content and no per-route metadata. This script runs after
 * `react-scripts build` and, for every route in src/seo.js:
 *
 *   1. renders the React tree to static HTML
 *   2. injects the route's own <title>, meta, canonical and JSON-LD
 *   3. writes build/<route>/index.html
 *
 * It also emits build/404.html (so unknown URLs return a real 404 rather than
 * a 200 with the homepage) and a sitemap covering every indexable route.
 *
 * Run automatically via the `postbuild` npm script.
 */
import { build } from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const TMP = path.join(ROOT, "node_modules", ".prerender");

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeJsonLd = (obj) =>
  JSON.stringify(obj).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

async function bundleServerEntry() {
  await fs.mkdir(TMP, { recursive: true });
  const outfile = path.join(TMP, "entry-server.cjs");

  await build({
    entryPoints: [path.join(ROOT, "src", "entry-server.jsx")],
    outfile,
    bundle: true,
    format: "cjs",
    platform: "node",
    target: "node18",
    jsx: "automatic",
    logLevel: "silent",
    // Styles are irrelevant to the rendered markup; CRA handles the real CSS.
    loader: { ".css": "empty", ".png": "empty", ".jpg": "empty", ".svg": "empty" },
    // Bundle dependencies rather than leaving them external: react-router-dom v6
    // exposes its server entry as a CJS subpath that Node's ESM loader can't
    // resolve on its own.
    define: { "process.env.NODE_ENV": '"production"' },
  });

  // CJS output: React's server build does a runtime require() of node builtins,
  // which an ESM bundle cannot satisfy.
  const require = createRequire(import.meta.url);
  delete require.cache[outfile];
  return require(outfile);
}

function buildHead({ title, canonical, tags, jsonLd }) {
  const parts = [`<title>${escapeAttr(title)}</title>`];
  parts.push(`<link rel="canonical" href="${escapeAttr(canonical)}"/>`);

  for (const tag of tags) {
    const key = tag.name ? "name" : "property";
    const value = tag.name || tag.property;
    parts.push(`<meta ${key}="${escapeAttr(value)}" content="${escapeAttr(tag.content)}"/>`);
  }

  for (const block of jsonLd) {
    parts.push(`<script type="application/ld+json">${escapeJsonLd(block)}</script>`);
  }

  return parts.join("");
}

function sitemap(routes, meta, site, lastmod) {
  const entries = routes
    .filter((r) => !meta[r].noindex)
    .map((r) => {
      const loc = `${site}${r === "/" ? "/" : r}`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${meta[r].changefreq || "monthly"}</changefreq>`,
        `    <priority>${meta[r].priority || "0.5"}</priority>`,
        "  </url>",
      ].join("\n");
    });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

async function main() {
  const template = await fs.readFile(path.join(BUILD, "index.html"), "utf8");

  const rootTag = /<div id="root">\s*<\/div>/;
  if (!rootTag.test(template)) {
    throw new Error(
      'Could not find an empty <div id="root"></div> in build/index.html.\n' +
        "This step expects a fresh CRA build — run `npm run build` (which calls it\n" +
        "automatically via postbuild) rather than running the prerender on its own."
    );
  }
  if (!template.includes("<head>")) {
    throw new Error("Could not find <head> in build/index.html");
  }

  const mod = await bundleServerEntry();
  const { render, headTagsFor, PRERENDER_ROUTES, ROUTES, SITE } = mod;

  const lastmod = new Date().toISOString().slice(0, 10);
  let count = 0;

  for (const route of PRERENDER_ROUTES) {
    const markup = render(route);
    const head = buildHead(headTagsFor(route));

    const html = template
      .replace("<head>", `<head>${head}`)
      .replace(rootTag, `<div id="root">${markup}</div>`);

    if (route === "/") {
      await fs.writeFile(path.join(BUILD, "index.html"), html);
    } else if (route === "/404") {
      // Vercel serves build/404.html for unmatched paths, with a 404 status.
      await fs.writeFile(path.join(BUILD, "404.html"), html);
    } else {
      const dir = path.join(BUILD, route.replace(/^\//, ""));
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, "index.html"), html);
    }

    const bytes = Buffer.byteLength(markup, "utf8");
    console.log(`  prerendered ${route.padEnd(20)} ${(bytes / 1024).toFixed(1)} kB of markup`);
    count++;
  }

  const xml = sitemap(PRERENDER_ROUTES, ROUTES, SITE, lastmod);
  await fs.writeFile(path.join(BUILD, "sitemap.xml"), xml);
  await fs.writeFile(path.join(ROOT, "public", "sitemap.xml"), xml);

  console.log(`\n  ${count} routes prerendered, sitemap written.\n`);
}

main().catch((err) => {
  console.error("\nPrerender failed:\n", err);
  process.exit(1);
});
