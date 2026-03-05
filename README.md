# Fleet Tracking Platform — Microfrontend Monorepo

A scalable frontend architecture built with a **Shell host** and multiple **Microfrontend (MFE) applications**, integrated via **Vite Module Federation** and managed inside a **pnpm monorepo**. Features full **RTL/LTR** support, **internationalization (i18n)**, an interactive **Map view** (OpenLayers), and a shared **Material-UI** design system.

---

## Architecture

```
                    ┌──────────────────────┐
                    │     Shell (Host)     │
                    │     Port 3000        │
                    │  Layout / Router /   │
                    │  Nav / Error Boundary│
                    └──────────┬───────────┘
                               │  Module Federation (runtime)
            ┌──────────────────┼──────────────────┐
            │                  │                  │
   ┌────────▼───────┐ ┌───────▼────────┐ ┌───────▼────────┐
   │   Home MFE     │ │ Dashboard MFE  │ │  Profile MFE   │
   │   Port 3001    │ │   Port 3002    │ │   Port 3003    │
   └────────────────┘ └────────────────┘ └────────────────┘
            │                  │                  │
            └──────────────────┼──────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                                 │
   ┌──────────▼───────────┐          ┌──────────▼───────────┐
   │  @rtl-monorepo/      │          │  @rtl-monorepo/      │
   │  ui-core (shared)    │          │  map-view (shared)   │
   │  Theme / i18n / RTL  │          │  OpenLayers Map      │
   └──────────────────────┘          └──────────────────────┘
```

- **Shell** orchestrates layout, routing, and MFE loading — it holds no business logic.
- **MFEs** (Home, Dashboard, Profile) are loaded at runtime via Module Federation's `remoteEntry.js` files.
- **ui-core** is the shared package consumed by all apps for theming, i18n, and RTL direction management.
- **map-view** provides OpenLayers-based map components, imported directly by the Shell (not an MFE remote).
- Shared singletons (via federation): `react` and `react-dom`.

---

## Repository Structure

```
ReactApp_RTL_MFE/
│
├── apps/
│   ├── shell/                        # Host application (Port 3000)
│   │   ├── src/
│   │   │   ├── main.tsx              # React entry point
│   │   │   ├── index.css             # Global styles
│   │   │   ├── federation.d.ts       # TypeScript declarations for federated modules
│   │   │   └── shell/
│   │   │       ├── App.tsx           # Main router — lazy-loads MFEs + MapPage
│   │   │       ├── ErrorBoundary.tsx  # Graceful error handling for MFE failures
│   │   │       ├── layout/
│   │   │       │   └── ShellLayout.tsx    # Persistent flex layout (header + content + footer)
│   │   │       ├── components/
│   │   │       │   ├── Header.tsx         # AppBar with nav, language & direction toggles
│   │   │       │   ├── Footer.tsx         # Footer component
│   │   │       │   └── BurgerMenu.tsx     # Mobile drawer navigation
│   │   │       └── pages/
│   │   │           └── DemoPage.tsx       # Feature demonstration page
│   │   ├── index.html
│   │   ├── vite.config.ts            # Vite + Module Federation host config
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── home/                         # Home MFE (Port 3001)
│   │   ├── src/
│   │   │   ├── App.tsx               # Home page component (exposed via federation)
│   │   │   └── main.tsx
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   ├── dashboard/                    # Dashboard MFE (Port 3002)
│   │   └── (same structure as home)
│   │
│   └── profile/                      # Profile MFE (Port 3003)
│       └── (same structure as home)
│
├── packages/
│   ├── ui-core/                      # Shared UI library (@rtl-monorepo/ui-core)
│   │   ├── src/
│   │   │   ├── index.ts              # Barrel file — all public exports
│   │   │   ├── providers/
│   │   │   │   └── AppProviders.tsx   # Root provider (theme + i18n + direction)
│   │   │   ├── context/
│   │   │   │   └── DirectionContext.tsx  # RTL/LTR direction context & hook
│   │   │   ├── theme/
│   │   │   │   ├── index.ts              # Material-UI theme factory
│   │   │   │   └── createEmotionCache.ts # Emotion cache with stylis RTL plugin
│   │   │   └── i18n/
│   │   │       ├── index.ts          # i18next configuration
│   │   │       └── locales/
│   │   │           ├── en.json       # English translations
│   │   │           └── ar.json       # Arabic translations
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── map-view/                     # Map library (@rtl-monorepo/map-view)
│       ├── src/
│       │   ├── index.ts              # Exports: MapView, MapPage, MapViewProps
│       │   ├── types.ts              # MapViewProps interface
│       │   ├── MapView.tsx           # Core OpenLayers map (no MUI/i18n dependency)
│       │   ├── MapPage.tsx           # Full page with layer selector & settings UI
│       │   └── components/
│       │       └── ApiKeySettings.tsx # Google Maps API key management screen
│       ├── tsconfig.json
│       ├── package.json
│       └── README.md
│
├── package.json                      # Root workspace config & scripts
├── pnpm-workspace.yaml               # Workspace definitions (apps/* + packages/*)
├── tsconfig.base.json                # Base TypeScript config (extended by all apps)
├── eslint.config.js                  # Shared ESLint flat config
├── pnpm-lock.yaml
└── .gitignore
```

