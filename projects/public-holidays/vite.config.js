import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: resolve(process.cwd(), 'projects/public-holidays'),
  publicDir: resolve(process.cwd(), 'projects/public-holidays/public'),
  build: {
    outDir: resolve(process.cwd(), 'dist/public-holidays'),
    emptyOutDir: true
  },
  server: {
    port: 3001,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'projects/public-holidays/src')
    }
  }
})
