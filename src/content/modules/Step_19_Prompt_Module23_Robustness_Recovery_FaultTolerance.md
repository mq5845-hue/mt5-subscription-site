# Step 19 Prompt：Module 23 Robustness / Recovery / Fault-Tolerance Framework

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
- Module 22：Advanced Exit & Trade Lifecycle Governance Framework

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
- Advanced Exit & Trade Lifecycle Governance Framework v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 12：Robustness / Recovery / Fault-Tolerance Layer

## 本次任務

### Module 23：Robustness / Recovery / Fault-Tolerance Framework

建立從「完整交易生命週期治理」進一步升級為「可在異常、斷線、重啟、資料缺失、交易伺服器拒單等情境下自我保護與恢復」的商業級穩健框架。

本模組目的不是新增交易策略，而是讓 EA 具備在實盤與 VPS 環境中面對異常狀況時的防護、恢復、降級與安全治理能力。

---

# 核心目標

建立一套商業級 Robustness / Recovery / Fault-Tolerance Framework，包含：

- Terminal Restart Recovery
- Position State Reconstruction
- Missing Data Guard
- Indicator Handle Recovery
- Trade Context Failure Handling
- Broker Requote / Retcode Handling
- Runtime Fault Isolation
- Safe Degraded Mode
- Recovery Dashboard Extension
- Recovery Logger Integration
- Fault-Tolerance Permission Gate

---

# Module 23：Robustness / Recovery / Fault-Tolerance Framework

建議建立：

```cpp
class CRobustnessRecoveryManager
class CFaultToleranceGuard
```

或依既有 OOP 架構保持一致命名。

---

## 1. Terminal Restart Recovery

建立終端重啟恢復框架。

建議 Input：

```cpp
input bool EnableTerminalRestartRecovery = true;
input bool ReconstructStateOnInit = true;
input bool PrintRecoveryReportOnInit = true;
```

建議函數：

```cpp
bool DetectPossibleTerminalRestart();
bool ReconstructRuntimeState();
void PrintRestartRecoveryReport();
string GetRestartRecoveryStatus();
```

用途：

- MT5 / VPS 重啟後重新掃描本 EA 持倉
- 重新建立內部狀態摘要
- 避免因記憶體狀態遺失而重複下單
- 保持 MagicNumber + Symbol 過濾
- 不干擾其他 EA 或手動持倉

---

## 2. Position State Reconstruction

建立持倉狀態重建。

建議函數：

```cpp
bool ReconstructManagedPositions();
int RecoveredManagedPositionCount();
string GetRecoveredPositionSummary();
bool VerifyPositionLifecycleConsistency();
```

必須重建：

- 本 EA 管理持倉數量
- Buy / Sell 持倉方向
- Entry Price
- Volume
- SL / TP
- Position Age
- BreakEven 狀態推斷
- Trailing 狀態推斷
- Partial Close 狀態推斷
- Lifecycle State 推斷

要求：

- 僅處理相同 Symbol + MagicNumber
- 不強制修改持倉，除非明確需要安全修復
- 若狀態不完整，進入保守模式

---

## 3. Missing Data Guard

建立缺失資料保護。

建議 Input：

```cpp
input bool EnableMissingDataGuard = true;
input int MinimumBarsRequired = 200;
input bool BlockTradingOnMissingData = true;
```

建議函數：

```cpp
bool HasSufficientBars(string symbol, ENUM_TIMEFRAMES timeframe);
bool IsMarketDataAvailable();
bool ValidatePriceData();
bool ValidateIndicatorData();
string GetMissingDataReport();
```

檢查：

- Bars 數量是否足夠
- Ask / Bid 是否有效
- Spread 是否有效
- TimeSeries 是否同步
- 指標資料是否可用
- CopyBuffer 是否成功
- iTime / iClose 等資料是否正常

若資料不足：

- 禁止新倉
- 允許既有持倉管理
- Logger / Dashboard 顯示 Missing Data 狀態

---

## 4. Indicator Handle Recovery

建立指標 Handle 恢復框架。

建議 Input：

```cpp
input bool EnableIndicatorHandleRecovery = true;
input int MaxIndicatorRecoveryAttempts = 3;
```

建議函數：

```cpp
bool CheckIndicatorHandles();
bool RecoverIndicatorHandles();
int IndicatorRecoveryAttemptCount();
string GetIndicatorRecoveryStatus();
```

用途：

- EMA / RSI / ATR 等 handle 失效時嘗試重建
- CopyBuffer 失敗時進入保守模式
- 避免指標異常導致錯誤訊號
- 重建失敗時禁止新倉

要求：

- 不得造成無限重試
- 不得造成大量 Print
- Optimization 模式下保持效率

---

## 5. Trade Context Failure Handling

建立交易上下文失敗處理。

建議 Input：

```cpp
input bool EnableTradeContextFailureHandling = true;
input int MaxTradeRetryAttempts = 2;
input int RetryDelayMilliseconds = 250;
```

