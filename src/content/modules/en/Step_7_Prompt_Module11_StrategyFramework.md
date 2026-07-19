# Step 7 Prompt: Module 11 Strategy Framework

Follow the Ultimate AI Development Constitution v3.0 Enterprise Edition
and Master_Prompt.md.

## Project

XAUUSD_Quant_Pro_v1

## Completed Modules

- Module 0 ~ Module 10 all completed
- Enterprise Trading Framework v5 completed
- 0 Errors
- 0 Warnings

---

# Phase 2: Strategy Validation Layer

## Current Task

### Module 11: Strategy Framework

Create an institutional-grade strategy decision layer.

---

# Entry Logic Framework

Integrate:

- EMA Filter
- RSI Filter
- ATR Filter
- Session Filter
- Risk Filter

Create unified entry logic.

Recommended:

class CEntryLogic

---

# Composite Signal Score

Create a signal-scoring system:

0 ~ 100 points

Recommended:

EMA Trend = 30
RSI = 20
ATR = 20
Session = 15
Risk = 15

Total = 100

---

Suggested functions:

int CalculateBuyScore();
int CalculateSellScore();

bool IsBuySignal();
bool IsSellSignal();

---

# Entry Threshold

input int BuyThresholdScore = 80;
input int SellThresholdScore = 80;

When:

Score >= Threshold

only then allow entry.

---

# Exit Logic Framework

Recommended:

class CExitLogic

Exit conditions:

1. Opposite Signal
2. ATR Weakness
3. Session End
4. RiskController Trigger

Suggested functions:

bool ShouldCloseBuy();
bool ShouldCloseSell();

---

# Trade State Machine

Create:

enum ENUM_XQP_TRADE_STATE

STATE_IDLE
STATE_WAIT_BUY
STATE_WAIT_SELL
STATE_BUY_ACTIVE
STATE_SELL_ACTIVE
STATE_EXIT_PENDING

Recommended:

class CTradeStateMachine

---

# Main-Program Integration

OnTick()

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard

---

# Requirements for This Stage

This stage focuses on:

- Signal scoring
- State machine
- Strategy framework

Allowed:

Print() signal output

Actual order placement is not mandatory.

---

# Commercial-Grade Requirements

- Official MQL5 syntax
- Official CTrade API
- MQL5 Market requirements
- VPS compatible
- Strategy Tester compatible

---

# Strict Prohibitions

- DLL
- External executables
- Pseudocode
- // TODO
- Incomplete functions

---

# Delivery Requirements

Generate directly:

XAUUSD_Quant_Pro_v1_Module11_StrategyFramework.mq5

Delivery method:

- Provide a downloadable mq5 file
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

✓ Module 11 Strategy Framework

✓ Composite Signal Score

✓ Trade State Machine

✓ Entry Logic

✓ Exit Logic

✓ 0 Errors

✓ 0 Warnings

Resulting framework:

Strategy Validation Layer v1
