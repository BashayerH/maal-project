import Image from "next/image";
import { FadeInSection } from "@/components/FadeInSection";

type Chapter = {
  no: string;
  title: string;
  subtitle: string;
  body: string;
  images: string[];
};

const chapters: Chapter[] = [
  {
    no: "01",
    title: "التخطيط",
    subtitle: "من الفكرة إلى المسار",
    body: "نبدأ برسم الإيقاع: كيف يشعر الجسد قبل أن تفهم العين؟ أين تبدأ السكينة؟",
    images: ["/m1.png", "/m7.jpeg", "/m8.jpeg"],
  },
  {
    no: "02",
    title: "التقنية",
    subtitle: "عمارة عصبية، بلمسات خفيفة",
    body: "نقلّل الضجيج البصري ونمنح المحتوى مسارًا واحدًا. الحركة تكون عند الحاجة فقط—بوضوح لا بقوة.",
    images: ["/m2.png", "/m9.jpeg"],
  },
  {
    no: "03",
    title: "التجربة",
    subtitle: "من التخفيض إلى الاتساع",
    body: "تدخل التجربة بهدوء: تضييقٌ يُنقّي الانتباه، ثم اتساعٌ يفتح النفس. كل خطوة تقول: “تابع”.",
    images: ["/m3.png", "/m4.jpeg", "/m10.jpeg"],
  },
  {
    no: "04",
    title: "الحجز",
    subtitle: "ميثاق دخولٍ رقمي",
    body: "عند جاهزيتك، نُنهي الميثاق بسرعة: تاريخ + تفاصيل قليلة + إتمام تجريبي. تذكرتك النصية تظهر فورًا.",
    images: ["/m5.jpeg", "/m6.jpeg"],
  },
];

export function StoryTripSection() {
  return (
    <section
      className="relative overflow-hidden py-20"
      aria-label="رحلة مآل القصصية"
    >
      <div className="texture-wood pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-forest)_18%,transparent),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <FadeInSection>
            <p className="text-xs tracking-[0.24em] text-[var(--color-forest)]/70">
              رحلة مآل
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl">
              من التخطيط إلى التجربة… ثم الحجز
            </h2>
          </FadeInSection>

          <FadeInSection className="max-w-xl">
            <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/70">
              لا نُخبرك فقط—بل نُعيد ترتيب إحساسك بالمكان. نصوصٌ واضحة وصورٌ
              تفتح التباين، مع واجهة هادئة تحترم وقتك.
            </p>
          </FadeInSection>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-2">
          {chapters.map((c, idx) => {
            const isRight = idx % 2 === 1;
            return (
              <FadeInSection key={c.no} className="neuro-section p-0">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)] bg-white/70">
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1 sm:grid-cols-3">
                    {c.images.map((src) => (
                      <div
                        key={src}
                        className="relative overflow-hidden rounded-[1.35rem]"
                      >
                        <Image
                          src={src}
                          alt={c.title}
                          fill
                          loading="lazy"
                          sizes="(max-width:1024px) 92vw, 360px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/28" />
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/65" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,93,75,0.18),transparent_65%)]" />

                  <div className={["relative p-6 sm:p-8", isRight ? "text-right" : "text-left"].join(" ")}>
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-forest)] text-[var(--color-sand)] shadow-sm">
                          {c.no}
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl text-white">
                          {c.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-2 text-xs tracking-[0.22em] text-[var(--color-sand)]/80">
                      {c.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/80">
                      {c.body}
                    </p>

                    {c.title === "الحجز" && (
                      <div className="mt-6">
                        <a
                          href="#booking"
                          className="inline-flex items-center justify-center rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-semibold text-[var(--color-sand)] transition hover:brightness-110"
                        >
                          مستعد لعيش وتجربة المسار
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

