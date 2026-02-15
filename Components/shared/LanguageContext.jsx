"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("zh");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-language");
    if (saved === "en" || saved === "zh") {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const next = language === "zh" ? "en" : "zh";
    setLanguage(next);
    localStorage.setItem("portfolio-language", next);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
