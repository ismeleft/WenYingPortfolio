"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getTheme } from "@/lib/themes";

// 主題上下文
const ThemeContext = createContext({
  themeConfig: null,
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Hook: 使用主題
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// ThemeProvider 元件
export function ThemeProvider({ children }) {
  // 深色模式狀態
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 主題配置（固定使用極簡主題）
  const themeConfig = getTheme();

  // 從 localStorage 載入深色模式偏好
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("portfolio-dark-mode");

    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === "true");
    }
  }, []);

  // 切換深色模式
  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem("portfolio-dark-mode", String(newValue));
  };

  // 將主題配色注入到 CSS 變數
  useEffect(() => {
    const colors = isDarkMode && themeConfig.colors.dark
      ? themeConfig.colors.dark
      : themeConfig.colors.light;

    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // 設定其他樣式變數
    root.style.setProperty("--border-radius", themeConfig.styles.borderRadius);
    root.style.setProperty("--card-shadow", themeConfig.styles.cardShadow);
    root.style.setProperty("--font-family", themeConfig.styles.typography.fontFamily);

    // 設定 body 背景色
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";

    // 設定主題 class
    document.body.className = `theme-minimal ${isDarkMode ? 'dark' : 'light'}`;
  }, [isDarkMode, themeConfig]);

  const value = {
    themeConfig,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        forcedTheme={isDarkMode ? "dark" : "light"}
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}
