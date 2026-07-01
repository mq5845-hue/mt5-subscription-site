# Step 15 Prompt：Module 19 Adaptive Risk & Strategy Throttle Framework

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

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 8：Adaptive Risk & Strategy Throttle Layer

## 本次任務

### Module 19：Adaptive Risk & Strategy Throttle Framework

建立從「能分析策略品質」進一步升級為「能根據策略狀態自動調整風險與交易強度」的自適應風控與策略節流層。

本模組目的不是新增新的進場指標，而是利用既有：

- Strategy Performance Analytics
- Strategy Health Status
- Signal Quality Tracking
- Score Distribution Analysis
- RiskController
- LiveSafetyGuard
- Controlled Execution Gate
- MoneyManagement

來動態調整：

- 每筆風險
- 交易頻率
- 可開倉條件
- 交易強度
- 安全模式

---

# 核心目標

建立一套商業級 Adaptive Risk & Strategy Throttle Framework，包含：

- Adaptive Risk Scaling
- Score-Based Position Sizing
- Drawdown-Based Risk Reduction
- Volatility-Based Risk Adjustment
- Performance-Based Trading Throttle
- Strategy Health-Based Safety Mode
- Adaptive Cooldown Extension
- Dynamic Trade Frequency Control
- Risk Multiplier Framework
- Adaptive Execution Permission Gate

---

# Module 19：Adaptive Risk & Strategy Throttle Framework

建議建立：

```cpp
class CAdaptiveRiskThrottle
```

或依既有 OOP 架構保持一致命名。

---

## 1. Adaptive Risk Scaling

建立自適應風險縮放框架。

建議 Input：

```cpp
input bool EnableAdaptiveRiskScaling = true;
input double MinimumRiskMultiplier = 0.25;
input double MaximumRiskMultiplier = 1.25;
input double DefaultRiskMultiplier = 1.0;
```

建議函數：

```cpp
double CalculateAdaptiveRiskMultiplier();
double GetCurrentRiskMultiplier();
double GetAdjustedRiskPercent();
string GetAdaptiveRiskStatus();
```

邏輯：

- 策略健康良好 → 可維持或小幅提高風險
- 策略健康中性 → 維持預設風險
- 策略健康警告 → 降低風險
- 策略退化 → 大幅降低風險或禁止新倉
- 風險倍率必須限制在 MinimumRiskMultiplier ~ MaximumRiskMultiplier

不得繞過原始 RiskPercent 與 MoneyManagement 模組。

---

## 2. Score-Based Position Sizing

建立基於訊號分數的倉位調整框架。

建議 Input：

```cpp
input bool EnableScoreBasedPositionSizing = true;
input int HighConfidenceScore = 90;
input int MediumConfidenceScore = 80;
input int LowConfidenceScore = 70;
input double HighScoreRiskMultiplier = 1.10;
input double MediumScoreRiskMultiplier = 1.00;
input double LowScoreRiskMultiplier = 0.50;
```

建議函數：

```cpp
double CalculateScoreBasedRiskMultiplier(int signalScore);
double GetScoreConfidenceMultiplier(int signalScore);
string GetScoreSizingStatus(int signalScore);
```

邏輯：

- 高分訊號可使用較高風險倍率，但不得超過 MaximumRiskMultiplier
- 中等訊號使用預設風險
- 低分訊號降低風險或不交易
- 若訊號分數低於 Entry Threshold，不得開倉

---

## 3. Drawdown-Based Risk Reduction

建立基於回撤的風險降低機制。

建議 Input：

```cpp
input bool EnableDrawdownRiskReduction = true;
input double DrawdownWarningPercent = 5.0;
input double DrawdownCriticalPercent = 10.0;
input double DrawdownWarningRiskMultiplier = 0.50;
input double DrawdownCriticalRiskMultiplier = 0.25;
```

建議函數：

```cpp
double CalculateDrawdownRiskMultiplier();
bool IsDrawdownWarning();
bool IsDrawdownCritical();
string GetDrawdownRiskStatus();
```

邏輯：

- 回撤達 Warning → 降低風險
- 回撤達 Critical → 大幅降低風險或禁止新倉
- 不得影響既有持倉管理
- 與 RiskController 相容

---

## 4. Volatility-Based Risk Adjustment

建立基於波動率的風險調整。

建議 Input：

```cpp
input bool EnableVolatilityRiskAdjustment = true;
input double LowATRMultiplier = 0.75;
input double NormalATRMultiplier = 1.0;
input double HighATRMultiplier = 0.50;
input double ExtremeATRMultiplier = 0.25;
```

