import Link from 'next/link';
import { localizePath } from '@/lib/locale';
import EmojiAvatar from '@/components/EmojiAvatar';

const simplePageEmojis = ['\u{1f4da}', '\u{1f4ac}', '\u{1f9ed}', '\u{1f6e0}\u{fe0f}', '\u{2705}', '\u{1f331}'];

const copies = {
  en: {
    nav: [
      ['Knowledge Base', '/line-kb'],
      ['FAQ Tree', '/line-kb/formal-tree'],
      ['Flex Templates', '/line-kb/flex-template'],
      ['Engineering Spec', '/line-kb/spec'],
      ['FAQ Expansion', '/line-kb/expansion'],
      ['Backend Export', '/line-kb/backend-export'],
    ],
    back: 'Back to knowledge base',
    open: 'OPEN',
    formal: {
      eyebrow: 'FORMAL FAQ TREE',
      title: 'A clear route from question to action',
      lead: 'A practical 12-question structure that helps new visitors feel safe, gives advanced visitors useful context, and keeps every conversation moving.',
      cards: [
        ['01', 'Start with the basics', 'Explain what AI-Quant Lab is, who it is for, and where a first-time visitor should begin.'],
        ['02', 'Find the right branch', 'Separate brand, product, technical, and reservation questions so each visitor sees the closest answer.'],
        ['03', 'Keep the next step visible', 'Every answer should end with a useful link, button, or resource instead of a dead end.'],
        ['04', 'Review and improve', 'Use real questions to refine the tree and make future replies faster and more consistent.'],
      ],
      principlesTitle: 'Three rules for a stable FAQ tree',
      principles: [
        ['Start', 'Answer what this is first, so new visitors gain confidence.'],
        ['Branch', 'Answer how it works next, so advanced visitors can see the structure.'],
        ['Exit', 'Answer what to do next, so the conversation can move forward.'],
      ],
      footer: 'Keep the same quick resources at the bottom of every page.',
    },
    flex: {
      eyebrow: 'FLEX TEMPLATES',
      title: 'Reusable LINE reply layouts',
      lead: 'Use short, standard, extended, and button-led templates to keep replies readable, consistent, and easy to act on.',
      cards: [
        ['Short answer', 'Q: <visitor question>\\nA: <one clear conclusion>\\n\\nUse this for the first reply and keep the reading rhythm light.'],
        ['Standard answer', 'Q: <visitor question>\\nA: <plain-language answer>\\nContext: <technical explanation>\\n\\nUse this for most FAQ conversations.'],
        ['Extended answer', 'Q: <visitor question>\\nA: <plain-language answer>\\nTechnical: <architecture and detail>\\nStory: <brand context>\\nNext: <CTA>'],
        ['Button-led answer', 'Q: <visitor question>\\nA: <plain-language answer>\\n\\nOffer buttons for the feature guide, brand story, knowledge base, or reservation list.'],
      ],
      principlesTitle: 'A reliable reply has three layers',
      principles: [
        ['Question', 'Keep the visitor question visible so the response feels relevant.'],
        ['Answer', 'Lead with a plain-language conclusion before adding detail.'],
        ['CTA', 'Always provide a focused next action when the visitor is ready.'],
      ],
      footer: 'Use the same template rhythm across every LINE reply.',
    },
    spec: {
      eyebrow: 'ENGINEERING SPECIFICATION',
      title: 'Rules for a maintainable response system',
      lead: 'This page turns the LINE knowledge base into an operational standard. Clear specifications keep templates, website pages, and FAQ content aligned.',
      rows: [
        ['Purpose', 'Write the response rules, routing points, and maintenance standard as a deliverable system.'],
        ['Input format', 'Use Q / A as the base, then add keywords, supporting context, and a clear CTA when needed.'],
        ['Response layers', 'Keep plain-language, technical, and vision layers so the answer can expand on demand.'],
        ['Routing', 'Guide visitors to the homepage, reservation list, resource page, or next key screen.'],
        ['Maintenance', 'Update the specification first, then the template, and finally the public FAQ copy.'],
        ['Fallback', 'When intent is unclear, use a safe prompt and ask for a more specific keyword.'],
      ],
      sections: [
        ['Maintenance order', 'Update the specification, then the templates, and only then the public-facing copy.'],
        ['Usage principle', 'Every reply should provide reassurance first, technical clarity second, and action last.'],
      ],
      footer: 'Keep the same three quick resources in the footer.',
    },
  },
  'zh-Hant': {
    nav: [
      ['知識庫入口', '/line-kb'],
      ['正式圖解樹', '/line-kb/formal-tree'],
      ['Flex 模板', '/line-kb/flex-template'],
      ['工程師規格書', '/line-kb/spec'],
      ['FAQ 擴充藍圖', '/line-kb/expansion'],
      ['後台匯出', '/line-kb/backend-export'],
    ],
    back: '回知識庫入口',
    open: '開啟',
    formal: {
      eyebrow: '正式 FAQ 樹',
      title: '從提問到行動的清楚路徑',
      lead: '以 12 個問題整理新手入口、進階脈絡與下一步導流，讓每段對話都能繼續往前。',
      cards: [['01', '先回答基礎', '先說明 AI-Quant Lab 是什麼、適合誰，以及第一次應該從哪裡開始。'], ['02', '找到正確分支', '依品牌、產品、技術與預約問題分流，讓訪客看到最接近的答案。'], ['03', '保留下一步', '每個答案最後都放上連結、按鈕或資源，不讓對話停住。'], ['04', '持續檢查改善', '根據真實提問更新題樹，讓往後回覆更快、更一致。']],
      principlesTitle: '穩定 FAQ 樹的三個原則',
      principles: [['起點', '先回答這是什麼，讓新手有安全感。'], ['分支', '再回答怎麼運作，讓進階者看見架構。'], ['出口', '最後回答下一步是什麼，讓對話繼續前進。']],
      footer: '每個頁面頁尾都保留相同的快捷資源。',
    },
    flex: {
      eyebrow: 'FLEX 模板',
      title: '可重複使用的 LINE 回覆版型',
      lead: '用短答、標準、延伸與按鈕導流模板，讓回覆清楚一致，也更容易採取行動。',
      cards: [['短答版', 'Q：<訪客問題>\\nA：<一句清楚結論>\\n\\n適合第一層回覆，先維持閱讀節奏。'], ['標準版', 'Q：<訪客問題>\\nA：<白話回答>\\n補充：<技術說明>\\n\\n適合大多數 FAQ 問答。'], ['延伸版', 'Q：<訪客問題>\\nA：<白話回答>\\n技術：<架構與細節>\\n故事：<品牌脈絡>\\n下一步：<CTA>'], ['按鈕導流版', 'Q：<訪客問題>\\nA：<白話回答>\\n\\n提供功能說明、品牌故事、知識庫或預約名單按鈕。']],
      principlesTitle: '穩定回覆的三個層次',
      principles: [['問題', '保留訪客問題，讓回覆明確對應。'], ['答案', '先給白話結論，再補充必要細節。'], ['CTA', '訪客準備好時，提供聚焦的下一個動作。']],
      footer: '所有 LINE 回覆都使用相同的模板節奏。',
    },
    spec: {
      eyebrow: '工程師規格書',
      title: '可長期維護的回應系統規則',
      lead: '把 LINE 知識庫整理成操作標準，讓模板、網站頁面與 FAQ 內容保持一致。',
      rows: [['建立目的', '把回覆規格、導流節點與維護標準整理成可交付系統。'], ['輸入格式', '以 Q / A 為主，必要時加入關鍵字、補充說明與 CTA。'], ['回答層級', '保留白話、技術與願景三層，方便按需求延伸。'], ['導流方式', '把使用者帶到首頁、預約名單、資源頁或下一個關鍵畫面。'], ['維護標準', '先改規格，再改模板，最後才改對外 FAQ 文案。'], ['失敗處理', '無法辨識問題時，先給安全提示，再請訪客輸入更明確關鍵字。']],
      sections: [['維護順序', '先改規格書，再改模板，最後才改對外文案。'], ['使用原則', '所有回覆先有安全感，再有技術感，最後導向行動。']],
      footer: '頁尾保留相同的三個快捷資源。',
    },
  },
};

