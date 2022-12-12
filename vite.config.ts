/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Emotees',
        short_name: 'Emotees',
        orientation: 'portrait',
        theme_color: '#172e60',
        background_color: '#111827',
        icons: [
          {
            src: '/assets/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/assets/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/assets/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/assets/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            handler: 'StaleWhileRevalidate',
            urlPattern: /\//,
          },
          {
            handler: 'CacheFirst',
            urlPattern: /\/assets/,
            options: {
              cacheName: 'assets',
              expiration: {
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          },
          {
            handler: 'CacheFirst',
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              }
            }
          },
          {
            handler: 'CacheFirst',
            urlPattern: /^https:\/\/twemoji\.maxcdn\.com\/.*/i,
            options: {
              cacheName: 'twemoji-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  }
});