---

## Tech Stack

| Category             | Technology                                         |
| -------------------- | -------------------------------------------------- |
| Framework            | React 18 + TypeScript 5                            |
| Build Tool           | Vite 5                                             |
| MFE Integration      | @module-federation/vite 1.11.1                     |
| Monorepo Manager     | pnpm 9 workspaces                                  |
| UI Library           | Material-UI 5 (MUI)                                |
| Styling              | Emotion (with `stylis-plugin-rtl` for RTL support) |
| Routing              | React Router 6                                     |
| Internationalization | i18next + react-i18next (English + Arabic)         |
| Map                  | OpenLayers 10                                      |
| Linting              | ESLint 9 (flat config)                             |

---

## Key Features

- **Microfrontend Architecture** — Independent apps composed at runtime via Module Federation.
- **RTL/LTR Toggle** — Switch between left-to-right and right-to-left layouts dynamically. Emotion cache is rebuilt with `stylis-plugin-rtl` when direction changes.
- **Internationalization** — Language switcher (English / Arabic) with automatic direction assignment.
- **Interactive Map** — OpenStreetMap and Google Maps tile layers via OpenLayers, with API key management.
- **Shared Design System** — Centralized Material-UI theme in `ui-core` with custom palette, typography (Inter/Roboto), and component overrides.
- **Persistent Shell Layout** — Header, footer, and navigation persist across MFE transitions.
- **Error Boundaries** — MFE loading failures are caught and handled gracefully.
- **Mobile Navigation** — Burger menu drawer for smaller screens.

---

## Prerequisites

- **Node.js** >= 18
- **pnpm** (install globally if needed)

```bash
npm install -g pnpm
```

---

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Build all apps

Module Federation requires a production build — it does **not** work with `vite dev`.

```bash
pnpm build
```

### Start all preview servers

Open 4 separate terminals and run:

```bash
# Terminal 1 — Home (port 3001)
cd apps/home && npx vite preview

# Terminal 2 — Dashboard (port 3002)
cd apps/dashboard && npx vite preview

# Terminal 3 — Profile (port 3003)
cd apps/profile && npx vite preview

# Terminal 4 — Shell (port 3000)
cd apps/shell && npx vite preview
```

> **Important:** Start the remote apps (home, dashboard, profile) before the shell, since the shell fetches their `remoteEntry.js` at runtime.

Open **http://localhost:3000** in your browser.

---

## Ports & URLs

| App       | Port | URL                  |
| --------- | ---- | -------------------- |
| Shell     | 3000 | http://localhost:3000 |
| Home      | 3001 | http://localhost:3001 |
| Dashboard | 3002 | http://localhost:3002 |
| Profile   | 3003 | http://localhost:3003 |

---

## Routing

Routes are defined in the Shell (`apps/shell/src/shell/App.tsx`):

| Route        | Component         | Source                      |
| ------------ | ----------------- | --------------------------- |
| `/`          | WelcomeView       | Shell (inline)              |
| `/home`      | RemoteHome        | Home MFE (federated)        |
| `/dashboard` | RemoteDashboard   | Dashboard MFE (federated)   |
| `/profile`   | RemoteProfile     | Profile MFE (federated)     |
| `/map`       | MapPage           | @rtl-monorepo/map-view      |
| `/demo`      | DemoPage          | Shell (local page)          |

Navigation is available via the header nav links and the burger menu on mobile.

---

## How Module Federation Works Here

