# Architectural Record: Auth Module Migration

## Overview
This document outlines the transition from Firebase Authentication to a secure, native GitHub OAuth implementation using **Passport.js** and **Prisma/PostgreSQL**.

## 1. Goal
Implement a stateless, high-performance identity provider that persists user sessions via JWTs and relational user profiles in our PostgreSQL database.

## 2. Technical Stack
- **OAuth Provider:** GitHub OAuth2 (via `passport-github2`)
- **Identity Storage:** PostgreSQL (via `Prisma`)
- **Database Provider:** Neon.tech (Serverless Postgres)
- **Session Management:** JWT (JSON Web Tokens)
- **Framework:** NestJS Passport Module

## 3. Flow Design
1. **Initiation:** Client triggers redirect to `/auth/github`.
2. **Passport Strategy:** Backend uses `passport-github2` to verify credentials against GitHub.
3. **Session Establishment:** Upon successful callback, the user is created/updated in the Prisma `User` model.
4. **Tokenization:** A signed JWT is returned to the client and stored in memory (or a secure HttpOnly cookie).

## 4. Prisma Schema Requirements
We require a new `User` model:
```prisma
model User {
  id        String   @id @default(uuid())
  githubId  String   @unique
  username  String   @unique
  email     String?
  avatarUrl String?
  createdAt DateTime @default(now())
}
```

## 5. Implementation Roadmap
- [x] Install Prisma & Configure PostgreSQL connection.
- [x] Define User Schema and run migration.
- [ ] Implement `GithubStrategy` within `AuthModule`.
- [ ] Create `AuthController` to handle OAuth callbacks and JWT generation.
- [ ] Protect backend routes using NestJS `JwtAuthGuard`.

---
*Last updated: 14 May 2026*
