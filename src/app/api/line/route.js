import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 檢查環境變數是否正常載入
    if (!process.env.LINE_CHANNEL_ACCESS_TOKEN || !process.env.LINE_CHANNEL_SECRET) {
      console.error('環境變數缺失：請檢查 Vercel 後台的 LINE 變數設定！');
    }

    const body = await request.json();
    console.log('成功收到 LINE 訊息事件:', JSON.stringify(body, null, 2));

    // LINE 驗證（Verify）通常會帶有空的 events，這裡直接回覆 200 OK 讓它通關
    if (body.events && body.events.length === 0) {
      return NextResponse.json({ message: 'Verification Success' }, { status: 200 });
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error('Webhook 發生錯誤:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}