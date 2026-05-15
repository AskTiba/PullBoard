# Architectural Record: Production Deployment Runbook

## Overview
This document serves as the authoritative guide for deploying the **Kinetix** application to production environments.

## 1. Deployment Sequence (Inside-Out)
1. **Database:** Neon.tech (PostgreSQL)
2. **Backend:** Render (NestJS)
3. **Frontend:** Vercel (React/Vite)

## 2. Infrastructure Configuration
Ensure the following environment variables are strictly configured in the respective hosting platforms:

### Backend (Render)
- `DATABASE_URL`: Connection string from Neon.tech.
- `GITHUB_CLIENT_ID`: OAuth Client ID.
- `GITHUB_CLIENT_SECRET`: OAuth Client Secret.
- `JWT_SECRET`: High-entropy secret key.
- `PORT`: 3000

### Frontend (Vercel)
- `VITE_API_URL`: The production URL provided by Render.

---
*Last updated: 15 May 2026*
