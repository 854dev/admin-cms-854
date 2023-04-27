import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/* nginx 서버의 /admin 경로에 배포됨 : base 경로에 /admin/ 들어감 */
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: mode === 'production' ? env.VITE_REACT_APP_HOST : '/admin/',
    build: {
      sourcemap: true,
    },
    plugins: [tsconfigPaths(), react()],
    server: {
      host: true,
    },
  };
});
