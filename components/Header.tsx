"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import Socials from "./Socials";
import MobileNav from "./MobileNav";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  // const [isVisible, setIsVisible] = useState(true);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Scroll: hide on down, show on up ────────────────── */
 useEffect(() => {
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    setIsScrolled(y > 10);

    if (y > lastY) setSocialsOpen(false);
    lastY = y;
  };

  onScroll();
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
  className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
    isScrolled
      ? "border-b border-border/60 bg-card/70 py-3 shadow-[0_18px_60px_rgb(0_0_0/0.18)] backdrop-blur-2xl supports-backdrop-filter:bg-card/55"
      : "border-b border-transparent bg-transparent py-5"
  }`}
>
      <div
        className="mx-auto max-w-7xl px-8 sm:px-10 lg:px-12
                      flex items-center justify-between pointer-events-auto"
      >
        {/* ── Logo ─────────────────────────────────────── */}
        <Link
          href="/"
          className="text-4xl font-heading font-black text-primary tracking-tight
                     hover:opacity-80 transition-opacity z-10"
        >
          CE<span className="text-muted-foreground/50">.</span>
        </Link>

        {/* ── Nav pill (ONLY this element is frosted) ───── */}
        <nav
  className={`hidden md:flex items-center gap-0.5 px-5 py-2.5 rounded-full
              transition-all duration-300 border backdrop-blur-2xl ${
                isScrolled
                  ? "bg-card/70 backdrop-blur-2xl supports-backdrop-filter:bg-card/55"
                  : "bg-card/45 border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.16)]"
              }`}
>
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
              onClick={(e) => {
                e.stopPropagation();
                setSocialsOpen((v) => !v);
              }}
              aria-label="Social links"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`p-2 rounded-full border transition-all duration-300
                          ${
                            socialsOpen
                              ? "bg-accent border-primary/50 text-primary"
                              : "bg-card/60 backdrop-blur-md border-border/60 text-muted-foreground"
                          } hover:border-primary/40`}
            >
              <Share2
                className={`w-4 h-4 transition-transform duration-300
                                  ${socialsOpen ? "rotate-180" : ""}`}
              />
            </motion.button>

            <AnimatePresence>
              {socialsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3
                             bg-card/95 backdrop-blur-xl
                             border border-border rounded-2xl
                             shadow-2xl p-3 min-w-40 z-50"
                >
                  <p
                    className="text-[10px] font-semibold text-muted-foreground
                                 uppercase tracking-widest mb-2 text-center"
                  >
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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="p-2 rounded-full
                       bg-card/60 backdrop-blur-md border border-border/60
                       hover:border-primary/40 hover:bg-accent
                       transition-all duration-300"
          >
            <span suppressHydrationWarning>
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-foreground" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
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
