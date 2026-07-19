# Step 2 Prompt: Module 2 MoneyManagement + Module 3 OrderManager

Follow the **Ultimate AI Development Constitution v3.0 Enterprise Edition** and **Master_Prompt.md**.

You are now acting as:

1. Institutional Quant Developer
2. Senior MQL5 Architect
3. MQL5 Market Publisher
4. Quantitative Risk Manager
5. Enterprise Software Engineer

---

## Project Name

**XAUUSD_Quant_Pro_v1**

---

## Completed Status

The following modules have been completed and compiled successfully:

- Module 0: BaseConfig
- Module 1: NewBarDetector

Compilation result:

- 0 Errors
- 0 Warnings

Existing file:

- `XAUUSD_Quant_Pro_v1_Module0_1.mq5`

Continue with the next-stage modules on top of the existing architecture. Do not break the existing Module 0 / Module 1 structure.

---

# Current Task: Step 2

Develop:

## Module 2: MoneyManagement

## Module 3: OrderManager

---

# Module 2: MoneyManagement Requirements

Create a commercial-grade dynamic money and risk management module.

It must include:

1. `CalculateLotSize(double stopLossPips)`
2. Automatically read:
   - `ACCOUNT_EQUITY`
   - `SYMBOL_TRADE_TICK_VALUE`
   - `SYMBOL_TRADE_TICK_SIZE`
   - `SYMBOL_VOLUME_MIN`
   - `SYMBOL_VOLUME_MAX`
   - `SYMBOL_VOLUME_STEP`
3. It must support the digit and point-value differences of XAUUSD gold instruments.
4. It must correctly handle Pip / Point / Tick Size.
5. It must normalize volume correctly.
6. If the calculated volume is below the minimum volume, it must return `0.0`.
7. Broker parameters must not be hard-coded; use `SymbolInfoDouble()` for dynamic queries.
8. Necessary defensive validation must be included.

---

# Module 3: OrderManager Requirements

Create a commercial-grade order management module.

It must include:

1. A market buy function
2. A market sell function
3. SL / TP price calculation
4. MagicNumber management
5. EA Comment
6. `trade.ResultRetcode()` validation
7. `trade.ResultRetcodeDescription()` error output
8. Use only the official `CTrade`
9. Do not use `OrderSend()`

---

## Suggested Function Names

```cpp
double CalculateLotSize(double stopLossPips);
double NormalizeVolumeBySymbol(string symbol, double lots);
bool OpenBuy(double lots, double slPips, double tpPips);
bool OpenSell(double lots, double slPips, double tpPips);
bool ModifyPositionSLTP(ulong ticket, double sl, double tp);
bool HasOpenPosition(string symbol, ulong magic);
```

If the existing architecture already uses classes, preserve the OOP style, for example:

```cpp
class CMoneyManagement
class COrderManager
```

---

# Main-Program Integration Requirements

OnInit():

- Initialize MoneyManagement
- Initialize OrderManager
- Set `trade.SetExpertMagicNumber(MagicNumber)`

OnTick():

- Preserve the Module 1 NewBarDetector logic
- When a new bar forms, call `CalculateLotSize(DefaultStopLossPips)`
- Use `Print()` to output the calculation result
- Actual market entry is not required at this stage unless an explicit test switch is used.
- If a test-trade feature is added, it must be disabled by default: `input bool EnableTestTrade = false;`

---

# Strict Prohibitions

Prohibited:

- Using `OrderSend()`
- Using DLLs
- Using external executables
- Using pseudocode
- Using `// TODO`
- Omitting function bodies
- Printing the complete source code in the conversation
- Breaking the existing Module 0 / Module 1 architecture
- Generating code that cannot compile

---

# Delivery Requirements

Generate a new `.mq5` file directly, for example:

`XAUUSD_Quant_Pro_v1_Module0_3.mq5`

Delivery method:

- Provide a downloadable `.mq5` file directly
- Do not print the complete source code in the conversation
- Ensure:
  - 0 Errors
  - 0 Warnings

---

# Final Acceptance Criteria

This stage must achieve:

- Module 0: BaseConfig completed
- Module 1: NewBarDetector completed
- Module 2: MoneyManagement completed
- Module 3: OrderManager completed
- 0 Errors
- 0 Warnings
