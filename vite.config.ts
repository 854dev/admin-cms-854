import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    assetsDir: 'admin/',
  },
  plugins: [tsconfigPaths(), react()],
  server: {
    host: true,
  },
});
