# Error Log: PullBoard Revamp

| Date | Error Description | Root Cause | Detailed Solution |
| :--- | :--- | :--- | :--- |
| 2026-05-14 | AuthGuard implementation | Route exposure | Implemented JwtStrategy and JwtAuthGuard for route protection |
| 2026-05-14 | Auth e2e test crash | Missing @nestjs/config in test suite | Installed `@nestjs/config` and imported it in `auth.controller.spec.ts` |
| 2026-05-14 | GithubStrategy crash | Missing dependency injection for ConfigService | Refactored strategy to inject ConfigService |
| 2026-05-14 | Auth e2e test failure | Unknown authentication strategy "github" | Provided 'name' property in GithubStrategy mock for Passport registration |
| 2026-05-14 | Auth e2e test crash | Missing env config in test suite | Imported ConfigModule in testing module |
| 2026-05-14 | GithubStrategy build failure | Missing type declarations for passport-github2 | Installed `@types/passport-github2` dev dependency |
| 2026-05-14 | GithubStrategy build failure | Type mismatch (string | undefined) | Asserted env variables as string |
| 2026-05-14 | Auth e2e test failure | Namespace import error for supertest | Switched `import * as request` to default `import request` in spec file |
| 2026-05-14 | Auth validation suite | Missing verification layer | Implemented NestJS e2e test suite for AuthController |
| 2026-05-14 | JWT implementation | Missing secure session management | Integrated @nestjs/jwt into AuthController |
| 2026-05-14 | Github OAuth implementation | Missing Auth structure | Ported Passport.js strategy to AuthModule |
| 2026-05-14 | Database provider selection | Architecture choice | Selected Neon.tech for Postgres persistence |
| 2026-05-14 | Prisma init failure (casing) | Casing conflict in route files | Renamed `Prs.route.ts` to `prs.route.ts` |
| 2026-05-14 | Prisma schema init | Success | Initialized schema and User model |
