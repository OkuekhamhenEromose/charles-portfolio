"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs, SiPython,
  SiMongodb, SiGit, SiDocker, SiPostgresql, SiNextdotjs, SiDjango,
  SiExpress, SiTypescript, SiTailwindcss, SiFigma, SiWordpress,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const skills = [
  { icon: SiHtml5,       name: "HTML5",      color: "#E34F26"      },
  { icon: SiCss,         name: "CSS3",       color: "#1572B6"      },
  { icon: SiJavascript,  name: "JavaScript", color: "#F7DF1E"      },
  { icon: SiTypescript,  name: "TypeScript", color: "#3178C6"      },
  { icon: SiReact,       name: "React",      color: "#61DAFB"      },
  { icon: SiNextdotjs,   name: "Next.js",    color: "currentColor" },
  { icon: SiTailwindcss, name: "Tailwind",   color: "#06B6D4"      },
  { icon: SiFigma,       name: "Figma",      color: "#F24E1E"      },
  { icon: SiNodedotjs,   name: "Node.js",    color: "#339933"      },
  { icon: SiExpress,     name: "Express",    color: "currentColor" },
  { icon: SiPython,      name: "Python",     color: "#3776AB"      },
  { icon: SiDjango,      name: "Django",     color: "#16a34a"      },
  { icon: SiMongodb,     name: "MongoDB",    color: "#47A248"      },
  { icon: SiPostgresql,  name: "PostgreSQL", color: "#4169E1"      },
  { icon: SiGit,         name: "Git",        color: "#F05032"      },
  { icon: SiDocker,      name: "Docker",     color: "#2496ED"      },
  { icon: FaAws,         name: "AWS",        color: "#FF9900"      },
  { icon: SiWordpress,   name: "WordPress",  color: "#21759B"      },
];

const stats = [
  { value: "90%",   label: "Performance Boost" },
  { value: "75+",   label: "Projects"           },
  { value: "1K+",   label: "Concurrent Users"   },
  { value: "99.9%", label: "Uptime Reliability" },
];

/*
  ─── WHY INLINE STYLES ARE USED FOR WIDTH ────────────────────────────────────
  Edge on Windows uses a classic 17px scrollbar (not an overlay scrollbar like
  Chrome on most systems). Every `overflow-x: hidden` ancestor creates a new
  block formatting context where `width: 100%` is calculated as
  (parent content-box − scrollbar). With THREE nested overflow-x:hidden
  wrappers (ThemeProvider → page outer → page inner), this compounds to a
  visibly narrower container than Chrome produces.

  Tailwind's `container` class relies on `width: 100%` cascading through these
  ancestors. Inline styles bypass the cascade entirely — Edge reads the style
  attribute directly from the element and doesn't factor in ancestor scrollbar
  arithmetic. This is the minimal-intrusion fix: the rest of the classes are
  unchanged.
  ─────────────────────────────────────────────────────────────────────────────
*/

/** Shared inline style applied to every section/wrapper that needs full width */
const fullWidth: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
};

/** Inner content container — replaces `container mx-auto px-12 sm:px-14 lg:px-16` */
const innerContainer: React.CSSProperties = {
  width: "100%",
  maxWidth: "1280px",   /* matches Tailwind xl `container` */
  marginLeft: "auto",
  marginRight: "auto",
  boxSizing: "border-box",
  /* clamp keeps padding responsive without needing Tailwind responsive classes
     on the same property that Edge might race to resolve from the stylesheet */
  paddingLeft:  "clamp(2rem, 5vw, 4rem)",   /* ≈ px-12 → px-16 */
  paddingRight: "clamp(2rem, 5vw, 4rem)",
  paddingTop: "0.5rem",
};

