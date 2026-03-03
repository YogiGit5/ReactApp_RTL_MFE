# Fleet Tracking Platform — Microfrontend Monorepo

A scalable frontend architecture built with a **Shell host** and multiple **Microfrontend (MFE) applications**, integrated via **Webpack 5 Module Federation** and managed inside a **pnpm monorepo**. Features full **RTL/LTR** support, **internationalization (i18n)**, and a shared **Material-UI** design system.

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
                    ┌──────────▼───────────┐
                    │  @rtl-monorepo/      │
                    │  ui-core (shared)    │
                    │  Theme / i18n / RTL  │
                    └──────────────────────┘
```

- **Shell** orchestrates layout, routing, and MFE loading — it holds no business logic.
- **MFEs** are loaded at runtime via Module Federation's `remoteEntry.js` files.
- **ui-core** is the shared package consumed by all apps for theming, i18n, and RTL direction management.
- Shared singletons: `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@emotion/*`, `i18next`, `react-i18next`, and `@rtl-monorepo/ui-core`.

---

## Repository Structure

```
ReactApp_RTL_MFE/
│
├── apps/
│   ├── shell/                    # Host application (Port 3000)
│   │   ├── src/
│   │   │   ├── App.tsx           # Main router — lazy-loads MFEs
│   │   │   ├── ErrorBoundary.tsx # Graceful error handling for MFE failures
│   │   │   ├── bootstrap.tsx     # React bootstrap entry
│   │   │   ├── main.tsx          # Dynamic import of bootstrap
│   │   │   ├── remotes.ts        # Remote MFE configuration
│   │   │   ├── federation.d.ts   # TypeScript declarations for federated modules
│   │   │   ├── layout/
│   │   │   │   └── ShellLayout.tsx   # Persistent flex layout (header + content + footer)
│   │   │   ├── components/
│   │   │   │   ├── Header.tsx        # AppBar with nav, language & direction toggles
│   │   │   │   ├── Footer.tsx        # Footer component
│   │   │   │   └── BurgerMenu.tsx    # Mobile drawer navigation
│   │   │   └── pages/
│   │   │       └── DemoPage.tsx      # Feature demonstration page
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── webpack.config.js
│   │   ├── webpack.config.cjs
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── home/                     # Home MFE (Port 3001)
│   │   ├── src/
│   │   │   ├── App.tsx           # Home page component (exposed via federation)
│   │   │   ├── bootstrap.tsx
│   │   │   └── main.tsx
│   │   ├── webpack.config.js
│   │   └── package.json
│   │
│   ├── dashboard/                # Dashboard MFE (Port 3002)
│   │   └── (same structure as home)
│   │
│   └── profile/                  # Profile MFE (Port 3003)
│       └── (same structure as home)
│
├── packages/
│   └── ui-core/                  # Shared UI library (@rtl-monorepo/ui-core)
│       ├── src/
│       │   ├── index.ts              # Barrel file — all public exports
│       │   ├── providers/
│       │   │   └── AppProviders.tsx   # Root provider (theme + i18n + direction)
│       │   ├── context/
│       │   │   └── DirectionContext.tsx  # RTL/LTR direction context & hook
│       │   ├── theme/
│       │   │   ├── index.ts              # Material-UI theme factory
│       │   │   └── createEmotionCache.ts # Emotion cache with stylis RTL plugin
│       │   └── i18n/
│       │       ├── index.ts          # i18next configuration
│       │       └── locales/
│       │           ├── en.json       # English translations
│       │           └── ar.json       # Arabic translations
│       ├── tsconfig.json
│       └── package.json
│
├── package.json              # Root workspace config & scripts
├── pnpm-workspace.yaml       # Workspace definitions (apps/* + packages/*)
├── tsconfig.base.json        # Base TypeScript config (extended by all apps)
├── eslint.config.js          # Shared ESLint flat config
├── pnpm-lock.yaml
└── .gitignore
```

---

## Tech Stack

| Category             | Technology                                         |
| -------------------- | -------------------------------------------------- |
| Framework            | React 18 + TypeScript 5.6                          |
| Build Tool           | Webpack 5                                          |
| MFE Integration      | Webpack 5 ModuleFederationPlugin                   |
| Dev Server           | webpack-dev-server (HMR enabled)                   |
| Monorepo Manager     | pnpm 9 workspaces                                  |
| UI Library           | Material-UI 5 (MUI)                                |
| Styling              | Emotion (with `stylis-plugin-rtl` for RTL support) |
| Routing              | React Router 6                                     |
| Internationalization | i18next + react-i18next (English + Arabic)         |
| Linting              | ESLint 9 (flat config)                             |
| Testing              | Not yet configured                                 |
| CI/CD                | Not yet configured                                 |

---

## Key Features

- **Microfrontend Architecture** — Independent apps composed at runtime via Module Federation.
- **RTL/LTR Toggle** — Switch between left-to-right and right-to-left layouts dynamically. Emotion cache is rebuilt with `stylis-plugin-rtl` when direction changes.
- **Internationalization** — Language switcher (English / Arabic) with automatic direction assignment.
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

### Run all apps in parallel

```bash
pnpm dev
```

This starts all four dev servers concurrently using `pnpm -r --filter ./apps/* --parallel dev`.

### Run individual apps

```bash
pnpm --filter shell dev
pnpm --filter home dev
pnpm --filter dashboard dev
pnpm --filter profile dev
```

### Build all apps

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

---

## Ports & URLs

| App       | Port | URL                      |
| --------- | ---- | ------------------------ |
| Shell     | 3000 | http://localhost:3000     |
| Home      | 3001 | http://localhost:3001     |
| Dashboard | 3002 | http://localhost:3002     |
| Profile   | 3003 | http://localhost:3003     |

Open **http://localhost:3000** in your browser to see the full application with all MFEs loaded.

---

## Routing

Routes are defined in the Shell and map to lazy-loaded MFE components:

| Route        | MFE       |
| ------------ | --------- |
| `/home`      | Home      |
| `/dashboard` | Dashboard |
| `/profile`   | Profile   |

Navigation is available via the header nav links and the burger menu on mobile.

---

## How Module Federation Works Here

**Shell (Host)** declares remotes in its webpack config:

```js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    home: 'home@http://localhost:3001/remoteEntry.js',
    dashboard: 'dashboard@http://localhost:3002/remoteEntry.js',
    profile: 'profile@http://localhost:3003/remoteEntry.js',
  },
  shared: { react: { singleton: true }, /* ... */ },
})
```

**Each MFE (Remote)** exposes its `App` component:

```js
new ModuleFederationPlugin({
  name: 'home',              // unique per MFE
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: { react: { singleton: true }, /* ... */ },
})
```

**Shell loads MFEs** at runtime using `React.lazy()`:

```tsx
const HomeApp = React.lazy(() => import('home/App'));
const DashboardApp = React.lazy(() => import('dashboard/App'));
const ProfileApp = React.lazy(() => import('profile/App'));
```

Nine dependencies are shared as singletons to avoid duplicate bundles: `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`, `@emotion/cache`, `i18next`, `react-i18next`, and `@rtl-monorepo/ui-core`.

---

## Shared Library: `@rtl-monorepo/ui-core`

This package centralizes cross-cutting concerns so every app stays consistent.

| Export               | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `AppProviders`       | Root provider wrapping theme, i18n, and direction context     |
| `useDirection`       | Hook to read and toggle RTL/LTR direction                     |
| `DirectionProvider`  | Context provider for direction state                          |
| `createAppTheme`     | Factory that builds a Material-UI theme for a given direction |
| `createEmotionCache` | Creates an Emotion cache with stylis RTL plugin when needed   |
| `i18n`               | Pre-configured i18next instance with EN/AR translations       |

Apps consume it via the pnpm workspace protocol:

```json
"@rtl-monorepo/ui-core": "workspace:*"
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

## Known Limitations

- No authentication or shared global state management
- No testing framework configured
- No CI/CD pipeline
- No production build/deployment setup
- Basic UI styling (no full design system)
- Manual port configuration (hardcoded remote URLs)

---

## Next Steps

Potential enhancements to build on top of this foundation:

- Shared state management (Zustand, Redux, or context-based)
- Authentication & authorization layer
- Testing setup (Vitest / Jest + React Testing Library)
- CI/CD pipeline (GitHub Actions)
- Production deployment with dynamic remote URLs
- Design system expansion with Storybook
- Dark mode theme support
