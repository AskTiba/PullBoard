# PullBoard

**PullBoard** is a premium GitHub management and productivity dashboard, serving as a flagship application within the **Hestia Unified Ecosystem**. Designed for high-performance teams and individual developers, it provides an elegant, "vibe-centric" interface for tracking pull requests, reviews, and repository activity.

---

## 🌟 Vision
PullBoard is currently undergoing a complete architectural and visual overhaul. Our goal is to transform it from a simple tracker into a professional-grade tool that prioritizes:
*   **Premium UI/UX:** A smooth, iOS-inspired aesthetic with meaningful transitions and interactive feedback.
*   **Unified Intelligence:** Powered by the **Hestia Unified Backend**, integrating seamlessly with other tools in the ecosystem like ShopMaster and VibeCheck.
*   **Performance First:** Optimized data fetching and state management for a zero-latency experience.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React 19 (Vite)
*   **Styling:** Tailwind CSS (Modern, utility-first)
*   **State Management:** TanStack Query & Zustand
*   **Interactivity:** Lottie Animations & Recharts

### Backend (Hestia Core)
*   **Runtime:** Bun / Node.js (TypeScript)
*   **Framework:** NestJS (Modular Monolith)
*   **Database:** PostgreSQL (Neon.tech)
*   **ORM:** Prisma 7

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (LTS) or Bun
*   Git

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AskTiba/PullBoard.git
    ```
2.  **Install dependencies from the root:**
    ```bash
    npm install
    ```

### Development
Start both the client and server concurrently:
```bash
npm run dev
```

Or run them individually:
```bash
npm run dev:client
npm run dev:server
```

---

## 📁 Project Structure
*   `client/`: React-based frontend dashboard.
*   `server/`: NestJS-based Hestia Unified Backend.
*   `docs/templates/`: Reusable blueprints and architectural guides for the Hestia ecosystem.

---
*PullBoard is a project by the Hestia Core Team.*
