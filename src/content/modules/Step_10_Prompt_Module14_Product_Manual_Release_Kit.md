# Step 10 Prompt：Module 14 Product Manual & Release Kit

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
- Module 13：MQL5 Market Packaging Framework

已成功編譯：

- 0 Errors
- 0 Warnings

目前狀態：

- Enterprise Trading Framework v5 已完成
- Strategy Validation Layer v1 已完成
- Backtest & Optimization Framework v1 已完成
- MQL5 Market Packaging Framework v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 3：MQL5 Market Commercialization Layer

## 本次任務

### Module 14：Product Manual & Release Kit

建立用於 MQL5 Market 上架、產品銷售、使用者教育與版本發行的產品手冊與發版套件框架。

---

# 核心目標

本階段不是新增交易策略，而是為 EA 商品化建立：

- Product Manual Skeleton
- Input Parameter Table
- User Guide Structure
- Backtest Report Template
- Release Notes
- Product Description Draft
- MQL5 Market Seller Checklist
- Risk Disclaimer
- Version Release Kit

---

# Module 14：Product Manual & Release Kit

建議建立 OOP 或靜態工具類別：

```cpp
class CProductManualKit
```

或依既有架構保持一致命名。

---

## 1. Product Manual Skeleton

建立產品使用手冊資料輸出框架。

建議函數：

```cpp
string ManualTitle();
string ManualOverview();
string ManualInstallationGuide();
string ManualQuickStartGuide();
string ManualRecommendedSettings();
string ManualRiskDisclaimer();
```

內容需涵蓋：

- EA 產品定位
- 適用商品：XAUUSD
- 建議週期
- 安裝方式
- 啟用方式
- 參數設定
- 風險提醒
- 回測建議
- VPS 使用建議

---

## 2. Input Parameter Table

建立參數文件化框架。

建議函數：

```cpp
void PrintInputParameterTable();
string GetInputParameterTableText();
```

參數分類：

### General Settings

- TradeSymbol
- TradeTimeframe
- MagicNumber
- DeviationPoints

### Money Management

- RiskPercent
- DefaultStopLossPips
- DefaultTakeProfitPips

### Trade Management

- BreakEvenPips
- BreakEvenOffsetPips
- TrailingStopPips

### Signal Engine

- FastEMA
- SlowEMA
- RSIPeriod
- ATRPeriod
- MinimumATR

### Strategy Framework

- BuyThresholdScore
- SellThresholdScore
- Signal Score Weights

### Session Filter

- EnableLondonSession
- EnableNewYorkSession
- LondonStartHour
- LondonEndHour
- NewYorkStartHour
- NewYorkEndHour

### Risk Controller

- MaxDailyDrawdownPercent
- MaxConsecutiveLosses
- MaxExposurePercent
- MinimumEquityPercent

### Backtest / Optimization

- EnableBacktestMode
- EnableOptimizationMode
- EnableVerboseTesterLog
- EnableWalkForwardTagging

### Market Packaging

- EnableDemoMode
- DemoMaxTradesPerDay
- DemoAllowLiveTrading

---

## 3. Backtest Report Template

建立回測報告模板框架。

建議函數：

```cpp
string GetBacktestReportTemplate();
string GetOptimizationReportTemplate();
string GetForwardTestReportTemplate();
```

回測報告應包含：

- Symbol
- Timeframe
- Date Range
- Modeling Quality
- Initial Deposit
- Net Profit
- Max Drawdown
- Profit Factor
- Recovery Factor
- Total Trades
- Win Rate
- Average Win
- Average Loss
- Notes

---

## 4. MQL5 Product Page Draft

建立 MQL5 Market 商品頁文字草稿框架。

建議函數：

```cpp
string GetProductShortDescription();
string GetProductFullDescription();
string GetProductFeatures();
string GetProductUseCases();
```

內容方向：

- XAUUSD 專用
- 風控優先
- 模組化量化框架
- 支援 Strategy Tester
- 支援 VPS
- 支援優化
- 風險保護
- 商業級架構

---

## 5. Release Notes Framework

建立發版紀錄框架。

建議函數：

```cpp
string GetReleaseNotes();
string GetVersionHistory();
void PrintReleaseKitSummary();
```

需包含：

- Version
- Build Date
- Completed Modules
- Added Features
- Fixed Issues
- Known Limitations
- Next Planned Release

---

## 6. Seller Checklist

建立 MQL5 Market 賣家上架檢查清單。

建議函數：

```cpp
string GetSellerChecklist();
bool CheckReleaseReadiness();
void PrintReleaseReadinessStatus();
```

檢查項目：

- 0 Errors
- 0 Warnings
- Strategy Tester 可執行
- Optimization 可執行
- VPS 相容
- 不使用 DLL
- 不依賴外部 EXE
- 不依賴網路 API
- 不使用 OrderSend()
- 所有交易使用 CTrade
- Risk Disclaimer 完成
- Product Description 完成
- Parameter Documentation 完成
- Backtest Report 準備完成
- Logo / Banner 預留完成
- Manual Skeleton 完成

---

## 7. Commercial Risk Disclaimer

建立商業風險聲明框架。

建議函數：

```cpp
string GetCommercialRiskDisclaimer();
```

必須包含：

- 交易有風險
- 回測不代表未來績效
- 不保證獲利
- 建議先使用 Demo 帳戶
- 使用者需自行承擔交易風險
- 市場波動、滑點、點差、流動性皆可能影響結果

---

## 8. Release Kit Export Preparation

建立未來發行包資料輸出基礎。

建議函數：

```cpp
string GetReleasePackageSummary();
string GetDeploymentChecklist();
string GetMarketSubmissionChecklist();
```

預留輸出內容：

- EA File Name
- Version
- Manual File
- Backtest Report
- Optimization Report
- Product Images
- Release Notes
- Market Description

---

# 主程式整合

## OnInit()

加入：

1. 初始化 ProductManualKit
2. PrintReleaseKitSummary()
3. PrintReleaseReadinessStatus()
4. 保留 Module 0 ~ Module 13 初始化流程

---

## OnTick()

不需要新增交易邏輯。

保留既有流程：

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard
7. PerformanceMetrics.Update()

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Deinit Reason
- Release Kit Status

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 上架方向
- Strategy Tester 相容
- Optimization 相容
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
- 破壞 Module 0 ~ Module 13 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module14_ProductManualReleaseKit.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 14 Product Manual & Release Kit 完成
- Product Manual Skeleton 完成
- Input Parameter Table 完成
- Backtest Report Template 完成
- MQL5 Product Page Draft 完成
- Release Notes Framework 完成
- Seller Checklist 完成
- Commercial Risk Disclaimer 完成
- Release Kit Export Preparation 完成
- 0 Errors
- 0 Warnings

形成：

```text
Product Manual & Release Kit v1
```

---

# 下一階段預告

完成 Step 10 後，下一步建議進入：

## Step 11：Module 15 QA / Validation / Final Pre-Release Framework

內容：

- Internal QA Checklist
- Strategy Tester Validation
- Optimization Validation
- Forward Test Checklist
- Stress Test Checklist
- Symbol / Broker Compatibility Checklist
- Final Pre-Release Gate
