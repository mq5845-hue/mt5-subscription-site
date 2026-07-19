# Step 12 Prompt：Module 16 Live-Safety / Deployment Guard Framework

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

Continue extending the existing architecture without breaking any completed module.

---

# Phase 5：Live-Safety / Deployment Guard Layer

## Current Task

### Module 16：Live-Safety / Deployment Guard Framework

Build the critical safety layer that moves the product from “release-ready” to “safe for live deployment.”

This module does not add a trading strategy. It establishes safety defenses before EA deployment across Demo / Real / VPS / different broker environments.

---

# Core Objective

Build a commercial-grade Live Deployment Guard that includes:

- Live Trading Safety Switch
- Demo / Real Account Detection
- Spread Guard
- Slippage Guard
- Emergency Stop
- Broker Execution Guard
- VPS Deployment Checklist
- Trading Permission Guard
- Live Deployment Readiness Gate

---

# Module 16：Live-Safety / Deployment Guard Framework

Recommended: create:

```cpp
class CLiveSafetyGuard
```

Or retain naming consistent with the existing OOP architecture.

---

## 1. Live Trading Safety Switch

Build a live-trading safety switch.

Suggested inputs:

```cpp
input bool EnableLiveTrading = false;
input bool EnableDemoTrading = true;
input bool RequireManualLiveConfirmation = true;
input string LiveConfirmationText = "I_ACCEPT_LIVE_RISK";
input string UserLiveConfirmation = "";
```

Logic:

- Live trading is disabled by default
- Demo accounts may be allowed for testing
- Real accounts must satisfy all of the following:
  - EnableLiveTrading = true
  - When RequireManualLiveConfirmation = true, UserLiveConfirmation must equal LiveConfirmationText
  - All Live Safety Checks pass

Suggested functions:

```cpp
bool IsLiveTradingEnabled();
bool IsLiveConfirmationValid();
bool TradingPermissionGranted();
```

---

## 2. Demo / Real Account Detection

Build account-type checks.

Suggested functions:

```cpp
bool IsDemoAccount();
bool IsRealAccount();
string GetAccountTradeModeText();
```

Use:

```cpp
AccountInfoInteger(ACCOUNT_TRADE_MODE)
```

Check:

- ACCOUNT_TRADE_MODE_DEMO
- ACCOUNT_TRADE_MODE_REAL
- ACCOUNT_TRADE_MODE_CONTEST

Behavior:

- Demo: allow testing
- Real: must pass the Live Safety Gate
- Contest: handle according to risk settings

---

## 3. Spread Guard

Build spread protection.

Suggested inputs:

```cpp
input bool EnableSpreadGuard = true;
input double MaxAllowedSpreadPips = 35.0;
```

Suggested functions:

```cpp
double CurrentSpreadPips();
bool IsSpreadAcceptable();
string GetSpreadGuardStatus();
```

Logic:

- If the spread exceeds MaxAllowedSpreadPips:
  - Block new positions
  - Do not force positions to close
  - Show risk status in Logger / Dashboard

XAUUSD must be supported. Do not hard-code pip values; convert with SymbolInfoDouble / Digits / Point.

---

## 4. Slippage Guard

Build slippage protection.

Suggested inputs:

```cpp
input bool EnableSlippageGuard = true;
input uint MaxSlippagePoints = 50;
```

Integrate:

```cpp
trade.SetDeviationInPoints(MaxSlippagePoints);
```

Suggested functions:

```cpp
bool ConfigureSlippageGuard();
uint GetMaxSlippagePoints();
string GetSlippageGuardStatus();
```

---

## 5. Emergency Stop

Build an emergency-stop mechanism.

Suggested inputs:

```cpp
input bool EmergencyStop = false;
input bool EmergencyClosePositions = false;
```

Suggested functions:

```cpp
bool IsEmergencyStopActive();
bool HandleEmergencyStop();
bool CloseAllManagedPositions();
```

Logic:

- EmergencyStop = true：
  - Immediately block new trades
  - Optionally close positions managed by this EA
- Process only:
  - The specified Symbol
  - The specified MagicNumber
- Must not affect positions from other EAs or manual trades

---

## 6. Broker Execution Guard

Build broker trading-condition checks.

Suggested functions:

```cpp
bool CheckBrokerExecutionConditions();
bool IsTradeAllowedByTerminal();
bool IsTradeAllowedByAccount();
bool IsSymbolTradable();
bool IsMarketOpenForSymbol();
string GetBrokerExecutionReport();
```

Must check:

- TerminalInfoInteger(TERMINAL_TRADE_ALLOWED)
- AccountInfoInteger(ACCOUNT_TRADE_ALLOWED)
- SymbolInfoInteger(symbol, SYMBOL_TRADE_MODE)
- SymbolInfoInteger(symbol, SYMBOL_SELECT)
- SymbolInfoDouble(symbol, SYMBOL_ASK)
- SymbolInfoDouble(symbol, SYMBOL_BID)
- Whether Spread is reasonable
- Whether Tick Value is valid
- Whether Tick Size is valid
- Whether Volume Min / Max / Step values are valid

