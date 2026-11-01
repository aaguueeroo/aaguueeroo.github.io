import { createServer, type Plugin } from "vite";

const HEAD_SLOT = "<!--landing:head-->";
const BODY_SLOT = "<!--landing:body-->";
const RENDER_MODULE = "/src/pages/flatto/landing/render.tsx";

// Fills the slots of flatto/index.html with the landing page's React components, rendered to plain
// HTML. The page ships that HTML and no React, so it's fast and works without JavaScript.
export const prerenderLanding = (): Plugin => ({
  name: "prerender-landing",
  transformIndexHtml: {
    order: "pre",
    handler: async (html, { server: devServer }) => {
      if (!html.includes(BODY_SLOT)) return html;

      // A build has no dev server to load TSX with, so it borrows a short-lived one.
      const server =
        devServer ??
        (await createServer({
          configFile: false,
          appType: "custom",
          logLevel: "error",
          esbuild: { jsx: "automatic" },
          optimizeDeps: { noDiscovery: true },
          server: { middlewareMode: true, hmr: false, watch: null },
        }));

      try {
        const { renderLanding } = await server.ssrLoadModule(RENDER_MODULE);
        const { head, body } = renderLanding();
        return html.replace(HEAD_SLOT, head).replace(BODY_SLOT, body);
      } finally {
        if (!devServer) await server.close();
      }
    },
  },
});
