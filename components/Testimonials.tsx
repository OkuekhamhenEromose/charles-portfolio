// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
// import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     text: "Charles has an exceptional eye for detail. He approaches UI/UX challenges with creativity while ensuring performance and accessibility aren't compromised. What stands out most is his consistency — he always delivers with precision and a positive attitude, even under tight deadlines.",
//     image: "/img/testimonials/brightnwachukwu.jpeg",
//     name: "Bright Nwachukwu",
//     post: "Product/Project Management | Software Engineering",
//   },
//   {
//     id: 2,
//     text: "Charles is more than just a talented developer — he's a professional who uplifts the entire team. His calm approach under pressure, willingness to mentor others, and ability to translate technical concepts into simple terms make him a rare asset.",
//     image: "/img/testimonials/enoch olisa.jpeg",
//     name: "Enoch Olisa",
//     post: "Software Quality Engineer | Test Automation",
//   },
//   {
//     id: 3,
//     text: "Charles is the kind of engineer every team needs. He's collaborative, reliable, and never shies away from responsibility. Beyond writing excellent code, he brings energy to discussions and motivates others to push their limits.",
//     image: "/img/testimonials/monicaholmsremmen.jpeg",
//     name: "Monica Holm-Remmen",
//     post: "Recruiter & Career Consultant",
//   },
//   {
//     id: 4,
//     text: "What I admire most about Charles is his resilience and curiosity. He doesn't just stop at solving a bug — he digs deeper to understand why it happened and how to prevent it. That mindset reflects his commitment to sustainable solutions.",
//     image: "/img/testimonials/samuelokpe.jpeg",
//     name: "Samuel Okpe",
//     post: "Software Engineer | Business Enthusiast",
//   },
//   {
//     id: 5,
//     text: "I've seen very few engineers who embrace learning as quickly and effectively as Charles. Whether it's mastering new frameworks, adopting best practices, or diving into DevOps tools, he adapts seamlessly and excels.",
//     image: "/img/testimonials/michaelojemoron.jpeg",
//     name: "Michael Ojemoron",
//     post: "Cloud Architect | MERN Stack | Python/Django | AI",
//   },
//   {
//     id: 6,
//     text: "Working with Charles has been an absolute privilege. His ability to break down complex problems into clear, scalable solutions shows not only strong technical skills but also a deep understanding of software engineering principles.",
//     image: "/img/testimonials/nathanielnosa.jpeg",
//     name: "Nathaniel Nosa",
//     post: "Full-Stack Developer | TypeScript | Django | MERN",
//   },
// ];

// // FIX #7 — Framer Motion requires ease bezier curves to be typed as a 4-tuple,
// // not a plain number[]. Using `as const` on the array satisfies the `Easing` constraint.
// // The variants also can't be typed as `Variants` because the custom function variant
// // doesn't fit the Variants index signature — so we type it correctly as a plain object
// // and pass it directly; Framer Motion accepts this at runtime.
// const enterTransition: Transition = {
//   duration: 0.5,
//   ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
// };
// const exitTransition: Transition = {
//   duration: 0.3,
//   ease: "easeIn" as const,
// };

// // Custom variant object — typed inline rather than as Variants to allow function values
// const slideVariants = {
//   enter: (d: number) => ({ opacity: 0, x: d * 60 }),
//   center: { opacity: 1, x: 0, transition: enterTransition },
//   exit: (d: number) => ({ opacity: 0, x: d * -60, transition: exitTransition }),
// };

// export default function Testimonials() {
//   const [active, setActive] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const go = (next: number, dir: number) => {
//     setDirection(dir);
//     setActive(next);
//   };

//   const prev = () => go((active - 1 + testimonials.length) % testimonials.length, -1);
//   const next = () => go((active + 1) % testimonials.length, 1);

//   const startAuto = () => {
//     stopAuto();
//     intervalRef.current = setInterval(() => {
//       setDirection(1);
//       setActive((a) => (a + 1) % testimonials.length);
//     }, 5500);
//   };

//   const stopAuto = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   useEffect(() => {
//     startAuto();
//     return stopAuto;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const current = testimonials[active];

//   return (
//     <section className="relative py-24 overflow-hidden">
//       <div
//         aria-hidden
//         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
//                    w-[500px] h-[500px] bg-primary/5 blur-[110px] pointer-events-none rounded-full"
//       />

//       <div className="container mx-auto max-w-4xl px-6 sm:px-10 relative z-10">
//         {/* Heading */}
//         <motion.div
//           className="text-center mb-14"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//         >
//           <span className="section-tag mb-4 inline-flex">Kind Words</span>
//           <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-foreground mt-4">
//             What People <span className="gradient-text">Say</span>
//           </h2>
//         </motion.div>

