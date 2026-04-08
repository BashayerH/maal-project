"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookingSystem } from "@/components/BookingSystem";

export function GardenSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const waterX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const waterOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.35, 0.7, 0.55]);
  const lift = useTransform(scrollYProgress, [0, 1], [24, -16]);

  return (
    <motion.section
      ref={ref}
      id="booking"
      data-section="booking"
      className="relative isolate min-h-[120svh] overflow-hidden text-black grain"
    >
      {/* Marble texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 900px at 40% 10%, rgba(255,255,255,1), rgba(255,255,255,0.0) 55%), repeating-linear-gradient(110deg, rgba(0,0,0,0.020) 0px, rgba(0,0,0,0.020) 1px, transparent 1px, transparent 11px), radial-gradient(900px 500px at 70% 40%, rgba(138,191,157,0.12), transparent 55%)",
          filter: "brightness(1.05) contrast(1.02)",
        }}
      />

      {/* Water ribbon */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-[18%] h-[220px]"
        style={{
          x: waterX,
          opacity: waterOpacity,
          backgroundImage:
            "radial-gradient(closest-side at 20% 55%, rgba(120,190,220,0.45), transparent 70%), radial-gradient(closest-side at 70% 45%, rgba(120,190,220,0.35), transparent 72%), linear-gradient(90deg, rgba(120,190,220,0.0), rgba(120,190,220,0.25), rgba(120,190,220,0.0))",
          filter: "blur(0.2px)",
          transform: "skewY(-4deg)",
        }}
      />

      <div className="relative mx-auto flex min-h-[120svh] max-w-6xl flex-col justify-center px-6 py-24">
        <motion.div style={{ y: lift }}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-ar text-xs tracking-[0.24em] text-black/60">
                جنّة السكينة
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-black sm:text-5xl">
                الحجز
              </h2>
              <p className="mt-2 font-en text-xs tracking-[0.20em] text-black/55">
                Booking
              </p>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-black/65">
                ينفتح الهواء. يعكس الرخامُ سماءً أهدأ. يتحرّك الماء بلا استعجال.
                هنا يصير المتحفُ حديقةً—أثرًا متبقّيًا من الطمأنينة… وانشراحًا.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/70 px-5 py-4 text-sm text-black/70 shadow-sm backdrop-blur">
              <div className="text-xs tracking-[0.22em] text-black/55">
                نبرة لونية
              </div>
              <div className="mt-1 font-medium text-black/80">
                أخضرٌ لطيف • ذهبٌ دافئ • ضوءُ الماء
              </div>
            </div>
          </div>

          <div className="mt-12">
            <BookingSystem />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

