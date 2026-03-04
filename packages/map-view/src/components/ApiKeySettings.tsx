import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'google-maps-api-key'

interface ApiKeySettingsProps {
  onBack: (savedKey?: string) => void
}

function validateApiKey(apiKey: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = `https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=1&size=1x1&key=${apiKey}`
  })
}

export default function ApiKeySettings({ onBack }: ApiKeySettingsProps) {
  const { t } = useTranslation()
  const existingKey = localStorage.getItem(STORAGE_KEY) || ''

  const [apiKey, setApiKey] = useState(existingKey)
  const [showKey, setShowKey] = useState(false)
  const [validating, setValidating] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleValidateAndSave = async () => {
    if (!apiKey.trim()) return
    setValidating(true)
    setFeedback(null)

    const isValid = await validateApiKey(apiKey.trim())

    if (isValid) {
      localStorage.setItem(STORAGE_KEY, apiKey.trim())
      setFeedback({ type: 'success', message: t('map.settings.saveSuccess') })
      setTimeout(() => onBack(apiKey.trim()), 1200)
    } else {
      setFeedback({ type: 'error', message: t('map.settings.saveError') })
    }
    setValidating(false)
  }

  const handleRemoveKey = () => {
    localStorage.removeItem(STORAGE_KEY)
    setApiKey('')
    setFeedback({ type: 'success', message: t('map.settings.removeSuccess') })
    setTimeout(() => onBack(''), 1200)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <Box sx={{ mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => onBack()} variant="text">
          {t('map.settings.backToMap')}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Card sx={{ maxWidth: 520, width: '100%' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {t('map.settings.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('map.settings.description')}
            </Typography>

            {existingKey && !feedback && (
              <Alert severity="info" icon={<CheckCircleIcon />} sx={{ mb: 2 }}>
                {t('map.settings.currentKey')}
              </Alert>
            )}

            {feedback && (
              <Alert severity={feedback.type} sx={{ mb: 2 }}>
                {feedback.message}
              </Alert>
            )}

            <TextField
              label={t('map.settings.apiKeyLabel')}
              placeholder={t('map.settings.apiKeyPlaceholder')}
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowKey(!showKey)} edge="end" size="small">
                      {showKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleValidateAndSave}
                disabled={!apiKey.trim() || validating}
                startIcon={validating ? <CircularProgress size={18} /> : undefined}
              >
                {validating ? t('map.settings.validating') : t('map.settings.validateAndSave')}
              </Button>

              {existingKey && (
                <Button variant="outlined" color="error" onClick={handleRemoveKey} disabled={validating}>
                  {t('map.settings.removeKey')}
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
