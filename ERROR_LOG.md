# Error Log: Tactical Resolution Record

## [2026-05-15] - Prisma 7 & Neon Connectivity

### Fault: `P1012` / `P1001` (Connection & Schema Validation)
- **Symptom**: Backend failed to start; Prisma CLI rejected `url` in schema; Neon connection failed via WebSocket driver.
- **Root Cause**: Prisma 7's new "No-URL-in-Schema" mandate and WebSocket proxy latency in the serverless driver.
- **Resolution**: 
    1. Removed `url` from `schema.prisma`.
    2. Switched to standard `pg` driver and `@prisma/adapter-pg` for direct TCP stability.
    3. Implemented regex quote-stripping for `DATABASE_URL` to handle Windows environment variables.

### Fault: `Request quota exhausted` (GitHub API)
- **Symptom**: 403 errors during PR searches.
- **Root Cause**: Simultaneous guest requests during Dashboard loading (unauthenticated limit: 10/min).
- **Resolution**: 
    1. Implemented a 5-minute Global Search Cache in `GithubBaseService`.
    2. Added Anti-Throttle Jitter (staggered delays) in the Deep Audit loop.
    3. Forced OAuth token prioritization for authenticated requests (30+ req/min).

### Fault: `TS7016` / `TS2345` (Type Mismatches)
- **Symptom**: Server failed to compile after adapter implementation.
- **Root Cause**: Missing `@types/ws` and strict Pool type discrepancies in the Neon adapter.
- **Resolution**: Installed type definitions and applied authoritative type assertions in `PrismaService`.
