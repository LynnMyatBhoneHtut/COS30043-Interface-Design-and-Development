import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // './' makes every link in the built files relative,
  // so the app works from any folder on Mercury (e.g. .../lab08/)
  base: './'
})
