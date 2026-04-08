"use client";

import { useEffect, useState } from "react";

type Step = 1 | 2 | 3 | "done";

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function BookingSystem() {
  const [step, setStep] = useState<Step>(1);
  const [dateISO, setDateISO] = useState<string>("");
  const [visitors, setVisitors] = useState<number>(1);
  const [processing, setProcessing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [doneId, setDoneId] = useState<string>("");

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setDateISO(isoDate(d));
  }, []);

  const handleVisitorsChange = (change: number) => {
    setVisitors(prev => Math.min(Math.max(1, prev + change), 6));
  };

  return (
    <div className="w-full">
      <div className="rounded-[2.75rem] border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-sand)_88%,white)] p-6 shadow-[0_18px_55px_-40px_rgba(0,0,0,0.25)] sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/60">
              «ميثاق زيارة» — إصدار تجريبي
            </div>
            <h2 className="font-heading mt-2 text-2xl sm:text-3xl">
              ميثاق الحجز في مآل
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/70">
              واجهة هادئة بلا ازدحام — تحفظ الإحساس وتبقى واضحة على كل الشاشات.
            </p>
          </div>
          <div className="rounded-full border border-[color-mix(in_srgb,var(--color-stone)_40%,transparent)] bg-white/80 px-4 py-2 text-xs text-[var(--color-forest)]/75">
            تبرّع رمزي • SAR 10
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[var(--color-forest)]/65">
          {[
            { n: 1, t: "هالة المسار" },
            { n: 2, t: "التفاصيل" },
            { n: 3, t: "الإتمام" },
          ].map((s, i) => {
            const current = step === "done" ? 3 : step;
            const active = current === (s.n as 1 | 2 | 3);
            const done = current > (s.n as 1 | 2 | 3);
            return (
              <div key={s.n} className="flex items-center gap-2">
                <div
                  className={[
                    "grid h-7 w-7 place-items-center rounded-full border text-[10px] font-medium",
                    done
                      ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-sand)]"
                      : active
                        ? "border-[var(--color-teal)] bg-[color-mix(in_srgb,var(--color-teal)_25%,white)] text-[var(--color-forest)]"
                        : "border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/70 text-[var(--color-forest)]/55",
                  ].join(" ")}
                >
                  {s.n}
                </div>
                <span className={active ? "text-[var(--color-forest)]" : undefined}>
                  {s.t}
                </span>
                {i < 2 && (
                  <div className="h-px w-8 bg-[color-mix(in_srgb,var(--color-stone)_45%,transparent)]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          {step === 1 && (
            <div className="rounded-[2.25rem] border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 p-6 text-center sm:p-10">
              <div className="text-xs tracking-[0.28em] text-[var(--color-forest)]/60">
                هالة المسار
              </div>
              <div className="font-heading mt-4 text-2xl text-[var(--color-forest)] sm:text-3xl">
                مستعد لعيش وتجربة المسار
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/70">
                حضورٌ هادئ، وانتباهٌ نقي، وانشراحٌ تدريجي.
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full bg-[var(--color-forest)] px-10 py-3.5 text-sm font-semibold text-[var(--color-sand)] transition hover:brightness-110 active:scale-[0.99]"
                >
                  متابعة
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/60">
                    التاريخ
                  </div>
                  <input
                    type="date"
                    value={dateISO}
                    onChange={(e) => setDateISO(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-teal)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)]"
                  />
                </label>

                <div>
                  <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/60">
                    عدد الزائرين
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleVisitorsChange(1)}
                      className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-sand)] text-[var(--color-forest)] transition hover:brightness-105"
                    >
                      +
                    </button>
                    <div className="w-16 text-center text-lg font-semibold text-[var(--color-forest)]">
                      {visitors}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleVisitorsChange(-1)}
                      className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-sand)] text-[var(--color-forest)] transition hover:brightness-105"
                    >
                      -
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-[var(--foreground)]/60">
                    مجموعات صغيرة للحفاظ على السكينة.
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/60">
                    الاسم (اختياري)
                  </div>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-teal)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)]"
                    placeholder="اسمك كما تحب أن يُكتب"
                  />
                </label>
                <label className="block">
                  <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/60">
                    البريد (اختياري)
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-teal)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)]"
                    placeholder="name@example.com"
                    inputMode="email"
                  />
                </label>
              </div>

              <label className="block">
                <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/60">
                  ملاحظة (اختيارية)
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-2xl border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-teal)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-teal)_30%,transparent)]"
                  placeholder="نية مختصرة…"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color-mix(in_srgb,var(--color-stone)_35%,transparent)] pt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/80 px-8 py-3 text-sm text-[var(--color-forest)]/75 transition hover:bg-white"
                >
                  رجوع
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-full bg-[var(--color-forest)] px-10 py-3 text-sm font-semibold text-[var(--color-sand)] transition hover:brightness-110"
                >
                  متابعة
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-[2.25rem] border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 p-6 text-center sm:p-10">
              <div className="font-heading text-2xl text-[var(--color-forest)] sm:text-3xl">
                تأكيد الميثاق
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/70">
                أنت بصدد تثبيت زيارتك بتاريخ ({dateISO}). ننتظر حضورًا هادئًا
                ومسارًا منشرحًا.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/80 px-8 py-3 text-sm text-[var(--color-forest)]/75 transition hover:bg-white"
                >
                  تعديل التفاصيل
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => {
                    setProcessing(true);
                    setTimeout(() => {
                      setProcessing(false);
                      setDoneId(`M-${Date.now().toString(36)}`);
                      setStep("done");
                    }, 700);
                  }}
                  className={[
                    "rounded-full px-10 py-3 text-sm font-semibold transition",
                    processing
                      ? "cursor-not-allowed bg-[color-mix(in_srgb,var(--color-stone)_35%,transparent)] text-[var(--foreground)]/70"
                      : "bg-[var(--color-forest)] text-[var(--color-sand)] hover:brightness-110",
                  ].join(" ")}
                >
                  {processing ? "جارٍ الإتمام…" : "إتمام"}
                </button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="rounded-[2.25rem] border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/85 p-6 text-center sm:p-10">
              <div className="font-heading text-2xl text-[var(--color-forest)] sm:text-3xl">
                تم الإتمام
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/70">
                تذكرتك الرقمية جاهزة. رقم الميثاق:{" "}
                <span className="font-en">{doneId}</span>
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full bg-[var(--color-teal)] px-10 py-3 text-sm font-semibold text-[var(--color-forest)] transition hover:brightness-105"
                >
                  بدء من جديد
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
