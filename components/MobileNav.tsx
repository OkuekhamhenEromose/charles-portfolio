// "use client";

// import { useState, useEffect, useRef } from "react";
// import { X, Menu, Sun, Moon } from "lucide-react";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Socials from "./Socials";

// const menuVariants: Variants = {
//   hidden: { x: "100%", opacity: 0 },
//   show: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       ease: [0.6, 0.01, -0.05, 0.9] as [number, number, number, number],
//       duration: 0.55,
//     },
//   },
//   exit: {
//     x: "100%",
//     opacity: 0,
//     transition: { ease: "easeIn" as const, duration: 0.35 },
//   },
// };

// const backdropVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { duration: 0.3 } },
//   exit: { opacity: 0, transition: { duration: 0.25 } },
// };

// const navItems = [
//   { name: "Home", href: "/#home" },
//   { name: "About", href: "/#about" },
//   { name: "Services", href: "/#services" },
//   { name: "Portfolio", href: "/#portfolio" },
//   { name: "Testimonials", href: "/#testimonials" },
//   { name: "Contact", href: "/#contact" },
// ];

// interface MobileNavProps {
//   theme: string;
//   toggleTheme: () => void;
// }

// export default function MobileNav({ theme, toggleTheme }: MobileNavProps) {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [menuPath, setMenuPath] = useState("");
//   const menuRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();

//   const isMenuOpen = openMenu && menuPath === pathname;

//   const handleOpenMenu = () => {
//     setMenuPath(pathname);
//     setOpenMenu(true);
//   };

//   const handleCloseMenu = () => {
//     setOpenMenu(false);
//   };

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMenuOpen]);

//   return (
//     <nav className="flex items-center gap-2">
//       <motion.button
//         onClick={toggleTheme}
//         aria-label="Toggle theme"
//         className="p-2 rounded-full bg-card/60 backdrop-blur-sm border border-border
//                    transition-all duration-300 hover:border-primary/40"
//         whileHover={{ scale: 1.08 }}
//         whileTap={{ scale: 0.93 }}
//       >
//         {theme === "light" ? (
//           <Moon className="w-4 h-4 text-foreground" />
//         ) : (
//           <Sun className="w-4 h-4 text-yellow-400" />
//         )}
//       </motion.button>

//       <motion.button
//         onClick={handleOpenMenu}
//         aria-label="Open menu"
//         className="p-2 rounded-xl hover:bg-accent transition-colors duration-200"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Menu className="w-6 h-6 text-foreground" />
//       </motion.button>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div
//               key="backdrop"
//               className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
//               variants={backdropVariants}
//               initial="hidden"
//               animate="show"
//               exit="exit"
//               onClick={handleCloseMenu}
//             />

//             <motion.div
//               key="panel"
//               ref={menuRef}
//               variants={menuVariants}
//               initial="hidden"
//               animate="show"
//               exit="exit"
//               className="fixed top-0 right-0 z-60 h-screen w-[80vw] max-w-[320px]
//                          bg-card border-l border-border shadow-2xl flex flex-col"
//             >
//               <div className="flex items-center justify-between px-6 py-5">
//                 <span className="text-lg font-heading font-bold text-primary">
//                   CE<span className="text-muted-foreground">.</span>
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <motion.button
//                     onClick={toggleTheme}
//                     aria-label="Toggle theme"
//                     className="p-2 rounded-full bg-muted border border-border hover:border-primary/40 transition-all"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     {theme === "light" ? (
//                       <Moon className="w-4 h-4 text-foreground" />
//                     ) : (
//                       <Sun className="w-4 h-4 text-yellow-400" />
//                     )}
//                   </motion.button>
//                   <motion.button
//                     onClick={handleCloseMenu}
//                     aria-label="Close menu"
//                     className="p-2 rounded-full bg-muted border border-border hover:border-primary/40 transition-all"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <X className="w-4 h-4 text-foreground" />
//                   </motion.button>
//                 </div>
//               </div>

//               <div className="h-px bg-border mx-6" />

