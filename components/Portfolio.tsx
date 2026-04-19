// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";
// import Image from "next/image";
// import { ExternalLink } from "lucide-react";
// import { FaGithub } from "react-icons/fa"; // FIX #4 — Github removed from lucide-react v1.x

// const portfolioProjects = [
//   {
//     id: 1,
//     title: "Shopa — E-Commerce Marketplace",
//     description:
//       "A scalable multi-vendor marketplace built with Next.js and Django, featuring secure Paystack payments and Redis-powered performance.",
//     category: "Full-Stack",
//     image: "/img/portfolio/shopa.png",
//     demoLink: "https://retsyapp.vercel.app/",
//     githubLink: "https://github.com/OkuekhamhenEromose/retsyapp",
//   },
//   {
//     id: 2,
//     title: "Trellify — Trello Clone",
//     description:
//       "Real-time collaborative Kanban app with the MERN stack, Socket.io live updates, and advanced JWT + OTP authentication.",
//     category: "Full-Stack",
//     image: "/img/portfolio/trellify.png",
//     demoLink: "https://trello-next-blush.vercel.app/",
//     githubLink: "https://github.com/OkuekhamhenEromose/trello-next",
//   },
//   {
//     id: 3,
//     title: "EthaHospital App",
//     description:
//       "A frontend clone of a hospital website built with TypeScript, Tailwind CSS, and Framer Motion.",
//     category: "Frontend",
//     image: "/img/portfolio/ethahospital.png",
//     demoLink: "https://ettahospitalclone.vercel.app/",
//     githubLink: "https://github.com/OkuekhamhenEromose/hospitaltypescriptreact",
//   },
//   {
//     id: 4,
//     title: "CH-Travels",
//     description:
//       "A modern travel agency website built with React and Framer Motion with smooth animations and engaging UI transitions.",
//     category: "Frontend",
//     image: "/img/portfolio/chtravels.png",
//     demoLink: "https://shiny-scone-6fc98c.netlify.app",
//     githubLink: "https://github.com/OkuekhamhenEromose/chardevtravel",
//   },
//   {
//     id: 5,
//     title: "CHBlog App",
//     description:
//       "Full-stack blogging platform with role-based authentication, protected routes, and CRUD operations.",
//     category: "Full-Stack",
//     image: "/img/portfolio/chblog.png",
//     demoLink: "https://multiblogapp.netlify.app/blog",
//     githubLink: "https://github.com/ehihameneromosele/fullblogc",
//   },
//   {
//     id: 6,
//     title: "Listings API (Backend)",
//     description:
//       "A backend-driven property listings API built with Django and Django REST Framework.",
//     category: "Backend",
//     image: "/img/portfolio/insomnia1.png",
//     demoLink: "https://housing-properties.onrender.com",
//     githubLink: "https://github.com/OkuekhamhenEromose/housing_properties",
//   },
//   {
//     id: 7,
//     title: "Real Estate Website",
//     description:
//       "A responsive real estate frontend for showcasing properties for sale and rent.",
//     category: "Frontend",
//     image: "/img/portfolio/realestate-img.png",
//     demoLink: "https://dancing-youtiao-914380.netlify.app",
//     githubLink: "https://github.com/OkuekhamhenEromose/RealEstateModern",
//   },
//   {
//     id: 8,
//     title: "Resume Builder",
//     description:
//       "A Django REST Framework–powered resume builder that generates structured, professional resumes.",
//     category: "Backend",
//     image: "/img/portfolio/resumebuilder.png",
//     demoLink: "https://renewschool-1.onrender.com",
//     githubLink: "https://github.com/OkuekhamhenEromose/myresume",
//   },
//   {
//     id: 9,
//     title: "Hospital Management",
//     description:
//       "Production-ready hospital management system with Google OAuth and full admin dashboard.",
//     category: "Full-Stack",
//     image: "/img/portfolio/ethahospital.png",
//     demoLink: "https://dhospitalback.onrender.com/api/",
//     githubLink: "https://github.com/OkuekhamhenEromose/dhospitalback",
//   },
//   {
//     id: 10,
//     title: "Original Portfolio",
//     description:
//       "A personal portfolio website built with HTML, CSS, and vanilla JavaScript.",
//     category: "Frontend",
//     image: "/img/portfolio/portfolio.png",
//     demoLink: "https://timely-axolotl-0f4be3.netlify.app/",
//     githubLink: "https://github.com/OkuekhamhenEromose/portfolio-original",
//   },
//   {
//     id: 11,
//     title: "Advanced Portfolio",
//     description:
//       "Next-generation portfolio built with Next.js and Framer Motion with full SEO optimization.",
//     category: "Frontend",
//     image: "/img/portfolio/nextportfolio.png",
//     demoLink: "https://charleseromose.netlify.app",
//     githubLink: "https://github.com/OkuekhamhenEromose/nextportfoliooriginal",
//   },
// ];

