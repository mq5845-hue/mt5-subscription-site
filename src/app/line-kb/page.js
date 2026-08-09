import { headers } from 'next/headers';
import Link from 'next/link';
import { localizePath } from '../../lib/locale';
import EmojiAvatar from '../../components/EmojiAvatar';

const resourceEmojis = { '/': '🏠', '/line-kb/formal-tree': '🌳', '/line-kb/flex-template': '💬', '/line-kb/spec': '📐', '/line-kb/expansion': '🌱', '/line-kb/backend-export': '📦', '/line-kb/reservation': '📅' };
const knowledgeEmojis = { highlights: ['👋', '🧭', '💡', '🌱', '📤'], story: ['✨', '🤝', '🎯'], expansion: ['🧱', '🎨', '🔄'], process: ['📥', '💬', '📈'] };

const localeCopy = {
  en: {
    metadataTitle: 'Knowledge Base | AI-Quant Lab',
    metadataDescription: 'A practical LINE knowledge base for AI-Quant Lab product guidance, reservations, and response workflows.',
    eyebrow: 'KNOWLEDGE BASE',
    title: 'AI-Quant Lab Knowledge Base',
    lead: 'A structured response system for brand guidance, reservations, product education, and fast customer navigation.',
    badges: ['Public entry', 'FAQ ready', 'Exportable'],
    quickLinks: [
      { href: '/', label: 'Back to home', note: 'Return to the AI-Quant Lab brand homepage and choose the next path.' },
      { href: '/line-kb/formal-tree', label: 'Formal FAQ Tree', note: 'A structured question map for consistent customer support responses.' },
      { href: '/line-kb/flex-template', label: 'Flex Templates', note: 'Reusable LINE message layouts for clear, compact, and actionable replies.' },
      { href: '/line-kb/spec', label: 'Engineering Specification', note: 'The implementation rules behind the knowledge-base response flow.' },
      { href: '/line-kb/expansion', label: 'FAQ Expansion', note: 'A growth framework for expanding the FAQ library without losing consistency.' },
      { href: '/line-kb/backend-export', label: 'Backend Export', note: 'Export the knowledge base as Markdown or JSON for backup and deployment.' },
      { href: '/line-kb/reservation', label: 'Reservation Form', note: 'Connect the customer journey to the Google reservation form.' },
    ],
    highlights: [
      { kicker: '01 / Entry', title: 'Start with the clearest customer path', description: 'Use the homepage, feature guide, brand story, and reservation entry points as a simple first layer for every visitor.' },
      { kicker: '02 / Navigation', title: 'Guide customers with fewer messages', description: 'A clear menu reduces repeated questions and moves each visitor to the right resource without long manual replies.' },
      { kicker: '03 / Flow', title: 'Turn questions into useful next steps', description: 'Pair FAQ answers with compact LINE cards, knowledge links, and reservation actions so every reply has a purpose.' },
      { kicker: '04 / Expansion', title: 'Scale beyond the first FAQ set', description: 'Add new questions through a repeatable structure that keeps tone, routing, and answer quality consistent.' },
      { kicker: '05 / Export', title: 'Keep the knowledge base portable', description: 'Maintain a clean Markdown or JSON export so the content can be backed up, reviewed, and reused across channels.' },
    ],
    journeyEyebrow: 'CUSTOMER JOURNEY',
    journeyTitle: 'One clear route from question to action',
    journeyText: 'The knowledge base is designed as a guided path: understand the brand, explore the right resource, then take the next action with confidence.',
    journeyCardLabel: 'OPEN RESOURCE',
    storyEyebrow: 'WHY THIS STRUCTURE',
    story: [
      { title: 'Clear first contact', text: 'Every visitor should quickly understand what AI-Quant Lab offers and where to begin.' },
      { title: 'Consistent answers', text: 'The same question should receive the same helpful direction across Android, iPhone, and web experiences.' },
      { title: 'Actionable follow-up', text: 'Each answer should end with a useful link, a button, or a reservation path instead of a dead end.' },
    ],
    signals: ['Brand entry is easy to find', 'FAQ routes are organized by intent', 'Buttons lead to the next useful action', 'Content can be exported and maintained'],
    expansionEyebrow: 'GROWTH SYSTEM',
    expansion: [
      { title: 'Reusable answer blocks', text: 'Keep frequently used explanations short, readable, and easy to update.' },
      { title: 'Consistent visual language', text: 'Use the same labels, card hierarchy, and link behavior throughout the LINE experience.' },
      { title: 'Continuous improvement', text: 'Review real questions, add missing routes, and improve the next response without rebuilding the whole system.' },
    ],
    process: [
      { step: '01', title: 'Receive the question', text: 'Identify the visitor intent and route it to the closest FAQ or guided option.' },
      { step: '02', title: 'Give the right context', text: 'Answer in plain language, then provide a focused link or button for the next step.' },
      { step: '03', title: 'Measure and improve', text: 'Review unanswered questions and update the knowledge base so the flow gets stronger over time.' },
    ],
    closingEyebrow: 'READY TO EXPLORE',
    closingTitle: 'Choose a resource and continue the journey',
    open: 'OPEN',
    resource: 'Resource',
  },
  'zh-Hant': {
    metadataTitle: '知識庫 | AI-Quant Lab',
    metadataDescription: 'AI-Quant Lab 的 LINE 知識庫，整理品牌導覽、預約、產品教育與回應流程。',
    eyebrow: '知識庫',
    title: 'AI-Quant Lab知識庫',
    lead: '把品牌導覽、預約、產品教育與客戶回應，整理成清楚、可持續維護的入口。',
    badges: ['公開入口', 'FAQ 就緒', '可匯出'],
    quickLinks: [
      { href: '/', label: '回首頁', note: '回到 AI-Quant Lab 品牌首頁，選擇下一步路徑。' },
      { href: '/line-kb/formal-tree', label: '正式 FAQ 樹', note: '以結構化問題地圖，維持一致的客戶回應。' },
      { href: '/line-kb/flex-template', label: 'Flex 模板', note: '可重複使用的 LINE 訊息版型，讓回覆清楚又精簡。' },
      { href: '/line-kb/spec', label: '工程師規格書', note: '知識庫回應流程背後的實作規則。' },
      { href: '/line-kb/expansion', label: 'FAQ 擴充藍圖', note: '持續擴充 FAQ，同時維持內容一致性。' },
      { href: '/line-kb/backend-export', label: '後台匯出', note: '將知識庫匯出成 Markdown 或 JSON，方便備份與部署。' },
      { href: '/line-kb/reservation', label: '預約表單', note: '將客戶旅程連接到 Google 預約報名表單。' },
    ],
    highlights: [
      { kicker: '01 / 先看懂系統', title: '從最清楚的客戶路徑開始', description: '以首頁、功能說明、品牌故事與預約入口，建立每位訪客都能理解的第一層導覽。' },
      { kicker: '02 / 導覽', title: '用更少訊息帶客戶前進', description: '清楚的選單能減少重複提問，讓訪客不用等待長篇人工回覆。' },
      { kicker: '03 / 流程', title: '把問題轉成有用的下一步', description: '讓 FAQ 答案搭配 LINE 卡片、知識連結與預約動作，每則回覆都有明確目的。' },
      { kicker: '04 / 擴充', title: '從第一批 FAQ 持續成長', description: '透過可重複的結構加入新問題，維持語氣、導流與答案品質。' },
      { kicker: '05 / 匯出', title: '讓知識庫保持可攜', description: '維護乾淨的 Markdown 或 JSON 匯出檔，方便備份、檢查與跨通路使用。' },
    ],
    journeyEyebrow: '客戶旅程',
    journeyTitle: '從提問到行動的一條清楚路徑',
    journeyText: '知識庫是一條有引導的路徑：先理解品牌，再找到適合的資源，最後放心採取下一步。',
    journeyCardLabel: '開啟資源',
    storyEyebrow: '為什麼這樣設計',
    story: [
      { title: '第一次接觸就看懂', text: '每位訪客都應該快速知道 AI-Quant Lab 提供什麼，以及應該從哪裡開始。' },
      { title: '回應保持一致', text: '同一個問題，在 Android、iPhone 與網站體驗中，都應該得到一致且有用的方向。' },
      { title: '回覆一定能行動', text: '每個答案最後都應該有連結、按鈕或預約路徑，而不是讓客戶停在原地。' },
    ],
    signals: ['品牌入口容易找到', 'FAQ 依照意圖整理', '按鈕都導向下一個有用動作', '內容可以匯出與維護'],
    expansionEyebrow: '成長系統',
    expansion: [
      { title: '可重複使用的回答區塊', text: '把常用說明維持短、清楚，而且容易更新。' },
      { title: '一致的視覺語言', text: '在 LINE 體驗中維持相同的標籤、卡片層級與連結行為。' },
      { title: '持續改善', text: '檢查真實提問、補上缺少的路徑，逐步改善下一次回覆。' },
    ],
    process: [
      { step: '01', title: '接收問題', text: '判斷訪客意圖，導向最接近的 FAQ 或引導選項。' },
      { step: '02', title: '提供適當脈絡', text: '用白話回答，再提供聚焦的連結或按鈕作為下一步。' },
      { step: '03', title: '檢查並改善', text: '整理尚未回答的問題，讓知識庫流程持續變得更完整。' },
    ],
    closingEyebrow: '準備開始探索',
    closingTitle: '選擇一項資源，繼續你的旅程',
    open: '開啟',
    resource: '資源',
  },
  'zh-Hans': {
    metadataTitle: '知识库 | AI-Quant Lab',
    metadataDescription: 'AI-Quant Lab 的 LINE 知识库，整理品牌导览、预约、产品教育与回应流程。',
    eyebrow: '知识库',
    title: 'AI-Quant Lab知识库',
    lead: '把品牌导览、预约、产品教育与客户回应，整理成清楚、可持续维护的入口。',
    badges: ['公开入口', 'FAQ 就绪', '可汇出'],
    quickLinks: [
      { href: '/', label: '回首页', note: '回到 AI-Quant Lab 品牌首页，选择下一步路径。' },
      { href: '/line-kb/formal-tree', label: '正式 FAQ 树', note: '以结构化问题地图，维持一致的客户回应。' },
      { href: '/line-kb/flex-template', label: 'Flex 模板', note: '可重复使用的 LINE 消息版型，让回复清楚又精简。' },
      { href: '/line-kb/spec', label: '工程师规格书', note: '知识库回应流程背后的实作规则。' },
      { href: '/line-kb/expansion', label: 'FAQ 扩充蓝图', note: '持续扩充 FAQ，同时维持内容一致性。' },
      { href: '/line-kb/backend-export', label: '后台汇出', note: '将知识库汇出成 Markdown 或 JSON，方便备份与部署。' },
      { href: '/line-kb/reservation', label: '预约表单', note: '将客户旅程连接到 Google 预约报名表单。' },
    ],
    highlights: [
      { kicker: '01 / 先看懂系统', title: '从最清楚的客户路径开始', description: '以首页、功能说明、品牌故事与预约入口，建立每位访客都能理解的第一层导览。' },
      { kicker: '02 / 导览', title: '用更少讯息带客户前进', description: '清楚的选单能减少重复提问，让访客不用等待长篇人工回复。' },
      { kicker: '03 / 流程', title: '把问题转成有用的下一步', description: '让 FAQ 答案搭配 LINE 卡片、知识连结与预约动作，每则回复都有明确目的。' },
      { kicker: '04 / 扩充', title: '从第一批 FAQ 持续成长', description: '透过可重复的结构加入新问题，维持语气、导流与答案品质。' },
      { kicker: '05 / 汇出', title: '让知识库保持可携', description: '维护干净的 Markdown 或 JSON 汇出档，方便备份、检查与跨通路使用。' },
    ],
    journeyEyebrow: '客户旅程',
    journeyTitle: '从提问到行动的一条清楚路径',
    journeyText: '知识库是一条有引导的路径：先理解品牌，再找到适合的资源，最后放心采取下一步。',
    journeyCardLabel: '开启资源',
    storyEyebrow: '为什么这样设计',
    story: [
      { title: '第一次接触就看懂', text: '每位访客都应该快速知道 AI-Quant Lab 提供什么，以及应该从哪里开始。' },
      { title: '回应保持一致', text: '同一个问题，在 Android、iPhone 与网站体验中，都应该得到一致且有用的方向。' },
      { title: '回复一定能行动', text: '每个答案最后都应该有连结、按钮或预约路径，而不是让客户停在原地。' },
    ],
    signals: ['品牌入口容易找到', 'FAQ 依照意图整理', '按钮都导向下一个有用动作', '内容可以汇出与维护'],
    expansionEyebrow: '成长系统',
    expansion: [
      { title: '可重复使用的回答区块', text: '把常用说明维持短、清楚，而且容易更新。' },
      { title: '一致的视觉语言', text: '在 LINE 体验中维持相同的标签、卡片层级与连结行为。' },
      { title: '持续改善', text: '检查真实提问、补上缺少的路径，逐步改善下一次回复。' },
    ],
    process: [
      { step: '01', title: '接收问题', text: '判断访客意图，导向最接近的 FAQ 或引导选项。' },
      { step: '02', title: '提供适当脉络', text: '用白话回答，再提供聚焦的连结或按钮作为下一步。' },
      { step: '03', title: '检查并改善', text: '整理尚未回答的问题，让知识库流程持续变得更完整。' },
    ],
    closingEyebrow: '准备开始探索',
    closingTitle: '选择一项资源，继续你的旅程',
    open: '开启',
    resource: '资源',
  },
};

