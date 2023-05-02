import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: mode === "production" ? "https://www.localink.kr/admin/" : "/admin",
    build: {
      sourcemap: true,
    },
    plugins: [tsconfigPaths(), react()],
    server: {
      host: true,
    },
  };
});
