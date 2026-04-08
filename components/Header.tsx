"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--color-sand)_88%,white)]/90 backdrop-blur border-b border-[color-mix(in_srgb,var(--color-stone)_45%,transparent)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-full bg-white/80 ring-1 ring-[color-mix(in_srgb,var(--color-stone)_40%,transparent)]">
            <Image
              src="/logo.png"
              alt="شعار مآل"
              fill
              sizes="36px"
              className="object-contain p-1"
              priority={false}
            />
          </span>
          
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--color-forest)]/80 md:flex">
          <a href="/#fortress" className="hover:text-[var(--color-forest)]">
            البداية
          </a>
          <a href="/#path" className="hover:text-[var(--color-forest)]">
            الطريق
          </a>
          <a href="/#booking" className="hover:text-[var(--color-forest)]">
            الحجز
          </a>
        </nav>

        <Link
          href="/booking"
          className="rounded-full bg-[var(--color-forest)] px-4 py-2 text-sm font-semibold text-[var(--color-sand)] transition hover:brightness-110"
        >
          التذاكر
        </Link>
      </div>
    </header>
  );
}

