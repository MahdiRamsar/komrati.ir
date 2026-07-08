// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // فعال‌سازی پریرندر برای تولید صفحات ایستا
    prerender: {
      routes: ["/"], // تمام مسیرهای اصلی که می‌خواهید ایستا شوند
      // اگر مسیرهای دیگری دارید، آنها را به این آرایه اضافه کنید
      // مثال: routes: ["/", "/about", "/contact"]
    },
  },
  vite: {
    // تنظیم مسیر پایه برای GitHub Pages
        build: {
      // خروجی در پوشه dist (پیش‌فرض)
      outDir: 'dist',
      // غیرفعال کردن سورس‌مپ برای کاهش حجم (اختیاری)
      sourcemap: false,
    },
  },
});
