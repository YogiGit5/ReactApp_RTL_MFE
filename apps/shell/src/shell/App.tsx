import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ErrorBoundary } from './ErrorBoundary'
import ShellLayout from './layout/ShellLayout'
import DemoPage from './pages/DemoPage'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import MapIcon from '@mui/icons-material/Map'

import { MapPage } from '@rtl-monorepo/map-view'

const RemoteHome = lazy(() => import('home/App'))
const RemoteDashboard = lazy(() => import('dashboard/App'))
const RemoteProfile = lazy(() => import('profile/App'))

function WelcomeView() {
  const { t } = useTranslation()

  const modules = [
    { icon: <HomeIcon sx={{ fontSize: 40 }} />, label: t('modules.home'), color: '#42A5F5' },
    { icon: <DashboardIcon sx={{ fontSize: 40 }} />, label: t('modules.dashboard'), color: '#FF6F00' },
    { icon: <PersonIcon sx={{ fontSize: 40 }} />, label: t('modules.profile'), color: '#2E7D32' },
    { icon: <MapIcon sx={{ fontSize: 40 }} />, label: t('modules.map'), color: '#E91E63' },
  ]

  return (
    <Fade in timeout={700}>
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            boxShadow: '0 8px 32px rgba(21, 101, 192, 0.3)',
          }}
        >
          <LocalShippingIcon sx={{ fontSize: 40, color: 'white' }} />
        </Box>

        <Typography variant="h3" fontWeight={700} gutterBottom color="primary.dark">
          {t('app.welcome.heading')}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 2, fontWeight: 400 }}
        >
          {t('app.welcome.subtitle')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 500, mx: 'auto', mb: 6 }}
        >
          {t('app.welcome.description')}
        </Typography>

        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          {t('modules.available')}
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 800, mx: 'auto' }}>
          {modules.map((m) => (
            <Grid item xs={12} sm={4} key={m.label}>
              <Card
                sx={{
                  textAlign: 'center',
                  py: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 12px 36px ${m.color}33`,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: m.color, mb: 1.5 }}>{m.icon}</Box>
                  <Typography variant="h6" fontWeight={600}>{m.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  )
}

function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CircularProgress size={48} />
      <Typography color="text.secondary">Loading module...</Typography>
    </Box>
  )
}

function NotFound() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '5rem', mb: 1 }}>❌</Typography>
        <Typography variant="h4" fontWeight={600} gutterBottom>Page Not Found</Typography>
        <Typography color="text.secondary">The page you're looking for doesn't exist.</Typography>
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <ShellLayout>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<WelcomeView />} />
            <Route path="/home" element={<RemoteHome />} />
            <Route path="/dashboard" element={<RemoteDashboard />} />
            <Route path="/profile" element={<RemoteProfile />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ShellLayout>
  )
}