//         {/* Card */}
//         <div className="relative">
//           <Quote className="absolute -top-6 -left-2 sm:-left-8 w-16 h-16 text-primary/10" aria-hidden />

//           <div className="glass-card p-8 sm:p-12 relative overflow-hidden min-h-[280px]">
//             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={current.id}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 className="relative z-10"
//               >
//                 <p className="text-base sm:text-lg text-foreground/80 italic leading-relaxed mb-8">
//                   &ldquo;{current.text}&rdquo;
//                 </p>

//                 <div className="flex items-center gap-4">
//                   <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
//                     <Image
//                       src={current.image}
//                       alt={current.name}
//                       fill
//                       className="object-cover"
//                       sizes="56px"
//                     />
//                   </div>
//                   <div>
//                     <h4 className="font-heading font-bold text-foreground text-sm sm:text-base">
//                       {current.name}
//                     </h4>
//                     <p className="text-xs sm:text-sm text-muted-foreground">{current.post}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Navigation */}
//           <div className="flex items-center justify-between mt-6">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => { prev(); startAuto(); }}
//                 aria-label="Previous testimonial"
//                 className="p-2.5 rounded-full border border-border bg-card/60
//                            hover:border-primary/50 hover:bg-accent transition-all duration-200"
//               >
//                 <ChevronLeft className="w-4 h-4 text-foreground" />
//               </button>
//               <button
//                 onClick={() => { next(); startAuto(); }}
//                 aria-label="Next testimonial"
//                 className="p-2.5 rounded-full border border-border bg-card/60
//                            hover:border-primary/50 hover:bg-accent transition-all duration-200"
//               >
//                 <ChevronRight className="w-4 h-4 text-foreground" />
//               </button>
//             </div>

//             {/* Dot indicators */}
//             <div className="flex gap-2">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => { go(i, i > active ? 1 : -1); startAuto(); }}
//                   aria-label={`Testimonial ${i + 1}`}
//                   className={`transition-all duration-300 rounded-full ${
//                     i === active
//                       ? "w-6 h-2.5 bg-primary"
//                       : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
//                   }`}
//                 />
//               ))}
//             </div>

//             <span className="text-xs text-muted-foreground font-mono">
//               {String(active + 1).padStart(2, "0")} /{" "}
//               {String(testimonials.length).padStart(2, "0")}
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }







"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Testimonials data ──────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    text: "Charles has an exceptional eye for detail. He approaches UI/UX challenges with creativity while ensuring performance and accessibility aren't compromised. What stands out most is his consistency — he always delivers with precision and a positive attitude, even under tight deadlines.",
    image: "/img/testimonials/brightnwachukwu.jpeg",
    name: "Bright Nwachukwu",
    post: "Product/Project Management · Software Engineering",
  },
  {
    id: 2,
    text: "Charles is more than just a talented developer — he's a professional who uplifts the entire team. His calm approach under pressure and ability to translate technical concepts into simple terms make him a rare asset.",
    image: "/img/testimonials/enoch olisa.jpeg",
    name: "Enoch Olisa",
    post: "Software Quality Engineer · Test Automation",
  },
  {
    id: 3,
    text: "Charles is the kind of engineer every team needs. He's collaborative, reliable, and never shies away from responsibility. Beyond writing excellent code, he brings energy to discussions and motivates others to push their limits.",
    image: "/img/testimonials/monicaholmsremmen.jpeg",
    name: "Monica Holm-Remmen",
    post: "Recruiter & Career Consultant",
  },
  {
    id: 4,
    text: "What I admire most about Charles is his resilience and curiosity. He doesn't just stop at solving a bug — he digs deeper to understand why it happened and how to prevent it in future. That mindset reflects his commitment to sustainable solutions.",
    image: "/img/testimonials/samuelokpe.jpeg",
    name: "Samuel Okpe",
    post: "Software Engineer · Business Enthusiast",
  },
  {
    id: 5,
    text: "I've seen very few engineers who embrace learning as quickly as Charles. Whether it's mastering new frameworks, adopting best practices, or diving into DevOps tools, he adapts seamlessly and excels every time.",
    image: "/img/testimonials/michaelojemoron.jpeg",
    name: "Michael Ojemoron",
    post: "Cloud Architect · MERN · Python/Django · AI",
  },
  {
    id: 6,
    text: "Working with Charles has been an absolute privilege. His ability to break down complex problems into clear, scalable solutions shows not only strong technical skills but also a deep understanding of software engineering principles.",
    image: "/img/testimonials/nathanielnosa.jpeg",
    name: "Nathaniel Nosa",
    post: "Full-Stack Developer · TypeScript · Django · MERN",
  },
];

