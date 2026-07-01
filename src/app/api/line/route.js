import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('成功收到 LINE 訊息事件:', JSON.stringify(body, null, 2));

    if (!body.events || body.events.length === 0) {
      return NextResponse.json({ message: 'Success' }, { status: 200 });
    }

    const event = body.events[0];
    
    // 只有當使用者傳送的是「文字訊息」時才處理
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userText = event.message.text;

      // 呼叫 LINE 官方 API 把話傳回給手機
      await fetch('https://api.line.me/v2/bot/message/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          replyToken: replyToken,
          messages: [
            {
              type: 'text',
              text: `【AI-Quant Lab 測試成功】你剛剛說的是：${userText}`
            }
          ]
        })
      });
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error('Webhook 發生錯誤:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}