import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  // alias(@components 등)는 tsconfig.app.json 의 paths 를 단일 출처로 사용한다.
  plugins: [react(), tsconfigPaths({ projects: ['./tsconfig.app.json'] })],
  server: {
    port: 5173,
    open: true,
  },
})
