import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        // Default globPatterns skip jpg — without this the character card/token
        // art (added as real image assets) would silently fall outside the
        // offline precache while everything else in the app stays available.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
      },
      manifest: {
        name: 'Projet Blackout',
        short_name: 'Blackout',
        description: "Jeu de société à jouer entre amis, depuis un téléphone.",
        theme_color: '#14161d',
        background_color: '#14161d',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
})
