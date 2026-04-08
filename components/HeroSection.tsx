"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const vignette = useTransform(scrollYProgress, [0, 1], [0.75, 0.35]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -32]);

  return (
    <motion.section
      ref={ref}
      id="fortress"
      data-section="fortress"
      className="relative isolate min-h-[100svh] overflow-hidden text-zinc-100"
    >
      {/* Primary hero image (optimized WebP) */}
      <div className="absolute inset-0">
        <Image
          src="/face.webp"
          alt="رحلة من الحصن إلى الانشراح"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.70) 78%, rgba(0,0,0,0.84) 100%), radial-gradient(900px 600px at 50% 0%, rgba(0,0,0,0.0), rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.78) 100%)",
          opacity: vignette,
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 py-20">
        <motion.div style={{ y: lift }}>
          <p className="text-sm tracking-[0.22em] text-zinc-200/85">
             • رحلة من الحصن إلى الانشراح
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            مآل
          </h1>
          <p className="mt-3 font-en text-sm tracking-[0.18em] text-zinc-200/75">
            Ma&apos;al
          </p>
          <p className="mt-6 max-w-prose text-pretty text-base leading-7 text-zinc-300/90">
            تجربةٌ معماريّة روحانيّة في المدينة المنوّرة—تُعيد تشكيل الإحساس
            بالمكان عبر تدرّجٍ محسوب: تضييقٌ يُنقّي الانتباه، ثم اتّساعٌ يمنح
            ارتياحًا ووضوحًا.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-medium text-zinc-950 shadow-sm shadow-black/20 transition hover:bg-white"
            >
              احجز تجربتك
            </a>
            <a
              href="#path"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 backdrop-blur transition hover:bg-white/10"
            >
              ابدأ المسار
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-xs text-zinc-400">
            <div>
              <div className="text-zinc-200">الحصن</div>
              <div className="mt-1">ضيقٌ، سكونٌ، ثِقَلٌ هادئ</div>
            </div>
            <div>
              <div className="text-zinc-200">الانشراح</div>
              <div className="mt-1">نَفَسٌ أوسع، ضوءٌ أدفأ</div>
            </div>
            <div>
              <div className="text-zinc-200">الازدهار</div>
              <div className="mt-1">حديقةٌ، ماءٌ، صفاء</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

