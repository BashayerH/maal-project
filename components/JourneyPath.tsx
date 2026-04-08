"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function JourneyPath() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // “Narrowing margins” as you scroll through this section
  const gutter = useTransform(scrollYProgress, [0, 1], [22, 56]);
  const stoneToClay = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const progressWidth = useTransform(scrollYProgress, (v) => {
    const pct = clamp(v, 0, 1) * 100;
    return `${pct}%`;
  });

  const bg = useMemo(() => {
    // Keep gradients deterministic (no random) for SSR stability
    return {
      stone:
        "radial-gradient(1200px 800px at 55% 10%, rgba(255,255,255,0.05), transparent 60%), repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 9px)",
      clay:
        "radial-gradient(900px 650px at 60% 5%, rgba(255,210,160,0.10), transparent 62%), repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 12px)",
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      id="path"
      data-section="path"
      className="relative isolate min-h-[110svh] overflow-hidden text-zinc-100 grain"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 1,
          backgroundImage: bg.stone,
          filter: "brightness(0.72) contrast(1.06)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: stoneToClay,
          backgroundImage: bg.clay,
          filter: "brightness(0.95) saturate(0.95) contrast(1.02)",
        }}
      />

      <div className="relative mx-auto flex min-h-[110svh] items-center">
        <motion.div
          className="w-full"
          style={{
            paddingLeft: gutter,
            paddingRight: gutter,
          }}
        >
          <div className="mx-auto max-w-4xl">
            <motion.div style={{ y: headingY }}>
              <p className="font-ar text-xs tracking-[0.24em] text-zinc-200/80">
                من الضيق إلى الطريق
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-4xl">
                الطريق
              </h2>
              <p className="mt-2 font-en text-xs tracking-[0.20em] text-zinc-200/70">
                The Path
              </p>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-200/75">
                كلما تقدّمتَ ضاقت الحوافّ—فتَحدُّدُ الانتباه. يطلب منك المتحف
                سكونًا، ثم يمنحك اتجاهًا: ممرٌّ من طينٍ خشن، على مقياس الإنسان.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { t: "الحصن", d: "وصولٌ هادئ، ضوءٌ منخفض." },
                { t: "الانشراح", d: "مجالٌ أضيق، نَفَسٌ أدق." },
                { t: "الازدهار", d: "الملمسُ يصبح بوصلة." },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <div className="text-sm font-medium text-zinc-50">{x.t}</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-200/70">
                    {x.d}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-black/25 p-6">
              <div className="text-xs tracking-[0.22em] text-zinc-200/70">
                إشارة «العمارة العصبيّة»
              </div>
              <div className="mt-3 text-sm leading-7 text-zinc-200/80">
                تضييق الهوامش يقلّل «ضجيج» الأطراف، ويدفع العقل إلى قناةٍ واحدة:
                انتباهٌ وذاكرةٌ ومعنى تتراصف.
              </div>
              <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: progressWidth,
                    background:
                      "linear-gradient(90deg, rgba(214,177,93,0.35), rgba(255,255,255,0.25))",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

