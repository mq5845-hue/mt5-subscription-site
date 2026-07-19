# Step 8 Prompt: Module 12 Backtest & Optimization Framework

Follow the Ultimate AI Development Constitution v3.0 Enterprise Edition
and Master_Prompt.md.

---

## Project

XAUUSD_Quant_Pro_v1

---

## Completed Modules

Currently completed:

- Module 0: BaseConfig
- Module 1: NewBarDetector
- Module 2: MoneyManagement
- Module 3: OrderManager
- Module 4: BreakEven
- Module 5: TrailingStop
- Module 6: SignalEngine
- Module 7: SessionFilter
- Module 8: RiskController
- Module 9: Logger
- Module 10: Dashboard
- Module 11: Strategy Framework

Successfully compiled with:

- 0 Errors
- 0 Warnings

Current status:

- Enterprise Trading Framework v5 completed
- Strategy Validation Layer v1 completed

Continue extending the existing architecture without breaking completed modules.

---

# Phase 2: Strategy Validation Layer

## Current Task

### Module 12: Backtest & Optimization Framework

Create a backtest and optimization framework designed specifically for MT5 Strategy Tester, Optimization, Forward Test, and Walk Forward Analysis.

---

# Core Objectives

This stage does not add a new trading strategy. Instead, it strengthens the EA's:

- Backtest readability
- Parameter optimizability
- Test-mode control
- Statistical output capabilities
- Strategy Tester compatibility
- Preparation for MQL5 Market presentation

---

# Module 12: Backtest & Optimization Framework

## 1. Backtest Mode Control

Suggested inputs:

```cpp
input bool EnableBacktestMode = true;
input bool EnableOptimizationMode = false;
input bool EnableVerboseTesterLog = false;
input bool EnableStrategyDebugPrint = false;
```

Functions:

- Output concise information in backtest mode
- Prohibit excessive Print() output in optimization mode
- Preserve normal Logger behavior in live mode
- Avoid Strategy Tester performance degradation caused by excessive output

---

## 2. Optimization Inputs Group

Organize optimizable parameters.

### Money Management

- RiskPercent
- DefaultStopLossPips
- DefaultTakeProfitPips

### BreakEven / Trailing

- BreakEvenPips
- BreakEvenOffsetPips
- TrailingStopPips

### Signal Engine

- FastEMA
- SlowEMA
- RSIPeriod
- RSI Buy / Sell Level
- ATRPeriod
- MinimumATR

### Strategy Score

- BuyThresholdScore
- SellThresholdScore
- EMA Score Weight
- RSI Score Weight
- ATR Score Weight
- Session Score Weight
- Risk Score Weight

### Session Filter

- London Start / End
- New York Start / End

### Risk Controller

- MaxDailyDrawdownPercent
- MaxConsecutiveLosses
- MaxExposurePercent
- MinimumEquityPercent

---

## 3. Parameter Validation

Create parameter-validation functions.

Suggested functions:

```cpp
bool ValidateOptimizationParameters();
bool ValidateMoneyManagementInputs();
bool ValidateSignalInputs();
bool ValidateRiskInputs();
```

Required checks:

- RiskPercent > 0
- SL / TP > 0
- Fast EMA < Slow EMA
- RSI Period > 0
- ATR Period > 0
- Score Threshold is between 0 and 100
- Session time is between 0 and 23
- Max Drawdown > 0
- Volume / Symbol data is valid

If parameters are invalid:

- OnInit() returns INIT_PARAMETERS_INCORRECT
- Print() displays the error reason

---

## 4. Performance Metrics Preparation

Create a performance-statistics framework.

Suggested OOP:

```cpp
class CPerformanceMetrics
```

Suggested functions:

```cpp
void Reset();
void Update();
double CurrentDrawdownPercent();
double FloatingProfit();
int OpenPositionCount();
int ClosedTradeCount();
double WinRate();
double ProfitFactor();
```

At this stage, create the framework and basic statistics first; it does not need to be excessively complex.

---

## 5. Strategy Tester Friendly Design

Ensure that it:

- Does not use DLLs
- Does not depend on external executables
- Does not depend on network APIs
- Does not depend on manual operation
- Does not refresh chart objects excessively
- Does not produce large amounts of Print() output in optimization mode
- Uses documentation and parameter structures suitable for MQL5 Market testing

---

## 6. Walk Forward Preparation

Reserve a structure for Walk Forward Analysis.

Suggested inputs:

```cpp
input int OptimizationWindowMonths = 12;
input int ForwardWindowMonths = 3;
input bool EnableWalkForwardTagging = false;
```

Suggested functions:

```cpp
string GetOptimizationProfileName();
string GetBacktestProfileSummary();
```

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize BacktestOptimizationFramework
2. Execute ValidateOptimizationParameters()
3. If parameters are invalid:
   - Print the error reason
   - return INIT_PARAMETERS_INCORRECT
4. Initialize PerformanceMetrics

---

## OnTick()

The workflow must preserve the existing logic:

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard
7. PerformanceMetrics.Update()

---

## OnTester()

Optional but recommended:

```cpp
double OnTester();
```

Return an optimizable metric, for example:

- Profit Factor
- Net Profit / Drawdown
- Composite Fitness Score

At this stage, create a stable basic OnTester() and avoid complex errors.

---

# Suggested OnTester Fitness Score

Create a simple and stable Fitness Score:

```text
Fitness = NetProfit / MaxDrawdown
```

or:

```text
Fitness = ProfitFactor * RecoveryFactor
```

If data is insufficient or division by zero would occur:

Return 0.0

---

# Commercial-Grade Requirements

Must comply with:

- Official MQL5 syntax
- Official CTrade API
- MQL5 Market requirements
- Strategy Tester compatible
- Optimization compatible
- Forward Test compatible
- VPS compatible

---

# Strict Prohibitions

Prohibited:

- OrderSend()
- DLL
- External executables
- Network APIs
- Pseudocode
- // TODO
- Incomplete functions
- Breaking the Module 0 ~ Module 11 architecture
- Printing the complete source code in the conversation
- Generating code that cannot compile

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module12_BacktestOptimization.mq5
```

Delivery method:

- Provide a downloadable mq5 file
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

This stage must achieve:

- Module 12 Backtest & Optimization Framework completed
- Parameter Validation completed
- Optimization Inputs Group completed
- Strategy Tester Friendly Design completed
- Basic Performance Metrics framework completed
- Basic OnTester Fitness Score framework completed
- Walk Forward Preparation reserved and completed
- 0 Errors
- 0 Warnings

Resulting framework:

```text
Backtest & Optimization Framework v1
```

---

# Next-Stage Preview

After Step 8 is completed, proceed to:

## Step 9: Module 13 MQL5 Market Packaging Framework

Contents:

- Product Metadata
- Input Parameter Documentation
- Release Notes
- User Manual Skeleton
- Version Control
- Market Validator Checklist
- Demo / Full Version Control
