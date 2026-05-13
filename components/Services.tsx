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

/**
 * Two bugs fixed:
 *
 * 1. DOUBLE-TRANSLATION ON DESKTOP HOVER
 *    Root cause: `transition-all duration-500` on the motion.div makes CSS
 *    also try to animate `transform`, while Framer Motion independently drives
 *    the same property via JS — two systems fighting over `transform` creates
 *    the double-jitter.
 *    Fix: Replace `transition-all` with `transition-[border-color,box-shadow,background-color]`
 *    so CSS never touches `transform`. Framer Motion owns it exclusively.
 *    whileHover values also softened (y:-8, scale:1.01) + spring transition
 *    for a crisp, single-pass lift.
 *
 * 2. NO ACCENT COLOURS ON MOBILE
 *    Root cause: All colour classes were behind `group-hover:` which never
 *    fires on touch/pointer:none devices.
 *    Fix: Flip to MOBILE-FIRST coloured state, then `sm:` resets to neutral,
 *    then `sm:group-hover:` restores colour on desktop hover.
 *    Pattern per property:
 *      iconBg    → "bg-{c}/80  sm:bg-muted/70  sm:group-hover:bg-{c}"
 *      iconColor → "text-white  sm:text-muted-foreground  sm:group-hover:text-white"
 *      number    → "text-{c}/45 sm:text-muted-foreground/15 sm:group-hover:text-{c}/40"
 *    The accent gradient overlay and tag pill were already correct.
 */

