"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Socials from "./Socials";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

/*
  ─── WHY INLINE STYLES ARE USED FOR WIDTH ────────────────────────────────────
  Same root cause as About.tsx and Contact.tsx:
  Edge on Windows uses a classic 17 px scrollbar (not an overlay). Every
  `overflow-x: hidden` ancestor subtracts that from `width: 100%`. With three
  nested wrappers (ThemeProvider → page outer → page inner), Tailwind's
  `container` class renders visibly narrower in Edge than in Chrome.

  Inline styles bypass the CSS cascade. Edge reads them directly from the
  element's style attribute and uses the viewport width — not the compounded
  ancestor content-box — as the reference for percentage calculations.
  ─────────────────────────────────────────────────────────────────────────────
*/

/** Full-width anchor applied to the footer element itself */
const fullWidth: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
};

/**
 * Replaces `container mx-auto px-4 sm:px-6 lg:px-8 py-6`.
 * maxWidth 1280 px = Tailwind xl container.
 * clamp() covers all breakpoints in one rule so Edge doesn't race to
 * resolve Tailwind responsive classes from the stylesheet on first paint.
 */
const innerContainer: React.CSSProperties = {
  width: "100%",
  maxWidth: "min(1440px, 100vw)",
  marginLeft: "auto",
  marginRight: "auto",
  boxSizing: "border-box",
  paddingLeft:  "clamp(1rem, 4vw, 2rem)",   /* px-4 → px-8 */
  paddingRight: "clamp(1rem, 4vw, 2rem)",
  paddingTop:    "1.5rem",
  paddingBottom: "1.5rem",
};

const navLinks = [
  { name: "Home",         href: "#home"         },
  { name: "About",        href: "#about"        },
  { name: "Services",     href: "#services"     },
  { name: "Portfolio",    href: "#portfolio"    },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact"      },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    /*
      FIX: footer gets an explicit fullWidth inline style so Edge never
      shrinks it inside the three nested overflow-x:hidden ancestors.
    */
    <footer className="relative mt-6 overflow-hidden" style={{
  width: "100%",
  maxWidth: "100vw",
  overflowX: "clip",
  boxSizing: "border-box",
}}>
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      {/*
        FIX: replaced `container mx-auto px-4 sm:px-6 lg:px-8 py-6` with
        an inline-style div. See comment block at the top of this file.
      */}
      <div style={innerContainer}>

        {/* ── Three-column grid ──────────────────────────────────────── */}
        {/*
          FIX: explicit width:100% on the grid so Edge anchors column widths
          against the innerContainer, not a compounded parent content-box.
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12"
          style={fullWidth}
        >

          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="text-3xl font-heading font-black text-primary
                         tracking-tight inline-block mb-3"
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

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="font-heading font-bold text-foreground text-sm
                           uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary
                               transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4
                                     transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — CTA */}
          <div>
            <h4 className="font-heading font-bold text-foreground text-sm
                           uppercase tracking-widest mb-4">
              Let&apos;s Connect
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Open to full-time roles, freelance projects, and collaborations.
              Reach out — let&apos;s build something great together.
            </p>
            <Link href="#contact" className="btn text-sm inline-flex">
              Hire Me
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        {/*
          FIX: `position:relative` and `width:100%` inline on the bottom bar
          so the absolutely-positioned back-to-top button is anchored to the
          correct container width in Edge.
        */}
        <div
          className="pt-4 border-t border-border flex flex-col sm:flex-row
gap-2 items-center justify-between w-full"
          style={{ position: "relative", width: "100%", boxSizing: "border-box" }}
        >
          <p className="text-sm text-muted-foreground text-center leading-relaxed
                        flex items-center gap-2 flex-wrap">
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
              — Proudly built with Next.js, Tailwind CSS &amp; Framer Motion.
            </span>
          </p>

          {/* Back-to-top button */}
          <motion.button
            onClick={scrollTop}
            aria-label="Back to top"
            className="shrink-0 w-9 h-9 rounded-full border
                       border-border bg-card/60 flex items-center justify-center
                       hover:border-primary/50 hover:bg-accent
                       transition-all duration-300"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
          >
            <ArrowUp className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </motion.button>
        </div>

      </div>{/* end innerContainer */}
    </footer>
  );
}