Object.assign(localeCopy, {
  ja: { metadataTitle: 'ナレッジベース | AI-Quant Lab', metadataDescription: 'AI-Quant Lab の製品案内、予約、応答フローのための実践的な LINE ナレッジベース。', eyebrow: 'ナレッジベース', title: 'AI-Quant Lab ナレッジベース', lead: 'ブランド案内、予約、製品教育、迅速な顧客導線を支える構造化された応答システムです。', badges: ['公開エントリー', 'FAQ 対応', 'エクスポート可能'], quickLinks: [{ href: '/', label: 'ホームへ戻る', note: 'AI-Quant Lab のブランドホームへ戻り、次の導線を選びます。' }, { href: '/line-kb/formal-tree', label: '正式 FAQ ツリー', note: '一貫したカスタマーサポートのための構造化された質問マップ。' }, { href: '/line-kb/flex-template', label: 'Flex テンプレート', note: '明確で簡潔、そして行動につながる LINE メッセージの再利用可能なレイアウト。' }, { href: '/line-kb/spec', label: '技術仕様', note: 'ナレッジベースの応答フローを支える実装ルール。' }, { href: '/line-kb/expansion', label: 'FAQ 拡張', note: '一貫性を保ちながら FAQ ライブラリを拡張する成長フレームワーク。' }, { href: '/line-kb/backend-export', label: 'バックエンド・エクスポート', note: 'バックアップと展開のために Markdown または JSON でナレッジベースを出力します。' }, { href: '/line-kb/reservation', label: '予約フォーム', note: '顧客の旅を Google 予約フォームへつなげます。' }], highlights: [{ kicker: '01 / エントリー', title: '最も明確な顧客導線から始める', description: 'ホーム、機能ガイド、ブランドストーリー、予約入口を、すべての訪問者の最初のシンプルな層として使います。' }, { kicker: '02 / ナビゲーション', title: '少ないメッセージで顧客を案内する', description: '明確なメニューは繰り返しの質問を減らし、長い手動返信なしで訪問者を適切なリソースへ進めます。' }, { kicker: '03 / フロー', title: '質問を役立つ次の行動に変える', description: 'FAQ の回答を簡潔な LINE カード、知識リンク、予約アクションと組み合わせ、すべての返信に目的を持たせます。' }, { kicker: '04 / 拡張', title: '最初の FAQ セットを超えて拡張する', description: 'トーン、導線、回答品質を一貫させる反復可能な構造で新しい質問を追加します。' }, { kicker: '05 / エクスポート', title: 'ナレッジベースを持ち運べる状態にする', description: 'クリーンな Markdown または JSON 出力を維持し、バックアップ、レビュー、チャネル間の再利用を可能にします。' }], journeyEyebrow: 'カスタマージャーニー', journeyTitle: '質問から行動までの一つの明確なルート', journeyText: 'ナレッジベースは、ブランドを理解し、適切なリソースを探し、自信を持って次の行動を取るための案内経路です。', journeyCardLabel: 'リソースを開く', storyEyebrow: 'この構造の理由', story: [{ title: '明確な最初の接点', text: 'すべての訪問者が、AI-Quant Lab の提供内容と最初に進む場所をすぐ理解できるようにします。' }, { title: '一貫した回答', text: 'Android、iPhone、Web のどの体験でも、同じ質問には同じ有用な方向性を提示します。' }, { title: '行動可能なフォローアップ', text: 'すべての回答は行き止まりではなく、有用なリンク、ボタン、または予約導線で終えます。' }], signals: ['ブランド入口を見つけやすい', 'FAQ ルートを意図別に整理', 'ボタンが次の有用な行動へ進む', '内容をエクスポートして保守できる'], expansionEyebrow: '成長システム', expansion: [{ title: '再利用可能な回答ブロック', text: 'よく使う説明を短く、読みやすく、更新しやすい形に保ちます。' }, { title: '一貫した視覚言語', text: 'LINE の体験全体で、同じラベル、カード階層、リンク動作を使います。' }, { title: '継続的な改善', text: '実際の質問を確認し、不足する導線を追加して、システム全体を作り直さずに次の返信を改善します。' }], process: [{ step: '01', title: '質問を受け取る', text: '訪問者の意図を特定し、最も近い FAQ またはガイド付き選択肢へ案内します。' }, { step: '02', title: '適切な文脈を伝える', text: '平易な言葉で回答し、次のステップのための焦点を絞ったリンクまたはボタンを提供します。' }, { step: '03', title: '計測して改善する', text: '未回答の質問を見直し、時間とともにフローが強くなるようナレッジベースを更新します。' }], closingEyebrow: '探索の準備完了', closingTitle: 'リソースを選び、旅を続けましょう', open: '開く', resource: 'リソース' },
});
Object.assign(localeCopy, {
  de: { metadataTitle: 'Wissensbasis | AI-Quant Lab', metadataDescription: 'Eine praktische LINE-Wissensbasis für Produktführung, Reservierungen und Antwortabläufe von AI-Quant Lab.', eyebrow: 'WISSENSBASIS', title: 'AI-Quant Lab Wissensbasis', lead: 'Ein strukturiertes Antwortsystem für Markenführung, Reservierungen, Produktwissen und schnelle Kundennavigation.', badges: ['Öffentlicher Einstieg', 'FAQ bereit', 'Exportierbar'], quickLinks: [{ href: '/', label: 'Zur Startseite', note: 'Zur AI-Quant-Lab-Startseite zurückkehren und den nächsten Weg wählen.' }, { href: '/line-kb/formal-tree', label: 'Formaler FAQ-Baum', note: 'Eine strukturierte Fragenkarte für konsistente Kundensupport-Antworten.' }, { href: '/line-kb/flex-template', label: 'Flex-Vorlagen', note: 'Wiederverwendbare LINE-Nachrichtenlayouts für klare, kompakte und handlungsorientierte Antworten.' }, { href: '/line-kb/spec', label: 'Technische Spezifikation', note: 'Die Implementierungsregeln hinter dem Antwortfluss der Wissensbasis.' }, { href: '/line-kb/expansion', label: 'FAQ-Erweiterung', note: 'Ein Wachstumsrahmen zur Erweiterung der FAQ-Bibliothek ohne Konsistenzverlust.' }, { href: '/line-kb/backend-export', label: 'Backend-Export', note: 'Die Wissensbasis als Markdown oder JSON für Backup und Bereitstellung exportieren.' }, { href: '/line-kb/reservation', label: 'Reservierungsformular', note: 'Die Kundenreise mit dem Google-Reservierungsformular verbinden.' }], highlights: [{ kicker: '01 / Einstieg', title: 'Mit dem klarsten Kundenweg beginnen', description: 'Startseite, Funktionsguide, Markengeschichte und Reservierung bilden eine einfache erste Ebene für jeden Besucher.' }, { kicker: '02 / Navigation', title: 'Kunden mit weniger Nachrichten führen', description: 'Ein klares Menü reduziert wiederholte Fragen und bringt Besucher ohne lange manuelle Antworten zur richtigen Ressource.' }, { kicker: '03 / Ablauf', title: 'Fragen in hilfreiche nächste Schritte verwandeln', description: 'FAQ-Antworten mit kompakten LINE-Karten, Wissenslinks und Reservierungsaktionen verbinden, damit jede Antwort ein Ziel hat.' }, { kicker: '04 / Erweiterung', title: 'Über das erste FAQ-Set hinaus wachsen', description: 'Neue Fragen über eine wiederholbare Struktur ergänzen, die Ton, Weiterleitung und Antwortqualität konsistent hält.' }, { kicker: '05 / Export', title: 'Die Wissensbasis portabel halten', description: 'Einen sauberen Markdown- oder JSON-Export pflegen, damit Inhalte gesichert, geprüft und kanalübergreifend genutzt werden können.' }], journeyEyebrow: 'KUNDENREISE', journeyTitle: 'Ein klarer Weg von der Frage zur Handlung', journeyText: 'Die Wissensbasis ist als geführter Weg gestaltet: Marke verstehen, die richtige Ressource entdecken und dann selbstsicher den nächsten Schritt gehen.', journeyCardLabel: 'RESSOURCE ÖFFNEN', storyEyebrow: 'WARUM DIESE STRUKTUR', story: [{ title: 'Klarer erster Kontakt', text: 'Jeder Besucher sollte schnell verstehen, was AI-Quant Lab anbietet und wo der Einstieg liegt.' }, { title: 'Konsistente Antworten', text: 'Dieselbe Frage sollte auf Android, iPhone und im Web dieselbe hilfreiche Orientierung erhalten.' }, { title: 'Handlungsfähige Folgeaktion', text: 'Jede Antwort sollte mit einem sinnvollen Link, Button oder Reservierungsweg statt mit einer Sackgasse enden.' }], signals: ['Markeneinstieg ist leicht zu finden', 'FAQ-Routen sind nach Absicht organisiert', 'Buttons führen zur nächsten sinnvollen Aktion', 'Inhalte können exportiert und gepflegt werden'], expansionEyebrow: 'WACHSTUMSSYSTEM', expansion: [{ title: 'Wiederverwendbare Antwortblöcke', text: 'Häufig verwendete Erklärungen kurz, lesbar und leicht aktualisierbar halten.' }, { title: 'Konsistente visuelle Sprache', text: 'Dieselben Labels, Kartenhierarchien und Link-Verhalten im gesamten LINE-Erlebnis verwenden.' }, { title: 'Kontinuierliche Verbesserung', text: 'Echte Fragen prüfen, fehlende Routen ergänzen und die nächste Antwort verbessern, ohne das ganze System neu zu bauen.' }], process: [{ step: '01', title: 'Frage empfangen', text: 'Die Besucherabsicht erkennen und zur nächstliegenden FAQ oder geführten Option weiterleiten.' }, { step: '02', title: 'Den richtigen Kontext geben', text: 'In klarer Sprache antworten und anschließend einen fokussierten Link oder Button für den nächsten Schritt anbieten.' }, { step: '03', title: 'Messen und verbessern', text: 'Unbeantwortete Fragen prüfen und die Wissensbasis aktualisieren, damit der Ablauf mit der Zeit stärker wird.' }], closingEyebrow: 'BEREIT ZUM ENTDECKEN', closingTitle: 'Wählen Sie eine Ressource und setzen Sie die Reise fort', open: 'ÖFFNEN', resource: 'Ressource' },
});
Object.assign(localeCopy, {
  es: { metadataTitle: 'Base de conocimiento | AI-Quant Lab', metadataDescription: 'Una base de conocimiento práctica de LINE para la guía de productos, reservas y flujos de respuesta de AI-Quant Lab.', eyebrow: 'BASE DE CONOCIMIENTO', title: 'Base de conocimiento AI-Quant Lab', lead: 'Un sistema de respuestas estructurado para guía de marca, reservas, educación de producto y navegación rápida de clientes.', badges: ['Entrada pública', 'FAQ lista', 'Exportable'], quickLinks: [{ href: '/', label: 'Volver al inicio', note: 'Vuelva a la página de marca de AI-Quant Lab y elija el siguiente recorrido.' }, { href: '/line-kb/formal-tree', label: 'Árbol FAQ formal', note: 'Un mapa de preguntas estructurado para respuestas coherentes de atención al cliente.' }, { href: '/line-kb/flex-template', label: 'Plantillas Flex', note: 'Diseños reutilizables de mensajes LINE para respuestas claras, compactas y accionables.' }, { href: '/line-kb/spec', label: 'Especificación técnica', note: 'Las reglas de implementación detrás del flujo de respuesta de la base de conocimiento.' }, { href: '/line-kb/expansion', label: 'Expansión FAQ', note: 'Un marco de crecimiento para ampliar la biblioteca FAQ sin perder coherencia.' }, { href: '/line-kb/backend-export', label: 'Exportación backend', note: 'Exporte la base de conocimiento como Markdown o JSON para copia de seguridad y despliegue.' }, { href: '/line-kb/reservation', label: 'Formulario de reserva', note: 'Conecte el recorrido del cliente con el formulario de reserva de Google.' }], highlights: [{ kicker: '01 / Entrada', title: 'Empiece por la ruta de cliente más clara', description: 'Use la página de inicio, guía de funciones, historia de marca y entradas de reserva como una primera capa simple para cada visitante.' }, { kicker: '02 / Navegación', title: 'Guíe a los clientes con menos mensajes', description: 'Un menú claro reduce preguntas repetidas y lleva a cada visitante al recurso adecuado sin largas respuestas manuales.' }, { kicker: '03 / Flujo', title: 'Convierta las preguntas en próximos pasos útiles', description: 'Combine respuestas FAQ con tarjetas LINE compactas, enlaces de conocimiento y acciones de reserva para que cada respuesta tenga un propósito.' }, { kicker: '04 / Expansión', title: 'Amplíe más allá del primer conjunto FAQ', description: 'Agregue nuevas preguntas mediante una estructura repetible que mantenga coherentes el tono, el enrutamiento y la calidad de las respuestas.' }, { kicker: '05 / Exportación', title: 'Mantenga portátil la base de conocimiento', description: 'Conserve una exportación limpia Markdown o JSON para poder respaldar, revisar y reutilizar el contenido entre canales.' }], journeyEyebrow: 'RECORRIDO DEL CLIENTE', journeyTitle: 'Una ruta clara de la pregunta a la acción', journeyText: 'La base de conocimiento está diseñada como una ruta guiada: comprenda la marca, explore el recurso correcto y dé el siguiente paso con confianza.', journeyCardLabel: 'ABRIR RECURSO', storyEyebrow: 'POR QUÉ ESTA ESTRUCTURA', story: [{ title: 'Primer contacto claro', text: 'Cada visitante debería comprender rápidamente qué ofrece AI-Quant Lab y por dónde empezar.' }, { title: 'Respuestas coherentes', text: 'La misma pregunta debe recibir la misma orientación útil en Android, iPhone y experiencias web.' }, { title: 'Seguimiento accionable', text: 'Cada respuesta debe terminar con un enlace útil, botón o ruta de reserva, nunca en un punto muerto.' }], signals: ['La entrada de marca es fácil de encontrar', 'Las rutas FAQ se organizan por intención', 'Los botones llevan a la siguiente acción útil', 'El contenido se puede exportar y mantener'], expansionEyebrow: 'SISTEMA DE CRECIMIENTO', expansion: [{ title: 'Bloques de respuesta reutilizables', text: 'Mantenga las explicaciones frecuentes breves, legibles y fáciles de actualizar.' }, { title: 'Lenguaje visual coherente', text: 'Use las mismas etiquetas, jerarquía de tarjetas y comportamiento de enlaces en toda la experiencia LINE.' }, { title: 'Mejora continua', text: 'Revise preguntas reales, agregue rutas faltantes y mejore la siguiente respuesta sin reconstruir todo el sistema.' }], process: [{ step: '01', title: 'Reciba la pregunta', text: 'Identifique la intención del visitante y enrútela al FAQ u opción guiada más cercana.' }, { step: '02', title: 'Ofrezca el contexto correcto', text: 'Responda en lenguaje claro y proporcione un enlace o botón enfocado para el siguiente paso.' }, { step: '03', title: 'Mida y mejore', text: 'Revise preguntas sin respuesta y actualice la base de conocimiento para fortalecer el flujo con el tiempo.' }], closingEyebrow: 'LISTO PARA EXPLORAR', closingTitle: 'Elija un recurso y continúe el recorrido', open: 'ABRIR', resource: 'Recurso' },
});
export async function generateMetadata({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'en';
  const text = localeCopy[locale] || localeCopy['zh-Hant'];
  return { title: text.metadataTitle, description: text.metadataDescription };
}

function NavLinks({ locale, text }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {text.quickLinks.map((item) => (
        <Link
          key={item.href}
          href={localizePath(item.href, locale)}
          className="rounded-full border border-cyan-400/30 bg-[#020617]/95 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-slate-900/90 hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function ResourceCard({ item, locale, text }) {
  return (
    <Link
      href={localizePath(item.href, locale)}
      className="group rounded-[1.25rem] border border-cyan-400/15 bg-slate-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-950/80"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-300"><EmojiAvatar emoji={resourceEmojis[item.href] || '📚'} />{text.resource}</p>
          <h3 className="mt-3 text-xl font-bold text-white transition group-hover:text-cyan-200">{item.label}</h3>
        </div>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-cyan-200">
          {text.open}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{item.note}</p>
    </Link>
  );
}

export default async function LineKbPage({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'en';
  const text = localeCopy[locale] || localeCopy['zh-Hant'];

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.9))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div>
                  <span className="inline-flex rounded-xl bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-[0_8px_20px_rgba(6,182,212,0.24)]">
                    {locale === 'en' ? 'Lab Knowledge Base' : locale === 'zh-Hans' ? 'Lab \u77e5\u8bc6\u5e93' : 'Lab \u77e5\u8b58\u5eab'}
                  </span>
                  <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">{text.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{text.lead}</p>
                </div>
              </div>
              <div className="lg:pt-2">
                <NavLinks locale={locale} text={text} />
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {text.highlights.map((card, index) => (
              <article key={card.title} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-cyan-300"><EmojiAvatar emoji={knowledgeEmojis.highlights[index % knowledgeEmojis.highlights.length]} />{card.kicker}</p>
                <h2 className="mt-3 text-lg font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-7">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">{text.journeyEyebrow}</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{text.journeyTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{text.journeyText}</p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {text.quickLinks.map((item) => (
                <ResourceCard key={item.href} item={item} locale={locale} text={text} />
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {text.story.map((block, index) => (
              <article key={block.title} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-300"><EmojiAvatar emoji={knowledgeEmojis.story[index % knowledgeEmojis.story.length]} tone="violet" />{text.storyEyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{block.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{block.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {text.signals.map((row) => (
                <div key={row} className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 px-4 py-4 text-sm font-medium leading-6 text-slate-200">
                  {row}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {text.expansion.map((card, index) => (
              <article key={card.title} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-300"><EmojiAvatar emoji={knowledgeEmojis.expansion[index % knowledgeEmojis.expansion.length]} tone="emerald" />{text.expansionEyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              {text.process.map((item, index) => (
                <article key={item.step} className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-2 font-mono text-sm font-black text-cyan-200"><EmojiAvatar emoji={knowledgeEmojis.process[index % knowledgeEmojis.process.length]} tone="emerald" /><span>{item.step}</span></div>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{text.closingEyebrow}</p>
                <h2 className="mt-2 text-2xl font-black text-white">{text.closingTitle}</h2>
              </div>
              <div className="flex justify-start md:justify-end">
                <NavLinks locale={locale} text={text} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}