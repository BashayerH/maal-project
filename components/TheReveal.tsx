"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TheReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Gradual “release” into a wider container
  const containerMax = useTransform(scrollYProgress, [0, 1], ["52rem", "92vw"]);
  const containerPad = useTransform(scrollYProgress, [0, 1], ["1.25rem", "2.25rem"]);

  const glow = useTransform(scrollYProgress, [0, 1], [0.0, 0.75]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.35, 1], [0, 1, 1]);

  return (
    <motion.section
      ref={ref}
      id="reveal"
      data-section="reveal"
      className="relative isolate min-h-[120svh] overflow-hidden text-zinc-100 grain"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1400px 900px at 60% 5%, rgba(214,177,93,0.18), transparent 58%), radial-gradient(900px 600px at 40% 30%, rgba(255,255,255,0.05), transparent 62%), linear-gradient(180deg, rgba(10,12,16,0.0), rgba(10,12,16,0.8) 70%, rgba(10,12,16,0.95))",
          filter: "contrast(1.05) saturate(1.05)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glow,
          background:
            "radial-gradient(900px 500px at 55% 18%, rgba(214,177,93,0.50), rgba(214,177,93,0.10) 45%, transparent 70%)",
          filter: "blur(0.2px)",
        }}
      />

      <div className="relative flex min-h-[120svh] items-center justify-center">
        <motion.div
          className="w-full"
          style={{
            maxWidth: containerMax,
            paddingLeft: containerPad,
            paddingRight: containerPad,
          }}
        >
          <motion.div
            className="mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12"
            style={{ opacity: textOpacity }}
          >
            <p className="font-ar text-xs tracking-[0.24em] text-white/70">
              انكشاف النور
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              الانكشاف
            </h2>
            <p className="mt-2 font-en text-xs tracking-[0.20em] text-white/65">
              The Reveal
            </p>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-white/75">
              ينفرج الممرّ—تتسع المساحة، يهدأ الجسد، وتُعاد معايرة الوعي. يصل
              الضوء الدافئ ببطء، لا كاستعراض، بل كإذنٍ: للتذكّر، للتأمّل، للإحساس.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  t: "اتّساع المجال",
                  d: "تعود الرؤية الطرفية؛ ويتسرّب السكون.",
                },
                { t: "دفءٌ ذهبيّ", d: "يلين الجهاز العصبيّ." },
                { t: "معنى", d: "يصير المكانُ سردًا لا جدارًا." },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-sm font-medium text-white">{x.t}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">
                    {x.d}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#booking"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                أكمل إلى الحجز
              </a>
              <a
                href="#booking"
                className="rounded-full bg-[#d6b15d] px-5 py-2.5 text-sm font-medium text-[#0b0d10] shadow-sm shadow-black/25 transition hover:bg-[#e3c47c]"
              >
                اختر موعدًا
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

