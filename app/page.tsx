"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServiceSummary from "@/components/ServiceSummary";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>
      <motion.div
        className="relative min-h-screen w-full max-w-full overflow-x-clip"
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <video autoPlay loop muted playsInline aria-hidden="true"
               className="fixed inset-0 w-full h-full object-cover z-0 opacity-100">
          <source src="/video/space.mp4" type="video/mp4" />
        </video>

        <div className="fixed inset-0 z-1 bg-black/50 transition-colors duration-700" />

        <div className="fixed inset-0 z-2 grid-dots opacity-25 pointer-events-none" />

        <div className="relative z-10 w-full max-w-full overflow-x-clip">
          <Header />

          <main className="w-full max-w-full overflow-x-clip">
            <section id="home"><Hero /></section>
            <section id="about"><About /></section>
            <ServiceSummary />
            <section id="services"><Services /></section>
            <Portfolio />
            <Testimonials ready={preloaderDone} />
            <section id="contact"><Contact /></section>
          </main>

          <Footer />
        </div>
      </motion.div>
    </>
  );
}