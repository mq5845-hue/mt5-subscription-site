const siteUrl = 'https://ai-quant-lab.vercel.app';

const knowledgeEntries = [
  {
    id: 'faq-01',
    question: 'AI-Quant Lab 是什麼？',
    keywords: ['ai-quant lab', '你是誰', '你們是誰', '這是什麼', '品牌介紹', '功能說明', '歡迎', '開始'],
    newbie:
      'AI-Quant Lab 是一個以 MQL5 原始碼研發、AI 模組化提示詞工程與量化技術教學為核心的品牌。你可以把它先理解成一座「軟體技術工廠」，重點是把複雜內容說清楚。',
    technical:
      '我們將交易策略、原始碼結構、回測驗證、交付方式與內容更新，整理成一套可維護的技術系統。目的不是賣單點答案，而是建立可持續運作的知識架構。',
    vision:
      '我們希望把量化技術做成可學、可用、可擴充的工程底座，讓使用者不只看見答案，也看見方法、脈絡與下一步。',
    cta: '如果你想先入門，可以回覆「功能說明」或「新手導覽」。',
  },
  {
    id: 'faq-02',
    question: '零基礎真的可以開始嗎？',
    keywords: ['零基礎', '不會寫程式', '新手', '初學者', '入門', '怎麼開始', '可以學嗎'],
    newbie:
      '可以。你不需要先具備深厚的 Python 或 MQL5 背景，也能先從白話說明開始。先理解用途，再逐步理解結構，會更容易上手。',
    technical:
      '我們會用提示詞模板與模組化拆解，把需求分成目標、限制、風控與流程，再逐步對應到策略邏輯與程式骨架。這樣可以降低學習門檻。',
    vision:
      '我們相信，技術不該只屬於少數人。讓更多人能用更低的門檻進入量化與 AI 工程，是這個品牌很重要的起點。',
    cta: '如果你願意，我可以直接幫你整理成「新手版入門路線」。',
  },
  {
    id: 'faq-03',
    question: '什麼是 25 組模組化積木架構？',
    keywords: ['模組', '積木', 'module', '25組', '25 組', '架構', '怎麼開發', 'M0', 'M24'],
    newbie:
      '你可以把它想成一套樂高積木。每個模組都負責一個功能，組在一起，就能慢慢搭出完整的 EA 系統。',
    technical:
      'Module 0 到 Module 24 涵蓋基礎配置、風控、訊號、交易管理、新聞過濾、維運與商業發佈等完整生命週期。重點在於可拆、可換、可擴充。',
    vision:
      '這種架構的價值，不只是方便開發，更是讓系統可以持續演化，最後變成能夠被閱讀、被複製、被延伸的工程資產。',
    cta: '如果你要，我可以再幫你整理成「模組地圖版 FAQ」。',
  },
  {
    id: 'faq-04',
    question: '「商業源代碼」與「無版權限制」是什麼意思？',
    keywords: ['源代碼', '原始碼', '無版權', '買斷', '轉售', '改名', '授權', '商業版'],
    newbie:
      '意思是你拿到的是完整原始碼，而不是只能看不能改的封閉軟體。你可以更清楚地理解內容，也更容易知道自己到底在使用什麼。',
    technical:
      '我們交付的是可編譯、可閱讀、可維護的源碼資產，並可依授權條款進行品牌化應用。重點不是只有「能跑」，而是能持續維護與延伸。',
    vision:
      '當原始碼從一次性產品，變成可沉澱、可再利用的技術資產時，它就有機會進一步發展成教育內容、工具系統或自有品牌服務。',
    cta: '如果你想確認交付邊界，我可以再補一版更白話的說明。',
  },
  {
    id: 'faq-05',
    question: 'AI-Quant Lab 與傳統代操、投顧有何不同？',
    keywords: ['代操', '投顧', '跟單', '差別', '不同', '主控權', '飆股', '安全嗎'],
    newbie:
      '差別很簡單：我們不是代操，也不替你做投資決策。你看到的是技術與教學，不是把資金交給別人處理。',
    technical:
      'AI-Quant Lab 交付的是方法、原始碼與流程，資金與交易主控權始終在使用者手上。透明、可讀、可驗證，是我們的基本原則。',
    vision:
      '我們想把「黑箱跟隨」改成「透明學習」，讓使用者真正理解系統如何運作，而不是只看到最後的結果。',
    cta: '如果你想比較兩者差異，我可以整理成「對比版 FAQ」。',
  },
  {
    id: 'faq-06',
    question: '你們有提供代操、保證獲利或跟單嗎？',
    keywords: ['詐騙', '代操', '保證獲利', '跟單', '安全嗎', '入金', '投顧', '合法嗎'],
    newbie:
      '沒有。凡是要求你代操、入金、保證獲利或私下轉帳的內容，都不屬於 AI-Quant Lab 的服務範圍。',
    technical:
      '我們不經手客戶資金，也不提供投顧式的結果保證。所有內容都以軟體工程、原始碼與技術教學為主，邊界清楚、責任清楚。',
    vision:
      '我們認為，真正可長久的品牌，不是靠模糊承諾，而是靠清楚邊界與穩定價值。這也是我們持續強調合規與透明的原因。',
    cta: '如果你想看安全邊界，我可以直接幫你整理成合規說明版。',
  },
  {
    id: 'faq-07',
    question: '訂閱方案後，如何開始使用？',
    keywords: ['訂閱', '收費', '怎麼買', '預約', '正式版', '下載', '付款', 'Lemon Squeezy'],
    newbie:
      '目前採人工索取與預約制。你可以先留下需求，等正式流程開通後，再依通知進行下一步。',
    technical:
      '當會員驗證、下載流程與付款串接完全完成後，整體使用體驗會更自動化，從預約、開通到交付都會有清楚流程。',
    vision:
      '我們先把真正有興趣的人穩定接住，再逐步升級成完整的數位交付系統。這樣做，能讓服務更穩，也更容易長期經營。',
    cta: '如果你想預約，請回覆「我想預約正式版」。',
  },
  {
    id: 'faq-08',
    question: '如何獲取技術引導與客服支援？',
    keywords: ['客服', '支援', '技術引導', '功能說明', '怎麼問', '找誰', '聯絡', '協助'],
    newbie:
      '你可以直接在 LINE 內提問，或先輸入關鍵字，讓系統帶你到對應主題。這樣比較快，也比較不容易迷路。',
    technical:
      '我們會依問題類型，將內容分流到功能說明、模組架構、訂閱流程、回報機制或安全邊界，讓回答更聚焦，也更好維護。',
    vision:
      '我們希望客服不只是回覆，而是成為學習路徑的導覽員，讓每一個人都能順著自己的理解速度往前走。',
    cta: '如果你不知道從哪裡開始，可以回覆「功能說明」。',
  },
  {
    id: 'faq-09',
    question: '提示詞真的可以協助重構策略嗎？',
    keywords: ['提示詞', 'prompt', '程式碼', '重構', '修改策略', 'ai', '策略', '模板'],
    newbie:
      '可以。先把你想要的功能用白話講出來，AI 就能先幫你整理成較清楚的結構，而不是一開始就要求你寫完整程式。',
    technical:
      'AI 會根據你的需求，協助整理出條件、流程、風控與模組，再回到 MQL5 程式骨架與回測驗證。這能有效縮短試錯時間。',
    vision:
      '這種做法的價值，在於讓不熟程式的人，也能更快參與策略設計與迭代。它不是取代人，而是放大人的理解與組織能力。',
    cta: '如果你要，我可以直接示範一版「提示詞模板」。',
  },
  {
    id: 'faq-10',
    question: '如何回報問題與提供意見？',
    keywords: ['bug', '回報', '問題', '測試', '錯誤', '建議', '回饋', '編譯'],
    newbie:
      '如果你發現錯誤，可以直接把你看到的狀況告訴我們。越清楚的描述，越能幫助我們快速理解問題。',
    technical:
      '若可以，請附上截圖、操作步驟或發生時的情境。這些資訊能幫助我們定位是顯示問題、流程問題，還是內容需要再補強。',
    vision:
      '我們把測試期看成共同打磨系統的階段。每一個回報，都是在幫知識工廠補上更好的結構與路徑。',
    cta: '謝謝你幫我們一起把系統打磨得更完整。',
  },
  {
    id: 'faq-11',
    question: '這套系統會持續更新與擴充嗎？',
    keywords: ['更新', '擴充', '1000', '知識庫', '持續', '演進', '新增', 'FAQ'],
    newbie:
      '會。這不是固定不變的答案集，而是一套會慢慢補強的知識庫，內容會隨著使用者問題持續增加。',
    technical:
      '我們會用主題樹與分層結構持續擴充，讓相近問題能被歸類、合併、再展開，維持可讀性與維護性。',
    vision:
      '目標不是只做 12 則，而是往 100、1000 甚至更多延伸，最後形成一個真正能自我生長的知識系統。',
    cta: '如果你想看擴充路線，可以回覆「擴充規劃」。',
  },
  {
    id: 'faq-12',
    question: '為什麼要做 AI-Quant Lab？',
    keywords: ['為什麼', '願景', '故事', '品牌', '未來', '希望工程', '征途', '工廠'],
    newbie:
      '因為我們相信，技術應該更容易被看懂，也更容易被使用。不是每個人都要從零摸索，才有資格參與。',
    technical:
      '我們想把量化、原始碼與 AI 教學整合成一套能複製、能擴充、能交付的工程系統，讓方法比單點結果更值得被保留。',
    vision:
      '在 AI 狂潮之下，我們希望建立一座能給人方法、也能給人希望的源碼工坊。這不是一個回答系統而已，而是一個品牌長跑。',
    cta: '如果你想看完整故事線，可以回覆「品牌故事」。',
  },
];

