# SaaS Development & CI/CD Pipeline Specification Guide
> **Architecture Level:** Production-Grade OPC SaaS Infrastructure Blueprint  
> **Target Audience:** AI Software Engineers (Codex / Cursor / Claude Code), System Architects, DevOps Engineers  
> **Purpose:** This file acts as an automated system execution spec, architectural standard, and risk-prevention guardrail. AI Coding Agents should periodically scan and reference this document to execute project scaffolding, automated testing, migration checks, and CI/CD pipelines.

---

## 1. Tech Stack Overview (AIOX Full-Stack Infrastructure)

This project strictly adheres to the following modern, type-safe full-stack technology stack:

- **Frontend / Framework:** Next.js (App Router, React Server Components)
- **Styling & UI:** Tailwind CSS + shadcn/ui
- **Analytics & Tracking:** PostHog
- **Backend & Database:** Supabase (Auth & PostgreSQL)
- **ORM Layer:** Drizzle ORM (Managing Supabase Postgres)
- **Data Validation & Schemas:** Zod (Form Validation & API Request/Response Parsing)
- **Transactional Emails:** Resend + React Email (sent via Gmail/Custom Domain)
- **Payments & Subscriptions:** Lemon Squeezy
- **Hosting & Infrastructure:** Vercel (Production / Preview Deployments)
- **Version Control & Repository:** Local Git + GitHub Cloud Repository
- **DNS & CDN / Security:** Cloudflare (Domain Management & DDoS Protection)
- **Monitoring & Error Tracking:** Sentry (Real-time Error Capturing & Alerts)

---

## 2. Automated Pipeline & CI/CD Workflow Architecture

```
[ Git Push / Pull Request ]
       │
       ├───> Step 1: CI Stage (GitHub Actions Runner)
       │       ├── 1. Code Style & Type Safety (pnpm lint && pnpm tsc --noEmit)
       │       ├── 2. Security Secret Scanning (Gitleaks / TruffleHog)
       │       ├── 3. Schema & API Contract Check (Zod Validation Tests)
       │       ├── 4. Unit & Integration Tests (Vitest + React Testing Library)
       │       ├── 5. End-to-End Testing (Playwright - Auth & Checkout Flows)
       │       └── 6. Dry Run Build (Next.js App Router Build Verification)
       │
       ├───> Step 2: Database Migration Stage (Drizzle ORM + Supabase)
       │       └── Safe Migration Execution (Expand-Contract Strategy)
       │
       └───> Step 3: CD Deployment Stage (Vercel Production / Preview)
               ├── Preview Environment (Triggered on PR: Isolated URL + Sandbox Analytics)
               └── Production Environment (Triggered on Main Merge: Zero-Downtime Deploy)
                       ├── Domain & Edge Routing (Cloudflare Cache Purge)
                       └── Monitoring & Alerting (Sentry Releases + Resend Alerts)
```

---

## 3. GitHub Actions CI/CD Pipeline Configuration

File Location: `.github/workflows/ci-cd.yml`

```yaml
name: SaaS Production CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security-and-lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Secret Scanning (Gitleaks)
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  test-and-build:
    needs: security-and-lint
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      LEMON_SQUEEZY_API_KEY: ${{ secrets.LEMON_SQUEEZY_API_KEY }}
      SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Code Lint & TypeScript Check
        run: |
          pnpm lint
          pnpm tsc --noEmit

      - name: Run Unit & Schema Tests (Vitest)
        run: pnpm test:run

      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps

      - name: Run E2E Tests (Playwright)
        run: pnpm test:e2e

      - name: Drizzle Migration Safety Check
        run: pnpm drizzle-kit check

      - name: Dry Run Next.js Build
        run: pnpm build
```

---

## 4. Automated Testing & Verification Protocols

All AI agents and developers must enforce test coverage across key layers:

