import MultiAgentGuide from '@/components/MultiAgentGuide';

export const metadata = {
  title: 'Master Agent × 5｜MQL4 → MQL5 AI 重構引擎',
  description: '看懂 Codex 如何用一位 Master Agent 協調五位專家，完成 MQL4 到 MQL5 的剖析、轉換、編譯、回測與安全交付。',
  openGraph: {
    title: 'Master Agent × 5｜MQL4 → MQL5 AI 重構引擎',
    description: '一張圖看懂多智能體分工、品質閘門與 Docker + MCP 私有部署。',
    images: [{ url: '/multi-agent-og.png', width: 1200, height: 630, alt: '一位 Master Agent 協調五位 MQL 重構專家' }],
  },
  twitter: { card: 'summary_large_image', images: ['/multi-agent-og.png'] },
};

export default function MultiAgentPage() {
  return <MultiAgentGuide />;
}
