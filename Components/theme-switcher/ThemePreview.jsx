"use client";

import { motion } from "framer-motion";

/**
 * ThemePreview - 主題預覽卡片
 * 顯示主題的視覺風格預覽
 */
export function ThemePreview({ theme, isActive, onClick, delay = 0 }) {
  const colors = theme.colors.light;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-2xl p-6 text-left transition-all ${
        isActive
          ? "ring-4 ring-offset-2"
          : "ring-1 ring-gray-200 hover:ring-2"
      }`}
      style={{
        backgroundColor: colors.background,
        ringColor: isActive ? colors.primary : undefined,
      }}
    >
      {/* 選中指示器 */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}

      {/* 主題名稱 */}
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: colors.text }}
      >
        {theme.name}
      </h3>

      {/* 主題描述 */}
      <p
        className="text-sm mb-4"
        style={{ color: colors.textSecondary }}
      >
        {theme.description}
      </p>

      {/* 色彩預覽 */}
      <div className="flex gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-full shadow-sm"
          style={{ backgroundColor: colors.primary }}
          title="主色"
        />
        {colors.secondary && (
          <div
            className="w-8 h-8 rounded-full shadow-sm"
            style={{ backgroundColor: colors.secondary }}
            title="輔助色"
          />
        )}
        {colors.tertiary && (
          <div
            className="w-8 h-8 rounded-full shadow-sm"
            style={{ backgroundColor: colors.tertiary }}
            title="第三色"
          />
        )}
        <div
          className="w-8 h-8 rounded-full shadow-sm"
          style={{ backgroundColor: colors.accent }}
          title="強調色"
        />
      </div>

      {/* 視覺化預覽 */}
      <div className="space-y-2">
        {/* 模擬卡片 */}
        <div
          className="h-12 rounded-lg shadow-sm"
          style={{
            backgroundColor: colors.surface,
            boxShadow: theme.styles.cardShadow,
            borderRadius: theme.styles.borderRadius,
          }}
        />
        {/* 模擬文字區塊 */}
        <div className="space-y-1">
          <div
            className="h-2 w-3/4 rounded"
            style={{ backgroundColor: colors.text, opacity: 0.3 }}
          />
          <div
            className="h-2 w-1/2 rounded"
            style={{ backgroundColor: colors.textSecondary, opacity: 0.2 }}
          />
        </div>
      </div>
    </motion.button>
  );
}
