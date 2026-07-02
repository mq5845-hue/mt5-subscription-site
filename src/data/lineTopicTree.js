const makeNode = (node) => node;

export const topicTreeBlueprint = {
  title: '第一波主題樹',
  description:
    '這一批先收最常被第一時間問到的問題，目標不是一次塞滿 1000+，而是先把高頻意圖、白話回答、技術補充與導流出口整理成可持續擴充的骨架。',
  expansionRules: [
    '先收高頻問題，再補同義問法與情境問法。',
    '每一題都保留新手版、技術版、願景版三種深度。',
    '每一題都至少留一個可點選下一步，不逼訪客打長文。',
    '每個主題家族都能再長出子節點，之後直接往 1000+ 擴充。',
  ],
  families: [
    {
      id: 'family-about',
      title: '認識我們',
      summary: '第一眼最常問：你們是誰、在做什麼、和一般軟體服務有什麼不同。',
    },
    {
      id: 'family-start',
      title: '如何開始',
      summary: '訪客最常想知道：要先看哪裡、怎麼走下一步、要不要先懂技術。',
    },
    {
      id: 'family-safety',
      title: '安全與邊界',
      summary: '金融類品牌一定會先問：是不是代操、安不安全、會不會碰資金。',
    },
    {
      id: 'family-code',
      title: '原始碼與模組',
      summary: '對技術型訪客來說，最在意的是原始碼、模組架構、是否可擴充。',
    },
    {
      id: 'family-subscription',
      title: '訂閱與預約',
      summary: '真正想買的人通常會問：怎麼加入、何時開放、現在是不是先預約。',
    },
    {
      id: 'family-line',
      title: 'LINE 導流與回覆',
      summary: '大家會想知道：LINE 會回什麼、能不能直接點選、為什麼不叫我一直打字。',
    },
    {
      id: 'family-growth',
      title: '願景與更新',
      summary: '品牌認同型的訪客，常會追問：之後會長成什麼樣子、會不會持續更新。',
    },
  ],
};

export const topicTreeFamilies = topicTreeBlueprint.families;

