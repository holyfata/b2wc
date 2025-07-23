import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/b2wc/vue-app/',
  plugins: [vue({
    customElement: ["my-vue-element"]
  })],
  server: {
    port: 3001
  }
})
