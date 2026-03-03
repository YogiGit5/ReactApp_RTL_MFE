import { createTheme, type ThemeOptions, type Direction } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
    palette: {
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
        success: {
            main: '#2E7D32',
        },
        warning: {
            main: '#ED6C02',
        },
        error: {
            main: '#D32F2F',
        },
        info: {
            main: '#0288D1',
        },
    },
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
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: '0 2px 8px rgba(21, 101, 192, 0.25)',
                    '&:hover': {
                        boxShadow: '0 4px 16px rgba(21, 101, 192, 0.35)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
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
    },
};

export const createAppTheme = (direction: Direction = 'ltr') => {
    return createTheme({
        ...baseThemeOptions,
        direction,
    });
};

export { baseThemeOptions };
