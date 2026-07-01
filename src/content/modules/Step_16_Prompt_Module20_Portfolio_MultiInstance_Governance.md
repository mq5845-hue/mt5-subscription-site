# Step 16 Prompt：Module 20 Portfolio / Multi-Instance Governance Framework

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
- Module 16：Live-Safety / Deployment Guard Framework
- Module 17：Strategy Activation & Controlled Trading Framework
- Module 18：Strategy Performance Analytics Framework
- Module 19：Adaptive Risk & Strategy Throttle Framework

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
- Live-Safety / Deployment Guard Framework v1 已完成
- Strategy Activation & Controlled Trading Framework v1 已完成
- Strategy Performance Analytics Framework v1 已完成
- Adaptive Risk & Strategy Throttle Framework v1 已完成

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 9：Portfolio / Multi-Instance Governance Layer

## 本次任務

### Module 20：Portfolio / Multi-Instance Governance Framework

建立從「單一 EA 自適應風控」升級為「多實例、多週期、多 EA 協調治理」的 Portfolio / Multi-Instance Governance 層。

本模組目的不是新增交易策略，而是管理同一帳戶中可能同時存在的多個 EA 實例、多週期實例、多商品實例，以及不同 MagicNumber 之間的風險協調與衝突控制。

---

# 核心目標

建立一套商業級 Portfolio / Multi-Instance Governance Framework，包含：

- Multi-Instance Magic Coordination
- Same Symbol Conflict Control
- Portfolio Exposure Awareness
- Cross-EA Risk Coordination
- Multi-Timeframe Instance Governance
- Market Product Deployment Governance
- Global Exposure Guard
- Instance Identity System
- Portfolio Risk Summary
- Multi-Instance Dashboard Extension

---

# Module 20：Portfolio / Multi-Instance Governance Framework

建議建立：

```cpp
class CPortfolioGovernance
```

或依既有 OOP 架構保持一致命名。

---

## 1. Instance Identity System

建立 EA 實例身份識別系統。

建議 Input：

```cpp
input string InstanceName = "XAUUSD_Quant_Pro_v1_H1";
input int InstanceID = 1;
input bool EnableInstanceGovernance = true;
```

建議函數：

```cpp
string GetInstanceName();
int GetInstanceID();
string GetInstanceSignature();
void PrintInstanceIdentity();
```

Instance Signature 建議包含：

- EA Name
- Version
- Symbol
- Timeframe
- MagicNumber
- InstanceID
- Account Number
- Server Name

用途：

- 區分不同圖表上的 EA 實例
- 區分不同 Timeframe 的同一策略
- 支援未來 Market 使用者多圖部署

---

## 2. Multi-Instance Magic Coordination

建立多 MagicNumber 協調框架。

建議 Input：

```cpp
input bool EnableMagicCoordination = true;
input bool BlockDuplicateMagicOnSameSymbol = true;
input bool AllowDifferentMagicSameSymbol = false;
```

建議函數：

```cpp
bool CheckMagicConflict();
bool IsDuplicateMagicDetected();
string GetMagicCoordinationReport();
```

檢查：

- 同一 Symbol 是否已有相同 MagicNumber 持倉
- 同一 Symbol 是否已有不同 MagicNumber 的 EA 持倉
- 是否允許不同 Magic 在同商品同時交易
- 是否可能發生多實例重複下單

注意：

- 不得干擾其他手動交易
- 不得強制關閉非本 EA 持倉
- 只應用於開新倉決策與風險提示

---

## 3. Same Symbol Conflict Control

建立同商品衝突控制。

建議 Input：

```cpp
input bool EnableSameSymbolConflictControl = true;
input bool BlockOppositeDirectionOnSameSymbol = true;
input bool BlockSameDirectionDuplicateEntries = false;
```

建議函數：

```cpp
bool HasSameSymbolBuyExposure();
bool HasSameSymbolSellExposure();
bool HasOppositeSymbolExposure(string direction);
bool SameSymbolConflictAllowsBuy();
bool SameSymbolConflictAllowsSell();
string GetSameSymbolConflictReport();
```

邏輯：

- 若已有 XAUUSD Buy，是否允許再開 XAUUSD Sell
- 若已有 XAUUSD Sell，是否允許再開 XAUUSD Buy
- 是否允許同方向加倉
- 是否允許不同 Magic 同商品共存

