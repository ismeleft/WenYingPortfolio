"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/Components/shared/AnimatedSection";

const changelogData = [
  {
    version: "v0.0.3",
    date: "2024-06",
    changes: [
      "新增部落格文章分頁",
      "利用 Material UI Pagination 作為分頁樣式"
    ]
  },
  {
    version: "v0.0.2",
    date: "2024-04",
    changes: [
      "利用 highlight.js 新增程式碼高亮功能"
    ]
  },
  {
    version: "v0.0.1",
    date: "2024-02-07",
    changes: [
      "更改網站 layout",
      "新增部落格以及 Changelog"
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 頁面標題 */}
        <AnimatedSection className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-6xl md:text-7xl font-bold mb-6"
              style={{ color: "var(--color-text)" }}
            >
              Changelog
            </h1>
            <p
              className="text-xl"
              style={{ color: "var(--color-textSecondary)" }}
            >
              以下是有關這個網站的更新紀錄 🙂
            </p>
          </motion.div>
        </AnimatedSection>

        {/* 更新時間軸 */}
        <div className="space-y-12">
          {changelogData.map((entry, index) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* 時間軸線條（除了最後一個）*/}
              {index !== changelogData.length - 1 && (
                <div
                  className="absolute left-[19px] top-12 w-px h-full"
                  style={{ backgroundColor: "var(--color-border)" }}
                />
              )}

              <div className="flex gap-8">
                {/* 版本點 */}
                <div className="flex-shrink-0 pt-1">
                  <motion.div
                    className="w-10 h-10 rounded-full border-4 flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-primary)"
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    />
                  </motion.div>
                </div>

                {/* 內容 */}
                <div className="flex-1 pb-8">
                  {/* 版本和日期 */}
                  <div className="mb-4">
                    <h2
                      className="text-2xl font-bold mb-2"
                      style={{ color: "var(--color-text)" }}
                    >
                      {entry.version}
                    </h2>
                    <time
                      className="text-sm font-medium tracking-wider uppercase"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {entry.date}
                    </time>
                  </div>

                  {/* 更新內容 */}
                  <ul className="space-y-3">
                    {entry.changes.map((change, changeIndex) => (
                      <motion.li
                        key={changeIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + changeIndex * 0.05 + 0.2 }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        />
                        <span
                          className="text-lg leading-relaxed"
                          style={{ color: "var(--color-textSecondary)" }}
                        >
                          {change}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
