"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServiceSummary from "@/components/ServiceSummary";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CompaniesWorked from "@/components/CompaniesWorked";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    // ── 1. Kill browser scroll restoration immediately ──────────────────
    // "manual" stops the browser from jumping to the last scroll position.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // ── 2. Hard-reset scroll to top on every mount ──────────────────────
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // ── 3. Lock body scroll while the preloader is visible ──────────────
    // This prevents any scroll event (touch, keyboard, etc.) from moving
    // the page before the preloader exits.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore on unmount (shouldn't happen in practice, but safe)
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handlePreloaderComplete = () => {
    // ── 4. Re-scroll to absolute top once preloader exits ───────────────
    // Framer's exit animation takes ~0.8s — wait for it to fully clear,
    // then snap to top and unlock scrolling.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    setTimeout(() => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      // One final scroll reset after overflow is restored, in case
      // the browser tried to jump while overflow was hidden.
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setPreloaderDone(true);
    }, 50);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <motion.div
        className="relative min-h-screen w-full max-w-full overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <video
          autoPlay loop muted playsInline aria-hidden="true"
          className="fixed inset-0 w-full h-full object-cover z-0 opacity-100"
        >
          <source src="/video/space.mp4" type="video/mp4" />
        </video>

        <div className="fixed inset-0 z-1 bg-black/50 transition-colors duration-700" />
        <div className="fixed inset-0 z-2 grid-dots opacity-25 pointer-events-none" />

        <div className="relative z-10 w-full max-w-full overflow-x-hidden">
          <Header />

          <main className="w-full max-w-full overflow-x-hidden">
            <section id="home"><Hero /></section>
            <section id="about"><About /></section>
            <ServiceSummary />
            <section id="services"><Services /></section>
            <Portfolio />
            <Testimonials ready={preloaderDone} />
            <CompaniesWorked />
            <section id="contact"><Contact /></section>
          </main>

          <Footer />
        </div>
      </motion.div>
    </>
  );
}