# Step 11 Prompt：Module 15 QA / Validation / Final Pre-Release Framework

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

Successfully compiled:

- 0 Errors
- 0 Warnings

Current status:

- Enterprise Trading Framework v5 completed
- Strategy Validation Layer v1 completed
- Backtest & Optimization Framework v1 completed
- MQL5 Market Packaging Framework v1 completed
- Product Manual & Release Kit v1 completed

Continue extending the existing architecture without breaking any completed module.

---

# Phase 4：Final Pre-Release Validation Layer

## Current Task

### Module 15：QA / Validation / Final Pre-Release Framework

Build a formal pre-release acceptance framework for quality control, risk checks, backtest validation, optimization validation, Forward Test validation, and the final release gate before publishing to MQL5 Market.

---

# Core Objective

This stage does not add a trading strategy. It establishes a formal pre-release:

- Internal QA Checklist
- Compile Validation
- Strategy Tester Validation
- Optimization Validation
- Forward Test Checklist
- Stress Test Checklist
- Symbol / Broker Compatibility Checklist
- MQL5 Market Validator Readiness
- Final Pre-Release Gate
- Release Approval Status

---

# Module 15：QA / Validation / Final Pre-Release Framework

Recommended: create:

```cpp
class CPreReleaseValidator
```

Or retain naming consistent with the existing OOP architecture.

---

## 1. Internal QA Checklist

Build an internal quality-check framework.

Suggested functions:

```cpp
bool CheckInternalQA();
void PrintInternalQAReport();
string GetInternalQASummary();
```

Checklist items:

- EA name is correct
- Version number is correct
- MagicNumber is valid
- Symbol is valid
- Timeframe is valid
- Input parameters are valid
- RiskPercent is reasonable
- SL / TP values are reasonable
- Session settings are reasonable
- Strategy Score weights are reasonable
- RiskController enablement state is reasonable
- Logger is available
- Dashboard is available

---

## 2. Compile Validation Status

Build a compile-status check summary.

Note:

MQL5 code cannot directly read MetaEditor compilation results, so this module must provide a release-check prompt and status-output framework.

Suggested functions:

```cpp
string GetCompileValidationChecklist();
void PrintCompileValidationReminder();
```

It must remind the operator that:

- MetaEditor must show 0 Errors
- MetaEditor must show 0 Warnings
- No unused-variable warnings may exist
- No implicit-conversion warnings may exist
- No uninitialized-variable risks may exist

---

## 3. Strategy Tester Validation

Build a Strategy Tester validation framework.

Suggested functions:

```cpp
bool CheckStrategyTesterReadiness();
string GetStrategyTesterChecklist();
void PrintStrategyTesterChecklist();
```

Checklist items:

- Starts successfully in Strategy Tester
- OnInit operates normally
- OnTick operates normally
- OnTester operates normally
- Does not depend on manual intervention
- Does not depend on an external network
- Does not depend on external EXE files
- Does not use DLLs
- Does not raise errors when no position exists
- Does not raise errors when no trade history exists
- Dashboard does not impair backtest performance
- Logger does not produce excessive output

---

## 4. Optimization Validation

Build an Optimization validation framework.

Suggested functions:

```cpp
bool CheckOptimizationReadiness();
string GetOptimizationChecklist();
void PrintOptimizationChecklist();
```

Checklist items:

- Optimization executes successfully
- OnTester returns a reasonable value
- No division-by-zero errors
- Parameter ranges are reasonable
- Score Threshold range is reasonable
- EMA / RSI / ATR parameters are reasonable
- Risk parameters are reasonable
- Optimization mode does not issue excessive Print output
- Optimization mode does not depend on Chart Objects

---

## 5. Forward Test Checklist

Build a Forward Test validation framework.

Suggested functions:

```cpp
string GetForwardTestChecklist();
void PrintForwardTestChecklist();
```

Checklist items:

- Demo-account testing
- At least two weeks of Forward Testing
- Testing under different spread conditions
- Testing across different trading sessions
- VPS-environment testing
- Slippage-scenario testing
- Observation during high-volatility news periods
- Recovery testing after broker-server restarts

---

## 6. Stress Test Checklist

Build a stress-test framework.

Suggested functions:

```cpp
string GetStressTestChecklist();
void PrintStressTestChecklist();
```

Test items:

- High Spread
- Low liquidity
- Rapid price gaps
- No quotes
- Symbol unavailable
- Tick Value equals 0
- Tick Size equals 0
- Abnormal Volume Step
- Excessively high minimum lot size
- Insufficient margin
- Multiple-position environment
- Differences between Hedging and Netting accounts

