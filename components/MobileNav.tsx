"use client";

import { useState, useEffect, useRef } from "react";
import { X, Menu, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Socials from "./Socials";

const menuVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { ease: [0.6, 0.01, -0.05, 0.9], duration: 0.55 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { ease: "easeIn", duration: 0.35 },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

interface MobileNavProps {
  theme: string;
  toggleTheme: () => void;
}

export default function MobileNav({ theme, toggleTheme }: MobileNavProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openMenu]);

  // Close menu on route change
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <nav className="flex items-center gap-2">
      {/* Theme toggle */}
      <motion.button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="p-2 rounded-full bg-card/60 backdrop-blur-sm border border-border
                   transition-all duration-300 hover:border-primary/40"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
      >
        {theme === "light" ? (
          <Moon className="w-4 h-4 text-foreground" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-400" />
        )}
      </motion.button>

      {/* Hamburger */}
      <motion.button
        onClick={() => setOpenMenu(true)}
        aria-label="Open menu"
        className="p-2 rounded-xl hover:bg-accent transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="w-6 h-6 text-foreground" />
      </motion.button>

      {/* Backdrop + slide-in panel */}
      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => setOpenMenu(false)}
            />

            <motion.div
              key="panel"
              ref={menuRef}
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 right-0 z-[60] h-screen w-[80vw] max-w-[320px]
                         bg-card border-l border-border shadow-2xl
                         flex flex-col"
            >
              {/* Close + theme button row */}
              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-lg font-heading font-bold text-primary">
                  CE<span className="text-muted-foreground">.</span>
                </span>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="p-2 rounded-full bg-muted border border-border hover:border-primary/40 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {theme === "light" ? (
                      <Moon className="w-4 h-4 text-foreground" />
                    ) : (
                      <Sun className="w-4 h-4 text-yellow-400" />
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => setOpenMenu(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-full bg-muted border border-border hover:border-primary/40 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </motion.button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mx-6" />

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center px-6">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpenMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl
                                   text-lg font-heading font-semibold text-muted-foreground
                                   hover:text-primary hover:bg-accent transition-all duration-200"
                      >
                        <span className="text-primary/40 text-sm font-mono">
                          0{index + 1}
                        </span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Socials footer */}
              <div className="px-6 pb-8">
                <div className="h-px bg-border mb-6" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center">
                  Connect
                </p>
                <Socials className="flex justify-center" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}