import { topicTreeExpandedEntries } from '@/data/lineTopicTree';

const siteUrl = 'https://ai-quant-lab.vercel.app';

const defaultQuickReplyItems = [
  { label: '功能說明', text: '功能說明' },
  { label: '新手導覽', text: '新手導覽' },
  { label: '品牌故事', text: '品牌故事' },
  { label: '回官網', uri: siteUrl },
];

const entryQuickReplyMap = {
  'faq-01': [
    { label: '功能說明', text: '功能說明' },
    { label: '品牌故事', text: '品牌故事' },
    { label: '加入預約名單', text: '加入預約名單' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-13': [
    { label: '品牌故事', text: '品牌故事' },
    { label: '功能說明', text: '功能說明' },
    { label: '加入預約名單', text: '加入預約名單' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-02': [
    { label: '新手導覽', text: '新手導覽' },
    { label: '功能說明', text: '功能說明' },
    { label: '技術版', text: '技術版' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-03': [
    { label: '正式圖解樹', text: '正式圖解樹' },
    { label: '功能說明', text: '功能說明' },
    { label: '工程師規格書', text: '工程師規格書' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-04': [
    { label: '工程師規格書', text: '工程師規格書' },
    { label: '功能說明', text: '功能說明' },
    { label: '品牌故事', text: '品牌故事' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-05': [
    { label: '安全嗎', text: '安全嗎' },
    { label: '功能說明', text: '功能說明' },
    { label: '品牌故事', text: '品牌故事' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-06': [
    { label: '新手導覽', text: '新手導覽' },
    { label: '功能說明', text: '功能說明' },
    { label: '預約名單', text: '加入預約名單' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-07': [
    { label: '加入預約名單', text: '加入預約名單' },
    { label: '我想預約正式版', text: '我想預約正式版' },
    { label: '功能說明', text: '功能說明' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-08': [
    { label: '功能說明', text: '功能說明' },
    { label: '目前狀態', text: '目前狀態' },
    { label: '加入預約名單', text: '加入預約名單' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-09': [
    { label: '技術版', text: '技術版' },
    { label: '功能說明', text: '功能說明' },
    { label: '新手導覽', text: '新手導覽' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-10': [
    { label: '問題回報', text: '問題回報' },
    { label: '功能說明', text: '功能說明' },
    { label: '品牌故事', text: '品牌故事' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-11': [
    { label: '主題樹', text: '主題樹' },
    { label: 'FAQ 擴充藍圖', text: 'FAQ 擴充藍圖' },
    { label: '功能說明', text: '功能說明' },
    { label: '回官網', uri: siteUrl },
  ],
  'faq-12': [
    { label: '品牌故事', text: '品牌故事' },
    { label: '功能說明', text: '功能說明' },
    { label: '加入預約名單', text: '加入預約名單' },
    { label: '回官網', uri: siteUrl },
  ],
};

function buildQuickReply(items = defaultQuickReplyItems) {
  const replyItems = items.slice(0, 13).map((item) => {
    if (item.uri) {
      return {
        type: 'action',
        action: {
          type: 'uri',
          label: item.label,
          uri: item.uri,
        },
      };
    }

    return {
      type: 'action',
      action: {
        type: 'message',
        label: item.label,
        text: item.text || item.label,
      },
    };
  });

  return replyItems.length ? { items: replyItems } : undefined;
}

const baseKnowledgeEntries = [
  {
    id: 'faq-01',
    question: 'AI-Quant Lab 是什麼？',
    aliases: [
      'ai-quant lab',
      '你們是誰',
      '關於我們',
      '品牌介紹',
      '品牌故事',
      '功能說明',
      '工程師',
      '程式設計師',
      '公司',
      '團隊',
      '是什麼',
      '介紹一下',
      'about',
      'about us',
    ],
    priority: 100,
    newbie:
      'AI-Quant Lab 是一個聚焦 MQL5 原始碼研發、AI 模組化提示詞工程與量化技術教學的品牌。我們把複雜內容整理成能讀、能學、能延伸的知識系統。短期先把 FAQ、圖解樹與模板做得更清楚，讓人一進來就知道怎麼看、怎麼學。',
    technical:
      '從系統角度看，AI-Quant Lab 不是單一產品，而是一套「模組化知識庫 + 原始碼教學 + 回覆系統」的整合架構，方便持續擴充與維護。中期會持續把模組化積木、LINE 知識庫與網站內容串成同一套可管理的內容引擎。',
    vision:
      '我們希望把量化與 AI 教學做成一個有秩序、可持續成長的品牌系統，讓使用者不只是看答案，而是看懂方法與路徑。長期目標，是把這裡做成一個能持續孵化內容、工具與數位資產的希望工程。',
    cta: `想先看全貌，可以直接到官網：${siteUrl}。如果你想要我帶路，請直接點選「功能說明」或「品牌故事」。`,
  },
  {
    id: 'faq-13',
    question: '關於我們的短中長期目標是什麼？',
    aliases: ['短期', '中期', '遠期', '目標', '願景工程', '希望工程', '初衷', '未來', '品牌故事'],
    priority: 94,
    newbie:
      '短期，我們先把知識庫、FAQ 和導覽做完整，讓你一進來就能快速找到答案。中期，會把模組化積木、模板與工程師規格書做得更好找、更好讀。長期，希望把 AI-Quant Lab 打造成一個能持續成長的技術品牌與數位資產工廠。現在網站仍在測試與優化中，也歡迎你先加入預約名單，等正式開放時第一時間通知你。',
    technical:
      '短期目標是提升知識命中率與回覆清晰度；中期目標是把內容、模組與導覽串成完整的維護流程；長期目標則是形成可複製、可擴充、可交接的品牌系統，讓內容不只可讀，還能持續演進。當前階段仍是測試、試錯與優化，也因此預約名單會是後續正式上線的重要入口。',
    vision:
      '我們想做的不是一次性的內容站，而是一個可以長期累積、持續長出新東西的希望工程。讓新手看懂路線，讓進階者看懂架構，讓有願景的人看見自己也能擁有一套屬於自己的知識與產品系統。若你現在先加入預約名單，就是在替未來正式開放先卡位。',
    cta: '如果你想先看故事脈絡，可以直接點選「品牌故事」；想看結構，就點選「功能說明」；想先等候通知，就點選「加入預約名單」。',
  },
  {
    id: 'faq-02',
    question: '需要 Python 或 MQL5 基礎嗎？',
    aliases: ['python', 'mql5', '零基礎', '不會寫程式', '需要基礎', '程式底子', '新手導覽'],
    priority: 95,
    newbie:
      '不需要先有很深的程式底子。我們會把複雜邏輯拆成白話說明，讓你先看懂流程，再慢慢進到實作。',
    technical:
      '學習路徑會先從模組關聯、參數意義與回測觀念開始，再逐步碰到 MQL5 實作與 AI 提示詞調整。',
    vision:
      '我們想降低門檻，讓更多人可以用更少的時間進入量化與自動化的世界。',
    cta: '如果你是新手，可以直接點選「新手導覽」。',
  },
  {
    id: 'faq-03',
    question: '25 組模組化積木架構是什麼？',
    aliases: ['25組', '25 組', 'module', '模組', '積木', '架構', '正式圖解樹'],
    priority: 90,
    newbie:
      '你可以把它想成一套樂高積木：每個模組負責一個功能，拼起來就能完成完整的量化 EA。',
    technical:
      '這套架構涵蓋基礎設定、風控、下單、止損、訊號、回測、部署與商業化包裝，讓系統可以分段維護。',
    vision:
      '我們要做的是可擴展的知識結構，而不是一次只能看懂一小段的單篇文章。',
    cta: '想看完整對照表，可以打開「正式圖解樹」。',
  },
  {
    id: 'faq-04',
    question: '商業源代碼與無版權限制是什麼意思？',
    aliases: ['源代碼', '無版權', '買斷', '轉售', '改名', '原始碼', '工程師規格書'],
    priority: 92,
    newbie:
      '意思是你拿到的是可讀、可改、可延伸的完整源代碼，不是黑盒子。',
    technical:
      '商業交付重點在於可維護性與可再利用性，讓使用者能依自身需求調整、重構與包裝。',
    vision:
      '我們希望把技術成果變成可長期經營的數位資產，而不是只能一次性使用的工具。',
    cta: '如果你想看交付規格，可以直接點選「工程師規格書」。',
  },
  {
    id: 'faq-05',
    question: 'AI-Quant Lab 和代操、投顧有什麼差別？',
    aliases: ['代操', '投顧', '跟單', '差別', '有什麼不同', '不是代操', '安全嗎'],
    priority: 93,
    newbie:
      '差別很大：我們提供的是技術、源碼與教學，不是幫你拿錢操作。',
    technical:
      '主控權、券商帳戶、交易決策與風險承擔都在使用者手上，這是純軟體與知識交付。',
    vision:
      '我們要建立的是透明、可驗證、可學習的技術品牌，而不是黑盒式的投資服務。',
    cta: '如果你在意安全邊界，可以直接點選「安全嗎」。',
  },
  {
    id: 'faq-06',
    question: '如何開始使用？',
    aliases: ['怎麼開始', '如何開始', '入門', '新手導覽', '開始使用', '功能說明'],
    priority: 88,
    newbie:
      '先從官網和知識庫入口開始看，再依你的程度選擇圖解樹、模板或規格書。',
    technical:
      '建議順序是：先看架構，再看 FAQ，再看模板，最後再處理實作與部署。',
    vision:
      '我們希望你不是只得到一個答案，而是得到一條可以持續前進的學習路線。',
    cta: `先看官網：${siteUrl}，或直接點選「功能說明」讓我幫你導航。`,
  },
  {
    id: 'faq-07',
    question: '如何訂閱或取得內容？',
    aliases: ['怎麼買', '收費', '訂閱', '下載', '購買', '預約', '加入預約名單', '我想預約正式版'],
    priority: 87,
    newbie:
      '目前採預約或導流制，讓你先看懂內容，再決定是否進一步訂閱。你不用打長文，直接點選下一步就可以。',
    technical:
      '這樣做的好處是可以先確認需求是否匹配，降低誤買與溝通成本，也讓後續導流更順。',
    vision:
      '我們希望把有興趣的人先接住，再用完整內容建立長期信任。',
    cta: '如果你想先保留名額，可以直接點選「加入預約名單」或回我「先幫我留預約名單」。',
  },
  {
    id: 'faq-08',
    question: '目前是正式版還是測試版？',
    aliases: ['beta', '測試版', '正式版', '目前狀態', '還在測試嗎', '功能說明'],
    priority: 86,
    newbie:
      '目前仍有部分內容在持續優化中，屬於更新中的階段。',
    technical:
      '這代表我們會持續調整 FAQ 命中、回覆結構與頁面內容，讓系統更穩定。',
    vision:
      '我們寧願慢一點，也要把內容做得更完整、更有秩序。',
    cta: '如果你想看最新功能，可以直接回「功能說明」。',
  },
  {
    id: 'faq-09',
    question: '什麼是提示詞 Prompt？',
    aliases: ['prompt', '提示詞', 'ai prompt', '怎麼下指令', '提示', '技術版'],
    priority: 84,
    newbie:
      '你可以把提示詞想成跟 AI 說話的方式，寫得越清楚，AI 越容易幫你做對事情。',
    technical:
      '在這個系統裡，提示詞會用來重構模組、整理回答層次與優化回覆語氣。',
    vision:
      '我們希望把提示詞從一次性指令，變成可長期管理的工程方法。',
    cta: '想看提示詞的結構，可以直接點選「技術版」。',
  },
  {
    id: 'faq-10',
    question: '遇到問題或 Bug 要怎麼回報？',
    aliases: ['bug', '回報', '錯誤', '問題', '無法使用', '異常', '問題回報'],
    priority: 83,
    newbie:
      '直接把你看到的狀況、截圖和關鍵字傳給我們，我們會優先確認。',
    technical:
      '回報時如果能附上操作步驟、頁面名稱與出錯訊息，會更快定位問題。',
    vision:
      '我們把回報當成改進系統的一部分，而不是麻煩。',
    cta: '回報時可直接點選「問題回報」。',
  },
  {
    id: 'faq-11',
    question: 'FAQ 之後還會繼續擴充嗎？',
    aliases: ['1000', '擴充', '更多faq', '主題樹', '會增加嗎', '延伸', 'FAQ 擴充藍圖'],
    priority: 82,
    newbie:
      '會，而且會慢慢分層擴充，讓不同問題都能找到對應答案。',
    technical:
      '我們的方向是從 12 則 FAQ 逐步擴成主題樹，再把內容拆成更細的節點。',
    vision:
      '知識庫不是固定完成品，而是會跟著品牌一起成長的內容系統。',
    cta: '如果你想看擴充方向，可以直接點選「主題樹」。',
  },
  {
    id: 'faq-12',
    question: '為什麼要做 AI-Quant Lab？',
    aliases: ['為什麼', '理念', '願景', '品牌故事', '初衷', '功能說明'],
    priority: 81,
    newbie:
      '因為我們想把量化、原始碼與 AI 教學整理成一般人也看得懂的內容。',
    technical:
      '從產品設計來看，這是一個結合知識庫、回覆系統與內容工程的品牌專案。',
    vision:
      '我們希望建立的是一個能長久累積、可擴張、能被信任的技術品牌。',
    cta: '如果你想看品牌全貌，可以直接點選「功能說明」。',
  },
];

const knowledgeEntries = [...baseKnowledgeEntries, ...topicTreeExpandedEntries];

const fallbackReply = {
  question: '我還在學習你的問題',
  newbie:
    '我目前會先從最接近的 FAQ 開始找答案。如果你想讓我更準，可以直接點選下方按鈕，不用自己打長文。',
  technical:
    '這個版本的回覆引擎會根據關鍵字與問題相似度配對。若你希望結果更精準，請直接點選預設問題。',
  vision:
    '我們會持續把知識庫擴大，讓機器人的回答越來越像一個有秩序、能引導的品牌入口。',
  cta: `先看官網：${siteUrl}，或直接點選「功能說明」。`,
};

function normalizeText(text) {
  return String(text || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s\p{P}\p{S}]+/gu, '');
}

function countKeywordHits(text, keywords) {
  const normalized = normalizeText(text);

  return keywords.reduce((count, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) return count;
    return count + (normalized.includes(normalizedKeyword) ? 2 : 0);
  }, 0);
}

function detectTone(userText) {
  const normalized = normalizeText(userText);

  if (/(技術|原始碼|架構|模組|mql5|prompt|程式|程式碼)/i.test(normalized)) {
    return 'technical';
  }

  if (/(願景|品牌|故事|理念|初衷|未來)/i.test(normalized)) {
    return 'vision';
  }

  if (/(新手|入門|怎麼開始|如何開始|功能說明|預約|下載|訂閱)/i.test(normalized)) {
    return 'newbie';
  }

  return 'newbie';
}

function pickReplyMode(entry, userText) {
  const normalized = normalizeText(userText);

  if (/(技術版|技術|原始碼|架構|模組|prompt|程式|程式碼)/i.test(normalized)) {
    return 'technical';
  }

  if (/(願景版|願景|品牌|故事|理念|初衷|未來)/i.test(normalized)) {
    return 'vision';
  }

  if (/(新手版|新手|入門|如何開始|怎麼開始|功能說明|預約|下載|訂閱)/i.test(normalized)) {
    return 'newbie';
  }

  return detectTone(entry.question);
}

function formatFormalReply(entry, userText) {
  const replySourceId = entry.quickReplySourceId || entry.sourceId || entry.id;
  const mode = pickReplyMode(entry, userText);
  const answers = {
    newbie: entry.newbie || fallbackReply.newbie,
    technical: entry.technical || fallbackReply.technical,
    vision: entry.vision || fallbackReply.vision,
  };

  const quickReply = buildQuickReply(entryQuickReplyMap[replySourceId]);

  return {
    text: [
      `Q：${entry.question}`,
      '',
      `A：${answers[mode]}`,
      '',
      '下一步：請直接點選下方按鈕，不用自己打長文。',
      '',
      `${entry.cta || fallbackReply.cta}`,
    ].join('\n'),
    quickReply,
    matchedId: entry.id,
    mode,
  };
}

export function buildLineReply(userText) {
  const scored = knowledgeEntries
    .map((entry) => {
      const aliasHits = countKeywordHits(userText, entry.aliases || []);
      const directHits = countKeywordHits(userText, [entry.question, ...(entry.aliases || [])]);
      const priority = entry.priority || 0;

      return {
        ...entry,
        score: aliasHits + directHits + priority,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const matched = scored[0] || fallbackReply;
  return formatFormalReply(matched, userText);
}

export function getKnowledgeEntries() {
  return knowledgeEntries.map(({ id, question, aliases, priority }) => ({
    id,
    question,
    aliases,
    priority,
  }));
}

export function getKnowledgeTitles() {
  return knowledgeEntries.map(({ id, question }) => ({ id, question }));
}
