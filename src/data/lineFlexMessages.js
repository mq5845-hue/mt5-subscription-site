const theme = {
  primary: '#22d3ee',
  accent: '#34d399',
  bg: '#0f172a',
  panel: '#111827',
  text: '#f8fafc',
  subtext: '#cbd5e1',
};

function textNode(text, options = {}) {
  return {
    type: 'text',
    text,
    weight: options.weight || 'regular',
    size: options.size || 'sm',
    color: options.color || theme.subtext,
    wrap: true,
    margin: options.margin,
    align: options.align,
    flex: options.flex,
  };
}

function buttonNode(label, uri, style = 'primary') {
  return {
    type: 'button',
    style,
    action: {
      type: 'uri',
      label,
      uri,
    },
    margin: 'md',
  };
}

const heroBubble = {
  type: 'bubble',
  size: 'giga',
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'md',
    contents: [
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'AI-Quant Lab LINE 客服',
            size: 'xs',
            weight: 'bold',
            color: theme.primary,
            letterSpacing: '2px',
          },
          {
            type: 'text',
            text: '源代碼工廠客服入口',
            weight: 'bold',
            size: 'xl',
            color: theme.text,
            wrap: true,
            margin: 'sm',
          },
          textNode('把 FAQ、自動回覆、AI 導引與人工客服接成同一條服務鏈。', {
            margin: 'md',
            size: 'sm',
          }),
        ],
      },
      {
        type: 'separator',
        margin: 'lg',
      },
      {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        margin: 'lg',
        contents: [
          textNode('核心能力', { weight: 'bold', color: theme.text }),
          textNode('• FAQ 命中與標準回覆'),
          textNode('• AI 知識導引與模組解說'),
          textNode('• 高風險問題轉人工'),
          textNode('• 回覆記錄回流知識庫'),
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      buttonNode('查看規格書', 'http://localhost:3000/line-kb/spec', 'primary'),
      buttonNode('查看知識庫', 'http://localhost:3000/line-kb', 'secondary'),
    ],
  },
};

const familyBubbles = [
  {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'text',
          text: 'FAQ 家族譜系',
          size: 'xs',
          weight: 'bold',
          color: theme.accent,
          letterSpacing: '2px',
        },
        {
          type: 'text',
          text: '產品理解',
          weight: 'bold',
          size: 'xl',
          color: theme.text,
          wrap: true,
        },
        textNode('幫助使用者理解產品定位、授權範圍與商業願景。', { margin: 'sm' }),
        {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          margin: 'md',
          contents: [
            textNode('1. 這是什麼產品？'),
            textNode('2. 為什麼稱為源代碼工廠？'),
            textNode('3. 和一般 EA 教學有何不同？'),
            textNode('4. 為何需要 LINE 知識庫？'),
          ],
        },
      ],
    },
  },
  {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'text',
          text: 'FAQ 家族譜系',
          size: 'xs',
          weight: 'bold',
          color: theme.accent,
          letterSpacing: '2px',
        },
        {
          type: 'text',
          text: '模組知識',
          weight: 'bold',
          size: 'xl',
          color: theme.text,
          wrap: true,
        },
        textNode('從 BaseConfig 到 Final Release Candidate 的 25 組模組路線。', {
          margin: 'sm',
        }),
        {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          margin: 'md',
          contents: [
            textNode('1. BaseConfig / NewBarDetector'),
            textNode('2. MoneyManagement / OrderManager'),
            textNode('3. RiskController / Logger'),
            textNode('4. QA / Deployment / Recovery'),
          ],
        },
      ],
    },
  },
  {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'text',
          text: 'FAQ 家族譜系',
          size: 'xs',
          weight: 'bold',
          color: theme.accent,
          letterSpacing: '2px',
        },
        {
          type: 'text',
          text: '授權與訂閱',
          weight: 'bold',
          size: 'xl',
          color: theme.text,
          wrap: true,
        },
        textNode('說清楚買斷、訂閱、改名、轉售與品牌化的規則。', { margin: 'sm' }),
        {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          margin: 'md',
          contents: [
            textNode('1. 方案差異'),
            textNode('2. 可否改名與再包裝'),
            textNode('3. 可否建立自有訂閱站'),
            textNode('4. 可否轉售與商業化'),
          ],
        },
      ],
    },
  },
];

const handoffBubble = {
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'md',
    contents: [
      {
        type: 'text',
        text: '轉人工規則',
        size: 'xs',
        weight: 'bold',
        color: theme.primary,
        letterSpacing: '2px',
      },
      {
        type: 'text',
        text: '當系統不該自己回答時',
        weight: 'bold',
        size: 'xl',
        color: theme.text,
        wrap: true,
      },
      textNode('退款、金流、法務、合作與高風險爭議，應立即交棒人工。', {
        margin: 'sm',
      }),
      {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        margin: 'md',
        contents: [
          textNode('• 付款 / 退款 / 帳務異常'),
          textNode('• AI 信心不足或查無答案'),
          textNode('• 客製開發與合作洽談'),
          textNode('• 風控與敏感爭議'),
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    contents: [buttonNode('轉人工流程', 'http://localhost:3000/line-kb/spec')],
  },
};

const flexMessageTemplates = {
  hero: {
    name: 'Hero Entry Message',
    altText: 'AI-Quant Lab 客服入口',
    purpose: '新進使用者導覽與品牌入口',
    payload: {
      type: 'flex',
      altText: 'AI-Quant Lab 客服入口',
      contents: heroBubble,
    },
  },
  familyCarousel: {
    name: 'FAQ Family Carousel',
    altText: 'FAQ 家族譜系',
    purpose: '把問題分成家族節點，方便導覽與檢索',
    payload: {
      type: 'flex',
      altText: 'FAQ 家族譜系',
      contents: {
        type: 'carousel',
        contents: familyBubbles,
      },
    },
  },
  handoff: {
    name: 'Handoff Alert',
    altText: '轉人工規則',
    purpose: '高風險情境的警示與交棒',
    payload: {
      type: 'flex',
      altText: '轉人工規則',
      contents: handoffBubble,
    },
  },
};

export default flexMessageTemplates;