const fallbackReply = {
  question: '我還沒完全辨識你的問題',
  newbie:
    '沒關係，你可以先用更白話的方式描述，例如「我想知道怎麼開始」、「我想看模組圖」或「我想了解安全性」。',
  technical:
    '系統會優先比對關鍵字並找出最接近的 FAQ。如果目前沒有完全對應，我會先帶你回到主線主題，避免回答過度發散。',
  vision:
    '我們希望這套知識系統能越來越像一個有秩序的品牌入口，而不是只會丟固定句子的客服機器人。',
  cta: `先看官網：${siteUrl}，或直接輸入「功能說明」。`,
};

function normalizeText(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');
}

function countKeywordHits(text, keywords) {
  const normalized = normalizeText(text);

  return keywords.reduce((count, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    return count + (normalizedKeyword && normalized.includes(normalizedKeyword) ? 1 : 0);
  }, 0);
}

function formatFormalReply(entry) {
  return [
    `Q：${entry.question}`,
    '',
    'A：',
    '',
    `【新手版】${entry.newbie}`,
    '',
    `【技術版】${entry.technical}`,
    '',
    `【願景版】${entry.vision}`,
    '',
    `【下一步】${entry.cta}`,
  ].join('\n');
}

export function buildLineReply(userText) {
  const scored = knowledgeEntries
    .map((entry) => ({
      ...entry,
      score: countKeywordHits(userText, entry.keywords),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const matched = scored[0] || fallbackReply;
  return formatFormalReply(matched);
}

export function getKnowledgeEntries() {
  return knowledgeEntries.map(({ id, question, keywords }) => ({ id, question, keywords }));
}

export function getKnowledgeTitles() {
  return knowledgeEntries.map(({ id, question }) => ({ id, question }));
}
