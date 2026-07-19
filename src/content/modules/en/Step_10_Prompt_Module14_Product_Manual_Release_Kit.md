# Step 10 Prompt：Module 14 Product Manual & Release Kit

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

Successfully compiled:

- 0 Errors
- 0 Warnings

Current status:

- Enterprise Trading Framework v5 completed
- Strategy Validation Layer v1 completed
- Backtest & Optimization Framework v1 completed
- MQL5 Market Packaging Framework v1 completed

Continue extending the existing architecture without breaking any completed module.

---

# Phase 3：MQL5 Market Commercialization Layer

## Current Task

### Module 14：Product Manual & Release Kit

Build a product manual and release-kit framework for MQL5 Market publishing, product sales, user education, and version releases.

---

# Core Objective

This stage does not add a trading strategy. It establishes the following for EA commercialization:

- Product Manual Skeleton
- Input Parameter Table
- User Guide Structure
- Backtest Report Template
- Release Notes
- Product Description Draft
- MQL5 Market Seller Checklist
- Risk Disclaimer
- Version Release Kit

---

# Module 14：Product Manual & Release Kit

Recommended: create an OOP or static utility class:

```cpp
class CProductManualKit
```

Or retain naming consistent with the existing architecture.

---

## 1. Product Manual Skeleton

Build a product user-manual data-output framework.

Suggested functions:

```cpp
string ManualTitle();
string ManualOverview();
string ManualInstallationGuide();
string ManualQuickStartGuide();
string ManualRecommendedSettings();
string ManualRiskDisclaimer();
```

The content must cover:

- EA product positioning
- Supported instrument: XAUUSD
- Recommended timeframe
- Installation procedure
- Activation procedure
- Parameter configuration
- Risk notice
- Backtest recommendations
- VPS usage recommendations

---

## 2. Input Parameter Table

Build a parameter-documentation framework.

Suggested functions:

```cpp
void PrintInputParameterTable();
string GetInputParameterTableText();
```

Parameter categories:

### General Settings

- TradeSymbol
- TradeTimeframe
- MagicNumber
- DeviationPoints

### Money Management

- RiskPercent
- DefaultStopLossPips
- DefaultTakeProfitPips

### Trade Management

- BreakEvenPips
- BreakEvenOffsetPips
- TrailingStopPips

### Signal Engine

- FastEMA
- SlowEMA
- RSIPeriod
- ATRPeriod
- MinimumATR

### Strategy Framework

- BuyThresholdScore
- SellThresholdScore
- Signal Score Weights

### Session Filter

- EnableLondonSession
- EnableNewYorkSession
- LondonStartHour
- LondonEndHour
- NewYorkStartHour
- NewYorkEndHour

### Risk Controller

- MaxDailyDrawdownPercent
- MaxConsecutiveLosses
- MaxExposurePercent
- MinimumEquityPercent

### Backtest / Optimization

- EnableBacktestMode
- EnableOptimizationMode
- EnableVerboseTesterLog
- EnableWalkForwardTagging

### Market Packaging

- EnableDemoMode
- DemoMaxTradesPerDay
- DemoAllowLiveTrading

---

## 3. Backtest Report Template

Build a backtest-report template framework.

Suggested functions:

```cpp
string GetBacktestReportTemplate();
string GetOptimizationReportTemplate();
string GetForwardTestReportTemplate();
```

The backtest report must include:

- Symbol
- Timeframe
- Date Range
- Modeling Quality
- Initial Deposit
- Net Profit
- Max Drawdown
- Profit Factor
- Recovery Factor
- Total Trades
- Win Rate
- Average Win
- Average Loss
- Notes

---

## 4. MQL5 Product Page Draft

Build a draft-copy framework for the MQL5 Market product page.

Suggested functions:

```cpp
string GetProductShortDescription();
string GetProductFullDescription();
string GetProductFeatures();
string GetProductUseCases();
```

Content direction:

- Dedicated to XAUUSD
- Risk-control first
- Modular quantitative framework
- Strategy Tester support
- VPS support
- Optimization support
- Risk protection
- Commercial-grade architecture

---

## 5. Release Notes Framework

Build a release-record framework.

Suggested functions:

```cpp
string GetReleaseNotes();
string GetVersionHistory();
void PrintReleaseKitSummary();
```

Must include:

- Version
- Build Date
- Completed Modules
- Added Features
- Fixed Issues
- Known Limitations
- Next Planned Release

---

## 6. Seller Checklist

Build an MQL5 Market seller publishing checklist.

Suggested functions:

```cpp
string GetSellerChecklist();
bool CheckReleaseReadiness();
void PrintReleaseReadinessStatus();
```

Checklist items:

- 0 Errors
- 0 Warnings
- Strategy Tester executes successfully
- Optimization executes successfully
- VPS compatible
- Does not use DLLs
- Does not depend on external EXE files
- Does not depend on network APIs
- Does not use OrderSend()
- All trades use CTrade
- Risk Disclaimer completed
- Product Description completed
- Parameter Documentation completed
- Backtest Report ready
- Logo / Banner placeholders ready
- Manual Skeleton completed

---

## 7. Commercial Risk Disclaimer

Build a commercial risk-disclaimer framework.

Suggested functions:

```cpp
string GetCommercialRiskDisclaimer();
```

It must include:

- Trading involves risk
- Backtest results do not represent future performance
- Profit is not guaranteed
- Users should begin with a Demo account
- Users accept responsibility for their own trading risk
- Market volatility, slippage, spread, and liquidity may all affect results

---

## 8. Release Kit Export Preparation

Build the data-output foundation for future release packages.

Suggested functions:

```cpp
string GetReleasePackageSummary();
string GetDeploymentChecklist();
string GetMarketSubmissionChecklist();
```

Reserved output content:

- EA File Name
- Version
- Manual File
- Backtest Report
- Optimization Report
- Product Images
- Release Notes
- Market Description

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize ProductManualKit
2. PrintReleaseKitSummary()
3. PrintReleaseReadinessStatus()
4. Preserve the Module 0 through Module 13 initialization flow

---

## OnTick()

No new trading logic is required.

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
- Release Kit Status

---

# Commercial-Grade Standards

Must comply with:

- Official MQL5 syntax
- Official CTrade
- MQL5 Market publishing direction
- Strategy Tester compatibility
- Optimization compatibility
- VPS compatibility
- Market Validator compatibility direction

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
- Breaking the Module 0 through Module 13 architecture
- Printing the entire source code in the dialog
- Generating code that cannot compile

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module14_ProductManualReleaseKit.mq5
```

Delivery method:

- Provide downloadable mq5 files
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

After this stage, the following must be achieved:

- Module 14 Product Manual & Release Kit completed
- Product Manual Skeleton completed
- Input Parameter Table completed
- Backtest Report Template completed
- MQL5 Product Page Draft completed
- Release Notes Framework completed
- Seller Checklist completed
- Commercial Risk Disclaimer completed
- Release Kit Export Preparation completed
- 0 Errors
- 0 Warnings

Resulting in:

```text
Product Manual & Release Kit v1
```

---

# Next-Stage Preview

After Step 10 is completed, the recommended next stage is:

## Step 11：Module 15 QA / Validation / Final Pre-Release Framework

Contents:

- Internal QA Checklist
- Strategy Tester Validation
- Optimization Validation
- Forward Test Checklist
- Stress Test Checklist
- Symbol / Broker Compatibility Checklist
- Final Pre-Release Gate

