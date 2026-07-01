# Step 18 Prompt：Module 22 Advanced Exit & Trade Lifecycle Governance Framework

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
- Module 17：Strategy Activation & Controlled Trading Framework
- Module 18：Strategy Performance Analytics Framework
- Module 19：Adaptive Risk & Strategy Throttle Framework
- Module 20：Portfolio / Multi-Instance Governance Framework
- Module 21：News / Event Risk Filter Framework

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
- Strategy Activation & Controlled Trading Framework v1 已完成
- Strategy Performance Analytics Framework v1 已完成
- Adaptive Risk & Strategy Throttle Framework v1 已完成
- Portfolio / Multi-Instance Governance Framework v1 已完成
- News / Event Risk Filter Framework v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 11：Advanced Exit & Trade Lifecycle Governance Layer

## 本次任務

### Module 22：Advanced Exit & Trade Lifecycle Governance Framework

建立從「進場與風險防護完整」進一步升級為「完整交易生命週期治理」的進階出場與持倉生命週期管理層。

本模組目的不是新增進場策略，而是建立 EA 對已開倉交易的完整治理能力，包含：

- 更專業的出場管理
- 分批減倉
- 時間型出場
- 訊號型出場升級
- ATR 型出場
- 持倉老化控制
- 出場原因追蹤
- 交易生命週期狀態治理

---

# 核心目標

建立一套商業級 Advanced Exit & Trade Lifecycle Governance Framework，包含：

- Partial Close Framework
- Time-Based Exit
- Signal-Based Exit Upgrade
- ATR-Based Exit
- Trade Aging Control
- Exit Reason Analytics
- Full Trade Lifecycle Governance
- Exit Permission Gate
- Position Lifecycle State Machine
- Exit Dashboard Extension
- Exit Logger Integration

---

# Module 22：Advanced Exit & Trade Lifecycle Governance Framework

建議建立：

```cpp
class CAdvancedExitManager
class CTradeLifecycleGovernor
```

或依既有 OOP 架構保持一致命名。

---

## 1. Partial Close Framework

建立分批減倉框架。

建議 Input：

```cpp
input bool EnablePartialClose = false;
input double PartialCloseTriggerPips = 200.0;
input double PartialClosePercent = 50.0;
input bool AllowOnlyOnePartialClosePerPosition = true;
```

建議函數：

```cpp
bool CanPartialClose(ulong ticket);
bool ExecutePartialClose(ulong ticket, double closePercent);
bool HasPositionBeenPartiallyClosed(ulong ticket);
string GetPartialCloseStatus(ulong ticket);
```

要求：

- 僅處理本 EA 持倉
- 僅處理相同 Symbol + MagicNumber
- 不得影響其他 EA 或手動持倉
- 必須檢查 SYMBOL_VOLUME_MIN / SYMBOL_VOLUME_STEP
- 必須標準化減倉手數
- 若剩餘手數低於最小手數，不得執行不合法部分平倉
- 使用 CTrade，不使用 OrderSend()

---

## 2. Time-Based Exit

建立時間型出場框架。

建議 Input：

```cpp
input bool EnableTimeBasedExit = false;
input int MaxHoldingMinutes = 1440;
input bool ExitAtSessionEnd = false;
input bool ExitBeforeWeekend = false;
input int FridayExitHour = 21;
```

建議函數：

```cpp
bool ShouldExitByHoldingTime(ulong ticket);
bool ShouldExitAtSessionEnd(ulong ticket);
bool ShouldExitBeforeWeekend(ulong ticket);
string GetTimeBasedExitReason(ulong ticket);
```

邏輯：

- 持倉超過 MaxHoldingMinutes 可觸發出場
- Session 結束可觸發出場
- 週五指定時間後可出場或禁止新倉
- 不強制關閉非本 EA 持倉
- 可先建立安全框架，不必強制啟用

---

## 3. Signal-Based Exit Upgrade

升級訊號型出場邏輯。

建議 Input：