// const categories = [
//   { id: "all", name: "All", count: 11 },
//   { id: "Full-Stack", name: "Full-Stack", count: 4 },
//   { id: "Frontend", name: "Frontend", count: 5 },
//   { id: "Backend", name: "Backend", count: 2 },
// ];

// const categoryColors: Record<string, string> = {
//   "Full-Stack": "from-violet-500/80 to-indigo-500/80",
//   Frontend: "from-cyan-500/80 to-blue-500/80",
//   Backend: "from-emerald-500/80 to-teal-500/80",
// };

// export default function Portfolio() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 1024);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const filteredProjects =
//     activeCategory === "all"
//       ? portfolioProjects
//       : portfolioProjects.filter((p) => p.category === activeCategory);

//   const buildScroll = useCallback(async () => {
//     const { default: gsap } = await import("gsap");
//     const { ScrollTrigger } = await import("gsap/ScrollTrigger");
//     gsap.registerPlugin(ScrollTrigger);

//     ScrollTrigger.getAll()
//       .filter((st) => st.vars?.id === "portfolio-h")
//       .forEach((st) => st.kill());

//     const section = sectionRef.current;
//     const slider = sliderRef.current;
//     if (!section || !slider) return;

//     await new Promise<void>((r) => requestAnimationFrame(() => r()));

//     const scrollAmt = isMobile
//       ? slider.scrollWidth - window.innerWidth + 40
//       : slider.scrollWidth - window.innerWidth * 0.6;

//     if (scrollAmt <= 0) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         id: "portfolio-h",
//         trigger: section,
//         start: "top top",
//         end: `+=${scrollAmt + 800}`,
//         scrub: 1.2,
//         pin: true,
//         anticipatePin: 1,
//       },
//     });
//     tl.to(slider, { x: -scrollAmt, ease: "none" });
//   }, [isMobile]);

//   useEffect(() => {
//     const t = setTimeout(() => buildScroll(), 120);
//     return () => {
//       clearTimeout(t);
//       import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
//         ScrollTrigger.getAll()
//           .filter((st) => st.vars?.id === "portfolio-h")
//           .forEach((st) => st.kill());
//       });
//     };
//   }, [activeCategory, filteredProjects.length, buildScroll]);

//   return (
//     <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
//       <div className="flex flex-col lg:flex-row h-full min-h-screen">
//         {/* ── Left panel ── */}
//         <div className="w-full lg:w-[35%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10 lg:py-0 relative z-10">
//           <span className="section-tag mb-5 self-start">My Work</span>

//           <h2 className="font-heading font-black tracking-tight leading-none mb-6">
//             <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary">My</span>
//             <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary/40 italic">creative</span>
//             <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary">projects</span>
//           </h2>

