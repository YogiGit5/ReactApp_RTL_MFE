# Microfrontend UI POC

This repository contains **POC #2 – Microfrontend UI**, which demonstrates a scalable frontend architecture using a **Shell host** and multiple **Microfrontend (MFE) applications** integrated via **Webpack 5 Module Federation**, all managed inside a **pnpm monorepo**.

---

## 🚀 Overview

The goal of this POC is to:

- Validate Microfrontend architecture for UI
- Enable independent development and deployment of frontend modules
- Provide a shell container with a persistent layout
- Demonstrate runtime integration using Module Federation

The shell dynamically loads three MFEs:
- Home
- Dashboard
- Profile

---

## 🏗️ Architecture

```
                +------------------+
                |      Shell       |
                |  (Host - 3000)   |
                +--------+---------+
                         |
        -----------------------------------------
        |                    |                  |
+---------------+   +----------------+   +----------------+
|    Home MFE   |   | Dashboard MFE  |   |  Profile MFE   |
|    (3001)     |   |    (3002)      |   |    (3003)      |
+---------------+   +----------------+   +----------------+
```

- **Shell** acts as the host container.
- MFEs are loaded at runtime via **Module Federation**.
- Shared dependencies: `react`, `react-dom` (singleton).
- All apps live in a single pnpm monorepo.

---

## 📂 Repository Structure

```
apps/
  shell/        # Host application
  home/         # Home microfrontend
  dashboard/    # Dashboard microfrontend
  profile/      # Profile microfrontend

eslint.config.js
pnpm-workspace.yaml
tsconfig.base.json
package.json
README.md
```

Each app contains:
- React + TypeScript source (`src/`)
- `webpack.config.js`
- `package.json`

---

## 🧰 Tech Stack

- React + TypeScript
- Webpack 5
- ModuleFederationPlugin
- webpack-dev-server
- pnpm workspaces
- ESLint (shared config)

---

## 📋 Prerequisites

- Node.js >= 18
- pnpm

Install pnpm if not available:

```bash
npm install -g pnpm
```

---

## ⚙️ Setup

From the repo root:

```bash
pnpm install
```

---

## ▶️ Run Locally

Start each app in a separate terminal:

```bash
pnpm --filter home dev
pnpm --filter dashboard dev
pnpm --filter profile dev
pnpm --filter shell dev
```

Ports:
- Shell → http://localhost:3000
- Home → http://localhost:3001
- Dashboard → http://localhost:3002
- Profile → http://localhost:3003

Open in browser:

```
http://localhost:3000
```

---

## 🧭 Navigation

Routes handled by Shell:

- `/home` → Home MFE
- `/dashboard` → Dashboard MFE
- `/profile` → Profile MFE

Use the top navigation / burger menu to switch between MFEs.

The shell layout (header & footer) remains persistent during navigation.

---

## ✅ Validation Checklist

- [x] Shell loads and runs independently
- [x] MFEs run standalone on their ports
- [x] Shell dynamically loads MFEs
- [x] Layout persists across navigation
- [x] Burger menu navigation works
- [x] No runtime federation errors

---

## ⚠️ Known Limitations

- Basic UI styling (no design system)
- No authentication or shared global state
- Manual startup of multiple dev servers
- No CI/CD pipeline configured
- No production build/deployment setup

---

## 📘 POC Learnings

- Monorepo simplifies dependency and tooling management.
- Webpack 5 Module Federation provides stable runtime composition.
- Clear host–remote contracts are critical for MF success.
- Shell should only handle layout & orchestration, not business logic.
- Independent MF development is feasible with minimal coupling.

---

## 🏁 Conclusion

This POC successfully demonstrates a working Microfrontend UI architecture with:

- A shell host
- Multiple MFEs
- Runtime integration
- Clean monorepo setup

It can serve as a foundation for further enhancements such as shared state, authentication, theming, and CI/CD.

---

**Microfrontend POC — Built with Webpack Module Federation**  
© 2025
