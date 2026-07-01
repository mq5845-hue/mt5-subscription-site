# Step 4 Prompt：Module 6 SignalEngine + Module 7 SessionFilter

請依照 Ultimate AI Development Constitution v3.0 Enterprise Edition
以及 Master_Prompt.md。

你現在是：

1. Institutional Quant Developer
2. Senior MQL5 Architect
3. MQL5 Market Publisher
4. Quantitative Risk Manager
5. Enterprise Software Engineer

---

## 專案名稱

XAUUSD_Quant_Pro_v1

---

## 已完成模組

- Module 0：BaseConfig
- Module 1：NewBarDetector
- Module 2：MoneyManagement
- Module 3：OrderManager
- Module 4：BreakEven
- Module 5：TrailingStop

已成功編譯：

- 0 Errors
- 0 Warnings

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# 本次任務

開發：

## Module 6：SignalEngine

## Module 7：SessionFilter

---

# Module 6：SignalEngine

建立法人級訊號引擎模組。

必須包含：

## EMA Trend Filter

建議：

- Fast EMA
- Slow EMA

功能：

- 趨勢方向判斷
- 多空濾網

---

## RSI Filter

功能：

- 動能判斷
- 超買超賣過濾

---

## ATR Filter

功能：

- 波動率判斷
- 過濾低波動市場

---

## Multi-Timeframe Filter

建議：

- H1
- H4

功能：

- 趨勢確認
- 訊號確認

---

## 建議 OOP 架構

class CSignalEngine

---

## 建議函數

bool IsBullTrend();
bool IsBearTrend();

bool PassRSIFilter();

bool PassATRFilter();

bool PassMTFConfirmation();

bool GenerateBuySignal();

bool GenerateSellSignal();

---

# Module 7：SessionFilter

建立交易時段過濾模組。

---

## London Session

支援：

- 開始時間
- 結束時間

---

## New York Session

支援：

- 開始時間
- 結束時間

---

## Trading Window

支援：

- 自訂交易時段

---

## 建議 Input

input bool EnableLondonSession = true;

input bool EnableNewYorkSession = true;

input int LondonStartHour = 8;
input int LondonEndHour = 17;

input int NewYorkStartHour = 13;
input int NewYorkEndHour = 22;

---

## 建議 OOP 架構

class CSessionFilter

---

## 建議函數

bool IsLondonSession();

bool IsNewYorkSession();

bool IsTradingAllowed();

---

# 主程式整合

OnTick()

保留既有：

- NewBarDetector
- MoneyManagement
- OrderManager
- BreakEven
- TrailingStop

---

新 K 棒形成時：

1. SessionFilter

2. SignalEngine

3. GenerateBuySignal()

4. GenerateSellSignal()

目前僅輸出：

Print()

進場訊號

本階段不強制實盤進場。

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

禁止：

- OrderSend()
- DLL
- 外部 exe
- 偽代碼
- // TODO
- 未完成函數

---

# 交付要求

請直接生成：

XAUUSD_Quant_Pro_v1_Module0_7.mq5

交付方式：

- 提供可下載 mq5 檔案
- 不要列印完整程式碼
- 保證：

0 Errors

0 Warnings

---

# 本階段驗收標準

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

形成：

Trading Framework v3
