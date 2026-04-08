"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { observeFadeIn } from "@/lib/fadeInOnView";

type Props = {
  children: ReactNode;
  className?: string;
};

export function FadeInSection({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeFadeIn(el, () => setVisible(true));
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
