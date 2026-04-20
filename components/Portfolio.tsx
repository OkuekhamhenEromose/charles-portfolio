// "use client";

// /**
//  * FIXES vs broken version:
//  *  1. REMOVED `import { useGSAP } from "@gsap/react"` — not installed.
//  *     All GSAP done via dynamic import() inside useEffect.
//  *  2. <img> with onError replaces next/image — next/image has no onError
//  *     and retries 404s in an infinite loop flooding the server.
//  *  3. Category switch: kills ScrollTrigger + resets x:0 BEFORE re-render
//  *     so new cards paint at their natural position, not off-screen.
//  */

// import { useRef, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ExternalLink } from "lucide-react";
// import { FaGithub } from "react-icons/fa";

// const portfolioProjects = [
//   { id:1,  category:"Full-Stack", title:"Shopa — E-Commerce",   description:"Scalable multi-vendor marketplace — Next.js + Django + Paystack + Redis.", image:"/img/portfolio/shopa.png",         demoLink:"https://retsyapp.vercel.app/",                 githubLink:"https://github.com/OkuekhamhenEromose/retsyapp" },
//   { id:2,  category:"Full-Stack", title:"Trellify — Kanban",    description:"Real-time Kanban — MERN + Socket.io + JWT + OTP auth.",                   image:"/img/portfolio/trellify.png",       demoLink:"https://trello-next-blush.vercel.app/",        githubLink:"https://github.com/OkuekhamhenEromose/trello-next" },
//   { id:3,  category:"Frontend",   title:"EthaHospital App",     description:"Hospital frontend — TypeScript + Tailwind + Framer Motion.",               image:"/img/portfolio/ethahospital.png",   demoLink:"https://ettahospitalclone.vercel.app/",        githubLink:"https://github.com/OkuekhamhenEromose/hospitaltypescriptreact" },
//   { id:4,  category:"Frontend",   title:"CH-Travels",           description:"Travel agency — React + Framer Motion smooth animations.",                 image:"/img/portfolio/chtravels.png",      demoLink:"https://shiny-scone-6fc98c.netlify.app",       githubLink:"https://github.com/OkuekhamhenEromose/chardevtravel" },
//   { id:5,  category:"Full-Stack", title:"CHBlog Platform",      description:"Full-stack blog — role-based auth + protected routes + CRUD.",             image:"/img/portfolio/chblog.png",         demoLink:"https://multiblogapp.netlify.app/blog",        githubLink:"https://github.com/ehihameneromosele/fullblogc" },
//   { id:6,  category:"Backend",    title:"Listings API",         description:"Property listings REST API — Django + DRF.",                               image:"/img/portfolio/insomnia1.png",      demoLink:"https://housing-properties.onrender.com",     githubLink:"https://github.com/OkuekhamhenEromose/housing_properties" },
//   { id:7,  category:"Frontend",   title:"Real Estate Site",     description:"Responsive real estate frontend — sale and rental listings.",              image:"/img/portfolio/realestate-img.png", demoLink:"https://dancing-youtiao-914380.netlify.app",  githubLink:"https://github.com/OkuekhamhenEromose/RealEstateModern" },
//   { id:8,  category:"Backend",    title:"Resume Builder",       description:"DRF-powered resume builder — structured professional output.",             image:"/img/portfolio/resumebuilder.png",  demoLink:"https://renewschool-1.onrender.com",          githubLink:"https://github.com/OkuekhamhenEromose/myresume" },
//   { id:9,  category:"Full-Stack", title:"Hospital Management",  description:"Production hospital system — admin dashboard + Google OAuth.",            image:"/img/portfolio/ethahospital.png",   demoLink:"https://dhospitalback.onrender.com/api/",     githubLink:"https://github.com/OkuekhamhenEromose/dhospitalback" },
//   { id:10, category:"Frontend",   title:"Portfolio v1",         description:"Original personal portfolio — HTML + CSS + vanilla JS.",                  image:"/img/portfolio/portfolio.png",      demoLink:"https://timely-axolotl-0f4be3.netlify.app/", githubLink:"https://github.com/OkuekhamhenEromose/portfolio-original" },
//   { id:11, category:"Frontend",   title:"Advanced Portfolio",   description:"Next.js portfolio — Framer Motion + full SEO optimisation.",              image:"/img/portfolio/nextportfolio.png",  demoLink:"https://charleseromose.netlify.app",          githubLink:"https://github.com/OkuekhamhenEromose/nextportfoliooriginal" },
// ];

