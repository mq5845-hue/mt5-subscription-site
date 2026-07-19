# Step 5 Prompt: Module 8 RiskController + Module 9 Logger

Follow the Ultimate AI Development Constitution v3.0 Enterprise Edition
and Master_Prompt.md.

## Project

XAUUSD_Quant_Pro_v1

## Completed Modules

- Module 0: BaseConfig
- Module 1: NewBarDetector
- Module 2: MoneyManagement
- Module 3: OrderManager
- Module 4: BreakEven
- Module 5: TrailingStop
- Module 6: SignalEngine
- Module 7: SessionFilter

Successfully compiled with:

- 0 Errors
- 0 Warnings

Extend the existing architecture without breaking existing modules.

---

# Current Task

## Module 8: RiskController

### Must Include

1. Daily Drawdown Protection
2. Consecutive Loss Protection
3. Max Exposure Protection
4. Equity Protection

### Suggested Inputs

input double MaxDailyDrawdownPercent = 5.0;
input int MaxConsecutiveLosses = 3;
input double MaxExposurePercent = 10.0;
input double MinimumEquityPercent = 70.0;

### Suggested OOP

class CRiskController

### Suggested Functions

bool CheckDailyDrawdown();
bool CheckConsecutiveLosses();
bool CheckExposure();
bool CheckEquityProtection();
bool IsTradingAllowed();

---

# Daily Drawdown Protection

When daily drawdown exceeds the limit:

- Stop new trades
- Use Print() to record the reason

---

# Consecutive Loss Protection

When consecutive losses reach the limit:

- Stop new trades

---

# Max Exposure Protection

When total exposure exceeds the limit:

- Prohibit new positions

---

# Equity Protection

When equity falls below the safety threshold:

- Stop trading

---

# Module 9: Logger

Create a commercial-grade logging system.

### Must Include

1. Trade Log
2. Error Log
3. Debug Log
4. CSV Export

---

## Suggested OOP

class CLogger

---

## Suggested Functions

void LogTrade(string message);
void LogError(string message);
void LogDebug(string message);
bool ExportToCSV(string fileName);

---

# CSV Requirements

Include at least:

- Time
- Symbol
- Direction
- Lots
- EntryPrice
- SL
- TP
- Profit

---

# Main-Program Integration

OnTick()

Execute first:

RiskController

If trading is allowed:

SignalEngine

OrderManager

---

Write every important event to:

Logger

---

# Commercial-Grade Requirements

Must comply with:

- Official MQL5 syntax
- Official CTrade API
- MQL5 Market requirements
- VPS compatible
- Strategy Tester compatible

---

# Strict Prohibitions

- OrderSend()
- DLL
- External executables
- Pseudocode
- // TODO
- Incomplete functions

---

# Delivery Requirements

Generate directly:

XAUUSD_Quant_Pro_v1_Module0_9.mq5

Delivery method:

- Provide a downloadable mq5 file
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Acceptance Criteria

✓ Module 8 RiskController

✓ Module 9 Logger

✓ 0 Errors

✓ 0 Warnings

Resulting framework:

Professional Trading Framework v4
