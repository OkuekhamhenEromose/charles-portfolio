"use client";

import { useTheme } from "@/components/ThemeProvider";
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
  const { theme } = useTheme();

  return (
    <div className="relative">
      {/*
       * ── Background videos ──────────────────────────────────────────
       * IMPORTANT: Both videos must be in the same folder.
       * Place both files in  /public/videos/
       *   /public/videos/cloud.mp4   ← light mode
       *   /public/videos/space.mp4   ← dark mode
       *
       * The `theme` value comes from ThemeProvider (reads localStorage).
       * Switching theme toggles opacity so both videos are always loaded
       * (no flash / re-buffering on toggle).
       * ──────────────────────────────────────────────────────────────
       */}

      {/* Light mode — cloud sky */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full object-cover z-0
                    transition-opacity duration-700
                    ${theme === "light" ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/video/cloud.mp4" type="video/mp4" />
      </video>

      {/* Dark mode — space */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full object-cover z-0
                    transition-opacity duration-700
                    ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/video/space.mp4" type="video/mp4" />
      </video>

      {/* Readability overlay */}
      <div
        className={`fixed inset-0 z-[1] transition-colors duration-700 ${
          theme === "light"
            ? "bg-white/20"
            : "bg-black/50"
        }`}
      />

      {/* Subtle dot-grid texture */}
      <div className="fixed inset-0 z-[2] grid-dots opacity-25 pointer-events-none" />

      {/* ── Page content ── */}
      <div className="relative z-10">
        <Header />

        <main>
          <section id="home">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <ServiceSummary />

          <section id="services">
            <Services />
          </section>

          {/* Portfolio has its own internal <section> with GSAP pin — no wrapper needed */}
          <Portfolio />

          <section id="testimonials">
            <Testimonials />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}