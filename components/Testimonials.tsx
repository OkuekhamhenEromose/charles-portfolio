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

      // ══════════F════════════════════════════════════════════════════════════
      // THREE BUGS THIS SOLVES:
      //
      // BUG 1 — Animation only fires once:
      //   The old `fromTo` + `toggleActions: "play none none reverse"` used a
      //   SINGLE trigger. "play" fires only when crossing the start going
      //   forward (scroll down). If you scroll back up past the start and then
      //   scroll down again, the trigger is already "played" → no re-animation.
      //   Fix: use `onEnter` + `onEnterBack` callbacks so the animation fires
      //   from BOTH directions every time the card enters the viewport.
      //
      // BUG 2 — Category click while testimonials visible breaks animation:
      //   Portfolio's `ScrollTrigger.refresh()` recalculates trigger positions.
      //   Cards already inside their trigger zone have state = "active", so
      //   `onEnter` won't re-fire after a refresh — cards stay invisible.
      //   Fix: Portfolio dispatches `portfolio:filter-changed`. Testimonials
      //   listens, kills all its triggers, resets card states, recreates
      //   triggers fresh. New triggers fire `onEnter` based on current position.
      //
      // BUG 3 — Slide-back fires too late when scrolling up:
      //   A single trigger with `start: "top 88%"` fires its reverse when the
      //   card's TOP edge scrolls back above 88% viewport (near bottom of
      //   screen). The card is almost fully off the bottom before reversing.
      //   Fix: separate TRIGGER B with `start: "center top"` fires `onLeaveBack`
      //   when the card's CENTRE hits the viewport top — exactly when 50% of
      //   the card has scrolled above the fold.
      // ══════════════════════════════════════════════════════════════════════

      // Helpers — defined once, referenced in both setup and event handler
      const fromX = (i: number) => (i % 2 === 0 ? -160 : 160);

      const animIn = (card: HTMLElement) =>
        gsap.to(card, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });

      const animOut = (card: HTMLElement, i: number) =>
        gsap.to(card, {
          autoAlpha: 0,
          x: fromX(i),
          y: 55,
          scale: 0.96,
          duration: 0.55,
          ease: "power2.in",
          overwrite: true,
        });

      // Set every card to its hidden off-screen state before first paint
      cards.forEach((card, i) => {
        gsap.set(card, { autoAlpha: 0, x: fromX(i), y: 55, scale: 0.96 });
      });

      // ── Create both triggers for one card ─────────────────────────────
      const setupCard = (card: HTMLElement, i: number) => {
        // TRIGGER A — ENTRY
        // `onEnter`     → scroll DOWN: card enters from below at 88% viewport
        // `onEnterBack` → scroll DOWN again after having exited the top:
        //                 card re-enters from above, slides back in
        ScrollTrigger.create({
          id: `trav-in-${i}`,
          trigger: card,
          start: "top 88%",
          onEnter:     () => animIn(card),
          onEnterBack: () => animIn(card),
          invalidateOnRefresh: true,
        });

        // TRIGGER B — EARLY EXIT (scroll-up)
        // `start: "center top"` = card's vertical centre is at viewport top.
        // At this point exactly 50% of the card has scrolled above the fold.
        // `onLeaveBack` fires when scrolling UP past this point →
        // card slides back off to its left/right off-screen position
        // immediately when "almost half" of it has left the viewport.
        ScrollTrigger.create({
          id: `trav-out-${i}`,
          trigger: card,
          start: "center top",
          onLeaveBack: () => animOut(card, i),
          invalidateOnRefresh: true,
        });
      };

      cards.forEach((card, i) => setupCard(card, i));

      // ── Initial double-refresh ─────────────────────────────────────────
      // Pass 1: recalculate positions now (portfolio pin may already be live)
      ScrollTrigger.refresh();
      // Pass 2 (next frame): browser commits pinSpacer layout — all
      // downstream trigger positions are now based on correct coordinates
      requestAnimationFrame(() => ScrollTrigger.refresh());

      // ── FIX 2: re-trigger when Portfolio filter changes ────────────────
      // Portfolio dispatches this event after its secondary refresh, once
      // the pinSpacer layout is fully committed.  We kill every trigger,
      // reset all cards, and recreate triggers fresh so `onEnter` fires
      // correctly for cards already visible in the viewport.
      const handleFilterChange = () => {
        // Kill all existing card triggers
        cards.forEach((_, i) => {
          ScrollTrigger.getById(`trav-in-${i}`)?.kill();
          ScrollTrigger.getById(`trav-out-${i}`)?.kill();
        });

        // Reset every card to off-screen hidden state
        cards.forEach((card, i) => {
          gsap.set(card, { autoAlpha: 0, x: fromX(i), y: 55, scale: 0.96 });
        });

        // One frame later: refresh layout, recreate triggers
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          cards.forEach((card, i) => setupCard(card, i));
          // Second refresh after recreation to settle any remaining shifts
          requestAnimationFrame(() => ScrollTrigger.refresh());
        });
      };

      // window.addEventListener("portfolio:filter-changed", handleFilterChange);

      // Returned from gsap.context callback — cleans up the listener
      // return () => {
      //   window.removeEventListener("portfolio:filter-changed", handleFilterChange);
      // };
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
              <a
                href="#contact"
                className="btn mt-7 w-fit uppercase tracking-[0.07em]"
              >
                Get In Touch
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}