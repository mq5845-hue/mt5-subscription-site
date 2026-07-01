# RC1 Validation & Testing Plan

**Project:** XAUUSD_Quant_Pro_v1  
**Release Candidate:** XAUUSD_Quant_Pro_v1_RC1  
**Version:** 1.0.0-RC1  
**EA Source File:** `XAUUSD_Quant_Pro_v1_RC1_Module24_FinalIntegration_CommercialReleaseCandidate.mq5`  
**Document Version:** v1.0  
**Document Date:** 2026-06-22  
**Purpose:** 將 RC1 從「已成功編譯」推進到「可驗證、可測試、可準備上架」。

---

## 0. Governance Scope

本文件適用於 `XAUUSD_Quant_Pro_v1 Release Candidate 1` 的發版驗證流程。  
本階段不新增 EA 功能，不重構 Module 0～24，只執行測試、驗收、紀錄、判定與修復優先級排序。

### 已完成模組範圍

- Module 0：BaseConfig
- Module 1：NewBarDetector
- Module 2：MoneyManagement
- Module 3：OrderManager
- Module 4：BreakEven
- Module 5：TrailingStop
- Module 6：SignalEngine
- Module 7：SessionFilter
- Module 8：RiskController
- Module 9：Logger
- Module 10：Dashboard
- Module 11：Strategy Framework
- Module 12：Backtest & Optimization Framework
- Module 13：MQL5 Market Packaging Framework
- Module 14：Product Manual & Release Kit
- Module 15：QA / Validation / Final Pre-Release Framework
- Module 16：Live-Safety / Deployment Guard Framework
- Module 17：Strategy Activation & Controlled Trading Framework
- Module 18：Strategy Performance Analytics Framework
- Module 19：Adaptive Risk & Strategy Throttle Framework
- Module 20：Portfolio / Multi-Instance Governance Framework
- Module 21：News / Event Risk Filter Framework
- Module 22：Advanced Exit & Trade Lifecycle Governance Framework
- Module 23：Robustness / Recovery / Fault-Tolerance Framework
- Module 24：Final Integration / Commercial Release Candidate Framework

---

## 1. MetaEditor Compile Evidence Checklist

### Compile Evidence Record

| Field | Value |
|---|---|
| EA File Name | `XAUUSD_Quant_Pro_v1_RC1_Module24_FinalIntegration_CommercialReleaseCandidate.mq5` |
| Release Label | RC1 |
| Version | `1.0.0-RC1` |
| Compile Date | `YYYY-MM-DD HH:MM` |
| MetaEditor Build | `填入實際 Build` |
| MT5 Terminal Build | `填入實際 Build` |
| Broker / Server | `填入測試伺服器` |
| Symbol | XAUUSD |
| Timeframe | H1 / H4 |
| Compile Result Screenshot | `保存截圖檔名` |
| Errors | 0 |
| Warnings | 0 |
| MQ5 Source Backup | `保存 .mq5 備份路徑` |
| EX5 Compiled Backup | `保存 .ex5 備份路徑` |
| Build Signature | `EA + Version + Build Date + Symbol + Timeframe + MagicNumber` |
| Document Version | RC1 Validation Plan v1.0 |

### Evidence Storage Rule

1. 將 `.mq5`、`.ex5`、編譯截圖、測試報告放入同一個 RC1 資料夾。
2. 資料夾建議命名：`XAUUSD_Quant_Pro_v1_RC1_Validation_YYYYMMDD`。
3. 若重新編譯產生不同結果，必須新增一筆 Compile Evidence Record，不覆蓋舊證據。

---

## 2. Strategy Tester Smoke Test Plan

### Objective

確認 EA 可於 MT5 Strategy Tester 啟動、執行與結束，且沒有初始化失敗、資料缺失、交易上下文異常、Dashboard / Logger 異常、無限輸出或卡死。

### Recommended Setup

| Item | Setting |
|---|---|
| Symbol | XAUUSD |
| Timeframe | H1 |
| Period | 最近 1 個月 |
| Initial Deposit | 10,000 USD |
| Leverage | 依測試帳戶 |
| Model | Every tick based on real ticks；若不可用則使用最佳可用模式 |
| Spread | Current / Broker Default |
| Mode | SignalOnly 或 DryRun |
| EnableAutoTrading | false 或安全模式 |
| EnableRealOrderExecution | false |
| EnableLiveTrading | false |
| EnableOptimizationMode | false |

### Smoke Test Steps

1. 在 Strategy Tester 載入 RC1 EA。
2. 使用安全預設參數啟動回測。
3. 確認 `OnInit()` 不回傳錯誤。
4. 確認測試期間 `OnTick()` 正常執行。
5. 確認 `OnDeinit()` 正常輸出結束摘要。
6. 若啟用 Optimization / OnTester 測試，確認 `OnTester()` 回傳穩定數值且不除以 0。
7. 檢查 Journal / Experts 日誌是否有 Critical Error、Runtime Error、Array out of range、Invalid pointer、Invalid handle。
8. 保存報告與截圖。

