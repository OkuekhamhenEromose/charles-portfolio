"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServiceSummary from "@/components/ServiceSummary";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { theme } = useTheme();
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {/* ── Preloader — AnimatePresence drives the exit animation ── */}
      <AnimatePresence mode="wait">
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/* ── Main site — fades in after preloader exits ── */}
      <motion.div
        className="relative"
        /*
         * dennis's landing uses slideUp (y: 300 → 0, delay: 2.5s).
         * We use a simple opacity fade with a small delay to match
         * the preloader exit animation duration (~1s total).
         */
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Background videos */}
        <video autoPlay loop muted playsInline aria-hidden="true"
               className={`fixed inset-0 w-full h-full object-cover z-0 transition-opacity duration-700
                           ${theme === "light" ? "opacity-100" : "opacity-0"}`}>
          <source src="/video/cloud.mp4" type="video/mp4" />
        </video>

        <video autoPlay loop muted playsInline aria-hidden="true"
               className={`fixed inset-0 w-full h-full object-cover z-0 transition-opacity duration-700
                           ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
          <source src="/video/space.mp4" type="video/mp4" />
        </video>

        {/* Readability overlay */}
        <div className={`fixed inset-0 z-[1] transition-colors duration-700
                         ${theme === "light" ? "bg-white/20" : "bg-black/50"}`} />

        {/* Dot-grid texture */}
        <div className="fixed inset-0 z-[2] grid-dots opacity-25 pointer-events-none" />

        {/* Page content */}
        <div className="relative z-10">
          <Header />

          <main>
            <section id="home"><Hero /></section>
            <section id="about"><About /></section>
            <ServiceSummary />
            <section id="services"><Services /></section>
            <Portfolio />
            <section id="contact"><Contact /></section>
          </main>

          <Footer />
        </div>
      </motion.div>
    </>
  );
}