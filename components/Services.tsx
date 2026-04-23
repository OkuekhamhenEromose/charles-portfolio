// "use client";

// import { motion, type Variants } from "framer-motion";
// import Link from "next/link"; // FIX #2 — next/link for internal navigation
// import {
//   FaPalette, FaCode, FaMobile, FaServer, FaCloud, FaDatabase,
// } from "react-icons/fa";
// import { ArrowUpRight } from "lucide-react";

// const services = [
//   {
//     id: 1,
//     icon: FaPalette,
//     title: "UI/UX & Creative Design",
//     desc: "Intuitive, user-centered interfaces that combine aesthetics with functionality to engage and convert users.",
//     tag: "Design",
//   },
//   {
//     id: 2,
//     icon: FaCode,
//     title: "Full-Stack Development",
//     desc: "End-to-end development from responsive frontends to powerful backends, APIs, and databases.",
//     tag: "Development",
//   },
//   {
//     id: 3,
//     icon: FaMobile,
//     title: "Responsive & Cross-Device",
//     desc: "Websites and apps that adapt seamlessly across all devices, ensuring consistent speed and performance.",
//     tag: "Frontend",
//   },
//   {
//     id: 4,
//     icon: FaServer,
//     title: "Scalable Architecture",
//     desc: "Systems engineered to scale efficiently, handle traffic growth, and maintain performance under load.",
//     tag: "Backend",
//   },
//   {
//     id: 5,
//     icon: FaCloud,
//     title: "Cloud & DevOps",
//     desc: "Deployment on AWS, containerization with Docker, and CI/CD pipelines for faster, reliable delivery.",
//     tag: "Cloud",
//   },
//   {
//     id: 6,
//     icon: FaDatabase,
//     title: "Database Management",
//     desc: "Designing, optimizing, and maintaining SQL/NoSQL databases for secure, efficient data handling.",
//     tag: "Data",
//   },
// ];

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
// };

// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 40, scale: 0.94 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", duration: 0.7, bounce: 0.3 },
//   },
// };

// export default function Services() {
//   return (
//     <section className="relative py-24 overflow-hidden">
//       <div
//         aria-hidden
//         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
//                    w-[700px] h-[500px] bg-primary/4 blur-[120px] pointer-events-none rounded-full"
//       />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//         >
//           <span className="section-tag mb-4 inline-flex">What I Offer</span>
//           <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-foreground mt-4">
//             My <span className="gradient-text">Services</span>
//           </h2>
//           <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
//             From concept to deployment — full-spectrum engineering and design
//             services tailored to your goals.
//           </p>
//         </motion.div>

//         {/* Grid */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {services.map((item) => {
//             const Icon = item.icon;
//             return (
//               <motion.div
//                 key={item.id}
//                 variants={cardVariants}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 className="glass-card p-6 group cursor-default
//                            hover:border-primary/40 hover:shadow-xl
//                            hover:shadow-primary/5 transition-all duration-300
//                            flex flex-col gap-4 relative overflow-hidden"
//               >
//                 {/* Background number */}
//                 <span className="absolute top-4 right-5 font-heading font-black text-5xl text-primary/5 pointer-events-none select-none">
//                   0{item.id}
//                 </span>

//                 {/* Tag */}
//                 <span className="self-start text-[10px] font-bold uppercase tracking-widest
//                                   text-primary bg-primary/10 px-3 py-1 rounded-full">
//                   {item.tag}
//                 </span>

//                 {/* Icon */}
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center
//                                 bg-muted/60 group-hover:bg-primary transition-colors duration-300">
//                   <Icon className="text-lg text-primary group-hover:text-primary-foreground transition-colors duration-300" />
//                 </div>

//                 {/* Content */}
//                 <div>
//                   <h3 className="font-heading text-lg font-bold text-foreground mb-2
//                                   group-hover:text-primary transition-colors duration-300">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-muted-foreground leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </div>

//                 {/* FIX #2 — next/link instead of <a> for internal routes */}
//                 <Link
//                   href="/#portfolio"
//                   className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold
//                                text-primary opacity-0 group-hover:opacity-100 transition-all duration-300
//                                hover:underline underline-offset-2"
//                 >
//                   See examples <ArrowUpRight className="w-3 h-3" />
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }




"use client";

