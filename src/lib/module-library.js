import fs from 'node:fs/promises';
import path from 'node:path';

const moduleEntries = [
  {
    id: 'module-00',
    slug: 'module-00-base-config',
    number: 0,
    title: 'BaseConfig',
    subtitle: '基礎參數與系統預設值',
    summary: '定義 EA 的啟動條件、共用參數、預設風格與整體運作基線。',
  },
  {
    id: 'module-01',
    slug: 'module-01-new-bar-detector',
    number: 1,
    title: 'NewBarDetector',
    subtitle: '新 K 棒偵測',
    summary: '判定新 K 線到來的節奏，作為策略執行與事件觸發的時間錨點。',
  },
  {
    id: 'module-02',
    slug: 'module-02-money-management',
    number: 2,
    title: 'MoneyManagement',
    subtitle: '資金管理',
    summary: '把每一筆交易的風險、部位大小與資金分配規則標準化。',
  },
  {
    id: 'module-03',
    slug: 'module-03-order-manager',
    number: 3,
    title: 'OrderManager',
    subtitle: '下單管理',
    summary: '負責送單、更新、取消與狀態追蹤，讓交易流程更穩定可控。',
  },
  {
    id: 'module-04',
    slug: 'module-04-break-even',
    number: 4,
    title: 'BreakEven',
    subtitle: '保本機制',
    summary: '當策略進入有利區間時，將風險回收至接近零，提升保護力。',
  },
  {
    id: 'module-05',
    slug: 'module-05-trailing-stop',
    number: 5,
    title: 'TrailingStop',
    subtitle: '移動停損',
    summary: '讓停損點跟隨價格延伸，保留趨勢利潤並降低回吐。',
  },
  {
    id: 'module-06',
    slug: 'module-06-signal-engine',
    number: 6,
    title: 'SignalEngine',
    subtitle: '訊號引擎',
    summary: '整合各式進場條件與判斷邏輯，形成可替換的策略核心。',
  },
  {
    id: 'module-07',
    slug: 'module-07-session-filter',
    number: 7,
    title: 'SessionFilter',
    subtitle: '交易時段過濾',
    summary: '根據交易時段、流動性與作息條件，挑選適合出手的時間窗。',
  },
  {
    id: 'module-08',
    slug: 'module-08-risk-controller',
    number: 8,
    title: 'RiskController',
    subtitle: '風險控制',
    summary: '集中管理風險上限、虧損節流與異常狀況下的保護動作。',
  },
  {
    id: 'module-09',
    slug: 'module-09-logger',
    number: 9,
    title: 'Logger',
    subtitle: '事件紀錄',
    summary: '留下每次下單、錯誤、訊號與系統事件，方便除錯與追蹤。',
  },
  {
    id: 'module-10',
    slug: 'module-10-dashboard',
    number: 10,
    title: 'Dashboard',
    subtitle: '資訊儀表板',
    summary: '把重要狀態與運作指標視覺化，讓使用者快速掌握全貌。',
  },
  {
    id: 'module-11',
    slug: 'module-11-strategy-framework',
    number: 11,
    title: 'StrategyFramework',
    subtitle: '策略框架',
    summary: '提供策略抽象層，讓不同交易邏輯可以用相同骨架來組裝。',
  },
  {
    id: 'module-12',
    slug: 'module-12-backtest-optimization-framework',
    number: 12,
    title: 'BacktestOptimizationFramework',
    subtitle: '回測與優化架構',
    summary: '用於回測、參數掃描與策略調整，建立驗證流程的基礎。',
  },
  {
    id: 'module-13',
    slug: 'module-13-mql5-market-packaging-framework',
    number: 13,
    title: 'MQL5MarketPackagingFramework',
    subtitle: 'MQL5 Market 打包',
    summary: '協助整理、封裝與輸出可上市的商業版本與交付格式。',
  },
  {
    id: 'module-14',
    slug: 'module-14-product-manual-release-kit',
    number: 14,
    title: 'ProductManualReleaseKit',
    subtitle: '產品手冊與發布套件',
    summary: '整合教學、說明、發布素材與交付清單，提升產品完成度。',
  },
  {
    id: 'module-15',
    slug: 'module-15-qa-validation-final-pre-release-framework',
    number: 15,
    title: 'QAValidationFinalPreReleaseFramework',
    subtitle: '驗證與發布前檢查',
    summary: '定義驗證流程、檢查節點與 Go / No-Go 之前的準備清單。',
  },
  {
    id: 'module-16',
    slug: 'module-16-livesafety-deployment-guard',
    number: 16,
    title: 'LiveSafetyDeploymentGuard',
    subtitle: '上線安全守門',
    summary: '為實盤部署增加安全保護，避免不必要的直接風險暴露。',
  },
  {
    id: 'module-17',
    slug: 'module-17-strategy-activation-controlled-trading',
    number: 17,
    title: 'StrategyActivationControlledTrading',
    subtitle: '策略啟用與控制交易',
    summary: '把策略啟動、暫停、切換與控制條件整理成一致流程。',
  },
  {
    id: 'module-18',
    slug: 'module-18-strategy-performance-analytics',
    number: 18,
    title: 'StrategyPerformanceAnalytics',
    subtitle: '績效分析',
    summary: '提供交易績效、行為與結果分析，讓優化有據可循。',
  },
  {
    id: 'module-19',
    slug: 'module-19-adaptive-risk-strategy-throttle',
    number: 19,
    title: 'AdaptiveRiskStrategyThrottle',
    subtitle: '自適應風控節流',
    summary: '依據市場狀態調整風險節奏，避免策略在壓力下過度運作。',
  },
  {
    id: 'module-20',
    slug: 'module-20-portfolio-multi-instance-governance',
    number: 20,
    title: 'PortfolioMultiInstanceGovernance',
    subtitle: '多組合與多實例治理',
    summary: '協調多策略、多帳戶或多實例的執行秩序與治理邏輯。',
  },
  {
    id: 'module-21',
    slug: 'module-21-news-event-risk-filter',
    number: 21,
    title: 'NewsEventRiskFilter',
    subtitle: '新聞事件風控過濾',
    summary: '在重大新聞或事件前後降低暴露，提升對突發波動的防護。',
  },
  {
    id: 'module-22',
    slug: 'module-22-advanced-exit-trade-lifecycle-governance',
    number: 22,
    title: 'AdvancedExitTradeLifecycleGovernance',
    subtitle: '進階出場與交易生命週期治理',
    summary: '管理從進場、持有到出場的完整生命週期，讓交易更有秩序。',
  },
  {
    id: 'module-23',
    slug: 'module-23-robustness-recovery-fault-tolerance',
    number: 23,
    title: 'RobustnessRecoveryFaultTolerance',
    subtitle: '韌性、復原與容錯',
    summary: '面對中斷、錯誤或異常時，保有自我修復與恢復能力。',
  },
  {
    id: 'module-24',
    slug: 'module-24-final-integration-commercial-release-candidate',
    number: 24,
    title: 'FinalIntegrationCommercialReleaseCandidate',
    subtitle: '最終整合與商業候選版',
    summary: '完成最終整合、商業化收斂與正式候選版的交付準備。',
  },
];