export const topicTreeNodes = [
  makeNode({
    id: 'topic-01',
    familyId: 'family-about',
    familyTitle: '認識我們',
    question: 'AI-Quant Lab 是做什麼的？',
    aliases: ['你們是誰', '關於你們', '品牌介紹', '簡單介紹', 'about us'],
    priority: 120,
    newbie:
      'AI-Quant Lab 是一個聚焦 MQL5 原始碼研發、AI 模組化提示詞工程與量化技術教學的品牌。我們把複雜內容整理成能讀、能學、能延伸的知識系統。',
    technical:
      '從系統角度看，我們把內容做成「知識庫 + 模組化積木 + LINE 回覆系統」的結構，方便持續擴充與維護。',
    vision:
      '我們希望把量化與 AI 教學做成一個可持續生長的品牌系統，讓人不只是看到答案，而是看懂路線與方法。',
    cta: '想先看全貌，可以直接點選「品牌故事」或回官網。',
  }),
  makeNode({
    id: 'topic-02',
    familyId: 'family-about',
    familyTitle: '認識我們',
    question: '你們比較像工程團隊，還是教學品牌？',
    aliases: ['工程團隊', '教學品牌', '你們是工程師嗎', '你們是老師嗎'],
    priority: 110,
    newbie:
      '我們比較像「把技術說人話」的品牌：既有工程思維，也有教學整理能力，重點是讓內容好懂、好找、好延伸。',
    technical:
      '內容形式上同時包含原始碼、規格、圖解、FAQ 與回覆模板，所以不是單一角色，而是一套整合式內容工廠。',
    vision:
      '我們想把工程、教學與品牌敘事串在一起，讓使用者一進來就知道這裡的價值不只是回答問題而已。',
    cta: '如果你想先看定位，可以直接點選「功能說明」。',
  }),
  makeNode({
    id: 'topic-03',
    familyId: 'family-about',
    familyTitle: '認識我們',
    question: '你們和一般投資群組有什麼不同？',
    aliases: ['跟投資群有什麼不同', '差別在哪', '和別人不一樣嗎'],
    priority: 108,
    newbie:
      '我們不是拉群、喊單或代操，而是把技術、架構和知識整理給你看，讓你自己判斷要不要往下學。',
    technical:
      '內容輸出以原始碼、模組、回覆模板與導覽頁為主，核心是知識交付與系統化整理，不是交易指令。',
    vision:
      '我們想建立的是一個透明、有秩序、能持續長大的技術品牌，而不是單純的訊息群組。',
    cta: '如果你在意邊界與安全，先點「安全嗎」最適合。',
  }),
  makeNode({
    id: 'topic-04',
    familyId: 'family-start',
    familyTitle: '如何開始',
    question: '我現在應該先看哪一頁？',
    aliases: ['先看哪裡', '從哪開始', '新手先看什麼', '導覽'],
    priority: 118,
    newbie:
      '如果你是第一次進來，建議先看首頁，再看 LINE 知識庫入口，接著再看主題樹或 FAQ 擴充頁。',
    technical:
      '最順的路徑通常是：首頁定位 → FAQ 快問快答 → 主題樹 → 模組頁 → 預約名單。',
    vision:
      '我們希望你不是只看到一個頁面，而是順著路線慢慢看懂整個品牌。',
    cta: '可以直接點選「功能說明」讓我帶你走下一步。',
  }),
  makeNode({
    id: 'topic-05',
    familyId: 'family-start',
    familyTitle: '如何開始',
    question: '我需要先懂 Python 或 MQL5 嗎？',
    aliases: ['零基礎', '不會寫程式', '程式底子', 'MQL5 基礎', 'Python 基礎'],
    priority: 116,
    newbie:
      '不需要一開始就很會寫程式。我們會把內容拆成白話、圖解和步驟，先讓你看懂，再慢慢進到技術層。',
    technical:
      '學習路徑會先從結構、模組、參數與回測觀念開始，再逐步碰到 MQL5 實作與提示詞調整。',
    vision:
      '我們希望降低門檻，讓更多人能從看懂開始，再進一步把知識變成自己的能力。',
    cta: '如果你是新手，可以直接點選「新手導覽」。',
  }),
  makeNode({
    id: 'topic-06',
    familyId: 'family-start',
    familyTitle: '如何開始',
    question: '有沒有入門教學或導覽？',
    aliases: ['導覽', '新手導覽', '教學', '怎麼開始', '入門'],
    priority: 112,
    newbie:
      '有，我們把導覽寫成手機也好讀的版本，先讓你知道每個入口是做什麼的。',
    technical:
      '導覽會依照程度分層，先看白話說明，再往模組、模板與規格書前進。',
    vision:
      '我們希望你不是被資訊淹沒，而是一步一步找到自己的閱讀節奏。',
    cta: '可以先點「新手導覽」，我會帶你看下一層。',
  }),
  makeNode({
    id: 'topic-07',
    familyId: 'family-safety',
    familyTitle: '安全與邊界',
    question: '你們有做代操或投顧嗎？',
    aliases: ['代操', '投顧', '跟單', '幫我操作', '幫我下單'],
    priority: 130,
    newbie:
      '沒有，我們是純軟體技術與教學品牌，不代操、不保證獲利，也不經手客戶資金。',
    technical:
      '我們交付的是原始碼、教學、知識庫與技術說明，主控權和交易決策都在使用者自己手上。',
    vision:
      '我們要建立的是透明、可理解、可驗證的技術品牌，而不是黑盒式服務。',
    cta: '如果你在意安全界線，可以直接點選「安全嗎」。',
  }),
  makeNode({
    id: 'topic-08',
    familyId: 'family-safety',
    familyTitle: '安全與邊界',
    question: '資金是放在你們那邊嗎？',
    aliases: ['資金放哪', '錢在哪裡', '會不會碰我的錢'],
    priority: 126,
    newbie:
      '不會，資金一直都在你自己的券商帳戶裡，不會交到我們手上。',
    technical:
      '我們不提供代管資金的服務，系統主要是技術交付、內容教學與回覆導引。',
    vision:
      '把主控權留在使用者手上，才是我們認為健康的合作起點。',
    cta: '如果你想先看邊界說明，點「安全嗎」最直接。',
  }),
  makeNode({
    id: 'topic-09',
    familyId: 'family-safety',
    familyTitle: '安全與邊界',
    question: '這樣會不會有風險？',
    aliases: ['風險', '安全嗎', '會虧錢嗎', '可靠嗎'],
    priority: 124,
    newbie:
      '任何交易都有風險，所以我們會先把邊界講清楚，讓你知道哪些是技術、哪些是決策。',
    technical:
      '我們提供的是系統與教學，不替你做保證，也不替你承擔交易風險。',
    vision:
      '誠實地講清楚風險，反而更容易建立長期信任。',
    cta: '如果你想知道我們怎麼看邊界，點「品牌故事」也可以。',
  }),
  makeNode({
    id: 'topic-10',
    familyId: 'family-code',
    familyTitle: '原始碼與模組',
    question: '你們說的原始碼是什麼？',
    aliases: ['source code', '源代碼', '源碼', '原始碼'],
    priority: 125,
    newbie:
      '原始碼就是你看得到、改得動、能拿來學的完整程式內容，不是只能按按鈕的黑盒子。',
    technical:
      '我們的交付重點是可讀、可維護、可延伸的程式骨架，方便你後續改寫或整合。',
    vision:
      '我們希望讓技術變成可累積的資產，而不是看完就丟的一次性內容。',
    cta: '如果你要看交付規格，可以點選「工程師規格書」。',
  }),
  makeNode({
    id: 'topic-11',
    familyId: 'family-code',
    familyTitle: '原始碼與模組',
    question: '25 組模組化積木架構是怎麼組成的？',
    aliases: ['模組', '積木', '架構', '圖解樹', '正式圖解樹'],
    priority: 121,
    newbie:
      '你可以把它想成一套樂高積木：每個模組負責一塊功能，拼起來就是完整的量化系統。',
    technical:
      '架構會涵蓋基礎設定、風控、下單、止損、訊號、回測、部署與商業化包裝，適合分段學、分段改。',
    vision:
      '這不是只看一張圖而已，而是把知識整理成可以一路往上長的地圖。',
    cta: '想看整張圖，可以直接點選「正式圖解樹」。',
  }),
  makeNode({
    id: 'topic-12',
    familyId: 'family-code',
    familyTitle: '原始碼與模組',
    question: '每個模組可以單獨看嗎？',
    aliases: ['單獨看', '一個模組', '逐個看', '模組頁'],
    priority: 111,
    newbie:
      '可以，每個模組都有自己的頁面，方便你先看懂重點，再回頭看整體。',
    technical:
      '我們刻意把內容拆頁，讓每個模組都能獨立維護，這樣更新比較穩，也比較好找。',
    vision:
      '讓使用者先看見一小塊，再慢慢拼成全貌，這樣的學習路徑比較不會累。',
    cta: '想看模組總覽，可直接點「模組化積木」。',
  }),
  makeNode({
    id: 'topic-13',
    familyId: 'family-subscription',
    familyTitle: '訂閱與預約',
    question: '現在要怎麼加入？',
    aliases: ['怎麼買', '怎麼加入', '加入會員', '預約名單', '訂閱'],
    priority: 128,
    newbie:
      '目前以預約和導流為主，先看懂內容，再決定要不要加入預約名單。',
    technical:
      '這樣做可以先確認需求是否匹配，降低溝通成本，也讓後續正式開放更順。',
    vision:
      '先把有興趣的人接住，再讓完整內容慢慢建立信任，是我們想做的方式。',
    cta: '想先卡位的話，直接點選「加入預約名單」。',
  }),
  makeNode({
    id: 'topic-14',
    familyId: 'family-subscription',
    familyTitle: '訂閱與預約',
    question: '現在是正式開放了嗎？',
    aliases: ['正式版', '測試版', '現在能買嗎', '有開放嗎'],
    priority: 117,
    newbie:
      '目前還在測試與優化中，所以我們會先以預約名單和點選式導流為主。',
    technical:
      '這個階段的目的，是把知識庫、回覆路徑與導流結構先磨順。',
    vision:
      '我們寧願把節奏放穩，也不要急著上線一個不夠完整的版本。',
    cta: '如果你想等正式通知，可以先點「加入預約名單」。',
  }),
  makeNode({
    id: 'topic-15',
    familyId: 'family-subscription',
    familyTitle: '訂閱與預約',
    question: '要怎麼預約正式版？',
    aliases: ['預約正式版', '搶先體驗', '正式版預約', '先幫我留名單'],
    priority: 114,
    newbie:
      '直接點選「加入預約名單」就可以，我們會把正式開放的消息優先通知你。',
    technical:
      '先用名單收集興趣，再依序安排通知與後續導流，是目前最穩的過渡方式。',
    vision:
      '先保留名額，等正式開放再回來，這樣大家的節奏會更舒服。',
    cta: '如果你要先卡位，就直接點「加入預約名單」。',
  }),
  makeNode({
    id: 'topic-16',
    familyId: 'family-line',
    familyTitle: 'LINE 導流與回覆',
    question: '為什麼 LINE 不要叫我一直打字？',
    aliases: ['不要打字', '按鈕', '點選', '快速回覆', '選單'],
    priority: 129,
    newbie:
      '因為訪客一旦要打太多字，常常就懶得繼續了，所以我們優先用點選方式。',
    technical:
      '點選式導流能降低流失率，也更適合手機情境，尤其是初次接觸的人。',
    vision:
      '我們想把流程做得像真人陪走，而不是像問卷在逼人填資料。',
    cta: '如果你要直接看可點選內容，回「功能說明」就好。',
  }),
  makeNode({
    id: 'topic-17',
    familyId: 'family-line',
    familyTitle: 'LINE 導流與回覆',
    question: 'LINE 會回我哪些內容？',
    aliases: ['會回什麼', '回答哪些', '能問什麼'],
    priority: 113,
    newbie:
      '會先回最常見的白話問題，像是你們是誰、怎麼開始、要不要先預約名單。',
    technical:
      '同一題會依內容深度分層，從新手版一路延伸到技術版與願景版。',
    vision:
      '我們希望每次回覆都能多接住一點疑慮，而不是只丟一個很短的答案。',
    cta: '你可以先按一個預設問題試看看。',
  }),
  makeNode({
    id: 'topic-18',
    familyId: 'family-line',
    familyTitle: 'LINE 導流與回覆',
    question: '什麼是 LINE 回覆分層模板？',
    aliases: ['回覆模板', '分層', '三段式', '層級回覆'],
    priority: 115,
    newbie:
      '它就是把同一個答案拆成白話、技術、願景三種深度，方便不同的人都看得懂。',
    technical:
      '分層模板能讓訊息不會太短，也不會一次塞太滿，還能讓下一步導流更自然。',
    vision:
      '這種設計的目的，是讓回覆像人一樣有節奏、有溫度，也有方向。',
    cta: '如果你想看示意，點選「LINE 回覆分層模板」。',
  }),
  makeNode({
    id: 'topic-19',
    familyId: 'family-growth',
    familyTitle: '願景與更新',
    question: '你們之後還會繼續更新嗎？',
    aliases: ['還會更新嗎', '持續擴充', 'FAQ 會變多嗎', '更新頻率'],
    priority: 109,
    newbie:
      '會，我們會一直補內容，讓 FAQ、主題樹和導覽越來越完整。',
    technical:
      '更新會按高頻問題、導流效果與使用者回饋逐步加進來，不是一次亂堆。',
    vision:
      '我們想把這裡做成一個會長大的內容系統，而不是做完就停的靜態頁。',
    cta: '如果你想看擴充藍圖，點選「FAQ 擴充藍圖」。',
  }),
  makeNode({
    id: 'topic-20',
    familyId: 'family-growth',
    familyTitle: '願景與更新',
    question: '你們的短中長期目標是什麼？',
    aliases: ['短期目標', '中期目標', '長期目標', '願景工程', '希望工程'],
    priority: 122,
    newbie:
      '短期是把導覽、FAQ 和預約名單做順；中期是把模組、模板與知識庫做完整；長期是把整個品牌做成可持續成長的系統。',
    technical:
      '目標順序會從命中率、導流率、內容完整度一路往上做，讓整個系統穩定長大。',
    vision:
      '我們想做的是一個可以持續累積、持續長出價值的希望工程。',
    cta: '如果你想先看故事脈絡，點選「品牌故事」。',
  }),
  makeNode({
    id: 'topic-21',
    familyId: 'family-growth',
    familyTitle: '願景與更新',
    question: '為什麼你們要做 AI-Quant Lab？',
    aliases: ['初衷', '為什麼要做', '創立原因', '品牌故事'],
    priority: 119,
    newbie:
      '因為我們希望把複雜的量化與 AI 內容整理成一般人也能看懂的路線。',
    technical:
      '做這個品牌，是希望把技術、教學與內容管理整合起來，形成可擴充的知識系統。',
    vision:
      '我們想把資訊變成能長期陪伴人的資產，而不是只有一時熱度的說明文。',
    cta: '想看更完整的故事，可以點選「品牌故事」。',
  }),
  makeNode({
    id: 'topic-22',
    familyId: 'family-growth',
    familyTitle: '願景與更新',
    question: '你們希望這個品牌最後變成什麼？',
    aliases: ['最後會變成什麼', '未來會怎樣', '品牌願景'],
    priority: 106,
    newbie:
      '我們希望它變成一個很容易理解、很好找答案、也能持續更新的技術品牌。',
    technical:
      '最終會是一套可複製的內容架構，能把 FAQ、模組頁、導覽和回覆整合在一起。',
    vision:
      '長期來看，我們希望它成為一個讓人願意反覆回來閱讀的知識工廠。',
    cta: '如果你也想先卡位，加入預約名單會比較方便。',
  }),
  makeNode({
    id: 'topic-23',
    familyId: 'family-growth',
    familyTitle: '願景與更新',
    question: '1000+ 主題樹真的做得到嗎？',
    aliases: ['1000+則', '主題樹', '會不會太多', '擴充架構'],
    priority: 107,
    newbie:
      '做得到，但我們不是亂堆數量，而是先從高頻問題開始，再往下長出更多分支。',
    technical:
      '主題樹會以家族、場景、意圖、層級來擴，這樣才有辦法穩定長到 1000+。',
    vision:
      '重點不只是數量，而是讓人每次問都能更靠近答案。',
    cta: '如果你想看架構，直接點選「FAQ 擴充藍圖」。',
  }),
  makeNode({
    id: 'topic-24',
    familyId: 'family-growth',
    familyTitle: '願景與更新',
    question: '如果我只是先看看，不一定要買，可以嗎？',
    aliases: ['先看看', '只是想了解', '只是好奇', '先觀望'],
    priority: 104,
    newbie:
      '可以，先看看完全沒問題。我們本來就想讓你先理解內容，再決定要不要往下。',
    technical:
      '這也是我們設計點選式導流的原因，先接住好奇心，再慢慢往下長。',
    vision:
      '先看懂、先相信，才有機會建立長期關係。',
    cta: '你可以先點「品牌故事」或「功能說明」。',
  }),
];

