# Step 14 Prompt：Module 18 Strategy Performance Analytics Framework

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

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 7：Strategy Performance Analytics Layer

## 本次任務

### Module 18：Strategy Performance Analytics Framework

建立從「能安全啟動交易」進一步升級為「能分析策略品質與交易成效」的策略績效分析層。

本模組目的不是新增交易策略，而是建立 EA 對訊號品質、分數分布、交易結果歸因、進出場原因、策略健康狀態與績效退化風險的分析能力。

---

# 核心目標

建立一套商業級 Strategy Performance Analytics Framework，包含：

- Real-Time Strategy Analytics
- Signal Quality Tracking
- Score Distribution Analysis
- Trade Outcome Attribution
- Entry / Exit Reason Tracking
- Strategy Health Status
- Performance Degradation Warning
- Analytics Dashboard Extension
- Analytics Logger Integration
- Optimization Feedback Preparation

---

# Module 18：Strategy Performance Analytics Framework

建議建立：

```cpp
class CStrategyAnalytics
```

或依既有 OOP 架構保持一致命名。

---

## 1. Real-Time Strategy Analytics

建立即時策略分析框架。

建議函數：

```cpp
void UpdateAnalytics();
void ResetAnalytics();
string GetAnalyticsSummary();
void PrintAnalyticsSummary();
```

分析項目：

- 當前 Buy Score
- 當前 Sell Score
- 當前 Strategy State
- 當前 Execution Status
- 當前 Risk Status
- 當前 Session Status
- 當前 Spread Status
- 當前 ATR 狀態

---

## 2. Signal Quality Tracking

建立訊號品質追蹤。

建議 Input：

```cpp
input bool EnableSignalQualityTracking = true;
input int SignalQualityLookback = 100;
```

建議函數：

```cpp
void RecordBuySignal(int score, string reason);
void RecordSellSignal(int score, string reason);
int TotalBuySignals();
int TotalSellSignals();
double AverageBuySignalScore();
double AverageSellSignalScore();
string GetSignalQualitySummary();
```

追蹤內容：

- Buy Signal Count
- Sell Signal Count
- Average Buy Score
- Average Sell Score
- Strong Signal Count
- Weak Signal Count
- Conflicting Signal Count
- Blocked Signal Count

---

## 3. Score Distribution Analysis

建立訊號分數分布分析。

建議區間：

- 0 ~ 20
- 21 ~ 40
- 41 ~ 60
- 61 ~ 79
- 80 ~ 100

建議函數：

```cpp
void UpdateScoreDistribution(int buyScore, int sellScore);
string GetScoreDistributionReport();
int GetStrongSignalCount();
int GetWeakSignalCount();
```

目的：

- 分析策略是否過度頻繁產生低品質訊號
- 分析 Threshold 是否過高或過低
- 支援後續 Optimization Feedback

---

## 4. Trade Outcome Attribution

建立交易結果歸因框架。

建議資料結構：

```cpp
struct STradeAttribution
{
   ulong ticket;
   datetime entry_time;
   string direction;
   int entry_score;
   string entry_reason;
   string exit_reason;
   double lots;
   double entry_price;
   double exit_price;
   double profit;
};
```

建議函數：

```cpp
void RecordTradeEntry(ulong ticket, string direction, int score, string reason);
void RecordTradeExit(ulong ticket, string exitReason, double profit);
string GetTradeAttributionReport();
```

歸因項目：

- 進場方向
- 進場分數
- 進場原因
- 出場原因
- 盈虧
- 是否符合策略預期
- 是否由風控關閉
- 是否由反向訊號關閉
- 是否由 BreakEven / TrailingStop 管理

---

## 5. Entry / Exit Reason Tracking

建立進出場原因追蹤。

建議 enum：

```cpp
enum ENUM_XQP_ENTRY_REASON
{
   XQP_ENTRY_NONE = 0,
   XQP_ENTRY_EMA_TREND = 1,
   XQP_ENTRY_RSI_MOMENTUM = 2,
   XQP_ENTRY_ATR_VOLATILITY = 3,
   XQP_ENTRY_SESSION_FILTER = 4,
   XQP_ENTRY_COMPOSITE_SCORE = 5
};
```

```cpp
enum ENUM_XQP_EXIT_REASON
{
   XQP_EXIT_NONE = 0,
   XQP_EXIT_OPPOSITE_SIGNAL = 1,
   XQP_EXIT_BREAK_EVEN = 2,
   XQP_EXIT_TRAILING_STOP = 3,
   XQP_EXIT_RISK_CONTROL = 4,
   XQP_EXIT_SESSION_END = 5,
   XQP_EXIT_EMERGENCY_STOP = 6
};
```

建議函數：

```cpp
string EntryReasonToString(ENUM_XQP_ENTRY_REASON reason);
string ExitReasonToString(ENUM_XQP_EXIT_REASON reason);
void SetLastEntryReason(ENUM_XQP_ENTRY_REASON reason);
void SetLastExitReason(ENUM_XQP_EXIT_REASON reason);
```

---

## 6. Strategy Health Status

建立策略健康狀態評估。

建議 enum：

