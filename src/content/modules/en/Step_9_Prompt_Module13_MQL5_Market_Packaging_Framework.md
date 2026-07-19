# Step 9 Prompt: Module 13 MQL5 Market Packaging Framework

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
- Module 12: Backtest & Optimization Framework

Successfully compiled with:

- 0 Errors
- 0 Warnings

Current status:

- Enterprise Trading Framework v5 completed
- Strategy Validation Layer v1 completed
- Backtest & Optimization Framework v1 completed

Continue extending the existing architecture without breaking completed modules.

---

# Phase 3: MQL5 Market Commercialization Layer

## Current Task

### Module 13: MQL5 Market Packaging Framework

Create a commercialization and packaging framework designed for MQL5.com Market listing, commercial distribution, product maintenance, and version management.

---

# Core Objectives

This stage does not add a new trading strategy. Instead, it strengthens the EA's:

- Preparation for MQL5 Market listing
- Product-information consistency
- Version management
- Foundation for generating user instructions
- Input parameter documentation
- Reserved Demo / Full version controls
- Market Validator compatibility
- Commercial-release inspection workflow

---

# Module 13: MQL5 Market Packaging Framework

Suggested OOP:

```cpp
class CMarketPackagingFramework
```

or use naming consistent with the existing architecture.

---

## 1. Product Metadata

Create a unified product-information block.

It must include:

- EA Name
- EA Version
- Product Type
- Symbol
- Supported Timeframe
- Build Mode
- Release Channel
- Copyright
- Product Link
- Description

Suggested constants or functions:

```cpp
string ProductName();
string ProductVersion();
string ProductDescription();
string ProductReleaseChannel();
string ProductBuildInfo();
```

---

## 2. Version Control

Create a version-control structure.

Suggested versioning rule:

```text
Major.Minor.Patch
```

For example:

```text
1.0.0
1.1.0
1.1.1
2.0.0
```

Suggested inputs or constants:

```cpp
#define XQP_VERSION_MAJOR 1
#define XQP_VERSION_MINOR 0
#define XQP_VERSION_PATCH 0
```

Suggested functions:

```cpp
string GetVersionString();
string GetBuildSignature();
```

---

## 3. Release Notes Skeleton

Create a release-history framework.

Use Print() or Logger to output concise release information.

Suggested functions:

```cpp
void PrintReleaseNotes();
string GetReleaseSummary();
```

The contents must include:

- Current Version
- Completed Modules
- Build Date
- Market Readiness Status
- Known Limitations
- Next Planned Modules

---

## 4. Input Parameter Documentation

Create an Input parameter documentation framework.

Objective:

Allow EA parameters to be organized directly when generating a future PDF Manual / user guide.

Suggested functions:

```cpp
void PrintInputParameterGuide();
string GetParameterCategorySummary();
```

Parameter categories:

### General Settings

- Symbol
- Timeframe
- Magic Number
- Deviation

### Money Management

- RiskPercent
- StopLoss
- TakeProfit

### Trade Management

- BreakEven
- TrailingStop

### Signal Engine

- EMA
- RSI
- ATR
- MTF

### Session Filter

- London
- New York
- Trading Window

### Risk Controller

- Daily Drawdown
- Consecutive Loss
- Max Exposure
- Equity Protection

### Backtest / Optimization

- Backtest Mode
- Optimization Mode
- Tester Log
- Walk Forward Settings

---

## 5. Demo / Full Version Control

Reserve Demo / Full version controls.

Suggested inputs:

```cpp
input bool EnableDemoMode = false;
input int DemoMaxTradesPerDay = 3;
input bool DemoAllowLiveTrading = false;
```

Functions:

- Limit daily trade count in Demo mode
- Restrict live trading in Demo mode
- Operate normally in Full mode

Suggested functions:

```cpp
bool IsDemoMode();
bool IsFullVersion();
bool DemoTradingAllowed();
```

Note:

At this stage, create only the framework; do not add a complex licensing system.

---

## 6. Market Validator Checklist

Create a Market Validator self-check framework.

Suggested functions:

```cpp
bool CheckMarketCompliance();
void PrintMarketComplianceStatus();
```

Checklist:

- Does not use DLLs
- Does not use external executables
- Does not depend on external network APIs
- Does not require manual operation
- Supports Strategy Tester
- Supports VPS operation
- No excessive Print output
- No hard-coded broker parameters
- Uses SymbolInfo queries for Symbol data
- Uses CTrade for all trading operations
- No OrderSend()
- No incomplete functions
- No TODO markers

---

## 7. Product Manual Skeleton

Create the data-output foundation for a future user manual.

Suggested functions:

```cpp
string GetManualOverview();
string GetInstallationGuide();
string GetRiskDisclaimer();
string GetRecommendedSettingsSummary();
```

Output can be provided through Print() or Logger.

---

## 8. Commercial Risk Disclaimer

Reserve risk-disclaimer text.

Content direction:

- Trading involves risk
- Past backtest results do not represent future performance
- Users should test on a Demo account first
- Profit is not guaranteed
- Users must assume their own trading risk

Suggested function:

```cpp
string GetRiskDisclaimerText();
```

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize MarketPackagingFramework
2. Print Product Metadata
3. Print Version Info
4. CheckMarketCompliance()
5. If the compliance check fails, according to severity:
   - Print a warning
   - or return INIT_PARAMETERS_INCORRECT
6. Preserve the existing Module 0 ~ Module 12 initialization workflow

---

## OnTick()

Preserve the existing workflow:

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard
7. PerformanceMetrics.Update()

If Demo Mode is enabled:

Before placing an order, check:

```cpp
DemoTradingAllowed()
```

---

## OnDeinit()

Optional but recommended:

Output a concise Session Summary:

- EA Name
- Version
- Deinit Reason
- Final Status

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
- Designed for Market Validator compatibility

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
- Breaking the Module 0 ~ Module 12 architecture
- Printing the complete source code in the conversation
- Generating code that cannot compile

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module13_MarketPackaging.mq5
```

Delivery method:

- Provide a downloadable mq5 file
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

This stage must achieve:

- Module 13 MQL5 Market Packaging Framework completed
- Product Metadata completed
- Version Control completed
- Release Notes Skeleton completed
- Input Parameter Documentation completed
- Demo / Full Version Control reserved and completed
- Market Validator Checklist completed
- Product Manual Skeleton completed
- Commercial Risk Disclaimer completed
- 0 Errors
- 0 Warnings

Resulting framework:

```text
MQL5 Market Packaging Framework v1
```

---

# Next-Stage Preview

After Step 9 is completed, proceed to:

## Step 10: Module 14 Product Manual & Release Kit

Contents:

- User Manual Markdown
- PDF Manual Structure
- Input Parameter Table
- Backtest Report Template
- Release Notes
- MQL5 Product Page Draft
- Product Description
- Seller Checklist