Object.assign(copies, {
  ja: {
    nav: [['ナレッジベース', '/line-kb'], ['FAQツリー', '/line-kb/formal-tree'], ['Flexテンプレート', '/line-kb/flex-template'], ['技術仕様', '/line-kb/spec'], ['FAQ拡張', '/line-kb/expansion'], ['バックエンド出力', '/line-kb/backend-export']], back: 'ナレッジベースへ戻る', open: '開く',
    formal: { eyebrow: '正式 FAQ ツリー', title: '質問から行動までの明確なルート', lead: '12の実践的な質問構造により、初めての訪問者に安心感を与え、経験者には有用な文脈を提供し、会話を前へ進めます。', cards: [['01','基本から始める','AI-Quant Labとは何か、対象者、最初に確認すべき場所を説明します。'],['02','適切な分岐を探す','ブランド、製品、技術、予約の質問を分け、最も近い回答へ導きます。'],['03','次のステップを見せる','すべての回答を有用なリンク、ボタン、リソースで終えます。'],['04','見直して改善する','実際の質問でツリーを改善し、将来の回答をより速く一貫させます。']], principlesTitle: '安定したFAQツリーの3原則', principles: [['開始','まず何であるかを答え、新規訪問者に安心感を与えます。'],['分岐','次に仕組みを説明し、構造を示します。'],['出口','最後に次の行動を示し、会話を前へ進めます。']], footer: '各ページ下部に同じクイックリソースを配置します。' },
    flex: { eyebrow: 'FLEX テンプレート', title: '再利用できる LINE 返信レイアウト', lead: '短文、標準、詳細、ボタン誘導のテンプレートで、読みやすく一貫した返信を実現します。', cards: [['短い回答','Q: <訪問者の質問>\nA: <明確な結論>\n\n最初の返信に使用します。'],['標準回答','Q: <訪問者の質問>\nA: <平易な回答>\n補足: <技術説明>\n\n多くのFAQに適しています。'],['詳細回答','Q: <訪問者の質問>\nA: <平易な回答>\n技術: <構造と詳細>\n背景: <ブランド文脈>\n次: <CTA>'],['ボタン誘導回答','Q: <訪問者の質問>\nA: <平易な回答>\n\n機能、ブランド、知識庫、予約へのボタンを提示します。']], principlesTitle: '信頼できる返信の3層', principles: [['質問','質問を見せ、回答の関連性を保ちます。'],['回答','詳細の前に平易な結論を示します。'],['CTA','準備ができた訪問者へ次の行動を提示します。']], footer: 'すべてのLINE返信で同じテンプレートのリズムを使います。' },
    spec: { eyebrow: '技術仕様', title: '保守可能な応答システムのルール', lead: 'LINEナレッジベースを運用標準に変え、テンプレート、Webページ、FAQを整合させます。', rows: [['目的','応答ルール、導線、保守基準を提供可能なシステムとして記述します。'],['入力形式','Q / Aを基本とし、必要に応じてキーワード、補足、CTAを加えます。'],['応答層','平易、技術、ビジョンの層を保持します。'],['導線','ホーム、予約、リソース、次の重要画面へ案内します。'],['保守','仕様、テンプレート、公開FAQの順に更新します。'],['フォールバック','意図が不明な場合は安全な案内と具体的なキーワードを求めます。']], sections: [['保守順序','最初に仕様、次にテンプレート、最後に公開文面を更新します。'],['使用原則','安心感、技術的明確さ、行動の順で回答します。']], footer: 'フッターに同じ3つのクイックリソースを置きます。' },
  },
});
Object.assign(copies, {
  de: { nav: [['Wissensbasis','/line-kb'],['FAQ-Baum','/line-kb/formal-tree'],['Flex-Vorlagen','/line-kb/flex-template'],['Technische Spezifikation','/line-kb/spec'],['FAQ-Erweiterung','/line-kb/expansion'],['Backend-Export','/line-kb/backend-export']], back: 'Zur Wissensbasis', open: 'ÖFFNEN', formal: { eyebrow: 'FORMELLER FAQ-BAUM', title: 'Ein klarer Weg von der Frage zur Handlung', lead: 'Eine praktische Struktur mit zwölf Fragen, die neuen Besuchern Sicherheit gibt und jede Unterhaltung voranbringt.', cards: [['01','Mit den Grundlagen beginnen','Erklären Sie AI-Quant Lab, die Zielgruppe und den besten Einstieg.'],['02','Den richtigen Zweig finden','Trennen Sie Marken-, Produkt-, Technik- und Reservierungsfragen.'],['03','Den nächsten Schritt sichtbar halten','Jede Antwort endet mit einem Link, Button oder einer Ressource.'],['04','Prüfen und verbessern','Nutzen Sie echte Fragen, um zukünftige Antworten schneller und konsistenter zu machen.']], principlesTitle: 'Drei Regeln für einen stabilen FAQ-Baum', principles: [['Start','Zuerst erklären, worum es geht.'],['Zweig','Dann erklären, wie es funktioniert.'],['Ausgang','Zum Schluss die nächste Handlung zeigen.']], footer: 'Behalten Sie dieselben Schnellressourcen auf jeder Seite bei.' }, flex: {
      eyebrow: 'FLEX-VORLAGEN',
      title: 'Wiederverwendbare LINE-Antwortlayouts',
      lead: 'Nutzen Sie kurze, Standard-, ausführliche und schaltflächenbasierte Vorlagen, damit Antworten lesbar, konsistent und handlungsorientiert bleiben.',
      cards: [['Kurze Antwort', 'F: <Besucherfrage>\nA: <eine klare Schlussfolgerung>\n\nFür die erste Antwort: kurz halten und leicht lesbar machen.'], ['Standardantwort', 'F: <Besucherfrage>\nA: <verständliche Antwort>\nKontext: <technische Erklärung>\n\nFür die meisten FAQ-Gespräche verwenden.'], ['Ausführliche Antwort', 'F: <Besucherfrage>\nA: <verständliche Antwort>\nTechnik: <Architektur und Details>\nGeschichte: <Markenkontext>\nNächster Schritt: <CTA>'], ['Antwort mit Schaltflächen', 'F: <Besucherfrage>\nA: <verständliche Antwort>\n\nSchaltflächen zur Funktionsanleitung, Markengeschichte, Wissensbasis oder Reservierung anbieten.']],
      principlesTitle: 'Eine verlässliche Antwort hat drei Ebenen',
      principles: [['Frage', 'Die Besucherfrage sichtbar halten, damit die Antwort relevant wirkt.'], ['Antwort', 'Mit einer verständlichen Schlussfolgerung beginnen und erst danach Details ergänzen.'], ['CTA', 'Eine klare nächste Handlung anbieten, sobald der Besucher bereit ist.']],
      footer: 'Verwenden Sie für jede LINE-Antwort denselben Vorlagenrhythmus.',
    },
    spec: {
      eyebrow: 'TECHNISCHE SPEZIFIKATION',
      title: 'Regeln für ein wartbares Antwortsystem',
      lead: 'Diese Seite macht aus der LINE-Wissensbasis einen operativen Standard. Klare Spezifikationen halten Vorlagen, Website-Seiten und FAQ-Inhalte aufeinander abgestimmt.',
      rows: [['Zweck', 'Antwortregeln, Weiterleitungspunkte und Wartungsstandard als nutzbares System festhalten.'], ['Eingabeformat', 'Q / A als Grundlage verwenden; bei Bedarf Schlüsselwörter, Kontext und einen klaren CTA ergänzen.'], ['Antwortebenen', 'Verständliche, technische und visuelle Ebenen bereithalten, damit Antworten bei Bedarf erweitert werden können.'], ['Weiterleitung', 'Besucher zur Startseite, Reservierungsliste, Ressourcenseite oder zum nächsten wichtigen Bildschirm führen.'], ['Wartung', 'Zuerst die Spezifikation, dann die Vorlage und zuletzt den öffentlichen FAQ-Text aktualisieren.'], ['Ausweichfall', 'Bei unklarer Absicht eine sichere Rückfrage stellen und um ein genaueres Schlüsselwort bitten.']],
      sections: [['Wartungsreihenfolge', 'Zuerst die Spezifikation, dann die Vorlagen und erst danach den öffentlich sichtbaren Text aktualisieren.'], ['Nutzungsprinzip', 'Jede Antwort soll zuerst Sicherheit geben, dann technische Klarheit schaffen und zuletzt zur Handlung führen.']],
      footer: 'Dieselben drei Schnellressourcen im Footer beibehalten.',
    },
  },
  es: { nav: [['Base de conocimiento','/line-kb'],['Árbol FAQ','/line-kb/formal-tree'],['Plantillas Flex','/line-kb/flex-template'],['Especificación técnica','/line-kb/spec'],['Expansión FAQ','/line-kb/expansion'],['Exportación backend','/line-kb/backend-export']], back: 'Volver a la base de conocimiento', open: 'ABRIR', formal: { eyebrow: 'ÁRBOL FAQ FORMAL', title: 'Una ruta clara de la pregunta a la acción', lead: 'Una estructura práctica de doce preguntas que da seguridad a nuevos visitantes y mantiene cada conversación en movimiento.', cards: [['01','Comience por lo básico','Explique qué es AI-Quant Lab, para quién es y dónde empezar.'],['02','Encuentre la rama correcta','Separe preguntas de marca, producto, técnica y reserva.'],['03','Mantenga visible el siguiente paso','Cada respuesta debe terminar con un enlace, botón o recurso.'],['04','Revise y mejore','Use preguntas reales para perfeccionar el árbol y responder con más consistencia.']], principlesTitle: 'Tres reglas para un árbol FAQ estable', principles: [['Inicio','Responda primero qué es para generar confianza.'],['Rama','Después explique cómo funciona.'],['Salida','Por último muestre qué hacer después.']], footer: 'Mantenga los mismos recursos rápidos al final de cada página.' }, flex: {
      eyebrow: 'PLANTILLAS FLEX',
      title: 'Diseños reutilizables para respuestas de LINE',
      lead: 'Use plantillas breves, estándar, ampliadas y con botones para mantener respuestas legibles, coherentes y fáciles de seguir.',
      cards: [['Respuesta breve', 'P: <pregunta del visitante>\nR: <una conclusión clara>\n\nÚsela en la primera respuesta y mantenga un ritmo de lectura ligero.'], ['Respuesta estándar', 'P: <pregunta del visitante>\nR: <respuesta en lenguaje claro>\nContexto: <explicación técnica>\n\nÚsela en la mayoría de conversaciones FAQ.'], ['Respuesta ampliada', 'P: <pregunta del visitante>\nR: <respuesta en lenguaje claro>\nTécnica: <arquitectura y detalle>\nHistoria: <contexto de marca>\nSiguiente paso: <CTA>'], ['Respuesta con botones', 'P: <pregunta del visitante>\nR: <respuesta en lenguaje claro>\n\nOfrezca botones para la guía de funciones, la historia de marca, la base de conocimiento o la reserva.']],
      principlesTitle: 'Una respuesta fiable tiene tres capas',
      principles: [['Pregunta', 'Mantenga visible la pregunta del visitante para que la respuesta resulte pertinente.'], ['Respuesta', 'Comience con una conclusión clara antes de añadir detalles.'], ['CTA', 'Ofrezca siempre una siguiente acción concreta cuando el visitante esté listo.']],
      footer: 'Use el mismo ritmo de plantilla en todas las respuestas de LINE.',
    },
    spec: {
      eyebrow: 'ESPECIFICACIÓN TÉCNICA',
      title: 'Reglas para un sistema de respuestas mantenible',
      lead: 'Esta página convierte la base de conocimiento de LINE en un estándar operativo. Las especificaciones claras mantienen alineadas las plantillas, las páginas web y el contenido FAQ.',
      rows: [['Propósito', 'Documente las reglas de respuesta, los puntos de enrutamiento y el estándar de mantenimiento como un sistema utilizable.'], ['Formato de entrada', 'Use P / R como base y añada palabras clave, contexto de apoyo y un CTA claro cuando sea necesario.'], ['Capas de respuesta', 'Mantenga capas de lenguaje claro, técnica y de visión para ampliar la respuesta cuando haga falta.'], ['Enrutamiento', 'Guíe a los visitantes a la página de inicio, la lista de reservas, la página de recursos o la siguiente pantalla clave.'], ['Mantenimiento', 'Actualice primero la especificación, después la plantilla y finalmente el texto FAQ público.'], ['Alternativa', 'Cuando la intención no sea clara, use una pregunta segura y pida una palabra clave más específica.']],
      sections: [['Orden de mantenimiento', 'Actualice la especificación, después las plantillas y solo entonces el texto visible al público.'], ['Principio de uso', 'Cada respuesta debe aportar tranquilidad primero, claridad técnica después y una acción al final.']],
      footer: 'Mantenga los mismos tres recursos rápidos en el pie de página.',
    },
  },
});
const copy = (locale, type) => copies[locale]?.[type] || copies['zh-Hant'][type];
const navCopy = (locale) => copies[locale]?.nav || copies['zh-Hant'].nav;

