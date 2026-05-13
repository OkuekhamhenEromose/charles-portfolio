"use client";

import { motion, type Variants, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  FaPalette,
  FaCode,
  FaMobile,
  FaServer,
  FaCloud,
  FaDatabase,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    icon: FaPalette,
    title: "UI/UX & Creative Design",
    desc: "Intuitive, user-centered interfaces that combine aesthetics with functionality to engage and convert users.",
    tag: "Design",
    accent: "from-pink-500/20 to-rose-500/10",
    numberColor: "text-pink-500/20 group-hover:text-pink-500/35",
    tagColor: "text-pink-500 group-hover:text-pink-500",
    tagBg: "bg-pink-500/10 group-hover:bg-pink-500/10",
    iconColor: "group-hover:text-pink-500",
    iconBg: "group-hover:bg-pink-500",
  },
  {
    id: 2,
    icon: FaCode,
    title: "Full-Stack Development",
    desc: "End-to-end development from responsive frontends to powerful backends, APIs, and databases.",
    tag: "Engineering",
    accent: "from-primary/20 to-cyan-500/10",
    numberColor: "text-primary/20 group-hover:text-primary/35",
    tagColor: "text-primary group-hover:text-primary",
    tagBg: "bg-primary/10 group-hover:bg-primary/10",
    iconColor: "group-hover:text-primary",
    iconBg: "group-hover:bg-primary",
  },
  {
    id: 3,
    icon: FaMobile,
    title: "Responsive & Cross-Device",
    desc: "Websites and apps that adapt seamlessly across all devices with consistent speed and performance.",
    tag: "Frontend",
    accent: "from-blue-500/20 to-indigo-500/10",
    numberColor: "text-blue-500/20 group-hover:text-blue-500/35",
    tagColor: "text-blue-500 group-hover:text-blue-500",
    tagBg: "bg-blue-500/10 group-hover:bg-blue-500/10",
    iconColor: "group-hover:text-blue-500",
    iconBg: "group-hover:bg-blue-500",
  },
  {
    id: 4,
    icon: FaServer,
    title: "Scalable Architecture",
    desc: "Systems engineered to handle traffic growth and maintain high performance under load.",
    tag: "Backend",
    accent: "from-violet-500/20 to-purple-500/10",
    numberColor: "text-violet-500/20 group-hover:text-violet-500/35",
    tagColor: "text-violet-500 group-hover:text-violet-500",
    tagBg: "bg-violet-500/10 group-hover:bg-violet-500/10",
    iconColor: "group-hover:text-violet-500",
    iconBg: "group-hover:bg-violet-500",
  },
  {
    id: 5,
    icon: FaCloud,
    title: "Cloud & DevOps",
    desc: "AWS deployments, Docker containerisation, and CI/CD pipelines for fast, reliable delivery.",
    tag: "Cloud",
    accent: "from-amber-500/20 to-orange-500/10",
    numberColor: "text-amber-500/20 group-hover:text-amber-500/35",
    tagColor: "text-amber-500 group-hover:text-amber-500",
    tagBg: "bg-amber-500/10 group-hover:bg-amber-500/10",
    iconColor: "group-hover:text-amber-500",
    iconBg: "group-hover:bg-amber-500",
  },
  {
    id: 6,
    icon: FaDatabase,
    title: "Database Management",
    desc: "Designing, optimising, and maintaining SQL/NoSQL databases for secure, efficient data handling.",
    tag: "Data",
    accent: "from-emerald-500/20 to-teal-500/10",
    numberColor: "text-emerald-500/20 group-hover:text-emerald-500/35",
    tagColor: "text-emerald-500 group-hover:text-emerald-500",
    tagBg: "bg-emerald-500/10 group-hover:bg-emerald-500/10",
    iconColor: "group-hover:text-emerald-500",
    iconBg: "group-hover:bg-emerald-500",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", duration: 0.75, bounce: 0.25 },
  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative overflow-hidden py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-200
                   -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <span className="section-tag mb-3 inline-flex">What I Offer</span>
          <h2 className="section-title mt-3 text-foreground">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="body-text mx-auto mt-4 max-w-lg">
            From concept to cloud — full-spectrum engineering and design
            tailored to your goals.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 place-items-center gap-5
                     sm:grid-cols-2 sm:place-items-stretch sm:gap-6
                     lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative flex w-[88%] max-w-88 cursor-pointer flex-col
                           overflow-hidden rounded-2xl border border-border bg-card p-5
                           shadow-lg transition-all duration-500
                           hover:border-primary/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                           sm:w-full sm:max-w-none sm:gap-5 sm:p-7"
              >
                {/*
                  ── Entire card is a link to /#portfolio ─────────────────
                  The Link covers the full card via absolute inset-0.
                  All other content sits above it via relative z-10.
                */}
                <Link
                  href="/#portfolio"
                  className="absolute inset-0 z-20"
                  aria-label={`${item.title} — view portfolio`}
                />

                {/*
                  ── Accent gradient overlay ───────────────────────────────
                  On desktop: opacity-0 → opacity-100 on group-hover.
                  On mobile (no hover): always opacity-60 so the color
                  identity of each card is visible without needing a tap.
                */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-linear-to-br ${item.accent}
                              opacity-60 transition-opacity duration-500
                              sm:opacity-0 sm:group-hover:opacity-100`}
                />

                {/*
                  ── Large background number ───────────────────────────────
                  Mobile: always visible in the card's accent color.
                  Desktop: muted until hover, then switches to accent color.
                */}
                <span
                  className={`pointer-events-none absolute bottom-3 right-4 select-none
                              font-heading text-[5rem] font-black leading-none
                              transition-colors duration-500
                              sm:text-[6rem] sm:text-muted-foreground/15
                              ${item.numberColor}`}
                >
                  {String(item.id).padStart(2, "0")}
                </span>

                {/*
                  ── Tag pill ─────────────────────────────────────────────
                  Mobile: always colored. Desktop: muted → colored on hover.
                */}
                <span
                  className={`relative z-10 mb-5 self-start rounded-full px-3 py-1
                              text-[10px] font-bold uppercase tracking-[0.15em]
                              transition-colors duration-300 sm:mb-0
                              ${item.tagBg} ${item.tagColor}`}
                >
                  {item.tag}
                </span>

                {/* ── Icon + Title row ──────────────────────────────────── */}
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                                  bg-muted/70 shadow-sm transition-all duration-500
                                  group-hover:scale-110 group-hover:shadow-lg
                                  sm:h-14 sm:w-14 sm:rounded-2xl ${item.iconBg}`}
                    >
                      <Icon
                        className={`text-base text-muted-foreground transition-colors duration-300
                                    sm:text-xl ${item.iconColor} group-hover:text-white`}
                      />
                    </div>

                    <h3
                      className="pt-0.5 text-[1rem] font-bold leading-tight text-foreground
                                 transition-colors duration-300 group-hover:text-primary
                                 sm:pt-0 sm:text-xl"
                    >
                      {item.title}
                    </h3>
                  </div>

                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-muted-foreground
                               transition-colors duration-300 group-hover:text-primary
                               sm:hidden"
                  />
                </div>

                {/* ── Description ──────────────────────────────────────── */}
                <p
                  className="relative z-10 mt-2 pl-12 text-[0.82rem] leading-5 text-muted-foreground
                             transition-colors duration-300 group-hover:text-foreground/80
                             sm:mt-0 sm:pl-0 sm:text-sm sm:leading-6"
                >
                  {item.desc}
                </p>

                {/*
                  ── "See examples" label ──────────────────────────────────
                  Desktop only (hidden on mobile — whole card is tappable).
                  Slides up and fades in on hover.
                */}
                <span
                  className="relative z-10 mt-5 hidden translate-y-2 items-center
                             gap-1.5 text-xs font-bold uppercase tracking-wider text-primary
                             opacity-0 transition-all duration-300 hover:underline
                             group-hover:translate-y-0 group-hover:opacity-100
                             sm:mt-auto sm:inline-flex"
                >
                  See examples <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}