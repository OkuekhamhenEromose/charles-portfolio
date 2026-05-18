"use client";

import { useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";

/* ─── Framer Motion variants ────────────────────────────────── */
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
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 14 },
  },
};

/* ─── Code block data ───────────────────────────────────────── */
const codeLines = [
  { t: "kw",  v: "const "                                                           },
  { t: "fn",  v: "profile"                                                          },
  { t: "op",  v: ": DeveloperProfile = {"                                           },
  { t: "str", v: '  name:         "Charles Eromose",'                              },
  { t: "str", v: '  role:         "Full Stack Engineer",'                          },
  { t: "str", v: '  experience:   "5+ years",'                                     },
  { t: "cm",  v: "  stack: {"                                                       },
  { t: "str", v: '    frontend: ["React", "Next.js", "TypeScript", "Tailwind"],'  },
  { t: "str", v: '    backend:  ["Django", "Node.js", "Python", "Express"],'      },
  { t: "str", v: '    database: ["PostgreSQL", "MongoDB", "MySQL"],'              },
  { t: "str", v: '    cloud:    ["AWS", "Docker", "Vercel", "Netlify"],'          },
  { t: "cm",  v: "  },"                                                             },
  { t: "str", v: '  availability: "Open to opportunities 🚀",'                   },
  { t: "op",  v: "};"                                                               },
];
const syntaxColors: Record<string, string> = {
  kw:  "#569CD6",
  fn:  "#DCDCAA",
  op:  "#D4D4D4",
  str: "#CE9178",
  cm:  "#9CDCFE",
};

