# Step 9 Prompt：Module 13 MQL5 Market Packaging Framework

請依照 Ultimate AI Development Constitution v3.0 Enterprise Edition
以及 Master_Prompt.md。

---

## 專案

XAUUSD_Quant_Pro_v1

---

## 已完成模組

目前已完成：

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
- Module 10：Dashboard
- Module 11：Strategy Framework
- Module 12：Backtest & Optimization Framework

已成功編譯：

- 0 Errors
- 0 Warnings

目前狀態：

- Enterprise Trading Framework v5 已完成
- Strategy Validation Layer v1 已完成
- Backtest & Optimization Framework v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 3：MQL5 Market Commercialization Layer

## 本次任務

### Module 13：MQL5 Market Packaging Framework

建立專為 MQL5.com Market 上架、商業發行、產品維護與版本管理設計的商品化封裝框架。

---

# 核心目標

本階段不是新增交易策略，而是強化 EA 的：

- MQL5 Market 上架準備
- 產品資訊一致性
- 版本管理
- 使用說明生成基礎
- Input 參數文件化
- Demo / Full 版本預留
- Market Validator 相容性
- 商業發行檢查流程

---

# Module 13：MQL5 Market Packaging Framework

建議 OOP：

```cpp
class CMarketPackagingFramework
```

或依既有架構命名保持一致。

---

## 1. Product Metadata

建立統一產品資訊區塊。

必須包含：

- EA Name
- EA Version
- Product Type
- Symbol
- Supported Timeframe
- Build Mode
- Release Channel
- Copyright
- Product Link
- Description

建議常數或函數：

```cpp
string ProductName();
string ProductVersion();
string ProductDescription();
string ProductReleaseChannel();
string ProductBuildInfo();
```

---

## 2. Version Control

建立版本控制結構。

建議版本規則：

```text
Major.Minor.Patch
```

例如：

```text
1.0.0
1.1.0
1.1.1
2.0.0
```

建議 Input 或常數：

```cpp
#define XQP_VERSION_MAJOR 1
#define XQP_VERSION_MINOR 0
#define XQP_VERSION_PATCH 0
```

建議函數：

```cpp
string GetVersionString();
string GetBuildSignature();
```

---

## 3. Release Notes Skeleton

建立發版紀錄框架。

可使用 Print() 或 Logger 輸出簡要發版資訊。

建議函數：

```cpp
void PrintReleaseNotes();
string GetReleaseSummary();
```

內容需包含：

- Current Version
- Completed Modules
- Build Date
- Market Readiness Status
- Known Limitations
- Next Planned Modules

---

## 4. Input Parameter Documentation

建立 Input 參數文件化框架。

目標：

讓未來產生 PDF Manual / 使用說明時，可以直接整理 EA 參數。

建議函數：

```cpp
void PrintInputParameterGuide();
string GetParameterCategorySummary();
```

參數分類：

### General Settings

- Symbol
- Timeframe
- Magic Number
- Deviation

### Money Management

- RiskPercent
- StopLoss
- TakeProfit

### Trade Management

- BreakEven
- TrailingStop

### Signal Engine

- EMA
- RSI
- ATR
- MTF

### Session Filter

- London
- New York
- Trading Window

### Risk Controller

- Daily Drawdown
- Consecutive Loss
- Max Exposure
- Equity Protection

### Backtest / Optimization

- Backtest Mode
- Optimization Mode
- Tester Log
- Walk Forward Settings

---

## 5. Demo / Full Version Control

預留 Demo / Full 版控制。

建議 Input：

```cpp
input bool EnableDemoMode = false;
input int DemoMaxTradesPerDay = 3;
input bool DemoAllowLiveTrading = false;
```

功能：

- Demo 模式下可限制每日交易次數
- Demo 模式下可限制實盤交易
- Full 模式下正常運作

建議函數：

```cpp
bool IsDemoMode();
bool IsFullVersion();
bool DemoTradingAllowed();
```

注意：

本階段僅建立框架，不必加入複雜授權系統。

---

## 6. Market Validator Checklist

建立 Market Validator 自檢框架。

建議函數：

```cpp
bool CheckMarketCompliance();
void PrintMarketComplianceStatus();
```

檢查項目：

- 不使用 DLL
- 不使用外部 EXE
- 不依賴外部網路 API
- 不需要人工操作
- 支援 Strategy Tester
- 支援 VPS
- 無大量 Print 輸出
- 無硬編券商參數
- Symbol 資料使用 SymbolInfo 查詢
- 所有交易操作使用 CTrade
- 無 OrderSend()
- 無未完成函數
- 無 TODO

---

## 7. Product Manual Skeleton

建立未來使用手冊的資料輸出基礎。

建議函數：

```cpp
string GetManualOverview();
string GetInstallationGuide();
string GetRiskDisclaimer();
string GetRecommendedSettingsSummary();
```

輸出內容可用 Print() 或 Logger 方式提供。

---

## 8. Commercial Risk Disclaimer

必須預留風險聲明文字。

內容方向：

- 交易有風險
- 過去回測不代表未來績效
- 使用者應先在 Demo 帳戶測試
- 不保證獲利
- 使用者需自行承擔交易風險

建議函數：

```cpp
string GetRiskDisclaimerText();
```

---

# 主程式整合

## OnInit()

必須加入：

1. 初始化 MarketPackagingFramework
2. Print Product Metadata
3. Print Version Info
4. CheckMarketCompliance()
5. 若合規檢查失敗，依嚴重程度：
   - Print 警告
   - 或 return INIT_PARAMETERS_INCORRECT
6. 保留既有 Module 0 ~ Module 12 初始化流程

---

## OnTick()

保留既有流程：

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard
7. PerformanceMetrics.Update()

Demo Mode 若啟用：

在下單前檢查：

```cpp
DemoTradingAllowed()
```

---

## OnDeinit()

可選但建議：

輸出簡短 Session Summary：

- EA Name
- Version
- Deinit Reason
- Final Status

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 規範
- Strategy Tester 相容
- Optimization 相容
- Forward Test 相容
- VPS 相容
- Market Validator 相容方向

---

# 嚴格禁止

禁止：

- OrderSend()
- DLL
- 外部 exe
- 網路 API
- 偽代碼
- // TODO
- 未完成函數
- 破壞 Module 0 ~ Module 12 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module13_MarketPackaging.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 13 MQL5 Market Packaging Framework 完成
- Product Metadata 完成
- Version Control 完成
- Release Notes Skeleton 完成
- Input Parameter Documentation 完成
- Demo / Full Version Control 預留完成
- Market Validator Checklist 完成
- Product Manual Skeleton 完成
- Commercial Risk Disclaimer 完成
- 0 Errors
- 0 Warnings

形成：

```text
MQL5 Market Packaging Framework v1
```

---

# 下一階段預告

完成 Step 9 後，下一步建議進入：

## Step 10：Module 14 Product Manual & Release Kit

內容：

- 使用手冊 Markdown
- PDF Manual 結構
- Input Parameter Table
- Backtest Report Template
- Release Notes
- MQL5 Product Page Draft
- Product Description
- Seller Checklist
