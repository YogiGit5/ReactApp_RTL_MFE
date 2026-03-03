export const remotes = {
  // home: 'http://localhost:3001/remoteEntry.js',
  dashboard: 'http://localhost:3002/remoteEntry.js',
  profile: 'http://localhost:3003/remoteEntry.js'
} as const

export type RemoteKey = keyof typeof remotes
