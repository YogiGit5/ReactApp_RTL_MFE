import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import MapIcon from '@mui/icons-material/Map'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTranslation } from 'react-i18next'
import { MapView } from './MapView'
import ApiKeySettings from './components/ApiKeySettings'

const STORAGE_KEY = 'google-maps-api-key'

type LayerType = 'osm' | 'google'
type ViewType = 'map' | 'settings'

export function MapPage() {
  const { t } = useTranslation()

  const [view, setView] = useState<ViewType>('map')
  const [selectedLayer, setSelectedLayer] = useState<LayerType>('osm')
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem(STORAGE_KEY) || '')

  const handleLayerChange = (e: SelectChangeEvent) => {
    setSelectedLayer(e.target.value as LayerType)
  }

  const handleSettingsBack = useCallback((savedKey?: string) => {
    if (savedKey !== undefined) {
      setApiKey(savedKey)
      if (savedKey) {
        setSelectedLayer('google')
      } else {
        setSelectedLayer('osm')
      }
    }
    setView('map')
  }, [])

  if (view === 'settings') {
    return <ApiKeySettings onBack={handleSettingsBack} />
  }

  const showGoogleNotice = selectedLayer === 'google' && !apiKey
  const mapType = selectedLayer === 'google' ? 'google' as const : 'openstreet' as const

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MapIcon color="primary" />
          <Typography variant="h5" fontWeight={600}>
            {t('modules.map')}
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>{t('map.layerSelector')}</InputLabel>
          <Select value={selectedLayer} label={t('map.layerSelector')} onChange={handleLayerChange}>
            <MenuItem value="osm">{t('map.osm')}</MenuItem>
            <MenuItem value="google">{t('map.google')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {showGoogleNotice && (
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<SettingsIcon />}
              onClick={() => setView('settings')}
            >
              {t('map.configureApiKey')}
            </Button>
          }
        >
          {t('map.googleNotAvailable')}
        </Alert>
      )}

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: 400,
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <MapView
          mapType={mapType}
          googleApiKey={apiKey || undefined}
          unavailableMessage={
            <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              {t('map.googleNotAvailable')}
            </Box>
          }
        />
      </Box>
    </Box>
  )
}
