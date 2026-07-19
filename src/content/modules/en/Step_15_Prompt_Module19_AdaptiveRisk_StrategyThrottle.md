# Step 15 Prompt：Module 19 Adaptive Risk & Strategy Throttle Framework

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
- Module 18：Strategy Performance Analytics Framework

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
- Strategy Performance Analytics Framework v1 completed

Continue extending the existing architecture without breaking any completed module.

---

# Phase 8：Adaptive Risk & Strategy Throttle Layer

## Current Task

### Module 19：Adaptive Risk & Strategy Throttle Framework

Build the adaptive risk-control and strategy-throttling layer that advances the product from “analyzing strategy quality” to “automatically adjusting risk and trading intensity according to strategy state.”

This module does not add a new entry indicator. It uses the existing:

- Strategy Performance Analytics
- Strategy Health Status
- Signal Quality Tracking
- Score Distribution Analysis
- RiskController
- LiveSafetyGuard
- Controlled Execution Gate
- MoneyManagement

to dynamically adjust:

- Risk per trade
- Trading frequency
- Conditions for opening positions
- Trading intensity
- Safety mode

---

# Core Objective

Build a commercial-grade Adaptive Risk & Strategy Throttle Framework that includes:

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

Recommended: create:

```cpp
class CAdaptiveRiskThrottle
```

Or retain naming consistent with the existing OOP architecture.

---

## 1. Adaptive Risk Scaling

Build an adaptive risk-scaling framework.

Suggested inputs:

```cpp
input bool EnableAdaptiveRiskScaling = true;
input double MinimumRiskMultiplier = 0.25;
input double MaximumRiskMultiplier = 1.25;
input double DefaultRiskMultiplier = 1.0;
```

Suggested functions:

```cpp
double CalculateAdaptiveRiskMultiplier();
double GetCurrentRiskMultiplier();
double GetAdjustedRiskPercent();
string GetAdaptiveRiskStatus();
```

Logic:

- Healthy strategy → maintain or slightly increase risk
- Neutral strategy health → maintain default risk
- Strategy warning → reduce risk
- Strategy degradation → sharply reduce risk or block new positions
- The risk multiplier must remain within MinimumRiskMultiplier through MaximumRiskMultiplier

Must not bypass the original RiskPercent and MoneyManagement module.

---

## 2. Score-Based Position Sizing

Build a signal-score-based position-adjustment framework.

Suggested inputs:

```cpp
input bool EnableScoreBasedPositionSizing = true;
input int HighConfidenceScore = 90;
input int MediumConfidenceScore = 80;
input int LowConfidenceScore = 70;
input double HighScoreRiskMultiplier = 1.10;
input double MediumScoreRiskMultiplier = 1.00;
input double LowScoreRiskMultiplier = 0.50;
```

Suggested functions:

```cpp
double CalculateScoreBasedRiskMultiplier(int signalScore);
double GetScoreConfidenceMultiplier(int signalScore);
string GetScoreSizingStatus(int signalScore);
```

Logic:

- High-score signals may use a higher risk multiplier, but never above MaximumRiskMultiplier
- Medium-score signals use default risk
- Low-score signals use reduced risk or do not trade
- If the signal score is below Entry Threshold, no position may be opened

---

## 3. Drawdown-Based Risk Reduction

Build a drawdown-based risk-reduction mechanism.

Suggested inputs:

```cpp
input bool EnableDrawdownRiskReduction = true;
input double DrawdownWarningPercent = 5.0;
input double DrawdownCriticalPercent = 10.0;
input double DrawdownWarningRiskMultiplier = 0.50;
input double DrawdownCriticalRiskMultiplier = 0.25;
```

Suggested functions:

```cpp
double CalculateDrawdownRiskMultiplier();
bool IsDrawdownWarning();
bool IsDrawdownCritical();
string GetDrawdownRiskStatus();
```

Logic:

- Drawdown reaches Warning → reduce risk
- Drawdown reaches Critical → sharply reduce risk or block new positions
- Must not affect management of existing positions
- Must be compatible with RiskController

---

## 4. Volatility-Based Risk Adjustment

Build volatility-based risk adjustment.

Suggested inputs:

```cpp
input bool EnableVolatilityRiskAdjustment = true;
input double LowATRMultiplier = 0.75;
input double NormalATRMultiplier = 1.0;
input double HighATRMultiplier = 0.50;
input double ExtremeATRMultiplier = 0.25;
```

Suggested functions:

