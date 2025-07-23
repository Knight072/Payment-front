import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin({
      config: './tamagui.config.ts',      // tu archivo de tokens y temas
      components: ['tamagui'],            // paquetes a optimizar
      optimize: true                      // activa el compilador CSS
    })
  ],
  resolve: { alias: { '@': '/src' } }     // alias opcional
})
