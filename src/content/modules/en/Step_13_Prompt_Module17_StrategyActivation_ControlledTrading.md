# Step 13 Prompt：Module 17 Strategy Activation & Controlled Trading Framework

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

Continue extending the existing architecture without breaking any completed module.

---

# Phase 6：Strategy Activation & Controlled Trading Layer

## Current Task

### Module 17：Strategy Activation & Controlled Trading Framework

Build the formal trade-activation layer that advances the safety-deployment framework into controlled activation of real trading logic.

This module does not add a new indicator strategy. It connects the existing:

- Strategy Framework
- Composite Signal Score
- RiskController
- SessionFilter
- LiveSafetyGuard
- OrderManager

into a safe, controlled, automated, backtestable, and live-deployable trade-activation flow.

---

# Core Objective

Build a commercial-grade Controlled Trading Framework that includes:

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

Recommended: create:

```cpp
class CStrategyActivationController
```

Or retain naming consistent with the existing OOP architecture.

---

## 1. Controlled Auto-Trading Switch

Build a master switch for controlled automated trading.

Suggested inputs:

```cpp
input bool EnableAutoTrading = false;
input bool EnableSignalOnlyMode = true;
input bool EnableDryRunMode = true;
input bool EnableRealOrderExecution = false;
```

Logic:

- Real order placement is disabled by default
- SignalOnlyMode outputs signals without placing orders
- DryRunMode simulates the trade-decision flow without sending orders
- EnableRealOrderExecution must be explicitly enabled before entering the real-order flow
- Real Accounts must still pass Module 16 LiveSafetyGuard

Suggested functions:

```cpp
bool IsAutoTradingEnabled();
bool IsSignalOnlyMode();
bool IsDryRunMode();
bool IsRealOrderExecutionEnabled();
```

---

## 2. Score-Based Entry Activation

Build score-based entry-activation logic.

Sources:

- Module 11 Strategy Framework
- BuyScore
- SellScore
- BuyThresholdScore
- SellThresholdScore

Suggested functions:

```cpp
bool BuyActivationSignal();
bool SellActivationSignal();
int GetCurrentBuyScore();
int GetCurrentSellScore();
string GetSignalDecisionText();
```

Logic:

- BuyScore >= BuyThresholdScore → BuyActivationSignal = true
- SellScore >= SellThresholdScore → SellActivationSignal = true
- When Buy and Sell appear simultaneously, resolve the conflict by:
  - Selecting the higher score
  - Ignoring both
  - Or following the configured option

Suggested inputs:

```cpp
input bool IgnoreConflictingSignals = true;
input int MinimumScoreDifference = 10;
```

---

## 3. Real Order Execution Gate

Build the final gate before real order placement.

Suggested functions:

```cpp
bool CanExecuteRealBuy();
bool CanExecuteRealSell();
bool CanExecuteAnyRealOrder();
string GetExecutionGateStatus();
```

CanExecuteRealBuy / Sell must confirm all of the following:

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

Build position-mode control.

Suggested inputs:

```cpp
input bool AllowMultiplePositions = false;
input int MaxPositionsPerSymbol = 1;
input int MaxBuyPositions = 1;
input int MaxSellPositions = 1;
```

Suggested functions:

```cpp
int CountManagedPositions();
int CountManagedBuyPositions();
int CountManagedSellPositions();
bool CanOpenAdditionalBuy();
bool CanOpenAdditionalSell();
```

Logic:

- By default, allow only one position from this EA per symbol
- Count only matching Symbol + MagicNumber
- Do not affect other EAs or manual trades

---

## 5. Safe Entry Throttling

Build a safe entry-throttling mechanism.

Suggested inputs:

```cpp
input int MaxTradesPerDay = 5;
input int MaxTradesPerHour = 2;
input int MinimumBarsBetweenTrades = 3;
```

Suggested functions:

```cpp
bool CheckDailyTradeLimit();
bool CheckHourlyTradeLimit();
bool CheckMinimumBarsBetweenTrades();
bool EntryThrottlePassed();
```

Logic:

- Limit overtrading
- Limit repeated entries within the same session
- Limit excessive entries across consecutive bars
- Allow different parameters to be tested in optimization mode

---

## 6. Cooldown Control

Build cooldown control.

Suggested inputs:

```cpp
input int CooldownMinutesAfterTrade = 60;
input int CooldownMinutesAfterLoss = 180;
input bool EnableLossCooldown = true;
```

Suggested functions:

```cpp
bool IsCooldownActive();
bool IsLossCooldownActive();
datetime LastTradeTime();
datetime LastLossTime();
string GetCooldownStatus();
```

Logic:

- Enter cooldown after a new trade
- Optionally enter a longer cooldown after a loss
- Block new positions during cooldown
- Continue managing existing positions during cooldown