---

## 7. VPS Deployment Checklist

Build a VPS-deployment check framework.

Suggested functions:

```cpp
string GetVPSDeploymentChecklist();
void PrintVPSDeploymentChecklist();
bool CheckVPSFriendlySettings();
```

Checklist items:

- Does not depend on external DLLs
- Does not depend on external EXE files
- Does not depend on manual clicks
- Does not depend on local paths
- Does not depend on network APIs
- Logger does not write excessive data
- Dashboard does not impose a performance burden
- Optimization mode does not issue excessive output
- EA recovers normally after a VPS restart

---

## 8. Trading Permission Guard

Build the final trading-permission gate.

Suggested functions:

```cpp
bool CanOpenNewTrade();
bool CanManageExistingPositions();
string GetTradingPermissionStatus();
void PrintTradingPermissionReport();
```

CanOpenNewTrade() must confirm all of the following:

- EmergencyStop = false
- Account Trade Allowed
- Terminal Trade Allowed
- Symbol Tradable
- Spread Acceptable
- Slippage Guard Configured
- RiskController permits trading
- SessionFilter permits trading
- Demo / Live permission passes
- Market Validator / PreRelease status passes

CanManageExistingPositions() must continue permitting management of open positions under selected risk states, for example:

- BreakEven
- TrailingStop
- Emergency Close
- Risk Reduction

---

## 9. Live Deployment Readiness Gate

Build the final pre-deployment gate.

Suggested enum:

```cpp
enum ENUM_XQP_LIVE_DEPLOYMENT_STATUS
{
   XQP_LIVE_BLOCKED = 0,
   XQP_LIVE_DEMO_ONLY = 1,
   XQP_LIVE_READY = 2
};
```

Suggested class:

```cpp
class CLiveDeploymentGate
```

Suggested functions:

```cpp
ENUM_XQP_LIVE_DEPLOYMENT_STATUS EvaluateLiveDeploymentStatus();
bool IsLiveDeploymentReady();
bool IsDemoOnlyMode();
void PrintLiveDeploymentReport();
string GetLiveDeploymentSummary();
```

Live Ready conditions:

- PreRelease Validation Ready
- Broker Execution Conditions Pass
- Spread Guard Pass
- Slippage Guard Configured
- EmergencyStop Off
- Real Account Confirmation Valid
- RiskController Pass
- Trading Permission Granted
- VPS Checklist Pass

---

# Main-Program Integration

## OnInit()

Add:

1. Initialize LiveSafetyGuard
2. Set trade.SetDeviationInPoints(MaxSlippagePoints)
3. Check Demo / Real Account
4. Check Broker Execution Conditions
5. Check VPS-Friendly Settings
6. Output the Live Deployment Summary
7. If a fatal error exists:
   - return INIT_PARAMETERS_INCORRECT
8. Preserve the Module 0 through Module 15 initialization flow

---

## OnTick()

Adjust the flow to:

1. EmergencyStop Check
2. LiveSafetyGuard.CanManageExistingPositions()
3. BreakEven / TrailingStop manage existing positions
4. LiveSafetyGuard.CanOpenNewTrade()
5. RiskController
6. SessionFilter
7. SignalEngine
8. StrategyFramework
9. OrderManager
10. Dashboard
11. PerformanceMetrics.Update()

If CanOpenNewTrade() is false:

- Block new positions
- Continue allowing position management

---

## OnDeinit()

Suggested output:

- EA Name
- Version
- Deinit Reason
- Final Live Deployment Status
- Emergency Stop Status
- Trading Permission Summary

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
- Breaking the Module 0 through Module 15 architecture
- Printing the entire source code in the dialog
- Generating code that cannot compile
- Closing non-EA positions by mistake during an emergency stop
- Allowing Real Account live trading without a confirmation mechanism

---

# Delivery Requirements

Generate directly:

```text
XAUUSD_Quant_Pro_v1_Module16_LiveSafetyDeploymentGuard.mq5
```

Delivery method:

- Provide downloadable mq5 files
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

After this stage, the following must be achieved:

- Module 16 Live-Safety / Deployment Guard Framework completed
- Live Trading Safety Switch completed
- Demo / Real Account Detection completed
- Spread Guard completed
- Slippage Guard completed
- Emergency Stop completed
- Broker Execution Guard completed
- VPS Deployment Checklist completed
- Trading Permission Guard completed
- Live Deployment Readiness Gate completed
- 0 Errors
- 0 Warnings

Resulting in:

```text
Live-Safety / Deployment Guard Framework v1
```

---

# Next-Stage Preview

After Step 12 is completed, the recommended next stage is:

## Step 13：Module 17 Strategy Activation & Controlled Trading Framework

Contents:

- Controlled Auto-Trading Switch
- Score-Based Entry Activation
- Real Order Execution Gate
- One-Position / Multi-Position Mode
- Safe Entry Throttling
- Cooldown Control
- First Live Simulation Mode

