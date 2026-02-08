"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedSection } from "@/Components/shared/AnimatedSection";

/**
 * MinimalBlogPost - 極簡雜誌風格的文章頁面
 */
export default function MinimalBlogPost({ post }) {
  return (
    <div className="min-h-screen py-24 px-4">
      <article className="max-w-prose mx-auto" style={{ maxWidth: "75ch" }}>
        {/* 返回按鈕 */}
        <AnimatedSection>
          <Link href="/blog">
            <motion.div
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 mb-12 text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </motion.div>
          </Link>
        </AnimatedSection>

        {/* 文章標題 */}
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              {post.title}
            </h1>

            <time
              className="text-sm font-medium tracking-wider uppercase"
              style={{ color: "var(--color-textSecondary)" }}
            >
              {post.date}
            </time>
          </motion.div>
        </AnimatedSection>

        {/* 文章內容 */}
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="minimal-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </AnimatedSection>

        {/* 返回按鈕（底部）*/}
        <AnimatedSection>
          <Link href="/blog">
            <motion.div
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 mt-16 text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </motion.div>
          </Link>
        </AnimatedSection>
      </article>
    </div>
  );
}
