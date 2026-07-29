export const DAILY_TRIAL_LIMIT = 5;

const STORAGE_PREFIX = "ai-quant-daily-trial";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function storageKey() {
  return `${STORAGE_PREFIX}:${todayKey()}`;
}

export function hasReachedDailyTrialLimit() {
  if (typeof window === "undefined") return false;
  return Number(window.localStorage.getItem(storageKey()) || 0) >= DAILY_TRIAL_LIMIT;
}

export function consumeDailyTrial() {
  if (typeof window === "undefined") return { allowed: true, used: 0, remaining: DAILY_TRIAL_LIMIT };

  const key = storageKey();
  const used = Math.max(0, Number(window.localStorage.getItem(key) || 0));
  if (used >= DAILY_TRIAL_LIMIT) return { allowed: false, used, remaining: 0 };

  const nextUsed = used + 1;
  window.localStorage.setItem(key, String(nextUsed));
  return { allowed: true, used: nextUsed, remaining: DAILY_TRIAL_LIMIT - nextUsed };
}
