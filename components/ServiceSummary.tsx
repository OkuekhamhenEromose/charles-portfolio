// "use client";

// import { useEffect, useRef } from "react";

// // Dynamic GSAP import for client-only (avoids SSR issues)
// export default function ServiceSummary() {
//   const ref1 = useRef<HTMLSpanElement>(null);
//   const ref2 = useRef<HTMLDivElement>(null);
//   const ref3 = useRef<HTMLDivElement>(null);
//   const ref4 = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     let gsap: typeof import("gsap").default;
//     let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
//     const cleanup: (() => void)[] = [];

//     (async () => {
//       const gsapModule = await import("gsap");
//       const stModule = await import("gsap/ScrollTrigger");
//       gsap = gsapModule.default;
//       ScrollTrigger = stModule.ScrollTrigger;
//       gsap.registerPlugin(ScrollTrigger);

//       const configs = [
//         { el: ref1.current, xPercent: 20 },
//         { el: ref2.current, xPercent: -30 },
//         { el: ref3.current, xPercent: 80 },
//         { el: ref4.current, xPercent: -100 },
//       ];

//       configs.forEach(({ el, xPercent }) => {
//         if (!el) return;
//         const tween = gsap.to(el, {
//           xPercent,
//           scrollTrigger: {
//             trigger: el,
//             scrub: 1.5,
//             start: "top bottom",
//             end: "bottom top",
//           },
//         });
//         cleanup.push(() => {
//           tween.scrollTrigger?.kill();
//           tween.kill();
//         });
//       });
//     })();

//     return () => cleanup.forEach((fn) => fn());
//   }, []);

//   const baseClass =
//     "font-heading whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter select-none";

//   return (
//     <section className="relative flex items-center justify-center overflow-hidden py-8 md:py-14">
//       {/* Decorative horizontal rule */}
//       <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

//       <div className="w-full space-y-2 md:space-y-3">
//         {/* Line 1 */}
//         <div className="overflow-hidden">
//           <span ref={ref1} className={`${baseClass} text-primary/15 inline-block`}>
//             Architecture&nbsp;&nbsp;Architecture&nbsp;&nbsp;Architecture
//           </span>
//         </div>

//         {/* Line 2 */}
//         <div ref={ref2} className={`${baseClass} flex gap-6 md:gap-10`}>
//           <span className="text-primary">Development</span>
//           <span className="text-primary/20">Deployment</span>
//           <span className="text-primary">Development</span>
//           <span className="text-primary/20">Deployment</span>
//         </div>

//         {/* Line 3 */}
//         <div ref={ref3} className={`${baseClass} flex gap-6 md:gap-10`}>
//           <span className="text-primary/20">APIs</span>
//           <span className="text-primary">Frontends</span>
//           <span className="text-primary/20">Scalability</span>
//           <span className="text-primary">Frontends</span>
//           <span className="text-primary/20">Scalability</span>
//         </div>

//         {/* Line 4 */}
//         <div className="overflow-hidden">
//           <span ref={ref4} className={`${baseClass} text-primary inline-block`}>
//             Databases&nbsp;&nbsp;&nbsp;Cloud&nbsp;&nbsp;&nbsp;Databases&nbsp;&nbsp;&nbsp;Cloud
//           </span>
//         </div>
//       </div>

//       <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";

/**
 * ServiceSummary — GSAP ScrollTrigger convergence effect.
 *
 * Each text row starts OFFSCREEN at the opposite edge and CONVERGES
 * to its natural centre position as the user scrolls into the section.
 *
 * Row 1  — starts far LEFT  → slides right to centre
 * Row 2  — starts far RIGHT → slides left to centre
 * Row 3  — starts far LEFT  → slides right to centre
 * Row 4  — starts far RIGHT → slides left to centre
 *
 * This is the "converge from edges" behaviour asked for — opposite of
 * the original which pushed text further away on scroll.
 */
export default function ServiceSummary() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const skills: (() => void)[] = [];

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Wait one frame for paint
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const rows = section.querySelectorAll<HTMLElement>("[data-row]");

      rows.forEach((row) => {
        const dir = row.dataset.row === "left" ? -1 : 1;
        // Start fully off-screen in the direction of origin
        const startX = dir * -120; // negative = left-of-screen, positive = right-of-screen

        gsap.set(row, { x: `${startX}vw` });

        const tween = gsap.to(row, {
          x: "0vw",          // converge to natural position
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",  // start animating when section enters view
            end: "center 40%", // finish convergence when section centre hits 40% of viewport
            scrub: 1.5,        // smooth scrub
          },
        });

        skills.push(() => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      });
    })();

    return () => skills.forEach((fn) => fn());
  }, []);

  const base =
    "font-heading font-black uppercase tracking-tighter select-none will-change-transform";

  const sizes = "text-[2.2rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem]";

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-start justify-center
                 overflow-hidden py-10 md:py-16 gap-1 md:gap-2"
    >
      {/* Decorative rules */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      {/* Row 1 — converges from LEFT */}
      <div
        data-row="left"
        className={`${base} ${sizes} flex whitespace-nowrap gap-6 md:gap-10 pl-4`}
      >
        <span className="text-primary/15">Architecture</span>
        <span className="text-primary/8">Systems</span>
        <span className="text-primary/15">Architecture</span>
        <span className="text-primary/8">Systems</span>
      </div>

      {/* Row 2 — converges from RIGHT */}
      <div
        data-row="right"
        className={`${base} ${sizes} flex whitespace-nowrap gap-6 md:gap-10 pl-4`}
      >
        <span className="text-primary">Development</span>
        <span className="text-primary/20">Deployment</span>
        <span className="text-primary">Development</span>
        <span className="text-primary/20">Deployment</span>
      </div>

      {/* Row 3 — converges from LEFT */}
      <div
        data-row="left"
        className={`${base} ${sizes} flex whitespace-nowrap gap-6 md:gap-10 pl-4`}
      >
        <span className="text-primary/20">APIs</span>
        <span className="text-primary">Frontends</span>
        <span className="text-primary/20">Scalability</span>
        <span className="text-primary">Frontends</span>
        <span className="text-primary/20">Scalability</span>
      </div>

      {/* Row 4 — converges from RIGHT */}
      <div
        data-row="right"
        className={`${base} ${sizes} flex whitespace-nowrap gap-6 md:gap-10 pl-4`}
      >
        <span className="text-primary">Databases</span>
        <span className="text-primary/20">Cloud</span>
        <span className="text-primary">Databases</span>
        <span className="text-primary/20">Cloud</span>
      </div>
    </section>
  );
}