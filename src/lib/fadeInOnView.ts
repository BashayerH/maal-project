/**
 * Lightweight IntersectionObserver helper — no layout thrashing, runs once per element.
 */
export function observeFadeIn(
  element: Element,
  onVisible: () => void,
  options?: IntersectionObserverInit,
): () => void {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          onVisible();
          io.disconnect();
          break;
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px", ...options },
  );
  io.observe(element);
  return () => io.disconnect();
}
