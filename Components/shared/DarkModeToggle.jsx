"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

/**
 * DarkModeToggle - 深色模式切換按鈕
 * 只在 minimal 主題顯示
 */
export function DarkModeToggle({ className = "" }) {
  const { isDarkMode, toggleDarkMode, currentTheme } = useTheme();

  // 只在 minimal 主題顯示深色模式切換
  if (currentTheme !== "minimal") {
    return null;
  }

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${className}`}
      style={{
        backgroundColor: isDarkMode ? "var(--color-primary)" : "#E2E8F0",
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? "切換到淺色模式" : "切換到深色模式"}
    >
      {/* 滑動圓點 */}
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDarkMode ? 28 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* 圖示 */}
        {isDarkMode ? (
          // 月亮圖示
          <svg
            className="w-4 h-4 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          // 太陽圖示
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
