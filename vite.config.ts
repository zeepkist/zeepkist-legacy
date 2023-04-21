import { fileURLToPath, URL } from 'node:url'

import createVuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin({
      reactivityTransform: true
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})
