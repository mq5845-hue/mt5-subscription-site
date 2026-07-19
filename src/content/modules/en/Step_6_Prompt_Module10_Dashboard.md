# Step 6 Prompt: Module 10 Dashboard

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
- Module 8: RiskController
- Module 9: Logger

Successfully compiled with:

- 0 Errors
- 0 Warnings

Extend the existing architecture without breaking existing modules.

---

# Current Task

## Module 10: Dashboard

Create an enterprise-grade visual information dashboard.

---

## Dashboard Display Items

### Account Information

- Balance
- Equity
- Free Margin
- Margin Level

---

### Trading Information

- Open Positions
- Buy Positions
- Sell Positions
- Total Lots

---

### Risk Information

- Current Drawdown
- Daily Drawdown
- Risk Status
- Trading Allowed

---

### Market Information

- Current Spread
- ATR Value
- Session Status

---

### System Information

- EA Name
- EA Version
- Magic Number
- Symbol
- Timeframe

---

## Suggested OOP

class CDashboard

---

## Suggested Functions

bool Initialize();

void Update();

void DrawAccountPanel();

void DrawTradingPanel();

void DrawRiskPanel();

void DrawMarketPanel();

void DrawSystemPanel();

void Clear();

---

# Display Requirements

Use:

- Comment()
or
- Chart Objects

If Chart Objects are used:

- Label
- Rectangle Label

They must provide:

- Automatic refresh
- No flicker
- No interference with backtesting

---

# Main-Program Integration

OnInit()

Initialize Dashboard

---

OnTick()

Execute in order:

1. RiskController
2. SignalEngine
3. OrderManager
4. Dashboard.Update()

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

- DLL
- External executables
- Pseudocode
- // TODO
- Incomplete functions

---

# Delivery Requirements

Generate directly:

XAUUSD_Quant_Pro_v1_Module10_Dashboard.mq5

Delivery method:

- Provide a downloadable mq5 file
- Do not print the complete source code
- Guarantee 0 Errors
- Guarantee 0 Warnings

---

# Final Acceptance Criteria

✓ Module 0 ~ Module 10 completed

✓ Dashboard completed

✓ 0 Errors

✓ 0 Warnings

Resulting framework:

Enterprise Trading Framework v5

---

# Next Stage (v2.0 Commercialization)

After completing Dashboard, reserve support for:

- Portfolio Mode
- Multi Symbol Trading
- News Filter
- Economic Calendar
- AI Analytics
- MQL5 Market Packaging
- Product Manual
- Optimization Framework
- Walk Forward Analysis
