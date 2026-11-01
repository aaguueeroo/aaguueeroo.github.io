import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { prerenderLanding } from "./scripts/prerenderLanding";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), prerenderLanding()] as any,
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        flatto: "flatto/index.html",
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
