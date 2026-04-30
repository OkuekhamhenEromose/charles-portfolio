"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Bright Nwachukwu",
    role: "Product/Project Management · Software Engineering",
    image: "/img/testimonials/brightnwachukwu.jpeg",
    text: "Charles has an exceptional eye for detail. He approaches UI/UX challenges with creativity while ensuring performance and accessibility aren't compromised.",
  },
  {
    id: 2,
    name: "Enoch Olisa",
    role: "Software Quality Engineer · Test Automation",
    image: "/img/testimonials/enoch olisa.jpeg",
    text: "Charles is more than just a talented developer — he's a professional who uplifts the entire team.",
  },
  {
    id: 3,
    name: "Monica Holm-Remmen",
    role: "Recruiter & Career Consultant",
    image: "/img/testimonials/monicaholmsremmen.jpeg",
    text: "Charles is collaborative, reliable, and never shies away from responsibility.",
  },
  {
    id: 4,
    name: "Samuel Okpe",
    role: "Software Engineer · Business Enthusiast",
    image: "/img/testimonials/samuelokpe.jpeg",
    text: "What I admire most about Charles is his resilience and curiosity.",
  },
  {
    id: 5,
    name: "Michael Ojemoron",
    role: "Cloud Architect · MERN · Python/Django · AI",
    image: "/img/testimonials/michaelojemoron.jpeg",
    text: "I've seen very few engineers who embrace learning as quickly and effectively as Charles.",
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface TestimonialsProps {
  // Passed from PAGE.TSX — true once the preloader has fully exited.
  // Without this gate, GSAP runs while the page is still opacity:0
  // and measures every trigger position against an invisible layout.
  ready?: boolean;
}

export default function Testimonials({ ready = false }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // ── GATE: do nothing until the preloader is gone ──────────────────────────
    // When ready=false the page is still opacity:0 inside motion.div.
    // GSAP would set autoAlpha:0 on every card, ScrollTrigger would bake in
    // wrong offsets, and cards would stay invisible forever.
    if (!ready) return;

    let ctx: gsap.Context;

    // ── Double-buffer: rAF + setTimeout ──────────────────────────────────────
    // rAF waits for the browser to paint the newly-visible page.
    // setTimeout(300) then waits for:
    //   • Framer Motion's 0.7s fade-in on motion.div to finish
    //   • Portfolio's ScrollTrigger pin to settle its scroll-height additions
    //   • Any web fonts / next/image shifts to complete
    // Without this, ScrollTrigger still measures a mid-transition layout.
    const raf = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        ctx = gsap.context(() => {
          const cards = gsap.utils.toArray<HTMLElement>(".trav-card");
          if (!cards.length) return;

          // Set invisible NOW (inside the delayed callback, not on mount)
          // so there's no flash of invisible content during the preloader phase
          gsap.set(cards, { autoAlpha: 0, x: 0, y: 0 });

          cards.forEach((card, index) => {
            // Matches Traversy: card 0,2,4 slide from left; 1,3 from right
            const fromX = index % 2 === 0 ? -150 : 150;

            gsap.fromTo(
              card,
              { autoAlpha: 0, x: fromX, y: 25 },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "top 35%",
                  toggleActions: "play none none reverse",
                  //                ↑ forward in  ↑ forward out (keep)
                  //                              ↑ back in (keep) ↑ back out = reverse
                  invalidateOnRefresh: true,
                },
              }
            );
          });

          // Refresh AFTER all triggers are registered + layout is stable.
          // This recalculates every trigger offset to account for the
          // Portfolio pin scroll-height and any post-paint layout shifts.
          ScrollTrigger.refresh();
        }, sectionRef);
      }, 300); // Must be >= PAGE.TSX motion.div transition duration (0.7s ≈ 700ms)
               // 300ms works because rAF adds one paint frame on top of it.
               // Increase to 500 if Portfolio's horizontal scroll is very long.

      return () => clearTimeout(timer);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [ready]); // Re-run when ready flips true

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonials-section relative z-10"
    >
      <header className="trav-header">
        <h1>
          <span>Client</span> Testimonials
        </h1>
        <p>Real feedback from people I&apos;ve had the privilege of working with.</p>
      </header>

      <div className="trav-container">
        {testimonials.map((t) => (
          <section key={t.id} className="trav-card">
            <Image
              src={t.image}
              alt={`${t.name} testimonial`}
              width={600}
              height={400}
              className="trav-card-image"
            />
            <div className="trav-card-body">
              <h3>{t.name}</h3>
              <p className="trav-card-role">{t.role}</p>
              <Quote className="trav-quote-icon" aria-hidden="true" />
              <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
              <a href="#contact" className="trav-btn">
                Get In Touch
              </a>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}