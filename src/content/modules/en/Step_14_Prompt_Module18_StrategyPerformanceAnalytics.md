# Step 14 Prompt：Module 18 Strategy Performance Analytics Framework

Follow the Ultimate AI Development Constitution v3.0 Enterprise Edition  
and Master_Prompt.md.

---

## Project

XAUUSD_Quant_Pro_v1

---

## Completed Modules

Currently completed:

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

Successfully compiled:

- 0 Errors
- 0 Warnings

Current status:

- Enterprise Trading Framework v5 completed
- Strategy Validation Layer v1 completed
- Backtest & Optimization Framework v1 completed
- MQL5 Market Packaging Framework v1 completed
- Product Manual & Release Kit v1 completed
- Final Pre-Release Validation Framework v1 completed
- Live-Safety / Deployment Guard Framework v1 completed
- Strategy Activation & Controlled Trading Framework v1 completed

Continue extending the existing architecture without breaking any completed module.

---

# Phase 7：Strategy Performance Analytics Layer

## Current Task

### Module 18：Strategy Performance Analytics Framework

Build the strategy-performance analytics layer that advances the product from “safe trade activation” to “analysis of strategy quality and trading results.”

This module does not add a trading strategy. It gives the EA analytical capabilities for signal quality, score distribution, trade-result attribution, entry/exit reasons, strategy health, and performance-degradation risk.

---

# Core Objective

Build a commercial-grade Strategy Performance Analytics Framework that includes:

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

Recommended: create:

```cpp
class CStrategyAnalytics
```

Or retain naming consistent with the existing OOP architecture.

---

## 1. Real-Time Strategy Analytics

Build a real-time strategy analytics framework.

Suggested functions:

```cpp
void UpdateAnalytics();
void ResetAnalytics();
string GetAnalyticsSummary();
void PrintAnalyticsSummary();
```

Analytics items:

- Current Buy Score
- Current Sell Score
- Current Strategy State
- Current Execution Status
- Current Risk Status
- Current Session Status
- Current Spread Status
- Current ATR status

---

## 2. Signal Quality Tracking

Build signal-quality tracking.

Suggested inputs:

```cpp
input bool EnableSignalQualityTracking = true;
input int SignalQualityLookback = 100;
```

Suggested functions:

```cpp
void RecordBuySignal(int score, string reason);
void RecordSellSignal(int score, string reason);
int TotalBuySignals();
int TotalSellSignals();
double AverageBuySignalScore();
double AverageSellSignalScore();
string GetSignalQualitySummary();
```

Tracked content:

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

Build signal-score distribution analysis.

Suggested ranges:

- 0 ~ 20
- 21 ~ 40
- 41 ~ 60
- 61 ~ 79
- 80 ~ 100

Suggested functions:

```cpp
void UpdateScoreDistribution(int buyScore, int sellScore);
string GetScoreDistributionReport();
int GetStrongSignalCount();
int GetWeakSignalCount();
```

Purpose:

- Determine whether the strategy produces low-quality signals too frequently
- Determine whether the Threshold is too high or too low
- Support subsequent Optimization Feedback

---

## 4. Trade Outcome Attribution

Build a trade-outcome attribution framework.

Suggested data structure:

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

Suggested functions:

```cpp
void RecordTradeEntry(ulong ticket, string direction, int score, string reason);
void RecordTradeExit(ulong ticket, string exitReason, double profit);
string GetTradeAttributionReport();
```

Attribution items:

- Entry direction
- Entry score
- Entry reason
- Exit reason
- Profit or loss
- Whether the outcome matched strategy expectations
- Whether Risk Control closed the position
- Whether an opposing signal closed the position
- Whether BreakEven / TrailingStop managed the position

---

## 5. Entry / Exit Reason Tracking

Build entry/exit reason tracking.

Suggested enum:

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

Suggested functions:

```cpp
string EntryReasonToString(ENUM_XQP_ENTRY_REASON reason);
string ExitReasonToString(ENUM_XQP_EXIT_REASON reason);
void SetLastEntryReason(ENUM_XQP_ENTRY_REASON reason);
void SetLastExitReason(ENUM_XQP_EXIT_REASON reason);
```

---

## 6. Strategy Health Status

Build strategy-health evaluation.

Suggested enum:

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

Suggested functions:

```cpp
ENUM_XQP_STRATEGY_HEALTH EvaluateStrategyHealth();
string GetStrategyHealthText();
void PrintStrategyHealthReport();
```

Evaluation basis:

- Signal Quality
- Win Rate
- Profit Factor
- Drawdown
- Consecutive Losses
- Blocked Trade Count
- Average Signal Score
- Score Distribution
- RiskController status
- LiveSafetyGuard status

---

## 7. Performance Degradation Warning

Build a performance-degradation warning framework.

Suggested inputs:

```cpp
input bool EnablePerformanceDegradationWarning = true;
input int DegradationLookbackTrades = 20;
input double MinimumAcceptableWinRate = 40.0;
input double MinimumAcceptableProfitFactor = 1.0;
input int MaxRecentConsecutiveLossesForWarning = 3;
```

Suggested functions:

