'use client';

import { useState } from 'react';

function Field({ label, name, type = 'text', placeholder, required = false, rows }) {
  const commonClassName =
    'w-full rounded-2xl border border-cyan-400/15 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20';

  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-slate-100">{label}</span>
      {type === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          rows={rows || 4}
          placeholder={placeholder}
          className={`${commonClassName} min-h-[120px] rounded-3xl`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={commonClassName}
        />
      )}
    </label>
  );
}

export default function ReservationForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || 'Unable to submit the form.');
      }

      setStatus('success');
      setMessage(
        `Submitted. Supabase: ${payload.integrations.supabase}, Google Form: ${payload.integrations.googleForm}.`,
      );
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to submit the form.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Test Name" required />
        <Field label="Email" name="email" type="email" placeholder="test@example.com" required />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Address" name="address" placeholder="Test Address" required />
        <Field label="Phone number" name="phoneNumber" placeholder="0912345678" />
      </div>

      <Field
        label="Comments"
        name="comments"
        type="textarea"
        rows={4}
        placeholder="Hello"
      />

      <input type="hidden" name="source" value="website" />
      <input type="hidden" name="status" value="new" />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_16px_50px_rgba(34,211,238,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit reservation'}
      </button>

      {message ? (
        <p
          className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status === 'success'
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
              : 'border-rose-400/20 bg-rose-400/10 text-rose-100'
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
