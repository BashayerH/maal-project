"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Step = 1 | 2 | 3 | "done";

type BookingPayload = {
  event: "maal.booking_intent";
  version: 1;
  museum: {
    name_ar: "مآل";
    name_en: "Ma'al";
    city_ar: "المدينة المنوّرة";
  };
  booking: {
    dateISO: string; // YYYY-MM-DD
    time: string; // HH:mm
    timezone: string;
    visitors: number;
    notes?: string;
  };
  payer: {
    fullName?: string;
    email?: string;
  };
  payment: {
    mode: "mock";
    amount: number;
    currency: "SAR";
    status: "initiated" | "succeeded";
  };
  ticket?: {
    id: string;
    issuedAt: string;
    script_ar: string;
  };
  meta: {
    source: "landing";
    createdAt: string;
    consent: boolean;
  };
};

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function nowISO() {
  return new Date().toISOString();
}

function ticketId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return `T-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
}

export function BookingSystem() {
  const timeSlots = useMemo(() => {
    return ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"];
  }, []);

  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return isoDate(d);
  }, []);

  const [step, setStep] = useState<Step>(1);

  const [dateISO, setDateISO] = useState<string>(defaultDate);
  const [time, setTime] = useState<string>(timeSlots[2]);
  const [visitors, setVisitors] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<{
    payload: BookingPayload;
    ticketText: string;
  } | null>(null);

  const timezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Riyadh";
    } catch {
      return "Asia/Riyadh";
    }
  }, []);

  const amount = useMemo(() => {
    // MVP: symbolic contribution, not a commercial price
    return 10;
  }, []);

  const draftPayload = useMemo<BookingPayload>(() => {
    return {
      event: "maal.booking_intent",
      version: 1,
      museum: {
        name_ar: "مآل",
        name_en: "Ma'al",
        city_ar: "المدينة المنوّرة",
      },
      booking: {
        dateISO,
        time,
        timezone,
        visitors,
        notes: notes.trim() ? notes.trim() : undefined,
      },
      payer: {
        fullName: fullName.trim() ? fullName.trim() : undefined,
        email: email.trim() ? email.trim() : undefined,
      },
      payment: {
        mode: "mock",
        amount,
        currency: "SAR",
        status: result ? "succeeded" : "initiated",
      },
      ticket: result?.payload.ticket,
      meta: {
        source: "landing",
        createdAt: result?.payload.meta.createdAt ?? nowISO(),
        consent,
      },
    };
  }, [amount, consent, dateISO, email, fullName, notes, result, time, timezone, visitors]);

  return (
    <div className="grid gap-8 lg:grid-cols-1 lg:items-start">
      {/* Contract */}
      <div className="rounded-[2.5rem] border border-black/10 bg-white/75 p-6 shadow-[0_22px_70px_-40px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.22em] text-black/60 dark:text-white/60">
              «عقد زيارة» — إصدار تجريبي
            </div>
            <div className="mt-2 text-balance text-2xl font-semibold tracking-[-0.03em] text-black dark:text-white">
              ميثاق الدخول إلى مآل
            </div>
            <div className="mt-2 font-en text-xs tracking-[0.18em] text-black/50 dark:text-white/55">
              Booking Module MVP • Spiritual Contract
            </div>
          </div>
          <div className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs tracking-[0.18em] text-black/65 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            SAR {amount} • 
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-7 flex items-center gap-2 text-xs text-black/55 dark:text-white/55">
          {[
            { n: 1, t: "هالة المسار" },
            { n: 2, t: "التاريخ والوقت" },
            { n: 3, t: "الإتمام" },
          ].map((s, i) => {
            const activeStepNum: 1 | 2 | 3 = typeof step === "number" ? step : 3;
            const done = activeStepNum > (s.n as 1 | 2 | 3);
            const isActive = activeStepNum === (s.n as 1 | 2 | 3);
            return (
              <div key={s.n} className="flex items-center gap-2">
                <div
                  className={[
                    "grid h-7 w-7 place-items-center rounded-full border text-[10px] font-medium",
                    done
                      ? "border-black/10 bg-black text-white dark:border-white/10 dark:bg-white dark:text-black"
                      : isActive
                        ? "border-black/15 bg-[#d6b15d]/30 text-black dark:border-white/15 dark:bg-[#d6b15d]/20 dark:text-white"
                        : "border-black/10 bg-white/50 text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/55",
                  ].join(" ")}
                >
                  {s.n}
                </div>
                <div className={isActive ? "text-black/80 dark:text-white/80" : undefined}>
                  {s.t}
                </div>
                {i < 2 && <div className="h-px w-10 bg-black/10 dark:bg-white/10" />}
              </div>
            );
          })}
        </div>

        <div className="mt-7">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs tracking-[0.22em] text-black/55 dark:text-white/55">
                    الخطوة ١ — هالة المسار
                  </div>
                  <div className="mt-5 rounded-3xl border border-black/10 bg-white/70 p-6 text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
                    <div className="text-balance text-xl font-semibold text-black/85 dark:text-white/85">
                      مستعد لعيش وتجربة المسار
                    </div>
                    <div className="mt-3 text-sm leading-7">  
                      حضورٌ هادئ، وانتباهٌ نقي، وانشراحٌ تدريجي.
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-black/50 dark:text-white/55">
                    لا نطلب منك شراءً… بل نيةَ دخولٍ هادئة.
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    متابعة
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs tracking-[0.22em] text-black/55 dark:text-white/55">
                    الخطوة ٢ — التاريخ والوقت
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <div className="text-xs tracking-[0.18em] text-black/55 dark:text-white/55">
                        التاريخ
                      </div>
                      <input
                        type="date"
                        value={dateISO}
                        onChange={(e) => setDateISO(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/80 outline-none transition focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:focus:border-white/20"
                      />
                    </label>

                    <label className="block">
                      <div className="text-xs tracking-[0.18em] text-black/55 dark:text-white/55">
                        عدد الزائرين
                      </div>
                      <input
                        type="number"
                        min={1}
                        max={6}
                        value={visitors}
                        onChange={(e) => setVisitors(Number(e.target.value))}
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/80 outline-none transition focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:focus:border-white/20"
                      />
                      <div className="mt-2 text-xs text-black/45 dark:text-white/50">
                        مجموعات صغيرة للحفاظ على السكينة.
                      </div>
                    </label>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs tracking-[0.18em] text-black/55 dark:text-white/55">
                      الوقت
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {timeSlots.map((t) => {
                        const active = t === time;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            className={[
                              "rounded-2xl px-3 py-2 text-sm transition",
                              active
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/10 dark:text-white/75 dark:hover:bg-white/15",
                            ].join(" ")}
                            aria-pressed={active}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-3 text-xs text-black/45 dark:text-white/50">
                      المنطقة الزمنية: <span className="font-en">{timezone}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <div className="text-xs tracking-[0.18em] text-black/55 dark:text-white/55">
                        الاسم (اختياري)
                      </div>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="اسمك كما تحب أن يُكتب"
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/80 outline-none transition focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:focus:border-white/20"
                      />
                    </label>
                    <label className="block">
                      <div className="text-xs tracking-[0.18em] text-black/55 dark:text-white/55">
                        البريد الإلكتروني (اختياري)
                      </div>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        inputMode="email"
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/80 outline-none transition focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:focus:border-white/20"
                      />
                    </label>
                  </div>

                  <label className="mt-5 block">
                    <div className="text-xs tracking-[0.18em] text-black/55 dark:text-white/55">
                      ملاحظة (اختيارية)
                    </div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="نية مختصرة… أو طلب هادئ."
                      rows={3}
                      className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black/80 outline-none transition focus:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:focus:border-white/20"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm text-black/70 transition hover:bg-white/75 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                  >
                    رجوع
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    متابعة
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="text-xs tracking-[0.22em] text-black/55 dark:text-white/55">
                    الخطوة ٣ — الإتمام (دفع تجريبي)
                  </div>

                  <div className="mt-4 rounded-3xl border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="text-sm font-semibold text-black/85 dark:text-white/85">
                      بيان العهد
                    </div>
                    <div className="mt-2 text-sm leading-7 text-black/70 dark:text-white/70">
                      أُقِرّ أن هذه خطوةٌ تجريبية، وأن «المبلغ» تبرّع رمزي لحفظ
                      إيقاع التجربة. سأدخل المسار بهدوء، وأصون الصمت، وأترك المكان
                      أن يقول ما يريد.
                    </div>

                    <label className="mt-4 flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 accent-black dark:accent-white"
                      />
                      <span>
                        أوافق على إرسال بيانات الحجز (بصيغةٍ منظّمة) إلى webhook
                        خارجي لأتمتة العملية.
                      </span>
                    </label>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-black/50 dark:text-white/55">
                        المبلغ: <span className="font-en">SAR {amount}</span> •
                        طريقة: دفع تجريبي
                      </div>
                      <button
                        type="button"
                        disabled={!consent || processing}
                        onClick={async () => {
                          setProcessing(true);
                          // Mock payment latency
                          await new Promise((r) => setTimeout(r, 900));

                          const id = ticketId();
                          const issuedAt = nowISO();
                          const script = `بسم الله\n\nأشهد أن حامل هذه التذكرة قد عَقَدَ نيةَ الزيارة إلى «مآل».\nالتاريخ: ${dateISO}\nالوقت: ${time}\nعدد الزائرين: ${visitors}\n\nليكن الدخول سكينةً والخروج نورًا.\n\n— ختم مآل`;

                          const payload: BookingPayload = {
                            event: "maal.booking_intent",
                            version: 1,
                            museum: {
                              name_ar: "مآل",
                              name_en: "Ma'al",
                              city_ar: "المدينة المنوّرة",
                            },
                            booking: {
                              dateISO,
                              time,
                              timezone,
                              visitors,
                              notes: notes.trim() ? notes.trim() : undefined,
                            },
                            payer: {
                              fullName: fullName.trim() ? fullName.trim() : undefined,
                              email: email.trim() ? email.trim() : undefined,
                            },
                            payment: {
                              mode: "mock",
                              amount,
                              currency: "SAR",
                              status: "succeeded",
                            },
                            ticket: {
                              id,
                              issuedAt,
                              script_ar: script,
                            },
                            meta: {
                              source: "landing",
                              createdAt: issuedAt,
                              consent: true,
                            },
                          };

                          setResult({ payload, ticketText: script });
                          setProcessing(false);
                          setStep("done");
                        }}
                        className={[
                          "rounded-2xl px-5 py-3 text-sm font-medium shadow-sm transition",
                          !consent || processing
                            ? "bg-black/30 text-white/60 dark:bg-white/20 dark:text-black/50"
                            : "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
                        ].join(" ")}
                      >
                        {processing ? "جارٍ الإتمام…" : "إتمام الدفع التجريبي"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm text-black/70 transition hover:bg-white/75 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                  >
                    رجوع
                  </button>
                  <div className="text-xs text-black/50 dark:text-white/55">
                    سيتم تجهيز الإرسال للأتمتة لاحقًا (بدون عرض أكواد على الشاشة).
                  </div>
                </div>
              </motion.div>
            )}

            {step === "done" && result && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs tracking-[0.22em] text-black/55 dark:text-white/55">
                        تمّ الإتمام
                      </div>
                      <div className="mt-2 text-lg font-semibold text-black/85 dark:text-white/85">
                        تذكرتك «نصٌّ رقمي» جاهزة
                      </div>
                    </div>
                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                      <span className="font-en">#{result.payload.ticket?.id.slice(0, 8)}</span>
                    </div>
                  </div>

                  {/* Digital Script preview */}
                  <div className="mt-5 rounded-[2.25rem] border border-black/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-black/85 dark:text-white/85">
                        مآل
                      </div>
                      <div className="mt-1 font-en text-[11px] tracking-[0.22em] text-black/50 dark:text-white/55">
                        MA&apos;AL
                      </div>
                      <div className="mt-4 h-px w-full bg-black/10 dark:bg-white/10" />
                    </div>

                    <pre className="mt-5 whitespace-pre-wrap text-sm leading-8 text-black/75 dark:text-white/75">
                      {result.ticketText}
                    </pre>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-xs text-black/65 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                        <div className="text-[11px] tracking-[0.18em] opacity-70">
                          بيانات الزيارة
                        </div>
                        <div className="mt-2">
                          {dateISO} • {time}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-xs text-black/65 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                        <div className="text-[11px] tracking-[0.18em] opacity-70">
                          ختم رقمي
                        </div>
                        <div className="mt-2 font-en">
                          issuedAt: {result.payload.ticket?.issuedAt}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm text-black/70 transition hover:bg-white/75 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                    >
                      طباعة / حفظ PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setResult(null);
                        setConsent(false);
                        setStep(1);
                      }}
                      className="rounded-2xl bg-[#d6b15d] px-5 py-3 text-sm font-medium text-[#0b0d10] transition hover:bg-[#e3c47c]"
                    >
                      إنشاء عقد جديد
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

