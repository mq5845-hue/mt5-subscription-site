# Step 17 Prompt：Module 21 News / Event Risk Filter Framework

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
- Module 20：Portfolio / Multi-Instance Governance Framework

已成功編譯：

- 0 Errors
- 0 Warnings

請在既有架構基礎上繼續擴充，不得破壞已完成模組。

---

# Phase 10：News / Event Risk Protection Layer

## 本次任務

### Module 21：News / Event Risk Filter Framework

建立從「多實例治理」進一步升級到「重大事件風險防護」層的 News / Event Risk Filter Framework。

本模組目的不是新增交易策略，而是為 XAUUSD 這類高敏感商品建立重大新聞、事件風險、高波動時段、政策公布前後、突發波動環境下的交易保護框架。

---

# 核心目標

建立一套商業級 News / Event Risk Filter Framework，包含：

- Manual News Blackout Windows
- High Volatility Event Guard
- Pre-News / Post-News Cooldown
- Session Event Risk Mode
- Event Risk Dashboard
- Event Risk Logger
- Event Risk Permission Gate
- Market-safe Implementation without External Web API Dependency
- XAUUSD High Impact Event Presets
- Strategy Tester Compatible Event Simulation

---

# 重要設計原則

MQL5 Market 上架方向必須保持安全相容：

- 不依賴外部網路 API
- 不使用 WebRequest()
- 不使用 DLL
- 不使用外部 exe
- 不使用本機特定路徑
- 不強制依賴經濟日曆即時資料
- 以手動可設定事件窗口與高波動偵測為主
- 必須支援 Strategy Tester
- 必須支援 Optimization
- 必須支援 VPS

---

# Module 21：News / Event Risk Filter Framework

建議建立：

```cpp
class CNewsEventRiskFilter
```

或依既有 OOP 架構保持一致命名。

---

## 1. Manual News Blackout Windows

建立手動新聞禁交易時段。

建議 Input：

```cpp
input bool EnableNewsEventFilter = true;
input bool EnableManualNewsBlackout = true;

input string NewsBlackoutWindow1 = "2026.01.01 00:00-2026.01.01 01:00";
input string NewsBlackoutWindow2 = "";
input string NewsBlackoutWindow3 = "";
input string NewsBlackoutWindow4 = "";
input string NewsBlackoutWindow5 = "";
```

建議函數：

```cpp
bool IsWithinManualNewsBlackout();
bool ParseNewsWindow(string windowText, datetime &startTime, datetime &endTime);
string GetActiveNewsWindowText();
string GetManualNewsBlackoutReport();
```

要求：

- 空字串視為未啟用該窗口
- 格式錯誤不得造成 EA 崩潰
- 格式錯誤應 Print / Logger 警告
- 若當前時間位於 Blackout Window，禁止新倉
- 不強制關閉既有持倉
- 仍允許 BreakEven / TrailingStop / EmergencyStop 管理既有持倉

---

## 2. Recurring Event Time Windows

建立每日 / 每週固定事件風險窗口。

建議 Input：

```cpp
input bool EnableRecurringEventWindows = false;
input int RecurringEventStartHour = 20;
input int RecurringEventStartMinute = 15;
input int RecurringEventEndHour = 21;
input int RecurringEventEndMinute = 15;
input bool ApplyRecurringEventMonday = true;
input bool ApplyRecurringEventTuesday = true;
input bool ApplyRecurringEventWednesday = true;
input bool ApplyRecurringEventThursday = true;
input bool ApplyRecurringEventFriday = true;
```

建議函數：

```cpp
bool IsWithinRecurringEventWindow();
bool IsRecurringEventDayAllowed();
string GetRecurringEventWindowStatus();
```

用途：

- 適合手動設定 CPI / FOMC / NFP / 利率決議等週期性事件時間附近
- 適合 XAUUSD 高波動保護
- 不需要外部新聞 API

---

## 3. Pre-News / Post-News Cooldown

建立新聞前後冷卻機制。

建議 Input：

```cpp
input int PreNewsCooldownMinutes = 30;
input int PostNewsCooldownMinutes = 30;
input bool BlockNewTradesBeforeNews = true;
input bool BlockNewTradesAfterNews = true;
```

建議函數：

```cpp
bool IsPreNewsCooldownActive();
bool IsPostNewsCooldownActive();
bool IsNewsCooldownActive();
string GetNewsCooldownStatus();
```

邏輯：

- 事件前 N 分鐘禁止新倉
- 事件後 N 分鐘禁止新倉
- 既有持倉仍可被管理
- 若 EmergencyStop 啟用則依 EmergencyStop 邏輯處理

