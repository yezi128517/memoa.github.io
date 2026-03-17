/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 这是让 Tailwind v4 生效的关键
  ],
  // 针对 GitHub Pages 的路径优化
  base: './', 
  build: {
    outDir: 'dist',
    // 确保生成的文件名在缓存刷新时能正确更新
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
})