const releaseCandidateEntries = [
  {
    id: 'rc1',
    slug: 'rc1-validation-testing-plan',
    number: 'RC1',
    title: 'ValidationTestingPlan',
    subtitle: '驗證與測試總規劃',
    summary: '定義 RC1 驗證、回測、前測與 Go / No-Go 的完整流程。',
    sourceNames: ['Step_21_Prompt_RC1_Validation_Testing_Plan'],
  },
];

const entryAliasMap = new Map([
  ['module-00-base-config', ['Step_1_Master_Prompt', 'Master_Prompt_Enterprise_v1.0']],
  ['module-02-money-management', ['Step_2_Prompt_Module2_MoneyManagement_Module3_OrderManager']],
  ['module-03-order-manager', ['Step_2_Prompt_Module2_MoneyManagement_Module3_OrderManager']],
  ['module-04-break-even', ['Step_3_Prompt_Module4_BreakEven_Module5_TrailingStop']],
  ['module-05-trailing-stop', ['Step_3_Prompt_Module4_BreakEven_Module5_TrailingStop']],
  ['module-06-signal-engine', ['Step_4_Prompt_Module6_SignalEngine_Module7_SessionFilter']],
  ['module-07-session-filter', ['Step_4_Prompt_Module6_SignalEngine_Module7_SessionFilter']],
  ['module-08-risk-controller', ['Step_5_Prompt_Module8_RiskController_Module9_Logger']],
  ['module-09-logger', ['Step_5_Prompt_Module8_RiskController_Module9_Logger']],
  ['module-10-dashboard', ['Step_6_Prompt_Module10_Dashboard']],
  ['module-11-strategy-framework', ['Step_7_Prompt_Module11_StrategyFramework']],
  ['module-12-backtest-optimization-framework', ['Step_8_Prompt_Module12_Backtest_Optimization_Framework']],
  ['module-13-mql5-market-packaging-framework', ['Step_9_Prompt_Module13_MQL5_Market_Packaging_Framework']],
  ['module-14-product-manual-release-kit', ['Step_10_Prompt_Module14_Product_Manual_Release_Kit']],
  ['module-15-qa-validation-final-pre-release-framework', ['Step_11_Prompt_Module15_PreRelease_Validation_Framework']],
  ['module-16-livesafety-deployment-guard', ['Step_12_Prompt_Module16_LiveSafety_DeploymentGuard']],
  ['module-17-strategy-activation-controlled-trading', ['Step_13_Prompt_Module17_StrategyActivation_ControlledTrading']],
  ['module-18-strategy-performance-analytics', ['Step_14_Prompt_Module18_StrategyPerformanceAnalytics']],
  ['module-19-adaptive-risk-strategy-throttle', ['Step_15_Prompt_Module19_AdaptiveRisk_StrategyThrottle']],
  ['module-20-portfolio-multi-instance-governance', ['Step_16_Prompt_Module20_Portfolio_MultiInstance_Governance']],
  ['module-21-news-event-risk-filter', ['Step_17_Prompt_Module21_News_Event_Risk_Filter']],
  ['module-22-advanced-exit-trade-lifecycle-governance', ['Step_18_Prompt_Module22_AdvancedExit_TradeLifecycleGovernance']],
  ['module-23-robustness-recovery-fault-tolerance', ['Step_19_Prompt_Module23_Robustness_Recovery_FaultTolerance']],
  ['module-24-final-integration-commercial-release-candidate', ['Step_20_Prompt_Module24_FinalIntegration_CommercialReleaseCandidate']],
  ['rc1-validation-testing-plan', ['Step_21_Prompt_RC1_Validation_Testing_Plan']],
]);

