# @rtl-monorepo/map-view

A React map component package built on [OpenLayers](https://openlayers.org/), supporting OpenStreetMap and Google Maps tile layers. Includes a ready-to-use full page UI with layer switching and Google API key management.

## Exports

| Export | Description |
|---|---|
| `MapView` | Core map component (pure OpenLayers, no MUI/i18n dependency) |
| `MapPage` | Full-featured map page with layer selector, API key settings, and i18n |
| `MapViewProps` | TypeScript interface for `MapView` props |

## Installation

### Within the monorepo

The package is already available as a workspace dependency. Add it to your app's `package.json`:

```json
{
  "dependencies": {
    "@rtl-monorepo/map-view": "workspace:*"
  }
}
```

Then run:

```bash
pnpm install
```

### Peer Dependencies

This package requires the following peer dependencies in the consuming application:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@mui/material": "^5.16.0",
  "@mui/icons-material": "^5.16.0",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "react-i18next": "^15.1.0",
  "i18next": "^23.16.0"
}
```

> **Note:** `MapView` only requires `react` and `ol`. The MUI and i18n peer dependencies are only needed if you use `MapPage`.

## Usage

### MapView (Lightweight)

Use `MapView` when you want just the map with no extra UI. It has zero MUI/i18n dependencies.

```tsx
import { MapView } from '@rtl-monorepo/map-view'

// OpenStreetMap
<MapView
  mapType="openstreet"
  center={[72.8777, 19.0760]}  // [longitude, latitude]
  zoom={12}
  height="500px"
/>

// Google Maps (requires API key)
<MapView
  mapType="google"
  googleApiKey="YOUR_GOOGLE_API_KEY"
  center={[72.8777, 19.0760]}
  zoom={12}
  height="500px"
  unavailableMessage={<p>Google Maps is not available</p>}
/>
```

### MapPage (Full Page UI)

Use `MapPage` for a complete map experience with a layer dropdown, Google API key management screen, and i18n support.

```tsx
import { MapPage } from '@rtl-monorepo/map-view'

// Renders full page: layer selector + map + settings
<MapPage />
```

`MapPage` manages state internally:
- Layer switching between OpenStreetMap and Google Maps via a dropdown
- Google API key stored in `localStorage` (key: `google-maps-api-key`)
- API key validation using Google Static Maps image load test
- Settings screen for adding/removing the API key

**Requires:** MUI v5 theme provider, react-i18next configured with `map.*` translation keys.

## Props

### MapViewProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `mapType` | `'google' \| 'openstreet'` | **required** | Which tile layer to display |
| `googleApiKey` | `string` | `undefined` | Google Maps API key (required when `mapType` is `'google'`) |
| `height` | `string \| number` | `'100%'` | Map container height |
| `width` | `string \| number` | `'100%'` | Map container width |
| `center` | `[number, number]` | `[0, 20]` | Map center as `[longitude, latitude]` |
| `zoom` | `number` | `3` | Initial zoom level |
| `unavailableMessage` | `ReactNode` | `undefined` | Custom message shown when Google Maps is selected but no API key is provided |

## Integration with External Applications

To use this package outside the monorepo:

### 1. Copy the package

Copy the `packages/map-view/` directory into your project.

### 2. Install the direct dependency

```bash
npm install ol
```

### 3. Install peer dependencies

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled react-i18next i18next
```

### 4. Import and use

```tsx
// For just the map (no MUI/i18n needed)
import { MapView } from './map-view/src'

function App() {
  return (
    <MapView
      mapType="openstreet"
      center={[77.5946, 12.9716]}
      zoom={10}
      height="100vh"
    />
  )
}
```

### 5. i18n keys (required for MapPage only)

If using `MapPage`, add these translation keys to your i18n locale files:

```json
{
  "modules": {
    "map": "Map"
  },
  "map": {
    "layerSelector": "Map Layer",
    "osm": "OpenStreetMap",
    "google": "Google Maps",
    "googleNotAvailable": "Google Maps requires an API key",
    "configureApiKey": "Configure",
    "settings": {
      "title": "Google Maps API Key",
      "description": "Enter your Google Maps API key to enable Google Maps layer.",
      "backToMap": "Back to Map",
      "apiKeyLabel": "API Key",
      "apiKeyPlaceholder": "Enter your API key",
      "currentKey": "API key is configured",
      "validateAndSave": "Validate & Save",
      "validating": "Validating...",
      "saveSuccess": "API key saved successfully",
      "saveError": "Invalid API key",
      "removeKey": "Remove Key",
      "removeSuccess": "API key removed"
    }
  }
}
```

## File Structure

```
packages/map-view/
  src/
    index.ts                    # Package exports
    types.ts                    # MapViewProps interface
    MapView.tsx                 # Core OpenLayers map (no MUI/i18n)
    MapPage.tsx                 # Full page with layer selector & settings
    components/
      ApiKeySettings.tsx        # API key management screen
  package.json
  tsconfig.json
```