---

## 4. High Volatility Event Guard

建立高波動事件保護。

建議 Input：

```cpp
input bool EnableHighVolatilityEventGuard = true;
input double MaxEventSpreadPips = 50.0;
input double MaxEventATRMultiplier = 2.5;
input int EventVolatilityLookbackBars = 20;
```

建議函數：

```cpp
bool IsHighSpreadEvent();
bool IsATRVolatilitySpike();
bool IsHighVolatilityEventActive();
string GetHighVolatilityEventReport();
```

檢查：

- 當前 Spread 是否異常擴大
- ATR 是否顯著高於近期平均
- 是否出現事件型波動
- 不可硬編 XAUUSD 點值，必須使用 SymbolInfoDouble / Digits / Point

---

## 5. Session Event Risk Mode

建立事件風險時段模式。

建議 Input：

```cpp
input bool EnableSessionEventRiskMode = true;
input bool ReduceRiskDuringEventSession = true;
input bool BlockTradesDuringEventSession = false;
```

建議 enum：

```cpp
enum ENUM_XQP_EVENT_RISK_MODE
{
   XQP_EVENT_RISK_NORMAL = 0,
   XQP_EVENT_RISK_REDUCED = 1,
   XQP_EVENT_RISK_BLOCK_NEW_TRADES = 2,
   XQP_EVENT_RISK_EMERGENCY = 3
};
```

建議函數：

```cpp
ENUM_XQP_EVENT_RISK_MODE EvaluateEventRiskMode();
string GetEventRiskModeText();
bool IsEventRiskModeActive();
```

邏輯：

- 正常狀態：不限制
- Reduced：降低風險倍率，交由 AdaptiveRiskThrottle 整合
- Block New Trades：禁止新倉
- Emergency：僅在明確設定時觸發，不應自動亂平倉

---

## 6. XAUUSD High Impact Event Presets

建立黃金高影響事件預設說明與手動配置框架。

建議函數：

```cpp
string GetXAUUSDHighImpactEventGuide();
void PrintXAUUSDEventRiskGuidance();
```

說明內容：

- FOMC
- Federal Reserve Rate Decision
- Non-Farm Payrolls
- CPI / PPI
- GDP
- Unemployment Rate
- Geopolitical Shock
- Unexpected Central Bank Statement
- High Volatility USD Events

注意：

本模組不需要自動抓取實際新聞日期，僅提供使用者設定手動窗口與風險指南。

---

## 7. Event Risk Permission Gate

建立事件風險交易許可閘門。

建議函數：

```cpp
bool EventRiskAllowsNewTrade();
bool EventRiskAllowsBuy();
bool EventRiskAllowsSell();
bool EventRiskAllowsPositionManagement();
string GetEventRiskPermissionText();
```

EventRiskAllowsNewTrade() 必須檢查：

- EnableNewsEventFilter
- Manual News Blackout
- Recurring Event Window
- Pre-News Cooldown
- Post-News Cooldown
- High Volatility Event Guard
- Session Event Risk Mode
- Spread Guard
- AdaptiveRiskThrottle
- PortfolioGovernance
- LiveSafetyGuard
- RiskController

要求：

- 本模組只能限制或降低風險
- 不得繞過既有安全 Gate
- 不得強制開倉
- 不得干擾既有持倉管理

---

## 8. Strategy Tester Compatible Event Simulation

建立回測用事件模擬框架。

建議 Input：

```cpp
input bool EnableTesterEventSimulation = false;
input int TesterEventStartHour = 20;
input int TesterEventEndHour = 21;
input bool TesterEventBlockNewTrades = true;
```

建議函數：

```cpp
bool IsTesterEventSimulationActive();
string GetTesterEventSimulationStatus();
```

用途：

- 在 Strategy Tester 中模擬新聞禁交易時段
- 可優化事件過濾參數
- 不依賴外部新聞資料

---

## 9. Event Risk Dashboard Extension

將事件風險整合至 Dashboard。

建議函數：

```cpp
string GetDashboardEventRiskText();
```

Dashboard 顯示：

- News Filter Enabled
- Active News Blackout
- Pre-News Cooldown
- Post-News Cooldown
- High Volatility Event
- Event Risk Mode
- Event Permission Status
- Active Event Window

不得造成 Chart Object 過度刷新。

---

## 10. Event Risk Logger Integration

將事件風險整合至 Logger。

建議函數：

```cpp
void LogEventRiskStatus();
void LogEventBlockedTrade(string direction, string reason);
void LogEventRiskModeChange();
```

記錄：