// const categories = [
//   { id:"all",        label:"All",        count:11 },
//   { id:"Full-Stack", label:"Full-Stack", count:4  },
//   { id:"Frontend",   label:"Frontend",   count:5  },
//   { id:"Backend",    label:"Backend",    count:2  },
// ];

// const badgeColors: Record<string, string> = {
//   "Full-Stack": "from-violet-500 to-indigo-600",
//   Frontend:     "from-cyan-500 to-blue-600",
//   Backend:      "from-emerald-500 to-teal-600",
// };

// const placeholderGradients: Record<string, string> = {
//   "Full-Stack": "from-violet-900/70 to-indigo-900/70",
//   Frontend:     "from-cyan-900/70 to-blue-900/70",
//   Backend:      "from-emerald-900/70 to-teal-900/70",
// };

// export default function Portfolio() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [switching, setSwitching]           = useState(false);
//   const workRef  = useRef<HTMLDivElement>(null);
//   const stripRef = useRef<HTMLDivElement>(null);

//   const filtered =
//     activeCategory === "all"
//       ? portfolioProjects
//       : portfolioProjects.filter((p) => p.category === activeCategory);

//   /* ─── Kill GSAP + reset x:0 THEN switch category ─────── */
//   const switchCategory = async (id: string) => {
//     if (id === activeCategory || switching) return;
//     setSwitching(true);

//     const { default: gsap } = await import("gsap");
//     const { ScrollTrigger } = await import("gsap/ScrollTrigger");
//     gsap.registerPlugin(ScrollTrigger);

//     ScrollTrigger.getAll()
//       .filter((st) => String(st.vars?.id ?? "").startsWith("ptf-"))
//       .forEach((st) => st.kill());

//     if (stripRef.current) {
//       gsap.set(stripRef.current, { clearProps: "transform,x" });
//       stripRef.current.style.transform = "";
//     }

//     setActiveCategory(id);
//     setSwitching(false);
//   };

//   /* ─── Build GSAP horizontal scroll — NO @gsap/react ──── */
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     let tid: ReturnType<typeof setTimeout>;
//     let killFn: (() => void) | undefined;

//     (async () => {
//       const { default: gsap } = await import("gsap");
//       const { ScrollTrigger } = await import("gsap/ScrollTrigger");
//       gsap.registerPlugin(ScrollTrigger);

//       ScrollTrigger.getAll()
//         .filter((st) => String(st.vars?.id ?? "").startsWith("ptf-"))
//         .forEach((st) => st.kill());

//       if (stripRef.current) {
//         gsap.set(stripRef.current, { clearProps: "transform,x" });
//       }

//       await new Promise<void>((r) => { tid = setTimeout(r, 200); });

//       const work  = workRef.current;
//       const strip = stripRef.current;
//       if (!work || !strip) return;

//       const projectsWidth  = strip.scrollWidth;
//       const scrollDistance = projectsWidth - window.innerWidth;
//       if (scrollDistance <= 0) return;

//       const tween = gsap.to(strip, {
//         x: -scrollDistance,
//         ease: "linear",
//         scrollTrigger: {
//           id:                  "ptf-slider",
//           trigger:              work,
//           start:               "center center",
//           end:                 () => `+=${projectsWidth}`,
//           pin:                  true,
//           scrub:                1,
//           anticipatePin:        1,
//           invalidateOnRefresh:  true,
//         },
//       });

//       ScrollTrigger.refresh();

//       killFn = () => {
//         tween.scrollTrigger?.kill();
//         tween.kill();
//         if (strip) gsap.set(strip, { clearProps: "transform,x" });
//       };
//     })();

//     return () => { clearTimeout(tid); killFn?.(); };
//   }, [activeCategory, filtered.length]);

//   return (
//     <div ref={workRef} id="portfolio"
//          className="min-h-screen py-24 lg:py-36 overflow-hidden bg-transparent">

//       {/* Header */}
//       <div className="px-6 sm:px-10 lg:px-14 pb-10 lg:pb-14
//                       flex flex-col md:flex-row gap-6 md:gap-0
//                       justify-between items-start md:items-end">
//         <div className="max-w-md">
//           <span className="section-tag mb-4 inline-flex">My Work</span>
//           <h2 className="font-heading font-black tracking-tight leading-[0.9]
//                           text-4xl sm:text-5xl lg:text-6xl text-foreground mt-3">
//             Selected <span className="gradient-text">Projects</span>
//           </h2>
//           <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-sm">
//             A showcase of selected work — designed to inspire, engage, and deliver real results.
//           </p>
//         </div>
//         <div className="flex flex-col items-start md:items-end gap-3">
//           <div className="flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <button key={cat.id} onClick={() => switchCategory(cat.id)}
//                       disabled={switching}
//                       className={`px-4 py-1.5 text-xs font-bold rounded-full border
//                                   transition-all duration-300 disabled:opacity-50 disabled:cursor-wait
//                                   ${activeCategory === cat.id
//                                     ? "bg-primary text-primary-foreground border-primary shadow-[0_0_14px_rgb(var(--primary)/0.45)]"
//                                     : "bg-card/50 text-muted-foreground border-border hover:border-primary/50 hover:text-primary"}`}>
//                 {cat.label}<span className="ml-1 opacity-40">({cat.count})</span>
//               </button>
//             ))}
//           </div>
//           <p className="font-mono text-[11px] text-muted-foreground">
//             {filtered.length} project{filtered.length !== 1 ? "s" : ""}
//           </p>
//         </div>
//       </div>