```cpp
input bool EnableSignalBasedExit = true;
input bool ExitOnOppositeSignal = false;
input int OppositeSignalExitThreshold = 85;
input bool RequireExitSignalConfirmation = true;
input int ExitSignalConfirmationBars = 1;
```

建議函數：

```cpp
bool ShouldCloseBuyByOppositeSignal();
bool ShouldCloseSellByOppositeSignal();
bool ExitSignalConfirmed(string direction);
string GetSignalBasedExitStatus();
```

邏輯：

- Buy 持倉遇到強 Sell Score 可考慮出場
- Sell 持倉遇到強 Buy Score 可考慮出場
- 可要求連續確認 K 棒
- 不應與 BreakEven / TrailingStop 衝突
- 預設可保守啟用或僅記錄訊號

---

## 4. ATR-Based Exit

建立 ATR 型動態出場框架。

建議 Input：

```cpp
input bool EnableATRBasedExit = false;
input double ATRExitMultiplier = 2.0;
input bool UseATRTrailingExit = false;
input bool ExitOnATRCompression = false;
input double ATRCompressionThreshold = 0.60;
```

建議函數：

```cpp
double CalculateATRExitDistance();
bool ShouldExitByATRWeakness(ulong ticket);
bool ShouldUpdateATRTrailingExit(ulong ticket);
string GetATRExitStatus(ulong ticket);
```

用途：

- 高波動後波動萎縮可考慮離場
- ATR 動態追蹤可作為 TrailingStop 補充
- 與既有 TrailingStop 不可互相覆蓋錯誤
- 必須 NormalizeDouble 處理價格

---

## 5. Trade Aging Control

建立持倉老化控制。

建議 Input：

```cpp
input bool EnableTradeAgingControl = true;
input int AgingWarningMinutes = 720;
input int AgingCriticalMinutes = 1440;
input bool ReduceRiskWhenAgingPositionsExist = true;
```

建議函數：

```cpp
int GetPositionAgeMinutes(ulong ticket);
bool IsPositionAgingWarning(ulong ticket);
bool IsPositionAgingCritical(ulong ticket);
string GetTradeAgingStatus(ulong ticket);
```

用途：

- 持倉過久時提醒或觸發保守模式
- 可與 AdaptiveRiskThrottle 整合
- 可影響新倉許可，但不應錯誤干擾既有持倉管理

---

## 6. Exit Reason Analytics

建立出場原因分析框架。

建議 enum：

```cpp
enum ENUM_XQP_ADVANCED_EXIT_REASON
{
   XQP_ADV_EXIT_NONE = 0,
   XQP_ADV_EXIT_PARTIAL_CLOSE = 1,
   XQP_ADV_EXIT_TIME_BASED = 2,
   XQP_ADV_EXIT_SESSION_END = 3,
   XQP_ADV_EXIT_WEEKEND_PROTECTION = 4,
   XQP_ADV_EXIT_OPPOSITE_SIGNAL = 5,
   XQP_ADV_EXIT_ATR_WEAKNESS = 6,
   XQP_ADV_EXIT_ATR_TRAILING = 7,
   XQP_ADV_EXIT_TRADE_AGING = 8,
   XQP_ADV_EXIT_RISK_CONTROL = 9,
   XQP_ADV_EXIT_NEWS_EVENT = 10,
   XQP_ADV_EXIT_EMERGENCY = 11
};
```

建議函數：

```cpp
string AdvancedExitReasonToString(ENUM_XQP_ADVANCED_EXIT_REASON reason);
void SetLastAdvancedExitReason(ENUM_XQP_ADVANCED_EXIT_REASON reason);
ENUM_XQP_ADVANCED_EXIT_REASON GetLastAdvancedExitReason();
void LogAdvancedExitReason(ulong ticket, ENUM_XQP_ADVANCED_EXIT_REASON reason);
```

需與 Module 18 Strategy Performance Analytics 整合。

---

## 7. Position Lifecycle State Machine

