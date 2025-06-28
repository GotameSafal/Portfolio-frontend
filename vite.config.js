import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "@/components": path.resolve("./src/components"),
      "@/utils": path.resolve("./src/utils"),
      "@/hooks": path.resolve("./src/hooks"),
      "@/assets": path.resolve("./src/assets"),
    },
  },
});