---

## 4. Portfolio Exposure Awareness

建立投資組合曝險感知。

建議 Input：

```cpp
input bool EnablePortfolioExposureAwareness = true;
input double MaxPortfolioLots = 5.0;
input double MaxPortfolioExposurePercent = 20.0;
input double MaxSymbolExposurePercent = 10.0;
```

建議函數：

```cpp
double GetTotalPortfolioLots();
double GetSymbolTotalLots(string symbol);
double GetManagedPortfolioLots();
double GetPortfolioExposurePercent();
double GetSymbolExposurePercent(string symbol);
bool PortfolioExposureAllowsNewTrade();
string GetPortfolioExposureReport();
```

檢查項目：

- 全帳戶總手數
- 本 EA 管理手數
- 同商品總手數
- 同 MagicNumber 手數
- 估算曝險百分比
- 是否超過 MaxPortfolioExposurePercent
- 是否超過 MaxSymbolExposurePercent

---

## 5. Cross-EA Risk Coordination

建立跨 EA 風險協調。

建議 Input：

```cpp
input bool EnableCrossEARiskCoordination = true;
input bool RespectOtherEAPositions = true;
input bool RespectManualPositions = true;
input double MaxAccountWideOpenRiskPercent = 25.0;
```

建議函數：

```cpp
int CountOtherEAPositions();
int CountManualPositions();
double EstimateAccountWideOpenRiskPercent();
bool CrossEARiskAllowsNewTrade();
string GetCrossEARiskReport();
```

邏輯：

- 若帳戶已有其他 EA 大量持倉，本 EA 應可降低風險或禁止新倉
- 若帳戶已有手動交易，本 EA 不應干擾
- 預設尊重其他 EA 與手動交易
- 僅做風險協調與新倉控制，不強制處理他人持倉

---

## 6. Multi-Timeframe Instance Governance

建立多週期實例治理。

建議 Input：

```cpp
input bool EnableMultiTimeframeGovernance = true;
input bool AllowMultipleTimeframeInstances = true;
input bool PreferHigherTimeframeDirection = true;
```

建議函數：

```cpp
bool IsHigherTimeframeInstance();
bool IsLowerTimeframeInstance();
string GetTimeframeGovernanceRole();
bool TimeframeGovernanceAllowsTrade(string direction);
string GetTimeframeGovernanceReport();
```

用途：

- H1 / H4 / D1 多實例部署時避免方向衝突
- 高週期可作為方向主導
- 低週期可作為進場執行
- 本階段可建立框架與報告，不必實作跨圖表通訊

注意：

MQL5 EA 跨圖表資料共享較複雜，本階段應避免使用 DLL / 外部檔案依賴，優先使用 Account / Position 狀態推斷。

---

## 7. Global Exposure Guard

建立全域曝險保護閘門。

建議函數：

```cpp
bool GlobalExposureAllowsBuy();
bool GlobalExposureAllowsSell();
bool GlobalExposureAllowsNewTrade();
string GetGlobalExposureGuardStatus();
```

需同時檢查：

- Portfolio Exposure Awareness
- Same Symbol Conflict Control
- Cross-EA Risk Coordination
- Adaptive Risk Throttle
- RiskController
- LiveSafetyGuard
- ControlledExecutionGate

本模組只能縮小交易權限，不得繞過既有安全 Gate。

---

## 8. Market Product Deployment Governance

建立商品化部署治理。

建議 Input：

```cpp
input bool EnableMarketProductDeploymentGovernance = true;
input bool WarnIfMultipleInstancesDetected = true;
input bool ConservativeModeForUnknownPortfolio = true;
```

建議函數：

```cpp
bool CheckMarketDeploymentGovernance();
string GetMarketDeploymentGovernanceReport();
void PrintMarketDeploymentGuidance();
```

用途：

- 給 MQL5 Market 使用者多圖部署時提供安全提示
- 避免同一帳戶過度啟動多個 EA 實例
- 提醒 MagicNumber 與 Symbol / Timeframe 配置
- 若偵測到未知組合，預設保守模式

---

## 9. Portfolio Risk Summary

建立投資組合風險摘要。

建議函數：

```cpp
string GetPortfolioRiskSummary();
void PrintPortfolioRiskSummary();
```

摘要內容：

