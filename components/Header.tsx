"use client";

/**
 * Header — Charles's pill-nav pattern, rebuilt with new teal palette.
 *
 * KEY DESIGN DECISIONS (matching Charles's header.tsx):
 *   - Logo sits left, isolated
 *   - Nav links wrapped in their own frosted-glass pill (backdrop-blur ONLY on the pill)
 *   - Socials + theme toggle sit right of the pill
 *   - Header itself is transparent — NO background on the outer header
 *   - Pill darkens slightly on scroll (scrolled state)
 *   - Header slides up/hides on scroll-down, reveals on scroll-up
 *   - suppressHydrationWarning on theme-toggle button/span to silence hydration mismatch
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import Socials from "./Socials";
import MobileNav from "./MobileNav";

const navItems = [
  { name: "Home",         href: "/#home"         },
  { name: "About",        href: "/#about"        },
  { name: "Services",     href: "/#services"     },
  { name: "Portfolio",    href: "/#portfolio"    },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact",      href: "/#contact"      },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isVisible,    setIsVisible]    = useState(true);
  const [scrolled,     setScrolled]     = useState(false);
  const [socialsOpen,  setSocialsOpen]  = useState(false);

  /* ── Scroll: hide on down, show on up ────────────────── */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setIsVisible(y < lastY || y < 80);
      if (y > lastY) setSocialsOpen(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close socials dropdown on outside click ─────────── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest(".socials-container"))
        setSocialsOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    /*
     * Outer header: transparent background, no blur.
     * Only the nav pill gets the frosted glass treatment.
     */
    <header
      className={`fixed top-0 left-0 right-0 z-30 pointer-events-none
                  transition-all duration-500
                  ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5
                      flex items-center justify-between pointer-events-auto">

        {/* ── Logo ─────────────────────────────────────── */}
        <Link
          href="/"
          className="text-xl font-heading font-black text-primary tracking-tight
                     hover:opacity-80 transition-opacity z-10"
        >
          CE<span className="text-muted-foreground/50">.</span>
        </Link>

        {/* ── Nav pill (ONLY this element is frosted) ───── */}
        <nav className={`hidden md:flex items-center gap-0.5
                          px-5 py-2.5 rounded-full
                          transition-all duration-300
                          ${scrolled
                            ? "bg-card/90 backdrop-blur-2xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                            : "bg-card/60 backdrop-blur-xl border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                          }`}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link px-3 py-1.5 text-sm font-medium rounded-full
                         hover:bg-accent/70 transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* ── Right controls ──────────────────────────── */}
        <div className="hidden md:flex items-center gap-2">

          {/* Socials toggle — visible md → xl */}
          <div className="xl:hidden socials-container relative">
            <motion.button
              onClick={(e) => { e.stopPropagation(); setSocialsOpen((v) => !v); }}
              aria-label="Social links"
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              className={`p-2 rounded-full border transition-all duration-300
                          ${socialsOpen
                            ? "bg-accent border-primary/50 text-primary"
                            : "bg-card/60 backdrop-blur-md border-border/60 text-muted-foreground"
                          } hover:border-primary/40`}
            >
              <Share2 className={`w-4 h-4 transition-transform duration-300
                                  ${socialsOpen ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
              {socialsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0,  scale: 1   }}
                  exit={{    opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3
                             bg-card/95 backdrop-blur-xl
                             border border-border rounded-2xl
                             shadow-2xl p-3 min-w-[160px] z-50"
                >
                  <p className="text-[10px] font-semibold text-muted-foreground
                                 uppercase tracking-widest mb-2 text-center">
                    Connect
                  </p>
                  <Socials isVertical />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Socials row — visible xl+ */}
          <Socials className="hidden xl:flex" />

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            suppressHydrationWarning
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
            className="p-2 rounded-full
                       bg-card/60 backdrop-blur-md border border-border/60
                       hover:border-primary/40 hover:bg-accent
                       transition-all duration-300"
          >
            <span suppressHydrationWarning>
              {theme === "light"
                ? <Moon className="w-4 h-4 text-foreground" />
                : <Sun  className="w-4 h-4 text-yellow-400" />
              }
            </span>
          </motion.button>
        </div>

        {/* ── Mobile nav ──────────────────────────────── */}
        <div className="md:hidden">
          <MobileNav theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
}