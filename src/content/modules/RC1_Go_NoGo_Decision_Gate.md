# RC1 Go / No-Go Decision Gate

**Project:** XAUUSD_Quant_Pro_v1  
**Release Candidate:** XAUUSD_Quant_Pro_v1_RC1  
**Version:** 1.0.0-RC1  
**Document Date:** 2026-06-22

---

## 1. Decision Summary

| Field | Value |
|---|---|
| Decision Date | `YYYY-MM-DD` |
| Decision Owner | `填入負責人` |
| EA File | `XAUUSD_Quant_Pro_v1_RC1_Module24_FinalIntegration_CommercialReleaseCandidate.mq5` |
| RC Version | `1.0.0-RC1` |
| Current Decision | ☐ GO ☐ CONDITIONAL GO ☐ NO-GO |
| Primary Reason | `填入摘要` |
| Next Action | `上架準備 / 修復 / RC2 / 延長前測` |

---

## 2. GO Conditions

RC1 可進入上架準備流程，必須同時符合：

| # | GO Requirement | Status | Evidence |
|---:|---|---|---|
| 1 | MetaEditor 0 Errors / 0 Warnings | ☐ Pass ☐ Fail | |
| 2 | Strategy Tester Smoke Test Pass | ☐ Pass ☐ Fail | |
| 3 | 1-Month Quick Backtest Pass | ☐ Pass ☐ Fail | |
| 4 | 3-Year Historical Backtest Completed | ☐ Pass ☐ Fail | |
| 5 | Optimization Small-Range Test Completed | ☐ Pass ☐ Fail | |
| 6 | Demo Forward Test Started | ☐ Pass ☐ Fail | |
| 7 | 無重大 Runtime Error | ☐ Pass ☐ Fail | |
| 8 | 無安全預設問題 | ☐ Pass ☐ Fail | |
| 9 | 無重複下單 | ☐ Pass ☐ Fail | |
| 10 | 無非法手數 / 無效 SLTP | ☐ Pass ☐ Fail | |
| 11 | RiskController 未被繞過 | ☐ Pass ☐ Fail | |
| 12 | LiveSafetyGuard 未被繞過 | ☐ Pass ☐ Fail | |
| 13 | FaultToleranceGuard 正常 | ☐ Pass ☐ Fail | |
| 14 | 不干擾其他 EA 或手動交易 | ☐ Pass ☐ Fail | |
| 15 | MQL5 Market Pre-Check 無重大風險 | ☐ Pass ☐ Fail | |
| 16 | Product Manual Draft 完成 | ☐ Pass ☐ Fail | |
| 17 | Product Page Draft 完成 | ☐ Pass ☐ Fail | |
| 18 | Risk Disclaimer 完成 | ☐ Pass ☐ Fail | |

---

## 3. NO-GO Triggers

任一項觸發即判定 RC1 不可上架，必須回到修復或 RC2 階段。

| # | NO-GO Trigger | Triggered? | Evidence / Fix Priority |
|---:|---|---|---|
| 1 | 任何編譯錯誤或警告 | ☐ Yes ☐ No | |
| 2 | Strategy Tester 無法啟動 | ☐ Yes ☐ No | |
| 3 | 回測中重大 Runtime Error | ☐ Yes ☐ No | |
| 4 | 實盤預設自動下單 | ☐ Yes ☐ No | |
| 5 | RiskController 被繞過 | ☐ Yes ☐ No | |
| 6 | LiveSafetyGuard 被繞過 | ☐ Yes ☐ No | |
| 7 | FaultToleranceGuard 失效 | ☐ Yes ☐ No | |
| 8 | 重複下單 | ☐ Yes ☐ No | |
| 9 | 非法手數 | ☐ Yes ☐ No | |
| 10 | 無效 SL / TP | ☐ Yes ☐ No | |
| 11 | 重大持倉管理錯誤 | ☐ Yes ☐ No | |
| 12 | 會干擾其他 EA 或手動交易 | ☐ Yes ☐ No | |
| 13 | MQL5 Market Validator 高風險不合規 | ☐ Yes ☐ No | |
| 14 | 使用 DLL / 外部 EXE / WebRequest | ☐ Yes ☐ No | |
| 15 | 產品文件缺失核心風險聲明 | ☐ Yes ☐ No | |

---

## 4. Conditional GO Rules

只有在所有 Critical 項目通過，且剩餘問題屬於文件、描述、UI 或低風險警告時，才可判定 Conditional GO。

| Issue Type | Conditional GO Allowed? | Required Action |
|---|---|---|
| 文件措辭需修正 | Yes | 上架前完成 |
| Product Page 圖片未完成 | Yes | 上架前完成 |
| 非交易邏輯 UI 小問題 | Yes | 記入 backlog |
| 少量非關鍵日誌過多 | Maybe | 降低輸出後再測 |
| 任意交易安全 Gate 失效 | No | 必須修復 |
| 任意編譯 Warning | No | 必須修復 |
| 任意 Runtime Critical Error | No | 必須修復 |

---

## 5. Decision Matrix

| Test Area | Weight | Status | Decision Impact |
|---|---:|---|---|
| Compile Evidence | Critical | ☐ Pass ☐ Fail | Fail = NO-GO |
| Smoke Test | Critical | ☐ Pass ☐ Fail | Fail = NO-GO |
| 1-Month Backtest | High | ☐ Pass ☐ Fail | Fail = NO-GO / Fix |
| 3-Year Backtest | High | ☐ Pass ☐ Fail | Fail = Review |
| Optimization Small-Range | Medium | ☐ Pass ☐ Fail | Fail = Conditional / Fix |
| Demo Forward Test | High | ☐ Pass ☐ Fail | Fail = NO-GO if critical |
| Market Pre-Check | Critical | ☐ Pass ☐ Fail | Fail = NO-GO |
| Manual / Product Page | Medium | ☐ Pass ☐ Fail | Fail = Conditional |
| Risk Disclaimer | Critical | ☐ Pass ☐ Fail | Fail = NO-GO |

---

## 6. Final Decision Record

```text
Decision: GO / CONDITIONAL GO / NO-GO

Reason:
- 

Evidence:
- Compile:
- Smoke Test:
- Backtest:
- Optimization:
- Forward Test:
- Market Pre-Check:
- Manual / Product Page:

Required Next Step:
- 
```

---

## 7. Recommended Next Step After Decision

### If GO

- 整理最終 `.mq5` / `.ex5`
- 完成產品手冊
- 完成商品頁文字與截圖
- 保存全部測試報告
- 進入 MQL5 Market 預檢 / 上架準備

### If Conditional GO

- 完成指定非重大項目
- 更新文件與 Product Page
- 再執行 Smoke Test
- 再次召開 Go / No-Go 判定

### If NO-GO

- 建立 Bug / Risk / Improvement Backlog
- 依 Critical → High → Medium → Low 優先修復
- 修復後產生 RC2
- RC2 重新執行 Smoke Test 與必要回測
