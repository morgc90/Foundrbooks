import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { headTagsFor } from "../seo";

/**
 * Keeps <head> in sync during client-side navigation.
 *
 * On a prerendered first load the correct tags are already in the HTML
 * (see scripts/prerender.mjs), so this is a no-op that happens to re-assert
 * the same values. It matters for SPA navigation and for `npm start` in dev.
 *
 * Managed nodes are marked data-seo="1" so we only ever replace our own.
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, canonical, tags, jsonLd } = headTagsFor(pathname);
    const head = document.head;

    document.title = title;

    const upsert = (selector, create, attrs) => {
      let el = head.querySelector(selector);
      if (!el) {
        el = create();
        el.setAttribute("data-seo", "1");
        head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    tags.forEach((tag) => {
      const key = tag.name ? "name" : "property";
      const value = tag.name || tag.property;
      upsert(
        `meta[${key}="${value}"]`,
        () => document.createElement("meta"),
        { [key]: value, content: tag.content }
      );
    });

    upsert(
      'link[rel="canonical"]',
      () => document.createElement("link"),
      { rel: "canonical", href: canonical }
    );

    // Structured data: drop ours, re-add for this route.
    head
      .querySelectorAll('script[type="application/ld+json"][data-seo="1"]')
      .forEach((n) => n.remove());

    jsonLd.forEach((block) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "1");
      script.textContent = JSON.stringify(block);
      head.appendChild(script);
    });
  }, [pathname]);

  return null;
}