function NavLinks({ locale }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {navCopy(locale).map(([label, href]) => (
        <Link key={href} href={localizePath(href, locale)} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15 hover:text-white">
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function LineKbSimplePage({ locale, type }) {
  const text = copy(locale, type);
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.92))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-200"><EmojiAvatar emoji={'\u{1f4da}'} tone="cyan" />{text.eyebrow}</div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{text.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{text.lead}</p>
              </div>
              <div className="lg:pt-2"><NavLinks locale={locale} /></div>
            </div>
          </header>

          {type === 'spec' ? (
            <>
              <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
                <div className="overflow-hidden rounded-[1.35rem] border border-cyan-400/12">
                  {text.rows.map(([label, value]) => (
                    <div key={label} className="grid gap-3 border-b border-cyan-400/10 bg-slate-950/55 p-5 last:border-b-0 md:grid-cols-[180px_1fr]">
                      <div className="text-sm font-semibold tracking-wide text-cyan-200">{label}</div>
                      <div className="text-sm leading-7 text-slate-300">{value}</div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="mt-8 grid gap-4 lg:grid-cols-2">
                {text.sections.map(([title, body], index) => (
                  <article key={title} className="group rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 transition hover:border-cyan-300/30 hover:shadow-[0_18px_60px_rgba(34,211,238,0.14)]">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-white"><EmojiAvatar emoji={simplePageEmojis[index + 2]} tone={index ? 'emerald' : 'violet'} />{title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{body}</p>
                  </article>
                ))}
              </section>
            </>
          ) : (
            <>
              <section className="mt-8 grid gap-4 lg:grid-cols-2">
                {text.cards.map(([id, title, body], index) => (
                  <article key={id} className="group rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 transition hover:border-cyan-300/30 hover:shadow-[0_18px_60px_rgba(34,211,238,0.14)]">
                    {type === 'formal' ? (
                      <div className="flex items-center gap-3"><span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-black text-cyan-200">{id}</span><h2 className="flex items-center gap-3 text-2xl font-bold text-white"><EmojiAvatar emoji={simplePageEmojis[index + 1]} tone={index % 2 ? 'violet' : 'cyan'} />{title}</h2></div>
                    ) : (
                      <h2 className="flex items-center gap-3 text-2xl font-bold text-white"><EmojiAvatar emoji={simplePageEmojis[index + 1]} tone={index % 2 ? 'violet' : 'cyan'} />{title}</h2>
                    )}
                    <pre className="mt-4 whitespace-pre-wrap rounded-[1.25rem] border border-cyan-400/12 bg-slate-950/70 p-4 text-sm leading-7 text-cyan-100">{body}</pre>
                  </article>
                ))}
              </section>
              <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
                <h2 className="text-2xl font-bold text-white">{text.principlesTitle}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {text.principles.map(([title, body], index) => (
                    <article key={title} className="group rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5 transition hover:border-cyan-300/30 hover:bg-slate-950/80">
                      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-300"><EmojiAvatar emoji={simplePageEmojis[index + 2]} tone="emerald" />{title}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div><p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{text.back}</p><h2 className="mt-2 text-2xl font-black text-white">{text.footer}</h2></div>
              <NavLinks locale={locale} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}