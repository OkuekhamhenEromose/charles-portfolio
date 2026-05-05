"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";

type Theme = "dark";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Force dark theme only
  const theme: Theme = "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => {} }}>
      <div className="dark w-full max-w-full overflow-x-hidden">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);