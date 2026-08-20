# MT5 Subscription Site

- Git 專案本機路徑：`G:\我的雲端硬碟\AIOS-Core\workspace\projects\2026-08-07--mt5-subscription-site`

## Please strict follow rules in [saas-architecture-spec.md](./saas-architecture-spec.md)


## 遷移後的本機啟動

此 Google Drive 工作樹刻意不含 `node_modules`、`.next` 與 `.env.local`。

```bash
npm ci
npm run dev
```

請用 VS Code 開啟此資料夾（`code .`），再以瀏覽器開啟 `http://localhost:3000`。應用程式需要環境變數時，請從安全的本機密鑰保存處重建 `.env.local`；不可提交 Git，也不可同步至 Google Drive。

## Next action

檢視目前未提交的程式碼與新增素材，確認它們屬於同一項功能，完成測試後再建立一次清楚的 Git 提交。



----------------------------------------------------------------------
中文說明：
AIOS-Core\workspace\projects\2026-08-07--mt5-subscription-site\README.md

這個資料夾現在是 MT5 訂閱網站的 AIOS 管理入口與唯一 Git 工作副本。

之後與這個 "MT5 訂閱網站" 有關的需求、決策、待辦、會議筆記、測試紀錄、程式碼與交付說明，都在這個 AIOS 專案資料夾管理。