//               <div className="flex-1 flex flex-col justify-center px-6">
//                 <ul className="space-y-1">
//                   {navItems.map((item, index) => (
//                     <motion.li
//                       key={item.name}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 + index * 0.07 }}
//                     >
//                       <Link
//                         href={item.href}
//                         onClick={handleCloseMenu}
//                         className="flex items-center gap-3 px-4 py-3 rounded-xl
//                                    text-lg font-heading font-semibold text-muted-foreground
//                                    hover:text-primary hover:bg-accent transition-all duration-200"
//                       >
//                         <span className="text-primary/40 text-sm font-mono">
//                           0{index + 1}
//                         </span>
//                         {item.name}
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="px-6 pb-8">
//                 <div className="h-px bg-border mb-6" />
//                 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center">
//                   Connect
//                 </p>
//                 <Socials className="flex justify-center" />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }


// "use client";

// import { useState, useEffect, useRef } from "react";
// import { X, Menu } from "lucide-react";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Socials from "./Socials";

// const menuVariants: Variants = {
//   hidden: { x: "100%", opacity: 0 },
//   show: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       ease: [0.6, 0.01, -0.05, 0.9] as [number, number, number, number],
//       duration: 0.55,
//     },
//   },
//   exit: {
//     x: "100%",
//     opacity: 0,
//     transition: { ease: "easeIn" as const, duration: 0.35 },
//   },
// };

// const backdropVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { duration: 0.3 } },
//   exit: { opacity: 0, transition: { duration: 0.25 } },
// };

// const navItems = [
//   { name: "Home", href: "/#home" },
//   { name: "About", href: "/#about" },
//   { name: "Services", href: "/#services" },
//   { name: "Portfolio", href: "/#portfolio" },
//   { name: "Testimonials", href: "/#testimonials" },
//   { name: "Contact", href: "/#contact" },
// ];

// export default function MobileNav() {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [menuPath, setMenuPath] = useState("");
//   const menuRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();

//   const isMenuOpen = openMenu && menuPath === pathname;

//   const handleOpenMenu = () => {
//     setMenuPath(pathname);
//     setOpenMenu(true);
//   };

//   const handleCloseMenu = () => {
//     setOpenMenu(false);
//   };

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMenuOpen]);

//   return (
//     <nav className="flex items-center gap-2">
//       <motion.button
//         onClick={handleOpenMenu}
//         aria-label="Open menu"
//         className="p-2 rounded-xl hover:bg-accent transition-colors duration-200"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Menu className="w-6 h-6 text-foreground" />
//       </motion.button>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             <motion.div
//               key="backdrop"
//               className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
//               variants={backdropVariants}
//               initial="hidden"
//               animate="show"
//               exit="exit"
//               onClick={handleCloseMenu}
//             />

//             <motion.div
//               key="panel"
//               ref={menuRef}
//               variants={menuVariants}
//               initial="hidden"
//               animate="show"
//               exit="exit"
//               className="fixed top-0 right-0 z-60 h-screen w-[80vw] max-w-[320px]
//                          bg-card border-l border-border shadow-2xl flex flex-col"
//             >
//               <div className="flex items-center justify-between px-6 py-5">
//                 <span className="text-lg font-heading font-bold text-primary">
//                   CE<span className="text-muted-foreground">.</span>
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <motion.button
//                     onClick={handleCloseMenu}
//                     aria-label="Close menu"
//                     className="p-2 rounded-full bg-muted border border-border hover:border-primary/40 transition-all"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <X className="w-4 h-4 text-foreground" />
//                   </motion.button>
//                 </div>
//               </div>

//               <div className="h-px bg-border mx-6" />

//               <div className="flex-1 flex flex-col justify-center px-6">
//                 <ul className="space-y-1">
//                   {navItems.map((item, index) => (
//                     <motion.li
//                       key={item.name}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 + index * 0.07 }}
//                     >
//                       <Link
//                         href={item.href}
//                         onClick={handleCloseMenu}
//                         className="flex items-center gap-3 px-4 py-3 rounded-xl
//                                    text-lg font-heading font-semibold text-muted-foreground
//                                    hover:text-primary hover:bg-accent transition-all duration-200"
//                       >
//                         <span className="text-primary/40 text-sm font-mono">
//                           0{index + 1}
//                         </span>
//                         {item.name}
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="px-6 pb-8">
//                 <div className="h-px bg-border mb-6" />
//                 <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center">
//                   Connect
//                 </p>
//                 <Socials className="flex justify-center" />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }



