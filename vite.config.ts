import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 必须加上这一行，且名字必须是 memoa
  base: '/memoa/',
})
})