建議函數：

```cpp
double CalculateVolatilityRiskMultiplier();
bool IsLowVolatility();
bool IsNormalVolatility();
bool IsHighVolatility();
bool IsExtremeVolatility();
string GetVolatilityRiskStatus();
```

邏輯：

- 低波動：可降低交易或降低倉位，避免假突破
- 正常波動：正常交易
- 高波動：降低風險
- 極端波動：大幅降低風險或禁止新倉
- 必須依既有 ATR / SymbolInfo 資料，不硬編券商參數

---

## 5. Performance-Based Trading Throttle

建立基於近期績效的交易節流。

建議 Input：

```cpp
input bool EnablePerformanceThrottle = true;
input int PerformanceLookbackTrades = 20;
input double ThrottleWinRateThreshold = 40.0;
input double ThrottleProfitFactorThreshold = 1.0;
input int ThrottleConsecutiveLossLimit = 3;
```

建議函數：

```cpp
bool IsPerformanceThrottleActive();
double CalculatePerformanceThrottleMultiplier();
string GetPerformanceThrottleReason();
```

觸發條件：

- 最近勝率低於門檻
- 最近 Profit Factor 低於門檻
- 連續虧損達限制
- 高分訊號連續失敗
- StrategyAnalytics 判斷 Performance Degrading

行為：

- 降低交易頻率
- 延長冷卻時間
- 降低風險倍率
- 必要時切換至 Safety Mode

---

## 6. Strategy Health-Based Safety Mode

建立策略健康安全模式。

建議 Input：

```cpp
input bool EnableStrategyHealthSafetyMode = true;
input bool BlockNewTradesWhenStrategyDegraded = true;
input bool ReduceRiskWhenStrategyWarning = true;
```

建議 enum：

```cpp
enum ENUM_XQP_ADAPTIVE_SAFETY_MODE
{
   XQP_SAFETY_MODE_NORMAL = 0,
   XQP_SAFETY_MODE_REDUCED_RISK = 1,
   XQP_SAFETY_MODE_THROTTLED = 2,
   XQP_SAFETY_MODE_BLOCK_NEW_TRADES = 3
};
```

建議函數：

```cpp
ENUM_XQP_ADAPTIVE_SAFETY_MODE EvaluateAdaptiveSafetyMode();
bool IsAdaptiveSafetyModeActive();
bool BlockNewTradesByAdaptiveRisk();
string GetAdaptiveSafetyModeText();
```

邏輯：

- GOOD → NORMAL
- NEUTRAL → NORMAL 或輕微保守
- WARNING → REDUCED_RISK / THROTTLED
- DEGRADED → BLOCK_NEW_TRADES 或極低風險
- UNKNOWN → 保守模式

---

## 7. Adaptive Cooldown Extension

建立自適應冷卻延長。

建議 Input：

```cpp
input bool EnableAdaptiveCooldown = true;
input double WarningCooldownMultiplier = 1.5;
input double DegradedCooldownMultiplier = 2.0;
```

建議函數：

```cpp
int GetAdjustedCooldownMinutes();
int GetAdjustedLossCooldownMinutes();
string GetAdaptiveCooldownStatus();
```

邏輯：

- Strategy Warning → 延長冷卻時間
- Strategy Degraded → 更長冷卻時間
- 連續虧損 → 延長虧損後冷卻
- 不影響既有持倉管理

---

## 8. Dynamic Trade Frequency Control

建立動態交易頻率控制。

建議 Input：

```cpp
input bool EnableDynamicTradeFrequencyControl = true;
input int NormalMaxTradesPerDay = 5;
input int ReducedMaxTradesPerDay = 3;
input int ThrottledMaxTradesPerDay = 1;
```

建議函數：

```cpp
int GetAdaptiveMaxTradesPerDay();
int GetAdaptiveMaxTradesPerHour();
bool AdaptiveTradeFrequencyPassed();
string GetTradeFrequencyStatus();
```

邏輯：

- 正常狀態：使用正常交易頻率
- 警告狀態：降低每日交易數
- 退化狀態：大幅降低或禁止交易
- 必須與 Module 17 Safe Entry Throttling 相容

---

## 9. Risk Multiplier Framework

建立統一風險倍率計算。

建議函數：

```cpp
double CalculateFinalRiskMultiplier(int signalScore);
double ClampRiskMultiplier(double multiplier);
double GetFinalAdjustedRiskPercent(int signalScore);
string GetRiskMultiplierBreakdown(int signalScore);
```

Final Risk Multiplier 可由以下因素共同決定：

