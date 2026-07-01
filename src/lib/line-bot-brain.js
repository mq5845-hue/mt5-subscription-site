const siteUrl = 'https://ai-quant-lab.vercel.app';

const knowledgeEntries = [
  {
    id: 'reservation-lead',
    title: '預約正式版',
    keywords: ['我想預約正式版', '預約正式版', '預約名單', '留下email', '留下信箱'],
    reply: `✅ 已收到你的預約意願！

我們會先幫你保留在 AI-Quant Lab（β）種子用戶名單中。

請直接回覆你的 Email，或繼續告訴我們你最想先看的功能，我們會在正式版上線第一時間通知你。`,
  },
  {
    id: 'welcome',
    title: '歡迎詞',
    keywords: ['加入好友', '你好', '開始', '歡迎'],
    reply: `👋 歡迎來到 AI-Quant Lab（β）

我們是「軟體技術工廠」與「AI 量化實驗室」
專注於 MQL5 原始碼研發、模組化積木架構、與 AI 提示詞驅動的程式工程教學。

⚙️ 不報明牌
⚙️ 不帶盤
⚙️ 不提供投資建議
⚙️ 不代操資金

🔗 官網導覽
${siteUrl}

🧭 請點擊下方圖文選單，快速查看方案、教學與技術內容。`,
  },
  {
    id: 'disclaimer',
    title: '防禦性聲明',
    keywords: ['詐騙', '準嗎', '代操', '跟單', '安全嗎'],
    reply: `🛡️ 灰盾牌合規防禦聲明

如果你是因為「詐騙、準嗎、代操、跟單、安全嗎」來到這裡，先幫你快速釐清：

✅ AI-Quant Lab 是純軟體技術商
✅ 內容以程式碼、架構設計與 AI 教學為主
✅ 資金始終在你自己的券商帳戶內
✅ 技術流程透明，權限與掌控都在你手上

我們不接觸你的交易資金
我們不提供代操服務
我們不承諾獲利
我們不做任何形式的跟單誘導

如果有人要求你入金、交出帳戶控制權、或聲稱可保證收益，那都不是 AI-Quant Lab，請務必提高警覺。`,
  },
  {
    id: 'faq1',
    title: '模組化積木',
    keywords: ['模組', '積木', 'module', '架構', '怎麼開發'],
    reply: `🔧 FAQ 1｜什麼是 25 組模組化積木架構？

我們把整套 EA 開發流程拆成 25 組可拼裝模組，就像樂高積木一樣。

從基礎配置（M0）開始，到風控核心（M2 / M8 / M19），再到新聞過濾（M21）與商業發佈（M24），每一塊都能獨立理解、獨立替換、獨立升級。

✅ 不需要重複造輪子
✅ 不用從零重寫整個系統
✅ 可以依照需求快速拼裝成完整 EA
✅ 更接近法人級專案的工程思維`,
  },
  {
    id: 'faq2',
    title: '提示詞重構',
    keywords: ['不會寫程式', '零基礎', '提示詞', 'prompt', '程式碼'],
    reply: `🤖 FAQ 2｜零基礎真的能用「提示詞」重構策略嗎？

可以，而且這正是我們想解決的問題。

你不需要先變成程式高手，才開始接觸 MQL5。
你只要用白話文描述需求，例如：
「我想增加風控條件」
「我想讓進場邏輯更保守」
「我想把訊號改成雙重確認」

接著 AI 就能協助你重構、補強、擴充模組，讓你用更低門檻進入程式設計與策略優化。`,
  },
  {
    id: 'faq3',
    title: '商業源代碼',
    keywords: ['源代碼', '無版權', '買斷', '轉售', '改名'],
    reply: `📦 FAQ 3｜提供「商業源代碼」且「無版權限制」是什麼意思？

意思是你拿到的不是黑盒子軟體，而是可讀、可改、可維護的完整源代碼。

✅ 取得完整技術藍圖
✅ 方便自己修改功能
✅ 可依品牌需求重新命名
✅ 可用於後續技術整合與商業應用

核心重點是：你拿到的是「可控的技術」，不是只能看不能改的封閉工具。`,
  },
  {
    id: 'faq4',
    title: '代操差異',
    keywords: ['代操', '投顧', '飆股', '跟單軟體', '差別'],
    reply: `🧭 FAQ 4｜AI-Quant Lab 與傳統的「投顧代操」有何不同？

差別非常大。

傳統代操的模式是：
資金交給別人，策略在別人手上，黑盒子怎麼跑你不一定知道。

AI-Quant Lab 的模式是：
我們把技術藍圖、程式架構與模組零件交給你，讓你知道系統怎麼運作、怎麼調整、怎麼驗證。

傳統代操 = 你把方向盤交出去
AI-Quant Lab = 你自己握方向盤，並拿到完整維修手冊`,
  },
  {
    id: 'faq5',
    title: '預約制',
    keywords: ['怎麼買', '收費', '訂閱', '預約', 'email', '下載'],
    reply: `💡 FAQ 5｜如何訂閱與獲取這 25 組模組源代碼？

🤖 感謝你的關注！目前 AI-Quant Lab（β 版）正處於系統最終測試與網站功能對接階段。

✨ 【搶先體驗／加入預約名單】
這套完整編譯（0 Errors, 0 Warnings）的 25 組商業級模組源代碼，目前優先開放給首批種子用戶。

如果你想搶先取得買斷授權、觀看課程，或想用這套架構開啟你的數位資產創業，請直接在對話框回覆：「我想預約正式版」，或留下您的 Email，小幫手將會在系統上線第一時間為您發送專屬優惠與下載通知！`,
  },
  {
    id: 'feedback',
    title: '測試回報',
    keywords: ['回報問題', 'bug', '測試'],
    reply: `🧪 β 測試問題回報

目前這是測試階段，歡迎你直接回報任何：
✅ 編譯問題
✅ 頁面顯示異常
✅ 下載或登入流程問題
✅ 教學內容不清楚的地方

你的回報非常重要，會幫我們加速修復與優化。`,
  },
];

const fallbackReply = `🔍 我還在進化中，這個問題我目前還沒完全辨識成功。

但沒關係，你可以先前往官網查看：
${siteUrl}

如果你想更快找到答案，也可以直接輸入：
「功能說明」

我會優先幫你整理成更清楚的版本。`;

function normalizeText(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');
}

function countKeywordHits(text, keywords) {
  const normalized = normalizeText(text);
  return keywords.reduce((count, keyword) => {
    const k = normalizeText(keyword);
    return count + (k && normalized.includes(k) ? 1 : 0);
  }, 0);
}

export function buildLineReply(userText) {
  const scored = knowledgeEntries
    .map((entry) => ({
      ...entry,
      score: countKeywordHits(userText, entry.keywords),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    return scored[0].reply;
  }

  return fallbackReply;
}

export function getKnowledgeEntries() {
  return knowledgeEntries.map(({ id, title, keywords }) => ({ id, title, keywords }));
}
