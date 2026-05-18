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
  // Disable browser scroll restoration
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // Remove any hash immediately
  if (window.location.hash) {
    window.history.replaceState(
      null,
      "",
      window.location.pathname
    );
  }

  // HARD reset scroll BEFORE paint
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);

  // Lock scrolling completely during preload
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = "0";

  return () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
  };
}, []);

  const handlePreloaderComplete = () => {
  // Force absolute top again
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";

      // Final hard reset
      window.scrollTo(0, 0);

      setPreloaderDone(true);
    });
  });
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