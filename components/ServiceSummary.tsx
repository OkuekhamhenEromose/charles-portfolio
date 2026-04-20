"use client";

import { useEffect, useRef } from "react";

/**
 * ServiceSummary — text rows converge from edges to centre on scroll.
 * CHANGE: reduced row gaps and section padding for tighter spacing.
 */
export default function ServiceSummary() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const kills: (() => void)[] = [];

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const rows = section.querySelectorAll<HTMLElement>("[data-row]");
      rows.forEach((row) => {
        const dir    = row.dataset.row === "left" ? -1 : 1;
        const startX = dir * -120;
        gsap.set(row, { x: `${startX}vw` });

        const tween = gsap.to(row, {
          x: "0vw",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end:   "center 40%",
            scrub: 1.5,
          },
        });
        kills.push(() => { tween.scrollTrigger?.kill(); tween.kill(); });
      });
    })();

    return () => kills.forEach((fn) => fn());
  }, []);

  const base  = "font-heading font-black uppercase tracking-tighter select-none will-change-transform";
  /* FIX: reduced text sizes one step each for tighter layout */
  const sizes = "text-[2rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6.5rem]";

  return (
    <section
      ref={sectionRef}
      /* FIX: py reduced from py-6/py-10 to py-3/py-5 */
      /* FIX: gap reduced from gap-1/gap-2 to gap-0 */
      className="relative flex flex-col items-start justify-center
                 overflow-hidden py-3 md:py-5"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      {/* Row 1 — LEFT */}
      <div data-row="left"
           className={`${base} ${sizes} flex whitespace-nowrap pl-4 leading-none`}>
        <span className="text-primary/15">Architecture</span>
        <span className="text-primary/8 mx-4">Systems</span>
        <span className="text-primary/15">Architecture</span>
        <span className="text-primary/8 mx-4">Systems</span>
      </div>

      {/* Row 2 — RIGHT */}
      <div data-row="right"
           className={`${base} ${sizes} flex whitespace-nowrap pl-4 leading-none`}>
        <span className="text-primary">Development</span>
        <span className="text-primary/20 mx-4">Deployment</span>
        <span className="text-primary">Development</span>
        <span className="text-primary/20 mx-4">Deployment</span>
      </div>

      {/* Row 3 — LEFT */}
      <div data-row="left"
           className={`${base} ${sizes} flex whitespace-nowrap pl-4 leading-none`}>
        <span className="text-primary/20">APIs</span>
        <span className="text-primary mx-4">Frontends</span>
        <span className="text-primary/20 mx-4">Scalability</span>
        <span className="text-primary mx-4">Frontends</span>
        <span className="text-primary/20">Scalability</span>
      </div>

      {/* Row 4 — RIGHT */}
      <div data-row="right"
           className={`${base} ${sizes} flex whitespace-nowrap pl-4 leading-none`}>
        <span className="text-primary">Databases</span>
        <span className="text-primary/20 mx-4">Cloud</span>
        <span className="text-primary">Databases</span>
        <span className="text-primary/20 mx-4">Cloud</span>
      </div>
    </section>
  );
}