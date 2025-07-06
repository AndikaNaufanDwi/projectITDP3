import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
  plugins: [react(),tailwindcss({})
  ],
  server: {
    host: true,
    port: 5173, 
    strictPort: true, 
    allowedHosts: [
      '.ngrok-free.app',
    ],
  },
});
