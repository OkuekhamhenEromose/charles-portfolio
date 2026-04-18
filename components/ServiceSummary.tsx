"use client";

import { useEffect, useRef } from "react";

// Dynamic GSAP import for client-only (avoids SSR issues)
export default function ServiceSummary() {
  const ref1 = useRef<HTMLSpanElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let gsap: typeof import("gsap").default;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
    let cleanup: (() => void)[] = [];

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      gsap = gsapModule.default;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const configs = [
        { el: ref1.current, xPercent: 20 },
        { el: ref2.current, xPercent: -30 },
        { el: ref3.current, xPercent: 80 },
        { el: ref4.current, xPercent: -100 },
      ];

      configs.forEach(({ el, xPercent }) => {
        if (!el) return;
        const tween = gsap.to(el, {
          xPercent,
          scrollTrigger: {
            trigger: el,
            scrub: 1.5,
            start: "top bottom",
            end: "bottom top",
          },
        });
        cleanup.push(() => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      });
    })();

    return () => cleanup.forEach((fn) => fn());
  }, []);

  const baseClass =
    "font-heading whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter select-none";

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-8 md:py-14">
      {/* Decorative horizontal rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="w-full space-y-2 md:space-y-3">
        {/* Line 1 */}
        <div className="overflow-hidden">
          <span ref={ref1} className={`${baseClass} text-primary/15 inline-block`}>
            Architecture&nbsp;&nbsp;Architecture&nbsp;&nbsp;Architecture
          </span>
        </div>

        {/* Line 2 */}
        <div ref={ref2} className={`${baseClass} flex gap-6 md:gap-10`}>
          <span className="text-primary">Development</span>
          <span className="text-primary/20">Deployment</span>
          <span className="text-primary">Development</span>
          <span className="text-primary/20">Deployment</span>
        </div>

        {/* Line 3 */}
        <div ref={ref3} className={`${baseClass} flex gap-6 md:gap-10`}>
          <span className="text-primary/20">APIs</span>
          <span className="text-primary">Frontends</span>
          <span className="text-primary/20">Scalability</span>
          <span className="text-primary">Frontends</span>
          <span className="text-primary/20">Scalability</span>
        </div>

        {/* Line 4 */}
        <div className="overflow-hidden">
          <span ref={ref4} className={`${baseClass} text-primary inline-block`}>
            Databases&nbsp;&nbsp;&nbsp;Cloud&nbsp;&nbsp;&nbsp;Databases&nbsp;&nbsp;&nbsp;Cloud
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}