"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WORDS = ["Hello", "Bonjour", "Ciao", "Olá", "やあ", "Hej", "Hallo"];

interface Props {
  onComplete: () => void;
}

type Dimensions = {
  w: number;
  h: number;
};

export default function Preloader({ onComplete }: Props) {
  const [wordIndex, setWordIndex] = useState(0);

  const [dim, setDim] = useState<Dimensions>(() => {
    if (typeof window === "undefined") {
      return { w: 0, h: 0 };
    }

    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setDim({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (wordIndex === WORDS.length - 1) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }

    const delay = wordIndex === 0 ? 800 : 130;
    const timer = setTimeout(() => {
      setWordIndex((i) => i + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [wordIndex, onComplete]);

  const { w, h } = dim;

  const initialPath =
    w > 0
      ? `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`
      : "M0 0";

  const targetPath =
    w > 0
      ? `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`
      : "M0 0";

  return (
    <motion.div
      initial={{ top: "0%" }}
      exit={{
        top: "-100%",
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
          delay: 0.15,
        },
      }}
      className="fixed inset-0 z-[200] flex select-none items-center justify-center"
      style={{ background: "#080812" }}
    >
      {w > 0 && (
        <>
          <motion.p
            key={wordIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
            className="relative z-10 font-heading text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: "rgb(0,220,170)" }}
          >
            <span
              className="mr-4 inline-block h-2.5 w-2.5 align-middle rounded-full"
              style={{ background: "rgb(0,220,170)" }}
            />
            {WORDS[wordIndex]}
          </motion.p>

          <svg
            className="pointer-events-none absolute left-0 top-0"
            style={{ width: w, height: h + 300 }}
          >
            <motion.path
              initial={{ d: initialPath }}
              exit={{
                d: targetPath,
                transition: {
                  duration: 0.7,
                  ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
                  delay: 0.25,
                },
              }}
              fill="#080812"
            />
          </svg>

          <div
            className="absolute bottom-8 right-8 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest"
            style={{ color: "rgb(0,220,170,0.5)" }}
          >
            <span style={{ color: "rgba(0,220,170,0.5)" }}>
              Loading portfolio
            </span>
            <span
              className="animate-pulse"
              style={{ color: "rgb(0,220,170)" }}
            >
              •
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}