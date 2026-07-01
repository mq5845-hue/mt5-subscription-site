# Step 21 Prompt：RC1 Validation & Testing Plan

請依照 Ultimate AI Development Constitution v3.0 Enterprise Edition  
以及 Master_Prompt.md。

---

## 專案

XAUUSD_Quant_Pro_v1

---

## 目前版本

```text
XAUUSD_Quant_Pro_v1 Release Candidate 1
```

---

## 已完成模組

目前已完成：

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

已成功編譯：

- 0 Errors
- 0 Warnings

目前狀態：

```text
XAUUSD_Quant_Pro_v1_RC1
```

---

# Phase 14：RC1 Validation & Testing

## 本次任務

### Step 21：RC1 Validation & Testing Plan

請不要新增大型交易功能。  
本階段目標是把目前的 RC1 從「已編譯成功」推進到：

```text
可驗證
可測試
可準備上架
```

請建立一份完整的 RC1 驗證與測試計畫，並依照商業級 MQL5 Market 發行標準，提供可執行的驗收流程、測試清單、回測計畫、前測計畫、優化計畫與上架前檢查清單。

---

# 核心目標

本階段必須產出：

- MetaEditor Compile Evidence Checklist
- Strategy Tester Smoke Test Plan
- 1-Month Quick Backtest Plan
- 3-Year Historical Backtest Plan
- Optimization Small-Range Test Plan
- Demo Forward Test Plan
- MQL5 Market Validator Pre-Check Plan
- Product Manual / Product Page Final Review Plan
- RC1 Acceptance Criteria
- RC1 Go / No-Go Decision Gate

---

# 重要原則

本階段不是寫新 EA 功能，而是建立：

```text
RC1 驗證流程
RC1 測試標準
RC1 驗收門檻
RC1 上架準備路線圖
```

嚴格禁止在本階段要求 AI 大量重構既有 Module 0～24。

---

# 一、MetaEditor Compile Evidence Checklist

請建立最終編譯證據保存清單。

必須包含：

1. EA 檔案名稱
2. 編譯日期
3. MetaEditor Build 版本
4. MT5 Terminal 版本
5. Broker / Server 名稱
6. Symbol
7. Timeframe
8. 編譯結果截圖
9. 0 Errors 確認
10. 0 Warnings 確認
11. `.mq5` 原始碼備份
12. `.ex5` 編譯檔備份
13. 版本標籤：RC1
14. Build Signature
15. 文件版本號

建議輸出格式：

```text
Compile Evidence Record
```

---

# 二、Strategy Tester Smoke Test Plan

建立最小可行回測煙霧測試。

目的：

確認 EA 可在 Strategy Tester 正常啟動、執行、結束，不發生初始化失敗、資料錯誤、交易上下文錯誤或 Dashboard / Logger 異常。

---

## Smoke Test 建議設定

```text
Symbol: XAUUSD
Timeframe: H1
Period: 最近 1 個月
Initial Deposit: 10,000 USD
Leverage: 依測試帳戶
Model: Every tick based on real ticks（若可用）
Spread: Current / Broker Default
Execution: Strategy Tester
Mode: SignalOnly 或 DryRun 優先
```

---

## Smoke Test 必查項目

- OnInit 正常
- OnTick 正常
- OnDeinit 正常
- OnTester 不報錯
- Dashboard 正常顯示
- Logger 不過量輸出
- SignalEngine 正常計算
- RiskController 正常輸出狀態
- LiveSafetyGuard 預設阻擋實盤交易
- ControlledExecutionGate 狀態正確
- FaultToleranceGuard 未誤判重大錯誤
- NewsEventRiskFilter 不造成初始化錯誤
- PortfolioGovernance 不造成誤封鎖
- 沒有 Runtime Error
- 沒有 Critical Error
- 沒有無限 Print
- 沒有回測卡死

---

# 三、1-Month Quick Backtest Plan

建立 1 個月快速回測計畫。

目的：

快速檢查策略基本行為、交易頻率、風控狀態、進出場流程與異常防護。

---

## 建議設定

```text
Symbol: XAUUSD
Timeframe: H1
Date Range: 最近 1 個月
Initial Deposit: 10,000 USD
RiskPercent: 0.5%～1.0%
Mode: Controlled Trading / DryRun / 可控真實回測模式
Spread: Broker Default
Commission: Broker Default
```

---

## 檢查項目

- 是否有合理訊號數量
- 是否有異常高頻交易
- 是否有重複下單
- 是否遵守 Cooldown
- 是否遵守 MaxTradesPerDay
- 是否遵守 Spread Guard
- 是否遵守 News / Event Filter
- 是否遵守 RiskController
- 是否正確管理持倉
- 是否正確觸發 BreakEven
- 是否正確觸發 TrailingStop
- 是否正確執行 Advanced Exit 框架
- 是否有非法手數
- 是否有無效 SL / TP
- 是否有 Retcode 異常
- 是否有資料缺失保護
- 是否有重啟恢復邏輯異常

---

# 四、3-Year Historical Backtest Plan

建立 3 年歷史回測計畫。

目的：

檢查 EA 在不同市場階段下的穩定性，包括：

