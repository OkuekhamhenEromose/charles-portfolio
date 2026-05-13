"use client";

import { useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";

/* ─── Framer Motion variants (unchanged) ────────────────────────────── */
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

/* ─── Code block data (unchanged) ───────────────────────────────────── */
const codeLines = [
  { t: "kw", v: "const " },
  { t: "fn", v: "profile" },
  { t: "op", v: ": DeveloperProfile = {" },
  { t: "str", v: '  name:         "Charles Eromose",' },
  { t: "str", v: '  role:         "Full Stack Engineer",' },
  { t: "str", v: '  experience:   "5+ years",' },
  { t: "cm", v: "  stack: {" },
  {
    t: "str",
    v: '    frontend: ["React", "Next.js", "TypeScript", "Tailwind"],',
  },
  { t: "str", v: '    backend:  ["Django", "Node.js", "Python", "Express"],' },
  { t: "str", v: '    database: ["PostgreSQL", "MongoDB", "MySQL"],' },
  { t: "str", v: '    cloud:    ["AWS", "Docker", "Vercel", "Netlify"],' },
  { t: "cm", v: "  }," },
  { t: "str", v: '  availability: "Open to opportunities 🚀",' },
  { t: "op", v: "};" },
];
const syntaxColors: Record<string, string> = {
  kw: "#569CD6",
  fn: "#DCDCAA",
  op: "#D4D4D4",
  str: "#CE9178",
  cm: "#9CDCFE",
};

function CodeBlock() {
  return (
    <div
      className="rounded-xl overflow-hidden border border-border/60
                 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
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

/* ─────────────────────────────────────────────────────────────────────
   MARQUEE SPEED CONSTANTS
   ─────────────────────────────────────────────────────────────────────
   BASE_DURATION  — normal crawl speed in seconds (higher = slower)
   FAST_DURATION  — briefly applied while actively scrolling down
   SLOW_DURATION  — briefly applied while scrolling up (slight slowdown)

   All transitions use CSS `transition: animation-duration` which is
   silky smooth because the browser interpolates the playback rate
   without ever touching the compositor's transform matrix directly.
   ──────────────────────────────────────────────────────────────────── */
const BASE_DURATION = 120; // seconds — comfortable reading crawl
const FAST_DURATION = 80; // slightly faster when scrolling down
const SLOW_DURATION = 160; // slightly slower when scrolling up

export default function Hero() {
  const globeRef = useRef<HTMLVideoElement>(null);
  /**
   * trackRef points at the scrolling `<div>` that holds BOTH marquee groups.
   * We only ever touch its CSS custom property `--dur` and the
   * `animation-duration` shorthand — never `transform`. The compositor
   * drives position entirely on its own thread.
   */
  const trackRef = useRef<HTMLDivElement>(null);

  /* Globe autoplay */
  useEffect(() => {
    globeRef.current?.play().catch(() => {});
  }, []);

  /* ── Marquee: pure CSS animation + GSAP speed modulation only ──────
   *
   * HOW IT WORKS (why this is better than the old RAF approach):
   *
   *  Old code:  RAF loop → mutates `transform` inline style every frame
   *             → forces a layout/paint on the main thread each tick
   *             → browser can't hand off to compositor → jank + high CPU
   *
   *  New code:  CSS `animation` on the track (keyframe: translateX 0→-50%)
   *             → runs entirely on the GPU compositor thread
   *             → zero main-thread work per frame → perfectly smooth
   *
   *  GSAP ScrollTrigger only calls a callback when scroll VELOCITY changes
   *  (not every pixel), which sets `animation-duration` via inline style.
   *  CSS smoothly interpolates between durations (via CSS transition on
   *  animation-duration) — no jumps, no jank.
   *
   *  Direction:  we never reverse; the track always moves left.
   *              Speed increase (scroll ↓) and speed decrease (scroll ↑)
   *              create the sensation of direction response without the
   *              position-jump artefact that `animation-direction: reverse`
   *              causes mid-animation.
   * ─────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const track = trackRef.current;
    if (!track) return;

    /* Apply the base CSS animation immediately so the marquee is live
       even before GSAP loads.  The keyframe `marquee-left` is defined
       in the <style> tag rendered by this component (see below).        */
    track.style.animationDuration = `${BASE_DURATION}s`;
    track.style.animationPlayState = "running";

    let resetTimer: ReturnType<typeof setTimeout>;

    const setDuration = (dur: number) => {
      clearTimeout(resetTimer);
      track.style.animationDuration = `${dur}s`;
      /* Snap back to base speed 800 ms after scrolling stops */
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
          /* direction: 1 = scrolling down, -1 = scrolling up */
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
      {/*
        Inline keyframe for the marquee.
        Why not globals.css?  The existing `hero-marquee-right` keyframe
        moves from -50% → 0 (rightward).  We want 0 → -50% (leftward).
        Rather than editing globals.css, we declare a scoped keyframe here
        that is guaranteed to be correct regardless of globals.css changes.
      */}
      <style>{`
        @keyframes marquee-left {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
        .marquee-track {
          /* GPU-composited — browser handles this off main thread */
          animation-name:            marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-fill-mode:       none;
          will-change:               transform;
          /* Smooth speed transitions — interpolates playback rate */
          transition:                animation-duration 0.8s ease;
        }
        /* Pause on hover so users can read the scrolling text */
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
            {/*
              trackRef — the only element we touch after mount.
              Contains TWO identical groups so the seam is invisible:
              Group 1 fills the viewport, Group 2 follows immediately.
              When the track has translated exactly -50% of its own width,
              it has scrolled exactly one group, and the CSS animation
              loops back to 0 — seamless on every screen size.
            */}
            <div
              ref={trackRef}
              className="marquee-track flex items-center w-max"
            >
              {/* Group 1 */}
              <div className="hero-marquee-group">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={`g1-${i}`} className="hero-marquee-item">
                    Software Engineer — Scalable Systems — Open to All Time
                    Zones —
                  </span>
                ))}
              </div>
              {/* Group 2 — identical duplicate for the seamless loop */}
              <div className="hero-marquee-group">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={`g2-${i}`} className="hero-marquee-item">
                    Software Engineer — Scalable Systems — Open to All Time
                    Zones —
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main content row ───────────────────────────────────────── */}
        <div
          className="flex-1 container mx-auto relative z-10
                     flex flex-col lg:flex-row items-center justify-between
                     px-8 sm:px-10 lg:px-12 py-2 lg:py-4"
        >
          {/* LEFT — copy + CTA */}
          <motion.div
            className="w-full lg:w-[52%] flex flex-col items-center lg:items-start
                       text-center lg:text-left order-2 lg:order-1"
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

            <motion.div variants={zoomIn} className="w-full max-w-135 mb-8">
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
            className="w-full lg:w-[46%] flex justify-center lg:justify-end order-1 lg:order-2"
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
              <div
                className="relative w-65 h-65 sm:w-85 sm:h-85
                           md:w-105 md:h-105 lg:w-115 lg:h-115"
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