```cpp
bool IsPerformanceDegrading();
string GetPerformanceDegradationReason();
void PrintPerformanceDegradationWarning();
```

Warning conditions:

- Recent win rate is below the threshold
- Profit Factor is below the threshold
- Too many consecutive losses
- Drawdown is expanding
- High-score signals continue to fail
- Signal-conflict ratio is too high
- Most signals are blocked by LiveSafety / RiskController

At this stage, issue warnings only; do not force shutdown. Future integration with RiskController is reserved.

---

## 8. Analytics Dashboard Extension

Integrate the analytics summary into Dashboard.

Suggested functions:

```cpp
string GetDashboardAnalyticsText();
```

Dashboard display items:

- Buy Score
- Sell Score
- Signal Quality
- Strategy Health
- Recent Win Rate
- Recent Profit Factor
- Degradation Warning
- Last Entry Reason
- Last Exit Reason

Must not cause excessive Chart Object refreshes.

---

## 9. Analytics Logger Integration

Integrate analytics events with Logger.

Suggested functions:

```cpp
void LogSignalAnalytics();
void LogStrategyHealth();
void LogPerformanceWarning();
void LogTradeAttribution();
```

Recorded content:

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

Avoid excessive output in Optimization mode.

---

## 10. Optimization Feedback Preparation

Build a reserved optimization-feedback framework.

Suggested functions:

```cpp
string GetOptimizationFeedbackSummary();
double GetSignalEfficiencyScore();
double GetStrategyQualityScore();
```

Purpose:

- Determine whether current parameters produce too many low-score signals
- Determine whether the Threshold is too high or too low
- Provide a basis for future OnTester() Fitness Score enhancements
- Provide a foundation for Walk Forward Analysis reports

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize StrategyAnalytics
2. Initialize Signal Quality Tracking
3. Initialize Score Distribution
4. Output the Analytics Module Summary
5. Preserve the Module 0 through Module 17 initialization flow

---

## OnTick()

Suggested flow:

1. EmergencyStop Check
2. CanManageExistingPositions()
3. BreakEven / TrailingStop manage existing positions
4. LiveSafetyGuard.CanOpenNewTrade()
5. RiskController.IsTradingAllowed()
6. SessionFilter.IsTradingAllowed()
7. SignalEngine
8. StrategyFramework calculates Buy / Sell Score
9. StrategyAnalytics.UpdateAnalytics()
10. StrategyActivationController determines Buy / Sell Activation
11. ControlledExecutionGate Evaluate
12. OrderManager or SignalOnly / DryRun / Simulation flow
13. StrategyAnalytics records Trade Intent / Block Reason / Execution Result
14. Dashboard.Update()
15. PerformanceMetrics.Update()

---

## OnTradeTransaction()

If supported by the existing architecture, add:

```cpp
void OnTradeTransaction(const MqlTradeTransaction &trans,
                        const MqlTradeRequest &request,
                        const MqlTradeResult &result);
```

Purpose:

- Capture fills
- Capture position closures
- Update Trade Outcome Attribution
- Update Performance Analytics

To reduce complexity, this stage may establish a safe framework that avoids compilation errors.

---

## OnDeinit()

Suggested output:

- EA Name
- Version
- Strategy Analytics Summary
- Signal Quality Summary
- Strategy Health Status
- Performance Warning Status

---

# Commercial-Grade Standards

Must comply with:

- Official MQL5 syntax
- Official CTrade
- MQL5 Market publishing direction
- Strategy Tester compatibility
- Optimization compatibility
- VPS compatibility
- Does not interfere with trade execution
- Does not cause excessive Print output
- Does not cause excessive Chart Object updates
- Does not affect existing risk controls and safety gates

---

# Strictly Prohibited

Prohibited:

- OrderSend()
- DLL
- External EXE files
- Network APIs
- Pseudocode
- // TODO
- Incomplete functions
- Breaking the Module 0 through Module 17 architecture
- Printing the entire source code in the dialog
- Generating code that cannot compile
- Analytics module bypassing RiskController
- Analytics module directly forcing order placement
- Analytics module interfering with LiveSafetyGuard

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module18_StrategyPerformanceAnalytics.mq5
```

Delivery method:

- Provide downloadable mq5 files
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

After this stage, the following must be achieved:

- Module 18 Strategy Performance Analytics Framework completed
- Real-Time Strategy Analytics completed
- Signal Quality Tracking completed
- Score Distribution Analysis completed
- Trade Outcome Attribution completed
- Entry / Exit Reason Tracking completed
- Strategy Health Status completed
- Performance Degradation Warning completed
- Analytics Dashboard Extension completed
- Analytics Logger Integration completed
- Optimization Feedback Preparation completed
- 0 Errors
- 0 Warnings

Resulting in:

```text
Strategy Performance Analytics Framework v1
```

---

# Next-Stage Preview

After Step 14 is completed, the recommended next stage is:

## Step 15：Module 19 Adaptive Risk & Strategy Throttle Framework

Contents:

- Adaptive Risk Scaling
- Score-Based Position Sizing
- Drawdown-Based Risk Reduction
- Volatility-Based Risk Adjustment
- Performance-Based Trading Throttle
- Strategy Health-Based Safety Mode

