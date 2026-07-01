# Step 3 Prompt：Module 4 BreakEven + Module 5 TrailingStop

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

已成功編譯：

- 0 Errors
- 0 Warnings

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# 本次任務

開發：

## Module 4：BreakEven

## Module 5：TrailingStop

---

# Module 4：BreakEven

建立商業級保本模組。

功能：

1. 自動保本
2. 僅處理本 EA 持倉
3. MagicNumber 過濾
4. Symbol 過濾
5. Buy / Sell 分開處理
6. 防止重複修改
7. 支援 XAUUSD

---

## 建議功能

```cpp
bool ApplyBreakEven();
bool ApplyBreakEvenToPosition(ulong ticket);
```

---

## 保本邏輯

使用：

```cpp
input double BreakEvenPips = 150.0;
```

當獲利超過：

BreakEvenPips

將 Stop Loss 移動至：

- Buy → 開倉價
- Sell → 開倉價

可額外預留：

```cpp
input double BreakEvenOffsetPips = 0.0;
```

方便後續版本升級。

---

# Module 5：TrailingStop

建立商業級移動停利模組。

---

## 功能

1. Buy Trailing Stop
2. Sell Trailing Stop
3. MagicNumber 過濾
4. Symbol 過濾
5. 僅向獲利方向移動
6. 不可降低已保護利潤

---

## 建議功能

```cpp
bool ApplyTrailingStop();
bool ApplyTrailingToPosition(ulong ticket);
```

---

## Trailing 邏輯

使用：

```cpp
input double TrailingStopPips = 100.0;
```

---

Buy：

SL 跟隨 Bid

Sell：

SL 跟隨 Ask

---

必須：

- NormalizeDouble()
- _Digits
- SymbolInfoDouble()

---

# 主程式整合

OnTick():

1. 優先執行：

```cpp
ApplyBreakEven();
```

2. 再執行：

```cpp
ApplyTrailingStop();
```

3. 保留既有：

- NewBarDetector
- MoneyManagement
- OrderManager

---

# OOP 規範

如既有架構已採用 Class：

請建立：

```cpp
class CBreakEvenManager
class CTrailingStopManager
```

保持一致風格。

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

XAUUSD_Quant_Pro_v1_Module0_5.mq5

交付方式：

- 提供可下載 mq5 檔案
- 不要列印完整程式碼
- 保證：

0 Errors

0 Warnings

---

# 本階段驗收標準

完成後：

✓ Module 0 BaseConfig

✓ Module 1 NewBarDetector

✓ Module 2 MoneyManagement

✓ Module 3 OrderManager

✓ Module 4 BreakEven

✓ Module 5 TrailingStop

✓ 0 Errors

✓ 0 Warnings

形成：

Core Trading Framework v2