- Instance Name
- MagicNumber
- Symbol
- Timeframe
- Managed Positions
- Other EA Positions
- Manual Positions
- Portfolio Lots
- Symbol Lots
- Portfolio Exposure Percent
- Symbol Exposure Percent
- Conflict Status
- Governance Decision

---

## 10. Multi-Instance Dashboard Extension

將多實例治理摘要整合至 Dashboard。

建議函數：

```cpp
string GetDashboardPortfolioGovernanceText();
```

Dashboard 顯示項目：

- Instance Name
- Instance ID
- Portfolio Exposure
- Symbol Exposure
- Other EA Positions
- Manual Positions
- Same Symbol Conflict Status
- Global Exposure Guard Status
- Governance Decision

不得造成 Chart Object 過度刷新。

---

# 主程式整合

## OnInit()

加入：

1. 初始化 PortfolioGovernance
2. 輸出 Instance Identity
3. 檢查 Magic Coordination
4. 檢查 Symbol / Broker / Portfolio 狀態
5. 輸出 Portfolio Governance Summary
6. 保留 Module 0 ~ Module 19 初始化流程

若偵測到嚴重衝突：

```cpp
return INIT_PARAMETERS_INCORRECT;
```

或依設計以保守模式啟動。

---

## OnTick()

建議流程：

1. EmergencyStop Check
2. CanManageExistingPositions()
3. BreakEven / TrailingStop 管理既有持倉
4. PortfolioGovernance.Update / Evaluate
5. GlobalExposureAllowsNewTrade()
6. LiveSafetyGuard.CanOpenNewTrade()
7. RiskController.IsTradingAllowed()
8. SessionFilter.IsTradingAllowed()
9. SignalEngine
10. StrategyFramework 計算 Buy / Sell Score
11. StrategyAnalytics.UpdateAnalytics()
12. AdaptiveRiskThrottle.Evaluate
13. StrategyActivationController 判定 Buy / Sell Activation
14. PortfolioGovernance 檢查方向與曝險
15. ControlledExecutionGate Evaluate
16. 若允許下單：
    - MoneyManagement 計算手數
    - OrderManager 執行
17. Dashboard.Update()
18. PerformanceMetrics.Update()

---

## Logger 整合

Logger 應記錄：

- Instance Identity
- Magic Conflict
- Same Symbol Conflict
- Portfolio Exposure
- Cross-EA Risk Status
- Global Exposure Block Reason
- Governance Decision

Optimization 模式下避免大量輸出。

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Instance Name
- Instance ID
- Portfolio Governance Summary
- Final Governance Status
- Deinit Reason

---

# 商業級規範

必須符合：

- MQL5 官方語法
- 官方 CTrade
- MQL5 Market 上架方向
- Strategy Tester 相容
- Optimization 相容
- VPS 相容
- 不干擾其他 EA 或手動交易
- 不強制平倉非本 EA 持倉
- 不使用 DLL
- 不依賴網路 API
- 不依賴外部 EXE
- 不造成過度 Print
- 不造成過度 Chart Object 更新

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
- 破壞 Module 0 ~ Module 19 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- 強制關閉其他 EA 持倉
- 強制關閉手動持倉
- 繞過 RiskController
- 繞過 LiveSafetyGuard
- 繞過 AdaptiveRiskThrottle
- 多實例衝突時仍無條件開倉

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module20_PortfolioMultiInstanceGovernance.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 20 Portfolio / Multi-Instance Governance Framework 完成
- Instance Identity System 完成
- Multi-Instance Magic Coordination 完成
- Same Symbol Conflict Control 完成
- Portfolio Exposure Awareness 完成
- Cross-EA Risk Coordination 完成
- Multi-Timeframe Instance Governance 完成
- Market Product Deployment Governance 完成
- Global Exposure Guard 完成
- Portfolio Risk Summary 完成
- Multi-Instance Dashboard Extension 完成
- 0 Errors
- 0 Warnings

形成：

```text
Portfolio / Multi-Instance Governance Framework v1
```

---

# 下一階段預告

完成 Step 16 後，下一步建議進入：

## Step 17：Module 21 News / Event Risk Filter Framework

內容：

- Manual News Blackout Windows
- High Volatility Event Guard
- Session Event Risk Mode
- Pre-News / Post-News Cooldown
- Event Risk Dashboard
- Market-safe implementation without external web API dependency
