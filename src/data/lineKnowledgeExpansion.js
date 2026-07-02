import {
  buildLineBackendFaqText,
  topicTreeBackendText,
  topicTreeBlueprint,
  topicTreeExpandedEntries,
  topicTreeQuestionTemplates,
  topicTreeAliasTemplates,
} from '@/data/lineTopicTree';

export const lineKnowledgeExpansion = {
  metadata: {
    title: 'LINE 知識庫擴充藍圖',
    description:
      'AI-Quant Lab 的 FAQ 1000+ 擴充架構、LINE 回覆分層模板與官網導流閉環文案。',
  },
  tapGuide: {
    title: '點選式導流設計',
    intro:
      '我們不讓訪客硬打長文，而是直接用手指點選下一步。這樣可以降低流失，讓人更自然地往預約、看官網或看品牌故事前進。',
    note:
      '建議 LINE 後台優先使用「按鈕」、「快速回覆」與「預設問題」，不要逼訪客自己提交長篇文字。',
    options: [
      {
        label: '先看功能說明',
        hint: '先了解這裡能做什麼，再決定要不要往下看。',
      },
      {
        label: '先看品牌故事',
        hint: '想知道我們為什麼這樣做，可以先看這一條。',
      },
      {
        label: '加入預約名單',
        hint: '想先卡位，就先保留名額，等正式開放再通知你。',
      },
      {
        label: '回到官網',
        hint: '想看完整內容，可以直接回主站繼續看。',
      },
    ],
  },
  preorderCopy: {
    title: '預約名單導流話術',
    intro:
      '這組文字可以直接放進 LINE 自動回應，重點不是叫訪客輸入很多字，而是讓他們一看到就願意點下一步。',
    items: [
      {
        label: '短版',
        text: '目前網站還在測試與優化中，你可以直接點選「加入預約名單」，等正式開放後我們會優先通知你。',
      },
      {
        label: '自然版',
        text: '現在我們先用點選式導流，讓你快速看懂內容。如果你想先卡位，直接點「加入預約名單」就可以。',
      },
      {
        label: '溫和版',
        text: '如果你現在還想多看一點，沒關係，你可以先點選「先看功能說明」或「先看品牌故事」，看完再決定要不要加入預約名單。',
      },
      {
        label: '轉換版',
        text: '想先保留名額的話，直接點選「加入預約名單」；我們會把正式開放與最新消息優先整理給你。',
      },
    ],
  },
  sections: [
    {
      kicker: '01 / FAQ 1000+ 擴充架構',
      title: '把 FAQ 變成可持續長大的主題樹',
      intro:
        '不是單純把問題堆多，而是把答案分成可維護、可延伸、可回流的知識家族。每個家族都可以再往下長出多個子節點，讓使用者從一句話，慢慢走到一整條路徑。',
      blocks: [
        {
          title: '結構核心',
          text: '以「主題家族 → 子問題 → 回覆層 → 導流層 → 回流層」五層來組織 FAQ，讓每一則問答都有定位，不會彼此打架。',
        },
        {
          title: '擴充方式',
          text: '先把高頻問題做成標準節點，再把同義詞、情境詞與品牌詞掛進 alias。之後再把新問題補進家族，形成 1000+ 的主題樹。',
        },
        {
          title: '維護節奏',
          text: '先補內容缺口，再調整標題與關鍵字，最後才修正導流。這樣可以保持搜尋命中率，也能讓回覆越來越準。',
        },
      ],
      checklist: [
        '新手問題先進入白話層',
        '進階問題再切到技術層',
        '願景問題補上品牌故事層',
        '每次回答都保留下一步入口',
      ],
    },
    {
      kicker: '02 / LINE 回覆分層模板',
      title: '一個問題，三種深度，四段收斂',
      intro:
        '同一則回覆要能服務新手、進階者與想了解品牌的人，所以模板不能只寫一段。它要像階梯，先接住、再補充、再延伸，最後自然導流。',
      blocks: [
        {
          title: '第一層：新手版',
          text: '先回答是什麼、能做什麼、該怎麼開始。這層的目的不是講完，而是讓人先安心。',
        },
        {
          title: '第二層：技術版',
          text: '補上模組、流程、參數、規格與實作細節。這層讓進階者知道系統怎麼運作，也知道如何擴充。',
        },
        {
          title: '第三層：願景版',
          text: '把品牌使命、短中長期目標與希望工程說清楚。這層讓使用者知道，我們不是只在賣答案，而是在做一套可持續成長的系統。',
        },
        {
          title: '第四層：行動收斂',
          text: '最後一定要有 CTA。可以回官網、看圖解樹、看模板、看規格或預約名單，讓對話有出口。',
        },
      ],
      checklist: [
        'Q / A 標籤要固定',
        '每段回覆先短後長',
        '每次都留一個明確下一步',
        '安全、技術、品牌三層並行',
      ],
    },
    {
      kicker: '03 / 官網導流閉環文案',
      title: '從 LINE 到官網，再從官網回到信任',
      intro:
        '導流不是把人踢走，而是把人帶進更完整的內容場景。先在 LINE 接住疑慮，再把人帶回官網看更多細節，最後讓信任慢慢累積，形成可持續的轉換。',
      blocks: [
        {
          title: '短期目標',
          text: '先讓使用者在手機上快速得到答案，降低陌生感與防衛感。',
        },
        {
          title: '中期目標',
          text: '讓使用者回到官網反覆閱讀，逐步看見我們的結構、能力與一致性。',
        },
        {
          title: '長期目標',
          text: '把官網與 LINE 變成一條信任管線，最後自然導向標準會員、加盟會員與更多合作入口。',
        },
      ],
      checklist: [
        '先解答，再引導',
        '先白話，再技術',
        '先建立信任，再談轉換',
        '先讓人想回來，再談加入',
      ],
    },
  ],
  funnelCopy: [
    '你在 LINE 先透過點選按鈕拿到初步答案，先把疑慮放下。',
    '目前網站仍在測試與優化階段，請直接點選「加入預約名單」，等候正式開放。',
    '接著回到官網，看完整架構、模組與知識庫，再決定要不要加入會員。',
  ],
  replyTemplate: {
    newbie:
      '先用一句白話把答案講清楚，讓對方知道這是在做什麼、能幫什麼忙。',
    technical:
      '再補上架構、流程與規格，讓進階者看得懂，也能往下追問。',
    vision:
      '最後補一句品牌故事、目標或未來方向，讓內容有溫度，也有記憶點。',
    cta:
      '最後一定留下一個可點選的下一步，例如：看官網、看圖解樹、看模板、加入預約名單或點選預設問題。',
  },
  announcement:
    '網站目前仍在測試與試錯、排錯、優化階段，歡迎先點選預設問題或加入預約名單，等候正式開放與會員功能上線。',
  topicTreeBlueprint,
  topicTreeExpansion: {
    templates: topicTreeQuestionTemplates,
    aliasTemplates: topicTreeAliasTemplates,
    expandedCount: topicTreeExpandedEntries.length,
    backendText: topicTreeBackendText,
    previewText: buildLineBackendFaqText(topicTreeExpandedEntries.slice(0, 24)),
    note: '完整題庫由生成規則自動擴出，後台可直接使用 Q / A 格式貼上，先用預覽版看結構也可以。',
  },
};

export default lineKnowledgeExpansion;
