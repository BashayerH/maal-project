"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GardenSection } from "@/components/GardenSection";
import { HeroSection } from "@/components/HeroSection";
import { JourneyPath } from "@/components/JourneyPath";

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // Global, linear material shift: Stone -> Clay -> Marble
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ["#1A1A1A", "#D2B48C", "#FFFFFF"]);

  // Global “breathing” container padding (compression -> release)
  const padX = useTransform(scrollYProgress, [0, 0.7, 1], ["1.25rem", "1.6rem", "2.6rem"]);

  // Typography “الانشراح”: more air as we approach the garden
  const letterSpacing = useTransform(scrollYProgress, [0, 0.75, 1], ["0.01em", "0.02em", "0.035em"]);
  const lineHeight = useTransform(scrollYProgress, [0, 0.75, 1], ["1.55", "1.65", "1.8"]);

  return (
    <motion.div
      ref={pageRef}
      className="relative min-h-[100svh]"
      style={{ backgroundColor: bg }}
    >
      {/* Global padding + breathing typography (applies site-wide) */}
      <motion.main
        className="min-h-[100svh]"
        style={{
          paddingLeft: padX,
          paddingRight: padX,
          letterSpacing,
          lineHeight,
        }}
      >
        <HeroSection />
        <JourneyPath />
        <GardenSection />

        <footer className="bg-black/90 text-white/70">
          <div className="mx-auto max-w-6xl px-0 py-14">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <div className="text-xs tracking-[0.22em] text-white/60">
                  مآل
                </div>
                <div className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                  مآل
                </div>
                <div className="mt-2 font-en text-sm tracking-[0.16em] text-white/55">
                  Ma&apos;al
                </div>
                <div className="mt-2 text-sm text-white/60">
                  المدينة المنوّرة  • مسيرٌ بطيء
                </div>
              </div>
              <div className="text-xs tracking-[0.22em] text-white/55">
                الانقباض ← الانفراج ← الازدهار
              </div>
            </div>
          </div>
        </footer>
      </motion.main>
    </motion.div>
  );
}