- Time
- Symbol
- Event Risk Mode
- Active Window
- Spread
- ATR Status
- Trade Direction
- Block Reason
- Permission Decision

Optimization 模式下避免大量輸出。

---

# 主程式整合

## OnInit()

加入：

1. 初始化 NewsEventRiskFilter
2. 驗證手動 News Blackout Window 格式
3. 初始化 Recurring Event Windows
4. 初始化 Tester Event Simulation
5. 輸出 Event Risk Summary
6. 保留 Module 0 ~ Module 20 初始化流程

若參數格式有嚴重錯誤：

```cpp
return INIT_PARAMETERS_INCORRECT;
```

或依設計以警告模式繼續啟動。

---

## OnTick()

建議流程：

1. EmergencyStop Check
2. CanManageExistingPositions()
3. BreakEven / TrailingStop 管理既有持倉
4. NewsEventRiskFilter.Update / Evaluate
5. EventRiskAllowsNewTrade()
6. PortfolioGovernance.GlobalExposureAllowsNewTrade()
7. LiveSafetyGuard.CanOpenNewTrade()
8. RiskController.IsTradingAllowed()
9. SessionFilter.IsTradingAllowed()
10. SignalEngine
11. StrategyFramework 計算 Buy / Sell Score
12. StrategyAnalytics.UpdateAnalytics()
13. AdaptiveRiskThrottle.Evaluate
14. StrategyActivationController 判定 Buy / Sell Activation
15. EventRiskAllowsBuy / EventRiskAllowsSell
16. ControlledExecutionGate Evaluate
17. 若允許下單：
    - MoneyManagement 計算手數
    - OrderManager 執行
18. Dashboard.Update()
19. PerformanceMetrics.Update()

若 EventRiskAllowsNewTrade() 為 false：

- 禁止新倉
- Logger 記錄原因
- Dashboard 顯示事件風險狀態
- 仍允許管理既有持倉

---

## Logger 整合

Logger 應記錄：

- Event Risk Mode
- Active News Window
- Event Cooldown Status
- High Volatility Event Status
- Blocked Trade Reason
- Tester Event Simulation Status

Optimization 模式下避免大量輸出。

---

## OnDeinit()

建議輸出：

- EA Name
- Version
- Event Risk Summary
- Last Event Risk Mode
- Last Block Reason
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
- 不使用外部新聞 API
- 不使用 WebRequest()
- 不使用 DLL
- 不使用外部 exe
- 不依賴本機特定檔案路徑
- 不干擾既有持倉管理
- 不強制關閉非本 EA 持倉
- 不造成過度 Print
- 不造成過度 Chart Object 更新

---

# 嚴格禁止

禁止：

- OrderSend()
- DLL
- 外部 exe
- WebRequest()
- 網路 API
- 偽代碼
- // TODO
- 未完成函數
- 破壞 Module 0 ~ Module 20 架構
- 在對話框完整列印全部程式碼
- 產生無法編譯的程式碼
- 新聞過濾模組繞過 RiskController
- 新聞過濾模組繞過 LiveSafetyGuard
- 新聞過濾模組繞過 PortfolioGovernance
- 新聞高風險時段仍無條件開倉
- 自動抓取外部新聞資料造成 MQL5 Market 相容性風險

---

# 交付要求

請直接生成：

```text
XAUUSD_Quant_Pro_v1_Module21_NewsEventRiskFilter.mq5
```

交付方式：

- 提供可下載 mq5 檔案
- 不列印完整程式碼
- 保證 0 Errors
- 保證 0 Warnings

---

# 驗收標準

本階段完成後應達成：

- Module 21 News / Event Risk Filter Framework 完成
- Manual News Blackout Windows 完成
- Recurring Event Time Windows 完成
- Pre-News / Post-News Cooldown 完成
- High Volatility Event Guard 完成
- Session Event Risk Mode 完成
- XAUUSD High Impact Event Guide 完成
- Event Risk Permission Gate 完成
- Strategy Tester Event Simulation 完成
- Event Risk Dashboard Extension 完成
- Event Risk Logger Integration 完成
- 0 Errors
- 0 Warnings

形成：

```text
News / Event Risk Filter Framework v1
```

---

# 下一階段預告

完成 Step 17 後，下一步建議進入：

## Step 18：Module 22 Advanced Exit & Trade Lifecycle Governance Framework

內容：

- Partial Close Framework
- Time-Based Exit
- Signal-Based Exit Upgrade
- ATR-Based Exit
- Trade Aging Control
- Exit Reason Analytics
- Full Trade Lifecycle Governance
