"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiNodedotjs, SiPython,
  SiMongodb, SiGit, SiDocker, SiPostgresql, SiNextdotjs,
  SiDjango, SiExpress, SiTypescript, SiTailwindcss,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const containerAnim: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const skills = [
  { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
  { icon: SiCss3, name: "CSS3", color: "#1572B6" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "currentColor" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiExpress, name: "Express", color: "currentColor" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiDjango, name: "Django", color: "#16a34a" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: FaAws, name: "AWS", color: "#FF9900" },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients" },
  { value: "∞", label: "Cups of Coffee" },
];

const tripled = [...skills, ...skills, ...skills];

export default function About() {
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Background accent */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2
                   w-[500px] h-[500px] rounded-full
                   bg-primary/5 blur-[100px] pointer-events-none"
      />

      <motion.div
        className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 pt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerAnim}
      >
        {/* Section tag */}
        <motion.div variants={fadeUp} className="flex justify-center lg:justify-start mb-4">
          <span className="section-tag">About Me</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* ── Photo ── */}
          <motion.div
            className="w-full lg:w-[38%] flex justify-center flex-shrink-0"
            variants={slideRight}
          >
            <div className="relative group max-w-[340px] w-full">
              {/* Decorative border */}
              <div
                className="absolute -inset-3 rounded-3xl opacity-60
                            group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(var(--primary)/0.5), transparent)",
                }}
              />
              {/* Corner accent */}
              <div
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl border-2
                            border-primary/40 bg-card/50 backdrop-blur-sm z-10"
              />
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <Image
                  src="/images/about-photo.jpg"
                  alt="Charles Eromose"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* ── Text content ── */}
          <motion.div
            className="w-full lg:w-[62%] flex flex-col gap-6 text-center lg:text-left"
            variants={containerAnim}
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
              className="text-muted-foreground leading-relaxed text-base sm:text-lg"
            >
              I&apos;m <strong className="text-foreground">Charles Eromose Okuekhahmen</strong>,
              a Full Stack Engineer with 4+ years building everything from school management
              systems to e-commerce marketplaces. I specialize in clean UIs, efficient APIs,
              and secure, scalable databases.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed text-base sm:text-lg"
            >
              I thrive on simplifying complex problems — whether through query optimization,
              secure authentication flows, or cloud deployments on AWS. Clean, maintainable
              code is not a preference, it&apos;s a principle.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card p-4 text-center group hover:border-primary/40 transition-all duration-300"
                >
                  <div className="font-heading text-3xl font-black text-primary group-hover:scale-110 transition-transform duration-300">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground font-medium mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 justify-center lg:justify-start">
              <a href="/#portfolio" className="btn text-sm">
                View Projects
              </a>
              <a href="/#contact" className="btn-outline text-sm">
                Hire Me
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Skills slider ── */}
        <motion.div variants={fadeUp} className="mt-16 lg:mt-20">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Technologies I Work With
          </p>
          <div className="overflow-hidden relative">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

            <div className="flex gap-8 animate-slide-left">
              {tripled.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 flex-shrink-0 min-w-[60px]
                               hover:scale-110 transition-transform duration-300 cursor-default"
                  >
                    <Icon style={{ fontSize: "2rem", color: skill.color }} />
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
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