建立持倉生命週期狀態機。

建議 enum：

```cpp
enum ENUM_XQP_POSITION_LIFECYCLE_STATE
{
   XQP_POS_STATE_NONE = 0,
   XQP_POS_STATE_OPENED = 1,
   XQP_POS_STATE_PROTECTED_BE = 2,
   XQP_POS_STATE_TRAILING_ACTIVE = 3,
   XQP_POS_STATE_PARTIALLY_CLOSED = 4,
   XQP_POS_STATE_AGING = 5,
   XQP_POS_STATE_EXIT_PENDING = 6,
   XQP_POS_STATE_CLOSED = 7
};
```

建議 class：

```cpp
class CPositionLifecycleState
```

建議函數：

```cpp
void UpdatePositionLifecycle(ulong ticket);
ENUM_XQP_POSITION_LIFECYCLE_STATE GetPositionLifecycleState(ulong ticket);
string GetPositionLifecycleText(ulong ticket);
string GetLifecycleSummary();
```

用途：

- 追蹤持倉從開倉到出場的完整狀態
- 支援 Dashboard / Logger / Analytics
- 支援未來更多出場策略

---

## 8. Exit Permission Gate

建立出場許可閘門。

建議函數：

```cpp
bool ExitManagementAllowed();
bool CanCloseManagedPosition(ulong ticket);
bool CanModifyManagedPosition(ulong ticket);
bool CanPartialCloseManagedPosition(ulong ticket);
string GetExitPermissionStatus();
```

必須確認：

- 僅處理本 EA 持倉
- Symbol 匹配
- MagicNumber 匹配
- Ticket 有效
- Volume 合法
- Broker 允許交易
- Terminal 允許交易
- EmergencyStop 邏輯優先
- 不得影響其他 EA / 手動交易

---

## 9. Full Trade Lifecycle Governance

建立完整交易生命週期治理。

建議函數：

```cpp
void ManageTradeLifecycle();
void ManagePositionLifecycle(ulong ticket);
bool EvaluateExitConditions(ulong ticket);
bool ExecuteExitDecision(ulong ticket);
string GetTradeLifecycleGovernanceReport();
```

流程：

1. 掃描本 EA 持倉
2. 更新生命週期狀態
3. 檢查 BreakEven / TrailingStop
4. 檢查 Partial Close
5. 檢查 Time-Based Exit
6. 檢查 Signal-Based Exit
7. 檢查 ATR-Based Exit
8. 檢查 Trade Aging
9. 記錄出場原因
10. 更新 Analytics / Logger / Dashboard

---

## 10. Exit Dashboard Extension

將進階出場治理整合至 Dashboard。

建議函數：

```cpp
string GetDashboardExitLifecycleText();
```

Dashboard 顯示：

- Position Lifecycle State
- Partial Close Status
- Time Exit Status
- Signal Exit Status
- ATR Exit Status
- Trade Aging Status
- Last Exit Reason
- Exit Permission Status

不得造成 Chart Object 過度刷新。

---

## 11. Exit Logger Integration

將出場治理整合至 Logger。

建議函數：

```cpp
void LogExitDecision(ulong ticket, string reason);
void LogPartialClose(ulong ticket, double closedLots);
void LogLifecycleStateChange(ulong ticket, string stateText);
void LogExitBlocked(ulong ticket, string blockReason);
```

記錄：

- Time
- Ticket
- Symbol
- Direction
- Entry Price
- Current Price
- Profit
- Age Minutes
- Lifecycle State
- Exit Reason
- Exit Decision
- Execution Result

Optimization 模式下避免大量輸出。

---

# 主程式整合

## OnInit()

加入：

1. 初始化 AdvancedExitManager
2. 初始化 TradeLifecycleGovernor
3. 驗證 Partial Close / Exit / Aging 參數
4. 輸出 Advanced Exit Summary
5. 保留 Module 0 ~ Module 21 初始化流程

若參數不合法：

