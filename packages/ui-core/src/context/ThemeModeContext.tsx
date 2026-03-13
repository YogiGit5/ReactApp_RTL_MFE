import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { PaletteMode } from '@mui/material';

interface ThemeModeContextValue {
    mode: PaletteMode;
    toggleMode: () => void;
    setMode: (mode: PaletteMode) => void;
    isDark: boolean;
}

const STORAGE_KEY = 'theme-mode';

const ThemeModeContext = createContext<ThemeModeContextValue>({
    mode: 'light',
    toggleMode: () => { },
    setMode: () => { },
    isDark: false,
});

export const useThemeMode = (): ThemeModeContextValue => {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) {
        throw new Error('useThemeMode must be used within a ThemeModeProvider');
    }
    return ctx;
};

function getInitialMode(fallback?: PaletteMode): PaletteMode {
    if (typeof window === 'undefined') return fallback ?? 'light';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    if (fallback) return fallback;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

interface ThemeModeProviderProps {
    children: ReactNode;
    initialMode?: PaletteMode;
}

export const ThemeModeProvider = ({ children, initialMode }: ThemeModeProviderProps) => {
    const [mode, setModeState] = useState<PaletteMode>(() => getInitialMode(initialMode));

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, mode);
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    const toggleMode = useCallback(() => {
        setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    const setMode = useCallback((m: PaletteMode) => {
        setModeState(m);
    }, []);

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode, setMode, isDark: mode === 'dark' }}>
            {children}
        </ThemeModeContext.Provider>
    );
};
