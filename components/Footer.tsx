"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Socials from "./Socials";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-6 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-3xl font-heading font-black text-primary tracking-tight inline-block mb-3"
            >
              CE<span className="text-muted-foreground/50">.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full Stack Engineer crafting scalable web applications, powerful
              APIs, and cloud-first solutions from Lagos, Nigeria.
            </p>
            <div className="mt-5">
              <Socials />
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-widest mb-4">
              Let&apos;s Connect
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Open to full-time roles, freelance projects, and collaborations.
              Reach out — let&apos;s build something great together.
            </p>
            <Link href="/#contact" className="btn text-sm inline-flex">
              Hire Me
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 border-t border-border relative flex flex-col sm:flex-row gap-2 items-center justify-center">
          <p className="text-sm text-muted-foreground text-center leading-relaxed flex items-center gap-2 flex-wrap">
            © {year}
            <span className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="Karoxia Logo"
                width={16}
                height={16}
                className="rounded-sm object-cover"
                priority
              />

              <span className="text-primary font-semibold tracking-wide">
                Karoxia
              </span>
            </span>
            <span className="text-muted-foreground/80">
              — Proudly built with Next.js, Tailwind CSS & Framer Motion.
            </span>
          </p>

          <motion.button
            onClick={scrollTop}
            aria-label="Back to top"
            className="absolute right-0 shrink-0 w-9 h-9 rounded-full border border-border bg-card/60 flex items-center justify-center hover:border-primary/50 hover:bg-accent transition-all duration-300"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
          >
            <ArrowUp className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