//       {/* Strip wrapper — ml offset NOT inside the translated element */}
//       <div className="overflow-hidden">
//         <div className="ml-0 md:ml-[25%] lg:ml-[38%]">
//           <div ref={stripRef}
//                className="flex gap-5 lg:gap-7 mt-4 pr-16 will-change-transform"
//                style={{ width: "max-content" }}>
//             <AnimatePresence mode="popLayout">
//               {filtered.map((project, index) => (
//                 <ProjectCard key={project.id} project={project}
//                              index={index} total={filtered.length} />
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── Card ────────────────────────────────────────────────── */
// interface Project {
//   id: number; title: string; description: string;
//   category: string; image: string; demoLink: string; githubLink: string;
// }

// function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
//   const [imgFailed, setImgFailed] = useState(false);

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.92, y: 20 }}
//       animate={{ opacity: 1, scale: 1,    y: 0  }}
//       exit={{    opacity: 0, scale: 0.88, y:-10  }}
//       transition={{ duration: 0.45, ease:[0.16,1,0.3,1], delay: Math.min(index * 0.06, 0.28) }}
//       className="group relative flex-none rounded-2xl overflow-hidden
//                  w-[80vw] sm:w-[55vw] md:w-[400px] lg:w-[460px] xl:w-[500px]
//                  bg-card/80 backdrop-blur-sm border border-border shadow-xl
//                  transition-shadow duration-300
//                  hover:shadow-[0_20px_50px_rgb(var(--primary)/0.15)]"
//     >
//       <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
//         {imgFailed ? (
//           /* ── Gradient placeholder when image file is missing ── */
//           <div className={`w-full h-full bg-gradient-to-br
//                            ${placeholderGradients[project.category] ?? "from-card to-muted"}
//                            flex items-center justify-center`}>
//             <span className="font-heading font-black text-white/15 text-7xl select-none">
//               {String(index + 1).padStart(2, "0")}
//             </span>
//           </div>
//         ) : (
//           /* ── Plain <img> — has onError, unlike next/image ── */
//           // eslint-disable-next-line @next/next/no-img-element
//           <img src={project.image} alt={project.title}
//                onError={() => setImgFailed(true)}
//                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />

//         <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-black
//                           uppercase tracking-widest rounded-full text-white shadow-lg
//                           bg-gradient-to-r ${badgeColors[project.category] ?? "from-primary to-primary/60"}`}>
//           {project.category}
//         </span>
//         <span className="absolute top-4 right-4 font-mono text-xs font-bold
//                           text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
//           {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
//         </span>

//         <div className="absolute inset-0 bg-primary/88 backdrop-blur-sm
//                         flex items-center justify-center gap-8
//                         opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <a href={project.demoLink} target="_blank" rel="noreferrer" aria-label="Live demo"
//              onClick={(e) => e.stopPropagation()}
//              className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
//             <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
//               <ExternalLink size={20} />
//             </span>
//             <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
//           </a>
//           <a href={project.githubLink} target="_blank" rel="noreferrer" aria-label="GitHub"
//              onClick={(e) => e.stopPropagation()}
//              className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
//             <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
//               <FaGithub size={20} />
//             </span>
//             <span className="text-[10px] font-bold uppercase tracking-wider">Code</span>
//           </a>
//         </div>
//       </div>

//       <div className="p-5 flex items-start justify-between gap-3">
//         <div className="flex-1 min-w-0">
//           <h3 className="font-heading text-base lg:text-lg font-bold text-foreground
//                           group-hover:text-primary transition-colors duration-300 line-clamp-1">
//             {project.title}
//           </h3>
//           <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
//             {project.description}
//           </p>
//         </div>
//         <span className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/30
//                           flex items-center justify-center text-primary text-sm
//                           group-hover:bg-primary group-hover:text-primary-foreground
//                           group-hover:border-primary transition-all duration-300">→</span>
//       </div>

