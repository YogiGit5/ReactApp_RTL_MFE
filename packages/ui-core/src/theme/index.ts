import { createTheme, type ThemeOptions, type Direction } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

// ── Light Palette ──────────────────────────────────────────────────
const lightPalette: ThemeOptions['palette'] = {
    mode: 'light',
    primary: {
        main: '#1565C0',
        light: '#42A5F5',
        dark: '#0D47A1',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#FF6F00',
        light: '#FFA040',
        dark: '#E65100',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#F5F7FA',
        paper: '#FFFFFF',
    },
    text: {
        primary: '#1A2027',
        secondary: '#5A6A7F',
    },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    error: { main: '#D32F2F' },
    info: { main: '#0288D1' },
    divider: 'rgba(0, 0, 0, 0.08)',
};

// ── Dark Palette ───────────────────────────────────────────────────
const darkPalette: ThemeOptions['palette'] = {
    mode: 'dark',
    primary: {
        main: '#42A5F5',
        light: '#80D6FF',
        dark: '#1565C0',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#FFA040',
        light: '#FFD180',
        dark: '#FF6F00',
        contrastText: '#000000',
    },
    background: {
        default: '#0A1929',
        paper: '#132F4C',
    },
    text: {
        primary: '#E7EBF0',
        secondary: '#B2BAC2',
    },
    success: { main: '#66BB6A' },
    warning: { main: '#FFA726' },
    error: { main: '#F44336' },
    info: { main: '#29B6F6' },
    divider: 'rgba(255, 255, 255, 0.08)',
};

// ── Shared (mode-agnostic) options ─────────────────────────────────
const baseThemeOptions: ThemeOptions = {
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
        fontSize: 14,
        h1: { fontWeight: 700, fontSize: '2.5rem' },
        h2: { fontWeight: 700, fontSize: '2rem' },
        h3: { fontWeight: 600, fontSize: '1.75rem' },
        h4: { fontWeight: 600, fontSize: '1.5rem' },
        h5: { fontWeight: 600, fontSize: '1.25rem' },
        h6: { fontWeight: 600, fontSize: '1rem' },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 10,
    },
    spacing: 8,
};

// ── Component overrides (mode-aware) ───────────────────────────────
function getComponentOverrides(mode: PaletteMode): ThemeOptions['components'] {
    const isDark = mode === 'dark';

    return {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: isDark
                        ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                        : '0 2px 8px rgba(21, 101, 192, 0.25)',
                    '&:hover': {
                        boxShadow: isDark
                            ? '0 4px 16px rgba(0, 0, 0, 0.5)'
                            : '0 4px 16px rgba(21, 101, 192, 0.35)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    boxShadow: isDark
                        ? '0 2px 12px rgba(0, 0, 0, 0.3)'
                        : '0 2px 12px rgba(0, 0, 0, 0.06)',
                    ...(isDark && {
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                    }),
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: isDark
                        ? '0 1px 4px rgba(0, 0, 0, 0.4)'
                        : '0 1px 4px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: '0 16px 16px 0',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: isDark ? { backgroundImage: 'none' } : {},
            },
        },
    };
}

// ── Theme factory ──────────────────────────────────────────────────
export const createAppTheme = (direction: Direction = 'ltr', mode: PaletteMode = 'light') => {
    const palette = mode === 'dark' ? darkPalette : lightPalette;

    return createTheme({
        ...baseThemeOptions,
        direction,
        palette,
        components: getComponentOverrides(mode),
    });
};

export { baseThemeOptions, lightPalette, darkPalette };
