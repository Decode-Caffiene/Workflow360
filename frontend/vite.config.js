import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ensure this is @tailwindcss/vite

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 plugin
  ],
  // Remove the server proxy temporarily to see if it's a routing/asset issue
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})