- 趨勢行情
- 震盪行情
- 高波動行情
- 低波動行情
- 新聞事件密集時期
- 黃金快速跳價時期

---

## 建議設定

```text
Symbol: XAUUSD
Timeframe: H1
Date Range: 最近 3 年
Initial Deposit: 10,000 USD
RiskPercent: 0.5%～1.0%
Model: Every tick based on real ticks（若可用）
Spread: Broker Default / Variable Spread
Commission: Broker Default
```

---

## 重要評估指標

- Net Profit
- Max Drawdown
- Relative Drawdown
- Profit Factor
- Recovery Factor
- Expected Payoff
- Total Trades
- Win Rate
- Average Win
- Average Loss
- Consecutive Losses
- Sharpe / Sortino（若可取得）
- Monthly Return Stability
- Equity Curve Smoothness
- Trade Frequency
- RiskController Trigger Count
- News Filter Block Count
- Adaptive Risk Mode Count
- FaultTolerance Degraded Mode Count

---

# 五、Optimization Small-Range Test Plan

建立小範圍優化測試計畫。

目的：

不是過度曲線擬合，而是確認主要參數在合理範圍內具備穩定區間。

---

## 建議優化參數

### Strategy Score

- BuyThresholdScore
- SellThresholdScore
- EMA Score Weight
- RSI Score Weight
- ATR Score Weight
- Session Score Weight

### Signal Engine

- FastEMA
- SlowEMA
- RSIPeriod
- ATRPeriod
- MinimumATR

### Risk / Trade Management

- RiskPercent
- BreakEvenPips
- TrailingStopPips
- DefaultStopLossPips
- DefaultTakeProfitPips

### Filters

- MaxAllowedSpreadPips
- LondonStartHour / LondonEndHour
- NewYorkStartHour / NewYorkEndHour
- News Cooldown Minutes

---

## 優化限制

- 不追求單一最高淨利結果
- 不使用過窄參數
- 不允許不合理高風險
- 不允許過度交易
- 不允許 Max Drawdown 過高
- 不允許只在單一年份有效
- 不允許忽略交易成本
- 不允許破壞安全預設

---

## 優化通過標準

優先選擇：

- 穩定 Profit Factor
- 可接受 Drawdown
- 合理交易次數
- 多年份表現一致
- 對 Spread 不過度敏感
- 對參數小幅變化不崩潰
- Equity Curve 不劇烈失真

---

# 六、Demo Forward Test Plan

建立 Demo 前測計畫。

目的：

確認 EA 在真實報價、真實點差、真實交易伺服器回報碼、VPS 環境下的穩定性。

---

## 建議前測期間

```text
Minimum: 2 weeks
Recommended: 4 weeks
Commercial Preferred: 8 weeks
```

---

## Demo Forward Test 必查項目

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
- 是否有重複下單
- 是否有異常 Retcode
- 是否有手數錯誤
- 是否有 SL / TP 修改錯誤
- 是否有持倉管理錯誤
- 是否誤處理其他 EA / 手動持倉
- 是否在 SignalOnly / DryRun 模式下錯誤下單

---

# 七、MQL5 Market Validator Pre-Check Plan

建立 MQL5 Market Validator 預檢清單。

必須確認：

- 0 Errors
- 0 Warnings
- 不使用 DLL
- 不使用外部 EXE
- 不使用 WebRequest()
- 不依賴外部新聞 API
- 不依賴本機特定檔案路徑
- 不硬編特定券商
- 不硬編特定帳號
- 不限制特定使用者
- 不使用 OrderSend()
- 全部交易使用 CTrade
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

# 八、Product Manual / Product Page Final Review Plan

建立產品手冊與商品頁最終整理計畫。

---

## Product Manual 必須包含

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

---

## MQL5 Product Page 必須包含

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

---

# 九、RC1 Acceptance Criteria

建立 RC1 驗收標準。

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

# 十、RC1 Go / No-Go Decision Gate

建立 Go / No-Go 判定框架。

---

## GO 條件

```text
RC1 可進入上架準備流程
```

條件：

- 所有關鍵測試通過
- 無重大錯誤
- 無安全預設問題
- 回測結果可接受
- 前測無嚴重異常
- 文件可交付
- MQL5 Market 預檢無重大風險

---

## NO-GO 條件

```text
RC1 不可上架，必須回到修復階段
```

觸發條件：

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

# 十一、交付要求

請直接產出以下文件，不要新增 EA 功能：

```text
RC1_Validation_Testing_Plan.md
RC1_Testing_Checklist.md
RC1_Go_NoGo_Decision_Gate.md
```

如可行，請另外產出：

```text
RC1_Backtest_Template.md
RC1_Forward_Test_Template.md
RC1_MQL5_Market_PreCheck.md
```

交付方式：

- 提供可下載 Markdown 檔案
- 不列印完整文件內容
- 文件需結構清楚
- 文件需可直接用於專案驗收

---

# 十二、下一階段預告

完成 Step 21 後，下一步建議進入：

## Step 22：RC1 Testing Result Review & Fix Prioritization

內容：

- 整理 Smoke Test 結果
- 整理 Backtest 結果
- 整理 Optimization 結果
- 整理 Forward Test 結果
- 建立 Bug / Risk / Improvement Backlog
- 判定是否進入 RC2