```cpp
double CalculateVolatilityRiskMultiplier();
bool IsLowVolatility();
bool IsNormalVolatility();
bool IsHighVolatility();
bool IsExtremeVolatility();
string GetVolatilityRiskStatus();
```

Logic:

- Low volatility: reduce trading or position size to avoid false breakouts
- Normal volatility: trade normally
- High volatility: reduce risk
- Extreme volatility: sharply reduce risk or block new positions
- Must use existing ATR / SymbolInfo data; do not hard-code broker parameters

---

## 5. Performance-Based Trading Throttle

Build recent-performance-based trade throttling.

Suggested inputs:

```cpp
input bool EnablePerformanceThrottle = true;
input int PerformanceLookbackTrades = 20;
input double ThrottleWinRateThreshold = 40.0;
input double ThrottleProfitFactorThreshold = 1.0;
input int ThrottleConsecutiveLossLimit = 3;
```

Suggested functions:

```cpp
bool IsPerformanceThrottleActive();
double CalculatePerformanceThrottleMultiplier();
string GetPerformanceThrottleReason();
```

Trigger conditions:

- Recent win rate falls below the threshold
- Recent Profit Factor falls below the threshold
- Consecutive losses reach the limit
- High-score signals fail consecutively
- StrategyAnalytics determines Performance Degrading

Behavior:

- Reduce trading frequency
- Extend cooldown
- Reduce the risk multiplier
- Switch to Safety Mode when necessary

---

## 6. Strategy Health-Based Safety Mode

Build strategy-health safety modes.

Suggested inputs:

```cpp
input bool EnableStrategyHealthSafetyMode = true;
input bool BlockNewTradesWhenStrategyDegraded = true;
input bool ReduceRiskWhenStrategyWarning = true;
```

Suggested enum:

```cpp
enum ENUM_XQP_ADAPTIVE_SAFETY_MODE
{
   XQP_SAFETY_MODE_NORMAL = 0,
   XQP_SAFETY_MODE_REDUCED_RISK = 1,
   XQP_SAFETY_MODE_THROTTLED = 2,
   XQP_SAFETY_MODE_BLOCK_NEW_TRADES = 3
};
```

Suggested functions:

```cpp
ENUM_XQP_ADAPTIVE_SAFETY_MODE EvaluateAdaptiveSafetyMode();
bool IsAdaptiveSafetyModeActive();
bool BlockNewTradesByAdaptiveRisk();
string GetAdaptiveSafetyModeText();
```

Logic:

- GOOD → NORMAL
- NEUTRAL → NORMAL or slightly conservative
- WARNING → REDUCED_RISK / THROTTLED
- DEGRADED → BLOCK_NEW_TRADES or extremely low risk
- UNKNOWN → conservative mode

---

## 7. Adaptive Cooldown Extension

Build adaptive cooldown extension.

Suggested inputs:

```cpp
input bool EnableAdaptiveCooldown = true;
input double WarningCooldownMultiplier = 1.5;
input double DegradedCooldownMultiplier = 2.0;
```

Suggested functions:

```cpp
int GetAdjustedCooldownMinutes();
int GetAdjustedLossCooldownMinutes();
string GetAdaptiveCooldownStatus();
```

Logic:

- Strategy Warning → extend cooldown
- Strategy Degraded → extend cooldown further
- Consecutive losses → extend post-loss cooldown
- Do not affect management of existing positions

---

## 8. Dynamic Trade Frequency Control

Build dynamic trading-frequency control.

Suggested inputs:

```cpp
input bool EnableDynamicTradeFrequencyControl = true;
input int NormalMaxTradesPerDay = 5;
input int ReducedMaxTradesPerDay = 3;
input int ThrottledMaxTradesPerDay = 1;
```

Suggested functions:

```cpp
int GetAdaptiveMaxTradesPerDay();
int GetAdaptiveMaxTradesPerHour();
bool AdaptiveTradeFrequencyPassed();
string GetTradeFrequencyStatus();
```

Logic:

- Normal state: use normal trading frequency
- Warning state: reduce daily trade count
- Degraded state: sharply reduce or block trading
- Must be compatible with Module 17 Safe Entry Throttling

---

## 9. Risk Multiplier Framework

Build unified risk-multiplier calculation.

Suggested functions:

```cpp
double CalculateFinalRiskMultiplier(int signalScore);
double ClampRiskMultiplier(double multiplier);
double GetFinalAdjustedRiskPercent(int signalScore);
string GetRiskMultiplierBreakdown(int signalScore);
```

