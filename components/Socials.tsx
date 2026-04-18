"use client";

import { motion, type Variants } from "framer-motion";
import { ImFacebook, ImTwitter, ImGithub, ImLinkedin } from "react-icons/im";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
};

const socialLinks = [
  {
    href: "https://www.facebook.com/eromose.eromose.1",
    icon: ImFacebook,
    color: "#3b5998",
    label: "Facebook",
  },
  {
    href: "https://x.com/EhiEromoCharles",
    icon: ImTwitter,
    color: "#55acee",
    label: "Twitter",
  },
  {
    href: "https://github.com/OkuekhamhenEromose",
    icon: ImGithub,
    color: "currentColor",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/eromosele-charles-152181337/",
    icon: ImLinkedin,
    color: "#007bb6",
    label: "LinkedIn",
  },
];

interface SocialsProps {
  className?: string;
  isVertical?: boolean;
}

export default function Socials({ className = "", isVertical = false }: SocialsProps) {
  return (
    <div className={className}>
      <motion.ul
        className={`flex ${isVertical ? "flex-col gap-y-1" : "gap-x-1"} items-center`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <motion.li key={social.label} variants={itemVariants}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`${
                  isVertical
                    ? "flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent w-full"
                    : "flex items-center justify-center p-2.5 rounded-full hover:bg-accent"
                } transition-all duration-300 group`}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.93 }}
              >
                <IconComponent
                  className="text-xl transition-colors duration-300"
                  style={{ color: social.color }}
                />
                {isVertical && (
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {social.label}
                  </span>
                )}
              </motion.a>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}