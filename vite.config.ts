import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 关键修复点：将 base 设置为你的新仓库名
  // 这样浏览器就会去 https://memoa.github.io/memoa/ 下寻找资源
  base: '/memoa/',
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
})
