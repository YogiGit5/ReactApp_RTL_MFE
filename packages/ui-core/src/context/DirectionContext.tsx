import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Direction } from '@mui/material/styles';

interface DirectionContextValue {
    direction: Direction;
    toggleDirection: () => void;
    setDirection: (dir: Direction) => void;
}

const DirectionContext = createContext<DirectionContextValue>({
    direction: 'ltr',
    toggleDirection: () => { },
    setDirection: () => { },
});

export const useDirection = (): DirectionContextValue => {
    const ctx = useContext(DirectionContext);
    if (!ctx) {
        throw new Error('useDirection must be used within a DirectionProvider');
    }
    return ctx;
};

interface DirectionProviderProps {
    children: ReactNode;
    initialDirection?: Direction;
}

export const DirectionProvider = ({ children, initialDirection = 'ltr' }: DirectionProviderProps) => {
    const [direction, setDirectionState] = useState<Direction>(initialDirection);

    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');
    }, [direction]);

    const toggleDirection = useCallback(() => {
        setDirectionState((prev: Direction) => (prev === 'ltr' ? 'rtl' : 'ltr'));
    }, []);

    const setDirection = useCallback((dir: Direction) => {
        setDirectionState(dir);
    }, []);

    return (
        <DirectionContext.Provider value={{ direction, toggleDirection, setDirection }}>
            {children}
        </DirectionContext.Provider>
    );
};
