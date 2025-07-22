import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      bundleTypes: true,
      tsconfigPath: path.join(__dirname, './tsconfig.json'),
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: path.join(__dirname, './src/index.ts'),
      name: 'MyVueElement',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
