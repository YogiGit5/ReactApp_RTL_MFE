import { useTranslation } from 'react-i18next';
import { useDirection } from '@rtl-monorepo/ui-core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import SendIcon from '@mui/icons-material/Send';
import PaletteIcon from '@mui/icons-material/Palette';
import TranslateIcon from '@mui/icons-material/Translate';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function DemoPage() {
    const { t, i18n } = useTranslation();
    const { direction } = useDirection();

    return (
        <Fade in timeout={600}>
            <Box sx={{ py: 2 }}>
                {/* Page Title */}
                <Typography variant="h3" gutterBottom fontWeight={700} color="primary.dark">
                    {t('demo.title')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 700 }}>
                    {t('demo.subtitle')}
                </Typography>

                <Grid container spacing={3}>
                    {/* 1. Theme Showcase */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <PaletteIcon color="primary" />
                                    <Typography variant="h5" fontWeight={600}>
                                        {t('demo.themeSection.title')}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    {t('demo.themeSection.description')}
                                </Typography>
                                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                                    <Button variant="contained" color="primary">
                                        {t('demo.themeSection.primaryBtn')}
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        {t('demo.themeSection.secondaryBtn')}
                                    </Button>
                                    <Button variant="contained" color="success">
                                        {t('demo.themeSection.successBtn')}
                                    </Button>
                                    <Button variant="outlined" color="warning">
                                        {t('demo.themeSection.warningBtn')}
                                    </Button>
                                </Stack>

                                mapType==7 ? <Divider /> : <Divider sx={{ my: 3 }} />

                                {/* Typography Showcase */}
                                <Typography variant="h4" gutterBottom>H4 Heading</Typography>
                                <Typography variant="h5" gutterBottom>H5 Heading</Typography>
                                <Typography variant="h6" gutterBottom>H6 Heading</Typography>
                                <Typography variant="body1" gutterBottom>Body 1 text — Inter font family</Typography>
                                <Typography variant="body2" color="text.secondary">Body 2 secondary text</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* 2. i18n Section */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <TranslateIcon color="primary" />
                                    <Typography variant="h5" fontWeight={600}>
                                        {t('demo.i18nSection.title')}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    {t('demo.i18nSection.description')}
                                </Typography>

                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'background.default',
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={600}>
                                        {t('demo.i18nSection.currentLang')}:
                                    </Typography>
                                    <Chip
                                        label={i18n.language === 'ar' ? t('demo.i18nSection.arabic') : t('demo.i18nSection.english')}
                                        color="primary"
                                        variant="filled"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Paper>

                                <Divider sx={{ my: 3 }} />

                                {/* RTL Section */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <SwapHorizIcon color="primary" />
                                    <Typography variant="h5" fontWeight={600}>
                                        {t('demo.rtlSection.title')}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    {t('demo.rtlSection.description')}
                                </Typography>

                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'background.default',
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={600}>
                                        {t('demo.rtlSection.currentDir')}:
                                    </Typography>
                                    <Chip
                                        label={direction.toUpperCase()}
                                        color={direction === 'rtl' ? 'secondary' : 'primary'}
                                        variant="filled"
                                        sx={{ fontWeight: 700 }}
                                    />
                                </Paper>

                                <Box sx={{ display: 'flex', gap: 2, mt: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <TextField
                                        label={t('demo.rtlSection.inputPlaceholder')}
                                        sx={{ flexGrow: 1, minWidth: 200 }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        endIcon={
                                            <SendIcon
                                                sx={{
                                                    transform: direction === 'rtl' ? 'scaleX(-1)' : 'none',
                                                }}
                                            />
                                        }
                                        sx={{
                                            py: 1,
                                            px: 3,
                                            boxShadow: '0 4px 14px rgba(255, 111, 0, 0.35)',
                                        }}
                                    >
                                        {t('demo.rtlSection.submit')}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* 3. Sample Form */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <EditNoteIcon color="primary" />
                                    <Typography variant="h5" fontWeight={600}>
                                        {t('demo.formSection.title')}
                                    </Typography>
                                </Box>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField fullWidth label={t('demo.formSection.firstName')} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField fullWidth label={t('demo.formSection.lastName')} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField fullWidth label={t('demo.formSection.email')} type="email" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField fullWidth label={t('demo.formSection.vehicleId')} />
                                    </Grid>
                                </Grid>

                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="primary" size="large">
                                        {t('demo.formSection.save')}
                                    </Button>
                                    <Button variant="outlined" color="inherit" size="large">
                                        {t('demo.formSection.cancel')}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );
}