建議函數：

```cpp
bool IsTradeContextReady();
bool HandleTradeContextFailure();
bool ShouldRetryTradeOperation(int retcode);
string GetTradeContextStatus();
```

檢查：

- Terminal 是否允許交易
- Account 是否允許交易
- Symbol 是否可交易
- Trade Context 是否可用
- CTrade ResultRetcode 是否允許重試

注意：

- 不得無限制重試
- 不得在 EmergencyStop 狀態下重試開倉
- 不得繞過 LiveSafetyGuard
- 重試前必須重新檢查價格與風險狀態

---

## 6. Broker Requote / Retcode Handling

建立券商回報碼治理。

建議函數：

```cpp
bool IsRetcodeSuccess(uint retcode);
bool IsRetcodeRetryable(uint retcode);
bool IsRetcodeFatal(uint retcode);
string RetcodeCategoryText(uint retcode);
void LogTradeRetcode(uint retcode, string context);
```

需分類：

- 成功
- 可重試
- 不可重試
- 參數錯誤
- 市場關閉
- 交易禁止
- 價格變動
- 報價重取
- 資金不足
- 無效手數
- 無效 SL / TP

用途：

- 改善 OrderManager 錯誤治理
- 統一 Logger 輸出
- 避免因暫時性錯誤導致 EA 崩潰或重複下單

---

## 7. Runtime Fault Isolation

建立執行期錯誤隔離。

建議 Input：

```cpp
input bool EnableRuntimeFaultIsolation = true;
input int MaxRuntimeFaultsBeforeDegradedMode = 3;
```

建議函數：

```cpp
void RecordRuntimeFault(string moduleName, string faultReason);
int RuntimeFaultCount();
bool ShouldEnterDegradedMode();
string GetRuntimeFaultReport();
```

模組隔離範圍：

- SignalEngine
- StrategyFramework
- MoneyManagement
- OrderManager
- RiskController
- Dashboard
- Logger
- NewsEventRiskFilter
- AdvancedExitManager

要求：

- 單一模組異常不得造成整個 EA 不受控
- 記錄錯誤來源
- 達到門檻後進入 Safe Degraded Mode
- 不得用例外語法假設 MQL5 支援 try/catch

---

## 8. Safe Degraded Mode

建立安全降級模式。

建議 Input：

```cpp
input bool EnableSafeDegradedMode = true;
input bool BlockNewTradesInDegradedMode = true;
input bool AllowPositionManagementInDegradedMode = true;
```

建議 enum：

```cpp
enum ENUM_XQP_FAULT_TOLERANCE_MODE
{
   XQP_FT_NORMAL = 0,
   XQP_FT_WARNING = 1,
   XQP_FT_DEGRADED = 2,
   XQP_FT_CRITICAL = 3
};
```

建議函數：

```cpp
ENUM_XQP_FAULT_TOLERANCE_MODE EvaluateFaultToleranceMode();
bool IsDegradedModeActive();
bool FaultToleranceAllowsNewTrade();
bool FaultToleranceAllowsPositionManagement();
string GetFaultToleranceModeText();
```

邏輯：

- NORMAL：正常運行
- WARNING：記錄警告
- DEGRADED：禁止新倉，但允許持倉管理
- CRITICAL：僅允許 Emergency / Protective 管理
- 不得自動亂平倉
- 不得干擾其他 EA / 手動交易

---

## 9. Recovery Permission Gate

建立恢復與容錯交易許可閘門。

建議函數：

```cpp
bool RecoveryAllowsNewTrade();
bool RecoveryAllowsBuy();
bool RecoveryAllowsSell();
bool RecoveryAllowsTradeManagement();
string GetRecoveryPermissionStatus();
```

必須同時檢查：

- Terminal Restart Recovery 狀態
- Position State Reconstruction 狀態
- Missing Data Guard
- Indicator Handle Recovery
- Trade Context 狀態
- Retcode / Broker 狀態
- Runtime Fault 狀態
- Safe Degraded Mode
- LiveSafetyGuard
- RiskController
- PortfolioGovernance
- NewsEventRiskFilter
- AdvancedExitManager

要求：

- 本模組只能限制交易或進入保守模式
- 不得繞過既有安全 Gate
- 不得強制開倉
- 不得影響非本 EA 持倉

---

## 10. Recovery Dashboard Extension

將恢復與容錯狀態整合至 Dashboard。

建議函數：

```cpp
string GetDashboardRecoveryText();
```

Dashboard 顯示：

- Fault Tolerance Mode
- Missing Data Status
- Indicator Recovery Status
- Trade Context Status
- Runtime Fault Count
- Restart Recovery Status
- Position Reconstruction Status
- Recovery Permission Status

不得造成 Chart Object 過度刷新。

---

## 11. Recovery Logger Integration

將恢復與容錯事件整合至 Logger。

建議函數：

