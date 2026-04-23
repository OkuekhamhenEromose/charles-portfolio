"use client";

/**
 * Hero — dennis sliding marquee replaces "Available for hire" badge.
 *
 * Dennis pattern (landing/index.js):
 *   - Two <p> refs side by side, GSAP xPercent animates continuously via rAF
 *   - xPercent < -100 → reset to 0 (seamless loop)
 *   - ScrollTrigger flips direction on scroll
 *   - Extra GSAP.to(slider, {x: -500px}) adds parallax on scroll
 */

import { useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};
const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14 } },
};

/* Custom code block — no react-syntax-highlighter dependency */
const codeLines = [
  { t:"kw",  v:"const "                                                },
  { t:"fn",  v:"profile"                                               },
  { t:"op",  v:": DeveloperProfile = {"                                },
  { t:"str", v:'  name:         "Charles Eromose",'                    },
  { t:"str", v:'  role:         "Full Stack Engineer",'                },
  { t:"str", v:'  experience:   "4+ years",'                           },
  { t:"cm",  v:"  stack: {"                                            },
  { t:"str", v:'    frontend: ["React", "Next.js", "TypeScript", "Tailwind"],' },
  { t:"str", v:'    backend:  ["Django", "Node.js", "Python", "Express"],'     },
  { t:"str", v:'    database: ["PostgreSQL", "MongoDB", "MySQL"],'             },
  { t:"str", v:'    cloud:    ["AWS", "Docker", "Vercel", "Netlify"],'         },
  { t:"cm",  v:"  },"                                                  },
  { t:"str", v:'  availability: "Open to opportunities 🚀",'           },
  { t:"op",  v:"};"                                                    },
];
const syntaxColors: Record<string,string> = {
  kw:"#569CD6", fn:"#DCDCAA", op:"#D4D4D4", str:"#CE9178", cm:"#9CDCFE",
};

