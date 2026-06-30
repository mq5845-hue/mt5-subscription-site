export const lineCustomerServiceSpec = {
  metadata: {
    title: 'LINE 客服 AI 工程規格書',
    description:
      'AI-Quant Lab 的 LINE 官方帳號客服系統工程規格書，涵蓋架構、資料結構、流程、轉人工規則與驗收條件。',
  },
  documentInfo: {
    version: 'v1.0',
    owner: 'AI-Quant Lab',
    audience: ['工程師', '產品經理', '客服營運', 'AI 系統整合'],
    status: 'Draft for Engineering Handoff',
  },
  summary: {
    objective:
      '建立一套能在 LINE 官方帳號中運作的客服 AI 系統，讓 FAQ、自動回覆、知識檢索、AI 導引與人工客服接力協作。',
    businessGoal:
      '降低重複客服成本，提高答覆一致性，並把客戶提問回流為可持續演進的知識資產。',
    nonGoals: [
      '不做投資建議或代操',
      '不處理金流保管',
      '不以 AI 取代所有人工決策',
    ],
  },
  stakeholders: [
    {
      role: '使用者',
      responsibility: '透過 LINE 提問、查詢方案、模組與授權資訊。',
    },
    {
      role: '客服 AI',
      responsibility: '辨識問題、檢索知識、生成答案、必要時轉人工。',
    },
    {
      role: '人工客服',
      responsibility: '處理退款、爭議、帳務、合作與高風險例外事件。',
    },
    {
      role: '知識管理者',
      responsibility: '維護 FAQ、家族譜系、標準答案與版本更新。',
    },
  ],
  functionalRequirements: [
    {
      id: 'FR-01',
      title: '訊息接收',
      description: '系統需接收 LINE 官方帳號的文字訊息與必要的使用者識別資訊。',
    },
    {
      id: 'FR-02',
      title: '問題分類',
      description: '系統需將問題分類為產品、模組、授權、帳務、風控、例外事件等類別。',
    },
    {
      id: 'FR-03',
      title: 'FAQ 命中',
      description: '對於高頻且穩定的問題，系統應優先回覆標準 FAQ。',
    },
    {
      id: 'FR-04',
      title: '知識檢索',
      description: '對於需要上下文的問題，系統應從知識庫與 FAQ 家族譜系中檢索對應內容。',
    },
    {
      id: 'FR-05',
      title: 'AI 導引回答',
      description: '系統可使用 AI 將檢索到的資訊整理成易懂且一致的回覆。',
    },
    {
      id: 'FR-06',
      title: '轉人工',
      description: '當問題屬於高風險、低信心或非標準範圍時，系統需轉人工處理。',
    },
    {
      id: 'FR-07',
      title: '對話回流',
      description: '系統需記錄未命中問題與高頻提問，用於知識庫持續優化。',
    },
  ],
  nonFunctionalRequirements: [
    {
      id: 'NFR-01',
      title: '一致性',
      description: '相同問題應得到一致答案，避免客服口徑不一。',
    },
    {
      id: 'NFR-02',
      title: '可追溯性',
      description: '所有回覆與轉人工動作應能被記錄與追蹤。',
    },
    {
      id: 'NFR-03',
      title: '擴充性',
      description: '未來可加入更多 FAQ 家族、知識節點與回覆模板。',
    },
    {
      id: 'NFR-04',
      title: '安全性',
      description: '系統不得處理違反品牌定位或高風險敏感內容的自動決策。',
    },
  ],
  architecture: [
    {
      layer: 'L1',
      name: '入口層',
      detail: '接收 LINE 訊息、事件與使用者上下文。',
    },
    {
      layer: 'L2',
      name: '分類層',
      detail: '使用規則或模型判斷問題類型與優先級。',
    },
    {
      layer: 'L3',
      name: '知識層',
      detail: '從 FAQ、家族譜系、模組資料、政策文件中檢索答案。',
    },
    {
      layer: 'L4',
      name: '回答層',
      detail: '把檢索結果整理成可讀、可執行、符合品牌口徑的回覆。',
    },
    {
      layer: 'L5',
      name: '轉接層',
      detail: '在信心不足或高風險情況下轉人工。',
    },
    {
      layer: 'L6',
      name: '營運回流層',
      detail: '將新問題、新答案、新規則回寫到知識庫。',
    },
  ],
  dataModel: {
    entities: [
      {
        name: 'Question',
        fields: ['id', 'source', 'text', 'category', 'confidence', 'createdAt'],
      },
      {
        name: 'Answer',
        fields: ['id', 'questionId', 'type', 'content', 'sourceNode', 'version'],
      },
      {
        name: 'KnowledgeNode',
        fields: ['id', 'familyId', 'title', 'summary', 'tags', 'updatedAt'],
      },
      {
        name: 'HandoffEvent',
        fields: ['id', 'questionId', 'reason', 'targetTeam', 'status', 'timestamp'],
      },
      {
        name: 'AuditLog',
        fields: ['id', 'eventType', 'payload', 'actor', 'timestamp'],
      },
    ],
  },
  serviceModes: [
    {
      name: '規則式自動回覆',
      useCase: '固定 FAQ、標準導覽、會員方案、基礎說明',
      flow: ['命中關鍵字', '回傳標準答案', '附上下一步操作'],
    },
    {
      name: 'AI 知識導引',
      useCase: '模組比較、情境問答、概念說明、複合問題',
      flow: ['語意分類', '檢索知識節點', '生成整理版答案', '提示下一步'],
    },
  ],
  handoffRules: [
    {
      trigger: '退款、付款爭議、金流異常',
      action: '立即轉人工',
    },
    {
      trigger: 'AI 信心不足或知識庫無對應節點',
      action: '先保守回覆，再轉人工',
    },
    {
      trigger: '客製開發、合作提案、商務談判',
      action: '轉業務或產品負責人',
    },
    {
      trigger: '法務、風控、敏感投資爭議',
      action: '立即轉人工並記錄事件',
    },
  ],
  conversationFlow: [
    '使用者發問',
    '訊息標準化',
    '問題分類',
    'FAQ / 知識檢索',
    'AI 整理回覆',
    '必要時轉人工',
    '記錄回流',
  ],
  acceptanceCriteria: [
    '常見問題可在 1 次回覆內完成',
    '轉人工規則可被準確觸發',
    '回覆口徑與品牌定位一致',
    '知識節點可持續新增與版本化',
    '系統可輸出可讀取的結構化資料',
  ],
  milestones: [
    {
      phase: 'Phase 1',
      name: '資料結構定義',
      output: '建立 FAQ、家族譜系、知識節點與轉人工規則的資料模型。',
    },
    {
      phase: 'Phase 2',
      name: '回覆引擎',
      output: '完成規則式回覆與 AI 導引回答邏輯。',
    },
    {
      phase: 'Phase 3',
      name: '人工協作',
      output: '完成轉人工、事件紀錄與客服工作台接線。',
    },
    {
      phase: 'Phase 4',
      name: '知識營運',
      output: '完成回流、標註、版本更新與 KPI 追蹤。',
    },
  ],
  risks: [
    '答案口徑不一致',
    '知識庫未及時更新',
    'AI 回答超出授權範圍',
    '高風險問題未及時轉人工',
    '客服與知識庫資料不同步',
  ],
};

export default lineCustomerServiceSpec;
