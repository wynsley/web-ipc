import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const resource = (path) => fileURLToPath(new URL(path, import.meta.url));

function redirectAdminRoot(server) {
  server.middlewares.use((req, res, next) => {
    const url = req.url ?? "";
    if (url.split("?")[0] !== "/admin") return next();
    res.writeHead(307, { Location: "/admin/" + url.slice("/admin".length) });
    res.end();
  });
}

export default defineConfig({
  base: "/admin/",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "redirect-admin-root",
      configureServer: redirectAdminRoot,
      configurePreviewServer: redirectAdminRoot,
    },
  ],
  server: {
    port: 5174,
    strictPort: true,
    proxy: { "/api/v1": "http://127.0.0.1:3000" },
  },
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@ipc/image": resource("../frontend/src/components/atoms/image.jsx"),
      "@ipc/logo": resource("../frontend/public/LOGO.webp"),
      "@ipc/campus": resource(
        "../frontend/src/assets/images/studentLife/fachada.webp",
      ),
      "@ipc/font": resource(
        "../frontend/src/assets/fonts/Poppins-Regular.woff2",
      ),
      "@ipc/display": resource(
        "../frontend/src/assets/fonts/Rajdhani-Bold.woff2",
      ),
    },
  },
});