function CodeBlock() {
  return (
    <div className="rounded-xl overflow-hidden border border-border/60
                    shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
         style={{ background:"rgba(10,10,22,0.93)" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] font-mono text-white/30 tracking-wider">profile.ts</span>
      </div>
      <pre className="p-4 text-[0.68rem] leading-[1.5] font-mono overflow-x-auto">
        {codeLines.map((line, i) => (
          <div key={i}>
            <span className="select-none text-white/20 mr-3 text-[0.6rem]">
              {String(i+1).padStart(2,"0")}
            </span>
            <span style={{ color: syntaxColors[line.t] }}>{line.v}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

export default function Hero() {
  const globeRef      = useRef<HTMLVideoElement>(null);

  /* ── Dennis marquee refs ── */
  const sliderRef     = useRef<HTMLDivElement>(null);   // container that GSAP parallaxes
  const firstTextRef  = useRef<HTMLParagraphElement>(null);
  const secondTextRef = useRef<HTMLParagraphElement>(null);
  const xPct          = useRef(0);
  const dir           = useRef(-1);
  const rafRef        = useRef<number | null>(null);

  /* Globe autoplay */
  useEffect(() => { globeRef.current?.play().catch(() => {}); }, []);

  /* ── Dennis sliding marquee (exact port of landing/index.js) ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanupST: (() => void) | undefined;

    const loop = () => {
      if (xPct.current < -100) xPct.current = 0;
      else if (xPct.current > 0) xPct.current = -100;

      if (firstTextRef.current)  firstTextRef.current.style.transform  = `translateX(${xPct.current}%)`;
      if (secondTextRef.current) secondTextRef.current.style.transform = `translateX(${xPct.current}%)`;

      xPct.current += 0.08 * dir.current;
      rafRef.current = requestAnimationFrame(loop);
    };

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* Parallax on the whole slider container as user scrolls */
      if (sliderRef.current) {
        const tween = gsap.to(sliderRef.current, {
          scrollTrigger: {
            trigger: document.documentElement,
            scrub: 0.25,
            start: 0,
            end: window.innerHeight,
            onUpdate: (e) => { dir.current = e.direction * -1; },
          },
          x: "-500px",
        });
        cleanupST = () => { tween.scrollTrigger?.kill(); tween.kill(); };
      }

      rafRef.current = requestAnimationFrame(loop);
    })();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cleanupST?.();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Ambient glow */}
      <div aria-hidden
           className="absolute -left-40 top-1/2 -translate-y-1/2
                      w-[700px] h-[700px] rounded-full bg-primary/8
                      blur-[130px] pointer-events-none" />

      {/* ══════════════════════════════════════════════════════
          MARQUEE STRIP — dennis sliderContainer pattern
          Sits at the very top of the hero below the header.
      ══════════════════════════════════════════════════════ */}
      <div className="mt-20 sm:mt-24 overflow-hidden border-y border-border/20
                      bg-card/10">
        {/* sliderRef — GSAP parallaxes this (like dennis's slider ref) */}
        <div ref={sliderRef} className="flex items-center">
          {/*
           * Two identical paragraphs side by side.
           * GSAP continuously updates translateX on both.
           * When xPercent hits -100, it resets to 0 — seamless loop.
           * (exact dennis pattern)
           */}
          <p ref={firstTextRef}
             className="font-heading font-black uppercase tracking-tighter
                        text-3xl sm:text-4xl md:text-5xl whitespace-nowrap
                        text-foreground/80 py-3 pr-8 inline-block will-change-transform">
            Freelance Developer&nbsp;—&nbsp;
          </p>
          <p ref={secondTextRef}
             className="font-heading font-black uppercase tracking-tighter
                        text-3xl sm:text-4xl md:text-5xl whitespace-nowrap
                        text-foreground/80 inline-block will-change-transform">
            Freelance Developer&nbsp;—&nbsp;
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════ */}
      <div className="flex-1 container mx-auto relative z-10
                      flex flex-col lg:flex-row items-center justify-between
                      gap-10 px-4 sm:px-6 lg:px-8 py-2 lg:py-4">

        {/* LEFT */}
        <motion.div
          className="w-full lg:w-[52%] flex flex-col items-center lg:items-start
                     text-center lg:text-left order-2 lg:order-1"
          variants={stagger} initial="hidden" animate="visible"
        >
          {/* Headline */}
          <motion.h1
            variants={fadeDown}
            className="font-heading font-black leading-[1.02] tracking-tight
                       text-foreground mb-3
                       text-4xl xs:text-5xl md:text-6xl lg:text-[4.5rem]"
          >
            I&apos;m <span className="gradient-text">Charles</span>
            <br />
            <span className="text-foreground/35">Eromose</span>
          </motion.h1>

          <motion.p
            variants={fadeDown}
            className="text-muted-foreground text-base md:text-lg mb-7 max-w-md leading-relaxed"
          >
            Full Stack Engineer — scalable apps, powerful APIs &amp; cloud solutions.
          </motion.p>

          {/* Code block */}
          <motion.div variants={zoomIn} className="w-full max-w-[540px] mb-8">
            <CodeBlock />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={stagger}
                      className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.a href="/#portfolio" variants={fadeUp}
                      whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                      className="btn text-sm px-8 py-3">
              View My Work
            </motion.a>
            <motion.a href="/charles-eromose-cv.pdf" download variants={fadeUp}
                      whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                      className="btn-outline text-sm px-8 py-3">
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Globe */}
        <motion.div
          className="w-full lg:w-[46%] flex justify-center lg:justify-end order-1 lg:order-2"
          initial={{ opacity:0, x:70 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:1.0, delay:0.25, ease:[0.16,1,0.3,1] as [number,number,number,number] }}
        >
          <div className="relative">
            <div aria-hidden className="absolute inset-0 rounded-full blur-3xl opacity-25
                                        bg-primary scale-75 animate-pulse" />
            <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px]
                            md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px]">
              <video ref={globeRef} autoPlay loop muted playsInline
                     className="w-full h-full object-contain drop-shadow-2xl"
                     style={{ filter:"drop-shadow(0 0 60px rgb(var(--primary)/0.2))" }}>
                <source src="/video/glob_transparent.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="/#about" aria-label="Scroll to about"
                className="absolute bottom-6 left-1/2 -translate-x-1/2
                           flex flex-col items-center gap-2 text-muted-foreground
                           hover:text-primary transition-colors duration-300"
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:1.5, duration:0.6 }}>
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <motion.div animate={{ y:[0,7,0] }}
                    transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}