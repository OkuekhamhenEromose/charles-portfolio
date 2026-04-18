"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  FaPalette, FaCode, FaMobile, FaServer, FaCloud, FaDatabase,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    icon: FaPalette,
    title: "UI/UX & Creative Design",
    desc: "Intuitive, user-centered interfaces that combine aesthetics with functionality to engage and convert users.",
    tag: "Design",
  },
  {
    id: 2,
    icon: FaCode,
    title: "Full-Stack Development",
    desc: "End-to-end development from responsive frontends to powerful backends, APIs, and databases.",
    tag: "Development",
  },
  {
    id: 3,
    icon: FaMobile,
    title: "Responsive & Cross-Device",
    desc: "Websites and apps that adapt seamlessly across all devices, ensuring consistent speed and performance.",
    tag: "Frontend",
  },
  {
    id: 4,
    icon: FaServer,
    title: "Scalable Architecture",
    desc: "Systems engineered to scale efficiently, handle traffic growth, and maintain performance under load.",
    tag: "Backend",
  },
  {
    id: 5,
    icon: FaCloud,
    title: "Cloud & DevOps",
    desc: "Deployment on AWS, containerization with Docker, and CI/CD pipelines for faster, reliable delivery.",
    tag: "Cloud",
  },
  {
    id: 6,
    icon: FaDatabase,
    title: "Database Management",
    desc: "Designing, optimizing, and maintaining SQL/NoSQL databases for secure, efficient data handling.",
    tag: "Data",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", duration: 0.7, bounce: 0.3 },
  },
};

export default function Services() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[700px] h-[500px] bg-primary/4 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="section-tag mb-4 inline-flex">What I Offer</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-foreground mt-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
            From concept to deployment — full-spectrum engineering and design
            services tailored to your goals.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 group cursor-default
                           hover:border-primary/40 hover:shadow-xl
                           hover:shadow-primary/5 transition-all duration-400
                           flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Number */}
                <span className="absolute top-4 right-5 font-heading font-black text-5xl text-primary/5 pointer-events-none select-none">
                  0{item.id}
                </span>

                {/* Tag */}
                <span className="self-start text-[10px] font-bold uppercase tracking-widest
                                  text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {item.tag}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center
                               bg-muted/60 group-hover:bg-primary transition-colors duration-400"
                >
                  <Icon className="text-lg text-primary group-hover:text-primary-foreground transition-colors duration-400" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2
                                  group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="/#portfolio"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold
                               text-primary opacity-0 group-hover:opacity-100 transition-all duration-300
                               hover:underline underline-offset-2"
                >
                  See examples <ArrowUpRight className="w-3 h-3" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}