//           <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-sm">
//             A curated collection spanning full-stack apps, frontends, and backend APIs — each
//             reflecting clean code, scalable architecture, and thoughtful design.
//           </p>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`px-4 py-2 text-xs font-bold rounded-full border transition-all duration-300
//                             ${activeCategory === cat.id
//                               ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_rgb(var(--primary)/0.3)]"
//                               : "bg-card/60 text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
//                             }`}
//               >
//                 {cat.name}
//                 <span className="ml-1.5 opacity-50">({cat.count})</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── Horizontal slide ── */}
//         <div className="w-full lg:w-[65%] flex items-center relative overflow-hidden">
//           <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />

//           <div
//             ref={sliderRef}
//             className="flex items-center gap-6 py-12 px-4 lg:px-8 flex-nowrap will-change-transform"
//           >
//             {filteredProjects.map((project, index) => (
//               <article
//                 key={project.id}
//                 className="group relative overflow-hidden rounded-2xl
//                            bg-card/80 backdrop-blur-sm border border-border
//                            shadow-lg hover:shadow-2xl hover:shadow-primary/10
//                            flex-shrink-0 w-[280px] sm:w-[320px] transition-all duration-500"
//                 style={{ transform: `rotate(${index % 2 === 0 ? -2.5 : 2.5}deg)` }}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1.03)")}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${index % 2 === 0 ? -2.5 : 2.5}deg)`)}
//               >
//                 <div className="relative overflow-hidden h-44 sm:h-52">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                     sizes="320px"
//                   />

//                   <span
//                     className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold
//                                 uppercase tracking-widest rounded-lg text-white
//                                 bg-gradient-to-r ${categoryColors[project.category] ?? "from-primary/80 to-primary/60"}
//                                 backdrop-blur-sm`}
//                   >
//                     {project.category}
//                   </span>

//                   {/* Hover overlay */}
//                   <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm
//                                   flex items-center justify-center gap-5
//                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <a
//                       href={project.demoLink}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label="Live demo"
//                       className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center
//                                  text-white hover:bg-white/35 transition-colors duration-200"
//                     >
//                       <ExternalLink size={18} />
//                     </a>
//                     {/* FIX #4 — FaGithub from react-icons (Github is not in lucide-react v1.x) */}
//                     <a
//                       href={project.githubLink}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label="GitHub"
//                       className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center
//                                  text-white hover:bg-white/35 transition-colors duration-200"
//                     >
//                       <FaGithub size={18} />
//                     </a>
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <h3 className="font-heading text-base font-bold text-foreground mb-1.5 line-clamp-1">
//                     {project.title}
//                   </h3>
//                   <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
//                     {project.description}
//                   </p>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

/**
 * Portfolio — inspired by David's FlavorSection pattern.
 *
 * Architecture (mirrors FlavorSection → FlavorTitle + FlavorSlider):
 *
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  PINNED SECTION (ScrollTrigger pin)                      │
 *  │  ┌──────────────┐  ┌──────────────────────────────────┐ │
 *  │  │ PortfolioTitle│  │ PortfolioSlider (scrolls right→) │ │
 *  │  │  (left, 40%) │  │  card  card  card  card  ...     │ │
 *  │  └──────────────┘  └──────────────────────────────────┘ │
 *  └─────────────────────────────────────────────────────────┘
 *
 * GSAP behaviour:
 * - Section is PINNED for the duration of card scrolling
 * - Title text lines stagger-animate on scroll-enter (like FlavorTitle)
 * - Title lines drift apart with parallax while scrolling (like FlavorSlider titleTl)
 * - Card strip translates LEFT across the screen (like FlavorSlider tl)
 */

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

