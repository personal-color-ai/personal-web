import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://168.107.53.130:8080',
        changeOrigin: true,
        // 여기가 핵심: 요청 경로에서 '/api'를 빈 문자열('')로 바꿔서 보냄
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      },
    },
  },
});
