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
      reactNative: false,
      aliasReact: false,
    }),
  ],
  resolve: {
    alias: {
      // 👇 Pega las rutas reales de tus node_modules
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      // por si acaso…
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
      '@': '/src',
    },
  },
})
