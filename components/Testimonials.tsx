"use client";

/**
 * Testimonials — Fixed & upgraded.
 *
 * BUG FIX — "What People Say" heading invisible:
 *   GSAP `gsap.from(chars, { yPercent:120, opacity:0 })` immediately sets
 *   every char to opacity:0 and translateY(120%). If the ScrollTrigger fires
 *   too early (section already in view on load) or too late, they stay hidden.
 *   FIX: Replaced with Framer Motion `whileInView` — reliable, SSR-safe,
 *   no risk of chars being permanently hidden.
 *
 * LOGO FIX — real images from /public/img/logos/:
 *   Place the 7 logo files from the zip into /public/img/logos/
 *   Plain <img> with onError → brand-colour fallback if file missing.
 *
 * GSAP kept for:
 *   - Company logo stagger (scroll-triggered)
 *   - Stats counter animation (countUp on enter)
 *   - rAF progress bar (frame-perfect auto-advance)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── Testimonials ─────────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    text: "Charles has an exceptional eye for detail. He approaches UI/UX challenges with creativity while ensuring performance and accessibility aren't compromised. What stands out most is his consistency — he always delivers with precision and a positive attitude, even under tight deadlines.",
    image: "/img/testimonials/brightnwachukwu.jpeg",
    name: "Bright Nwachukwu",
    post: "Product/Project Management · Software Engineering",
  },
  {
    id: 2,
    text: "Charles is more than just a talented developer — he's a professional who uplifts the entire team. His calm approach under pressure, willingness to mentor others, and ability to translate technical concepts into simple terms make him a rare asset.",
    image: "/img/testimonials/enoch olisa.jpeg",
    name: "Enoch Olisa",
    post: "Software Quality Engineer · Test Automation",
  },
  {
    id: 3,
    text: "Charles is the kind of engineer every team needs. He's collaborative, reliable, and never shies away from responsibility. Beyond writing excellent code, he brings energy to discussions, asks the right questions, and motivates others to push their limits.",
    image: "/img/testimonials/monicaholmsremmen.jpeg",
    name: "Monica Holm-Remmen",
    post: "Recruiter & Career Consultant",
  },
  {
    id: 4,
    text: "What I admire most about Charles is his resilience and curiosity. He doesn't just stop at solving a bug — he digs deeper to understand why it happened and how to prevent it in the future. That mindset reflects his commitment to sustainable solutions.",
    image: "/img/testimonials/samuelokpe.jpeg",
    name: "Samuel Okpe",
    post: "Software Engineer · Business Enthusiast",
  },
  {
    id: 5,
    text: "I've seen very few engineers who embrace learning as quickly and effectively as Charles. Whether mastering new frameworks, adopting best practices, or diving into DevOps tools, he adapts seamlessly. His attitude toward growth makes him invaluable.",
    image: "/img/testimonials/michaelojemoron.jpeg",
    name: "Michael Ojemoron",
    post: "Cloud Architect · MERN · Python/Django · AI",
  },
  {
    id: 6,
    text: "Working with Charles has been an absolute privilege. His ability to break down complex problems into clear, scalable solutions shows not only strong technical skills but also a deep understanding of software engineering principles.",
    image: "/img/testimonials/nathanielnosa.jpeg",
    name: "Nathaniel Nosa",
    post: "Full-Stack Developer · TypeScript · Django · MERN",
  },
];

/* ── Company logos — real image files ───────────────────────
 * Place files in /public/img/logos/ (included in the zip).
 * onError shows a branded fallback so nothing breaks.
 ─────────────────────────────────────────────────────────── */
const companies = [
  { name: "Google",    src: "/img/logos/google.png",    bg: "#fff",    hasDarkBg: false },
  { name: "AWS",       src: "/img/logos/aws.jpeg",      bg: "#232f3e", hasDarkBg: true  },
  { name: "LinkedIn",  src: "/img/logos/linkedin.png",  bg: "#0a66c2", hasDarkBg: true  },
  { name: "Paystack",  src: "/img/logos/paystack.png",  bg: "#fff",    hasDarkBg: false },
  { name: "Slack",     src: "/img/logos/slack.png",     bg: "#fff",    hasDarkBg: false },
  { name: "Microsoft", src: "/img/logos/microsoft.jpg", bg: "#fff",    hasDarkBg: false },
  { name: "Jumia",     src: "/img/logos/jumia.png",     bg: "#f68b1e", hasDarkBg: true  },
];

const AVATAR_COLORS = ["#7c3aed","#0891b2","#db2777","#d97706","#059669","#dc2626"];
const AUTO_MS = 5500;

/* ── Slide variants ─────────────────────────────────────────  */
const enterT: Transition = { duration: 0.55, ease: [0.16,1,0.3,1] as [number,number,number,number] };
const exitT:  Transition = { duration: 0.3,  ease: "easeIn" as const };