const moduleContentRoots = [
  path.join(process.cwd(), 'src', 'content', 'modules'),
  path.join(process.cwd(), 'content', 'modules'),
];

function getSourceCandidates(entry) {
  const candidates = new Set([entry.slug]);
  const aliases = entryAliasMap.get(entry.slug) || [];

  for (const alias of aliases) {
    candidates.add(alias);
  }

  for (const sourceName of entry.sourceNames || []) {
    candidates.add(sourceName);
  }

  return [...candidates];
}

export function getModuleSourceCandidates(entry) {
  return getSourceCandidates(entry);
}

function readableSourcePath(root, sourceName) {
  return path.join(root, `${sourceName}.md`);
}

export function getModuleEntries() {
  return moduleEntries;
}

export function getReleaseCandidateEntries() {
  return releaseCandidateEntries;
}

export function getModularEntries() {
  return [...moduleEntries, ...releaseCandidateEntries];
}

export function getModuleBySlug(slug) {
  return moduleEntries.find((entry) => entry.slug === slug) || null;
}

export function getLibraryEntryBySlug(slug) {
  return getModularEntries().find((entry) => entry.slug === slug) || null;
}

export async function readModuleSource(entry) {
  const sourceCandidates = getSourceCandidates(entry);

  for (const root of moduleContentRoots) {
    for (const sourceName of sourceCandidates) {
      const filePath = readableSourcePath(root, sourceName);

      try {
        const content = await fs.readFile(filePath, 'utf8');
        return { content, sourcePath: filePath };
      } catch (error) {
        if (error?.code !== 'ENOENT') {
          throw error;
        }
      }
    }
  }

  return {
    content: '',
    sourcePath: '',
  };
}

export function splitModuleContent(content) {
  const normalized = String(content || '').replace(/\r\n/g, '\n').trimEnd();
  const lines = normalized ? normalized.split('\n') : [];

  if (lines.length === 0) {
    return {
      topHalf: '',
      bottomHalf: '',
      lineCount: 0,
    };
  }

  const splitIndex = Math.max(1, Math.ceil(lines.length / 2));

  return {
    topHalf: lines.slice(0, splitIndex).join('\n'),
    bottomHalf: lines.slice(splitIndex).join('\n'),
    lineCount: lines.length,
  };
}
