import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // './' makes every link in the built files relative,
  // so the app works from any folder on Mercury (e.g. .../lab10/)
  base: './',
  server: {
    // Only for "npm run dev": Vite can't run PHP, so api/ calls are passed to
    // PHP's own server (php -S localhost:8000 -t public). Not used on Mercury.
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
