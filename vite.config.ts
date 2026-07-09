import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  vite: {
    base: "/",

    build: {
      outDir: "dist",
      sourcemap: false,
      emptyOutDir: true,
    },
  },
});