//       <div className="h-[2px] bg-border/50">
//         <div className="h-full bg-gradient-to-r from-primary to-primary/40"
//              style={{ width:`${((index+1)/total)*100}%` }} />
//       </div>
//     </motion.div>
//   );
// }


"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

type ProjectCategory = "Full-Stack" | "Frontend" | "Backend";

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  demoLink: string;
  githubLink: string;
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Shopa — E-Commerce Marketplace",
    description:
      "A scalable multi-vendor marketplace built with Next.js and Django, featuring secure Paystack payments and Redis-powered performance.",
    category: "Full-Stack",
    image: "/img/portfolio/shopa.png",
    demoLink: "https://retsyapp.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/retsyapp",
  },
  {
    id: 2,
    title: "Trellify — Trello Clone",
    description:
      "A real-time collaborative Kanban app built with the MERN stack, featuring Socket.io live updates and advanced JWT + OTP authentication.",
    category: "Full-Stack",
    image: "/img/portfolio/trellify.png",
    demoLink: "https://trello-next-blush.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/trello-next",
  },
  {
    id: 3,
    title: "EthaHospital App",
    description:
      "A frontend clone of a hospital website built with TypeScript, Tailwind CSS, and Framer Motion.",
    category: "Frontend",
    image: "/img/portfolio/ethahospital.png",
    demoLink: "https://ettahospitalclone.vercel.app/",
    githubLink:
      "https://github.com/OkuekhamhenEromose/hospitaltypescriptreact",
  },
  {
    id: 4,
    title: "CH-Travels",
    description:
      "A modern travel agency website built with React and Framer Motion with smooth animations and engaging UI transitions.",
    category: "Frontend",
    image: "/img/portfolio/chtravels.png",
    demoLink: "https://shiny-scone-6fc98c.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/chardevtravel",
  },
  {
    id: 5,
    title: "CHBlog App",
    description:
      "A full-stack blogging platform with role-based authentication, protected routes, and CRUD operations.",
    category: "Full-Stack",
    image: "/img/portfolio/chblog.png",
    demoLink: "https://multiblogapp.netlify.app/blog",
    githubLink: "https://github.com/ehihameneromosele/fullblogc",
  },
  {
    id: 6,
    title: "Listings App (Backend)",
    description:
      "A backend-driven property listings API built with Django and Django REST Framework.",
    category: "Backend",
    image: "/img/portfolio/insomnia1.png",
    demoLink: "https://housing-properties.onrender.com",
    githubLink:
      "https://github.com/OkuekhamhenEromose/housing_properties",
  },
  {
    id: 7,
    title: "Real Estate Website",
    description:
      "A responsive real estate frontend for showcasing properties for sale and rent.",
    category: "Frontend",
    image: "/img/portfolio/realestate-img.png",
    demoLink: "https://dancing-youtiao-914380.netlify.app",
    githubLink:
      "https://github.com/OkuekhamhenEromose/RealEstateModern",
  },
  {
    id: 8,
    title: "Resume Builder",
    description:
      "A Django REST Framework–powered resume builder that generates structured, professional resumes.",
    category: "Backend",
    image: "/img/portfolio/resumebuilder.png",
    demoLink: "https://renewschool-1.onrender.com",
    githubLink: "https://github.com/OkuekhamhenEromose/myresume",
  },
  {
    id: 9,
    title: "EthaHospital Management",
    description: "Production-ready hospital management system with Google OAuth.",
    category: "Full-Stack",
    image: "/img/portfolio/ethahospital.png",
    demoLink: "https://dhospitalback.onrender.com/api/",
    githubLink: "https://github.com/OkuekhamhenEromose/dhospitalback",
  },
  {
    id: 10,
    title: "Portfolio",
    description:
      "A personal portfolio website built with HTML, CSS, and JavaScript.",
    category: "Frontend",
    image: "/img/portfolio/portfolio.png",
    demoLink: "https://timely-axolotl-0f4be3.netlify.app/",
    githubLink:
      "https://github.com/OkuekhamhenEromose/portfolio-original",
  },
  {
    id: 11,
    title: "Advanced Portfolio",
    description:
      "A next-generation portfolio built with Next.js and Framer Motion with SEO optimization.",
    category: "Frontend",
    image: "/img/portfolio/nextportfolio.png",
    demoLink: "https://charleseromose.netlify.app",
    githubLink:
      "https://github.com/OkuekhamhenEromose/nextportfoliooriginal",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<
    "all" | ProjectCategory
  >("all");
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const categories = useMemo(
    () => [
      { id: "all" as const, name: "All", count: portfolioProjects.length },
      {
        id: "Full-Stack" as const,
        name: "Full-Stack",
        count: portfolioProjects.filter((p) => p.category === "Full-Stack")
          .length,
      },
      {
        id: "Frontend" as const,
        name: "Frontend",
        count: portfolioProjects.filter((p) => p.category === "Frontend").length,
      },
      {
        id: "Backend" as const,
        name: "Backend",
        count: portfolioProjects.filter((p) => p.category === "Backend").length,
      },
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    return activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const killPortfolioScrollTrigger = useCallback(() => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.id === "portfolio-horizontal") {
        trigger.kill();
      }
    });

    gsap.killTweensOf(sliderRef.current);
    if (sliderRef.current) {
      gsap.set(sliderRef.current, { x: 0 });
    }
  }, []);

  const buildScrollAnimation = useCallback(() => {
    killPortfolioScrollTrigger();

    const section = sectionRef.current;
    const slider = sliderRef.current;

    if (!section || !slider) return;

    requestAnimationFrame(() => {
      const totalScrollWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;

      const scrollAmount = isMobile
        ? totalScrollWidth - viewportWidth + 40
        : totalScrollWidth - viewportWidth * 0.6;

      if (scrollAmount <= 0) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "portfolio-horizontal",
          trigger: section,
          start: "top top",
          end: `+=${scrollAmount + 800}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(slider, {
        x: -scrollAmount,
        ease: "none",
      });

      scrollTriggerRef.current = timeline.scrollTrigger ?? null;
      ScrollTrigger.refresh();
    });
  }, [isMobile, killPortfolioScrollTrigger]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      buildScrollAnimation();
    }, 120);

    return () => {
      window.clearTimeout(timeout);
      killPortfolioScrollTrigger();
    };
  }, [activeCategory, filteredProjects.length, buildScrollAnimation, killPortfolioScrollTrigger]);

  useGSAP(
    () => {
      gsap.from(".portfolio-title-line", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".portfolio-section",
          start: "top 60%",
        },
      });

      gsap.from(".portfolio-desc", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.4,
        scrollTrigger: {
          trigger: ".portfolio-section",
          start: "top 50%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="portfolio-section relative min-h-screen overflow-hidden"
    >
      <div className="flex min-h-screen h-full flex-col lg:flex-row">
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-8 sm:px-10 lg:w-[35%] lg:px-14 lg:py-0">
          <div className="overflow-hidden">
            <h2 className="portfolio-title-line text-4xl font-black leading-[0.95] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              My
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2 className="portfolio-title-line text-4xl font-black italic leading-[0.95] tracking-tight text-primary/60 sm:text-5xl md:text-6xl lg:text-7xl">
              creative
            </h2>
          </div>

          <div className="mb-6 overflow-hidden">
            <h2 className="portfolio-title-line text-4xl font-black leading-[0.95] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              projects
            </h2>
          </div>

          <p className="portfolio-desc mb-8 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            A curated collection of projects spanning full-stack apps,
            frontends, and backend APIs — each reflecting clean code,
            scalable architecture, and thoughtful design.
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-lg"
                      : "border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat.name}
                  <span className="ml-1 opacity-60">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="relative flex w-full items-center lg:w-[65%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 50%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 50%, black 100%)",
          }}
        >
          <div
            ref={sliderRef}
            className="flex flex-nowrap items-center gap-8 px-4 py-12 lg:px-8"
          >
            {filteredProjects.map((project, index) => {
              const baseRotation = index % 2 === 0 ? -3 : 3;

              return (
                <article
                  key={project.id}
                  className="group relative w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-lg transition-all duration-500 hover:shadow-2xl sm:w-[340px]"
                  style={{
                    transform: `rotate(${baseRotation}deg)`,
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform =
                      "rotate(0deg) scale(1.03)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = `rotate(${baseRotation}deg)`;
                  }}
                >
                  <div className="relative h-48 overflow-hidden sm:h-56">
                          <img src={project.image} alt={project.title}
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-lg bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                      {project.category}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center gap-5 bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open live demo for ${project.title}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm transition-colors duration-200 hover:bg-primary-foreground/40"
                      >
                        <ExternalLink size={20} />
                      </a>

                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open GitHub repository for ${project.title}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm transition-colors duration-200 hover:bg-primary-foreground/40"
                      >
                        <FaGithub size={20} />
                      </a>
                    </div>
                  </div>

                  <div className="bg-card/40 p-5 backdrop-blur-md">
                    <h3 className="mb-2 line-clamp-1 text-base font-bold text-primary sm:text-lg">
                      {project.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;