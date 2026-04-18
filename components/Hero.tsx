"use client";

import { useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowDown } from "lucide-react";

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 14 },
  },
};

const codeString = `const profile: DeveloperProfile = {
  name: "Charles Eromose",
  role: "Full Stack Engineer",
  experience: "4+ years",
  stack: {
    frontend: ["React.js", "Next.js", "TypeScript", "Tailwind"],
    backend: ["Django", "Node.js", "Express.js", "Python"],
    database: ["PostgreSQL", "MongoDB", "MySQL"],
    cloud: ["AWS", "Docker", "Vercel", "Netlify"],
  },
  skills: ["UI/UX", "API Dev", "Cloud", "Auth"],
  availability: "Open to opportunities 🚀",
};`;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Radial glow behind code block */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full
                   bg-primary/5 blur-[120px] pointer-events-none"
      />

      <div
        className="container mx-auto relative z-10
                   flex flex-col lg:flex-row items-center justify-between
                   gap-12 px-4 sm:px-6 lg:px-8 pt-28 pb-16"
      >
        {/* ── Left: Text + Code ── */}
        <motion.div
          className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting tag */}
          <motion.div variants={fadeInDown} className="mb-4">
            <span className="section-tag">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for hire
            </span>
          </motion.div>

          {/* Name heading */}
          <motion.h1
            variants={fadeInDown}
            className="font-heading text-4xl xs:text-5xl md:text-6xl lg:text-7xl
                       font-black leading-[1.05] tracking-tight text-foreground mb-4"
          >
            I&apos;m{" "}
            <span className="gradient-text">Charles</span>
            <br />
            <span className="text-foreground/40">Eromose</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInDown}
            className="text-muted-foreground text-base md:text-lg mb-6 max-w-md"
          >
            Full Stack Engineer crafting scalable web applications, 
            powerful APIs & cloud solutions.
          </motion.p>

          {/* Code block */}
          <motion.div variants={zoomIn} className="w-full max-w-xl mb-8">
            <div className="syntax-wrapper relative group">
              <div
                className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(var(--primary)/0.3), transparent)",
                }}
              />
              <SyntaxHighlighter
                language="typescript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: "12px",
                  background: "rgba(14,14,28,0.95)",
                  fontSize: "0.7rem",
                  lineHeight: "1.25rem",
                  padding: "1rem",
                  border: "1px solid rgb(var(--border))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
                showLineNumbers={false}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          </motion.div>

          {/* CTAs */}
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
              href="/charles-eromose-cv.pdf"
              download
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline text-sm px-8 py-3"
            >
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right: Rotating Earth ── */}
        <motion.div
          className="w-full lg:w-[42%] flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative animate-float">
            {/* Glow ring */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-2xl opacity-30 bg-primary scale-90"
            />
            <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px]">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain drop-shadow-2xl"
              >
                <source src="/videos/rotatingearth.webm" type="video/webm" />
                <source src="/videos/rotatingearth.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="/#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 text-muted-foreground
                   hover:text-primary transition-colors duration-300 group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}