The Final Risk Multiplier may be determined jointly by:

- DefaultRiskMultiplier
- ScoreBasedMultiplier
- DrawdownMultiplier
- VolatilityMultiplier
- PerformanceThrottleMultiplier
- StrategyHealthMultiplier

Suggested calculation:

```text
FinalMultiplier = Default * Score * Drawdown * Volatility * Performance * Health
```

Then perform:

```text
Clamp(MinimumRiskMultiplier, MaximumRiskMultiplier)
```

---

## 10. Adaptive Execution Permission Gate

Build the adaptive trade-permission gate.

Suggested functions:

```cpp
bool AdaptiveRiskAllowsNewTrade(int signalScore);
bool AdaptiveRiskAllowsBuy(int buyScore);
bool AdaptiveRiskAllowsSell(int sellScore);
string GetAdaptiveExecutionPermissionText(int signalScore);
void PrintAdaptiveRiskReport();
```

Must simultaneously honor:

- LiveSafetyGuard
- RiskController
- StrategyActivationController
- ControlledExecutionGate
- EmergencyStop
- SessionFilter
- BrokerExecutionGuard

This module may only reduce risk or block trades; it must never bypass an existing safety gate.

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize AdaptiveRiskThrottle
2. Validate adaptive-risk parameters
3. Output the Adaptive Risk Summary
4. Preserve the Module 0 through Module 18 initialization flow

If parameters are invalid:

```cpp
return INIT_PARAMETERS_INCORRECT;
```

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
10. AdaptiveRiskThrottle.Update / Evaluate
11. StrategyActivationController determines Buy / Sell Activation
12. AdaptiveRiskAllowsBuy / AdaptiveRiskAllowsSell
13. ControlledExecutionGate Evaluate
14. If order placement is permitted:
    - Use GetFinalAdjustedRiskPercent() or FinalRiskMultiplier
    - Integrate with MoneyManagement lot calculation
15. OrderManager or SignalOnly / DryRun / Simulation flow
16. Dashboard.Update()
17. PerformanceMetrics.Update()

---

## Dashboard Integration

Dashboard must be able to display:

- Adaptive Risk Multiplier
- Adjusted Risk Percent
- Adaptive Safety Mode
- Drawdown Risk Status
- Volatility Risk Status
- Performance Throttle Status
- Adaptive Trade Frequency Status
- Block Reason

Must not cause excessive Chart Object refreshes.

---

## Logger Integration

Logger must record:

- Risk Multiplier Breakdown
- Adaptive Block Reason
- Strategy Health Mode
- Adjusted Risk Percent
- Throttle Status
- Safety Mode Change

Avoid excessive output in Optimization mode.

---

## OnDeinit()

Suggested output:

- EA Name
- Version
- Adaptive Risk Summary
- Final Safety Mode
- Last Risk Multiplier
- Last Block Reason

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
- May only reduce risk or restrict trading; must not bypass safety mechanisms

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
- Breaking the Module 0 through Module 18 architecture
- Printing the entire source code in the dialog
- Generating code that cannot compile
- Adaptive Risk module bypassing RiskController
- Adaptive Risk module bypassing LiveSafetyGuard
- Adaptive Risk module increasing trading intensity while risk is worsening
- Permitting new trades while EmergencyStop is active

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module19_AdaptiveRiskStrategyThrottle.mq5
```

Delivery method:

- Provide downloadable mq5 files
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

After this stage, the following must be achieved:

- Module 19 Adaptive Risk & Strategy Throttle Framework completed
- Adaptive Risk Scaling completed
- Score-Based Position Sizing completed
- Drawdown-Based Risk Reduction completed
- Volatility-Based Risk Adjustment completed
- Performance-Based Trading Throttle completed
- Strategy Health-Based Safety Mode completed
- Adaptive Cooldown Extension completed
- Dynamic Trade Frequency Control completed
- Risk Multiplier Framework completed
- Adaptive Execution Permission Gate completed
- 0 Errors
- 0 Warnings

Resulting in:

```text
Adaptive Risk & Strategy Throttle Framework v1
```

---

# Next-Stage Preview

After Step 15 is completed, the recommended next stage is:

## Step 16：Module 20 Portfolio / Multi-Instance Governance Framework

Contents:

- Multi-Instance Magic Coordination
- Same Symbol Conflict Control
- Portfolio Exposure Awareness
- Cross-EA Risk Coordination
- Multi-Timeframe Instance Governance
- Market Product Deployment Governance

