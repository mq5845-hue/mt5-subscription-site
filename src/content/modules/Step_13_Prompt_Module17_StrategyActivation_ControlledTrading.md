# Step 13 Prompt：Module 17 Strategy Activation & Controlled Trading Framework

請依照 Ultimate AI Development Constitution v3.0 Enterprise Edition  
以及 Master_Prompt.md。

---

## 專案

XAUUSD_Quant_Pro_v1

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

已成功編譯：

- 0 Errors
- 0 Warnings

目前狀態：

- Enterprise Trading Framework v5 已完成
- Strategy Validation Layer v1 已完成
- Backtest & Optimization Framework v1 已完成
- MQL5 Market Packaging Framework v1 已完成
- Product Manual & Release Kit v1 已完成
- Final Pre-Release Validation Framework v1 已完成
- Live-Safety / Deployment Guard Framework v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 6：Strategy Activation & Controlled Trading Layer

## 本次任務

### Module 17：Strategy Activation & Controlled Trading Framework

建立從「安全部署框架」進一步變成「可受控啟動真實交易邏輯」的正式交易啟動層。

本模組目的不是新增新的指標策略，而是將既有：

- Strategy Framework
- Composite Signal Score
- RiskController
- SessionFilter
- LiveSafetyGuard
- OrderManager

安全串接成可控、自動、可回測、可實盤部署的交易啟動流程。

---

# 核心目標

建立一套商業級 Controlled Trading Framework，包含：

- Controlled Auto-Trading Switch
- Score-Based Entry Activation
- Real Order Execution Gate
- One-Position / Multi-Position Mode
- Safe Entry Throttling
- Cooldown Control
- First Live Simulation Mode
- Controlled Execution Readiness Gate
- Dry Run / Signal Only Mode
- Trade Intent Logging

---

# Module 17：Strategy Activation & Controlled Trading Framework

建議建立：

```cpp
class CStrategyActivationController
```

或依既有 OOP 架構保持一致命名。

---

## 1. Controlled Auto-Trading Switch

建立可控自動交易總開關。

建議 Input：

```cpp
input bool EnableAutoTrading = false;
input bool EnableSignalOnlyMode = true;
input bool EnableDryRunMode = true;
input bool EnableRealOrderExecution = false;
```

邏輯：

- 預設不允許真實下單
- SignalOnlyMode 只輸出訊號，不下單
- DryRunMode 模擬交易決策流程，不送單
- EnableRealOrderExecution 必須明確開啟，才可進入真實下單流程
- Real Account 仍必須通過 Module 16 LiveSafetyGuard

建議函數：

```cpp
bool IsAutoTradingEnabled();
bool IsSignalOnlyMode();
bool IsDryRunMode();
bool IsRealOrderExecutionEnabled();
```

---

## 2. Score-Based Entry Activation

建立分數型進場啟動邏輯。

來源：

- Module 11 Strategy Framework
- BuyScore
- SellScore
- BuyThresholdScore
- SellThresholdScore

建議函數：

```cpp
bool BuyActivationSignal();
bool SellActivationSignal();
int GetCurrentBuyScore();
int GetCurrentSellScore();
string GetSignalDecisionText();
```

邏輯：

- BuyScore >= BuyThresholdScore → BuyActivationSignal = true
- SellScore >= SellThresholdScore → SellActivationSignal = true
- 同時出現 Buy / Sell 時，必須處理衝突：
  - 選擇較高分數
  - 或全部忽略
  - 或依設定決定

建議 Input：

```cpp
input bool IgnoreConflictingSignals = true;
input int MinimumScoreDifference = 10;
```

---

## 3. Real Order Execution Gate

建立真實下單前最後閘門。

建議函數：

```cpp
bool CanExecuteRealBuy();
bool CanExecuteRealSell();
bool CanExecuteAnyRealOrder();
string GetExecutionGateStatus();
```

CanExecuteRealBuy / Sell 必須同時確認：