### Required Pass Conditions

- 0 Runtime Error
- 0 Critical Error
- 不卡死
- 不無限 Print
- Dashboard 正常顯示
- Logger 不過量輸出
- SignalOnly / DryRun 模式不送真實訂單
- LiveSafetyGuard 預設阻擋實盤交易
- FaultToleranceGuard 不誤判為 Critical

---

## 3. 1-Month Quick Backtest Plan

### Objective

快速檢查策略基本行為、交易頻率、風控狀態、進出場流程與異常防護。

### Recommended Setup

| Item | Setting |
|---|---|
| Symbol | XAUUSD |
| Timeframe | H1 |
| Date Range | 最近 1 個月 |
| Initial Deposit | 10,000 USD |
| RiskPercent | 0.5%～1.0% |
| Mode | Controlled Trading / DryRun / 可控真實回測模式 |
| Spread | Broker Default |
| Commission | Broker Default |

### Checks

- 訊號數量是否合理
- 是否異常高頻交易
- 是否重複下單
- 是否遵守 Cooldown
- 是否遵守 MaxTradesPerDay
- 是否遵守 Spread Guard
- 是否遵守 News / Event Filter
- 是否遵守 RiskController
- 是否正確管理持倉
- BreakEven 是否按條件觸發
- TrailingStop 是否按條件觸發
- Advanced Exit 是否僅處理本 EA 持倉
- 是否出現非法手數
- 是否出現無效 SL / TP
- 是否出現 Retcode 異常
- 缺失資料保護是否正常
- 重啟恢復邏輯是否無異常

### Quick Backtest Pass Conditions

- 無重大 Runtime Error
- 無非法手數 / 無效 SLTP
- 無重複下單
- 無非預期實單
- 風控 Gate 與安全 Gate 皆可追蹤
- 報告可重現

---

## 4. 3-Year Historical Backtest Plan

### Objective

驗證 EA 在趨勢、震盪、高波動、低波動、新聞密集、快速跳價等不同市場環境下的穩定性。

### Recommended Setup

| Item | Setting |
|---|---|
| Symbol | XAUUSD |
| Timeframe | H1 |
| Date Range | 最近 3 年 |
| Initial Deposit | 10,000 USD |
| RiskPercent | 0.5%～1.0% |
| Model | Every tick based on real ticks；若不可用則使用最佳可用模式 |
| Spread | Broker Default / Variable Spread |
| Commission | Broker Default |

### Metrics to Record

| Metric | Required |
|---|---|
| Net Profit | Yes |
| Max Drawdown | Yes |
| Relative Drawdown | Yes |
| Profit Factor | Yes |
| Recovery Factor | Yes |
| Expected Payoff | Yes |
| Total Trades | Yes |
| Win Rate | Yes |
| Average Win | Yes |
| Average Loss | Yes |
| Consecutive Losses | Yes |
| Monthly Return Stability | Yes |
| Equity Curve Smoothness | Yes |
| Trade Frequency | Yes |
| RiskController Trigger Count | Yes |
| News Filter Block Count | Yes |
| Adaptive Risk Mode Count | Yes |
| FaultTolerance Degraded Mode Count | Yes |

### 3-Year Backtest Pass Conditions

- 無重大 Runtime Error
- 無爆倉或異常資金曲線
- Max Drawdown 在可接受區間
- Profit Factor 不依賴單一事件爆利
- 多年份表現不集中於單一年份
- 交易頻率合理
- 對 Spread / Commission 不過度敏感
- 所有安全 Gate 有可追蹤日誌

---

## 5. Optimization Small-Range Test Plan

### Objective

確認主要參數在合理範圍內具備穩定區間，避免過度曲線擬合。

### Parameter Groups

#### Strategy Score

- BuyThresholdScore
- SellThresholdScore
- EMA Score Weight
- RSI Score Weight
- ATR Score Weight
- Session Score Weight

#### Signal Engine

- FastEMA
- SlowEMA
- RSIPeriod
- ATRPeriod
- MinimumATR

#### Risk / Trade Management

- RiskPercent
- BreakEvenPips
- TrailingStopPips
- DefaultStopLossPips
- DefaultTakeProfitPips

#### Filters

- MaxAllowedSpreadPips
- LondonStartHour / LondonEndHour
- NewYorkStartHour / NewYorkEndHour
- News Cooldown Minutes

### Optimization Rules

- 不追求單一最高淨利
- 不使用過窄參數
- 不允許高風險參數勝出
- 不允許過度交易
- 不允許 Max Drawdown 過高
- 不允許只在單一年份有效
- 不忽略交易成本
- 不破壞安全預設

### Optimization Pass Criteria

- Profit Factor 穩定
- Drawdown 可接受
- 交易次數合理
- 多年份表現一致
- 對 Spread 不過度敏感
- 參數小幅變化不崩潰
- Equity Curve 不劇烈失真

