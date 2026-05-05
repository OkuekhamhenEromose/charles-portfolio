"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

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
    image: "/images/portfolio/shopa.png",
    demoLink: "https://retsyapp.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/retsyapp",
  },
  {
    id: 2,
    title: "Trellify — Trello Clone",
    description:
      "A real-time collaborative Kanban app built with the MERN stack, featuring Socket.io live updates and advanced JWT + OTP authentication.",
    category: "Full-Stack",
    image: "/images/portfolio/trellify.png",
    demoLink: "https://trello-next-blush.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/trello-next",
  },
  {
    id: 3,
    title: "EthaHospital App",
    description:
      "A frontend clone of a hospital website built with TypeScript, Tailwind CSS, and Framer Motion.",
    category: "Frontend",
    image: "/images/portfolio/ethahospital.png",
    demoLink: "https://ettahospitalclone.vercel.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/hospitaltypescriptreact",
  },
  {
    id: 4,
    title: "CH-Travels",
    description:
      "A modern travel agency website built with React and Framer Motion with smooth animations and engaging UI transitions.",
    category: "Frontend",
    image: "/images/portfolio/chtravels.png",
    demoLink: "https://shiny-scone-6fc98c.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/chardevtravel",
  },
  {
    id: 5,
    title: "CHBlog App",
    description:
      "A full-stack blogging platform with role-based authentication, protected routes, and CRUD operations.",
    category: "Full-Stack",
    image: "/images/portfolio/chblog.png",
    demoLink: "https://multiblogapp.netlify.app/blog",
    githubLink: "https://github.com/ehihameneromosele/fullblogc",
  },
  {
    id: 6,
    title: "Listings App (Backend)",
    description:
      "A backend-driven property listings API built with Django and Django REST Framework.",
    category: "Backend",
    image: "/images/portfolio/insomnia1.png",
    demoLink: "https://housing-properties.onrender.com",
    githubLink: "https://github.com/OkuekhamhenEromose/housing_properties",
  },
  {
    id: 7,
    title: "Real Estate Website",
    description:
      "A responsive real estate frontend for showcasing properties for sale and rent.",
    category: "Frontend",
    image: "/images/portfolio/realestate-img.png",
    demoLink: "https://dancing-youtiao-914380.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/RealEstateModern",
  },
  {
    id: 8,
    title: "Resume Builder",
    description:
      "A Django REST Framework–powered resume builder that generates structured, professional resumes.",
    category: "Backend",
    image: "/images/portfolio/resumebuilder.png",
    demoLink: "https://renewschool-1.onrender.com",
    githubLink: "https://github.com/OkuekhamhenEromose/myresume",
  },
  {
    id: 9,
    title: "EthaHospital Management",
    description:
      "Production-ready hospital management system with Google OAuth.",
    category: "Full-Stack",
    image: "/images/portfolio/ethahospital.png",
    demoLink: "https://dhospitalback.onrender.com/api/",
    githubLink: "https://github.com/OkuekhamhenEromose/dhospitalback",
  },
  {
    id: 10,
    title: "Portfolio",
    description:
      "A personal portfolio website built with HTML, CSS, and JavaScript.",
    category: "Frontend",
    image: "/images/portfolio/portfolio.png",
    demoLink: "https://timely-axolotl-0f4be3.netlify.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/portfolio-original",
  },
  {
    id: 11,
    title: "Advanced Portfolio",
    description:
      "A next-generation portfolio built with Next.js and Framer Motion with SEO optimization.",
    category: "Frontend",
    image: "/images/portfolio/nextportfolio.png",
    demoLink: "https://charleseromose.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/nextportfoliooriginal",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const [isMobile, setIsMobile] = useState(false);

  // Guard against concurrent filter clicks mid-animation
  const isFilteringRef = useRef(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const categories = useMemo(
    () => [
      { id: "all" as const, name: "All", count: portfolioProjects.length },
      {
        id: "Full-Stack" as const,
        name: "Full-Stack",
        count: portfolioProjects.filter((p) => p.category === "Full-Stack").length,
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
    [],
  );

  const filteredProjects = useMemo(() => {
    return activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // ─── Kill existing ScrollTrigger ───────────────────────────────────────────
  // FIX: After killing the pin, we immediately reset the window scroll to the
  // section's natural offsetTop.  Without this, when GSAP removes its
  // pinSpacer the browser's scroll position is left past the section, causing
  // the next section (Testimonials) to flash into view for a moment.
  const killPortfolioScrollTrigger = useCallback(() => {
    const section = sectionRef.current;
    // Capture section top BEFORE the kill so the pinSpacer is still in the DOM
    const sectionTop = section?.offsetTop ?? 0;

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

    // Snap scroll back to the section so the next section never bleeds in
    window.scrollTo(0, sectionTop);
  }, []);

  // ─── Animate cards into view (staggered entrance) ──────────────────────────
  const animateCardsIn = useCallback(() => {
    const cards = sliderRef.current?.querySelectorAll<HTMLElement>("article");
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: { each: 0.07, from: "start" },
        duration: 0.55,
        ease: "back.out(1.4)",
        // Clear so inline rotate styles + hover handlers regain full control
        clearProps: "opacity,y,scale",
      },
    );
  }, []);

  // ─── Animate current cards out, then switch filter ─────────────────────────
  const handleCategoryChange = useCallback(
    async (categoryId: "all" | ProjectCategory) => {
      if (categoryId === activeCategory || isFilteringRef.current) return;
      isFilteringRef.current = true;

      const cards = sliderRef.current?.querySelectorAll<HTMLElement>("article");

      if (cards && cards.length > 0) {
        // Cards exit: slide up & fade, quick stagger from the end so the
        // trailing cards vanish first, giving a "sweeping out" feel.
        await gsap.to(cards, {
          opacity: 0,
          y: -20,
          scale: 0.9,
          stagger: { each: 0.03, from: "end" },
          duration: 0.22,
          ease: "power2.in",
        });
      }

      // State change → React re-renders with new cards
      setActiveCategory(categoryId);
      isFilteringRef.current = false;
    },
    [activeCategory],
  );

  // ─── Build / rebuild horizontal scroll animation ────────────────────────────
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

      if (scrollAmount <= 0) {
        // Nothing to scroll — just animate cards in
        animateCardsIn();
        return;
      }

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

      timeline.to(slider, { x: -scrollAmount, ease: "none" });

      scrollTriggerRef.current = timeline.scrollTrigger ?? null;
      ScrollTrigger.refresh();

      // Animate the freshly-rendered cards into view
      animateCardsIn();
    });
  }, [isMobile, killPortfolioScrollTrigger, animateCardsIn]);

  // ─── Effect: re-run scroll animation whenever the filter/count changes ──────
  useEffect(() => {
    // FIX: Immediately hide the newly rendered cards so they don't pop in
    // before the entrance animation fires.  We reset them to opacity:0 right
    // after React commits the new DOM, then `buildScrollAnimation` will
    // reveal them with the staggered `animateCardsIn` entrance.
    const cards = sliderRef.current?.querySelectorAll<HTMLElement>("article");
    if (cards) gsap.set(cards, { opacity: 0, y: 20 });

    const timeout = window.setTimeout(() => {
      buildScrollAnimation();
    }, 120);

    return () => {
      window.clearTimeout(timeout);
      killPortfolioScrollTrigger();
    };
  }, [activeCategory, filteredProjects.length, buildScrollAnimation, killPortfolioScrollTrigger]);

  // ─── Section title / description entrance animation ─────────────────────────
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
    { scope: sectionRef },
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="portfolio-section relative min-h-screen overflow-hidden"
    >
      <div className="flex min-h-screen h-full flex-col lg:flex-row">
        {/* ── Left panel: title + filter buttons ─────────────────────────── */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 mt-24 sm:px-10 lg:w-[35%] lg:px-14 lg:py-0">
          <div className="overflow-hidden">
            <h2 className="portfolio-title-line section-title text-foreground">
              My <span className="gradient-text">creative</span>
            </h2>
          </div>

          <div className="mb-4 overflow-hidden">
            <h2 className="portfolio-title-line section-title text-foreground">
              projects
            </h2>
          </div>

          <p
            className="
              portfolio-desc max-w-md font-body text-muted-foreground
              mt-1.5 mb-3.5 leading-snug
              text-[1rem]
              sm:mt-3.5 sm:mb-4 sm:text-sm sm:leading-relaxed
              md:text-[0.85rem]
              lg:mt-0 lg:mb-8 lg:text-base lg:leading-7
            "
          >
            A curated collection of projects spanning full-stack apps,
            frontends, and backend APIs — each reflecting clean code, scalable
            architecture, and thoughtful design.
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  // ↓ use handleCategoryChange instead of setActiveCategory
                  onClick={() => void handleCategoryChange(cat.id)}
                  className={`
                    rounded-full border font-body font-semibold transition-all duration-300
                    px-2.5 py-1 text-[0.8rem]
                    sm:px-4 sm:py-1.5 sm:text-xs
                    lg:py-2 lg:text-sm
                    ${isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-lg"
                      : "border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                    }
                  `}
                >
                  {cat.name}
                  <span className="ml-1 opacity-60">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right panel: horizontal card slider ────────────────────────── */}
        <div
          className="relative flex w-full items-center lg:w-[65%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent -10%, black 50%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent -10%, black 50%, black 100%)",
          }}
        >
          <div
            ref={sliderRef}
            className="flex flex-nowrap items-center gap-8 py-12 px-4 lg:px-8"
          >
            {filteredProjects.map((project, index) => {
              const baseRotation = index % 2 === 0 ? -3 : 3;

              return (
                // <article
                //   key={project.id}
                //   className="group relative w-70 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-500 hover:shadow-2xl sm:w-85"
                //   style={{
                //     transform: `rotate(${baseRotation}deg)`,
                //     transition: "transform 0.5s ease",
                //   }}
                //   onMouseEnter={(e) => {
                //     e.currentTarget.style.transform = "rotate(0deg) scale(1.03)";
                //   }}
                //   onMouseLeave={(e) => {
                //     e.currentTarget.style.transform = `rotate(${baseRotation}deg)`;
                //   }}
                // >
                //   {/* ── Card image ── */}
                //   <div className="relative h-48 overflow-hidden sm:h-56">
                //     <Image
                //       src={project.image}
                //       alt={project.title}
                //       fill
                //       sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 340px"
                //       className="object-cover transition-transform duration-700 group-hover:scale-110"
                //       priority={index < 2}
                //     />

                //     <span className="absolute left-3 top-3 rounded-lg bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                //       {project.category}
                //     </span>

                //     {/* ── Hover overlay: action buttons ── */}
                //     <div className="absolute inset-0 flex items-center justify-center gap-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                //       <a
                //         href={project.demoLink}
                //         target="_blank"
                //         rel="noreferrer"
                //         aria-label={`Open live demo for ${project.title}`}
                //         className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgb(var(--primary)/0.6)]"
                //       >
                //         <ExternalLink size={20} />
                //       </a>

                //       <a
                //         href={project.githubLink}
                //         target="_blank"
                //         rel="noreferrer"
                //         aria-label={`Open GitHub repository for ${project.title}`}
                //         className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgb(var(--primary)/0.6)]"
                //       >
                //         <FaGithub size={20} />
                //       </a>
                //     </div>
                //   </div>

                //   {/* ── Card body ── */}
                //   <div className="bg-card/40 p-5">
                //     <h3 className="card-title mb-2 line-clamp-1 text-base text-primary sm:text-lg">
                //       {project.title}
                //     </h3>
                //     <p className="small-text line-clamp-3">{project.description}</p>
                //   </div>
                // </article>

                <article
                  key={project.id}
                  /*
                    Card widths by breakpoint:
                      mobile (< sm)  → w-52 / 208 px  — ~1.5 cards visible on 375px
                      sm (≥ 640)     → w-64 / 256 px
                      md (≥ 768)     → w-72 / 288 px
                      lg+ (desktop)  → w-80 / 320 px
                  */
                  className="
                    group relative shrink-0 overflow-hidden rounded-2xl
                    border border-border bg-card shadow-lg
                    transition-all duration-500 hover:shadow-2xl
                    w-52 sm:w-64 md:w-72 lg:w-80
                  "
                  style={{ transform: `rotate(${baseRotation}deg)`, transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(0deg) scale(1.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${baseRotation}deg)`; }}
                >
                  {/* Card image */}
                  <div className="relative h-32 overflow-hidden sm:h-40 lg:h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 2}
                    />
 
                    {/* Category badge */}
                    <span className="
                      absolute left-2 top-2 rounded-md bg-primary/90
                      text-primary-foreground backdrop-blur-sm font-bold uppercase tracking-wider
                      px-2 py-0.5 text-[8px]
                      sm:left-3 sm:top-3 sm:px-2.5 sm:text-[9px]
                      lg:text-[10px]
                    ">
                      {project.category}
                    </span>
 
                    {/* Hover action overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-4">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open live demo for ${project.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgb(var(--primary)/0.6)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open GitHub repository for ${project.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgb(var(--primary)/0.6)] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                      >
                        <FaGithub size={15} />
                      </a>
                    </div>
                  </div>
 
                  {/* Card body */}
                  <div className="bg-card/40 p-3 sm:p-4 lg:p-5">
                    <h3 className="
                      mb-1 line-clamp-1 font-heading font-bold tracking-tight text-primary
                      text-[0.75rem] sm:text-sm lg:text-base
                    ">
                      {project.title}
                    </h3>
                    <p className="
                      line-clamp-2 font-body leading-relaxed text-muted-foreground
                      text-[0.68rem] sm:text-xs sm:line-clamp-3 lg:text-sm
                    ">
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