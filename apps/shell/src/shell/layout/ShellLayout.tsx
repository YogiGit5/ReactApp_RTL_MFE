import { useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BurgerMenu from '../components/BurgerMenu';

type Props = {
  children: ReactNode;
};

export default function ShellLayout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header onBurgerClick={() => setMenuOpen(true)} />
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          maxWidth: 1400,
          width: '100%',
          mx: 'auto',
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
