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

    cards.forEach((card, index) => {
      const fromX = index % 2 === 0 ? -180 : 180;

      gsap.set(card, {
        autoAlpha: 0,
        x: fromX,
        y: 70,
        scale: 0.96,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          end: "bottom 18%",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      })
      .to(card, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.35,
      })
      .to(card, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.35,
      })
      .to(card, {
        autoAlpha: 0,
        y: -70,
        scale: 0.96,
        ease: "power2.in",
        duration: 0.3,
      });
    });

    setTimeout(() => ScrollTrigger.refresh(), 300);
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
              <a href="#contact" className="btn mt-7 w-fit uppercase tracking-[0.07em]">Get In Touch</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}