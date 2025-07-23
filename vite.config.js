// vite.config.ts  (o .js)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin({
      config: './tamagui.config.ts',
      components: ['tamagui'],
      optimize: true,
      reactNative: false      // 👈 evita el alias a preact/compat
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
