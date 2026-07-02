import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { buildLineReply } from '@/lib/line-bot-brain';

export const runtime = 'nodejs';

function verifyLineSignature(rawBody, signature, channelSecret) {
  if (!channelSecret || !signature) return false;
  const expected = crypto
    .createHmac('sha256', channelSecret)
    .update(rawBody)
    .digest('base64');

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

async function replyToLine(replyToken, reply) {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('Missing LINE_CHANNEL_ACCESS_TOKEN');
  }

  const messages = Array.isArray(reply?.messages)
    ? reply.messages
    : [
        {
          type: 'text',
          text: typeof reply === 'string' ? reply : reply?.text || '',
          ...(reply?.quickReply ? { quickReply: reply.quickReply } : {}),
        },
      ];

  const response = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      replyToken,
      messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LINE reply failed: ${response.status} ${errorText}`);
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'line-webhook',
    status: 'ready',
  });
}

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-line-signature');
    const channelSecret = process.env.LINE_CHANNEL_SECRET;

    if (!verifyLineSignature(rawBody, signature, channelSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const events = Array.isArray(body?.events) ? body.events : [];

    await Promise.all(
      events.map(async (event) => {
        if (event.type !== 'message' || event.message?.type !== 'text') {
          return;
        }

        const replyToken = event.replyToken;
        const userText = event.message.text;
        const replyMessage = buildLineReply(userText);

        if (replyToken) {
          await replyToLine(replyToken, replyMessage);
        }
      }),
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('LINE webhook error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
