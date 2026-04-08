import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="fortress"
      data-section="fortress"
      className="relative isolate min-h-[100svh] overflow-hidden text-[var(--color-sand)]"
    >
      <div className="absolute inset-0">
        <Image
          src="/m8[ldg].jpeg"
          alt="مآل — رحلة معمارية"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        className="hero-overlay pointer-events-none absolute inset-0 opacity-[0.92]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 py-24">
        <p className="text-sm tracking-[0.2em] text-[var(--color-sand)]/90">
          عمارة عصبية وتراث • رحلة من الانقباض إلى الانشراح
        </p>
        <h1 className="font-heading mt-6 text-balance text-5xl text-[var(--color-sand)] sm:text-6xl">
          مآل
        </h1>
        <p className="mt-3 font-en text-sm tracking-[0.18em] text-[var(--color-sand)]/85">
          Ma&apos;al
        </p>
        <p className="mt-6 max-w-prose text-pretty text-base leading-[1.85] text-[var(--color-sand)]/92">
          تجربةٌ معماريّة في المدينة المنوّرة تربط بين التراث والإحساس العصبي
          بالمكان: مساحاتٌ مدروسة، وإيقاعٌ يمنح الذهن سكونًا ثم انشراحًا.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#booking"
            className="rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-semibold text-[var(--color-sand)] shadow-md transition hover:brightness-110"
          >
            احجز تجربتك
          </a>
          <a
            href="#path"
            className="rounded-full border border-[var(--color-sand)]/35 bg-[color-mix(in_srgb,var(--color-forest)_25%,transparent)] px-6 py-3 text-sm text-[var(--color-sand)] backdrop-blur-sm transition hover:bg-[color-mix(in_srgb,var(--color-forest)_40%,transparent)]"
          >
            ابدأ المسار
          </a>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[var(--color-sand)]/25 pt-8 text-xs text-[var(--color-sand)]/80">
          <div>
            <div className="font-medium text-[var(--color-sand)]">الانقباض</div>
            <div className="mt-1 leading-relaxed">تركيزٌ وهدوء</div>
          </div>
          <div>
            <div className="font-medium text-[var(--color-sand)]">الانفراج</div>
            <div className="mt-1 leading-relaxed">تنفّسٌ واتساع</div>
          </div>
          <div>
            <div className="font-medium text-[var(--color-sand)]">الانشراح</div>
            <div className="mt-1 leading-relaxed">صفاءٌ ووضوح</div>
          </div>
        </div>
      </div>
    </section>
  );
}
