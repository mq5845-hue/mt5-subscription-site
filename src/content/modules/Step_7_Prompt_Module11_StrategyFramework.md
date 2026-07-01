# Step 7 Prompt：Module 11 Strategy Framework

請依照 Ultimate AI Development Constitution v3.0 Enterprise Edition
以及 Master_Prompt.md。

## 專案

XAUUSD_Quant_Pro_v1

## 已完成模組

- Module 0 ~ Module 10 全部完成
- Enterprise Trading Framework v5 已完成
- 0 Errors
- 0 Warnings

---

# Phase 2：Strategy Validation Layer

## 本次任務

### Module 11：Strategy Framework

建立法人級策略決策層。

---

# Entry Logic Framework

整合：

- EMA Filter
- RSI Filter
- ATR Filter
- Session Filter
- Risk Filter

建立統一進場邏輯。

建議：

class CEntryLogic

---

# Composite Signal Score

建立訊號評分系統：

0 ~ 100 分

建議：

EMA Trend = 30
RSI = 20
ATR = 20
Session = 15
Risk = 15

Total = 100

---

建議函數：

int CalculateBuyScore();
int CalculateSellScore();

bool IsBuySignal();
bool IsSellSignal();

---

# Entry Threshold

input int BuyThresholdScore = 80;
input int SellThresholdScore = 80;

當：

Score >= Threshold

才允許進場。

---

# Exit Logic Framework

建議：

class CExitLogic

出場條件：

1. Opposite Signal
2. ATR Weakness
3. Session End
4. RiskController Trigger

建議函數：

bool ShouldCloseBuy();
bool ShouldCloseSell();

---

# Trade State Machine

建立：

enum ENUM_XQP_TRADE_STATE

STATE_IDLE
STATE_WAIT_BUY
STATE_WAIT_SELL
STATE_BUY_ACTIVE
STATE_SELL_ACTIVE
STATE_EXIT_PENDING

建議：

class CTradeStateMachine

---

# 主程式整合

OnTick()

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard

---

# 本階段要求

本階段以：

- 訊號評分
- 狀態機
- 策略框架

為主。

允許：

Print() 訊號輸出

不強制實際下單。

---

# 商業級規範

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 規範
- VPS 相容
- Strategy Tester 相容

---

# 嚴格禁止

- DLL
- 外部 exe
- 偽代碼
- // TODO
- 未完成函數

---

# 交付要求

請直接生成：

XAUUSD_Quant_Pro_v1_Module11_StrategyFramework.mq5

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

✓ Module 11 Strategy Framework

✓ Composite Signal Score

✓ Trade State Machine

✓ Entry Logic

✓ Exit Logic

✓ 0 Errors

✓ 0 Warnings

形成：

Strategy Validation Layer v1
