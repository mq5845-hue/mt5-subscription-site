# Step 11 Prompt：Module 15 QA / Validation / Final Pre-Release Framework

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
- Module 14：Product Manual & Release Kit

已成功編譯：

- 0 Errors
- 0 Warnings

目前狀態：

- Enterprise Trading Framework v5 已完成
- Strategy Validation Layer v1 已完成
- Backtest & Optimization Framework v1 已完成
- MQL5 Market Packaging Framework v1 已完成
- Product Manual & Release Kit v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 4：Final Pre-Release Validation Layer

## 本次任務

### Module 15：QA / Validation / Final Pre-Release Framework

建立正式發版前驗收框架，用於 MQL5 Market 上架前的品質控管、風險檢查、回測驗證、優化驗證、Forward Test 驗證與最終發版 Gate。

---

# 核心目標

本階段不是新增交易策略，而是建立一套正式發版前的：

- Internal QA Checklist
- Compile Validation
- Strategy Tester Validation
- Optimization Validation
- Forward Test Checklist
- Stress Test Checklist
- Symbol / Broker Compatibility Checklist
- MQL5 Market Validator Readiness
- Final Pre-Release Gate
- Release Approval Status

---

# Module 15：QA / Validation / Final Pre-Release Framework

建議建立：

```cpp
class CPreReleaseValidator
```

或依既有 OOP 架構保持一致命名。

---

## 1. Internal QA Checklist

建立內部品質檢查框架。

建議函數：

```cpp
bool CheckInternalQA();
void PrintInternalQAReport();
string GetInternalQASummary();
```

檢查項目：

- EA 名稱正確
- 版本號正確
- MagicNumber 有效
- Symbol 有效
- Timeframe 有效
- Input 參數合法
- RiskPercent 合理
- SL / TP 合理
- Session 設定合理
- Strategy Score 權重合理
- RiskController 啟用狀態合理
- Logger 可用
- Dashboard 可用

---

## 2. Compile Validation Status

建立編譯狀態檢查摘要。

注意：

MQL5 程式本身無法直接讀取 MetaEditor 編譯結果，因此本模組應建立「發版檢查提示與狀態輸出框架」。

建議函數：

```cpp
string GetCompileValidationChecklist();
void PrintCompileValidationReminder();
```

必須提醒：

- MetaEditor 必須顯示 0 Errors
- MetaEditor 必須顯示 0 Warnings
- 不得存在未使用變數警告
- 不得存在隱式轉換警告
- 不得存在未初始化變數風險

---

## 3. Strategy Tester Validation

建立 Strategy Tester 驗證框架。

建議函數：

```cpp
bool CheckStrategyTesterReadiness();
string GetStrategyTesterChecklist();
void PrintStrategyTesterChecklist();
```

檢查項目：

- 可在 Strategy Tester 啟動
- OnInit 正常
- OnTick 正常
- OnTester 正常
- 不依賴人工操作
- 不依賴外部網路
- 不依賴外部 exe
- 不使用 DLL
- 不因無持倉而報錯
- 不因無交易歷史而報錯
- Dashboard 不影響回測效能
- Logger 不產生過量輸出

---

## 4. Optimization Validation

建立 Optimization 驗證框架。

建議函數：

```cpp
bool CheckOptimizationReadiness();
string GetOptimizationChecklist();
void PrintOptimizationChecklist();
```

檢查項目：

- 可執行 Optimization
- OnTester 回傳合理數值
- 不因除以 0 造成錯誤
- 參數範圍合理
- Score Threshold 範圍合理
- EMA / RSI / ATR 參數合理
- Risk 參數合理
- 優化模式下不大量 Print
- 優化模式下不依賴 Chart Object

---

## 5. Forward Test Checklist

建立 Forward Test 驗證框架。

建議函數：

```cpp
string GetForwardTestChecklist();
void PrintForwardTestChecklist();
```

檢查項目：

- Demo 帳戶測試
- 至少 2 週 Forward Test
- 不同點差環境測試
- 不同交易時段測試
- VPS 環境測試
- 滑點情境測試
- 新聞高波動時段觀察
- Broker 伺服器重啟後恢復測試

---

## 6. Stress Test Checklist

建立壓力測試框架。

建議函數：

```cpp
string GetStressTestChecklist();
void PrintStressTestChecklist();
```

測試項目：

