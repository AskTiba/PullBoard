# 🛸 PullBoard | Hestia Core Ecosystem
[![CI Pipeline](https://github.com/AskTiba/PullBoard/actions/workflows/ci.yml/badge.svg)](https://github.com/AskTiba/PullBoard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Engine: NestJS](https://img.shields.io/badge/Engine-NestJS%2011-red.svg)](https://nestjs.com/)
[![Aesthetic: iOS--First](https://img.shields.io/badge/Aesthetic-iOS--First-lightgrey.svg)](#-aesthetic-philosophy)

**PullBoard** is a premium, high-fidelity GitHub intelligence dashboard. It is the flagship manifestation of the **Hestia Unified Ecosystem**, engineered to transform raw repository data into actionable, aesthetic intelligence.

[Explore the Docs](./docs) • [View Demo](https://pullboard.vercel.app) • [Report Bug](https://github.com/AskTiba/PullBoard/issues)

---

## 💎 The Vision: "Intelligence with Intent"
PullBoard transcends traditional tracking. It is a "vibe-centric" mission control center designed for developers who demand both technical depth and visual excellence.

*   **iOS-First Aesthetic:** Glassmorphism, meaningful micro-interactions, and a premium color palette (#F3F7FA).
*   **Modular Monolith Architecture:** Powered by **Hestia Core**, a scalable NestJS engine designed for zero-latency data delivery.
*   **Unified Identity:** Seamless GitHub OAuth integration with persistent mission-state management.

---

## 🏗️ Architectural Blueprint

### Core Technologies
| Layer | Stack | Authority Rationale |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite | Cutting-edge rendering with atomic component architecture. |
| **Backend** | NestJS 11 | Enterprise-grade modularity with strict dependency injection. |
| **Persistence** | Prisma 7 + PostgreSQL | Type-safe ORM with Neon serverless scalability. |
| **Styling** | Vanilla CSS + Tailwind | Custom design tokens with utility-first speed. |
| **CI/CD** | GitHub Actions + Render | Automated syntax validation and production-ready deployments. |

### System Design
PullBoard operates as a **Modular Monolith**. This allows the Hestia Backend to serve multiple project identities (PullBoard, ShopMaster, VibeCheck) through a single, high-performance gateway while maintaining strict domain isolation.

---

## 🚀 Orchestration (Getting Started)

### 1. Environment Configuration
Create a `.env` file in the `server/` directory:
```env
DATABASE_URL="postgresql://..."
GITHUB_CLIENT_ID="your_id"
GITHUB_CLIENT_SECRET="your_secret"
JWT_SECRET="mission_critical_secret"
CLIENT_URL="http://localhost:5173"
PORT=3000
```

### 2. Rapid Deployment
```bash
# Install unified workspace dependencies
npm install

# Initialize Database Schema
npm run prisma:generate -w server

# Launch the Ecosystem
npm run dev
```

---

## 🎨 Aesthetic Philosophy
PullBoard adheres to the **Supreme Authority Standard**:
*   **Contrast:** WCAG AA-compliant legibility.
*   **Motion:** Lottie-powered loaders and smooth transitions for reduced perceived latency.
*   **Consistency:** A strict adherence to our `#ffffff` and `#F3F7FA` base tokens, ensuring a "clean-room" environment for data analysis.

---

## 🗺️ Roadmap & Progress
Track our architectural evolution in [PROGRESS.md](./PROGRESS.md).
*   [x] Phase 1: Workspace Alignment & CI/CD
*   [x] Phase 2: iOS-First UI/UX Revamp
*   [x] Phase 3: Hestia Core Integration (OAuth & Database)
*   [ ] Phase 4: Real-time Repository Analytics (Active)

---

## 🤝 Contribution & Governance
We maintain high engineering standards. All contributions must pass the **Supreme Standard Audit**:
1.  Strict TypeScript (no `any`).
2.  Conventional Commits (`feat:`, `fix:`, `chore:`).
3.  Automated tests for all backend logic.

*PullBoard is crafted with precision by the Hestia Core Team.*
