# Step 5 Prompt：Module 8 RiskController + Module 9 Logger

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

已成功編譯：

- 0 Errors
- 0 Warnings

請在既有架構基礎上擴充，不得破壞既有模組。

---

# 本次任務

## Module 8：RiskController

### 必須包含

1. Daily Drawdown Protection
2. Consecutive Loss Protection
3. Max Exposure Protection
4. Equity Protection

### 建議 Input

input double MaxDailyDrawdownPercent = 5.0;
input int MaxConsecutiveLosses = 3;
input double MaxExposurePercent = 10.0;
input double MinimumEquityPercent = 70.0;

### 建議 OOP

class CRiskController

### 建議函數

bool CheckDailyDrawdown();
bool CheckConsecutiveLosses();
bool CheckExposure();
bool CheckEquityProtection();
bool IsTradingAllowed();

---

# Daily Drawdown Protection

當日回撤超過限制：

- 停止新交易
- Print() 記錄原因

---

# Consecutive Loss Protection

連續虧損達上限：

- 停止新交易

---

# Max Exposure Protection

總曝險超過限制：

- 禁止新倉

---

# Equity Protection

淨值低於安全門檻：

- 停止交易

---

# Module 9：Logger

建立商業級日誌系統。

### 必須包含

1. Trade Log
2. Error Log
3. Debug Log
4. CSV Export

---

## 建議 OOP

class CLogger

---

## 建議函數

void LogTrade(string message);
void LogError(string message);
void LogDebug(string message);
bool ExportToCSV(string fileName);

---

# CSV 規範

至少包含：

- Time
- Symbol
- Direction
- Lots
- EntryPrice
- SL
- TP
- Profit

---

# 主程式整合

OnTick()

先執行：

RiskController

若允許交易：

SignalEngine

OrderManager

---

所有重要事件：

寫入 Logger

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

- OrderSend()
- DLL
- 外部 exe
- 偽代碼
- // TODO
- 未完成函數

---

# 交付要求

請直接生成：

XAUUSD_Quant_Pro_v1_Module0_9.mq5

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

✓ Module 8 RiskController

✓ Module 9 Logger

✓ 0 Errors

✓ 0 Warnings

形成：

Professional Trading Framework v4
