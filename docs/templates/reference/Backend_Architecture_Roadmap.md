# Master Backend Architecture & Implementation Roadmap

This document serves as the definitive technical guide for building, deploying, and documenting a professional-grade backend for the **ShopMaster**, **VibeCheck**, and **EliteAid** suite.

---

## 1. Architectural Strategy: The Modular Monolith

To maximize efficiency as a solo developer, we will use a **Modular Monolith** architecture. This allows you to manage **one codebase, one database, and one deployment** while keeping the business logic for each app strictly separated.

### Why this works:
*   **Shared Foundation:** You build the "Core" (Auth, User Management, Logging) once, and all three projects use it.
*   **Logical Isolation:** Each project lives in its own NestJS Module (e.g., `src/modules/shop-master`).
*   **Cost Efficiency:** You stay within the free tiers of your infrastructure because you aren't running multiple servers.

---

## 2. Technical Stack (The "Zero-Cost" Professional Stack)

| Component | Technology | Why? |
| :--- | :--- | :--- |
| **Runtime** | Node.js + TypeScript | Industry standard, leverages your JS skills. |
| **Framework** | NestJS | Senior-level structure, built-in dependency injection, and modularity. |
| **Database** | PostgreSQL (Neon.tech) | Reliable, relational, and scales perfectly with PostGIS for VibeCheck. |
| **ORM** | Prisma | Type-safe database operations that feel like native TypeScript. |
| **Hosting** | Render | Handles persistent servers and WebSockets (required for VibeCheck/EliteAid) better than Vercel. |
| **API Docs** | Swagger (OpenAPI) | Automatically generates a live testing UI for your frontend. |

---

## 3. Deployment Strategy: The Hybrid Cloud

*   **Backend (NestJS):** Deployed on **Render**. This ensures your WebSockets and background tasks run reliably.
*   **Frontend (Next.js):** Deployed on **Vercel**. This ensures your UI is globally fast and optimized for the user.
*   **Database (Postgres):** Hosted on **Neon.tech**. Provides a specialized, serverless database that is easy to manage.

---

## 4. Authentication Strategy & Limitations

By choosing a custom backend over a managed service like Supabase, you gain control but also inherit several responsibilities and limitations.

### 4.1. The JWT Approach
We will use **JSON Web Tokens (JWT)** for stateless authentication.

**Limitations to Watch Out For:**
1.  **Token Revocation:** Stateless JWTs cannot be easily revoked before they expire. If a user's phone is stolen, the token remains valid until it expires unless you implement a "Blacklist" (using Redis).
2.  **Social Auth Overhead:** Implementing "Login with Google" or "Login with Apple" requires manual setup of OAuth2 strategies using Passport.js. It is not a "one-click" feature like in Supabase.
3.  **Security Responsibility:** You are responsible for securely storing secrets, managing Refresh Token rotation, and ensuring cookies are `HttpOnly` and `Secure` to prevent XSS attacks.
4.  **No Built-in "Magic Links":** Features like passwordless email login (Magic Links) must be coded manually using an email service like Resend.

---

## 5. Implementation Roadmap (The "Staged Growth" Path)

### Phase 1: The Core Foundation (Do this first)
1.  **Initialize NestJS:** Set up the project with TypeScript and ESLint.
2.  **Infrastructure:** Set up Docker for local Postgres and Redis.
3.  **The Shared Module:** Build a robust `User` and `Auth` module (JWT-based).
4.  **Documentation:** Configure Swagger so you can see your progress.

### Phase 2: ShopMaster (The First App)
*   **Why start here?** It focuses on the fundamentals of CRUD, relational data, and financial accuracy—essential skills before moving to complex Maps or Payments.
*   **Key Tasks:** Build the Inventory, Sales, and Profit/Loss modules.

### Phase 3: VibeCheck (The Second App)
*   **New Skills:** Geospatial queries (PostGIS) and Real-time updates (WebSockets).
*   **Key Tasks:** Build the Map Discovery and "Crowd Meter" modules.

### Phase 4: EliteAid (The Final App)
*   **New Skills:** Complex marketplace payments (Stripe) and Background jobs (BullMQ).
*   **Key Tasks:** Build the Escrow, Booking, and Safety/SOS modules.

---

## 5. Senior Developer Tips
*   **Document as you go:** Use Swagger decorators in your NestJS code so your API documentation is always up to date.
*   **Use Docker locally:** This ensures that "it works on my machine" also means "it works on Render."
*   **Test your logic:** Write Unit Tests for your financial calculations (ShopMaster) and your payment logic (EliteAid) to avoid costly bugs.
