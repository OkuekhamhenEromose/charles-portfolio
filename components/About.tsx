"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs, SiPython,
  SiMongodb, SiGit, SiDocker, SiPostgresql, SiNextdotjs,
  SiDjango, SiExpress, SiTypescript, SiTailwindcss,
  SiFigma, SiWordpress,                          /* NEW */
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16,1,0.3,1] as [number,number,number,number] } },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16,1,0.3,1] as [number,number,number,number] } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/* ── Skills — Figma + WordPress added ─────────────────────── */
const skills = [
  { icon: SiHtml5,      name: "HTML5",      color: "#E34F26" },
  { icon: SiCss,       name: "CSS3",       color: "#1572B6" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiReact,      name: "React",      color: "#61DAFB" },
  { icon: SiNextdotjs,  name: "Next.js",    color: "currentColor" },
  { icon: SiTailwindcss,name: "Tailwind",   color: "#06B6D4" },
  { icon: SiFigma,      name: "Figma",      color: "#F24E1E" },  /* NEW */
  { icon: SiNodedotjs,  name: "Node.js",    color: "#339933" },
  { icon: SiExpress,    name: "Express",    color: "currentColor" },
  { icon: SiPython,     name: "Python",     color: "#3776AB" },
  { icon: SiDjango,     name: "Django",     color: "#16a34a" },
  { icon: SiMongodb,    name: "MongoDB",    color: "#47A248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiGit,        name: "Git",        color: "#F05032" },
  { icon: SiDocker,     name: "Docker",     color: "#2496ED" },
  { icon: FaAws,        name: "AWS",        color: "#FF9900" },
  { icon: SiWordpress,  name: "WordPress",  color: "#21759B" },  /* NEW */
];

/*
 * Triple for seamless loop.
 * CSS keyframe slide-left animates 0 → -33.333% (exactly one set).
 * At -33.333% the pattern repeats identically → gap-free infinite scroll.
 */
const tripled = [...skills, ...skills, ...skills];

const stats = [
  { value: "4+",  label: "Years Exp." },
  { value: "20+", label: "Projects"   },
  { value: "10+", label: "Clients"    },
  { value: "∞",   label: "Coffee"     },
];

export default function About() {
  return (
    <section className="relative min-h-screen flex items-center py-8 overflow-hidden">

      <div aria-hidden
           className="absolute right-0 top-1/2 -translate-y-1/2
                      w-[520px] h-[520px] rounded-full bg-primary/6
                      blur-[110px] pointer-events-none" />

      <motion.div
        className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 pt-2"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={container}
      >
        <motion.div variants={fadeUp} className="flex justify-center lg:justify-start mb-6">
          <span className="section-tag">About Me</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Photo */}
          <motion.div className="w-full lg:w-[38%] flex justify-center flex-shrink-0"
                       variants={slideRight}>
            <div className="relative group max-w-[340px] w-full">
              <motion.div
                className="absolute -inset-3 rounded-3xl blur-xl opacity-50
                           group-hover:opacity-90 transition-opacity duration-500"
                style={{ background:"linear-gradient(135deg, rgb(var(--primary)/0.6) 0%, transparent 60%)" }}
                animate={{ rotate:[0,360] }}
                transition={{ duration:20, repeat:Infinity, ease:"linear" }}
              />
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-xl z-20" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-xl z-20" />

              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <Image src="/images/about.png" alt="Charles Eromose"
                       width={400} height={500}
                       className="w-full h-auto object-cover object-top" priority />
                <div className="absolute bottom-0 left-0 right-0 h-24
                                bg-gradient-to-t from-background/70 to-transparent" />
              </div>

              <div className="absolute -right-4 -top-4 z-30 glass-card px-4 py-2 text-center shadow-lg border border-primary/30 rounded-xl">
                <div className="text-2xl font-heading font-black text-primary leading-none">4+</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">Years</div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div className="w-full lg:w-[62%] flex flex-col gap-6 text-center lg:text-left"
                       variants={container}>
            <motion.h2 variants={slideLeft}
                        className="font-heading text-4xl sm:text-5xl md:text-6xl font-black
                                   leading-tight tracking-tight text-foreground">
              Crafting Digital <span className="gradient-text">Experiences</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              I&apos;m <strong className="text-foreground">Charles Eromose Okuekhahmen</strong>, a Full Stack
              Engineer with 4+ years building everything from school management systems to e-commerce
              marketplaces. I specialise in clean UIs, efficient APIs, and secure, scalable databases.
            </motion.p>

            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              I thrive on simplifying complex problems — through query optimisation, secure auth flows,
              or cloud deployments on AWS. Clean, maintainable code is not a preference, it&apos;s a principle.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label}
                     className="glass-card p-4 text-center group
                                hover:border-primary/50 hover:shadow-[0_0_20px_rgb(var(--primary)/0.15)]
                                transition-all duration-300 cursor-default">
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

            <motion.div variants={fadeUp} className="flex gap-4 justify-center lg:justify-start flex-wrap">
              <Link href="/#portfolio" className="btn text-sm">View Projects</Link>
              <Link href="/#contact"   className="btn-outline text-sm">Hire Me</Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SKILLS SLIDER
            FIX: edge gradient divs REMOVED — they caused the white
            translucent ends in light mode. The slider is now fully
            seamless. The animation uses CSS keyframe slide-left
            (0 → -33.333%) which perfectly matches the tripled strip.
        ══════════════════════════════════════════════════════════ */}
        <motion.div variants={fadeUp} className="mt-20">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em]
                        text-muted-foreground mb-6">
            Technologies I Work With
          </p>

          {/*
           * No overflow-hidden, no edge fades.
           * The strip is wider than the viewport; it scrolls in from the left
           * naturally. Removing overflow-hidden also prevents clipping of
           * the hover scale effect on individual icons.
           */}
          <div className="overflow-hidden">
            <div className="flex gap-8 sm:gap-10 animate-slide-left
                            hover:[animation-play-state:paused]">
              {tripled.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div key={i}
                       className="flex flex-col items-center gap-2 flex-shrink-0 min-w-[60px] group cursor-default">
                    <div className="p-2.5 rounded-xl bg-card/50 border border-border/50
                                    group-hover:border-primary/50 group-hover:bg-card
                                    group-hover:shadow-[0_0_14px_rgb(var(--primary)/0.2)]
                                    transition-all duration-300 group-hover:scale-110">
                      <Icon style={{ fontSize:"1.6rem", color:skill.color }} />
                    </div>
                    <span className="text-[9px] font-semibold text-muted-foreground
                                     uppercase tracking-wider group-hover:text-foreground
                                     transition-colors duration-200">
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