/* ── Data ─────────────────────────────────────────────────── */
const portfolioProjects = [
  {
    id: 1,
    title: "Shopa — E-Commerce",
    description: "Scalable multi-vendor marketplace — Next.js + Django + Paystack + Redis.",
    category: "Full-Stack",
    image: "/img/portfolio/shopa.png",
    demoLink: "https://retsyapp.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/retsyapp",
  },
  {
    id: 2,
    title: "Trellify — Kanban",
    description: "Real-time collaborative Kanban — MERN + Socket.io + JWT + OTP auth.",
    category: "Full-Stack",
    image: "/img/portfolio/trellify.png",
    demoLink: "https://trello-next-blush.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/trello-next",
  },
  {
    id: 3,
    title: "EthaHospital App",
    description: "Hospital website frontend — TypeScript + Tailwind + Framer Motion.",
    category: "Frontend",
    image: "/img/portfolio/ethahospital.png",
    demoLink: "https://ettahospitalclone.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/hospitaltypescriptreact",
  },
  {
    id: 4,
    title: "CH-Travels",
    description: "Travel agency site — React + Framer Motion smooth animations.",
    category: "Frontend",
    image: "/img/portfolio/chtravels.png",
    demoLink: "https://shiny-scone-6fc98c.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/chardevtravel",
  },
  {
    id: 5,
    title: "CHBlog Platform",
    description: "Full-stack blog — role-based auth + protected routes + CRUD.",
    category: "Full-Stack",
    image: "/img/portfolio/chblog.png",
    demoLink: "https://multiblogapp.netlify.app/blog",
    githubLink: "https://github.com/ehihameneromosele/fullblogc",
  },
  {
    id: 6,
    title: "Listings API",
    description: "Property listings REST API — Django + DRF.",
    category: "Backend",
    image: "/img/portfolio/insomnia1.png",
    demoLink: "https://housing-properties.onrender.com",
    githubLink: "https://github.com/OkuekhamhenEromose/housing_properties",
  },
  {
    id: 7,
    title: "Real Estate Site",
    description: "Responsive real estate frontend — sale and rental listings.",
    category: "Frontend",
    image: "/img/portfolio/realestate-img.png",
    demoLink: "https://dancing-youtiao-914380.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/RealEstateModern",
  },
  {
    id: 8,
    title: "Resume Builder",
    description: "DRF-powered resume builder — structured professional output.",
    category: "Backend",
    image: "/img/portfolio/resumebuilder.png",
    demoLink: "https://renewschool-1.onrender.com",
    githubLink: "https://github.com/OkuekhamhenEromose/myresume",
  },
  {
    id: 9,
    title: "Hospital Management",
    description: "Production hospital system — admin dashboard + Google OAuth.",
    category: "Full-Stack",
    image: "/img/portfolio/ethahospital.png",
    demoLink: "https://dhospitalback.onrender.com/api/",
    githubLink: "https://github.com/OkuekhamhenEromose/dhospitalback",
  },
  {
    id: 10,
    title: "Portfolio v1",
    description: "Original personal portfolio — HTML + CSS + vanilla JS.",
    category: "Frontend",
    image: "/img/portfolio/portfolio.png",
    demoLink: "https://timely-axolotl-0f4be3.netlify.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/portfolio-original",
  },
  {
    id: 11,
    title: "Advanced Portfolio",
    description: "Next.js portfolio — Framer Motion + full SEO optimisation.",
    category: "Frontend",
    image: "/img/portfolio/nextportfolio.png",
    demoLink: "https://charleseromose.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/nextportfoliooriginal",
  },
];

const categories = [
  { id: "all",        name: "All",        count: 11 },
  { id: "Full-Stack", name: "Full-Stack", count: 4  },
  { id: "Frontend",   name: "Frontend",   count: 5  },
  { id: "Backend",    name: "Backend",    count: 2  },
];

const categoryColors: Record<string, string> = {
  "Full-Stack": "from-violet-500 to-indigo-600",
  Frontend:     "from-cyan-500 to-blue-600",
  Backend:      "from-emerald-500 to-teal-600",
};

