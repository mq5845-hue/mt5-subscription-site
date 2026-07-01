# Step 6 Prompt：Module 10 Dashboard

請依照 Ultimate AI Development Constitution v3.0 Enterprise Edition
以及 Master_Prompt.md。

## 專案

XAUUSD_Quant_Pro_v1

## 已完成模組

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

已成功編譯：

- 0 Errors
- 0 Warnings

請在既有架構基礎上擴充，不得破壞既有模組。

---

# 本次任務

## Module 10：Dashboard

建立企業級可視化資訊面板。

---

## Dashboard 顯示項目

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

## 建議 OOP

class CDashboard

---

## 建議函數

bool Initialize();

void Update();

void DrawAccountPanel();

void DrawTradingPanel();

void DrawRiskPanel();

void DrawMarketPanel();

void DrawSystemPanel();

void Clear();

---

# 顯示規範

使用：

- Comment()
或
- Chart Objects

若使用 Chart Objects：

- Label
- Rectangle Label

必須具備：

- 自動刷新
- 不閃爍
- 不影響回測

---

# 主程式整合

OnInit()

初始化 Dashboard

---

OnTick()

依序執行：

1. RiskController
2. SignalEngine
3. OrderManager
4. Dashboard.Update()

---

# 商業級規範

必須符合：

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

XAUUSD_Quant_Pro_v1_Module10_Dashboard.mq5

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 最終驗收標準

✓ Module 0 ~ Module 10 完成

✓ Dashboard 完成

✓ 0 Errors

✓ 0 Warnings

形成：

Enterprise Trading Framework v5

---

# 下一階段（v2.0 商業化）

完成 Dashboard 後，預留後續：

- Portfolio Mode
- Multi Symbol Trading
- News Filter
- Economic Calendar
- AI Analytics
- MQL5 Market Packaging
- Product Manual
- Optimization Framework
- Walk Forward Analysis