```cpp
void LogRecoveryEvent(string eventName, string details);
void LogRuntimeFault(string moduleName, string reason);
void LogDegradedModeChange(string modeText);
void LogRecoveryPermissionDecision(string decisionText);
```

記錄：

- Time
- Symbol
- Module
- Fault Type
- Recovery Action
- Fault Tolerance Mode
- Permission Decision
- Retcode / Error Code
- Recovery Result

Optimization 模式下避免大量輸出。

---

# 主程式整合

## OnInit()

加入：

1. 初始化 RobustnessRecoveryManager
2. 初始化 FaultToleranceGuard
3. DetectPossibleTerminalRestart()
4. ReconstructRuntimeState()
5. ReconstructManagedPositions()
6. CheckIndicatorHandles()
7. ValidatePriceData()
8. 輸出 Recovery / Fault-Tolerance Summary
9. 保留 Module 0 ~ Module 22 初始化流程

若出現致命錯誤：

```cpp
return INIT_PARAMETERS_INCORRECT;
```

或依設計進入 Safe Degraded Mode。

---

## OnTick()

建議流程：

1. FaultToleranceGuard.Evaluate
2. MissingDataGuard 檢查
3. IndicatorHandleRecovery 檢查
4. TradeContext 狀態檢查
5. EmergencyStop Check
6. RecoveryAllowsTradeManagement()
7. AdvancedExit / BreakEven / TrailingStop 管理既有持倉
8. RecoveryAllowsNewTrade()
9. NewsEventRiskFilter.Update / Evaluate
10. PortfolioGovernance.GlobalExposureAllowsNewTrade()
11. LiveSafetyGuard.CanOpenNewTrade()
12. RiskController.IsTradingAllowed()
13. SessionFilter.IsTradingAllowed()
14. SignalEngine
15. StrategyFramework 計算 Buy / Sell Score
16. StrategyAnalytics.UpdateAnalytics()
17. AdaptiveRiskThrottle.Evaluate
18. StrategyActivationController 判定 Buy / Sell Activation
19. ControlledExecutionGate Evaluate
20. 若允許下單：
    - MoneyManagement 計算手數
    - OrderManager 執行
    - Retcode Handling / Retry Governance
21. Dashboard.Update()
22. PerformanceMetrics.Update()

若 RecoveryAllowsNewTrade() 為 false：

- 禁止新倉
- Logger 記錄原因
- Dashboard 顯示容錯狀態
- 仍可依設定管理既有持倉

---

## OnTradeTransaction()

若既有架構支援，建議整合：

```cpp
void OnTradeTransaction(const MqlTradeTransaction &trans,
                        const MqlTradeRequest &request,
                        const MqlTradeResult &result);
```

用途：

- 捕捉交易結果
- 分析 retcode
- 更新故障統計
- 更新 Position Reconstruction 狀態
- 更新 Trade Lifecycle 狀態
- 記錄異常交易事件

若為降低複雜度，本階段可建立安全框架，避免造成編譯錯誤。

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Fault Tolerance Summary
- Runtime Fault Count
- Final Degraded Mode
- Last Recovery Event
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
- 不使用 DLL
- 不使用外部 exe
- 不使用 WebRequest()
- 不依賴本機特定檔案路徑
- 不干擾其他 EA 或手動交易
- 不強制平倉非本 EA 持倉
- 不造成過度 Print
- 不造成過度 Chart Object 更新
- 所有交易操作使用 CTrade
- 所有恢復行為必須保守、安全、可追蹤

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
- 破壞 Module 0 ~ Module 22 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- 容錯模組繞過 RiskController
- 容錯模組繞過 LiveSafetyGuard
- 容錯模組繞過 PortfolioGovernance
- 容錯模組在資料缺失時允許新倉
- 終端重啟後重複下單
- 重試交易時忽略最新價格與風險狀態
- 自動關閉非本 EA 持倉

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module23_RobustnessRecoveryFaultTolerance.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 23 Robustness / Recovery / Fault-Tolerance Framework 完成
- Terminal Restart Recovery 完成
- Position State Reconstruction 完成
- Missing Data Guard 完成
- Indicator Handle Recovery 完成
- Trade Context Failure Handling 完成
- Broker Requote / Retcode Handling 完成
- Runtime Fault Isolation 完成
- Safe Degraded Mode 完成
- Recovery Permission Gate 完成
- Recovery Dashboard Extension 完成
- Recovery Logger Integration 完成
- 0 Errors
- 0 Warnings

形成：

```text
Robustness / Recovery / Fault-Tolerance Framework v1
```

---

# 下一階段預告

完成 Step 19 後，下一步建議進入：

## Step 20：Module 24 Final Integration / Commercial Release Candidate Framework

內容：

- Full Module Integration Audit
- Release Candidate Build
- Final Input Cleanup
- Default Parameter Safety Review
- MQL5 Market Validator Preparation
- Backtest / Forward Test Package
- Final Commercial Release Gate
