"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * FloatingShape - 浮動幾何圖形元件
 */
export function FloatingShape({
  type = "circle",
  size = 100,
  color = "var(--color-primary)",
  opacity = 0.6,
  className = "",
  style = {},
  delay = 0,
  duration = 20
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shapeVariants = {
    circle: (
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={color}
        opacity={opacity}
      />
    ),
    triangle: (
      <polygon
        points={`${size / 2},0 ${size},${size} 0,${size}`}
        fill={color}
        opacity={opacity}
      />
    ),
    arc: (
      <path
        d={`M 0 ${size} Q ${size / 2} ${size / 2} ${size} ${size}`}
        fill={color}
        opacity={opacity}
      />
    ),
    ring: (
      <>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill="none"
          stroke={color}
          strokeWidth={size / 10}
          opacity={opacity}
        />
      </>
    ),
    halfCircle: (
      <path
        d={`M 0 ${size / 2} A ${size / 2} ${size / 2} 0 0 1 ${size} ${size / 2} L ${size} ${size} L 0 ${size} Z`}
        fill={color}
        opacity={opacity}
      />
    )
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: mousePosition.x * 0.5,
        y: mousePosition.y * 0.5,
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 0.8, delay },
        x: { duration: 0.5 },
        y: { duration: 0.5 }
      }}
      style={style}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: duration / 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {shapeVariants[type] || shapeVariants.circle}
      </motion.svg>
    </motion.div>
  );
}

/**
 * GeometricBackground - 幾何圖形背景層
 */
export function GeometricBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 左上角 - 大圓形 */}
      <FloatingShape
        type="circle"
        size={300}
        color="var(--color-primary)"
        opacity={0.15}
        style={{ top: "-10%", left: "-5%" }}
        delay={0}
        duration={25}
      />

      {/* 右上角 - 三角形 */}
      <FloatingShape
        type="triangle"
        size={200}
        color="var(--color-secondary)"
        opacity={0.2}
        style={{ top: "5%", right: "10%" }}
        delay={0.2}
        duration={30}
      />

      {/* 左中 - 弧形 */}
      <FloatingShape
        type="arc"
        size={250}
        color="var(--color-tertiary)"
        opacity={0.15}
        style={{ top: "40%", left: "5%" }}
        delay={0.4}
        duration={35}
      />

      {/* 右下 - 環形 */}
      <FloatingShape
        type="ring"
        size={180}
        color="var(--color-primary)"
        opacity={0.25}
        style={{ bottom: "15%", right: "15%" }}
        delay={0.6}
        duration={28}
      />

      {/* 中下 - 半圓 */}
      <FloatingShape
        type="halfCircle"
        size={220}
        color="var(--color-secondary)"
        opacity={0.12}
        style={{ bottom: "5%", left: "30%" }}
        delay={0.8}
        duration={32}
      />

      {/* 小裝飾圓 */}
      <FloatingShape
        type="circle"
        size={80}
        color="var(--color-tertiary)"
        opacity={0.3}
        style={{ top: "60%", right: "25%" }}
        delay={1}
        duration={20}
      />
    </div>
  );
}
