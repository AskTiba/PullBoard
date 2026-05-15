# Error Log: PullBoard Revamp

| Date | Error Description | Root Cause | Detailed Solution |
| :--- | :--- | :--- | :--- |
| 2026-05-15 | Unprotected PR routes | PrController lacked JwtAuthGuard; frontend routes public | Applied JwtAuthGuard to PrController and implemented ProtectedRoute wrapper in App.tsx |
| 2026-05-15 | Auth flow non-functional end-to-end | 8 compounding issues: missing env vars, no user persistence, hardcoded secrets, legacy dual-server conflicts, discarded accessToken, unconfigured CORS | Complete auth revamp: fixed all 4 auth module files, configured .env, deleted 6 legacy directories, secured credentials |

| 2026-05-15 | Real credentials exposed in `.env.example` | User placed actual secrets in template file | Moved to `.env` (gitignored), replaced `.env.example` with placeholders |
| 2026-05-15 | Legacy `server.ts` / `config/env.ts` crash risk | Firebase-era env vars required by dead Express entry point | Deleted `server.ts`, `config/env.ts`, and all legacy Express code |
| 2026-05-15 | Navbar state persistence | Navbar lacked session awareness | Implemented useEffect to track auth_token for dynamic Navbar rendering |
| 2026-05-14 | Auth frontend integration | Missing backend redirect hook | Wired Auth.tsx button to /auth/github |
| 2026-05-14 | Auth compilation error | Leftover firebase-admin import in AuthService | Purged Firebase-admin code from AuthService |
| 2026-05-15 | GithubStrategy startup crash | Env variables resolved before super() call | Refactored constructor to inject and use ConfigService directly |
| 2026-05-14 | Auth frontend callback | Missing token capture | Implemented AuthSuccess component to capture JWT |
| 2026-05-14 | Repo module migration | Legacy Express structure | Ported RepoService and RepoController to GithubModule |
| 2026-05-14 | Backend integration | Missing security verification | Implemented e2e tests for Github routes using Supertest |
| 2026-05-14 | Backend integration test fail | Octokit initialization in test | Mocked GithubService in e2e suite |
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
