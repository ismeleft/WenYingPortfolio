"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { DarkModeToggle } from "./DarkModeToggle";

/**
 * ThemedNav - 根據主題渲染不同風格的導航列
 */
export function ThemedNav() {
  const { currentTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
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
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/changelog">Changelog</NavLink>

            {/* Dark Mode Toggle - 只在 Minimal 主題顯示 */}
            <DarkModeToggle />
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
