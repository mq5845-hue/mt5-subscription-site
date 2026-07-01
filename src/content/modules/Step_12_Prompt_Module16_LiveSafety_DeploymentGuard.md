# Step 12 Prompt：Module 16 Live-Safety / Deployment Guard Framework

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
- Module 15：QA / Validation / Final Pre-Release Framework

已成功編譯：

- 0 Errors
- 0 Warnings

目前狀態：

- Enterprise Trading Framework v5 已完成
- Strategy Validation Layer v1 已完成
- Backtest & Optimization Framework v1 已完成
- MQL5 Market Packaging Framework v1 已完成
- Product Manual & Release Kit v1 已完成
- Final Pre-Release Validation Framework v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 5：Live-Safety / Deployment Guard Layer

## 本次任務

### Module 16：Live-Safety / Deployment Guard Framework

建立從「可發版」走向「可安全實盤部署」的關鍵安全層。

本模組目的不是新增交易策略，而是建立 EA 在 Demo / Real / VPS / 不同券商環境中實盤部署前的安全防線。

---

# 核心目標

建立一套商業級 Live Deployment Guard，包含：

- Live Trading Safety Switch
- Demo / Real Account Detection
- Spread Guard
- Slippage Guard
- Emergency Stop
- Broker Execution Guard
- VPS Deployment Checklist
- Trading Permission Guard
- Live Deployment Readiness Gate

---

# Module 16：Live-Safety / Deployment Guard Framework

建議建立：

```cpp
class CLiveSafetyGuard
```

或依既有 OOP 架構保持一致命名。

---

## 1. Live Trading Safety Switch

建立實盤交易安全開關。

建議 Input：

```cpp
input bool EnableLiveTrading = false;
input bool EnableDemoTrading = true;
input bool RequireManualLiveConfirmation = true;
input string LiveConfirmationText = "I_ACCEPT_LIVE_RISK";
input string UserLiveConfirmation = "";
```

邏輯：

- 預設不允許實盤交易
- Demo 帳戶可允許測試
- Real 帳戶必須同時滿足：
  - EnableLiveTrading = true
  - RequireManualLiveConfirmation = true 時，UserLiveConfirmation 必須等於 LiveConfirmationText
  - 所有 Live Safety Check 通過

建議函數：

```cpp
bool IsLiveTradingEnabled();
bool IsLiveConfirmationValid();
bool TradingPermissionGranted();
```

---

## 2. Demo / Real Account Detection

建立帳戶類型檢查。

建議函數：

```cpp
bool IsDemoAccount();
bool IsRealAccount();
string GetAccountTradeModeText();
```

使用：

```cpp
AccountInfoInteger(ACCOUNT_TRADE_MODE)
```

檢查：

- ACCOUNT_TRADE_MODE_DEMO
- ACCOUNT_TRADE_MODE_REAL
- ACCOUNT_TRADE_MODE_CONTEST

行為：

- Demo：允許測試
- Real：必須通過 Live Safety Gate
- Contest：依風險設定處理

---

## 3. Spread Guard

建立點差保護。

建議 Input：

```cpp
input bool EnableSpreadGuard = true;
input double MaxAllowedSpreadPips = 35.0;
```

建議函數：

```cpp
double CurrentSpreadPips();
bool IsSpreadAcceptable();
string GetSpreadGuardStatus();
```

邏輯：

- 若點差超過 MaxAllowedSpreadPips：
  - 禁止新倉
  - 不強制平倉
  - Logger / Dashboard 顯示風險狀態

必須支援 XAUUSD，不可硬編點值，需依 SymbolInfoDouble / Digits / Point 轉換。

---

## 4. Slippage Guard

建立滑點保護。

建議 Input：

```cpp
input bool EnableSlippageGuard = true;
input uint MaxSlippagePoints = 50;
```

整合：

```cpp
trade.SetDeviationInPoints(MaxSlippagePoints);
```

建議函數：

```cpp
bool ConfigureSlippageGuard();
uint GetMaxSlippagePoints();
string GetSlippageGuardStatus();
```

---

## 5. Emergency Stop

建立緊急停止機制。

建議 Input：

```cpp
input bool EmergencyStop = false;
input bool EmergencyClosePositions = false;
```

建議函數：

```cpp
bool IsEmergencyStopActive();
bool HandleEmergencyStop();
bool CloseAllManagedPositions();
```

邏輯：

- EmergencyStop = true：
  - 立即禁止新交易
  - 可選擇是否平掉本 EA 管理的持倉
- 僅處理：
  - 指定 Symbol
  - 指定 MagicNumber
- 不得影響其他 EA / 手動交易持倉

---

## 6. Broker Execution Guard

建立券商交易條件檢查。

建議函數：

```cpp
bool CheckBrokerExecutionConditions();
bool IsTradeAllowedByTerminal();
bool IsTradeAllowedByAccount();
bool IsSymbolTradable();
bool IsMarketOpenForSymbol();
string GetBrokerExecutionReport();
```

需檢查：

