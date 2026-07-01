import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const event = body.events[0];
    
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userText = event.message.text;

      // 1. 呼叫 OpenAI API 獲取 AI 回覆
      const openAIRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: '你是 AI-Quant Lab 的首席技術顧問，精通 Module 0-24 模組化交易架構，請專業地回答用戶問題。' },
            { role: 'user', content: userText }
          ]
        })
      });

      const aiData = await openAIRes.json();
      const aiResponseText = aiData.choices[0].message.content;

      // 2. 將 AI 回覆發送回 LINE
      await fetch('https://api.line.me/v2/bot/message/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          replyToken: replyToken,
          messages: [{ type: 'text', text: aiResponseText }]
        })
      });
    }
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error('AI 大腦發生錯誤:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}