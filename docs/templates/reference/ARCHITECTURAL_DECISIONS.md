# Hestia: Architectural Decisions & Strategy Log

This document records the strategic discussions, concerns addressed, and the senior-level rationale behind the architecture of the Hestia Unified Backend.

## 1. Project Naming & Unified Identity
- **Concern**: Naming the database "ShopMaster" while it also houses "VibeCheck" and "EliteAid" data.
- **Decision**: Rename the entire backend ecosystem to **"Hestia"**.
- **Rationale**: Hestia is a **Modular Monolith**. Using a unified name reflects the shared core (Auth, Database, Infrastructure) while allowing individual apps to exist as modules. This simplifies maintenance and reduces costs to zero.

## 2. Repository Visibility & Professional Showcase
- **Concern**: How to showcase backend work if the repository is set to PRIVATE for security.
- **Decision**: Keep the production repo Private; use **Swagger UI** and a **Showcase Repo** for portfolios.
- **Rationale**: A production repo contains sensitive deployment history. Sharing the **Live Swagger URL** is the most effective "Senior" way to prove the API works. A separate, sanitized public repo can be created later to show the logic without risking production data.

## 3. Live API Protection
- **Concern**: Unauthorized users populating the database via the public Render URL.
- **Decision**: Implement a **`REGISTRATION_KEY`** requirement.
- **Rationale**: By requiring a secret key (stored in environment variables) during the `/auth/register` flow, we "lock" the API. Only the owner can create accounts, preventing bot spam and unauthorized data entry on the live server.

## 4. Database Scalability & Table Count
- **Concern**: Worry that 20+ tables and multiple apps will make the database too large or slow.
- **Decision**: Stick to the Relational Modular Monolith.
- **Rationale**: 
    - **PostgreSQL efficiency**: Many specific tables are faster than a few "giant" tables.
    - **Neon Storage**: 500MB is enough for millions of rows of text.
    - **Indexing**: We use relational IDs to ensure queries remain fast (sub-10ms) regardless of data growth.

## 5. Account Deletion & Privacy
- **Concern**: How to handle users who want to leave without breaking business records.
- **Decision**: Implement **Anonymization**.
- **Rationale**: Deleting a user "Hard" breaks sales history. By scrambling personal info and marking the user as deleted, we fulfill privacy laws (GDPR) while keeping the shop's financial audit trail intact.

## 6. Future-Proofing & Extensibility
- **Concern**: Is the backend ready for new, unplanned ideas?
- **Decision**: Stateless JWT + Modular Design.
- **Rationale**: Because the API is **Stateless** (uses tokens, not sessions), it can scale horizontally on Render. Because it is **Modular**, new app ideas can be added as "Lego blocks" without touching existing code.

---
**Verdict**: The Hestia Core is engineered for high trust, low cost, and infinite growth.
