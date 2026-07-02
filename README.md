# mt5-subscription-site

This project includes a working reservation flow wired to Supabase, Google Form, and LINE.

## Quick Links

- Final summary: [`docs/final-version-summary.md`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/final-version-summary.md)
- Go-live checklist: [`docs/go-live-checklist.md`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/go-live-checklist.md)
- Vercel env paste list: [`docs/vercel-env-paste-list.md`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/vercel-env-paste-list.md)
- Supabase schema: [`docs/supabase-reservation-schema.sql`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/supabase-reservation-schema.sql)

## Core routes

- Reservation page: `/line-kb/reservation`
- Reservation API: `/api/reservation`
- LINE webhook: `/api/line`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Automation

- `npm run check` runs the full local quality gate: ESLint first, then production build.
- `npm run ship "your message"` stages changes, creates a commit, and pushes to GitHub when `origin` is set.
- GitHub Actions runs the same check on every `push` and `pull_request`.
- GitHub Actions also deploys to Vercel automatically on every `push` to `master` once these repository secrets are added: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
- The Vercel workflow uses the production build output, so every successful push can publish a fresh live version.

If `origin` is not configured yet, `npm run ship` will still create the local commit and tell you how to add your GitHub repository URL.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
