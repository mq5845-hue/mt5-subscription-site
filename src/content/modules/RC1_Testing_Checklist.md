# RC1 Testing Checklist

**Project:** XAUUSD_Quant_Pro_v1  
**Release Candidate:** XAUUSD_Quant_Pro_v1_RC1  
**Version:** 1.0.0-RC1  
**Document Date:** 2026-06-22

---

## A. Compile Evidence Checklist

| # | Checklist Item | Status | Evidence / Notes |
|---:|---|---|---|
| 1 | EA 檔案名稱確認：`XAUUSD_Quant_Pro_v1_RC1_Module24_FinalIntegration_CommercialReleaseCandidate.mq5` | ☐ Pass ☐ Fail | |
| 2 | MetaEditor Build 已記錄 | ☐ Pass ☐ Fail | |
| 3 | MT5 Terminal Build 已記錄 | ☐ Pass ☐ Fail | |
| 4 | Broker / Server 已記錄 | ☐ Pass ☐ Fail | |
| 5 | Symbol = XAUUSD | ☐ Pass ☐ Fail | |
| 6 | Timeframe = H1 / H4 | ☐ Pass ☐ Fail | |
| 7 | 編譯結果截圖已保存 | ☐ Pass ☐ Fail | |
| 8 | 0 Errors | ☐ Pass ☐ Fail | |
| 9 | 0 Warnings | ☐ Pass ☐ Fail | |
| 10 | `.mq5` 原始碼已備份 | ☐ Pass ☐ Fail | |
| 11 | `.ex5` 編譯檔已備份 | ☐ Pass ☐ Fail | |
| 12 | 版本標籤 RC1 已記錄 | ☐ Pass ☐ Fail | |
| 13 | Build Signature 已記錄 | ☐ Pass ☐ Fail | |

---

## B. Strategy Tester Smoke Test Checklist

|   # | Checklist Item                   | Status        | Evidence / Notes |
| --: | -------------------------------- | ------------- | ---------------- |
|   1 | OnInit 正常                        | ☐ Pass ☐ Fail |                  |
|   2 | OnTick 正常                        | ☐ Pass ☐ Fail |                  |
|   3 | OnDeinit 正常                      | ☐ Pass ☐ Fail |                  |
|   4 | OnTester 不報錯                     | ☐ Pass ☐ Fail |                  |
|   5 | Dashboard 正常顯示                   | ☐ Pass ☐ Fail |                  |
|   6 | Logger 不過量輸出                     | ☐ Pass ☐ Fail |                  |
|   7 | SignalEngine 正常計算                | ☐ Pass ☐ Fail |                  |
|   8 | RiskController 正常輸出狀態            | ☐ Pass ☐ Fail |                  |
|   9 | LiveSafetyGuard 預設阻擋實盤交易         | ☐ Pass ☐ Fail |                  |
|  10 | ControlledExecutionGate 狀態正確     | ☐ Pass ☐ Fail |                  |
|  11 | FaultToleranceGuard 未誤判 Critical | ☐ Pass ☐ Fail |                  |
|  12 | NewsEventRiskFilter 不造成初始化錯誤     | ☐ Pass ☐ Fail |                  |
|  13 | PortfolioGovernance 不造成誤封鎖       | ☐ Pass ☐ Fail |                  |
|  14 | 無 Runtime Error                  | ☐ Pass ☐ Fail |                  |
|  15 | 無 Critical Error                 | ☐ Pass ☐ Fail |                  |
|  16 | 無無限 Print                        | ☐ Pass ☐ Fail |                  |
|  17 | 無回測卡死                            | ☐ Pass ☐ Fail |                  |

---

## C. 1-Month Quick Backtest Checklist

