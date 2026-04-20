"use client";

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
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled]   = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);

  /* ── Scroll hide/show ── */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setIsVisible(y < lastY || y < 80);
      if (y > lastY) setSocialsOpen(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close socials on outside click ── */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest(".socials-container")) {
        setSocialsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500
                  ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className={`flex items-center justify-between h-14 rounded-2xl px-5
                         transition-all duration-300
                         ${scrolled
                           ? "bg-card/80 backdrop-blur-xl border border-border shadow-lg"
                           : "bg-card/40 backdrop-blur-md border border-border/50"
                         }`}>

          {/* Logo */}
          <Link href="/"
                className="text-xl font-heading font-black text-primary tracking-tight hover:opacity-80 transition-opacity">
            CE<span className="text-muted-foreground/60">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.name} href={item.href}
                 className="nav-link px-3 py-1.5 text-sm font-medium rounded-lg
                            hover:bg-accent/60 transition-all duration-200">
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Social toggle md-xl */}
            <div className="xl:hidden socials-container relative">
              <motion.button
                onClick={(e) => { e.stopPropagation(); setSocialsOpen((v) => !v); }}
                aria-label="Social links"
                className={`p-2 rounded-full border transition-all duration-300
                            hover:border-primary/40
                            ${socialsOpen ? "bg-accent border-primary/40 text-primary" : "bg-muted/50 border-border text-muted-foreground"}`}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                <Share2 className={`w-4 h-4 transition-transform duration-300 ${socialsOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {socialsOpen && (
                  <motion.div
                    initial={{ opacity:0, y:-8, scale:0.95 }}
                    animate={{ opacity:1, y:0,  scale:1   }}
                    exit={{    opacity:0, y:-8, scale:0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 bg-card border border-border
                               rounded-2xl shadow-xl p-3 min-w-[160px] z-50"
                  >
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 text-center">
                      Connect
                    </p>
                    <Socials isVertical />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social icons xl+ */}
            <Socials className="hidden xl:flex" />

            {/*
             * FIX — suppressHydrationWarning on the button AND the icon spans.
             *
             * WHY NEEDED: ThemeProvider initialises to "dark" on the server.
             * The client may read "light" from localStorage after hydration.
             * React compares the server HTML (Moon icon) with client (Sun icon)
             * and throws a hydration mismatch. suppressHydrationWarning tells
             * React to accept the difference silently on this specific element.
             */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              suppressHydrationWarning          /* ← fixes hydration mismatch */
              className="p-2 rounded-full bg-muted/50 border border-border
                         hover:border-primary/40 hover:bg-accent transition-all duration-300"
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
            >
              {/* suppressHydrationWarning on each span so React ignores the
                  server/client className difference for these icons */}
              <span suppressHydrationWarning>
                {theme === "light"
                  ? <Moon className="w-4 h-4 text-foreground" />
                  : <Sun  className="w-4 h-4 text-yellow-400" />
                }
              </span>
            </motion.button>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden">
            <MobileNav theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}