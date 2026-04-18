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
      {/* ── Shared video backgrounds ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full object-cover transition-opacity duration-700 z-0 ${
          theme === "light" ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/cloud.mp4" type="video/mp4" />
      </video>

      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className={`fixed inset-0 w-full h-full object-cover transition-opacity duration-700 z-0 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/space.mp4" type="video/mp4" />
      </video>

      {/* Shared overlay */}
      <div
        className={`fixed inset-0 z-[1] transition-colors duration-700 ${
          theme === "light" ? "bg-white/35" : "bg-black/50"
        }`}
      />

      {/* Grid dot overlay for texture */}
      <div className="fixed inset-0 z-[2] grid-dots opacity-40 pointer-events-none" />

      {/* Content */}
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

          <section id="portfolio">
            <Portfolio />
          </section>

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