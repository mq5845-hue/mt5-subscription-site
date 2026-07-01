# Step 2 Prompt：Module 2 MoneyManagement + Module 3 OrderManager

請依照 **Ultimate AI Development Constitution v3.0 Enterprise Edition** 與 **Master_Prompt.md**。

你現在是：

1. Institutional Quant Developer
2. Senior MQL5 Architect
3. MQL5 Market Publisher
4. Quantitative Risk Manager
5. Enterprise Software Engineer

---

## 專案名稱

**XAUUSD_Quant_Pro_v1**

---

## 已完成狀態

目前已完成並成功編譯：

- Module 0：BaseConfig
- Module 1：NewBarDetector

編譯結果：

- 0 Errors
- 0 Warnings

目前已有檔案：

- `XAUUSD_Quant_Pro_v1_Module0_1.mq5`

請在既有架構基礎上，繼續擴充下一階段模組，不要破壞既有 Module 0 / Module 1 結構。

---

# 本次任務：Step 2

請開發：

## Module 2：MoneyManagement

## Module 3：OrderManager

---

# Module 2：MoneyManagement 要求

請建立商業級動態資金風控模組。

必須包含：

1. `CalculateLotSize(double stopLossPips)`
2. 自動讀取：
   - `ACCOUNT_EQUITY`
   - `SYMBOL_TRADE_TICK_VALUE`
   - `SYMBOL_TRADE_TICK_SIZE`
   - `SYMBOL_VOLUME_MIN`
   - `SYMBOL_VOLUME_MAX`
   - `SYMBOL_VOLUME_STEP`
3. 必須支援 XAUUSD 黃金商品位數與點值差異。
4. 必須正確處理 Pip / Point / Tick Size。
5. 必須標準化手數。
6. 若計算手數小於最小手數，必須返回 `0.0`。
7. 不可硬編券商參數，必須使用 `SymbolInfoDouble()` 動態查詢。
8. 必須提供必要防呆。

---

# Module 3：OrderManager 要求

請建立商業級訂單管理模組。

必須包含：

1. 市價開多函數
2. 市價開空函數
3. SL / TP 價格計算
4. MagicNumber 管理
5. EA Comment
6. `trade.ResultRetcode()` 驗證
7. `trade.ResultRetcodeDescription()` 錯誤輸出
8. 僅使用官方 `CTrade`
9. 禁止使用 `OrderSend()`

---

## 建議函數命名

```cpp
double CalculateLotSize(double stopLossPips);
double NormalizeVolumeBySymbol(string symbol, double lots);
bool OpenBuy(double lots, double slPips, double tpPips);
bool OpenSell(double lots, double slPips, double tpPips);
bool ModifyPositionSLTP(ulong ticket, double sl, double tp);
bool HasOpenPosition(string symbol, ulong magic);
```

如既有架構已使用 class，請保持 OOP 風格，例如：

```cpp
class CMoneyManagement
class COrderManager
```

---

# 主程式整合要求

OnInit()：

- 初始化 MoneyManagement
- 初始化 OrderManager
- 設定 `trade.SetExpertMagicNumber(MagicNumber)`

OnTick()：

- 保留 Module 1 NewBarDetector 邏輯
- 新 K 線形成時呼叫 `CalculateLotSize(DefaultStopLossPips)`
- 使用 `Print()` 輸出計算結果
- 本階段不需要真正進場交易，除非使用明確測試開關。
- 若加入測試開倉功能，必須預設關閉：`input bool EnableTestTrade = false;`

---

# 嚴格禁止

禁止：

- 使用 `OrderSend()`
- 使用 DLL
- 使用外部 exe
- 使用偽代碼
- 使用 `// TODO`
- 省略函數主體
- 在對話框完整列印全部程式碼
- 破壞既有 Module 0 / Module 1 架構
- 產生無法編譯的程式碼

---

# 交付要求

請直接生成新的 `.mq5` 檔案，例如：

`XAUUSD_Quant_Pro_v1_Module0_3.mq5`

交付方式：

- 直接提供可下載 `.mq5` 檔案
- 不要在對話框完整列印程式碼
- 必須確保：
  - 0 Errors
  - 0 Warnings

---

# 最終驗收標準

本階段完成後應達成：

- Module 0：BaseConfig 完成
- Module 1：NewBarDetector 完成
- Module 2：MoneyManagement 完成
- Module 3：OrderManager 完成
- 0 Errors
- 0 Warnings
