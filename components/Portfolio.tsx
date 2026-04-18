"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const portfolioProjects = [
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
      "Real-time collaborative Kanban app with the MERN stack, Socket.io live updates, and advanced JWT + OTP authentication.",
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
      "Full-stack blogging platform with role-based authentication, protected routes, and CRUD operations.",
    category: "Full-Stack",
    image: "/img/portfolio/chblog.png",
    demoLink: "https://multiblogapp.netlify.app/blog",
    githubLink: "https://github.com/ehihameneromosele/fullblogc",
  },
  {
    id: 6,
    title: "Listings API (Backend)",
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
    title: "Hospital Management",
    description:
      "Production-ready hospital management system with Google OAuth and full admin dashboard.",
    category: "Full-Stack",
    image: "/img/portfolio/ethahospital.png",
    demoLink: "https://dhospitalback.onrender.com/api/",
    githubLink: "https://github.com/OkuekhamhenEromose/dhospitalback",
  },
  {
    id: 10,
    title: "Original Portfolio",
    description:
      "A personal portfolio website built with HTML, CSS, and vanilla JavaScript.",
    category: "Frontend",
    image: "/img/portfolio/portfolio.png",
    demoLink: "https://timely-axolotl-0f4be3.netlify.app/",
    githubLink: "https://github.com/OkuekhamhenEromose/portfolio-original",
  },
  {
    id: 11,
    title: "Advanced Portfolio",
    description:
      "Next-generation portfolio built with Next.js and Framer Motion with full SEO optimization.",
    category: "Frontend",
    image: "/img/portfolio/nextportfolio.png",
    demoLink: "https://charleseromose.netlify.app",
    githubLink: "https://github.com/OkuekhamhenEromose/nextportfoliooriginal",
  },
];

const categories = [
  { id: "all", name: "All", count: 11 },
  { id: "Full-Stack", name: "Full-Stack", count: 4 },
  { id: "Frontend", name: "Frontend", count: 5 },
  { id: "Backend", name: "Backend", count: 2 },
];

const categoryColors: Record<string, string> = {
  "Full-Stack": "from-violet-500/80 to-indigo-500/80",
  Frontend: "from-cyan-500/80 to-blue-500/80",
  Backend: "from-emerald-500/80 to-teal-500/80",
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  // GSAP horizontal scroll (dynamic import for SSR safety)
  const buildScroll = useCallback(async () => {
    const { default: gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    // Kill old
    ScrollTrigger.getAll()
      .filter((st) => st.vars?.id === "portfolio-h")
      .forEach((st) => st.kill());

    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return;

    await new Promise<void>((r) => requestAnimationFrame(() => r()));

    const scrollAmt = isMobile
      ? slider.scrollWidth - window.innerWidth + 40
      : slider.scrollWidth - window.innerWidth * 0.6;

    if (scrollAmt <= 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "portfolio-h",
        trigger: section,
        start: "top top",
        end: `+=${scrollAmt + 800}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });
    tl.to(slider, { x: -scrollAmt, ease: "none" });
  }, [isMobile]);

  useEffect(() => {
    const t = setTimeout(() => buildScroll(), 120);
    return () => {
      clearTimeout(t);
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll()
          .filter((st) => st.vars?.id === "portfolio-h")
          .forEach((st) => st.kill());
      });
    };
  }, [activeCategory, filteredProjects.length, buildScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row h-full min-h-screen">
        {/* ── Left panel ── */}
        <div className="w-full lg:w-[35%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10 lg:py-0 relative z-10">
          <span className="section-tag mb-5 self-start lg:self-auto">My Work</span>

          <h2 className="font-heading font-black tracking-tight leading-none mb-6">
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary">
              My
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary/40 italic">
              creative
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary">
              projects
            </span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-sm">
            A curated collection spanning full-stack apps, frontends, and
            backend APIs — each reflecting clean code, scalable architecture,
            and thoughtful design.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full border transition-all duration-300
                            ${
                              activeCategory === cat.id
                                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_16px_rgb(var(--primary)/0.3)]"
                                : "bg-card/60 text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                            }`}
              >
                {cat.name}
                <span className="ml-1.5 opacity-50">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: horizontal slide ── */}
        <div className="w-full lg:w-[65%] flex items-center relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />

          <div
            ref={sliderRef}
            className="flex items-center gap-6 py-12 px-4 lg:px-8 flex-nowrap will-change-transform"
          >
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-2xl
                           bg-card/80 backdrop-blur-sm border border-border
                           shadow-lg hover:shadow-2xl hover:shadow-primary/10
                           flex-shrink-0 w-[280px] sm:w-[320px]
                           transition-all duration-500"
                style={{
                  transform: `rotate(${index % 2 === 0 ? -2.5 : 2.5}deg)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "rotate(0deg) scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = `rotate(${index % 2 === 0 ? -2.5 : 2.5}deg)`)
                }
              >
                {/* Image */}
                <div className="relative overflow-hidden h-44 sm:h-52">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="320px"
                  />

                  {/* Category badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold
                                uppercase tracking-widest rounded-lg text-white
                                bg-gradient-to-r ${categoryColors[project.category] ?? "from-primary/80 to-primary/60"}
                                backdrop-blur-sm`}
                  >
                    {project.category}
                  </span>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-primary/85 backdrop-blur-sm
                                flex items-center justify-center gap-5
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live demo"
                      className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center
                                 text-white hover:bg-white/35 transition-colors duration-200"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center
                                 text-white hover:bg-white/35 transition-colors duration-200"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-foreground mb-1.5 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}