/* ── Company logos ─────────────────────────────────────── */
// Place logo files in /public/img/logos/
// Using text-based fallbacks with brand colours so it works out-of-the-box
const companies = [
  { name: "AWS",      logo: "/img/logos/aws.jpeg",      fallback: "AWS",      color: "#FF9900" },
  { name: "Google",   logo: "/img/logos/google.png",    fallback: "Google",   color: "#4285F4" },
  { name: "Paystack", logo: "/img/logos/paystack.png",  fallback: "Paystack", color: "#00C3F7" },
  { name: "LinkedIn", logo: "/img/logos/linkedin.png",  fallback: "LinkedIn", color: "#0A66C2" },
  { name: "Kuda",     logo: "/img/logos/kuda.png",      fallback: "Kuda",     color: "#9B59B6" },
  { name: "Dangote",  logo: "/img/logos/dangote.png",   fallback: "Dangote",  color: "#E74C3C" },
];

/* ── Typed animation helpers ─────────────────────────────── */
const enterTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};
const exitTransition: Transition = {
  duration: 0.3,
  ease: "easeIn" as const,
};

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 70, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1, transition: enterTransition },
  exit:  (d: number) => ({ opacity: 0, x: d * -70, scale: 0.96, transition: exitTransition }),
};

/* ── Component ───────────────────────────────────────────── */
export default function Testimonials() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setActive(next);
  };
  const prev = () => go((active - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => go((active + 1) % testimonials.length, 1);

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActive((a) => (a + 1) % testimonials.length);
    }, 5500);
  };
  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = testimonials[active];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">

      {/* Large ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2
                   w-[700px] h-[600px] bg-primary/5 blur-[130px] pointer-events-none rounded-full"
      />

      <div className="container mx-auto max-w-5xl px-6 sm:px-10 relative z-10">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <span className="section-tag mb-5 inline-flex">Kind Words</span>

          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black
                          text-foreground mt-4 leading-none tracking-tight">
            What People{" "}
            <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        {/* ── Testimonial card ── */}
        <div className="relative mb-20">

          {/* Oversized decorative quote mark */}
          <div className="absolute -top-8 -left-4 sm:-left-10 pointer-events-none select-none">
            <Quote className="w-20 h-20 sm:w-28 sm:h-28 text-primary/8" />
          </div>

          <div className="glass-card relative overflow-hidden">

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]
                            bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-transparent pointer-events-none" />

            <div className="p-8 sm:p-14 min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative z-10"
                >
                  {/* Quote text */}
                  <p className="text-lg sm:text-xl md:text-2xl font-heading font-medium
                                 text-foreground/85 leading-relaxed mb-10 italic">
                    &ldquo;{current.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden
                                    border-2 border-primary/40 shadow-[0_0_20px_rgb(var(--primary)/0.2)]">
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground text-base sm:text-lg">
                        {current.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {current.post}
                      </p>
                    </div>

                    {/* Counter — right aligned */}
                    <span className="ml-auto font-mono text-3xl font-black text-foreground/8 select-none">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-7 px-1">
            {/* Prev / Next */}
            <div className="flex gap-3">
              <button
                onClick={() => { prev(); startAuto(); }}
                aria-label="Previous"
                className="p-3 rounded-full border border-border bg-card/60
                           hover:border-primary/60 hover:bg-accent hover:scale-105
                           transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={() => { next(); startAuto(); }}
                aria-label="Next"
                className="p-3 rounded-full border border-border bg-card/60
                           hover:border-primary/60 hover:bg-accent hover:scale-105
                           transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { go(i, i > active ? 1 : -1); startAuto(); }}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-7 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            {/* Fraction counter */}
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Companies section ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          {/* Heading */}
          <div className="text-center mb-10">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Companies in contact with
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
            </div>
          </div>

          {/* Logo grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            {companies.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="glass-card p-4 flex items-center justify-center
                           aspect-video hover:border-primary/40
                           hover:shadow-[0_0_20px_rgb(var(--primary)/0.12)]
                           transition-all duration-300 group cursor-default"
              >
                {/* Try image first, fall back to styled text */}
                <div className="relative w-full h-10 flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain filter grayscale opacity-50
                               group-hover:grayscale-0 group-hover:opacity-100
                               transition-all duration-400"
                    sizes="120px"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                  />
                  {/* Fallback text shown via sibling visibility if image fails */}
                  <span
                    className="absolute inset-0 flex items-center justify-center
                                font-heading font-black text-sm tracking-wider
                                opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                    style={{ color: company.color }}
                  >
                    {company.fallback}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}