- 高 Spread
- 低流動性
- 快速跳價
- 無報價
- Symbol 不存在
- Tick Value 為 0
- Tick Size 為 0
- Volume Step 異常
- 最小手數過高
- 保證金不足
- 多持倉環境
- Hedging / Netting 帳戶差異

---

## 7. Symbol / Broker Compatibility Checklist

建立不同券商相容性檢查框架。

建議函數：

```cpp
bool CheckSymbolBrokerCompatibility();
string GetBrokerCompatibilityReport();
void PrintBrokerCompatibilityReport();
```

檢查項目：

- SymbolExist()
- SymbolSelect()
- SYMBOL_DIGITS
- SYMBOL_POINT
- SYMBOL_TRADE_TICK_VALUE
- SYMBOL_TRADE_TICK_SIZE
- SYMBOL_VOLUME_MIN
- SYMBOL_VOLUME_MAX
- SYMBOL_VOLUME_STEP
- SYMBOL_TRADE_CONTRACT_SIZE
- SYMBOL_SPREAD
- ACCOUNT_MARGIN_MODE

必須支援：

- Netting
- Hedging
- Exchange 類型檢測

---

## 8. MQL5 Market Validator Readiness

建立 MQL5 Market Validator 準備框架。

建議函數：

```cpp
bool CheckMQL5MarketValidatorReadiness();
string GetMarketValidatorChecklist();
void PrintMarketValidatorChecklist();
```

檢查項目：

- 不使用 DLL
- 不使用外部 exe
- 不依賴網路 API
- 不硬編特定券商
- 不硬編特定帳號
- 不限制特定使用者
- 不使用高風險外部檔案依賴
- 可在 Strategy Tester 執行
- 可在 VPS 執行
- 使用官方 CTrade
- 無 OrderSend()
- 無 TODO
- 無未完成函數
- 無過度 Print
- 無過度 Chart Object 負擔
- 參數具有合理預設值

---

## 9. Final Pre-Release Gate

建立最終發版 Gate。

建議 enum：

```cpp
enum ENUM_XQP_RELEASE_STATUS
{
   XQP_RELEASE_BLOCKED = 0,
   XQP_RELEASE_WARNING = 1,
   XQP_RELEASE_READY = 2
};
```

建議 class：

```cpp
class CFinalReleaseGate
```

建議函數：

```cpp
ENUM_XQP_RELEASE_STATUS EvaluateReleaseStatus();
bool IsReleaseReady();
void PrintFinalReleaseReport();
string GetFinalReleaseSummary();
```

Release Ready 條件：

- Internal QA Pass
- Strategy Tester Ready
- Optimization Ready
- Forward Test Checklist Completed
- Broker Compatibility Pass
- Market Validator Readiness Pass
- Risk Disclaimer Completed
- Product Manual Completed
- Release Notes Completed

---

# 主程式整合

## OnInit()

加入：

1. 初始化 PreReleaseValidator
2. 執行 Internal QA
3. 執行 Broker Compatibility Check
4. 執行 Market Validator Readiness Check
5. 印出 Pre-Release Summary
6. 若有致命錯誤：
   - return INIT_PARAMETERS_INCORRECT
7. 保留 Module 0 ~ Module 14 初始化流程

---

## OnTick()

不新增交易邏輯。

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
- Final Release Status
- QA Summary

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 上架方向
- Strategy Tester 相容
- Optimization 相容
- Forward Test 相容
- VPS 相容
- Market Validator 相容方向
- 可長期版本維護

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
- 破壞 Module 0 ~ Module 14 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module15_PreReleaseValidation.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 15 QA / Validation / Final Pre-Release Framework 完成
- Internal QA Checklist 完成
- Strategy Tester Validation 完成
- Optimization Validation 完成
- Forward Test Checklist 完成
- Stress Test Checklist 完成
- Symbol / Broker Compatibility Checklist 完成
- MQL5 Market Validator Readiness 完成
- Final Pre-Release Gate 完成
- 0 Errors
- 0 Warnings

形成：

```text
Final Pre-Release Validation Framework v1
```

---

# 下一階段預告

完成 Step 11 後，下一步建議進入：

## Step 12：Module 16 Live-Safety / Deployment Guard Framework

內容：

- Live Trading Safety Switch
- Demo / Real Account Detection
- Spread Guard
- Slippage Guard
- Emergency Stop
- VPS Deployment Checklist
- Live Deployment Readiness Gate