- EnableAutoTrading = true
- EnableRealOrderExecution = true
- EnableSignalOnlyMode = false
- EnableDryRunMode = false
- LiveSafetyGuard.CanOpenNewTrade() = true
- RiskController.IsTradingAllowed() = true
- SessionFilter.IsTradingAllowed() = true
- Strategy signal valid
- No emergency stop
- Broker execution conditions pass
- Spread acceptable
- Slippage configured
- Position mode allowed
- Cooldown passed
- Daily trade count not exceeded

---

## 4. One-Position / Multi-Position Mode

建立持倉模式控制。

建議 Input：

```cpp
input bool AllowMultiplePositions = false;
input int MaxPositionsPerSymbol = 1;
input int MaxBuyPositions = 1;
input int MaxSellPositions = 1;
```

建議函數：

```cpp
int CountManagedPositions();
int CountManagedBuyPositions();
int CountManagedSellPositions();
bool CanOpenAdditionalBuy();
bool CanOpenAdditionalSell();
```

邏輯：

- 預設每商品只允許一筆本 EA 持倉
- 僅計算相同 Symbol + MagicNumber
- 不影響其他 EA 或手動交易

---

## 5. Safe Entry Throttling

建立安全進場節流機制。

建議 Input：

```cpp
input int MaxTradesPerDay = 5;
input int MaxTradesPerHour = 2;
input int MinimumBarsBetweenTrades = 3;
```

建議函數：

```cpp
bool CheckDailyTradeLimit();
bool CheckHourlyTradeLimit();
bool CheckMinimumBarsBetweenTrades();
bool EntryThrottlePassed();
```

邏輯：

- 限制過度交易
- 限制同一時段重複進場
- 限制連續 K 棒過度開倉
- 優化模式下可測試不同參數

---

## 6. Cooldown Control

建立冷卻時間控制。

建議 Input：

```cpp
input int CooldownMinutesAfterTrade = 60;
input int CooldownMinutesAfterLoss = 180;
input bool EnableLossCooldown = true;
```

建議函數：

```cpp
bool IsCooldownActive();
bool IsLossCooldownActive();
datetime LastTradeTime();
datetime LastLossTime();
string GetCooldownStatus();
```

邏輯：

- 新交易後進入冷卻
- 虧損後可進入更長冷卻
- 冷卻期間禁止新倉
- 冷卻期間仍允許管理既有持倉

---

## 7. First Live Simulation Mode

建立首次實盤模擬模式。

建議 Input：

```cpp
input bool EnableFirstLiveSimulationMode = true;
input int SimulationSignalsRequired = 10;
input bool AutoDisableSimulationAfterPass = false;
```

功能：

- 在 Real Account 上不立即真實下單
- 先觀察一定數量的有效訊號
- Logger 記錄每次可下單但被模擬模式攔截的訊號
- 適合首次部署與 MQL5 Market 使用者保護

建議函數：

```cpp
bool IsFirstLiveSimulationActive();
void RecordSimulationSignal();
bool SimulationRequirementPassed();
string GetSimulationStatus();
```

---

## 8. Trade Intent Logging

建立交易意圖記錄。

建議函數：

```cpp
void LogTradeIntent(string direction, int score, string reason);
void LogBlockedTrade(string direction, string blockReason);
void LogExecutedTrade(string direction, double lots, double slPips, double tpPips);
```

記錄內容：

- Time
- Symbol
- Direction
- Score
- Threshold
- Mode
- Risk Status
- Session Status
- Live Safety Status
- Execution Decision
- Block Reason

此功能應與 Module 9 Logger 整合。

---

## 9. Controlled Execution Readiness Gate

建立受控交易啟動最終 Gate。

建議 enum：

```cpp
enum ENUM_XQP_EXECUTION_STATUS
{
   XQP_EXECUTION_DISABLED = 0,
   XQP_EXECUTION_SIGNAL_ONLY = 1,
   XQP_EXECUTION_DRY_RUN = 2,
   XQP_EXECUTION_SIMULATION = 3,
   XQP_EXECUTION_READY = 4
};
```