```cpp
enum ENUM_XQP_STRATEGY_HEALTH
{
   XQP_STRATEGY_HEALTH_UNKNOWN = 0,
   XQP_STRATEGY_HEALTH_GOOD = 1,
   XQP_STRATEGY_HEALTH_NEUTRAL = 2,
   XQP_STRATEGY_HEALTH_WARNING = 3,
   XQP_STRATEGY_HEALTH_DEGRADED = 4
};
```

建議函數：

```cpp
ENUM_XQP_STRATEGY_HEALTH EvaluateStrategyHealth();
string GetStrategyHealthText();
void PrintStrategyHealthReport();
```

評估依據：

- Signal Quality
- Win Rate
- Profit Factor
- Drawdown
- Consecutive Losses
- Blocked Trade Count
- Average Signal Score
- Score Distribution
- RiskController 狀態
- LiveSafetyGuard 狀態

---

## 7. Performance Degradation Warning

建立績效退化警示框架。

建議 Input：

```cpp
input bool EnablePerformanceDegradationWarning = true;
input int DegradationLookbackTrades = 20;
input double MinimumAcceptableWinRate = 40.0;
input double MinimumAcceptableProfitFactor = 1.0;
input int MaxRecentConsecutiveLossesForWarning = 3;
```

建議函數：

```cpp
bool IsPerformanceDegrading();
string GetPerformanceDegradationReason();
void PrintPerformanceDegradationWarning();
```

警示條件：

- 最近勝率低於門檻
- Profit Factor 低於門檻
- 連續虧損過多
- Drawdown 擴大
- 高分訊號仍連續失敗
- 信號衝突比例過高
- 多數訊號被 LiveSafety / RiskController 阻擋

本階段僅發出警示，不強制停機。後續可與 RiskController 整合。

---

## 8. Analytics Dashboard Extension

將分析摘要整合到 Dashboard。

建議函數：

```cpp
string GetDashboardAnalyticsText();
```

Dashboard 顯示項目：

- Buy Score
- Sell Score
- Signal Quality
- Strategy Health
- Recent Win Rate
- Recent Profit Factor
- Degradation Warning
- Last Entry Reason
- Last Exit Reason

不得造成 Chart Object 過度刷新。

---

## 9. Analytics Logger Integration

將分析事件整合至 Logger。

建議函數：

```cpp
void LogSignalAnalytics();
void LogStrategyHealth();
void LogPerformanceWarning();
void LogTradeAttribution();
```

記錄內容：

- Time
- Symbol
- BuyScore
- SellScore
- SignalDecision
- StrategyHealth
- EntryReason
- ExitReason
- TradeOutcome
- WarningStatus

Optimization 模式下應避免大量輸出。

---

## 10. Optimization Feedback Preparation

建立優化回饋預留框架。

建議函數：

```cpp
string GetOptimizationFeedbackSummary();
double GetSignalEfficiencyScore();
double GetStrategyQualityScore();
```

用途：

- 判斷目前參數是否產生過多低分訊號
- 判斷 Threshold 是否過高或過低
- 作為未來 OnTester() Fitness Score 強化依據
- 作為 Walk Forward Analysis 報告基礎

---

# 主程式整合

## OnInit()

加入：

1. 初始化 StrategyAnalytics
2. 初始化 Signal Quality Tracking
3. 初始化 Score Distribution
4. 輸出 Analytics Module Summary
5. 保留 Module 0 ~ Module 17 初始化流程

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
10. StrategyActivationController 判定 Buy / Sell Activation
11. ControlledExecutionGate Evaluate
12. OrderManager 或 SignalOnly / DryRun / Simulation 流程
13. StrategyAnalytics 記錄 Trade Intent / Block Reason / Execution Result
14. Dashboard.Update()
15. PerformanceMetrics.Update()

---

## OnTradeTransaction()

若既有架構支援，建議加入：

```cpp
void OnTradeTransaction(const MqlTradeTransaction &trans,
                        const MqlTradeRequest &request,
                        const MqlTradeResult &result);
```

用途：

- 捕捉成交
- 捕捉平倉
- 更新 Trade Outcome Attribution
- 更新 Performance Analytics

若為降低複雜度，本階段可建立安全框架，避免造成編譯錯誤。

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Strategy Analytics Summary
- Signal Quality Summary
- Strategy Health Status
- Performance Warning Status

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
- 破壞 Module 0 ~ Module 17 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- Analytics 模組繞過 RiskController
- Analytics 模組直接強制下單
- Analytics 模組干擾 LiveSafetyGuard

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module18_StrategyPerformanceAnalytics.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 18 Strategy Performance Analytics Framework 完成
- Real-Time Strategy Analytics 完成
- Signal Quality Tracking 完成
- Score Distribution Analysis 完成
- Trade Outcome Attribution 完成
- Entry / Exit Reason Tracking 完成
- Strategy Health Status 完成
- Performance Degradation Warning 完成
- Analytics Dashboard Extension 完成
- Analytics Logger Integration 完成
- Optimization Feedback Preparation 完成
- 0 Errors
- 0 Warnings

形成：

```text
Strategy Performance Analytics Framework v1
```

---

# 下一階段預告

完成 Step 14 後，下一步建議進入：

## Step 15：Module 19 Adaptive Risk & Strategy Throttle Framework

內容：

- Adaptive Risk Scaling
- Score-Based Position Sizing
- Drawdown-Based Risk Reduction
- Volatility-Based Risk Adjustment
- Performance-Based Trading Throttle
- Strategy Health-Based Safety Mode
