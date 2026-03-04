declare module 'home/App' {
    const Component: React.ComponentType
    export default Component
}
declare module 'dashboard/App' {
    const Component: React.ComponentType
    export default Component
}
declare module 'profile/App' {
    const Component: React.ComponentType
    export default Component
}
declare module '@rtl-monorepo/map-view' {
    export { MapView } from '@rtl-monorepo/map-view/src/MapView'
    export { MapPage } from '@rtl-monorepo/map-view/src/MapPage'
    export type { MapViewProps } from '@rtl-monorepo/map-view/src/types'
}
declare module '@rtl-monorepo/ui-core' {
    export { AppProviders } from '@rtl-monorepo/ui-core/src/providers/AppProviders'
    export { useDirection, DirectionProvider } from '@rtl-monorepo/ui-core/src/context/DirectionContext'
    export { createAppTheme, baseThemeOptions } from '@rtl-monorepo/ui-core/src/theme'
    export { createEmotionCache } from '@rtl-monorepo/ui-core/src/theme/createEmotionCache'
    export { default as i18n } from '@rtl-monorepo/ui-core/src/i18n'
}
