"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { DarkModeToggle } from "./DarkModeToggle";
import { useLanguage } from "./LanguageContext";
import { translations } from "@/data/translations";

/**
 * ThemedNav - 根據主題渲染不同風格的導航列
 */
export function ThemedNav() {
  const { currentTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md nav-background"
      style={{
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.h1
              className="text-2xl font-bold cursor-pointer"
              style={{ color: "var(--color-primary)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yings
            </motion.h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <NavLink href="/blog">{t.blog}</NavLink>
            <NavLink href="/changelog">{t.changelog}</NavLink>
            <DarkModeToggle />
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium px-3 py-1 rounded-full border-2 transition-all"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
            >
              {language === "zh" ? "EN" : "中"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

/**
 * NavLink - 導航連結元件
 */
function NavLink({ href, children }) {
  return (
    <Link href={href}>
      <motion.span
        className="text-lg font-medium cursor-pointer relative"
        style={{ color: "var(--color-text)" }}
        whileHover={{ color: "var(--color-primary)" }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5"
          style={{ backgroundColor: "var(--color-primary)" }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
    </Link>
  );
}