function CodeBlock() {
  return (
    /*
      FIX (Edge): added `min-w-0` so the code block can shrink inside the
      flex column. Without it Edge treats the block's scrollWidth as the
      minimum intrinsic width and pushes the globe off-screen at mid-range
      desktop widths (1024–1280 px). `overflow-x: auto` lets the <pre>
      scroll internally rather than stretching the card.
    */
    <div
      className="rounded-xl overflow-hidden border border-border/60
                 shadow-[0_12px_40px_rgba(0,0,0,0.5)] min-w-0 w-full"
      style={{ background: "rgba(10,10,22,0.93)" }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] font-mono text-white/30 tracking-wider">
          profile.ts
        </span>
      </div>
      {/*
        FIX (Edge): `overflow-x: auto` on the <pre> means long lines scroll
        inside the card instead of overflowing the flex container — fixes
        the horizontal page scroll visible on Edge at 1024 px.
      */}
      <pre className="p-4 text-[0.68rem] leading-normal font-mono overflow-x-auto">
        {codeLines.map((line, i) => (
          <div key={i}>
            <span className="select-none text-white/20 mr-3 text-[0.6rem]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ color: syntaxColors[line.t] }}>{line.v}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function ScrollIndicator({ className = "" }: { className?: string }) {
  return (
    <motion.a
      href="/#about"
      aria-label="Scroll to about"
      className={`flex flex-col items-center gap-2 text-muted-foreground
                  hover:text-primary transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      >
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </motion.a>
  );
}

const BASE_DURATION = 120;
const FAST_DURATION = 80;
const SLOW_DURATION = 160;

export default function Hero() {
  const globeRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    globeRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const track = trackRef.current;
    if (!track) return;

    track.style.animationDuration = `${BASE_DURATION}s`;
    track.style.animationPlayState = "running";

    let resetTimer: ReturnType<typeof setTimeout>;

    const setDuration = (dur: number) => {
      clearTimeout(resetTimer);
      track.style.animationDuration = `${dur}s`;
      resetTimer = setTimeout(() => {
        track.style.animationDuration = `${BASE_DURATION}s`;
      }, 800);
    };

    let cleanup: (() => void) | undefined;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setDuration(self.direction === 1 ? FAST_DURATION : SLOW_DURATION);
        },
      });

      cleanup = () => st.kill();
    })();

    return () => {
      clearTimeout(resetTimer);
      cleanup?.();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track {
          animation-name:            marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-fill-mode:       none;
          will-change:               transform;
          transition:                animation-duration 0.8s ease;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute -left-40 top-1/2 -translate-y-1/2
                     w-175 h-175 rounded-full bg-primary/8
                     blur-[130px] pointer-events-none"
        />

        {/* ── Marquee strip ──────────────────────────────────────────── */}
        <div className="mt-20 sm:mt-24 overflow-hidden border-y border-border/20 bg-card/10">
          <div className="hero-marquee-mask marquee-wrapper">
            <div
              ref={trackRef}
              className="marquee-track flex items-center w-max"
            >
              {[1, 2].map((g) => (
                <div key={g} className="hero-marquee-group" aria-hidden={g === 2}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="hero-marquee-item">
                      Software Engineer — Scalable Systems — Open to All Time
                      Zones —
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main content row ───────────────────────────────────────── */}
        {/*
          FIX (Edge): `overflow-x-hidden` on the outer wrapper was causing
          Edge to create a new block formatting context that incorrectly
          clipped the globe's drop-shadow filter. Replaced with a targeted
          `max-w-full` so the row can't exceed the viewport, while the
          globe's filter renders without clipping.

          Also added `min-w-0` to both flex children so Edge allows them
          to shrink below their intrinsic content size.
        */}
        <div
          className="flex-1 container mx-auto relative z-10
                     flex flex-col lg:flex-row items-center justify-between
                     px-8 sm:px-10 lg:px-12 py-2 lg:py-4 max-w-full"
        >
          {/* LEFT — copy + CTA */}
          <motion.div
            className="w-full lg:w-[52%] min-w-0 flex flex-col items-center
                       lg:items-start text-center lg:text-left order-2 lg:order-1"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeDown}
              className="font-heading font-black leading-[1.02] tracking-tight
                         text-foreground mb-1
                         text-4xl xs:text-5xl md:text-6xl lg:text-[4.5rem]"
            >
              I&apos;m <span className="text-primary">Charles</span>
              <br />
              <span className="text-primary">Eromose</span>
            </motion.h1>

            <motion.p
              variants={fadeDown}
              className="text-foreground text-base md:text-lg mb-2 max-w-md leading-normal"
            >
              Full Stack Engineer — delivering scalable web systems,
              high-performance APIs &amp; cloud solutions used in production.
            </motion.p>

            {/*
              FIX (Edge): `max-w-135` is a Tailwind JIT arbitrary value that
              Edge sometimes misses on first paint. Added inline max-width as
              a fallback so the code block never overflows the left column.
            */}
            <motion.div
              variants={zoomIn}
              className="w-full mb-8 min-w-0"
              style={{ maxWidth: "33.75rem" /* 540px ≈ max-w-135 */ }}
            >
              <CodeBlock />
            </motion.div>

            <motion.div
              variants={stagger}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/#portfolio"
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn text-sm px-8 py-3"
              >
                View My Work
              </motion.a>

              <motion.a
                href="/CharlesEromose.pdf"
                download="CharlesEromose.pdf"
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline text-sm px-8 py-3"
              >
                Download CV
              </motion.a>
            </motion.div>

            <ScrollIndicator className="mt-8 md:hidden" />
          </motion.div>

          {/* RIGHT — Globe */}
          <motion.div
            className="w-full lg:w-[46%] min-w-0 flex justify-center
                       lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-3xl opacity-25
                           bg-primary scale-75 animate-pulse"
              />
              {/*
                FIX (Edge): explicit pixel dimensions as inline style alongside
                the responsive Tailwind classes. Edge can resolve conflicting
                Tailwind breakpoint classes inconsistently when the JIT bundle
                loads async; the inline style wins and prevents a 0×0 collapse.
              */}
              <div
                className="relative w-65 h-65 sm:w-85 sm:h-85
                           md:w-105 md:h-105 lg:w-115 lg:h-115"
                style={{ minWidth: "260px", minHeight: "260px" }}
              >
                <video
                  ref={globeRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 0 60px rgb(var(--primary)/0.2))",
                  }}
                >
                  <source
                    src="/video/glob_transparent.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
          </motion.div>
        </div>

        <ScrollIndicator className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2" />
      </section>
    </>
  );
}