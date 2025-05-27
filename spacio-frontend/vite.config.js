import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['2d52-41-90-69-66.ngrok-free.app'],
    proxy: {
      '/api': {
        target: 'http://localhost:6001',
        changeOrigin: true,
      },
    }
  },
})