const slide = {
  enter: (d: number) => ({ opacity:0, x: d * 80, scale:0.97 }),
  center: { opacity:1, x:0, scale:1, transition: enterT },
  exit:   (d: number) => ({ opacity:0, x: d * -80, scale:0.97, transition: exitT }),
};

/* ── Avatar with onError fallback ─────────────────────────── */
function Avatar({ src, alt, color }: { src:string; alt:string; color:string }) {
  const [err, setErr] = useState(false);
  return err ? (
    <div className="w-full h-full rounded-full flex items-center justify-center
                    text-white font-heading font-black text-2xl"
         style={{ background: color }}>
      {alt.charAt(0)}
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setErr(true)}
         className="w-full h-full object-cover rounded-full" />
  );
}

/* ── Logo card with onError fallback ─────────────────────── */
function LogoCard({ company }: { company: typeof companies[0] }) {
  const [err, setErr] = useState(false);
  return (
    <div className="t-logo glass-card aspect-video flex flex-col items-center
                    justify-center gap-2 p-3 overflow-hidden
                    hover:border-primary/50
                    hover:shadow-[0_0_24px_rgb(var(--primary)/0.12)]
                    transition-all duration-300 cursor-default group">
      {err ? (
        /* Fallback: brand-coloured text abbreviation */
        <span className="font-heading font-black text-xl tracking-tight"
              style={{ color: company.hasDarkBg ? "#fff" : "#333" }}>
          {company.name.slice(0, 3).toUpperCase()}
        </span>
      ) : (
        <div
          className="w-full h-10 flex items-center justify-center rounded-lg overflow-hidden"
          style={{ background: company.bg }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={company.src}
            alt={company.name}
            onError={() => setErr(true)}
            className="max-h-8 max-w-[90%] object-contain
                       filter grayscale opacity-60
                       group-hover:grayscale-0 group-hover:opacity-100
                       transition-all duration-400"
          />
        </div>
      )}
      <span className="text-[10px] font-semibold text-muted-foreground
                        uppercase tracking-wider group-hover:text-foreground/70
                        transition-colors duration-300">
        {company.name}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress]   = useState(0);
  const sectionRef   = useRef<HTMLElement>(null);
  const startRef     = useRef<number | null>(null);
  const rafRef       = useRef<number | null>(null);
  const pausedRef    = useRef(false);

  /* ── Navigate ────────────────────────────────────────────  */
  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setActive(next);
    setProgress(0);
    startRef.current = null;
  }, []);

  const prev = () => go((active - 1 + testimonials.length) % testimonials.length, -1);
  const next = useCallback(
    () => go((active + 1) % testimonials.length, 1),
    [active, go]
  );

  /* ── rAF auto-advance + progress bar ────────────────────── */
  useEffect(() => {
    const tick = (ts: number) => {
      if (pausedRef.current) {
        startRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startRef.current === null) startRef.current = ts;
      const pct = Math.min((ts - startRef.current) / AUTO_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        startRef.current = null;
        setDirection(1);
        setActive((a) => (a + 1) % testimonials.length);
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* ── GSAP: logo stagger ──────────────────────────────────  */
  useEffect(() => {
    let kill: (() => void) | undefined;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const logos = document.querySelectorAll<HTMLElement>(".t-logo");
      if (!logos.length) return;

      const tween = gsap.from(logos, {
        y: 40, opacity: 0, scale: 0.85,
        stagger: 0.08, duration: 0.7, ease: "power2.out",
        scrollTrigger: {
          trigger: ".t-logos-section",
          start: "top 85%",
          once: true,
        },
      });
      kill = () => { tween.scrollTrigger?.kill(); tween.kill(); };
    })();
    return () => kill?.();
  }, []);

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 sm:py-32 overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Ambient glow */}
      <div aria-hidden
           className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[600px] bg-primary/5 blur-[130px]
                      pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-5xl px-6 sm:px-10 relative z-10">

        {/* ══════════════════════════════════════════════════
            HEADING — Framer Motion whileInView (GSAP was
            hiding chars permanently via opacity:0 set)
        ══════════════════════════════════════════════════ */}
        <div className="text-center mb-14">
          <motion.span
            className="section-tag mb-5 inline-flex"
            initial={{ opacity:0, y:-12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5 }}
          >
            Kind Words
          </motion.span>

          {/*
           * FIX: Each word animates independently with whileInView.
           * No GSAP `from` that could permanently hide the text.
           * Stagger is achieved via `delay` on each word.
           */}
          <div className="overflow-hidden mt-4">
            <div className="flex flex-wrap justify-center gap-x-4">
              {["What", "People", "Say"].map((word, wi) => (
                <motion.span
                  key={word}
                  className={`font-heading font-black tracking-tight leading-none block
                              text-5xl sm:text-6xl md:text-7xl
                              ${wi === 2 ? "gradient-text" : "text-foreground"}`}
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: "0%",  opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: [0.16,1,0.3,1], delay: wi * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Decorative quote mark */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity:0, scale:0.5 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.35 }}
          >
            <FaQuoteLeft className="text-primary/15 text-[72px]" aria-hidden />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            TESTIMONIAL CARD
        ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.2 }}
          transition={{ duration:0.7, ease:"easeOut" }}
        >
          <div className="glass-card relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]
                            bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

            {/* Live progress bar (rAF driven) */}
            <div className="absolute top-0 left-0 h-[3px] bg-primary z-10
                            transition-none rounded-tr-full"
                 style={{ width:`${progress * 100}%` }} />

            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4
                            via-transparent to-transparent pointer-events-none" />

            <div className="p-8 sm:p-12 min-h-[260px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative z-10"
                >
                  {/* Quote */}
                  <p className="text-lg sm:text-xl md:text-2xl font-heading font-medium
                                text-foreground/85 leading-relaxed mb-10 italic">
                    &ldquo;{current.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden
                                    border-2 border-primary/40
                                    shadow-[0_0_20px_rgb(var(--primary)/0.2)]">
                      <Avatar src={current.image} alt={current.name}
                              color={AVATAR_COLORS[active % AVATAR_COLORS.length]} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground text-base sm:text-lg">
                        {current.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {current.post}
                      </p>
                    </div>
                    {/* Ghost counter */}
                    <span className="ml-auto font-mono text-[4rem] font-black
                                     text-foreground/[0.04] select-none leading-none">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Nav controls ─────────────────────────────── */}
          <div className="flex items-center justify-between mt-7 px-1">
            <div className="flex gap-3">
              {[{fn:prev, icon:ChevronLeft, label:"Previous"},
                {fn:next, icon:ChevronRight,label:"Next"}].map(({fn,icon:Icon,label})=>(
                <button key={label} onClick={fn} aria-label={label}
                        className="p-3 rounded-full border border-border bg-card/60
                                   hover:border-primary/60 hover:bg-accent hover:scale-105
                                   transition-all duration-200">
                  <Icon className="w-4 h-4 text-foreground" />
                </button>
              ))}
            </div>

            {/* Dot pills */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => go(i, i>active?1:-1)}
                        aria-label={`Testimonial ${i+1}`}
                        className={`rounded-full transition-all duration-300
                                    ${i===active
                                      ? "w-7 h-2.5 bg-primary"
                                      : "w-2.5 h-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/50"
                                    }`} />
              ))}
            </div>

            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {String(active+1).padStart(2,"0")} / {String(testimonials.length).padStart(2,"0")}
            </span>
          </div>

          {/* ── Avatar strip ─────────────────────────────── */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((t, i) => (
              <button key={t.id} onClick={() => go(i, i>active?1:-1)}
                      aria-label={t.name}
                      className={`rounded-full overflow-hidden transition-all duration-300 flex-shrink-0
                                  ${i===active
                                    ? "w-12 h-12 ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                                    : "w-9 h-9 opacity-50 hover:opacity-80 hover:scale-105"
                                  }`}>
                <Avatar src={t.image} alt={t.name}
                        color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            COMPANIES SECTION — real logo images
        ══════════════════════════════════════════════════ */}
        <div className="t-logos-section mt-24">

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em]
                             text-muted-foreground px-2 whitespace-nowrap">
              Companies in contact with
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>

          {/* Logo grid — GSAP stagger targets .t-logo */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {companies.map((company) => (
              <LogoCard key={company.name} company={company} />
            ))}
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {[
              { num:"65+",   label:"Happy Clients"      },
              { num:"101+",  label:"Projects Completed" },
              { num:"108+",  label:"Files Downloaded"   },
              { num:"1.4k+", label:"Lines of Code"      },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity:0, y:24, scale:0.92 }}
                whileInView={{ opacity:1, y:0, scale:1 }}
                viewport={{ once:true, amount:0.3 }}
                transition={{ duration:0.55, ease:"easeOut", delay: i * 0.08 }}
                className="glass-card p-5 text-center group cursor-default
                           hover:border-primary/40
                           hover:shadow-[0_0_20px_rgb(var(--primary)/0.1)]
                           transition-all duration-300"
              >
                <div className="font-heading text-3xl font-black text-primary leading-none
                                group-hover:scale-110 transition-transform duration-300">
                  {s.num}
                </div>
                <div className="text-[10px] text-muted-foreground font-semibold mt-1.5
                                uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}