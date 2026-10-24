import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Shared reveal vocabulary: [data-reveal] fade-rise, [data-mask] image curtain, [data-parallax] drift, [data-split] line rise. */
export function useReveals(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 1.2, ease: "expo.out",
          delay: Number(el.dataset["delay"] ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset["parallax"] || 12);
        gsap.fromTo(el, { yPercent: -amt }, {
          yPercent: amt, ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-line]"), {
          yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, scope);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
