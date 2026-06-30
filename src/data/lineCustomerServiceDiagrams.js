export const lineCustomerServiceDiagrams = {
  metadata: {
    title: 'LINE 客服正式流程圖與系統圖',
    description:
      'AI-Quant Lab 的 LINE 客服知識庫視覺化交付稿，包含流程圖、系統圖與資料流，方便工程師、客服與內容團隊同步理解。',
  },
  summary: {
    premise:
      '這不是單純的 FAQ 頁，而是一套可以被 LINE 官方帳號、Webhook、AI 回答引擎與人工客服共同使用的服務系統。',
    designPrinciples: [
      '先分類，再回答',
      '先命中知識，再生成內容',
      '高風險問題一律交棒人工',
      '每一次對話都要回寫分析紀錄',
    ],
  },
  processFlow: [
    {
      id: '01',
      title: '使用者提問',
      detail: '使用者透過 LINE 傳來問題、關鍵字、圖片或追問。',
      output: '產生原始訊息事件',
    },
    {
      id: '02',
      title: '意圖分類',
      detail: '系統判定問題屬於產品理解、模組查詢、授權、技術支援或轉人工。',
      output: '輸出意圖與信心分數',
    },
    {
      id: '03',
      title: '知識檢索',
      detail: '從 FAQ 家族、模組知識、規格書或 Flex 模板中找出最適合的答案骨架。',
      output: '回傳候選知識節點',
    },
    {
      id: '04',
      title: '答案生成',
      detail: 'AI 根據節點內容、品牌語氣與安全規則，組合成可直接回覆的答案。',
      output: '生成可發送訊息',
    },
    {
      id: '05',
      title: '風險判定',
      detail: '若屬於投資建議、資金操作、法律敏感、低信心或重複失敗問題，立即轉人工。',
      output: '決定自動回覆或人工接手',
    },
    {
      id: '06',
      title: '紀錄與回饋',
      detail: '每次問答都寫入日誌、標記命中率、補充缺口，供後續優化知識庫。',
      output: '形成持續改善閉環',
    },
  ],
  systemLayers: [
    {
      layer: 'L1',
      name: 'LINE 前台入口',
      detail: '官方帳號、Rich Menu、關鍵字、深層連結、Flex Message。',
      nodes: ['使用者訊息', '按鈕點擊', '追蹤來源'],
    },
    {
      layer: 'L2',
      name: 'Webhook 與訊息路由',
      detail: '接收事件、驗證簽章、標準化訊息格式，並送往分類引擎。',
      nodes: ['事件驗證', '訊息標準化', '路由分派'],
    },
    {
      layer: 'L3',
      name: '知識與推理中樞',
      detail: 'FAQ 家族、規格書、模組知識、回答骨架、檢索與排序邏輯。',
      nodes: ['FAQ 家族', '模組知識', '回答骨架', '排序規則'],
    },
    {
      layer: 'L4',
      name: '安全與升級控制',
      detail: '風險詞、低信心、敏感問題、超時問題與人工轉接規則。',
      nodes: ['敏感詞規則', '信心門檻', '轉人工條件'],
    },
    {
      layer: 'L5',
      name: '營運與分析層',
      detail: '日誌、統計、FAQ 缺口、問題熱點、轉接率與改善建議。',
      nodes: ['日誌系統', '命中率分析', '內容缺口'],
    },
  ],
  dataFlow: [
    {
      id: 'A',
      title: '輸入層',
      detail: '文字、圖片、按鈕、追問、回覆來源。',
    },
    {
      id: 'B',
      title: '處理層',
      detail: '分類、檢索、組合、審核、輸出。',
    },
    {
      id: 'C',
      title: '輸出層',
      detail: '自動回覆、Flex Message、FAQ 引導、人工交接。',
    },
    {
      id: 'D',
      title: '回饋層',
      detail: '日誌、評分、標記缺口、訓練下一版知識庫。',
    },
  ],
  engineeringNotes: [
    '流程圖優先對齊客服經驗，而不是只對齊技術模組。',
    '系統圖要讓工程師看得出哪一層可以替換，哪一層必須保留。',
    '資料流圖的重點是把每個事件寫清楚，方便後續串接 webhook 與分析儀表板。',
  ],
  mermaid: {
    flowchart: `flowchart LR
  U[使用者提問] --> I[意圖分類]
  I --> K[知識檢索]
  K --> A[答案生成]
  A --> R{風險判定}
  R -->|低風險| S[自動回覆]
  R -->|高風險/低信心| H[轉人工]
  S --> L[紀錄與回饋]
  H --> L`,
    system: `flowchart TB
  subgraph L1[LINE 前台入口]
    A1[官方帳號 / Rich Menu / Flex]
  end
  subgraph L2[Webhook 與路由]
    B1[事件驗證]
    B2[訊息標準化]
  end
  subgraph L3[知識與推理中樞]
    C1[FAQ 家族]
    C2[模組知識]
    C3[回答骨架]
  end
  subgraph L4[安全與升級控制]
    D1[敏感詞規則]
    D2[信心門檻]
    D3[人工轉接]
  end
  subgraph L5[營運與分析層]
    E1[日誌]
    E2[命中率]
    E3[缺口分析]
  end
  A1 --> B1 --> B2 --> C1
  B2 --> C2
  C1 --> C3
  C2 --> C3
  C3 --> D1 --> D2 --> D3
  D3 --> E1
  C3 --> E1
  E1 --> E2 --> E3`,
  },
};

export default lineCustomerServiceDiagrams;