---

## 7. Symbol / Broker Compatibility Checklist

Build a cross-broker compatibility-check framework.

Suggested functions:

```cpp
bool CheckSymbolBrokerCompatibility();
string GetBrokerCompatibilityReport();
void PrintBrokerCompatibilityReport();
```

Checklist items:

- SymbolExist()
- SymbolSelect()
- SYMBOL_DIGITS
- SYMBOL_POINT
- SYMBOL_TRADE_TICK_VALUE
- SYMBOL_TRADE_TICK_SIZE
- SYMBOL_VOLUME_MIN
- SYMBOL_VOLUME_MAX
- SYMBOL_VOLUME_STEP
- SYMBOL_TRADE_CONTRACT_SIZE
- SYMBOL_SPREAD
- ACCOUNT_MARGIN_MODE

Must support:

- Netting
- Hedging
- Exchange-type detection

---

## 8. MQL5 Market Validator Readiness

Build an MQL5 Market Validator readiness framework.

Suggested functions:

```cpp
bool CheckMQL5MarketValidatorReadiness();
string GetMarketValidatorChecklist();
void PrintMarketValidatorChecklist();
```

Checklist items:

- Does not use DLLs
- Does not use external EXE files
- Does not depend on network APIs
- Does not hard-code a specific broker
- Does not hard-code a specific account
- Does not restrict a specific user
- Does not use high-risk external-file dependencies
- Executes in Strategy Tester
- Executes on VPS
- Uses official CTrade
- No OrderSend()
- No TODO items
- No incomplete functions
- No excessive Print output
- No excessive Chart Object load
- Parameters have reasonable defaults

---

## 9. Final Pre-Release Gate

Build the final release gate.

Suggested enum:

```cpp
enum ENUM_XQP_RELEASE_STATUS
{
   XQP_RELEASE_BLOCKED = 0,
   XQP_RELEASE_WARNING = 1,
   XQP_RELEASE_READY = 2
};
```

Suggested class:

```cpp
class CFinalReleaseGate
```

Suggested functions:

```cpp
ENUM_XQP_RELEASE_STATUS EvaluateReleaseStatus();
bool IsReleaseReady();
void PrintFinalReleaseReport();
string GetFinalReleaseSummary();
```

Release Ready conditions:

- Internal QA Pass
- Strategy Tester Ready
- Optimization Ready
- Forward Test Checklist Completed
- Broker Compatibility Pass
- Market Validator Readiness Pass
- Risk Disclaimer Completed
- Product Manual Completed
- Release Notes Completed

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize PreReleaseValidator
2. Run Internal QA
3. Run Broker Compatibility Check
4. Run Market Validator Readiness Check
5. Print the Pre-Release Summary
6. If a fatal error exists:
   - return INIT_PARAMETERS_INCORRECT
7. Preserve the Module 0 through Module 14 initialization flow

---

## OnTick()

Do not add trading logic.

Preserve the existing flow:

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard
7. PerformanceMetrics.Update()

---

## OnDeinit()

Suggested output:

- EA Name
- Version
- Deinit Reason
- Final Release Status
- QA Summary

---

# Commercial-Grade Standards

Must comply with:

- Official MQL5 syntax
- Official CTrade
- MQL5 Market publishing direction
- Strategy Tester compatibility
- Optimization compatibility
- Forward Test compatibility
- VPS compatibility
- Market Validator compatibility direction
- Sustainable long-term version maintenance

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
- Breaking the Module 0 through Module 14 architecture
- Printing the entire source code in the dialog
- Generating code that cannot compile

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module15_PreReleaseValidation.mq5
```

Delivery method:

- Provide downloadable mq5 files
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

After this stage, the following must be achieved:

- Module 15 QA / Validation / Final Pre-Release Framework completed
- Internal QA Checklist completed
- Strategy Tester Validation completed
- Optimization Validation completed
- Forward Test Checklist completed
- Stress Test Checklist completed
- Symbol / Broker Compatibility Checklist completed
- MQL5 Market Validator Readiness completed
- Final Pre-Release Gate completed
- 0 Errors
- 0 Warnings

Resulting in:

```text
Final Pre-Release Validation Framework v1
```

---

# Next-Stage Preview

After Step 11 is completed, the recommended next stage is:

## Step 12：Module 16 Live-Safety / Deployment Guard Framework

Contents:

- Live Trading Safety Switch
- Demo / Real Account Detection
- Spread Guard
- Slippage Guard
- Emergency Stop
- VPS Deployment Checklist
- Live Deployment Readiness Gate