import { motion, type Variants, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  FaPalette, FaCode, FaMobile, FaServer, FaCloud, FaDatabase,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    icon: FaPalette,
    title: "UI/UX & Creative Design",
    desc: "Intuitive, user-centered interfaces that combine aesthetics with functionality to engage and convert users.",
    tag: "Design",
    accent: "from-pink-500/20 to-rose-500/10",
    iconBg: "group-hover:bg-pink-500",
  },
  {
    id: 2,
    icon: FaCode,
    title: "Full-Stack Development",
    desc: "End-to-end development from responsive frontends to powerful backends, APIs, and databases.",
    tag: "Engineering",
    accent: "from-primary/20 to-cyan-500/10",
    iconBg: "group-hover:bg-primary",
  },
  {
    id: 3,
    icon: FaMobile,
    title: "Responsive & Cross-Device",
    desc: "Websites and apps that adapt seamlessly across all devices with consistent speed and performance.",
    tag: "Frontend",
    accent: "from-blue-500/20 to-indigo-500/10",
    iconBg: "group-hover:bg-blue-500",
  },
  {
    id: 4,
    icon: FaServer,
    title: "Scalable Architecture",
    desc: "Systems engineered to handle traffic growth and maintain high performance under load.",
    tag: "Backend",
    accent: "from-violet-500/20 to-purple-500/10",
    iconBg: "group-hover:bg-violet-500",
  },
  {
    id: 5,
    icon: FaCloud,
    title: "Cloud & DevOps",
    desc: "AWS deployments, Docker containerisation, and CI/CD pipelines for fast, reliable delivery.",
    tag: "Cloud",
    accent: "from-amber-500/20 to-orange-500/10",
    iconBg: "group-hover:bg-amber-500",
  },
  {
    id: 6,
    icon: FaDatabase,
    title: "Database Management",
    desc: "Designing, optimising, and maintaining SQL/NoSQL databases for secure, efficient data handling.",
    tag: "Data",
    accent: "from-emerald-500/20 to-teal-500/10",
    iconBg: "group-hover:bg-emerald-500",
  },
];

/* ── Card variant with stagger ─────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.93 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", duration: 0.75, bounce: 0.25 },
  },
};

/* ── Component ─────────────────────────────────────────── */
export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-12 overflow-hidden">

      {/* Background glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[800px] h-[600px] rounded-full
                   bg-primary/4 blur-[130px] pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <span className="section-tag mb-2 inline-flex">What I Offer</span>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black text-foreground mt-3 leading-none tracking-tight">
            My <span className="gradient-text">Services</span>
          </h2>

          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base leading-relaxed">
            From concept to cloud — full-spectrum engineering and design tailored to your goals.
          </p>
        </motion.div>

        {/* ── Services grid ── */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-7 group cursor-default relative overflow-hidden
                           hover:border-primary/50
                           hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                           transition-all duration-400 flex flex-col gap-5"
              >
                {/* Gradient shimmer on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent}
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Large background number */}
                <span
                  className="absolute bottom-3 right-4 font-heading font-black
                               text-[6rem] leading-none text-foreground/[0.03]
                               pointer-events-none select-none"
                >
                  {String(item.id).padStart(2, "0")}
                </span>

                {/* Tag pill */}
                <span className="relative self-start text-[10px] font-bold uppercase tracking-[0.15em]
                                  text-primary bg-primary/10 px-3 py-1 rounded-full
                                  group-hover:bg-primary/20 transition-colors duration-300">
                  {item.tag}
                </span>

                {/* Icon container */}
                <div
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center
                               bg-muted/70 ${item.iconBg}
                               transition-all duration-400 shadow-sm
                               group-hover:shadow-lg group-hover:scale-110`}
                >
                  <Icon
                    className="text-xl text-primary group-hover:text-white
                                transition-colors duration-300"
                  />
                </div>

                {/* Text */}
                <div className="relative flex flex-col gap-2">
                  <h3
                    className="font-heading text-xl font-bold text-foreground
                                group-hover:text-primary transition-colors duration-300 leading-tight"
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* See examples link — reveals on hover */}
                <Link
                  href="/#portfolio"
                  className="relative mt-auto inline-flex items-center gap-1.5 text-xs font-bold
                               text-primary uppercase tracking-wider
                               opacity-0 group-hover:opacity-100
                               translate-y-2 group-hover:translate-y-0
                               transition-all duration-300 hover:underline underline-offset-2"
                >
                  See examples <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}