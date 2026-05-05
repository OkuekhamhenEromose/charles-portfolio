"use client";

import { useEffect, useRef } from "react";

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
        const dir = row.dataset.row === "left" ? -1 : 1;
        const startX = dir * -120;
        gsap.set(row, { x: `${startX}vw` });

        const tween = gsap.to(row, {
          x: "0vw",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "center 40%",
            scrub: 1.5,
          },
        });
        kills.push(() => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      });
    })();

    return () => kills.forEach((fn) => fn());
  }, []);

  const base =
    "font-heading font-black uppercase tracking-tighter select-none will-change-transform";
  /* FIX: reduced text sizes one step each for tighter layout */
  const sizes =
  "text-[2.4rem] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6.5rem]";
  const primary = "text-primary";
  const baseText = "text-foreground/90"; // softer but still readable
  const strongText = "text-foreground";

  return (
    <section
      ref={sectionRef}
      /* FIX: py reduced from py-6/py-10 to py-3/py-5 */
      /* FIX: gap reduced from gap-1/gap-2 to gap-0 */
      className="relative flex flex-col items-start justify-center
                 overflow-hidden py-6 sm:py-8 md:py-5"
    >
      {/* Row 1 — LEFT */}
      <div
        data-row="left"
        className={`${base} ${sizes} flex whitespace-nowrap pl-2 leading-[1.10] mb-2 sm:mb-3 md:mb-0`}
      >
        <span className={baseText}>Architecture</span>
        <span className={`${primary} mx-4`}>Systems</span>
        <span className={baseText}>Architecture</span>
        <span className={`${primary} mx-4`}>Systems</span>
      </div>

      {/* Row 2 — RIGHT */}
      <div
        className={`${base} ${sizes} flex whitespace-nowrap pl-2 leading-[1.10] mb-2 sm:mb-3 md:mb-0`}
      >
        <span className={primary}>Development</span>
        <span className={`${strongText} mx-4`}>Deployment</span>
        <span className={primary}>Development</span>
        <span className={`${strongText} mx-4`}>Deployment</span>
      </div>

      {/* Row 3 — LEFT */}
      <div
        className={`${base} ${sizes} flex whitespace-nowrap pl-2 leading-[1.10] mb-2 sm:mb-3 md:mb-0`}
      >
        <span className={strongText}>APIs</span>
        <span className={`${primary} mx-4`}>Frontends</span>
        <span className={`${strongText} mx-4`}>Scalability</span>
        <span className={`${primary} mx-4`}>Frontends</span>
        <span className={strongText}>Scalability</span>
      </div>

      {/* Row 4 — RIGHT */}
      <div
        data-row="right"
        className={`${base} ${sizes} flex whitespace-nowrap pl-2 leading-[1.10] mb-2 sm:mb-3 md:mb-0`}
      >
        <span className={primary}>Databases</span>
        <span className={`${strongText} mx-4`}>Cloud</span>
        <span className={primary}>Databases</span>
        <span className={`${strongText} mx-4`}>Cloud</span>
      </div>
    </section>
  );
}
