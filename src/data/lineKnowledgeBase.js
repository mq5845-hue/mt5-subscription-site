export const lineKnowledgeBase = {
  metadata: {
    title: 'LINE 知識庫與源代碼工廠願景',
    description:
      'AI-Quant Lab 的 LINE AI 客服知識庫與源代碼工廠願景頁，完整說明 25 組商業級模組、知識治理與創新循環。',
  },
  heroStats: [
    {
      value: '25',
      label: '商業級模組，從底座到發佈完整串起來',
    },
    {
      value: '0',
      label: 'Errors / Warnings，讓可交付成為起點而不是口號',
    },
    {
      value: 'B2B2C',
      label: '商業授權模式，讓源碼可以被經營、被品牌化、被再創業',
    },
  ],
  pillars: [
    {
      key: 'knowledge',
      title: '知識力',
      text: '把複雜的 MT5 EA 工程，整理成 LINE 上可以即問即答的知識結構，讓每一次提問都能更快接近真相。',
    },
    {
      key: 'innovation',
      title: '創新力',
      text: '把提示詞重構、模組重組、版本演進與案例回饋，變成一個會持續生長的學習系統，而不是一次性的 FAQ。',
    },
    {
      key: 'business',
      title: '事業力',
      text: '讓用戶不只學會使用源碼，更能把源碼變成產品、品牌、授權與訂閱收入，形成自己的商業飛輪。',
    },
    {
      key: 'safety',
      title: '安全力',
      text: '整個品牌堅持純軟體技術工廠定位，不報牌、不代操、不碰資金，主控權與資金都留在使用者手上。',
    },
  ],
  narrative: [
    {
      key: 'act-1',
      title: '第一幕：把混亂變成結構',
      text: '市面上最缺的不是策略名詞，而是能被理解、被驗證、被交接的工程結構。知識庫要先把模組、流程與責任邊界說清楚。',
    },
    {
      key: 'act-2',
      title: '第二幕：把結構變成系統',
      text: '25 個模組不是孤立零件，而是從執行、風控、發布、營運到治理的完整生命週期。每個模組都能被定位，整體就能被管理。',
    },
    {
      key: 'act-3',
      title: '第三幕：把系統變成事業',
      text: '當源碼可授權、可重新命名、可再封裝，使用者就不只是學員，而是能夠擁有自己的產品、訂閱網站與數位資產的創業者。',
    },
  ],
  modulePhases: [
    {
      phase: '基礎與執行',
      range: 'Module 0 - 4',
      summary: '把環境、資料流、倉位與訂單控制住，讓系統先能穩定跑起來。',
      items: [
        {
          id: 'm0',
          name: 'Module 0 BaseConfig',
          role: '基礎環境配置',
        },
        {
          id: 'm1',
          name: 'Module 1 NewBarDetector',
          role: '新 K 線偵測器',
        },
        {
          id: 'm2',
          name: 'Module 2 MoneyManagement',
          role: '資金與倉位管理',
        },
        {
          id: 'm3',
          name: 'Module 3 OrderManager',
          role: '訂單執行管理',
        },
        {
          id: 'm4',
          name: 'Module 4 BreakEven',
          role: '保本損平機制',
        },
      ],
    },
    {
      phase: '保護與訊號',
      range: 'Module 5 - 9',
      summary: '讓獲利有保護、讓訊號有入口、讓風控有邊界、讓日誌可追溯。',
      items: [
        {
          id: 'm5',
          name: 'Module 5 TrailingStop',
          role: '移動止損追蹤',
        },
        {
          id: 'm6',
          name: 'Module 6 SignalEngine',
          role: '策略訊號引擎',
        },
        {
          id: 'm7',
          name: 'Module 7 SessionFilter',
          role: '交易時段過濾',
        },
        {
          id: 'm8',
          name: 'Module 8 RiskController',
          role: '極端風險控制器',
        },
        {
          id: 'm9',
          name: 'Module 9 Logger',
          role: '高精度日誌系統',
        },
      ],
    },
    {
      phase: '產品化與教學',
      range: 'Module 10 - 14',
      summary: '把策略做成看得懂、學得會、交得出去的商業產品。',
      items: [
        {
          id: 'm10',
          name: 'Module 10 Dashboard',
          role: '圖表 UI 面板',
        },
        {
          id: 'm11',
          name: 'Module 11 Strategy Framework',
          role: '策略擴充框架',
        },
        {
          id: 'm12',
          name: 'Module 12 Backtest & Optimization Framework',
          role: '回測與 AI 參數優化框架',
        },
        {
          id: 'm13',
          name: 'Module 13 MQL5 Market Packaging Framework',
          role: 'MQL5 市場商業封裝框架',
        },
        {
          id: 'm14',
          name: 'Module 14 Product Manual & Release Kit',
          role: '產品說明書與發佈套件',
        },
      ],
    },
    {
      phase: '上線與營運',
      range: 'Module 15 - 19',
      summary: '從 QA、上線防護、受控啟動到績效分析與節流，建立可營運的實盤節奏。',
      items: [
        {
          id: 'm15',
          name: 'Module 15 QA / Validation / Final Pre-Release Framework',
          role: '交付前最終 QA 驗證',
        },
        {
          id: 'm16',
          name: 'Module 16 Live-Safety / Deployment Guard Framework',
          role: '實盤上線安全防禦網',
        },
        {
          id: 'm17',
          name: 'Module 17 Strategy Activation & Controlled Trading Framework',
          role: '策略受控激活交易',
        },
        {
          id: 'm18',
          name: 'Module 18 Strategy Performance Analytics Framework',
          role: '策略績效即時分析',
        },
        {
          id: 'm19',
          name: 'Module 19 Adaptive Risk & Strategy Throttle Framework',
          role: '自適應風險與策略節流器',
        },
      ],
    },
    {
      phase: '治理與發佈',
      range: 'Module 20 - 24',
      summary: '把多品種、多實例、新聞風險、出場治理與容錯修復，整合成商業級發佈候選版本。',
      items: [
        {
          id: 'm20',
          name: 'Module 20 Portfolio / Multi-Instance Governance Framework',
          role: '多品種/多策略投資組合治理',
        },
        {
          id: 'm21',
          name: 'Module 21 News / Event Risk Filter Framework',
          role: '重大新聞與財經事件過濾器',
        },
        {
          id: 'm22',
          name: 'Module 22 Advanced Exit & Trade Lifecycle Governance Framework',
          role: '高級出場與訂單生命週期治理',
        },
        {
          id: 'm23',
          name: 'Module 23 Robustness / Recovery / Fault-Tolerance Framework',
          role: '系統魯棒性、異常修復與容錯框架',
        },
        {
          id: 'm24',
          name: 'Module 24 Final Integration / Commercial Release Candidate Framework',
          role: '最終整合與商業發佈候選版本',
        },
      ],
    },
  ],
  workflowSteps: [
    {
      step: '01',
      title: '先收斂問題',
      text: '使用者在 LINE 丟出的問題，先被辨識成「策略 / 產品 / 訂閱 / 風控 / 學習」其中一類，避免答案跑偏。',
    },
    {
      step: '02',
      title: '再對應模組',
      text: '每個問題都能對回 25 個模組中的一個或多個層級，讓回答有依據、有結構，而不是憑感覺。',
    },
    {
      step: '03',
      title: '輸出可執行下一步',
      text: '答案最後要回到行動，例如看哪一章、試哪個模組、下載哪份文件、或直接進入訂閱流程。',
    },
    {
      step: '04',
      title: '把回饋變成更新',
      text: '常見提問、誤解點與高頻需求會回流到知識庫，推動文案、教學與模組說明持續升級。',
    },
  ],
  knowledgeTaxonomy: [
    {
      category: '產品理解',
      description: '幫助使用者理解 AI-Quant Lab 的產品型態、授權範圍與商業定位。',
      topics: ['源代碼工廠', '授權與轉售', '訂閱方案', 'B2B2C 商業模式'],
    },
    {
      category: '模組知識',
      description: '把 25 組模組整理成可查找、可引用、可追蹤的知識層級。',
      topics: ['基礎與執行', '保護與訊號', '產品化與教學', '上線與營運', '治理與發佈'],
    },
    {
      category: 'FAQ 回答',
      description: '適合 LINE 自動回覆與客服使用，讓常見問題先被穩定回答。',
      topics: ['是否綁定券商', '是否適合零基礎', '回測與風控', '如何升級授權'],
    },
    {
      category: '創新迴路',
      description: '把用戶回饋、問答熱度與內容更新，變成持續進化的知識循環。',
      topics: ['提示詞重構', '版本更新', '案例回饋', '內容優化'],
    },
  ],
  faqBlueprints: [
    {
      id: 'broker-binding',
      question: '訂閱方案後，需要綁定特定外匯券商才能使用 EA 策略嗎？',
      answer:
        '不需要。平台定位是純軟體技術工廠，支援任何可使用 MT5 的券商，重點在於源碼、模組與授權，不在於資金託管。',
      tags: ['券商', 'MT5', '授權'],
    },
    {
      id: 'beginner-friendly',
      question: '零基礎的新手適合使用這套 MQL5 原始碼課程嗎？',
      answer:
        '適合。知識庫的設計會先用淺顯語言解釋概念，再對應到模組與實作步驟，讓新手能沿著路線圖前進。',
      tags: ['零基礎', '教學', '入門'],
    },
    {
      id: 'plan-difference',
      question: '標準會員與加盟會員的差異是什麼？',
      answer:
        '標準會員偏向學習與體驗；加盟會員則解鎖更完整的源碼、模板與可商業化的模組組合能力。',
      tags: ['方案', '會員', '比較'],
    },
    {
      id: 'risk-control',
      question: '策略是否包含風控機制與回測驗證？',
      answer:
        '是，核心內容會持續把回測、風控、部署與 QA 納入知識庫，確保內容不只是漂亮，而是可驗證、可交付。',
      tags: ['回測', '風控', 'QA'],
    },
  ],
  faqFamilies: [
    {
      familyId: 'family-product',
      familyName: '產品理解家族',
      node: '產品定位與商業願景',
      intro:
        '這一族負責把「這是什麼」說清楚，讓使用者先理解品牌與產品的邊界，再進入更深的模組與授權知識。',
      questions: [
        {
          id: 'p01',
          question: 'AI-Quant Lab 的核心產品到底是什麼？',
          answer:
            '核心產品是商業級 MT5 EA 模組化源代碼、課程內容與可延伸的知識庫系統，而不是單一策略包。',
        },
        {
          id: 'p02',
          question: '為什麼要把它稱為「源代碼工廠」？',
          answer:
            '因為它強調可重組、可升級、可製造的流程，而不是只交付固定成品；用戶可以把模組當積木組裝成自己的版本。',
        },
        {
          id: 'p03',
          question: '這個品牌和一般 EA 教學有什麼不同？',
          answer:
            '一般教學偏單一案例，這裡則是從環境、訊號、風控、上線、治理一路到商業發佈，形成完整生命週期。',
        },
        {
          id: 'p04',
          question: '為什麼要做 LINE 知識庫？',
          answer:
            '因為 LINE 是高頻對話入口，適合把模糊問題先收斂成結構化提問，再快速導向正確的模組與資料。',
        },
        {
          id: 'p05',
          question: '這套系統主要幫助哪一類使用者？',
          answer:
            '適合想學 MQL5、想經營訂閱產品、想把源碼做成品牌，或想把技術內容商業化的人。',
        },
        {
          id: 'p06',
          question: '為什麼強調 25 個模組？',
          answer:
            '因為 25 個模組剛好涵蓋從底層配置到最終商業發佈的完整路徑，足以支撐一個可擴充的商業系統。',
        },
        {
          id: 'p07',
          question: '我不會寫程式也看得懂嗎？',
          answer:
            '看得懂。知識庫會先給你語意，再給你模組，再給你行動步驟，讓你從理解開始，不必先變成工程師。',
        },
        {
          id: 'p08',
          question: '內容是偏教學還是偏產品？',
          answer:
            '兩者兼具。教學是讓你學會，產品是讓你能用，知識庫則是把兩者串成可持續營運的系統。',
        },
        {
          id: 'p09',
          question: '這些內容會更新嗎？',
          answer:
            '會，知識庫本身就是活的，會隨著常見問題、模組升級與版本迭代持續演進。',
        },
        {
          id: 'p10',
          question: '我應該先從哪裡開始看？',
          answer:
            '先看產品定位，再看模組地圖，最後看 FAQ 與工作流，這樣最容易形成完整認知。',
        },
      ],
    },
    {
      familyId: 'family-modules',
      familyName: '模組知識家族',
      node: '25 模組生命週期',
      intro:
        '這一族負責把每個模組的角色、順序與依賴說清楚，讓使用者知道哪一層是底座、哪一層是治理。',
      questions: [
        {
          id: 'm01',
          question: 'Module 0 BaseConfig 在整體系統中扮演什麼角色？',
          answer: '它是基礎環境配置，負責把執行所需的初始條件先建立好。',
        },
        {
          id: 'm02',
          question: '新 K 線偵測器為什麼重要？',
          answer: '因為策略的很多決策都建立在新 bar 的誕生上，它是許多 EA 執行節奏的起點。',
        },
        {
          id: 'm03',
          question: '資金與倉位管理要先看懂什麼？',
          answer: '先看風險比例、部位大小與帳戶保護原則，再看實作細節。',
        },
        {
          id: 'm04',
          question: '訂單執行管理和訊號引擎有什麼差別？',
          answer: '訊號引擎決定要不要做，訂單管理決定怎麼做、何時成交、如何處理異常。',
        },
        {
          id: 'm05',
          question: '保本損平與移動止損有什麼先後？',
          answer: '通常先定義風險保護邏輯，再決定獲利後如何推進止損。',
        },
        {
          id: 'm06',
          question: 'SessionFilter 是用來解決什麼問題？',
          answer: '它限制策略只在預定交易時段內啟動，避免不必要的低品質交易。',
        },
        {
          id: 'm07',
          question: 'RiskController 與日誌系統怎麼搭配？',
          answer: '風控負責阻擋風險，日誌負責留下證據，兩者一起讓問題可追溯。',
        },
        {
          id: 'm08',
          question: 'Dashboard 對使用者有什麼價值？',
          answer: '它把複雜資訊視覺化，讓策略狀態、交易狀態與流程狀態更容易理解。',
        },
        {
          id: 'm09',
          question: '為什麼後段會出現 QA、部署與治理？',
          answer: '因為商業級系統不只要能跑，還要能交付、能上線、能維護。',
        },
        {
          id: 'm10',
          question: '最終整合版本代表什麼？',
          answer: '代表模組已經串成一個可商業發佈的版本，而不是只有零散功能。',
        },
      ],
    },
    {
      familyId: 'family-license',
      familyName: '授權與訂閱家族',
      node: '商業模式與權益',
      intro:
        '這一族負責把購買、授權、升級、轉售與品牌化講清楚，讓使用者知道買到後可以怎麼用。',
      questions: [
        {
          id: 'l01',
          question: '買斷後可以改名嗎？',
          answer: '在商業授權允許的範圍內，可以把產品重新命名並建立自己的品牌。',
        },
        {
          id: 'l02',
          question: '可以把源碼拿去做自己的訂閱網站嗎？',
          answer: '可以，這正是 B2B2C 的核心思路之一。',
        },
        {
          id: 'l03',
          question: '可不可以轉售？',
          answer: '可以在授權條件內進行再販售、再包裝或二次商業化。',
        },
        {
          id: 'l04',
          question: '訂閱與買斷差在哪？',
          answer: '訂閱適合持續接收更新，買斷適合一次性取得完整授權與長期使用權。',
        },
        {
          id: 'l05',
          question: '我能不能自己做品牌課程？',
          answer: '可以，系統的目標之一就是讓你把學會的內容再品牌化。',
        },
        {
          id: 'l06',
          question: '授權範圍會限制券商嗎？',
          answer: '不會綁定特定券商，重點是技術與授權，而不是資金託管。',
        },
        {
          id: 'l07',
          question: '可以自己改策略再賣嗎？',
          answer: '可以，只要符合授權條件，你可以進一步重構、包裝與推廣。',
        },
        {
          id: 'l08',
          question: '訂閱後會拿到什麼？',
          answer: '通常包含教學、源碼、模板、更新與知識庫導覽權限。',
        },
        {
          id: 'l09',
          question: '權利會隨著版本更新嗎？',
          answer: '會，知識庫會持續說明每個版本對應的使用權與升級內容。',
        },
        {
          id: 'l10',
          question: '這套模式最大的商業價值是什麼？',
          answer: '它把「學習」變成「創業入口」，讓知識可以直接轉成資產。',
        },
      ],
    },
    {
      familyId: 'family-safety',
      familyName: '風控與安全家族',
      node: '真實世界中的穩定性',
      intro:
        '這一族負責把風險、驗證、保護與修復講清楚，讓系統在真實世界中能持續、穩定地運作。',
      questions: [
        {
          id: 's01',
          question: '為什麼一直強調不報牌、不代操、不碰資金？',
          answer: '因為品牌定位是純軟體技術工廠，重點在工具與知識，不在資金管理。',
        },
        {
          id: 's02',
          question: '風控機制最先要守住什麼？',
          answer: '先守住單筆風險、總風險與極端情況下的停損條件。',
        },
        {
          id: 's03',
          question: '回測是不是就等於能實盤？',
          answer: '不是。回測是驗證的一部分，實盤還需要 QA、部署守護與異常修復。',
        },
        {
          id: 's04',
          question: '為什麼要有新聞事件過濾器？',
          answer: '因為重大事件會改變市場環境，過濾器可以降低策略在高不確定性時段的風險。',
        },
        {
          id: 's05',
          question: '策略節流器的作用是什麼？',
          answer: '它在風險升高或品質下降時降低策略節奏，避免過度交易。',
        },
        {
          id: 's06',
          question: '多品種或多實例要怎麼治理？',
          answer: '需要先建立投資組合層級的治理邏輯，再分配到各個實例。',
        },
        {
          id: 's07',
          question: '容錯框架能解決哪些問題？',
          answer: '它幫助處理斷線、異常資料、執行失敗與恢復流程。',
        },
        {
          id: 's08',
          question: '高級出場治理有什麼意義？',
          answer: '它讓出場不是隨機行為，而是完整的生命週期管理。',
        },
        {
          id: 's09',
          question: 'QA 驗證為什麼放在上線前？',
          answer: '因為它是交付前最後一道品質保護線，確保版本穩定且一致。',
        },
        {
          id: 's10',
          question: '商業發佈候選版本代表什麼？',
          answer: '代表它已經通過整合與驗證，接近可以正式推向市場的狀態。',
        },
      ],
    },
  ],
  answerFramework: [
    {
      title: '先判斷問題類型',
      text: '先辨識使用者是在問產品、模組、授權、風控還是操作流程，避免回答偏題。',
    },
    {
      title: '先給一句人話',
      text: '先用白話把重點講完，讓新手能先抓到方向，再往技術層深入。',
    },
    {
      title: '再對應模組節點',
      text: '把答案接回 25 個模組之一，讓知識可以被索引、被追溯、被延伸。',
    },
    {
      title: '最後給下一步',
      text: '回答不能只停在解釋，要告訴對方接下來應該看哪一段、做哪一件事。',
    },
    {
      title: '保留升級入口',
      text: '若問題超出 FAQ 範圍，就導向更高階的知識頁、模組頁或人工客服。',
    },
    {
      title: '形成可回流資料',
      text: '把高頻問題、錯誤理解與新需求記錄下來，作為下一輪內容優化依據。',
    },
    {
      title: '維持品牌口徑',
      text: '所有回答都回到純軟體技術工廠定位，避免與代操、報牌或資金託管混淆。',
    },
    {
      title: '鼓勵再創作',
      text: '當使用者理解後，鼓勵其把內容重新組合成自己的產品、課程或品牌。',
    },
  ],
  customerServiceArchitecture: {
    title: 'LINE 官方帳號客服 AI 架構',
    subtitle: '把 FAQ、知識庫、AI 導引與人工客服串成同一條服務鏈',
    layers: [
      {
        id: 'L1',
        name: '入口層',
        description: '使用者從 LINE 官方帳號發問，先進入訊息接收與身份識別。',
      },
      {
        id: 'L2',
        name: '分流層',
        description: '辨識問題類型，先判斷是 FAQ、模組、授權、帳務或例外事件。',
      },
      {
        id: 'L3',
        name: '知識層',
        description: '從 knowledge base、FAQ 家族與模組資料中找出對應答案。',
      },
      {
        id: 'L4',
        name: 'AI 回答層',
        description: '由 AI 用人話整理答案、補足脈絡，並給出下一步建議。',
      },
      {
        id: 'L5',
        name: '轉接層',
        description: '高風險、低信心、需人工判斷的問題直接交給真人客服。',
      },
      {
        id: 'L6',
        name: '回流層',
        description: '將常見問題、未解問題與新知識回寫到資料庫，形成持續迭代。',
      },
    ],
  },
  serviceModes: [
    {
      mode: '模式一',
      name: '規則式自動回覆',
      summary: '用關鍵字、分類與標準答案快速處理高頻問題。',
      bestFor: ['訂閱資訊', '基本功能', '導覽入口', '固定 FAQ'],
      advantage: '回覆快、成本低、穩定度高。',
    },
    {
      mode: '模式二',
      name: 'AI 知識導引',
      summary: '用語意理解、知識檢索與上下文整理，回答較複雜的問題。',
      bestFor: ['模組解釋', '比較差異', '使用建議', '情境問答'],
      advantage: '能處理更自然的提問，答案更有脈絡。',
    },
  ],
  handoffRules: [
    {
      id: 'h01',
      trigger: '涉及退款、爭議、金流或帳務異常',
      action: '立即轉人工',
    },
    {
      id: 'h02',
      trigger: 'AI 信心不足或查無答案',
      action: '先給保守答案，再提示轉人工',
    },
    {
      id: 'h03',
      trigger: '客製開發、商務合作、授權談判',
      action: '轉業務或專人對接',
    },
    {
      id: 'h04',
      trigger: '風控、法務、敏感投資爭議',
      action: '轉人工並保留紀錄',
    },
  ],
  knowledgeOps: [
    {
      title: '收集問題',
      text: '從 LINE 對話與客服紀錄蒐集高頻提問。',
    },
    {
      title: '標註分類',
      text: '把每個問題標成產品、模組、授權、風控或帳務。',
    },
    {
      title: '更新答案',
      text: '把標準答案、延伸說明與注意事項同步更新。',
    },
    {
      title: '觀察命中率',
      text: '追蹤自動回覆命中率與人工轉接率。',
    },
    {
      title: '回流迭代',
      text: '將未覆蓋問題補進 FAQ 家族與知識庫。',
    },
  ],
};

export default lineKnowledgeBase;
