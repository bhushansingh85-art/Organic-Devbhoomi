"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.body.classList.toggle("dark", isDark);
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyThemeClass(initial);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore storage errors
    }
    applyThemeClass(theme);
  }, [theme, initialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