| # | Checklist Item | Status | Evidence / Notes |
|---:|---|---|---|
| 1 | 訊號數量合理 | ☐ Pass ☐ Fail | |
| 2 | 無異常高頻交易 | ☐ Pass ☐ Fail | |
| 3 | 無重複下單 | ☐ Pass ☐ Fail | |
| 4 | Cooldown 生效 | ☐ Pass ☐ Fail | |
| 5 | MaxTradesPerDay 生效 | ☐ Pass ☐ Fail | |
| 6 | Spread Guard 生效 | ☐ Pass ☐ Fail | |
| 7 | News / Event Filter 生效 | ☐ Pass ☐ Fail | |
| 8 | RiskController 生效 | ☐ Pass ☐ Fail | |
| 9 | BreakEven 行為正確 | ☐ Pass ☐ Fail | |
| 10 | TrailingStop 行為正確 | ☐ Pass ☐ Fail | |
| 11 | Advanced Exit 僅處理本 EA 持倉 | ☐ Pass ☐ Fail | |
| 12 | 無非法手數 | ☐ Pass ☐ Fail | |
| 13 | 無無效 SL / TP | ☐ Pass ☐ Fail | |
| 14 | 無重大 Retcode 異常 | ☐ Pass ☐ Fail | |
| 15 | Missing Data Guard 正常 | ☐ Pass ☐ Fail | |
| 16 | Recovery / Reconstruction 狀態正常 | ☐ Pass ☐ Fail | |

---

## D. 3-Year Historical Backtest Checklist

| # | Checklist Item | Status | Evidence / Notes |
|---:|---|---|---|
| 1 | 3 年回測完整完成 | ☐ Pass ☐ Fail | |
| 2 | 無重大 Runtime Error | ☐ Pass ☐ Fail | |
| 3 | Net Profit 已記錄 | ☐ Pass ☐ Fail | |
| 4 | Max Drawdown 已記錄 | ☐ Pass ☐ Fail | |
| 5 | Relative Drawdown 已記錄 | ☐ Pass ☐ Fail | |
| 6 | Profit Factor 已記錄 | ☐ Pass ☐ Fail | |
| 7 | Recovery Factor 已記錄 | ☐ Pass ☐ Fail | |
| 8 | Total Trades 已記錄 | ☐ Pass ☐ Fail | |
| 9 | Win Rate 已記錄 | ☐ Pass ☐ Fail | |
| 10 | Consecutive Losses 已記錄 | ☐ Pass ☐ Fail | |
| 11 | Equity Curve 未異常失真 | ☐ Pass ☐ Fail | |
| 12 | 多年份表現不過度集中 | ☐ Pass ☐ Fail | |
| 13 | 對 Spread / Commission 不過度敏感 | ☐ Pass ☐ Fail | |

---

## E. Optimization Small-Range Checklist

| # | Checklist Item | Status | Evidence / Notes |
|---:|---|---|---|
| 1 | 小範圍優化可執行 | ☐ Pass ☐ Fail | |
| 2 | OnTester 回傳穩定 | ☐ Pass ☐ Fail | |
| 3 | 無除以 0 或資料不足錯誤 | ☐ Pass ☐ Fail | |
| 4 | 不選擇單一最高淨利作唯一標準 | ☐ Pass ☐ Fail | |
| 5 | 參數區間合理 | ☐ Pass ☐ Fail | |
| 6 | Drawdown 可接受 | ☐ Pass ☐ Fail | |
| 7 | 交易次數合理 | ☐ Pass ☐ Fail | |
| 8 | 多年份穩定 | ☐ Pass ☐ Fail | |
| 9 | 安全預設未被破壞 | ☐ Pass ☐ Fail | |

---

## F. Demo Forward Test Checklist