const topicTreeFamilySynonymRules = {
  'family-about': ['關於我們', '品牌介紹', '你們是誰', '品牌故事', '定位'],
  'family-start': ['新手導覽', '入門', '開始', '閱讀順序', '下一步'],
  'family-safety': ['安全', '邊界', '風險', '代操', '投顧', '資金'],
  'family-code': ['原始碼', '源碼', '模組', '積木', '架構', '圖解樹'],
  'family-subscription': ['預約', '訂閱', '加入', '名單', '開放', '購買'],
  'family-line': ['LINE', '回覆', '快速回覆', '按鈕', '後台', '導流'],
  'family-growth': ['願景', '更新', '擴充', '1000+', '品牌故事', '目標'],
};

export const topicTreeQuestionTemplates = [
  '我想先了解 {topic}。',
  '可以幫我用白話說明 {topic} 嗎？',
  '關於 {topic}，新手該怎麼看？',
  '關於 {topic}，技術上要注意什麼？',
  '如果我在手機上看 {topic}，要先看哪裡？',
  '如果我只是想快速理解 {topic}，要先看什麼？',
  '請問 {topic} 是什麼意思？',
  '請問 {topic} 跟一般人的理解有什麼不同？',
  '請問 {topic} 的重點在哪裡？',
  '請問 {topic} 可以怎麼開始？',
  '有沒有 {topic} 的更簡單說法？',
  '我想看 {topic} 的新手版。',
  '我想看 {topic} 的技術版。',
  '我想看 {topic} 的願景版。',
  '和 {topic} 相關的下一步是什麼？',
  '如果我要往下延伸 {topic}，應該看哪裡？',
  '如果我想繼續看 {topic}，你會怎麼帶我？',
  '關於 {topic}，可以直接給我一個入口嗎？',
  '請問 {topic} 有相關頁面嗎？',
  '請問 {topic} 的閱讀順序是什麼？',
  '可以直接給我 {topic} 的概要嗎？',
  '{topic} 和品牌故事有關嗎？',
  '{topic} 和實際操作有關嗎？',
  '{topic} 和導流流程有關嗎？',
  '{topic} 和原始碼有什麼關係？',
  '{topic} 和模組化有什麼關係？',
  '{topic} 和預約名單有關嗎？',
  '{topic} 和 LINE 回覆有關嗎？',
  '{topic} 和安全邊界有關嗎？',
  '我現在最想先知道 {topic} 的答案。',
  '可以用一段話解釋 {topic} 嗎？',
  '可以用更完整的方式說明 {topic} 嗎？',
  '能不能先從白話開始講 {topic}？',
  '能不能再補一點技術細節到 {topic}？',
  '能不能再補一點品牌願景到 {topic}？',
  '我想先把 {topic} 讀懂。',
  '我想先把 {topic} 看明白。',
  '我想先知道 {topic} 的用途。',
  '我想先知道 {topic} 的定位。',
  '我想先知道 {topic} 的邊界。',
  '我想先知道 {topic} 的後續入口。',
  '我想先知道 {topic} 的閱讀路線。',
  '我想先知道 {topic} 的下一步。',
  '我想先知道 {topic} 的完整說明。',
  '我想先知道 {topic} 的簡版說明。',
];

