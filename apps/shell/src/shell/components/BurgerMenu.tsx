import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ScienceIcon from '@mui/icons-material/Science';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

type Props = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  { path: '/home', labelKey: 'nav.home', icon: <HomeIcon /> },
  { path: '/dashboard', labelKey: 'nav.dashboard', icon: <DashboardIcon /> },
  { path: '/profile', labelKey: 'nav.profile', icon: <PersonIcon /> },
  { path: '/demo', labelKey: 'nav.demo', icon: <ScienceIcon /> },
];

export default function BurgerMenu({ open, onClose }: Props) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          background: 'linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)',
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          background: 'linear-gradient(135deg, #0D47A1, #1565C0)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShippingIcon />
          <Typography variant="h6" fontWeight={700}>
            {t('nav.navigation')}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Nav Items */}
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={onClose}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={t(item.labelKey)}
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
