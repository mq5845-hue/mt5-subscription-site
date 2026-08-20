# MT5 Subscription Site

## Please strict follow rules in [saas-architecture-spec.md](./saas-architecture-spec.md)

## Outcome

Deliver a production-ready website for MT5 services, including the subscription flow and required management functions.

## Current status

- 專案已遷移至此 AIOS-Core 工作目錄。
- Git 遠端：`https://github.com/mq5845-hue/mt5-subscription-site.git`

## Code repository


- Git 專案本機路徑：`G:\我的雲端硬碟\AIOS-Core\workspace\projects\2026-08-07--mt5-subscription-site`

## Next action

檢視既有未提交變更，完成測試後建立清楚的 Git 提交並推送到 GitHub。


## Local development after migration

This Google Drive working tree intentionally excludes 
ode_modules, .next, and .env.local.

`ash
npm ci
npm run dev
`

Open this folder in VS Code (code .) and browse to http://localhost:3000. Recreate .env.local from your secure local secret store when the app needs environment variables; never commit it or sync it to Google Drive.
## Done when

- The website is deployed and accessible.
- The subscription flow works end to end.
- Essential operating instructions are recorded.


