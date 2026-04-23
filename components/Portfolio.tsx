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
    githubLink: "https://github.com/OkuekhamhenEromose/hospitaltypescriptreact",
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
    githubLink: "https://github.com/OkuekhamhenEromose/housing_properties",
  },
  {
    id: 7,
    title: "Real Estate Website",
    description:
      "A responsive real estate frontend for showcasing properties for sale and rent.",
    category: "Frontend",
    image: "/img/portfolio/realestate-img.png",
    demoLink: "https://dancing-youtiao-914380.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/RealEstateModern",
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
    description:
      "Production-ready hospital management system with Google OAuth.",
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
    githubLink: "https://github.com/OkuekhamhenEromose/portfolio-original",
  },
  {
    id: 11,
    title: "Advanced Portfolio",
    description:
      "A next-generation portfolio built with Next.js and Framer Motion with SEO optimization.",
    category: "Frontend",
    image: "/img/portfolio/nextportfolio.png",
    demoLink: "https://charleseromose.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/nextportfoliooriginal",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>(
    "all",
  );
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
        count: portfolioProjects.filter((p) => p.category === "Frontend")
          .length,
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
      : portfolioProjects.filter(
          (project) => project.category === activeCategory,
        );
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
  }, [
    activeCategory,
    filteredProjects.length,
    buildScrollAnimation,
    killPortfolioScrollTrigger,
  ]);

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
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-4 sm:px-10 lg:w-[35%] lg:px-14 lg:py-0">
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
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 340px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      priority={index < 2} // preload first visible cards for LCP
                    />
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
