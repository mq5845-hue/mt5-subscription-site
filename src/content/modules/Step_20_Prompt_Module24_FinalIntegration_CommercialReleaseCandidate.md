# Step 20 Prompt：Module 24 Final Integration / Commercial Release Candidate Framework

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
- Module 23：Robustness / Recovery / Fault-Tolerance Framework

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
- Robustness / Recovery / Fault-Tolerance Framework v1 已完成

請在既有架構基礎上進行最終整合，不得破壞已完成模組。

---

# Phase 13：Final Integration / Commercial Release Candidate Layer

## 本次任務

### Module 24：Final Integration / Commercial Release Candidate Framework

將 Module 0～23 全部收斂成第一個正式候選版本：

```text
XAUUSD_Quant_Pro_v1 Release Candidate 1
```

本階段目的不是新增大型功能，而是建立正式 RC 版本的最終整合、模組稽核、輸入參數清理、安全預設檢查、MQL5 Market Validator 準備、回測 / 前測套件準備與商業發版 Gate。

---

# 核心目標

建立一套商業級 Final Integration / Commercial Release Candidate Framework，包含：

- Full Module Integration Audit
- Release Candidate Build
- Final Input Cleanup
- Default Parameter Safety Review
- MQL5 Market Validator Preparation
- Backtest / Forward Test Package
- Final Commercial Release Gate
- RC Version Lock
- Commercial Readiness Dashboard
- Release Candidate Logger Integration

---

# Module 24：Final Integration / Commercial Release Candidate Framework

建議建立：

```cpp
class CFinalIntegrationAuditor
class CCommercialReleaseCandidateGate
```

或依既有 OOP 架構保持一致命名。

---

## 1. Full Module Integration Audit

建立 Module 0～23 的總整合稽核。

建議函數：

```cpp
bool AuditAllModules();
bool AuditCoreTradingModules();
bool AuditRiskSafetyModules();
bool AuditCommercialModules();
string GetFullModuleAuditReport();
void PrintFullModuleAuditReport();
```

稽核範圍：

### Core Trading Modules

- BaseConfig
- NewBarDetector
- MoneyManagement
- OrderManager
- BreakEven
- TrailingStop
- SignalEngine
- SessionFilter

### Strategy / Analytics Modules

- Strategy Framework
- Backtest & Optimization
- Strategy Activation
- Strategy Performance Analytics
- Adaptive Risk & Strategy Throttle

### Safety / Governance Modules

- RiskController
- LiveSafetyGuard
- PortfolioGovernance
- NewsEventRiskFilter
- AdvancedExitManager
- RobustnessRecoveryManager

### Commercial Modules

- Logger
- Dashboard
- MQL5 Market Packaging
- Product Manual & Release Kit
- QA / Pre-Release Validation

要求：

- 僅做稽核與狀態輸出
- 不重寫既有模組邏輯
- 不破壞既有初始化流程
- 不造成過度 Print

---

## 2. Release Candidate Build

建立 RC 版本標記與建置資訊。

建議常數：

```cpp
#define XQP_RC_NAME        "XAUUSD_Quant_Pro_v1_RC1"
#define XQP_RC_VERSION     "1.0.0-RC1"
#define XQP_RC_BUILD_STAGE "Release Candidate"
```

建議函數：

```cpp
string GetRCName();
string GetRCVersion();
string GetRCBuildSignature();
string GetRCBuildSummary();
void PrintRCBuildInfo();
```

Build Signature 建議包含：

- EA Name
- RC Version
- Build Date
- Module Scope
- Symbol
- Timeframe
- MagicNumber
- Account Mode
- Compiler Target

---

## 3. Final Input Cleanup

建立最終 Input 參數清理框架。

建議函數：

```cpp
bool ValidateFinalInputs();
string GetFinalInputSummary();
void PrintFinalInputSummary();
```

檢查項目：

- 所有 Input 具有安全預設值
- 實盤交易預設關閉
- Demo / SignalOnly / DryRun 安全預設
- RiskPercent 合理
- SL / TP 合理
- BreakEven / TrailingStop 合理
- Session 時間合理
- Spread Guard 合理
- News Filter 預設合理
- EmergencyStop 預設 false
- EnableLiveTrading 預設 false
- EnableRealOrderExecution 預設 false
- EnableAutoTrading 預設 false 或安全模式
- MagicNumber 非 0
- Symbol 非空字串