| # | Checklist Item | Status | Evidence / Notes |
|---:|---|---|---|
| 1 | Demo Forward Test 已啟動 | ☐ Pass ☐ Fail | |
| 2 | 連續運行至少 2 週 | ☐ Pass ☐ Fail | |
| 3 | VPS 重啟後恢復正常 | ☐ Pass ☐ Fail | |
| 4 | MT5 重啟後恢復持倉狀態 | ☐ Pass ☐ Fail | |
| 5 | Spread Guard 正常 | ☐ Pass ☐ Fail | |
| 6 | Slippage Guard 正常 | ☐ Pass ☐ Fail | |
| 7 | News Event Filter 正常 | ☐ Pass ☐ Fail | |
| 8 | RiskController 正常 | ☐ Pass ☐ Fail | |
| 9 | EmergencyStop 可用 | ☐ Pass ☐ Fail | |
| 10 | Dashboard / Logger 穩定 | ☐ Pass ☐ Fail | |
| 11 | 無重複下單 | ☐ Pass ☐ Fail | |
| 12 | 無手數錯誤 | ☐ Pass ☐ Fail | |
| 13 | 無 SL / TP 修改錯誤 | ☐ Pass ☐ Fail | |
| 14 | 未誤處理其他 EA / 手動持倉 | ☐ Pass ☐ Fail | |
| 15 | SignalOnly / DryRun 無錯誤下單 | ☐ Pass ☐ Fail | |

---

## G. MQL5 Market Pre-Check Checklist

| # | Checklist Item | Status | Evidence / Notes |
|---:|---|---|---|
| 1 | 0 Errors / 0 Warnings | ☐ Pass ☐ Fail | |
| 2 | 無 DLL | ☐ Pass ☐ Fail | |
| 3 | 無外部 EXE | ☐ Pass ☐ Fail | |
| 4 | 無 WebRequest() | ☐ Pass ☐ Fail | |
| 5 | 無外部新聞 API | ☐ Pass ☐ Fail | |
| 6 | 無特定本機路徑依賴 | ☐ Pass ☐ Fail | |
| 7 | 無硬編券商 / 帳號 / 使用者限制 | ☐ Pass ☐ Fail | |
| 8 | 無 OrderSend() | ☐ Pass ☐ Fail | |
| 9 | 全部交易使用 CTrade | ☐ Pass ☐ Fail | |
| 10 | Strategy Tester 可執行 | ☐ Pass ☐ Fail | |
| 11 | Optimization 可執行 | ☐ Pass ☐ Fail | |
| 12 | VPS 相容 | ☐ Pass ☐ Fail | |
| 13 | 實盤自動下單預設關閉 | ☐ Pass ☐ Fail | |
| 14 | 風險聲明完成 | ☐ Pass ☐ Fail | |
| 15 | 參數說明完成 | ☐ Pass ☐ Fail | |
| 16 | 使用手冊完成 | ☐ Pass ☐ Fail | |
| 17 | 產品描述完成 | ☐ Pass ☐ Fail | |
| 18 | 無未完成函數 / 無 TODO | ☐ Pass ☐ Fail | |
| 19 | 無大量 Print / 無過度 Chart Object | ☐ Pass ☐ Fail | |

---

## H. Final RC1 Acceptance

| Acceptance Item | Status | Owner | Notes |
|---|---|---|---|
| Compile Evidence Complete | ☐ Pass ☐ Fail | | |
| Smoke Test Pass | ☐ Pass ☐ Fail | | |
| 1-Month Backtest Pass | ☐ Pass ☐ Fail | | |
| 3-Year Backtest Completed | ☐ Pass ☐ Fail | | |
| Optimization Small-Range Completed | ☐ Pass ☐ Fail | | |
| Demo Forward Test Started | ☐ Pass ☐ Fail | | |
| Market Validator Pre-Check Pass | ☐ Pass ☐ Fail | | |
| Product Manual Draft Complete | ☐ Pass ☐ Fail | | |
| Product Page Draft Complete | ☐ Pass ☐ Fail | | |
| Risk Disclaimer Complete | ☐ Pass ☐ Fail | | |
| No Critical Runtime Fault | ☐ Pass ☐ Fail | | |
| No Unsafe Default Parameter | ☐ Pass ☐ Fail | | |
| No Real Trading Enabled by Default | ☐ Pass ☐ Fail | | |
| No Module Conflict | ☐ Pass ☐ Fail | | |
| No Known Fatal Issue | ☐ Pass ☐ Fail | | |
