import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 改为相对路径，最稳妥的兼容方案
  build: {
    outDir: 'dist',
  }
})
