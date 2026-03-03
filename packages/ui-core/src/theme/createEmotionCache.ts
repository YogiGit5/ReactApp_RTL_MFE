import createCache, { type EmotionCache } from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

export const createEmotionCache = (isRtl: boolean): EmotionCache => {
    if (isRtl) {
        return createCache({
            key: 'muirtl',
            stylisPlugins: [prefixer, rtlPlugin],
        });
    }

    return createCache({
        key: 'muiltr',
        stylisPlugins: [prefixer],
    });
};
