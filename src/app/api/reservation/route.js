import { NextResponse } from 'next/server';
import {
  buildReservationPayload,
  storeReservationLead,
  validateReservationPayload,
} from '@/lib/reservation-integrations';

export const runtime = 'nodejs';

async function parseIncomingRequest(request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'reservation',
    status: 'ready',
  });
}

export async function POST(request) {
  try {
    const raw = await parseIncomingRequest(request);
    const payload = buildReservationPayload(raw);
    const missing = validateReservationPayload(payload);

    if (missing.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: 'validation_error',
          missing,
        },
        { status: 400 },
      );
    }

    const result = await storeReservationLead(payload);

    if (result.supabase?.skipped && result.googleForm?.skipped) {
      return NextResponse.json(
        {
          ok: false,
          error: 'integration_not_configured',
          message:
            'Please configure SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and GOOGLE_FORM_ACTION_URL before using the reservation form.',
        },
        { status: 503 },
      );
    }

    const hasErrors = [result.supabase?.error, result.googleForm?.error].filter(Boolean);

    return NextResponse.json({
      ok: true,
      integrations: {
        supabase: result.supabase?.skipped ? 'skipped' : 'saved',
        googleForm: result.googleForm?.skipped ? 'skipped' : 'sent',
      },
      warnings: hasErrors,
    });
  } catch (error) {
    console.error('Reservation submit error:', error);
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
