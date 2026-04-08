import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="fortress"
      data-section="fortress"
      className="relative isolate min-h-[100svh] overflow-hidden bg-black text-[var(--color-sand)]"
    >
      <div className="absolute inset-0">
        <Image
          src="/m8.jpeg"
          alt="مآل — رحلة معمارية"
          fill
          priority
          className="object-cover blur-[3px] scale-105 opacity-75"
        />
      </div>

      <div
        className="hero-overlay pointer-events-none absolute inset-0 opacity-100"
        aria-hidden
      />
      {/* Extra dark gradient for higher contrast on text */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 py-24 z-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-[var(--color-sand)] drop-shadow-md">
          حكاية وتراث • رحلة من الانقباض إلى الانشراح
        </p>
        <h1 className="font-heading mt-6 text-balance text-6xl text-white sm:text-7xl drop-shadow-lg">
          مآل
        </h1>
        <p className="mt-3 font-en text-sm font-medium tracking-[0.2em] text-white/90 drop-shadow-md">
          Ma&apos;al
        </p>
        <p className="mt-8 max-w-prose text-pretty text-lg font-medium leading-[1.85] text-[var(--color-sand)] drop-shadow-md">
          تجربةٌ معماريّة في المدينة المنوّرة تربط بين التراث والإحساس
          بالمكان: مساحاتٌ مدروسة، وإيقاعٌ يمنح الذهن سكونًا ثم انشراحًا.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#booking"
            className="rounded-full bg-[var(--color-sand)] px-8 py-3.5 text-sm font-bold text-[var(--color-forest)] shadow-lg shadow-black/20 transition hover:scale-105"
          >
            احجز تجربتك
          </a>
          <a
            href="#path"
            className="rounded-full border-[1.5px] border-[var(--color-sand)]/50 bg-black/20 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-md shadow-lg shadow-black/10 transition hover:bg-black/40 hover:border-white/80"
          >
            ابدأ المسار
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-[var(--color-sand)]/30 pt-8 text-xs text-[var(--color-sand)]">
          <div>
            <div className="font-bold text-white text-sm drop-shadow-sm">الانقباض</div>
            <div className="mt-2 font-medium leading-relaxed opacity-90">تركيزٌ وهدوء</div>
          </div>
          <div>
            <div className="font-bold text-white text-sm drop-shadow-sm">الانفراج</div>
            <div className="mt-2 font-medium leading-relaxed opacity-90">تنفّسٌ واتساع</div>
          </div>
          <div>
            <div className="font-bold text-white text-sm drop-shadow-sm">الانشراح</div>
            <div className="mt-2 font-medium leading-relaxed opacity-90">صفاءٌ ووضوح</div>
          </div>
        </div>
      </div>
    </section>
  );
}