---

## 4. Default Parameter Safety Review

建立安全預設審查。

建議函數：

```cpp
bool ReviewDefaultParameterSafety();
string GetDefaultSafetyReviewReport();
void PrintDefaultSafetyReview();
```

安全預設要求：

- 不應預設實盤自動下單
- 不應預設高風險倍數
- 不應預設無限制加倉
- 不應預設關閉核心風控
- 不應預設忽略 Spread / Slippage
- 不應預設允許新聞高風險時段交易
- 不應預設允許多實例無限制交易
- 不應預設在資料缺失時交易
- 不應預設繞過 LiveSafetyGuard
- 不應預設繞過 RiskController

---

## 5. MQL5 Market Validator Preparation

建立 MQL5 Market Validator 準備框架。

建議函數：

```cpp
bool PrepareForMQL5MarketValidator();
string GetMQL5ValidatorPreparationReport();
void PrintMQL5ValidatorPreparationReport();
```

檢查項目：

- 0 Errors
- 0 Warnings
- 不使用 DLL
- 不使用外部 EXE
- 不使用 WebRequest()
- 不依賴本機特定路徑
- 不硬編特定券商
- 不硬編特定帳號
- 不限制特定使用者
- 可於 Strategy Tester 執行
- 可於 Optimization 執行
- 可於 VPS 執行
- 使用 CTrade
- 不使用 OrderSend()
- 無 TODO
- 無未完成函數
- 無大量 Print
- 無過度 Chart Object 更新
- Input 參數預設安全

---

## 6. Backtest / Forward Test Package

建立回測與前測套件準備框架。

建議函數：

```cpp
string GetBacktestPackageChecklist();
string GetForwardTestPackageChecklist();
string GetOptimizationPackageChecklist();
void PrintTestingPackageChecklist();
```

Backtest Package 應包含：

- Symbol：XAUUSD
- Timeframe：H1 / H4 建議
- Modeling Mode
- Date Range
- Initial Deposit
- Spread Setting
- Commission Setting
- Risk Setting
- Optimization Parameters
- OnTester Fitness Score
- Report Export Checklist

Forward Test Package 應包含：

- Demo Account
- VPS Test
- Minimum 2～4 Weeks
- Different Spread Condition
- News Period Observation
- Execution Retcode Observation
- Dashboard / Logger Verification
- RiskController Trigger Test
- EmergencyStop Test

---

## 7. Final Commercial Release Gate

建立最終商業發版 Gate。

建議 enum：

```cpp
enum ENUM_XQP_COMMERCIAL_RELEASE_STATUS
{
   XQP_COMMERCIAL_BLOCKED = 0,
   XQP_COMMERCIAL_WARNING = 1,
   XQP_COMMERCIAL_RC_READY = 2,
   XQP_COMMERCIAL_RELEASE_READY = 3
};
```

建議 class：

```cpp
class CCommercialReleaseGate
```

建議函數：

```cpp
ENUM_XQP_COMMERCIAL_RELEASE_STATUS EvaluateCommercialReleaseStatus();
bool IsReleaseCandidateReady();
bool IsCommercialReleaseReady();
string GetCommercialReleaseStatusText();
void PrintCommercialReleaseGateReport();
```

RC Ready 條件：

- Module 0～23 Audit Pass
- Final Input Validation Pass
- Default Safety Review Pass
- Market Validator Preparation Pass
- Backtest Package Checklist Ready
- Forward Test Package Checklist Ready
- PreRelease Validation Pass
- Robustness / Recovery Pass
- No Fatal Governance Conflicts

Commercial Release Ready 條件：

- RC Ready
- Backtest 已完成
- Optimization 已完成
- Forward Test 已完成
- User Manual 已完成
- Product Description 已完成
- Risk Disclaimer 已完成
- MQL5 Product Page Materials 已完成

---

## 8. RC Version Lock

建立 Release Candidate 版本鎖定框架。

建議 Input：

```cpp
input bool EnableRCVersionLock = true;
input string RCVersionLabel = "RC1";
input bool AllowExperimentalFeaturesInRC = false;
```

建議函數：

```cpp
bool IsRCVersionLocked();
bool ExperimentalFeaturesAllowed();
string GetRCVersionLockStatus();
```

