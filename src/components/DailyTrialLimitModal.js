"use client";

const copy = {
  en: {
    title: "Daily trial limit reached",
    body: "You have reached today's limit of 5 trial tasks. Your quota will refresh automatically tomorrow. We welcome you to try again then.",
    close: "Understood",
  },
  "zh-Hant": {
    title: "已達每日試用上限",
    body: "您今日已使用 5 次試用任務。額度將於明日自動刷新，歡迎您明日再次使用。",
    close: "我知道了",
  },
  "zh-Hans": {
    title: "已达每日试用上限",
    body: "您今日已使用 5 次试用任务。额度将在明日自动刷新，欢迎您明日再次使用。",
    close: "我知道了",
  },
};

export default function DailyTrialLimitModal({ open, locale, onClose }) {
  if (!open) return null;
  const text = copy[locale] || copy.en;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="daily-trial-limit-title">
      <div className="w-full max-w-md rounded-2xl border border-cyan-200/50 bg-slate-950 p-6 text-center shadow-[0_0_28px_rgba(103,232,249,0.3),0_28px_80px_rgba(2,6,23,0.75)]">
        <div aria-hidden="true" className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200/45 bg-cyan-300/10 text-2xl shadow-[0_0_20px_rgba(34,211,238,0.35)]">🛡️</div>
        <h2 id="daily-trial-limit-title" className="text-lg font-black text-white">{text.title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">{text.body}</p>
        <button type="button" onClick={onClose} className="mt-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:brightness-110">
          {text.close}
        </button>
      </div>
    </div>
  );
}
