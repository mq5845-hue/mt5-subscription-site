# Step 8 Prompt：Module 12 Backtest & Optimization Framework

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

已成功編譯：

- 0 Errors
- 0 Warnings

目前狀態：

- Enterprise Trading Framework v5 已完成
- Strategy Validation Layer v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 2：Strategy Validation Layer

## 本次任務

### Module 12：Backtest & Optimization Framework

建立專為 MT5 Strategy Tester、Optimization、Forward Test、Walk Forward Analysis 設計的回測與優化框架。

---

# 核心目標

本階段不是新增交易策略，而是強化 EA 的：

- 回測可讀性
- 參數可優化性
- 測試模式控制
- 統計輸出能力
- Strategy Tester 相容性
- MQL5 Market 展示準備能力

---

# Module 12：Backtest & Optimization Framework

## 1. Backtest Mode Control

建議 Input：

```cpp
input bool EnableBacktestMode = true;
input bool EnableOptimizationMode = false;
input bool EnableVerboseTesterLog = false;
input bool EnableStrategyDebugPrint = false;
```

功能：

- 回測模式下可輸出精簡資訊
- 優化模式下禁止過量 Print()
- 實盤模式下維持正常 Logger
- 避免 Strategy Tester 過度輸出造成效能下降

---

## 2. Optimization Inputs Group

整理可優化參數。

### Money Management

- RiskPercent
- DefaultStopLossPips
- DefaultTakeProfitPips

### BreakEven / Trailing

- BreakEvenPips
- BreakEvenOffsetPips
- TrailingStopPips

### Signal Engine

- FastEMA
- SlowEMA
- RSIPeriod
- RSI Buy / Sell Level
- ATRPeriod
- MinimumATR

### Strategy Score

- BuyThresholdScore
- SellThresholdScore
- EMA Score Weight
- RSI Score Weight
- ATR Score Weight
- Session Score Weight
- Risk Score Weight

### Session Filter

- London Start / End
- New York Start / End

### Risk Controller

- MaxDailyDrawdownPercent
- MaxConsecutiveLosses
- MaxExposurePercent
- MinimumEquityPercent

---

## 3. Parameter Validation

建立參數驗證函數。

建議函數：

```cpp
bool ValidateOptimizationParameters();
bool ValidateMoneyManagementInputs();
bool ValidateSignalInputs();
bool ValidateRiskInputs();
```

必須檢查：

- RiskPercent > 0
- SL / TP > 0
- Fast EMA < Slow EMA
- RSI Period > 0
- ATR Period > 0
- Score Threshold 介於 0 ~ 100
- Session 時間介於 0 ~ 23
- Max Drawdown > 0
- Volume / Symbol 資料有效

若參數不合法：

- OnInit() 回傳 INIT_PARAMETERS_INCORRECT
- Print() 顯示錯誤原因

---

## 4. Performance Metrics Preparation

建立效能統計框架。

建議 OOP：

```cpp
class CPerformanceMetrics
```

建議函數：

```cpp
void Reset();
void Update();
double CurrentDrawdownPercent();
double FloatingProfit();
int OpenPositionCount();
int ClosedTradeCount();
double WinRate();
double ProfitFactor();
```

本階段可先建立框架與基礎統計，不必過度複雜。

---

## 5. Strategy Tester Friendly Design

必須確保：

- 不使用 DLL
- 不依賴外部 exe
- 不依賴網路 API
- 不依賴人工操作
- 不使用過度 Chart Object 刷新
- Optimization 模式下不大量輸出 Print()
- 文件與參數結構適合 MQL5 Market 測試

---

## 6. Walk Forward Preparation

預留 Walk Forward Analysis 結構。

建議 Input：

```cpp
input int OptimizationWindowMonths = 12;
input int ForwardWindowMonths = 3;
input bool EnableWalkForwardTagging = false;
```

建議函數：

```cpp
string GetOptimizationProfileName();
string GetBacktestProfileSummary();
```

---

# 主程式整合

## OnInit()

必須加入：

1. 初始化 BacktestOptimizationFramework
2. 執行 ValidateOptimizationParameters()
3. 若參數錯誤：
   - Print 錯誤原因
   - return INIT_PARAMETERS_INCORRECT
4. 初始化 PerformanceMetrics

---

## OnTick()

流程應保留既有邏輯：

1. RiskController
2. SessionFilter
3. SignalEngine
4. StrategyFramework
5. OrderManager
6. Dashboard
7. PerformanceMetrics.Update()

---

## OnTester()

可選但建議加入：

```cpp
double OnTester();
```

回傳可優化指標，例如：

- Profit Factor
- Net Profit / Drawdown
- Composite Fitness Score

本階段可建立穩定的基礎 OnTester()，避免複雜錯誤。

---

# OnTester Fitness Score 建議

建立一個簡單穩定的 Fitness Score：

```text
Fitness = NetProfit / MaxDrawdown
```

或：

```text
Fitness = ProfitFactor * RecoveryFactor
```

若資料不足或除以 0：

回傳 0.0

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
- 破壞 Module 0 ~ Module 11 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module12_BacktestOptimization.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 12 Backtest & Optimization Framework 完成
- Parameter Validation 完成
- Optimization Inputs Group 完成
- Strategy Tester Friendly Design 完成
- Performance Metrics 基礎框架完成
- OnTester Fitness Score 基礎框架完成
- Walk Forward Preparation 預留完成
- 0 Errors
- 0 Warnings

形成：

```text
Backtest & Optimization Framework v1
```

---

# 下一階段預告

完成 Step 8 後，下一步建議進入：

## Step 9：Module 13 MQL5 Market Packaging Framework

內容：

- Product Metadata
- Input Parameter Documentation
- Release Notes
- User Manual Skeleton
- Version Control
- Market Validator Checklist
- Demo / Full Version Control