邏輯：

- RC 版本中禁止未完成實驗功能
- RC 版本中禁止風險高的預設開關
- RC 版本中禁止繞過安全 Gate
- 若 AllowExperimentalFeaturesInRC = false，所有 experimental 功能需預設關閉

---

## 9. Commercial Readiness Dashboard Extension

將 RC 狀態整合至 Dashboard。

建議函數：

```cpp
string GetDashboardCommercialReadinessText();
```

Dashboard 顯示：

- RC Version
- Module Audit Status
- Input Validation Status
- Safety Review Status
- Market Validator Status
- Backtest Package Status
- Forward Test Package Status
- Release Gate Status
- Commercial Readiness Status

不得造成 Chart Object 過度刷新。

---

## 10. Release Candidate Logger Integration

將 RC 發版事件整合至 Logger。

建議函數：

```cpp
void LogRCAuditResult(string resultText);
void LogReleaseGateStatus(string statusText);
void LogCommercialReadinessEvent(string eventName, string details);
void LogRCBuildInfo();
```

記錄：

- Time
- EA Name
- RC Version
- Audit Result
- Safety Review Result
- Validator Preparation Result
- Release Gate Status
- Block Reason
- Warning Reason

Optimization 模式下避免大量輸出。

---

# 主程式整合

## OnInit()

加入：

1. 初始化 FinalIntegrationAuditor
2. 初始化 CommercialReleaseCandidateGate
3. PrintRCBuildInfo()
4. AuditAllModules()
5. ValidateFinalInputs()
6. ReviewDefaultParameterSafety()
7. PrepareForMQL5MarketValidator()
8. EvaluateCommercialReleaseStatus()
9. 輸出 RC Summary
10. 保留 Module 0～23 初始化流程

若發現致命錯誤：

```cpp
return INIT_PARAMETERS_INCORRECT;
```

或依設計進入保守模式，但需明確記錄原因。

---

## OnTick()

不新增交易策略。

建議流程：

1. FaultToleranceGuard.Evaluate
2. RecoveryAllowsTradeManagement()
3. AdvancedExit / BreakEven / TrailingStop 管理既有持倉
4. RecoveryAllowsNewTrade()
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
15. ControlledExecutionGate Evaluate
16. 若允許下單：
    - MoneyManagement 計算手數
    - OrderManager 執行
17. CommercialReadiness Dashboard Update
18. PerformanceMetrics.Update()

---

## OnTester()

若既有架構已有 OnTester()，保持穩定，不得破壞。

建議確認：

- 不除以 0
- 資料不足時回傳 0.0
- 優化模式下不大量 Print
- Fitness Score 穩定可重現

---

## OnDeinit()

建議輸出：

- EA Name
- RC Version
- Commercial Release Status
- Module Audit Summary
- Final Safety Review Status
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
- 所有發版檢查必須保守、安全、可追蹤

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
- 破壞 Module 0～23 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- RC 模組繞過 RiskController
- RC 模組繞過 LiveSafetyGuard
- RC 模組繞過 FaultToleranceGuard
- RC 模組在安全檢查失敗時仍標記為 Release Ready
- 預設啟用真實下單
- 預設允許高風險實驗功能

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_RC1_Module24_FinalIntegration_CommercialReleaseCandidate.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 24 Final Integration / Commercial Release Candidate Framework 完成
- Full Module Integration Audit 完成
- Release Candidate Build 完成
- Final Input Cleanup 完成
- Default Parameter Safety Review 完成
- MQL5 Market Validator Preparation 完成
- Backtest / Forward Test Package 完成
- Final Commercial Release Gate 完成
- RC Version Lock 完成
- Commercial Readiness Dashboard Extension 完成
- Release Candidate Logger Integration 完成
- 0 Errors
- 0 Warnings

形成：

```text
XAUUSD_Quant_Pro_v1 Release Candidate 1
```

---

# 下一階段預告

完成 Step 20 後，建議不要立即新增功能，而是進入：

## Phase 14：RC1 Validation & Testing

內容：

- MetaEditor 最終編譯截圖保存
- Strategy Tester Smoke Test
- 1 個月快速回測
- 3 年歷史回測
- Optimization 小範圍參數測試
- Demo Forward Test
- MQL5 Market Validator 預檢
- Product Manual / Product Page 最終整理