**Shell (Host)** declares remotes in `apps/shell/vite.config.ts`:

```ts
federation({
  name: 'shell',
  filename: 'remoteEntry.js',
  remotes: {
    home: {
      type: 'module',
      name: 'home',
      entry: 'http://localhost:3001/remoteEntry.js',
      entryGlobalName: 'home',
      shareScope: 'default',
    },
    // dashboard, profile — same pattern
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
})
```

**Each MFE (Remote)** exposes its `App` component:

```ts
federation({
  name: 'home',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
})
```

**Shell loads MFEs** at runtime using `React.lazy()`:

```tsx
const RemoteHome = lazy(() => import('home/App'))
const RemoteDashboard = lazy(() => import('dashboard/App'))
const RemoteProfile = lazy(() => import('profile/App'))
```

`react` and `react-dom` are shared as singletons to avoid duplicate bundles across host and remotes.

---

## Shared Packages

### `@rtl-monorepo/ui-core`

Centralizes cross-cutting concerns so every app stays consistent.

| Export               | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `AppProviders`       | Root provider wrapping theme, i18n, and direction context     |
| `useDirection`       | Hook to read and toggle RTL/LTR direction                     |
| `DirectionProvider`  | Context provider for direction state                          |
| `createAppTheme`     | Factory that builds a Material-UI theme for a given direction |
| `createEmotionCache` | Creates an Emotion cache with stylis RTL plugin when needed   |
| `i18n`               | Pre-configured i18next instance with EN/AR translations       |

### `@rtl-monorepo/map-view`

OpenLayers-based map components. See [`packages/map-view/README.md`](packages/map-view/README.md) for full documentation.

| Export        | Purpose                                                       |
| ------------- | ------------------------------------------------------------- |
| `MapView`     | Core map component (OpenStreetMap / Google tiles, no MUI dep) |
| `MapPage`     | Full page UI with layer selector, settings, and i18n          |
| `MapViewProps` | TypeScript interface for MapView props                       |

Apps consume these via the pnpm workspace protocol:

```json
{
  "@rtl-monorepo/ui-core": "workspace:*",
  "@rtl-monorepo/map-view": "workspace:*"
}
```

---

## Theme

The Material-UI theme is defined in `packages/ui-core/src/theme/index.ts`:

| Token     | Color     | Usage                  |
| --------- | --------- | ---------------------- |
| Primary   | `#1565C0` | Main actions, app bar  |
| Secondary | `#FF6F00` | Accents, highlights    |
| Success   | `#2E7D32` | Success states         |
| Warning   | `#ED6C02` | Warning states         |
| Error     | `#D32F2F` | Error states           |
| Info      | `#0288D1` | Informational elements |

**Typography**: Inter, Roboto, Helvetica Neue (system fallback).
**Border Radius**: 10px base, 8–14px for individual components.

---

## Adding a New MFE

1. Create a new app under `apps/`:
   ```bash
   mkdir -p apps/my-app/src
   ```

2. Add `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, and `src/main.tsx` + `src/App.tsx` (follow the pattern in `apps/home/`).

3. In `vite.config.ts`, expose the App component:
   ```ts
   federation({
     name: 'myapp',
     filename: 'remoteEntry.js',
     exposes: { './App': './src/App.tsx' },
     shared: {
       react: { singleton: true, requiredVersion: '^18.0.0' },
       'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
     },
   })
   ```

4. Register the remote in `apps/shell/vite.config.ts`:
   ```ts
   myapp: {
     type: 'module',
     name: 'myapp',
     entry: 'http://localhost:<PORT>/remoteEntry.js',
     entryGlobalName: 'myapp',
     shareScope: 'default',
   },
   ```

5. Add the TypeScript declaration in `apps/shell/src/federation.d.ts`:
   ```ts
   declare module 'myapp/App' {
     const Component: React.ComponentType
     export default Component
   }
   ```

6. Add the route in `apps/shell/src/shell/App.tsx`:
   ```tsx
   const RemoteMyApp = lazy(() => import('myapp/App'))
   // ...
   <Route path="/my-app" element={<RemoteMyApp />} />
   ```

7. Build all apps and start preview servers.

---

## Lint

```bash
pnpm lint
```

---

## TypeScript Check

```bash
# Check a specific app or package
pnpm --filter shell exec tsc --noEmit
pnpm --filter @rtl-monorepo/map-view exec tsc --noEmit
```
