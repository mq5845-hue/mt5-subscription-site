# Step 3 Prompt: Module 4 BreakEven + Module 5 TrailingStop

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

Successfully compiled with:

- 0 Errors
- 0 Warnings

Continue extending the existing architecture without breaking completed modules.

---

# Current Task

Develop:

## Module 4: BreakEven

## Module 5: TrailingStop

---

# Module 4: BreakEven

Create a commercial-grade break-even module.

Functions:

1. Automatic break-even
2. Process only positions owned by this EA
3. MagicNumber filtering
4. Symbol filtering
5. Handle Buy / Sell positions separately
6. Prevent duplicate modifications
7. Support XAUUSD

---

## Suggested Functions

```cpp
bool ApplyBreakEven();
bool ApplyBreakEvenToPosition(ulong ticket);
```

---

## Break-Even Logic

Use:

```cpp
input double BreakEvenPips = 150.0;
```

When profit exceeds:

BreakEvenPips

Move Stop Loss to:

- Buy → Open price
- Sell → Open price

Optionally reserve:

```cpp
input double BreakEvenOffsetPips = 0.0;
```

to support future version upgrades.

---

# Module 5: TrailingStop

Create a commercial-grade trailing-stop module.

---

## Functions

1. Buy Trailing Stop
2. Sell Trailing Stop
3. MagicNumber filtering
4. Symbol filtering
5. Move only in the profitable direction
6. Never reduce already protected profit

---

## Suggested Functions

```cpp
bool ApplyTrailingStop();
bool ApplyTrailingToPosition(ulong ticket);
```

---

## Trailing Logic

Use:

```cpp
input double TrailingStopPips = 100.0;
```

---

Buy:

SL follows Bid

Sell:

SL follows Ask

---

Required:

- NormalizeDouble()
- _Digits
- SymbolInfoDouble()

---

# Main-Program Integration

OnTick():

1. Execute first:

```cpp
ApplyBreakEven();
```

2. Then execute:

```cpp
ApplyTrailingStop();
```

3. Preserve the existing:

- NewBarDetector
- MoneyManagement
- OrderManager

---

# OOP Requirements

If the existing architecture already uses classes:

Create:

```cpp
class CBreakEvenManager
class CTrailingStopManager
```

Keep a consistent style.

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

XAUUSD_Quant_Pro_v1_Module0_5.mq5

Delivery method:

- Provide a downloadable mq5 file
- Do not print the complete source code
- Guarantee:

0 Errors

0 Warnings

---

# Acceptance Criteria for This Stage

After completion:

✓ Module 0 BaseConfig

✓ Module 1 NewBarDetector

✓ Module 2 MoneyManagement

✓ Module 3 OrderManager

✓ Module 4 BreakEven

✓ Module 5 TrailingStop

✓ 0 Errors

✓ 0 Warnings

Resulting framework:

Core Trading Framework v2