"use client";

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Socials from "./Socials";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: "Home",         href: "/#home",         num: "01" },
  { name: "About",        href: "/#about",        num: "02" },
  { name: "Services",     href: "/#services",     num: "03" },
  { name: "Portfolio",    href: "/#portfolio",    num: "04" },
  { name: "Testimonials", href: "/#testimonials", num: "05" },
  { name: "Contact",      href: "/#contact",      num: "06" },
];

// ── Panel: clip-path wipe from right → left (Dennis style) ─────────────────
const panelVariants: Variants = {
  hidden: {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    transition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] },
  },
  show: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.28 } },
  show:   { opacity: 1, transition: { duration: 0.3  } },
};

// ── Individual nav-item reveal (stagger handled by Framer delay) ────────────
const itemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  show:   (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.18 + i * 0.065, duration: 0.42, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function MobileNav() {
  const [isActive, setIsActive] = useState(false);
  const pathname  = usePathname();

  const wrapperRef  = useRef<HTMLDivElement>(null);   // scale container
  const buttonRef   = useRef<HTMLButtonElement>(null); // magnetic target
  const circleRef   = useRef<HTMLSpanElement>(null);   // bubble fill
  const tlFill      = useRef<gsap.core.Timeline | null>(null);

  // ── Close on route change ─────────────────────────────────────────────────
  useEffect(() => {
  const frame = requestAnimationFrame(() => {
    setIsActive(false);
  });

  return () => cancelAnimationFrame(frame);
}, [pathname]);

  // ── Listen for the top-bar hint button (visible before scroll) ────────────
  useEffect(() => {
    const onToggle = () => setIsActive((v) => !v);
    window.addEventListener("mobilenav:toggle", onToggle);
    return () => window.removeEventListener("mobilenav:toggle", onToggle);
  }, []);

  // ── Body scroll-lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isActive]);

  // ── GSAP: scroll-trigger (scale 0 → 1 after hero) ────────────────────────
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.set(el, { scale: 0 });

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start:   0,
      end:     window.innerHeight * 0.6,
      onLeave: () =>
        gsap.to(el, { scale: 1, duration: 0.28, ease: "back.out(1.8)" }),
      onEnterBack: () => {
        gsap.to(el, { scale: 0, duration: 0.22, ease: "power1.in" });
        setIsActive(false);
      },
    });

    return () => { trigger.kill(); };
  }, []);

  // ── GSAP: magnetic hover on the button ───────────────────────────────────
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1,   ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1,   ease: "elastic.out(1, 0.3)" });

    const onMove = (e: MouseEvent) => {
      const { clientX, clientY }     = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      xTo((clientX - (left + width  / 2)) * 0.38);
      yTo((clientY - (top  + height / 2)) * 0.38);
    };
    const onLeave = () => { xTo(0); yTo(0); };

    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── GSAP: bubble fill timeline (hover in / out) ───────────────────────────
  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    tlFill.current = gsap
      .timeline({ paused: true })
      .to(circle, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in"  }, "enter")
      .to(circle, { top: "-150%", width: "125%", duration: 0.25 },                    "exit");

    return () => { tlFill.current?.kill(); };
  }, []);

  const handleMouseEnter = useCallback(() => {
    tlFill.current?.tweenFromTo("enter", "exit");
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => { tlFill.current?.play(); }, 300);
  }, []);

  return (
    <>
      {/* ── Floating circular burger button (fixed, bottom-right) ── */}
      <div
        ref={wrapperRef}
        className="fixed bottom-7 right-6 z-70"
        style={{ willChange: "transform" }}
      >
        <button
          ref={buttonRef}
          onClick={() => setIsActive((v) => !v)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={isActive ? "Close menu" : "Open menu"}
          aria-expanded={isActive}
          className="group relative w-17 h-17 cursor-pointer rounded-full
                     bg-card border border-border
                     shadow-[0_8px_40px_rgb(0_0_0/0.35)]
                     flex items-center justify-center overflow-hidden
                     hover:shadow-[0_0_50px_rgb(var(--primary)/0.35)]
                     transition-shadow duration-300"
        >
          {/* Bubble fill (primary colour wipes up on hover) */}
          <span
            ref={circleRef}
            className="absolute w-full h-[150%] rounded-[50%] top-full
                       bg-primary pointer-events-none"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          />

          {/* Burger / X lines */}
          <span className="relative z-10 w-9 h-9 flex flex-col items-center justify-center gap-0 group-hover:text-primary-foreground">
            <span
              className={`block h-[1.5px] bg-foreground rounded-full origin-center
                          transition-all duration-350 ease-[cubic-bezier(0.76,0,0.24,1)]
                          ${isActive
                            ? "w-9 rotate-45 translate-y-[0.75px] bg-primary"
                            : "w-9 -translate-y-1.25"
                          }`}
            />
            <span
              className={`block h-[1.5px] bg-foreground rounded-full origin-center
                          transition-all duration-350 ease-[cubic-bezier(0.76,0,0.24,1)]
                          ${isActive
                            ? "w-9 -rotate-45 -translate-y-[0.75px] bg-primary"
                            : "w-6.5 translate-y-1.25"
                          }`}
            />
          </span>
        </button>
      </div>

      {/* ── Overlay + slide-in panel ──────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            {/* Frosted backdrop */}
            <motion.div
              key="mob-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="fixed inset-0 z-60 bg-background/55 backdrop-blur-[6px]"
              onClick={() => setIsActive(false)}
            />

            {/* Side panel */}
            <motion.aside
              key="mob-panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="fixed top-0 right-0 z-65 h-dvh w-[88vw] max-w-95
                         bg-card border-l border-border
                         shadow-[-24px_0_80px_rgb(0_0_0/0.28)]
                         flex flex-col"
            >
              {/* ── Panel header ── */}
              <div className="flex items-center justify-between px-8 pt-9 pb-7">
  <Link
    href="/"
    onClick={() => setIsActive(false)}
    className="font-heading font-black text-2xl text-primary tracking-tight"
  >
    CE<span className="text-muted-foreground/40">.</span>
  </Link>

  <button
    onClick={() => setIsActive(false)}
    aria-label="Close menu"
    className="group relative w-10 h-10 rounded-full
                              flex items-center justify-center overflow-hidden
               cursor-pointer shadow-[0_8px_35px_rgb(0_0_0/0.25)]"
  >
    <span className="absolute w-full h-[150%] rounded-[50%] top-full left-1/2 -translate-x-1/2 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:top-[-25%] group-hover:w-[150%]" />

    <span className="relative z-10 w-8 h-8 flex items-center justify-center">
      <span className="absolute block h-px w-8 rotate-45 bg-white transition-transform duration-300" />
      <span className="absolute block h-px w-8 -rotate-45 bg-white transition-transform duration-300" />
    </span>
  </button>
</div>

              {/* Thin divider */}
              <div className="h-px mx-8 bg-border" />

              {/* ── Nav links ── */}
              <nav className="flex-1 flex flex-col justify-center px-8 py-6">
                <ul className="space-y-0">
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
                        onClick={() => setIsActive(false)}
                        className="group relative flex items-center justify-between
                                   py-4 w-full"
                      >

                        <span
                          className="font-heading font-black text-[2rem] leading-none tracking-tight
                                     text-foreground group-hover:text-primary
                                     transition-colors duration-300"
                        >
                          {item.name}
                        </span>

                        <span className="font-mono text-[11px] text-muted-foreground
           translate-x-0 group-hover:translate-x-1
           group-hover:text-primary
           transition-[color,transform] duration-300">
                          {item.num}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* ── Panel footer: socials ── */}
              <div className="px-8 pb-10">
                <div className="h-px bg-border mb-6" />
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