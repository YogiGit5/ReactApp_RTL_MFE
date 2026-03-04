import type React from 'react'

export interface MapViewProps {
  mapType: 'google' | 'openstreet'
  googleApiKey?: string
  height?: string | number
  width?: string | number
  center?: [number, number]
  zoom?: number
  unavailableMessage?: React.ReactNode
}
