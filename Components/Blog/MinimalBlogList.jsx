"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedSection } from "@/Components/shared/AnimatedSection";

const POSTS_PER_PAGE = 8;

/**
 * MinimalBlogList - 極簡雜誌風格的文章列表
 */
export default function MinimalBlogList({ posts }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const displayedPosts = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  // 切換分頁時滾動到頂部
  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      // 使用 setTimeout 確保在狀態更新後執行
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
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
              Blog
            </h1>
            <p
              className="text-xl"
              style={{ color: "var(--color-textSecondary)" }}
            >
              Thoughts, learnings, and reflections on web development
            </p>
          </motion.div>
        </AnimatedSection>

        {/* 文章列表 */}
        <div className="space-y-6">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                >
                  {/* 日期 */}
                  <time
                    className="text-sm font-medium tracking-wider uppercase mb-3 block"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {post.date}
                  </time>

                  {/* 標題 */}
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-4 group-hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-text)" }}
                  >
                    {post.title}
                  </h2>

                  {/* 描述 */}
                  {post.description && (
                    <p
                      className="text-lg leading-relaxed mb-4"
                      style={{ color: "var(--color-textSecondary)" }}
                    >
                      {post.description}
                    </p>
                  )}

                  {/* Read more 連結 */}
                  <span
                    className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Read Article
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </motion.div>
              </Link>

              {/* 極簡分隔線 */}
              <div
                className="mt-5 h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />
            </motion.article>
          ))}
        </div>

        {/* 分頁 */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 flex items-center justify-center gap-4"
          >
            <button
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                color: "var(--color-text)",
                borderWidth: "1px",
                borderColor: "var(--color-border)",
              }}
            >
              Previous
            </button>

            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-textSecondary)" }}
            >
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                color: "var(--color-text)",
                borderWidth: "1px",
                borderColor: "var(--color-border)",
              }}
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
