"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import Socials from "./Socials";

const navItems = [
  { name: "Home", href: "/#home", num: "01" },
  { name: "About", href: "/#about", num: "02" },
  { name: "Services", href: "/#services", num: "03" },
  { name: "Portfolio", href: "/#portfolio", num: "04" },
  { name: "Testimonials", href: "/#testimonials", num: "05" },
  { name: "Contact", href: "/#contact", num: "06" },
];

const panelVariants: Variants = {
  hidden: {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
  },
  show: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.16 + i * 0.06,
      duration: 0.42,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export default function MobileNav() {
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsActive(false);

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  return (
    <>
      <div className="fixed right-6 top-6 z-90 md:hidden">
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={() => setIsActive((prev) => !prev)}
          aria-label={isActive ? "Close menu" : "Open menu"}
          aria-expanded={isActive}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="group relative flex h-17 w-17 items-center cursor-pointer justify-center overflow-hidden rounded-full
                     border border-border bg-card shadow-[0_8px_40px_rgb(0_0_0/0.35)]
                     transition-shadow duration-300"
        >
          <span className="absolute left-1/2 top-full h-[150%] w-full -translate-x-1/2 rounded-[50%] bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:top-[-25%] group-hover:w-[150%]" />

          <span className="relative z-10 flex h-9 w-9 flex-col items-center justify-center">
            <span
              className={`block h-[1.5px] rounded-full bg-foreground transition-all duration-300 group-hover:bg-primary-foreground ${
                isActive
                  ? "w-9 translate-y-[0.75px] rotate-45"
                  : "w-9 -translate-y-1.25"
              }`}
            />

            <span
              className={`block h-[1.5px] rounded-full bg-foreground transition-all duration-300 group-hover:bg-primary-foreground ${
                isActive
                  ? "w-9 -translate-y-[0.75px] -rotate-45"
                  : "w-6 translate-y-1.25"
              }`}
            />
          </span>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-70 bg-background/60 md:hidden"
              onClick={closeMenu}
            />

            <motion.aside
              key="mobile-panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="fixed right-0 top-0 z-80 flex h-dvh w-[88vw] max-w-95 flex-col
                         border-l border-border bg-card shadow-[-24px_0_80px_rgb(0_0_0/0.28)] md:hidden"
            >
              <div className="flex items-center justify-between px-8 pb-7 pt-9">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="font-heading text-2xl font-black tracking-tight text-primary"
                >
                  CE<span className="text-muted-foreground/40">.</span>
                </Link>
              </div>

              <div className="mx-8 h-px bg-border" />

              <nav className="flex flex-1 flex-col justify-center px-8 py-6">
                <ul>
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.name}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      className="overflow-hidden"
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group flex w-full items-center justify-between py-4"
                      >
                        <span className="font-heading text-[1.2rem] font-black leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                          {item.name}
                        </span>

                        <span className="font-mono text-[11px] mr-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                          {item.num}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="px-8 pb-10">
                <div className="mb-6 h-px bg-border" />
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                    Connect
                  </p>
                  <Socials className="flex gap-3" />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}