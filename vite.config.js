import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    fs: {
      // Restrict file serving to the project root only.
      allow: [__dirname],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
  // Only scan index.html as entry — prevents Vite from trying to resolve
  // imports in unrelated HTML files (e.g. skills/, upload/ reference files).
  optimizeDeps: {
    entries: ['index.html'],
  },
})
