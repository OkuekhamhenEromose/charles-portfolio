"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TestimonialsProps = { ready: boolean };

const testimonials = [
  {
    id: 1,
    name: "Bright Nwachukwu",
    role: "Product/Project Management · Software Engineering",
    image: "/images/testimonials/brightnwachukwu.jpeg",
    text: "Charles has an exceptional eye for detail. He approaches UI/UX challenges with creativity while ensuring performance and accessibility aren't compromised.",
  },
  {
    id: 2,
    name: "Enoch Olisa",
    role: "Software Quality Engineer · Test Automation",
    image: "/images/testimonials/enoch olisa.jpeg",
    text: "Charles is more than just a talented developer — he's a professional who uplifts the entire team.",
  },
  {
    id: 3,
    name: "Monica Holm-Remmen",
    role: "Recruiter & Career Consultant",
    image: "/images/testimonials/monicaholmsremmen.jpeg",
    text: "Charles is collaborative, reliable, and never shies away from responsibility.",
  },
  {
    id: 4,
    name: "Samuel Okpe",
    role: "Software Engineer · Business Enthusiast",
    image: "/images/testimonials/samuelokpe.jpeg",
    text: "What I admire most about Charles is his resilience and curiosity.",
  },
  {
    id: 5,
    name: "Michael Ojemoron",
    role: "Cloud Architect · MERN · Python/Django · AI",
    image: "/images/testimonials/michaelojemoron.jpeg",
    text: "I've seen very few engineers who embrace learning as quickly and effectively as Charles.",
  },
];

export default function Testimonials({ ready }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ready || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".trav-card");
      if (!cards.length) return;

      // ── Set every card invisible before first paint ──────────────────────
      // autoAlpha = opacity + visibility together (GSAP best practice).
      // We set ALL at once so there's no loop overhead before the browser paints.
      gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.97 });

      cards.forEach((card, index) => {
        // Alternate left/right entrance (even = from left, odd = from right)
        gsap.set(card, { x: index % 2 === 0 ? -80 : 80 });

        // ════════════════════════════════════════════════════════════════════
        // WHY toggleActions INSTEAD OF scrub:
        //
        // The old scrub-based 3-stage timeline (enter → hold → EXIT) had a
        // fatal flaw: its "exit" keyframe set autoAlpha: 0.  Whenever the
        // portfolio section called ScrollTrigger.refresh(), GSAP re-evaluated
        // every scrub timeline at the current scroll progress.  If the new
        // progress happened to land near or past the exit keyframe — which
        // easily happens after a layout shift caused by adding/removing the
        // portfolio pinSpacer — the card was permanently hidden.
        //
        // toggleActions: "play none none reverse" is immune to this because:
        //   • It fires a discrete animation (not progress-linked).
        //   • "play"    → triggers once when the element enters the viewport.
        //   • "reverse" → plays the tween backwards when element leaves.
        //   • No exit-fade — cards never disappear mid-scroll.
        //   • invalidateOnRefresh: true recalculates trigger positions after
        //     any layout change (portfolio pin add/remove) without re-running
        //     the animation from scratch.
        // ════════════════════════════════════════════════════════════════════
        gsap.to(card, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",   // card enters viewport at 88% down
            end:   "top 20%",   // card is fully in view by 20%
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      });

      // ── Double refresh strategy ──────────────────────────────────────────
      // First refresh: recalculate trigger positions now (portfolio pin may
      // already be live when this runs).
      ScrollTrigger.refresh();

      // Second refresh (next frame): after the browser has applied any
      // pending layout from the portfolio pin/pinSpacer addition, re-measure
      // everything.  This is the critical call that prevents the "invisible
      // cards" bug — the portfolio's pinSpacer expands document.scrollHeight
      // and shifts all subsequent elements down.  Without this second refresh,
      // the testimonial triggers' `start` values still point to pre-pin
      // coordinates.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

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
          <article key={t.id} className="trav-card">
            <Image
              src={t.image}
              alt={`${t.name} testimonial`}
              width={600}
              height={400}
              priority={t.id === 1}
            />
            <div className="trav-card-body">
              <h3>{t.name}</h3>
              <p className="trav-card-role">{t.role}</p>
              <Quote className="trav-quote-icon" aria-hidden="true" />
              <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
              <a href="#contact" className="btn mt-7 w-fit uppercase tracking-[0.07em]">
                Get In Touch
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}