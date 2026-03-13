import { useMemo, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { I18nextProvider } from 'react-i18next';
import { createAppTheme } from '../theme';
import { createEmotionCache } from '../theme/createEmotionCache';
import { DirectionProvider, useDirection } from '../context/DirectionContext';
import { ThemeModeProvider, useThemeMode } from '../context/ThemeModeContext';
import i18n from '../i18n';
import type { Direction } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

interface InnerProvidersProps {
    children: ReactNode;
}

function InnerProviders({ children }: InnerProvidersProps) {
    const { direction } = useDirection();
    const { mode } = useThemeMode();

    const theme = useMemo(() => createAppTheme(direction, mode), [direction, mode]);
    const cache = useMemo(() => createEmotionCache(direction === 'rtl'), [direction]);

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <I18nextProvider i18n={i18n}>
                    {children}
                </I18nextProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

interface AppProvidersProps {
    children: ReactNode;
    initialDirection?: Direction;
    initialThemeMode?: PaletteMode;
}

export function AppProviders({ children, initialDirection = 'ltr', initialThemeMode }: AppProvidersProps) {
    return (
        <ThemeModeProvider initialMode={initialThemeMode}>
            <DirectionProvider initialDirection={initialDirection}>
                <InnerProviders>{children}</InnerProviders>
            </DirectionProvider>
        </ThemeModeProvider>
    );
}
