import { BookingSystem } from "@/components/BookingSystem";
import { FadeInSection } from "@/components/FadeInSection";

export function GardenSection() {
  return (
    <section
      id="booking"
      data-section="booking"
      className="texture-sand-wash grain relative isolate min-h-[min(120svh,1400px)] overflow-hidden text-[var(--foreground)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(900px 500px at 70% 20%, color-mix(in srgb, var(--color-teal) 35%, transparent), transparent 60%)",
        }}
      />

      <div className="neuro-section relative mx-auto flex max-w-6xl flex-col justify-center py-24">
        <FadeInSection>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs tracking-[0.24em] text-[color-mix(in_srgb,var(--color-forest)_65%,var(--color-stone))]">
                هدوءٌ قبل الموعد
              </p>
              <h2 className="font-heading mt-4 text-balance text-3xl sm:text-5xl">الحجز</h2>
              <p className="mt-2 font-en text-xs tracking-[0.2em] text-[var(--color-forest)]/70">
                Booking
              </p>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-[1.85] text-[var(--foreground)]/80">
                بعد انتهاء المسار، يبقى للذهن انطباعٌ كالرخام: صلبٌ في البنية، لطيفٌ
                في الإحساس—وتتوالى الخطوات بهدوء نحو تأكيد الزيارة.
              </p>
            </div>

            <div className="rounded-3xl border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-sand)_92%,white)] px-6 py-5 text-sm shadow-sm">
              <div className="text-xs tracking-[0.22em] text-[var(--color-forest)]/70">
                لمسات لونية
              </div>
              <div className="mt-2 font-medium text-[var(--color-forest)]">
                تراب • خشب • زمرد خفيف
              </div>
            </div>
          </div>

          <div className="mt-14">
            <BookingSystem />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
