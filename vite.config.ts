import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: mode === "production" ? "https://studio854.blog/admin/" : "/admin",
    build: {
      sourcemap: mode === "production" ? false : true,
    },
    plugins: [tsconfigPaths(), react()],
    server: {
      host: true,
    },
  };
});
