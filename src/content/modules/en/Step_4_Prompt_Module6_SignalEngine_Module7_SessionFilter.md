# Step 4 Prompt: Module 6 SignalEngine + Module 7 SessionFilter

Follow the Ultimate AI Development Constitution v3.0 Enterprise Edition
and Master_Prompt.md.

You are now acting as:

1. Institutional Quant Developer
2. Senior MQL5 Architect
3. MQL5 Market Publisher
4. Quantitative Risk Manager
5. Enterprise Software Engineer

---

## Project Name

XAUUSD_Quant_Pro_v1

---

## Completed Modules

- Module 0: BaseConfig
- Module 1: NewBarDetector
- Module 2: MoneyManagement
- Module 3: OrderManager
- Module 4: BreakEven
- Module 5: TrailingStop

Successfully compiled with:

- 0 Errors
- 0 Warnings

Continue extending the existing architecture without breaking completed modules.

---

# Current Task

Develop:

## Module 6: SignalEngine

## Module 7: SessionFilter

---

# Module 6: SignalEngine

Create an institutional-grade signal-engine module.

It must include:

## EMA Trend Filter

Recommended:

- Fast EMA
- Slow EMA

Functions:

- Determine trend direction
- Long/short filter

---

## RSI Filter

Functions:

- Determine momentum
- Filter overbought and oversold conditions

---

## ATR Filter

Functions:

- Determine volatility
- Filter low-volatility markets

---

## Multi-Timeframe Filter

Recommended:

- H1
- H4

Functions:

- Trend confirmation
- Signal confirmation

---

## Suggested OOP Architecture

class CSignalEngine

---

## Suggested Functions

bool IsBullTrend();
bool IsBearTrend();

bool PassRSIFilter();

bool PassATRFilter();

bool PassMTFConfirmation();

bool GenerateBuySignal();

bool GenerateSellSignal();

---

# Module 7: SessionFilter

Create a trading-session filter module.

---

## London Session

Support:

- Start time
- End time

---

## New York Session

Support:

- Start time
- End time

---

## Trading Window

Support:

- Custom trading window

---

## Suggested Inputs

input bool EnableLondonSession = true;

input bool EnableNewYorkSession = true;

input int LondonStartHour = 8;
input int LondonEndHour = 17;

input int NewYorkStartHour = 13;
input int NewYorkEndHour = 22;

---

## Suggested OOP Architecture

class CSessionFilter

---

## Suggested Functions

bool IsLondonSession();

bool IsNewYorkSession();

bool IsTradingAllowed();

---

# Main-Program Integration

OnTick()

Preserve the existing:

- NewBarDetector
- MoneyManagement
- OrderManager
- BreakEven
- TrailingStop

---

When a new bar forms:

1. SessionFilter

2. SignalEngine

3. GenerateBuySignal()

4. GenerateSellSignal()

For now, output only:

Print()

Entry signal

Live market entry is not mandatory at this stage.

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

Prohibited:

- OrderSend()
- DLL
- External executables
- Pseudocode
- // TODO
- Incomplete functions

---

# Delivery Requirements

Generate directly:

XAUUSD_Quant_Pro_v1_Module0_7.mq5

Delivery method:

- Provide a downloadable mq5 file
- Do not print the complete source code
- Guarantee:

0 Errors

0 Warnings

---

# Acceptance Criteria for This Stage

✓ Module 0 BaseConfig

✓ Module 1 NewBarDetector

✓ Module 2 MoneyManagement

✓ Module 3 OrderManager

✓ Module 4 BreakEven

✓ Module 5 TrailingStop

✓ Module 6 SignalEngine

✓ Module 7 SessionFilter

✓ 0 Errors

✓ 0 Warnings

Resulting framework:

Trading Framework v3