---

## 7. First Live Simulation Mode

Build the initial live simulation mode.

Suggested inputs:

```cpp
input bool EnableFirstLiveSimulationMode = true;
input int SimulationSignalsRequired = 10;
input bool AutoDisableSimulationAfterPass = false;
```

Functions:

- Do not immediately place real orders on a Real Account
- First observe a configured number of valid signals
- Logger records each executable signal blocked by simulation mode
- Suitable for first deployment and MQL5 Market user protection

Suggested functions:

```cpp
bool IsFirstLiveSimulationActive();
void RecordSimulationSignal();
bool SimulationRequirementPassed();
string GetSimulationStatus();
```

---

## 8. Trade Intent Logging

Build trade-intent logging.

Suggested functions:

```cpp
void LogTradeIntent(string direction, int score, string reason);
void LogBlockedTrade(string direction, string blockReason);
void LogExecutedTrade(string direction, double lots, double slPips, double tpPips);
```

Recorded content:

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

This function must integrate with Module 9 Logger.

---

## 9. Controlled Execution Readiness Gate

Build the final controlled-trading activation gate.

Suggested enum:

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

Suggested class:

```cpp
class CControlledExecutionGate
```

Suggested functions:

```cpp
ENUM_XQP_EXECUTION_STATUS EvaluateExecutionStatus();
bool IsControlledExecutionReady();
void PrintExecutionReadinessReport();
string GetExecutionSummary();
```

Execution Ready conditions:

- AutoTrading Enabled
- RealOrderExecution Enabled
- SignalOnlyMode Off
- DryRunMode Off
- FirstLiveSimulation Passed or Off
- LiveSafetyGate Ready
- RiskController Pass
- SessionFilter Pass
- Position Mode Pass
- Throttle Pass
- Cooldown Pass
- Valid Strategy Signal

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize StrategyActivationController
2. Initialize ControlledExecutionGate
3. Check AutoTrading / SignalOnly / DryRun / RealExecution states
4. Output the Controlled Trading Summary
5. Preserve the Module 0 through Module 16 initialization flow

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
9. StrategyActivationController determines Buy / Sell Activation
10. EntryThrottlePassed()
11. CooldownPassed()
12. ControlledExecutionGate Evaluate
13. If SignalOnlyMode:
    - Print / Logger the signal
    - Do not place an order
14. If DryRunMode:
    - Simulate the order-placement flow
    - Do not place an order
15. If FirstLiveSimulationMode:
    - Record executable signals
    - Do not place an order
16. If Execution Ready:
    - Call OrderManager to open a position
17. Dashboard.Update()
18. PerformanceMetrics.Update()

---

## OnDeinit()

Suggested output:

- EA Name
- Version
- Deinit Reason
- Execution Mode
- Simulation Signal Count
- Last Trade Intent
- Final Controlled Execution Status

---

# Commercial-Grade Standards

Must comply with:

- Official MQL5 syntax
- Official CTrade
- MQL5 Market publishing direction
- Strategy Tester compatibility
- Optimization compatibility
- VPS compatibility
- Live-deployment safety
- Does not interfere with positions from other EAs or manual trades
- Safe by default; does not enable live auto-trading automatically
- Every real trade must pass multiple gates

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
- Breaking the Module 0 through Module 16 architecture
- Printing the entire source code in the dialog
- Generating code that cannot compile
- Placing real orders in SignalOnlyMode or DryRunMode
- Placing real orders before passing LiveSafetyGuard
- Opening a new position while EmergencyStop is active
- Allowing Real Account auto-trading without a confirmation mechanism

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module17_StrategyActivationControlledTrading.mq5
```

Delivery method:

- Provide downloadable mq5 files
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

After this stage, the following must be achieved:

- Module 17 Strategy Activation & Controlled Trading Framework completed
- Controlled Auto-Trading Switch completed
- Score-Based Entry Activation completed
- Real Order Execution Gate completed
- One-Position / Multi-Position Mode completed
- Safe Entry Throttling completed
- Cooldown Control completed
- First Live Simulation Mode completed
- Trade Intent Logging completed
- Controlled Execution Readiness Gate completed
- 0 Errors
- 0 Warnings

Resulting in:

```text
Strategy Activation & Controlled Trading Framework v1
```

---

# Next-Stage Preview

After Step 13 is completed, the recommended next stage is:

## Step 14：Module 18 Strategy Performance Analytics Framework

Contents:

- Real-Time Strategy Analytics
- Signal Quality Tracking
- Score Distribution Analysis
- Trade Outcome Attribution
- Entry / Exit Reason Tracking
- Strategy Health Status
- Performance Degradation Warning