---

## 6. Demo Forward Test Plan

### Objective

在真實報價、真實點差、真實交易伺服器回報碼與 VPS 環境下確認 RC1 穩定性。

### Duration

| Level | Duration |
|---|---|
| Minimum | 2 weeks |
| Recommended | 4 weeks |
| Commercial Preferred | 8 weeks |

### Forward Test Required Checks

- EA 是否能連續運行
- VPS 重啟後是否恢復正常
- MT5 重啟後是否恢復持倉狀態
- Spread Guard 是否正常
- Slippage Guard 是否正常
- News Event Filter 是否正常
- RiskController 是否正常
- EmergencyStop 是否可用
- Dashboard 是否穩定
- Logger 是否穩定
- 是否重複下單
- 是否有異常 Retcode
- 是否有手數錯誤
- 是否有 SL / TP 修改錯誤
- 是否有持倉管理錯誤
- 是否誤處理其他 EA / 手動持倉
- SignalOnly / DryRun 模式下是否錯誤下單

---

## 7. MQL5 Market Validator Pre-Check Plan

### Required Pre-Checks

- MetaEditor 0 Errors / 0 Warnings
- 不使用 DLL
- 不使用外部 EXE
- 不使用 WebRequest()
- 不依賴外部新聞 API
- 不依賴本機特定檔案路徑
- 不硬編特定券商
- 不硬編特定帳號
- 不限制特定使用者
- 不使用 OrderSend()
- 全部交易使用官方 CTrade
- 可在 Strategy Tester 執行
- 可在 Optimization 執行
- 可在 VPS 執行
- 預設不啟用高風險實盤交易
- 有風險聲明
- 有參數說明
- 有使用手冊
- 有產品描述
- 無未完成函數
- 無 TODO
- 無大量 Print
- 無過度 Chart Object 更新

---

## 8. Product Manual / Product Page Final Review Plan

### Product Manual Must Include

- EA Overview
- Installation Guide
- Quick Start Guide
- Recommended Settings
- Input Parameter Table
- Risk Management Explanation
- Backtest Guide
- Optimization Guide
- VPS Guide
- News Filter Guide
- Troubleshooting
- FAQ
- Risk Disclaimer

### MQL5 Product Page Must Include

- Product Name
- Short Description
- Full Description
- Key Features
- Recommended Symbol
- Recommended Timeframe
- Risk Notice
- Suggested Setup
- Screenshots
- Backtest Summary
- Demo Testing Statement
- Version Notes
- Support Policy

### Review Rules

1. 不承諾保證獲利。
2. 不使用誇大銷售語。
3. 不用單一回測結果代表長期績效。
4. 文件與實際 EA 功能一致。
5. 所有風險限制與預設安全模式需明確說明。

---

## 9. RC1 Acceptance Criteria

RC1 至少必須符合：

- MetaEditor 0 Errors / 0 Warnings
- Smoke Test Pass
- 1-Month Backtest Pass
- 3-Year Backtest Completed
- Optimization Small-Range Test Completed
- Demo Forward Test Started
- MQL5 Market Validator Pre-Check Pass
- Product Manual Draft Completed
- Product Page Draft Completed
- Risk Disclaimer Completed
- No Critical Runtime Fault
- No Unsafe Default Parameter
- No Real Trading Enabled by Default
- No Module Conflict
- No Known Fatal Issue

---

## 10. RC1 Go / No-Go Decision Gate

### GO

RC1 可進入上架準備流程，條件如下：

- 所有關鍵測試通過
- 無重大錯誤
- 無安全預設問題
- 回測結果可接受
- 前測無嚴重異常
- 文件可交付
- MQL5 Market 預檢無重大風險

### NO-GO

RC1 不可上架，必須回到修復階段。觸發條件：

- 任何編譯錯誤或警告
- Strategy Tester 無法啟動
- 回測中發生重大 Runtime Error
- 實盤預設自動下單
- RiskController 被繞過
- LiveSafetyGuard 被繞過
- FaultToleranceGuard 失效
- 重複下單
- 非法手數
- 無效 SL / TP
- 重大持倉管理錯誤
- 會干擾其他 EA 或手動交易
- MQL5 Market Validator 高風險不合規

---

## 11. Deliverables

- `RC1_Validation_Testing_Plan.md`
- `RC1_Testing_Checklist.md`
- `RC1_Go_NoGo_Decision_Gate.md`
- `RC1_Backtest_Template.md`
- `RC1_Forward_Test_Template.md`
- `RC1_MQL5_Market_PreCheck.md`

---

## 12. Next Phase

完成 Step 21 後，進入：

**Step 22：RC1 Testing Result Review & Fix Prioritization**

內容包括：

- Smoke Test 結果整理
- Backtest 結果整理
- Optimization 結果整理
- Forward Test 結果整理
- Bug / Risk / Improvement Backlog
- 是否進入 RC2 的判定