export default function About() {
  return (
    <section
      className="relative min-h-screen flex items-center py-8"
      style={{ ...fullWidth, overflow: "visible" }}
    >
      {/* Ambient glow — purely decorative, no layout impact */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2
                   w-130 h-130 rounded-full bg-primary/6
                   blur-[110px] pointer-events-none"
      />

      {/* ── Inner wrapper (was `container mx-auto px-12 lg:px-16`) ─────── */}
      <motion.div
        className="relative z-10"
        style={innerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={container}
      >
        {/* Section tag */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center lg:justify-start mb-6"
        >
          <span className="section-tag">About Me</span>
        </motion.div>

        {/* ── Two-column row ─────────────────────────────────────────────
            overflow: visible keeps the bracket decorators and badge
            (which use negative positioning) visible in Edge's BFC.
        ─────────────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20"
          style={{ overflow: "visible" }}
        >

          {/* ── Photo column ─────────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-[38%] flex justify-center shrink-0"
            style={{ overflow: "visible" }}
            variants={slideRight}
          >
            <div
              className="relative group w-full"
              style={{ maxWidth: "21.25rem", overflow: "visible" }}
            >
              {/* Rotating glow ring */}
              <motion.div
                className="absolute -inset-3 rounded-3xl blur-xl opacity-50
                           group-hover:opacity-90 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(var(--primary)/0.6) 0%, transparent 60%)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Corner bracket decorators */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2
                             border-primary/60 rounded-tl-xl z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2
                             border-primary/60 rounded-br-xl z-20 pointer-events-none" />

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/about.png"
                  alt="Charles Eromose"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover object-top"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-24
                               bg-linear-to-t from-background/70 to-transparent" />
              </div>

              {/* "5+ Years" floating badge */}
              <div className="absolute -right-4 -top-4 z-30 glass-card px-4 py-2
                             text-center shadow-lg border border-primary/30 rounded-xl">
                <div className="text-2xl font-heading font-black text-primary leading-none">
                  5+
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">
                  Years
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Bio column ───────────────────────────────────────────────
              minWidth:0 lets Edge shrink the flex child below its
              intrinsic scrollWidth. Without it Edge overflows the row.
          ─────────────────────────────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-[62%] flex flex-col gap-6 text-center lg:text-left"
            style={{ minWidth: 0 }}
            variants={container}
          >
            <motion.h2
              variants={slideLeft}
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-black
                         leading-tight tracking-tight text-foreground"
            >
              Crafting Digital{" "}
              <span className="gradient-text">Experiences</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-primary1 leading-relaxed text-base sm:text-lg"
            >
              I&apos;m{" "}
              <strong className="text-primary">Charles Eromose Okuekhahmen</strong>
              , a Full Stack Engineer with 5+ years building everything from
              school management systems to e-commerce marketplaces. I specialise
              in clean UIs, efficient APIs, and secure, scalable databases.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-forground leading-relaxed text-base sm:text-lg"
            >
              I thrive on simplifying complex problems — through query
              optimisation, secure auth flows, or cloud deployments on AWS.
              Clean, maintainable code is not a preference, it&apos;s a principle.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card p-4 text-center group
                             hover:border-primary/50 hover:shadow-[0_0_20px_rgb(var(--primary)/0.15)]
                             transition-all duration-300 cursor-default"
                >
                  <div className="font-heading text-3xl font-black text-primary
                                 group-hover:scale-110 transition-transform duration-300 leading-none">
                    {s.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-semibold mt-1.5 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex gap-4 justify-center lg:justify-start flex-wrap"
            >
              <Link href="/#portfolio" className="btn text-sm">View Projects</Link>
              <Link href="/#contact"   className="btn-outline text-sm">Hire Me</Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Skill marquees ─────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="mt-20">
          <p className="text-center text-[16px] font-bold uppercase tracking-[0.22em]
              text-muted-foreground mb-8">
            Technologies I Work With
          </p>

          {/* Row 1 — scrolls LEFT (text pill tags) */}
          <div className="overflow-hidden skills-mask mb-6">
            <div className="skills-scroll-left">
              {[...skills, ...skills].map((skill, i) => (
                <span
                  key={`tag-${i}`}
                  aria-hidden={i >= skills.length}
                  className="inline-flex items-center gap-2 px-4 py-2 shrink-0
                     rounded-full border border-border/60 bg-card/50
                     text-[11px] font-bold uppercase tracking-widest
                     text-muted-foreground whitespace-nowrap
                     hover:border-primary/50 hover:text-primary
                     hover:bg-primary/10 transition-colors duration-200 cursor-default"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background:
                        skill.color === "currentColor"
                          ? "rgb(var(--foreground))"
                          : skill.color,
                    }}
                    aria-hidden="true"
                  />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls RIGHT (icon tiles) */}
          <div className="overflow-visible skills-mask">
            <div className="skills-scroll-right">
              {[...skills, ...skills].map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`icon-${i}`}
                    aria-hidden={i >= skills.length}
                    className="flex flex-col items-center gap-2 shrink-0 min-w-16 group cursor-default"
                  >
                    <div className="p-2.5 rounded-xl bg-card/50 border border-border/50
                           group-hover:border-primary/50 group-hover:bg-card
                           group-hover:shadow-[0_0_14px_rgb(var(--primary)/0.25)]
                           transition-all duration-300 group-hover:scale-110">
                      <Icon
                        style={{
                          fontSize: "3.4rem",
                          color:
                            skill.color === "currentColor"
                              ? "rgb(var(--foreground))"
                              : skill.color,
                        }}
                      />
                    </div>
                    <span className="text-[9px] font-semibold text-muted-foreground
                           uppercase tracking-wider group-hover:text-foreground
                           transition-colors duration-200 whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}