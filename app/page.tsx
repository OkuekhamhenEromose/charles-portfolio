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
      {/* ── Full-page background videos ── */}

      {/* Light mode: cloud video fills entire page */}
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
        <source src="/video/cloud.mp4" type="video/mp4" />
      </video>

      {/* Dark mode: space video */}
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

      {/* Overlay — softens video so text stays readable */}
      <div
        className={`fixed inset-0 z-[1] transition-colors duration-700 ${
          theme === "light"
            ? "bg-white/25 backdrop-brightness-105"
            : "bg-black/55"
        }`}
      />

      {/* Dot-grid texture */}
      <div className="fixed inset-0 z-[2] grid-dots opacity-30 pointer-events-none" />

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