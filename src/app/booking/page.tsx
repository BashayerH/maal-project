import type { Metadata } from "next";
import Link from "next/link";
import { BookingSystem } from "@/components/BookingSystem";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "حجز التذاكر | مآل",
};

export default function BookingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--color-sand)]">
      <Header />

      <main className="neuro-section mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/60">
              التذاكر
            </div>
            <h1 className="font-heading mt-2 text-3xl sm:text-4xl">
              نظام الحجز
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--foreground)]/70">
              تصميمٌ هادئ كـ «ميثاق» — واضح، غير مزدحم، ويمكن تمريره بسهولة.
            </p>
          </div>

          <Link
            href="/#booking"
            className="rounded-full border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/80 px-4 py-2 text-sm text-[var(--color-forest)]/80 transition hover:bg-white"
          >
            العودة
          </Link>
        </div>

        <BookingSystem />
      </main>
    </div>
  );
}