export const topicTreeAliasTemplates = [
  '{topic}',
  '{topic}是什麼',
  '關於{topic}',
  '了解{topic}',
  '{topic}白話',
  '{topic}技術版',
  '{topic}願景版',
  '{topic}新手版',
  '{topic}下一步',
  '{topic}怎麼開始',
  '{topic}重點',
  '{topic}用途',
  '{topic}定位',
  '{topic}差別',
  '{topic}閱讀順序',
  '{topic}入口',
];

function normalizeForVariant(text) {
  return String(text || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s\p{P}\p{S}]+/gu, '');
}

function deriveCoreTopic(question) {
  const compact = String(question || '')
    .normalize('NFKC')
    .replace(/[？?。！？!]/g, '')
    .replace(/^(請問|我想知道|我想先了解|可以幫我用白話說明|關於|如果我在手機上看|如果我只是想快速理解|如果我要往下延伸|如果我想繼續看|能不能先從白話開始講|能不能再補一點技術細節到|能不能再補一點品牌願景到|我現在最想先知道|我想先把|我想先知道|請幫我|可以用一段話解釋|可以用更完整的方式說明)\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return compact || String(question || '').trim();
}

function buildVariantQuestion(template, topic) {
  return template.replaceAll('{topic}', topic).trim();
}

function buildVariantAliases(node, coreTopic) {
  const familyAliases = topicTreeFamilySynonymRules[node.familyId] || [];
  const aliases = [
    ...(node.aliases || []),
    ...familyAliases,
    ...topicTreeAliasTemplates.map((template) => template.replaceAll('{topic}', coreTopic)),
  ];

  return Array.from(new Set(aliases.filter(Boolean).map((item) => item.trim())));
}

export function buildExpandedTopicTreeNodes(targetCount = 1000) {
  const generated = [];

  for (const baseNode of topicTreeNodes) {
    const coreTopic = deriveCoreTopic(baseNode.question);
    const aliases = buildVariantAliases(baseNode, coreTopic);

    for (let index = 0; index < topicTreeQuestionTemplates.length; index += 1) {
      if (generated.length >= targetCount) {
        return generated;
      }

      const template = topicTreeQuestionTemplates[index];

      generated.push({
        id: `${baseNode.id}-v${String(index + 1).padStart(2, '0')}`,
        sourceId: baseNode.id,
        quickReplySourceId: baseNode.id,
        familyId: baseNode.familyId,
        familyTitle: baseNode.familyTitle,
        question: buildVariantQuestion(template, coreTopic),
        aliases,
        priority: Math.max((baseNode.priority || 0) - 35 - (index % 6), 1),
      });
    }
  }

  return generated;
}

export const topicTreeExpandedEntries = buildExpandedTopicTreeNodes(1080);

export function buildLineBackendFaqText(entries = topicTreeExpandedEntries) {
  const grouped = entries.reduce((acc, entry) => {
    const key = entry.familyTitle || entry.familyId || '未分類';
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(entry);
    return acc;
  }, {});

  const familyOrder = topicTreeBlueprint.families.map((family) => family.title);

  return Object.entries(grouped)
    .sort(([a], [b]) => {
      const aIndex = familyOrder.indexOf(a);
      const bIndex = familyOrder.indexOf(b);

      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b, 'zh-Hant');
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    })
    .map(([familyTitle, familyEntries]) => {
      const block = familyEntries
        .map((entry) =>
          [
            `Q：${entry.question}`,
            `A：${entry.newbie || ''}`,
            `技術補充：${entry.technical || ''}`,
            `願景補充：${entry.vision || ''}`,
            `下一步：${entry.cta || ''}`,
          ].join('\n')
        )
        .join('\n\n');

      return `【${familyTitle}】\n${block}`;
    })
    .join('\n\n');
}

export const topicTreeBackendText = buildLineBackendFaqText(topicTreeExpandedEntries);
