"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TestimonialsProps = {
  ready: boolean;
};

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

export default function Testimonials({ ready }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ready || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".trav-card");

      cards.forEach((card, index) => {
        const fromX = index % 2 === 0 ? -220 : 220;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromX,
            y: 60,
            scale: 0.96,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
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
        <p>
          Real feedback from people I&apos;ve had the privilege of working with.
        </p>
      </header>

      <div className="trav-container">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="trav-card">
            <Image
              src={testimonial.image}
              alt={`${testimonial.name} testimonial`}
              width={600}
              height={400}
              priority={testimonial.id === 1}
            />

            <div className="trav-card-body">
              <h3>{testimonial.name}</h3>
              <p className="trav-card-role">{testimonial.role}</p>

              <Quote className="trav-quote-icon" aria-hidden="true" />

              <blockquote>&ldquo;{testimonial.text}&rdquo;</blockquote>

              <a href="#contact" className="trav-btn">
                Get In Touch
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}