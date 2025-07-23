// vite.config.js  (ESM, porque tu package.json tiene "type":"module")
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

// 👇 utilidades de Node para rutas
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// __dirname compatible con ES-Module
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin({
      config: './tamagui.config.ts',
      components: ['tamagui'],
      optimize: true,
      reactNative: false,   // evita alias autom. a preact/compat
      // aliasReact: false,  // (en versiones nuevas se llama así)
    }),
  ],

  resolve: {
    alias: {
      '@': '/src',

      // 🔒 Forzamos React real para que no vuelva a entrar Preact
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
    },
  },
})
