import type { Metadata } from "next";
import { Syne, DM_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charles Eromose | Full Stack Engineer",
  description:
    "Full Stack Engineer with 4+ years of experience building scalable web apps, APIs, and cloud solutions. Specializing in React, Next.js, Django, Node.js, AWS.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Django",
    "TypeScript",
    "Charles Eromose",
  ],
  authors: [{ name: "Charles Eromose Okuekhahmen" }],
  openGraph: {
    title: "Charles Eromose | Full Stack Engineer",
    description: "Portfolio of Charles Eromose — Full Stack Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${firaCode.variable} font-body antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}