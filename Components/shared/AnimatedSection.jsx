"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp } from "@/lib/animations";

/**
 * AnimatedSection - 帶有 scroll 觸發動畫的區塊元件
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子元素
 * @param {Object} props.animation - 動畫配置（預設為 fadeInUp）
 * @param {string} props.className - CSS class
 * @param {number} props.delay - 動畫延遲（秒）
 * @param {boolean} props.once - 是否只播放一次（預設 true）
 * @param {string} props.as - HTML 標籤（預設 'div'）
 */
export function AnimatedSection({
  children,
  animation = fadeInUp,
  className = "",
  delay = 0,
  once = true,
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px", // 提前 100px 觸發動畫
  });

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      transition={{
        ...animation.transition,
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * AnimatedList - 帶有錯開動畫的列表容器
 */
export function AnimatedList({
  children,
  className = "",
  staggerDelay = 0.1,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedListItem - 列表項目
 */
export function AnimatedListItem({
  children,
  animation = fadeInUp,
  className = "",
  ...props
}) {
  return (
    <motion.div
      variants={{
        initial: animation.initial,
        animate: animation.animate,
      }}
      transition={animation.transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
