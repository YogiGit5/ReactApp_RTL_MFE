import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@rtl-monorepo/ui-core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useState } from 'react';

type Props = {
  onBurgerClick: () => void;
};

const navItems = [
  { path: '/home', labelKey: 'nav.home' },
  { path: '/dashboard', labelKey: 'nav.dashboard' },
  { path: '/profile', labelKey: 'nav.profile' },
  { path: '/map', labelKey: 'nav.map' },
  { path: '/demo', labelKey: 'nav.demo' },
];

export default function Header({ onBurgerClick }: Props) {
  const { t, i18n } = useTranslation();
  const { direction, toggleDirection, setDirection } = useDirection();
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    // Auto-set direction based on language
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
    setLangAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1976D2 100%)',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onBurgerClick}
          sx={{ display: { md: 'none' } }}
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </IconButton>

        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShippingIcon sx={{ fontSize: 28 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {t('app.title')}
          </Typography>
        </Box>

        {/* Desktop Nav Links */}
        <Box
          component="nav"
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 0.5,
            mx: 'auto',
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              color="inherit"
              sx={{
                px: 2,
                borderRadius: 2,
                '&.active': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  fontWeight: 700,
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {t(item.labelKey)}
            </Button>
          ))}
        </Box>

        {/* RTL Toggle */}
        <Tooltip title={direction === 'ltr' ? t('direction.switchToRtl') : t('direction.switchToLtr')}>
          <Button
            color="inherit"
            onClick={toggleDirection}
            startIcon={<SwapHorizIcon />}
            sx={{
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.3)',
              px: 1.5,
              minWidth: 'auto',
              fontSize: '0.8rem',
            }}
          >
            {direction.toUpperCase()}
          </Button>
        </Tooltip>

        {/* Language Switcher */}
        <Tooltip title={t('language.label')}>
          <Button
            color="inherit"
            onClick={(e) => setLangAnchor(e.currentTarget)}
            startIcon={<TranslateIcon />}
            sx={{
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.3)',
              px: 1.5,
              minWidth: 'auto',
              fontSize: '0.8rem',
            }}
          >
            {i18n.language === 'ar' ? 'العربية' : 'EN'}
          </Button>
        </Tooltip>
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={() => setLangAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => handleLanguageChange('en')}
            selected={i18n.language === 'en'}
          >
            {t('language.en')}
          </MenuItem>
          <MenuItem
            onClick={() => handleLanguageChange('ar')}
            selected={i18n.language === 'ar'}
          >
            {t('language.ar')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