const services = [
  {
    id: 1,
    icon: FaPalette,
    title: "UI/UX & Creative Design",
    desc: "Intuitive, user-centered interfaces that combine aesthetics with functionality to engage and convert users.",
    tag: "Design",
    accent: "from-pink-500/20 to-rose-500/10",
    // Mobile = always coloured; sm: resets to neutral; sm:group-hover: re-colours
    numberColor:
      "text-pink-500/45 sm:text-muted-foreground/15 sm:group-hover:text-pink-500/40",
    tagColor: "text-pink-500",
    tagBg: "bg-pink-500/10",
    // icon wrapper bg: coloured on mobile, muted on desktop-default, coloured on desktop-hover
    iconBg:
      "bg-pink-500/80 sm:bg-muted/70 sm:group-hover:bg-pink-500",
    // icon svg: white on mobile (sits on coloured bg), muted on desktop-default, white on desktop-hover
    iconColor:
      "text-white sm:text-muted-foreground sm:group-hover:text-white",
    // title: accent on mobile, foreground on desktop-default, primary on desktop-hover
    titleColor:
      "text-pink-500 sm:text-foreground sm:group-hover:text-primary",
  },
  {
    id: 2,
    icon: FaCode,
    title: "Full-Stack Development",
    desc: "End-to-end development from responsive frontends to powerful backends, APIs, and databases.",
    tag: "Engineering",
    accent: "from-primary/20 to-cyan-500/10",
    numberColor:
      "text-primary/45 sm:text-muted-foreground/15 sm:group-hover:text-primary/40",
    tagColor: "text-primary",
    tagBg: "bg-primary/10",
    iconBg:
      "bg-teal-500/80 sm:bg-muted/70 sm:group-hover:bg-teal-500",
    iconColor:
      "text-white sm:text-muted-foreground sm:group-hover:text-white",
    titleColor:
      "text-teal-400 sm:text-foreground sm:group-hover:text-primary",
  },
  {
    id: 3,
    icon: FaMobile,
    title: "Responsive & Cross-Device",
    desc: "Websites and apps that adapt seamlessly across all devices with consistent speed and performance.",
    tag: "Frontend",
    accent: "from-blue-500/20 to-indigo-500/10",
    numberColor:
      "text-blue-500/45 sm:text-muted-foreground/15 sm:group-hover:text-blue-500/40",
    tagColor: "text-blue-500",
    tagBg: "bg-blue-500/10",
    iconBg:
      "bg-blue-500/80 sm:bg-muted/70 sm:group-hover:bg-blue-500",
    iconColor:
      "text-white sm:text-muted-foreground sm:group-hover:text-white",
    titleColor:
      "text-blue-400 sm:text-foreground sm:group-hover:text-primary",
  },
  {
    id: 4,
    icon: FaServer,
    title: "Scalable Architecture",
    desc: "Systems engineered to handle traffic growth and maintain high performance under load.",
    tag: "Backend",
    accent: "from-violet-500/20 to-purple-500/10",
    numberColor:
      "text-violet-500/45 sm:text-muted-foreground/15 sm:group-hover:text-violet-500/40",
    tagColor: "text-violet-500",
    tagBg: "bg-violet-500/10",
    iconBg:
      "bg-violet-500/80 sm:bg-muted/70 sm:group-hover:bg-violet-500",
    iconColor:
      "text-white sm:text-muted-foreground sm:group-hover:text-white",
    titleColor:
      "text-violet-400 sm:text-foreground sm:group-hover:text-primary",
  },
  {
    id: 5,
    icon: FaCloud,
    title: "Cloud & DevOps",
    desc: "AWS deployments, Docker containerisation, and CI/CD pipelines for fast, reliable delivery.",
    tag: "Cloud",
    accent: "from-amber-500/20 to-orange-500/10",
    numberColor:
      "text-amber-500/45 sm:text-muted-foreground/15 sm:group-hover:text-amber-500/40",
    tagColor: "text-amber-500",
    tagBg: "bg-amber-500/10",
    iconBg:
      "bg-amber-500/80 sm:bg-muted/70 sm:group-hover:bg-amber-500",
    iconColor:
      "text-white sm:text-muted-foreground sm:group-hover:text-white",
    titleColor:
      "text-amber-400 sm:text-foreground sm:group-hover:text-primary",
  },
  {
    id: 6,
    icon: FaDatabase,
    title: "Database Management",
    desc: "Designing, optimising, and maintaining SQL/NoSQL databases for secure, efficient data handling.",
    tag: "Data",
    accent: "from-emerald-500/20 to-teal-500/10",
    numberColor:
      "text-emerald-500/45 sm:text-muted-foreground/15 sm:group-hover:text-emerald-500/40",
    tagColor: "text-emerald-500",
    tagBg: "bg-emerald-500/10",
    iconBg:
      "bg-emerald-500/80 sm:bg-muted/70 sm:group-hover:bg-emerald-500",
    iconColor:
      "text-white sm:text-muted-foreground sm:group-hover:text-white",
    titleColor:
      "text-emerald-400 sm:text-foreground sm:group-hover:text-primary",
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
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-200
                   -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* ── Section header ─────────────────────────────────────── */}
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

        {/* ── Card grid ──────────────────────────────────────────── */}
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
                /**
                 * FIX 1 — Single smooth lift:
                 * Softened values (y:-8, scale:1.01) + spring transition inline.
                 * CSS transition-all is REMOVED from className so CSS never
                 * competes with Framer Motion over the `transform` property.
                 */
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative flex w-[88%] max-w-88 cursor-pointer flex-col
                           overflow-hidden rounded-2xl border border-border bg-card p-5
                           shadow-lg
                           /* ↓ Only transition colours/shadows — NOT transform (Framer owns that) */
                           transition-[border-color,box-shadow,background-color] duration-400
                           hover:border-primary/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                           sm:w-full sm:max-w-none sm:gap-5 sm:p-7"
              >
                {/* Full-card link (sits above gradient, below content) */}
                <Link
                  href="/#portfolio"
                  className="absolute inset-0 z-20"
                  aria-label={`${item.title} — view portfolio`}
                />

                {/*
                  Accent gradient overlay
                  ─ Mobile : opacity-60 (always visible — no hover on touch)
                  ─ Desktop: opacity-0 by default → opacity-100 on group-hover
                */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-linear-to-br ${item.accent}
                              opacity-60 transition-opacity duration-500
                              sm:opacity-0 sm:group-hover:opacity-100`}
                />

                {/*
                  Background number
                  ─ Mobile : accent colour at /45 opacity (always visible)
                  ─ Desktop: muted/15 default → accent/40 on hover
                */}
                <span
                  className={`pointer-events-none absolute bottom-3 right-4 select-none
                              font-heading text-[5rem] font-black leading-none
                              transition-colors duration-500
                              sm:text-[6rem] ${item.numberColor}`}
                >
                  {String(item.id).padStart(2, "0")}
                </span>

                {/* Tag pill — always coloured (both mobile and desktop) */}
                <span
                  className={`relative z-10 mb-5 self-start rounded-full px-3 py-1
                              text-[10px] font-bold uppercase tracking-[0.15em]
                              sm:mb-0 ${item.tagBg} ${item.tagColor}`}
                >
                  {item.tag}
                </span>

                {/* ── Icon + Title row ──────────────────────────────── */}
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">

                    {/*
                      Icon wrapper
                      ─ Mobile : accent bg (/80) + white icon → immediately readable
                      ─ Desktop: bg-muted/70 + muted icon by default
                                 → accent bg + white icon on group-hover
                    */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center
                                  rounded-xl shadow-sm
                                  transition-[background-color,box-shadow,transform] duration-400
                                  group-hover:scale-110 group-hover:shadow-lg
                                  sm:h-14 sm:w-14 sm:rounded-2xl ${item.iconBg}`}
                    >
                      <Icon
                        className={`text-base transition-colors duration-300
                                    sm:text-xl ${item.iconColor}`}
                      />
                    </div>

                    {/*
                      Title
                      ─ Mobile : per-service accent colour (visible without hover)
                      ─ Desktop: text-foreground default → text-primary on hover
                    */}
                    <h3
                      className={`pt-0.5 text-[1rem] font-bold leading-tight
                                  transition-colors duration-300
                                  sm:pt-0 sm:text-xl ${item.titleColor}`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Arrow — mobile only, always teal to signal interactivity */}
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-primary
                               sm:hidden"
                  />
                </div>

                {/* Description */}
                <p
                  className="relative z-10 mt-2 pl-12 text-[0.82rem] leading-5 text-foreground
                             transition-colors duration-300 sm:mt-0 sm:pl-0 sm:text-sm sm:leading-6"
                >
                  {item.desc}
                </p>

                {/*
                  "See examples" CTA — desktop hover only
                  Slides up + fades in; hidden on mobile (whole card is tappable)
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