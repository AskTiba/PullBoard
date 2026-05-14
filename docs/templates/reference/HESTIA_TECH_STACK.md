# Hestia Core: Technical Stack & Architecture Guide

This document provides a professional breakdown of the technologies, tools, and engineering techniques used to build the Hestia Unified Backend.

## 1. Core Framework & Runtime
- **[Bun](https://bun.sh/)**: Chosen as the JavaScript runtime and package manager.
    - **Why**: 3x-4x faster than Node.js for installation and execution, with native TypeScript support.
- **[NestJS](https://nestjs.com/)**: The core backend framework.
    - **Why**: It enforces a **Modular Monolith** architecture, making it easy to isolate ShopMaster, VibeCheck, and EliteAid while sharing code like Authentication. It follows professional SOLID principles used in enterprise environments.

## 2. Data Layer
- **[Prisma 7 (ORM)](https://www.prisma.io/)**: The Object-Relational Mapper.
    - **Why**: Provides 100% Type Safety. It generates a custom client based on our schema, preventing database errors before the code even runs.
- **[Neon.tech](https://neon.tech/)**: Serverless PostgreSQL.
    - **Why**: Offers high-performance database hosting with a "Zero-Cost" entry tier. It scales automatically based on traffic and supports advanced features like branching.
- **[PostgreSQL Adapter (pg)](https://node-postgres.com/)**:
    - **Why**: Used for Prisma 7 compliance to handle runtime database connections securely and efficiently.

## 3. Security & Identity
- **[JWT (JSON Web Tokens)](https://jwt.io/)**: Stateless authentication mechanism.
    - **Why**: Allows the server to identify users without storing "sessions" in memory, making the backend horizontally scalable.
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)**: Industry-standard password hashing.
    - **Why**: Ensures that even if the database is compromised, user passwords remain unreadable and secure.
- **[Passport.js](https://www.passportjs.org/)**: Authentication middleware for NestJS.
    - **Why**: Provides a modular way to implement security "Strategies" (like JWT now, and Social Auth later).

## 4. Real-time & Geospatial Features
- **[Socket.io](https://socket.io/)**: WebSocket framework.
    - **Why**: Powers the **VibeCheck Crowd Meter**, allowing the server to "push" live updates to users instantly without them having to refresh.
- **[Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)**:
    - **Technique**: Manual implementation of the mathematical formula to calculate the distance between two GPS coordinates.
    - **Why**: Allows high-performance "Nearby Search" directly in the Hestia engine without paying for expensive Google Maps API calls for every search.

## 5. Professional Engineering Techniques
- **Modular Monolith**: Keeping multiple apps in one server but in separate modules.
    - **Benefit**: Reduces hosting costs to zero and simplifies maintenance.
- **Atomic Transactions (`$transaction`)**:
    - **Technique**: Ensuring multiple database updates (e.g., reduce stock + log sale) happen as one unit.
    - **Benefit**: Prevents "corrupted data" where a sale is logged but stock isn't updated.
- **DTOs (Data Transfer Objects)**:
    - **Technique**: Using classes to strictly define what data the API accepts.
    - **Benefit**: Prevents "Overposting" attacks and ensures the backend only processes valid information.
- **OnModuleInit/Destroy Hooks**:
    - **Technique**: Explicitly managing the start and stop of database connections.
    - **Benefit**: Prevents connection leaks and ensures the server is "Healthy" before it starts accepting users.

## 6. Documentation & Deployment
- **[Swagger / OpenAPI](https://swagger.io/)**:
    - **Why**: Automatically generates a website (`/api`) that documents every endpoint. Essential for frontend developers to understand how to use the backend.
- **[Render.com](https://render.com/)**: Cloud hosting.
    - **Why**: Professional automated deployment (CI/CD). Every time we push code to GitHub, Render automatically builds and updates the live server.

---
**Status**: Feature-Complete | Stable | Scalable
