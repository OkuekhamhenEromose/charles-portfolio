import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  display: "swap",
});

const margareth = localFont({
  src: "./fonts/MargarethRosinante-Regular.woff2",
  variable: "--font-signature",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charles Eromose | Full Stack Engineer",
  description:
    "Full Stack Engineer building scalable web apps, APIs, cloud solutions, and motion-rich digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  window.scrollTo(0, 0);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head> */}
      <body
        className={`${inter.variable} ${clashDisplay.variable} ${margareth.variable} ${firaCode.variable} font-body antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}