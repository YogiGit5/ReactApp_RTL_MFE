import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        home: 'http://localhost:3001/assets/remoteEntry.js',
        dashboard: 'http://localhost:3002/assets/remoteEntry.js',
        profile: 'http://localhost:3003/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: { port: 3000, cors: true, strictPort: true },
  preview: { port: 3000, cors: true, strictPort: true },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
})