- TerminalInfoInteger(TERMINAL_TRADE_ALLOWED)
- AccountInfoInteger(ACCOUNT_TRADE_ALLOWED)
- SymbolInfoInteger(symbol, SYMBOL_TRADE_MODE)
- SymbolInfoInteger(symbol, SYMBOL_SELECT)
- SymbolInfoDouble(symbol, SYMBOL_ASK)
- SymbolInfoDouble(symbol, SYMBOL_BID)
- Spread 是否合理
- Tick Value 是否有效
- Tick Size 是否有效
- Volume Min / Max / Step 是否有效

---

## 7. VPS Deployment Checklist

建立 VPS 部署檢查框架。

建議函數：

```cpp
string GetVPSDeploymentChecklist();
void PrintVPSDeploymentChecklist();
bool CheckVPSFriendlySettings();
```

檢查項目：

- 不依賴外部 DLL
- 不依賴外部 exe
- 不依賴人工點擊
- 不依賴本機路徑
- 不依賴網路 API
- Logger 不過量寫檔
- Dashboard 不造成效能負擔
- Optimization 模式下不大量輸出
- EA 可在 VPS 重啟後正常恢復

---

## 8. Trading Permission Guard

建立最終交易許可閘門。

建議函數：

```cpp
bool CanOpenNewTrade();
bool CanManageExistingPositions();
string GetTradingPermissionStatus();
void PrintTradingPermissionReport();
```

CanOpenNewTrade() 必須同時確認：

- EmergencyStop = false
- Account Trade Allowed
- Terminal Trade Allowed
- Symbol Tradable
- Spread Acceptable
- Slippage Guard Configured
- RiskController 允許交易
- SessionFilter 允許交易
- Demo / Live 權限通過
- Market Validator / PreRelease 狀態通過

CanManageExistingPositions() 必須允許在部分風險狀態下繼續管理已開倉持倉，例如：

- BreakEven
- TrailingStop
- Emergency Close
- Risk Reduction

---

## 9. Live Deployment Readiness Gate

建立實盤部署前最終 Gate。

建議 enum：

```cpp
enum ENUM_XQP_LIVE_DEPLOYMENT_STATUS
{
   XQP_LIVE_BLOCKED = 0,
   XQP_LIVE_DEMO_ONLY = 1,
   XQP_LIVE_READY = 2
};
```

建議 class：

```cpp
class CLiveDeploymentGate
```

建議函數：

```cpp
ENUM_XQP_LIVE_DEPLOYMENT_STATUS EvaluateLiveDeploymentStatus();
bool IsLiveDeploymentReady();
bool IsDemoOnlyMode();
void PrintLiveDeploymentReport();
string GetLiveDeploymentSummary();
```

Live Ready 條件：

- PreRelease Validation Ready
- Broker Execution Conditions Pass
- Spread Guard Pass
- Slippage Guard Configured
- EmergencyStop Off
- Real Account Confirmation Valid
- RiskController Pass
- Trading Permission Granted
- VPS Checklist Pass

---

# 主程式整合

## OnInit()

加入：

1. 初始化 LiveSafetyGuard
2. 設定 trade.SetDeviationInPoints(MaxSlippagePoints)
3. 檢查 Demo / Real Account
4. 檢查 Broker Execution Conditions
5. 檢查 VPS Friendly Settings
6. 輸出 Live Deployment Summary
7. 若存在致命錯誤：
   - return INIT_PARAMETERS_INCORRECT
8. 保留 Module 0 ~ Module 15 初始化流程

---

## OnTick()

流程應調整為：

1. EmergencyStop Check
2. LiveSafetyGuard.CanManageExistingPositions()
3. BreakEven / TrailingStop 管理既有持倉
4. LiveSafetyGuard.CanOpenNewTrade()
5. RiskController
6. SessionFilter
7. SignalEngine
8. StrategyFramework
9. OrderManager
10. Dashboard
11. PerformanceMetrics.Update()

若 CanOpenNewTrade() 為 false：

- 禁止新倉
- 仍允許持倉管理

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Deinit Reason
- Final Live Deployment Status
- Emergency Stop Status
- Trading Permission Summary

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 上架方向
- Strategy Tester 相容
- Optimization 相容
- VPS 相容
- 實盤部署安全性
- 不干擾其他 EA 或手動交易持倉

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
- 破壞 Module 0 ~ Module 15 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- 緊急停止時錯誤關閉非本 EA 持倉
- 無確認機制即允許 Real Account 實盤交易

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module16_LiveSafetyDeploymentGuard.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 16 Live-Safety / Deployment Guard Framework 完成
- Live Trading Safety Switch 完成
- Demo / Real Account Detection 完成
- Spread Guard 完成
- Slippage Guard 完成
- Emergency Stop 完成
- Broker Execution Guard 完成
- VPS Deployment Checklist 完成
- Trading Permission Guard 完成
- Live Deployment Readiness Gate 完成
- 0 Errors
- 0 Warnings

形成：

```text
Live-Safety / Deployment Guard Framework v1
```

---

# 下一階段預告

完成 Step 12 後，下一步建議進入：

## Step 13：Module 17 Strategy Activation & Controlled Trading Framework

內容：

- Controlled Auto-Trading Switch
- Score-Based Entry Activation
- Real Order Execution Gate
- One-Position / Multi-Position Mode
- Safe Entry Throttling
- Cooldown Control
- First Live Simulation Mode
