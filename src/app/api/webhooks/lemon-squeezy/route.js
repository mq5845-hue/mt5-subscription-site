import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  buildMembershipRowFromWebhook,
  logMembershipWebhookEvent,
  saveMembershipRow,
  safeJsonParse,
  trimValue,
} from '@/lib/membership-integrations';

export const runtime = 'nodejs';

function verifySignature(rawBody, signature, secret) {
  if (!rawBody || !signature || !secret) {
    return false;
  }

  const expected = Buffer.from(
    crypto.createHmac('sha256', secret).update(rawBody).digest('hex'),
    'utf8',
  );
  const received = Buffer.from(trimValue(signature), 'utf8');

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}

function buildEventKey(payload, rawBody) {
  const eventName = trimValue(payload?.meta?.event_name) || 'unknown';
  const eventId = trimValue(payload?.data?.id);
  const updatedAt = trimValue(payload?.data?.attributes?.updated_at);
  const fallbackHash = crypto.createHash('sha256').update(rawBody).digest('hex');

  return `${eventName}:${eventId || 'no-id'}:${updatedAt || fallbackHash}`;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'lemon-squeezy-webhook',
    status: 'ready',
  });
}

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');
    const secret = trimValue(process.env.LEMON_SQUEEZY_WEBHOOK_SECRET);

    if (!verifySignature(rawBody, signature, secret)) {
      return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 401 });
    }

    const payload = safeJsonParse(rawBody);

    if (!payload?.meta?.event_name) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
    }

    const eventRecord = {
      event_key: buildEventKey(payload, rawBody),
      event_name: trimValue(payload?.meta?.event_name),
      email: trimValue(payload?.data?.attributes?.user_email || payload?.data?.attributes?.customer_email),
      subject_id: trimValue(payload?.data?.id),
      status: trimValue(payload?.data?.attributes?.status),
      raw_payload: payload,
      created_at: new Date().toISOString(),
    };

    try {
      await logMembershipWebhookEvent(eventRecord);
    } catch (error) {
      console.warn('Failed to log Lemon Squeezy webhook event:', error);
    }

    const membershipRow = buildMembershipRowFromWebhook(payload);

    if (membershipRow.email) {
      await saveMembershipRow(membershipRow);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lemon Squeezy webhook error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'internal_error',
        message: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
