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
    numberColor: "group-hover:text-pink-500/35",
    tagColor: "group-hover:text-pink-500",
    tagBg: "group-hover:bg-pink-500/10",
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
    numberColor: "group-hover:text-primary/35",
    tagColor: "group-hover:text-primary",
    tagBg: "group-hover:bg-primary/10",
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
    numberColor: "group-hover:text-blue-500/35",
    tagColor: "group-hover:text-blue-500",
    tagBg: "group-hover:bg-blue-500/10",
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
    numberColor: "group-hover:text-violet-500/35",
    tagColor: "group-hover:text-violet-500",
    tagBg: "group-hover:bg-violet-500/10",
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
    numberColor: "group-hover:text-amber-500/35",
    tagColor: "group-hover:text-amber-500",
    tagBg: "group-hover:bg-amber-500/10",
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
    numberColor: "group-hover:text-emerald-500/35",
    tagColor: "group-hover:text-emerald-500",
    tagBg: "group-hover:bg-emerald-500/10",
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
    <section className="relative overflow-hidden py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[130px]"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <span className="section-tag mb-2 inline-flex">What I Offer</span>

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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                className="group relative flex cursor-default flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-lg transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <span
                  className={`pointer-events-none absolute bottom-3 right-4 select-none font-heading text-[6rem] font-black leading-none text-muted-foreground/15 transition-colors duration-500 ${item.numberColor}`}
                >
                  {String(item.id).padStart(2, "0")}
                </span>

                <span
                  className={`relative z-10 self-start rounded-full bg-muted/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 ${item.tagBg} ${item.tagColor}`}
                >
                  {item.tag}
                </span>

                <div
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/70 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${item.iconBg}`}
                >
                  <Icon
                    className={`text-xl text-muted-foreground transition-colors duration-300 ${item.iconColor} group-hover:text-white`}
                  />
                </div>

                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="card-title text-xl transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>

                  <p className="small-text transition-colors duration-300 group-hover:text-foreground/80">
                    {item.desc}
                  </p>
                </div>

                <Link
                  href="/#portfolio"
                  className="relative z-10 mt-auto inline-flex translate-y-2 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary opacity-0 transition-all duration-300 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                >
                  See examples <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}