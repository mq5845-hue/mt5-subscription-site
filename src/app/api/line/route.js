import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { buildLineReply } from '@/lib/line-bot-brain';
import {
  getReservationPageUrl,
  storeLineInboundEvent,
} from '@/lib/reservation-integrations';

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

function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

function isReservationIntent(text) {
  const normalized = normalizeText(text);
  return /(\u9810\u7d04|\u5831\u540d|\u8aee\u8a62|\u540d\u55ae|reservation|booking|contact|line)/i.test(
    normalized,
  );
}

function addReservationCallToAction(reply) {
  const reservationUrl = getReservationPageUrl();
  const items = Array.isArray(reply?.quickReply?.items) ? [...reply.quickReply.items] : [];

  const hasReservationLink = items.some(
    (item) => item?.action?.type === 'uri' && item?.action?.uri === reservationUrl,
  );

  if (!hasReservationLink) {
    items.unshift({
      type: 'action',
      action: {
        type: 'uri',
        label: 'Reservation',
        uri: reservationUrl,
      },
    });
  }

  return {
    ...reply,
    text: `${reply.text || ''}\n\nYou can also book directly here: ${reservationUrl}`.trim(),
    quickReply: {
      items: items.slice(0, 13),
    },
  };
}

async function fetchLineProfile(userId, accessToken) {
  if (!userId || !accessToken) {
    return null;
  }

  const response = await fetch(
    `https://api.line.me/v2/bot/profile/${encodeURIComponent(userId)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
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
    const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

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
        const reservationIntent = isReservationIntent(userText);
        const finalReply = reservationIntent ? addReservationCallToAction(replyMessage) : replyMessage;
        const profile = await fetchLineProfile(event.source?.userId, accessToken);

        if (replyToken) {
          await replyToLine(replyToken, finalReply);
        }

        try {
          await storeLineInboundEvent({
            lineUserId: event.source?.userId,
            lineDisplayName: profile?.displayName || '',
            messageText: userText,
            eventType: event.type,
            intent: reservationIntent ? 'reservation' : 'normal',
            matchedId: replyMessage.matchedId,
            replyMode: replyMessage.mode,
            rawEvent: event,
            source: 'line_webhook',
          });
        } catch (error) {
          console.warn('Failed to store LINE inbound event:', error);
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