- DefaultRiskMultiplier
- ScoreBasedMultiplier
- DrawdownMultiplier
- VolatilityMultiplier
- PerformanceThrottleMultiplier
- StrategyHealthMultiplier

建議計算方式：

```text
FinalMultiplier = Default * Score * Drawdown * Volatility * Performance * Health
```

再進行：

```text
Clamp(MinimumRiskMultiplier, MaximumRiskMultiplier)
```

---

## 10. Adaptive Execution Permission Gate

建立自適應交易許可閘門。

建議函數：

```cpp
bool AdaptiveRiskAllowsNewTrade(int signalScore);
bool AdaptiveRiskAllowsBuy(int buyScore);
bool AdaptiveRiskAllowsSell(int sellScore);
string GetAdaptiveExecutionPermissionText(int signalScore);
void PrintAdaptiveRiskReport();
```

必須同時遵守：

- LiveSafetyGuard
- RiskController
- StrategyActivationController
- ControlledExecutionGate
- EmergencyStop
- SessionFilter
- BrokerExecutionGuard

本模組只能縮小風險或阻擋交易，不得繞過原有安全 Gate。

---

# 主程式整合

## OnInit()

加入：

1. 初始化 AdaptiveRiskThrottle
2. 檢查自適應風險參數合法性
3. 輸出 Adaptive Risk Summary
4. 保留 Module 0 ~ Module 18 初始化流程

若參數錯誤：

```cpp
return INIT_PARAMETERS_INCORRECT;
```

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
9. StrategyAnalytics.UpdateAnalytics()
10. AdaptiveRiskThrottle.Update / Evaluate
11. StrategyActivationController 判定 Buy / Sell Activation
12. AdaptiveRiskAllowsBuy / AdaptiveRiskAllowsSell
13. ControlledExecutionGate Evaluate
14. 若允許下單：
    - 使用 GetFinalAdjustedRiskPercent() 或 FinalRiskMultiplier
    - 與 MoneyManagement 計算手數整合
15. OrderManager 或 SignalOnly / DryRun / Simulation 流程
16. Dashboard.Update()
17. PerformanceMetrics.Update()

---

## Dashboard 整合

Dashboard 應可顯示：

- Adaptive Risk Multiplier
- Adjusted Risk Percent
- Adaptive Safety Mode
- Drawdown Risk Status
- Volatility Risk Status
- Performance Throttle Status
- Adaptive Trade Frequency Status
- Block Reason

不得造成 Chart Object 過度刷新。

---

## Logger 整合

Logger 應記錄：

- Risk Multiplier Breakdown
- Adaptive Block Reason
- Strategy Health Mode
- Adjusted Risk Percent
- Throttle Status
- Safety Mode Change

Optimization 模式下避免大量輸出。

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Adaptive Risk Summary
- Final Safety Mode
- Last Risk Multiplier
- Last Block Reason

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 上架方向
- Strategy Tester 相容
- Optimization 相容
- VPS 相容
- 不干擾交易執行
- 不造成過度 Print
- 不造成過度 Chart Object 更新
- 不影響既有風控與安全閘門
- 僅能降低風險或限制交易，不得繞過安全機制

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
- 破壞 Module 0 ~ Module 18 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- Adaptive Risk 模組繞過 RiskController
- Adaptive Risk 模組繞過 LiveSafetyGuard
- Adaptive Risk 模組在風險惡化時提高交易強度
- EmergencyStop 啟用時允許新交易

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module19_AdaptiveRiskStrategyThrottle.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 19 Adaptive Risk & Strategy Throttle Framework 完成
- Adaptive Risk Scaling 完成
- Score-Based Position Sizing 完成
- Drawdown-Based Risk Reduction 完成
- Volatility-Based Risk Adjustment 完成
- Performance-Based Trading Throttle 完成
- Strategy Health-Based Safety Mode 完成
- Adaptive Cooldown Extension 完成
- Dynamic Trade Frequency Control 完成
- Risk Multiplier Framework 完成
- Adaptive Execution Permission Gate 完成
- 0 Errors
- 0 Warnings

形成：

```text
Adaptive Risk & Strategy Throttle Framework v1
```

---

# 下一階段預告

完成 Step 15 後，下一步建議進入：

## Step 16：Module 20 Portfolio / Multi-Instance Governance Framework

內容：

- Multi-Instance Magic Coordination
- Same Symbol Conflict Control
- Portfolio Exposure Awareness
- Cross-EA Risk Coordination
- Multi-Timeframe Instance Governance
- Market Product Deployment Governance
