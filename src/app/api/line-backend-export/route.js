import { NextResponse } from 'next/server';
import {
  buildLineBackendFaqText,
  topicTreeBlueprint,
  topicTreeExpandedEntries,
} from '@/data/lineTopicTree';

function buildExportJson() {
  return {
    metadata: {
      title: 'AI-Quant Lab LINE 後台題庫匯出',
      description: '提供 Markdown 與 JSON 兩種格式，方便備份、複製與後續擴充。',
      generatedAt: new Date().toISOString(),
      totalEntries: topicTreeExpandedEntries.length,
      families: topicTreeBlueprint.families.map((family) => ({
        id: family.id,
        title: family.title,
        summary: family.summary,
      })),
    },
    blueprint: topicTreeBlueprint,
    entries: topicTreeExpandedEntries,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const download = searchParams.get('download') === '1';
  const filenameBase = 'ai-quant-lab-line-backend-faq';

  if (format === 'md') {
    const markdown = `# AI-Quant Lab LINE 後台題庫匯出\n\n` +
      `總節點數：${topicTreeExpandedEntries.length}\n\n` +
      buildLineBackendFaqText(topicTreeExpandedEntries);

    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        ...(download
          ? {
              'Content-Disposition': `attachment; filename="${filenameBase}.md"`,
            }
          : {}),
      },
    });
  }

  const payload = buildExportJson();

  return NextResponse.json(payload, {
    headers: download
      ? {
          'Content-Disposition': `attachment; filename="${filenameBase}.json"`,
        }
      : undefined,
  });
}
