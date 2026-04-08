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
    images: ["/m4.jpeg", "/m11.jpeg", "/m12.jpeg"],
  },
  {
    no: "02",
    title: "التقنية",
    subtitle: "حكاية تراث، بلمسات عصرية",
    body: "حساسات مداخل ذكيه، واجهة بزجاجين عزل حراري وصوتي، تسجيل الكتروني عند المدخل، وإثراء تجربة حسية بالواقع الافتراضي.",
    images: ["/m2.png", "/m13.png", "/m1.png"],
  },
  {
    no: "03",
    title: "التجربة",
    subtitle: "من الضيق إلى الاتساع",
    body: "تدخل التجربة بهدوء: تضييقٌ يُنقّي الانتباه، ثم اتساعٌ يفتح النفس. كل خطوة تقول: “تابع”.",
    images: ["/m9.jpeg", "/m7.jpeg", "/m10.jpeg", "/m14.jpeg"],
  },
  {
    no: "04",
    title: "الحجز",
    subtitle: "ميثاق دخولٍ رقمي",
    body: "عند جاهزيتك، نُنهي الميثاق بسرعة: تاريخ + تفاصيل قليلة + إتمام تجريبي. تذكرتك النصية تظهر فورًا.",
    images: ["/m8.jpeg"],
  },
];

export function StoryTripSection() {
  return (
    <section
      className="relative overflow-hidden py-32 bg-[var(--color-sand)]"
      aria-label="رحلة مآل القصصية"
    >
      {/* Dynamic Backgrounds */}
      <div className="texture-wood pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--color-teal)_15%,transparent),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-24 flex flex-col items-center text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-forest)]/20 bg-[var(--color-forest)]/5 px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-earth)]"></span>
              <p className="text-xs font-bold tracking-[0.2em] text-[var(--color-forest)] uppercase">
                رحلة مآل
              </p>
            </div>
            <h2 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-5xl text-[var(--color-forest)]">
              من التخطيط إلى التجربة… ثم الحجز
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]/80">
              لا نُخبرك فقط—بل نُعيد ترتيب إحساسك بالمكان. نصوصٌ واضحة وصورٌ تفتح التباين، مع واجهة هادئة تحترم وقتك.
            </p>
          </FadeInSection>
        </div>

        <div className="relative flex flex-col gap-32 lg:gap-40">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[2.25rem] lg:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[var(--color-forest)]/30 to-transparent hidden sm:block" />

          {chapters.map((c, idx) => {
            const isRight = idx % 2 === 1; // Used for horizontal layout reversing
            return (
              <FadeInSection key={c.no} className="relative z-10 w-full">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                  {/* Timeline Dot (lg screens) */}
                  <div className="absolute left-[2.25rem] lg:left-1/2 top-[10%] lg:top-1/2 hidden sm:flex -translate-x-1/2 -translate-y-1/2 items-center justify-center w-6 h-6 rounded-full bg-[var(--color-sand)] border-[3px] border-[var(--color-forest)] shadow-[0_0_0_4px_var(--color-sand)] z-20">
                  </div>

                  {/* Text Details */}
                  <div className={`order-2 ${isRight ? "lg:order-2 lg:pr-16" : "lg:order-1 lg:pl-16"} flex flex-col text-start`}>
                    <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-forest)] text-[var(--color-sand)] shadow-lg shadow-[var(--color-forest)]/20">
                      <span className="font-heading text-2xl font-bold">{c.no}</span>
                    </div>

                    <h3 className="font-heading text-4xl sm:text-4xl text-[var(--color-forest)] mb-3">
                      {c.title}
                    </h3>
                    <h4 className="text-xl font-medium text-[var(--color-earth)] mb-6">
                      {c.subtitle}
                    </h4>
                    <p className="text-lg leading-relaxed text-[var(--foreground)]/80 max-w-lg">
                      {c.body}
                    </p>

                    {c.title === "الحجز" && (
                      <div className="mt-10">
                        <a
                          href="#booking"
                          className="inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-forest)] px-8 py-4 text-base font-bold text-[var(--color-sand)] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-forest)]/30"
                        >
                          مستعد لعيش وتجربة المسار
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Collage Images */}
                  <div className={`order-1 ${isRight ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative flex gap-4 h-[350px] sm:h-[450px] lg:h-[500px]">
                      {c.images.length === 1 && (
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
                          <Image src={c.images[0]} alt={c.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                        </div>
                      )}

                      {c.images.length === 2 && (
                        <>
                          <div className="relative w-1/2 h-[90%] mt-[10%] rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image src={c.images[0]} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                          </div>
                          <div className="relative w-1/2 h-[90%] mb-[10%] rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image src={c.images[1]} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                          </div>
                        </>
                      )}

                      {c.images.length === 3 && (
                        <>
                          <div className="relative w-[55%] h-[95%] mt-[5%] rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image src={c.images[0]} alt="" fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                          </div>
                          <div className="w-[45%] flex flex-col gap-4">
                            <div className="relative h-[48%] rounded-[2rem] overflow-hidden shadow-2xl">
                              <Image src={c.images[1]} alt="" fill sizes="(max-width: 1024px) 40vw, 20vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                            </div>
                            <div className="relative h-[48%] rounded-[2rem] overflow-hidden shadow-2xl">
                              <Image src={c.images[2]} alt="" fill sizes="(max-width: 1024px) 40vw, 20vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
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


