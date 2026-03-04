import { useEffect, useRef, useCallback } from 'react'
import 'ol/ol.css'
import OlMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { OSM, XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import type { MapViewProps } from './types'

export function MapView({
  mapType,
  googleApiKey,
  height = '100%',
  width = '100%',
  center = [0, 20],
  zoom = 3,
  unavailableMessage,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<OlMap | null>(null)
  const osmLayerRef = useRef<TileLayer | null>(null)
  const googleLayerRef = useRef<TileLayer | null>(null)

  const applyLayerVisibility = useCallback((type: typeof mapType, key?: string) => {
    const useGoogle = type === 'google' && !!key
    osmLayerRef.current?.setVisible(!useGoogle)

    if (useGoogle && !googleLayerRef.current && mapInstance.current) {
      const googleLayer = new TileLayer({
        source: new XYZ({
          url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        }),
        visible: true,
      })
      googleLayerRef.current = googleLayer
      mapInstance.current.addLayer(googleLayer)
    } else if (googleLayerRef.current) {
      googleLayerRef.current.setVisible(useGoogle)
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    if (!mapInstance.current) {
      const osmLayer = new TileLayer({ source: new OSM() })
      osmLayerRef.current = osmLayer

      const layers: TileLayer[] = [osmLayer]

      if (googleApiKey) {
        const googleLayer = new TileLayer({
          source: new XYZ({
            url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
          }),
          visible: false,
        })
        googleLayerRef.current = googleLayer
        layers.push(googleLayer)
      }

      mapInstance.current = new OlMap({
        target: mapRef.current,
        layers,
        view: new View({
          center: fromLonLat(center),
          zoom,
        }),
      })

      applyLayerVisibility(mapType, googleApiKey)
    } else {
      mapInstance.current.setTarget(mapRef.current)
      applyLayerVisibility(mapType, googleApiKey)
    }

    return () => {
      mapInstance.current?.setTarget(undefined)
    }
  }, [mapType, googleApiKey, center, zoom, applyLayerVisibility])

  if (mapType === 'google' && !googleApiKey) {
    if (unavailableMessage) {
      return <>{unavailableMessage}</>
    }
    return <div style={{ padding: 16 }}>Google Maps API unavailable</div>
  }

  return (
    <div
      ref={mapRef}
      style={{
        height,
        width,
        minHeight: 400,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    />
  )
}
