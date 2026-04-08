import { FadeInSection } from "@/components/FadeInSection";

const cards = [
  { t: "الحصن", d: "وصولٌ هادئ، ضوءٌ منخفض." },
  { t: "الطريق", d: "انتباهٌ أوضح، ومساحةٌ إنسانية." },
  { t: "الانشراح", d: "اتّساعٌ يهدئ الجهاز العصبيّ." },
] as const;

export function JourneyPath() {
  return (
    <section
      id="path"
      data-section="path"
      className="texture-wood grain relative isolate min-h-[min(110svh,1200px)] overflow-hidden py-20 text-[var(--color-sand)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-forest)_35%,transparent)] to-[color-mix(in_srgb,var(--color-earth)_25%,transparent)]" />

      <div className="neuro-section relative mx-auto max-w-4xl">
        <FadeInSection>
          <p className="text-xs tracking-[0.24em] text-[var(--color-sand)]/85">
            من الضيق إلى الطريق
          </p>
          <h2 className="font-heading mt-4 text-balance text-3xl text-[var(--color-sand)] sm:text-4xl">
            الطريق
          </h2>
          <p className="mt-2 font-en text-xs tracking-[0.2em] text-[var(--color-sand)]/75">
            The Path
          </p>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-[1.85] text-[var(--color-sand)]/88">
            كلما تقدّمتَ ضاقت الحوافّ قليلًا—فيُحدَّد الانتباه دون إرهاق. المسار يطلب
            سكونًا، ثم يمنحك اتجاهًا بلمسات ترابٍ وخشبٍ وهواءٍ معتدل.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {cards.map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-[var(--color-sand)]/20 bg-[color-mix(in_srgb,var(--color-forest)_22%,transparent)] p-6 backdrop-blur-sm"
              >
                <div className="text-sm font-semibold text-[var(--color-sand)]">{x.t}</div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--color-sand)]/80">
                  {x.d}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-[var(--color-sand)]/20 bg-[color-mix(in_srgb,var(--color-forest)_30%,transparent)] p-8 backdrop-blur-sm">
            <div className="text-xs tracking-[0.22em] text-[var(--color-teal)]">
              إشارة «العمارة العصبيّة»
            </div>
            <p className="mt-4 text-sm leading-[1.85] text-[var(--color-sand)]/88">
              تضييق الهوامش يقلّل ضجيج الأطراف البصرية، فيتجه الذهن إلى قناةٍ واحدة:
              انتباهٌ أوضح، وذاكرةٌ أنعم، ومعنى يتكوّن دون استعجال.
            </p>
            <div
              className="mt-6 h-1 w-full max-w-md rounded-full bg-[var(--color-sand)]/15"
              role="presentation"
            >
              <div className="h-full w-3/5 rounded-full bg-[var(--color-teal)]/80" />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