/* ── Component ─────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Refs — mirror FlavorSection ref structure
  const sectionRef = useRef<HTMLElement>(null);  // pinned container (like .flavor-section)
  const sliderRef  = useRef<HTMLDivElement>(null); // scrolling strip (like slider-wrapper)

  const filtered =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  /* ── GSAP: rebuild whenever filter changes ── */
  useEffect(() => {
  const killFns: (() => void)[] = [];

  (async () => {
    const { default: gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll()
      .filter((st) => (st.vars?.id as string)?.startsWith("portfolio-"))
      .forEach((st) => st.kill());

    await new Promise<void>((r) => setTimeout(r, 100));

    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return;

    const isTablet = window.innerWidth <= 1024;

    let sliderTimeline: gsap.core.Timeline | undefined;

    /* ── 1. Horizontal card scroll ── */
    if (!isTablet) {
      const scrollAmount = slider.scrollWidth - window.innerWidth * 0.6;

      if (scrollAmount > 0) {
        sliderTimeline = gsap.timeline({
          scrollTrigger: {
            id: "portfolio-slider",
            trigger: section,
            start: "top top",
            end: `+=${scrollAmount + 1200}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        sliderTimeline.to(slider, {
          x: `-${scrollAmount}px`,
          ease: "none",
        });

        killFns.push(() => {
          sliderTimeline?.scrollTrigger?.kill();
          sliderTimeline?.kill();
        });
      }
    }

    /* ── 2. Title parallax drift ── */
    const titleTl = gsap.timeline({
      scrollTrigger: {
        id: "portfolio-title",
        trigger: section,
        start: "top top",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    titleTl
      .to(".portfolio-line-1", { xPercent: -18, ease: "none" }, 0)
      .to(".portfolio-line-2", { xPercent: 12, ease: "none" }, 0)
      .to(".portfolio-line-3", { xPercent: -10, ease: "none" }, 0);

    killFns.push(() => {
      titleTl.scrollTrigger?.kill();
      titleTl.kill();
    });

    /* ── 3. Title char stagger on enter ── */
    const chars3 = section.querySelectorAll<HTMLElement>(".portfolio-title-char");
    if (chars3.length) {
      const enterTween = gsap.from(chars3, {
        yPercent: 130,
        opacity: 0,
        stagger: 0.025,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          id: "portfolio-enter",
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      killFns.push(() => {
        enterTween.scrollTrigger?.kill();
        enterTween.kill();
      });
    }

    /* ── 4. Individual card entrance ── */
    const cards = slider.querySelectorAll<HTMLElement>("[data-portfolio-card]");
    cards.forEach((card) => {
      const tween = gsap.from(card, {
        scale: 0.88,
        opacity: 0,
        y: 40,
        ease: "power2.out",
        duration: 0.6,
        scrollTrigger: {
          trigger: card,
          containerAnimation: sliderTimeline,
          start: "left 95%",
          once: true,
        },
      });

      killFns.push(() => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    });
  })();

  return () => killFns.forEach((fn) => fn());
}, [activeCategory, filtered.length]);

  /* ── Split title text into spans for per-char animation ── */
  // const titleWords = ["My", "Creative", "Projects"];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="portfolio-section relative min-h-screen overflow-hidden bg-transparent"
    >
      <div className="h-full flex lg:flex-row flex-col items-stretch relative">

        {/* ════════════════════════════════════════
            LEFT — PortfolioTitle
            (mirrors FlavorTitle / lg:w-[57%] panel)
            ════════════════════════════════════════ */}
        <div className="lg:w-[40%] flex-none flex flex-col justify-center
                        px-8 sm:px-12 lg:px-16
                        pt-28 pb-8 lg:py-0
                        relative z-20">

          {/* Section tag */}
          <div className="mb-6">
            <span className="section-tag">My Work</span>
          </div>

          {/* Animated title lines — overflow hidden clips the yPercent rise */}
          <div className="mb-8 space-y-1">
            {["My", "Creative", "Projects"].map((word, wi) => (
              <div key={word} className="overflow-hidden">
                <div
                  className={`portfolio-line-${wi + 1} inline-block`}
                >
                  <h2
                    className={`font-heading font-black tracking-tight leading-[0.9]
                                 text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]
                                 ${wi === 1 ? "text-primary/35 italic" : "text-primary"}`}
                  >
                    {/* Per-character spans for stagger animation */}
                    {word.split("").map((ch, ci) => (
                      <span
                        key={ci}
                        className="portfolio-title-char inline-block"
                      >
                        {ch}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* Descriptor */}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-xs">
            Full-stack apps, frontends &amp; backend APIs — clean code,
            scalable architecture, thoughtful design.
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full border transition-all duration-300
                            ${activeCategory === cat.id
                              ? "bg-primary text-primary-foreground border-primary shadow-[0_0_18px_rgb(var(--primary)/0.4)]"
                              : "bg-card/50 text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                            }`}
              >
                {cat.name}
                <span className="ml-1.5 opacity-40">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Project count */}
          <p className="text-[11px] font-mono text-muted-foreground">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Scroll hint — only visible on desktop before scroll starts */}
          <div className="hidden lg:flex items-center gap-2 mt-auto pt-10
                          text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Scroll to explore</span>
            <span className="text-primary animate-bounce">→</span>
          </div>
        </div>

        {/* ════════════════════════════════════════
            RIGHT — PortfolioSlider
            (mirrors FlavorSlider / slider-wrapper)
            ════════════════════════════════════════ */}
        <div className="flex-1 flex items-center relative overflow-hidden">

          {/* Left fade-edge (like FlavorSlider left gradient) */}
          <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-28 z-10
                          pointer-events-none
                          bg-gradient-to-r from-background/80 to-transparent" />

          {/* Right fade-edge */}
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10
                          pointer-events-none
                          bg-gradient-to-l from-background/30 to-transparent" />

          {/* ── Scrolling card strip (like .flavors) ── */}
          <div
            ref={sliderRef}
            className="flex items-stretch gap-6 lg:gap-8
                       py-12 lg:py-16
                       pl-8 lg:pl-12 pr-16 lg:pr-24
                       flex-nowrap will-change-transform"
          >
            {filtered.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${activeCategory}`}
                project={project}
                index={index}
                total={filtered.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ProjectCard ─────────────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  demoLink: string;
  githubLink: string;
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const rotation = index % 3 === 0 ? "-1.5deg" : index % 3 === 1 ? "1deg" : "-0.5deg";

  return (
    <article
      data-portfolio-card
      className="group relative flex-none
                 w-[75vw] sm:w-[50vw] md:w-[38vw] lg:w-[32vw] xl:w-[26vw] 2xl:w-[24vw]
                 rounded-2xl overflow-hidden
                 bg-card/80 backdrop-blur-md
                 border border-border
                 shadow-xl hover:shadow-2xl hover:shadow-primary/10
                 transition-all duration-500"
      style={{
        transform: `rotate(${rotation})`,
        transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "rotate(0deg) scale(1.02) translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation})`;
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden h-48 sm:h-52 lg:h-56">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 32vw"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1
                      text-[10px] font-black uppercase tracking-[0.12em]
                      rounded-lg text-white shadow
                      bg-gradient-to-r ${categoryColors[project.category] ?? "from-primary to-primary/60"}`}
        >
          {project.category}
        </span>

        {/* Card index counter */}
        <span className="absolute top-3 right-3
                          font-mono text-[11px] font-bold
                          text-white/60 bg-black/35 backdrop-blur-sm
                          px-2 py-0.5 rounded-md">
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>

        {/* Hover overlay — links */}
        <div className="absolute inset-0
                        bg-primary/90 backdrop-blur-sm
                        flex items-center justify-center gap-5
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Live demo"
            onClick={(e) => e.stopPropagation()}
            className="w-12 h-12 rounded-full bg-white/20
                       flex items-center justify-center text-white
                       hover:bg-white/40 hover:scale-110
                       transition-all duration-200"
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            onClick={(e) => e.stopPropagation()}
            className="w-12 h-12 rounded-full bg-white/20
                       flex items-center justify-center text-white
                       hover:bg-white/40 hover:scale-110
                       transition-all duration-200"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-heading text-base font-bold text-foreground line-clamp-1
                        group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Progress bar at bottom */}
      <div className="h-[2px] bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </article>
  );
}