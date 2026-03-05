import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        home: {
          type: 'module',
          name: 'home',
          entry: 'http://localhost:3001/remoteEntry.js',
          entryGlobalName: 'home',
          shareScope: 'default',
        },
        dashboard: {
          type: 'module',
          name: 'dashboard',
          entry: 'http://localhost:3002/remoteEntry.js',
          entryGlobalName: 'dashboard',
          shareScope: 'default',
        },
        profile: {
          type: 'module',
          name: 'profile',
          entry: 'http://localhost:3003/remoteEntry.js',
          entryGlobalName: 'profile',
          shareScope: 'default',
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
  server: { port: 3000, strictPort: true, origin: 'http://localhost:3000' },
  preview: { port: 3000, strictPort: true, cors: true },
  build: {
    target: 'chrome89',
  },
})