```cpp
return INIT_PARAMETERS_INCORRECT;
```

---

## OnTick()

建議流程：

1. EmergencyStop Check
2. ExitManagementAllowed()
3. ManageTradeLifecycle()
4. BreakEven / TrailingStop 管理既有持倉
5. NewsEventRiskFilter.Update / Evaluate
6. PortfolioGovernance.GlobalExposureAllowsNewTrade()
7. LiveSafetyGuard.CanOpenNewTrade()
8. RiskController.IsTradingAllowed()
9. SessionFilter.IsTradingAllowed()
10. SignalEngine
11. StrategyFramework 計算 Buy / Sell Score
12. StrategyAnalytics.UpdateAnalytics()
13. AdaptiveRiskThrottle.Evaluate
14. StrategyActivationController 判定 Buy / Sell Activation
15. EventRiskAllowsBuy / EventRiskAllowsSell
16. ControlledExecutionGate Evaluate
17. 若允許下單：
    - MoneyManagement 計算手數
    - OrderManager 執行
18. Dashboard.Update()
19. PerformanceMetrics.Update()

注意：

- 既有持倉管理應優先於新倉判斷
- EmergencyStop 優先於所有一般出場邏輯
- AdvancedExit 不得繞過安全 Gate
- AdvancedExit 不得影響非本 EA 持倉

---

## OnTradeTransaction()

若既有架構支援，建議整合：

```cpp
void OnTradeTransaction(const MqlTradeTransaction &trans,
                        const MqlTradeRequest &request,
                        const MqlTradeResult &result);
```

用途：

- 捕捉部分平倉
- 捕捉完整平倉
- 捕捉 SL / TP 出場
- 更新 Exit Reason Analytics
- 更新 Position Lifecycle State
- 更新 Performance Analytics

若為降低複雜度，本階段可建立安全框架，避免造成編譯錯誤。

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Trade Lifecycle Summary
- Last Advanced Exit Reason
- Active Position Lifecycle Summary
- Deinit Reason

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 上架方向
- Strategy Tester 相容
- Optimization 相容
- VPS 相容
- 不干擾其他 EA 或手動交易
- 不強制平倉非本 EA 持倉
- 不造成過度 Print
- 不造成過度 Chart Object 更新
- 所有交易操作使用 CTrade
- 價格與手數必須依 SymbolInfo 動態處理

---

# 嚴格禁止

禁止：

- OrderSend()
- DLL
- 外部 exe
- WebRequest()
- 網路 API
- 偽代碼
- // TODO
- 未完成函數
- 破壞 Module 0 ~ Module 21 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- Advanced Exit 模組繞過 RiskController
- Advanced Exit 模組繞過 LiveSafetyGuard
- Advanced Exit 模組錯誤關閉其他 EA 持倉
- Advanced Exit 模組錯誤關閉手動持倉
- 部分平倉後產生非法手數

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module22_AdvancedExit_TradeLifecycleGovernance.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 22 Advanced Exit & Trade Lifecycle Governance Framework 完成
- Partial Close Framework 完成
- Time-Based Exit 完成
- Signal-Based Exit Upgrade 完成
- ATR-Based Exit 完成
- Trade Aging Control 完成
- Exit Reason Analytics 完成
- Position Lifecycle State Machine 完成
- Exit Permission Gate 完成
- Full Trade Lifecycle Governance 完成
- Exit Dashboard Extension 完成
- Exit Logger Integration 完成
- 0 Errors
- 0 Warnings

形成：

```text
Advanced Exit & Trade Lifecycle Governance Framework v1
```

---

# 下一階段預告

完成 Step 18 後，下一步建議進入：

## Step 19：Module 23 Robustness / Recovery / Fault-Tolerance Framework

內容：

- Terminal Restart Recovery
- Position State Reconstruction
- Missing Data Guard
- Indicator Handle Recovery
- Trade Context Failure Handling
- Broker Requote / Retcode Handling
- Runtime Fault Isolation
- Safe Degraded Mode
