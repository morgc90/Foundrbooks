// Server entry used only by scripts/prerender.mjs at build time.
// Bundled with esbuild and executed in Node — never shipped to the browser.
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(pathname) {
  return renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>
  );
}

export { headTagsFor, PRERENDER_ROUTES, ROUTES, SITE } from "./seo";
