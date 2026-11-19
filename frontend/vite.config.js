import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api/v1/events': 'http://127.0.0.1:3000',
      '/api/v1/media': 'http://127.0.0.1:3000',
      '/api/v1/inquiries': 'http://127.0.0.1:3000',
    },
    watch: {
      // Espera a que terminen las escrituras desde Windows sobre WSL antes de recargar.
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 100,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  }
})