| Layer / Technology | Automated Verification Strategy | Execution Command |
| :--- | :--- | :--- |
| **Zod Schemas & API Rules** | Validate strict type inference, input boundary limits, and sanitization before hitting database/services. | `pnpm test:run` |
| **React Email & Resend** | Render email components to raw HTML strings; verify no broken links or missing variables exist. | `pnpm test:run` |
| **Drizzle ORM & Supabase** | Perform `drizzle-kit check` to ensure physical Postgres tables match local TypeScript schema files. | `pnpm db:check` |
| **Lemon Squeezy Webhooks** | Use Playwright mocks to simulate webhook events (`order_created`, `subscription_cancelled`) and verify user entitlement status. | `pnpm test:e2e` |
| **Supabase Auth** | Execute Playwright E2E suites for user sign-up, magic links, session management, and protected routes. | `pnpm test:e2e` |
| **PostHog & Sentry** | Verify event payloads in test runners and ensure Sentry sourcemaps upload properly during build. | `pnpm build` |

---

## 5. Risk Assessment & Automated Mitigation Strategy (Guardrails)

AI agents (e.g., Codex) executing changes in this repository MUST comply with these 6 critical safety rules:

### 1. Database Migration Safety (Expand-Contract Principle)
* **Risk:** Destructive SQL changes (`DROP COLUMN`, type altering) cause `500` errors for active sessions.
* **Rule:** **NEVER** output destructive schema modifications in a single deploy. Use a 2-phase migration:
  1. *Phase 1 (Expand):* Add new column/table, deploy new code reading both.
  2. *Phase 2 (Contract):* Migrate data, update code to ignore old column, then drop old column in a subsequent deploy.
* **Execution:** All migrations must run inside SQL transactions (`BEGIN; ... COMMIT;`).

### 2. Webhook & Payment Reliability (Idempotency & Retry)
* **Risk:** Network drops during Lemon Squeezy webhook execution cause missing paid subscriptions.
* **Rule:** Store all raw webhook payloads in a Supabase `webhook_events` table with unique `event_id`.
* **Execution:** Implement processing idempotency. Re-run unhandled webhook events via Supabase Edge Function cron jobs.

### 3. Secret Leakage Prevention
* **Risk:** Storing `SERVICE_ROLE_KEY` or API keys in public code commits.
* **Rule:** Gitleaks scans every PR in GitHub Actions.
* **Execution:** Block pipeline immediately if any token string matches known provider regex patterns.

### 4. Edge CDN Sync & Cache Clearing
* **Risk:** Hydration errors due to Cloudflare stale cache pointing to mismatched Next.js App Router server assets.
* **Rule:** Automate Cloudflare cache purge upon successful Vercel deployment.
* **Execution:** Include a post-deployment webhook triggering Cloudflare API purge.

### 5. Cost & Telemetry Overrun Protection
* **Risk:** Infinite loops or error spikes leading to high Sentry / PostHog bills.
* **Rule:** Keep production transaction sampling rate controlled (`tracesSampleRate <= 0.2`).
* **Execution:** Load PostHog and Sentry asynchronously (`async`/`defer`) to protect page rendering speeds.

### 6. AI Agent Code Boundary Protection
* **Risk:** AI auto-committing untested code or bypassing validation logic directly to `main`.
* **Rule:** GitHub branch protection enabled on `main`. Requires passing CI status checks + Human-in-the-loop review.

---

## 6. Standardized Project Scripts (`package.json`)

Ensure the following script configuration exists in the project root:

```json
{
  "name": "opc-saas-starter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:check": "drizzle-kit check",
    "db:studio": "drizzle-kit studio",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "prepare-release": "pnpm lint && pnpm type-check && pnpm test:run && pnpm build"
  }
}
```

---

## 7. AI Agent Execution Protocol (For Codex / Cursor)

When an AI Coding Agent scans or executes tasks based on this specification, it MUST follow this workflow:

1. **Scan Specification:** Read `.saas-spec.md` to load tech stack rules and safety constraints.
2. **Context Validation:** Verify that new features maintain Zod schemas, TypeScript types, and Drizzle models in sync.
3. **Execution & Verification:**
   - Write code & schemas.
   - Generate corresponding Vitest / Playwright test cases.
   - Run `pnpm prepare-release` locally.
4. **Pull Request Submission:** Submit PR with detailed description and test verification outputs. Do not push directly to `main`.