建議 class：

```cpp
class CControlledExecutionGate
```

建議函數：

```cpp
ENUM_XQP_EXECUTION_STATUS EvaluateExecutionStatus();
bool IsControlledExecutionReady();
void PrintExecutionReadinessReport();
string GetExecutionSummary();
```

Execution Ready 條件：

- AutoTrading Enabled
- RealOrderExecution Enabled
- SignalOnlyMode Off
- DryRunMode Off
- FirstLiveSimulation Passed 或 Off
- LiveSafetyGate Ready
- RiskController Pass
- SessionFilter Pass
- Position Mode Pass
- Throttle Pass
- Cooldown Pass
- Valid Strategy Signal

---

# 主程式整合

## OnInit()

加入：

1. 初始化 StrategyActivationController
2. 初始化 ControlledExecutionGate
3. 檢查 AutoTrading / SignalOnly / DryRun / RealExecution 狀態
4. 輸出 Controlled Trading Summary
5. 保留 Module 0 ~ Module 16 初始化流程

---

## OnTick()

建議流程：

1. EmergencyStop Check
2. CanManageExistingPositions()
3. BreakEven / TrailingStop 管理既有持倉
4. LiveSafetyGuard.CanOpenNewTrade()
5. RiskController.IsTradingAllowed()
6. SessionFilter.IsTradingAllowed()
7. SignalEngine
8. StrategyFramework 計算 Buy / Sell Score
9. StrategyActivationController 判定 Buy / Sell Activation
10. EntryThrottlePassed()
11. CooldownPassed()
12. ControlledExecutionGate Evaluate
13. 若 SignalOnlyMode：
    - Print / Logger 訊號
    - 不下單
14. 若 DryRunMode：
    - 模擬下單流程
    - 不下單
15. 若 FirstLiveSimulationMode：
    - 記錄可下單訊號
    - 不下單
16. 若 Execution Ready：
    - 呼叫 OrderManager 開倉
17. Dashboard.Update()
18. PerformanceMetrics.Update()

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Deinit Reason
- Execution Mode
- Simulation Signal Count
- Last Trade Intent
- Final Controlled Execution Status

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 上架方向
- Strategy Tester 相容
- Optimization 相容
- VPS 相容
- 實盤部署安全性
- 不干擾其他 EA 或手動交易持倉
- 預設安全，不自動實盤交易
- 所有真實交易必須通過多層 Gate

---

# 嚴格禁止

禁止：

- OrderSend()
- DLL
- 外部 exe
- 網路 API
- 偽代碼
- // TODO
- 未完成函數
- 破壞 Module 0 ~ Module 16 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- SignalOnlyMode 或 DryRunMode 下真實下單
- 未通過 LiveSafetyGuard 即真實下單
- EmergencyStop 啟用時開新倉
- 無確認機制即允許 Real Account 自動交易

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module17_StrategyActivationControlledTrading.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 17 Strategy Activation & Controlled Trading Framework 完成
- Controlled Auto-Trading Switch 完成
- Score-Based Entry Activation 完成
- Real Order Execution Gate 完成
- One-Position / Multi-Position Mode 完成
- Safe Entry Throttling 完成
- Cooldown Control 完成
- First Live Simulation Mode 完成
- Trade Intent Logging 完成
- Controlled Execution Readiness Gate 完成
- 0 Errors
- 0 Warnings

形成：

```text
Strategy Activation & Controlled Trading Framework v1
```

---

# 下一階段預告

完成 Step 13 後，下一步建議進入：

## Step 14：Module 18 Strategy Performance Analytics Framework

內容：

- Real-Time Strategy Analytics
- Signal Quality Tracking
- Score Distribution Analysis
- Trade Outcome Attribution
- Entry / Exit Reason Tracking
- Strategy Health Status
- Performance Degradation Warning
