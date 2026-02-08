"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { AnimatedSection, AnimatedList, AnimatedListItem } from "@/Components/shared/AnimatedSection";
import { GeometricBackground, FloatingShape } from "./GeometricShapes";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

/**
 * Signature 主題 - 首頁
 * 品牌個性化設計，使用抽象幾何圖形作為視覺識別
 */
export function SignatureHome() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* 幾何背景 */}
      <GeometricBackground />

      {/* 內容層 */}
      <div className="relative z-10">
        {/* Hero Section - 不對稱佈局 */}
        <section className="min-h-screen flex items-center px-4 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* 左側：大標題 + 介紹 */}
              <motion.div style={{ y: y1 }}>
                <AnimatedSection animation={fadeInLeft} className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <div
                      className="inline-block px-4 py-2 rounded-full mb-6"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        opacity: 0.2
                      }}
                    >
                      <span
                        className="text-sm font-bold tracking-wider uppercase"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Frontend Developer
                      </span>
                    </div>

                    <h1
                      className="text-7xl md:text-8xl font-bold leading-none mb-6"
                      style={{ color: "var(--color-text)" }}
                    >
                      Wen
                      <br />
                      <span
                        className="italic"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Ying
                      </span>
                    </h1>

                    <p
                      className="text-2xl leading-relaxed max-w-xl"
                      style={{ color: "var(--color-textSecondary)" }}
                    >
                      Crafting digital experiences with
                      <span style={{ color: "var(--color-primary)" }}> elegance</span>,
                      <span style={{ color: "var(--color-secondary)" }}> creativity</span>, and
                      <span style={{ color: "var(--color-tertiary)" }}> precision</span>.
                    </p>
                  </motion.div>

                  {/* CTA 按鈕 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4 pt-4"
                  >
                    <motion.a
                      href="https://drive.google.com/drive/folders/14RJ3rXDTk4ROtZqLvOWJRjA_QghcZbbV?usp=sharing"
                      target="_blank"
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 rounded-2xl font-semibold overflow-hidden"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white"
                      }}
                    >
                      <span className="relative z-10">Download CV</span>
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ scale: 0, opacity: 0.3 }}
                        whileHover={{ scale: 1.5, opacity: 0.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.a>

                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-2xl font-semibold border-2"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-text)"
                      }}
                    >
                      Let's Talk
                    </motion.a>
                  </motion.div>

                  {/* 社交連結 */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-4 pt-6"
                  >
                    <SocialButton href="https://www.linkedin.com/in/wen-ying-chen/" icon="/linkedin-logo.png" />
                    <SocialButton href="https://github.com/ismeleft" icon="/github-mark.png" />
                  </motion.div>
                </AnimatedSection>
              </motion.div>

              {/* 右側：圖片 + 裝飾 */}
              <motion.div style={{ y: y2 }} className="relative">
                <AnimatedSection animation={fadeInRight}>
                  <div className="relative">
                    {/* 背景裝飾 */}
                    <motion.div
                      className="absolute -inset-8 rounded-[3rem] -z-10"
                      style={{
                        background: "var(--color-gradient)",
                        opacity: 0.5
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* 主圖片 */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.4 }}
                      className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                      <Image
                        src="/plumeria.png"
                        width={500}
                        height={500}
                        alt="Plumeria flower"
                        className="w-full h-auto"
                      />
                    </motion.div>

                    {/* 浮動裝飾元素 */}
                    <FloatingShape
                      type="circle"
                      size={80}
                      color="var(--color-secondary)"
                      opacity={0.4}
                      className="-top-8 -right-8"
                      duration={15}
                    />
                    <FloatingShape
                      type="triangle"
                      size={60}
                      color="var(--color-tertiary)"
                      opacity={0.4}
                      className="-bottom-6 -left-6"
                      duration={18}
                    />
                  </div>
                </AnimatedSection>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="mb-20">
              <motion.div
                className="inline-block px-6 py-3 rounded-full mb-8"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  opacity: 0.2
                }}
              >
                <span
                  className="text-sm font-bold tracking-wider uppercase"
                  style={{ color: "var(--color-secondary)" }}
                >
                  About Me
                </span>
              </motion.div>

              <h2
                className="text-5xl md:text-6xl font-bold mb-8"
                style={{ color: "var(--color-text)" }}
              >
                Journey & Vision
              </h2>

              <p
                className="text-xl leading-relaxed max-w-3xl"
                style={{ color: "var(--color-textSecondary)" }}
              >
                With over five years of cross-domain experience as a sales assistant,
                I have honed my skills in solving complex problems. These experiences
                have laid a solid foundation for my journey into front-end development,
                especially in continuous learning and tackling technological challenges.
              </p>
            </AnimatedSection>

            {/* Info Grid - 不對稱佈局 */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Education */}
              <AnimatedListItem delay={0.1} className="md:col-span-2">
                <InfoCard
                  icon="/education.png"
                  title="Education"
                  gradient="from-purple-400 to-pink-400"
                >
                  <p style={{ color: "var(--color-textSecondary)" }}>
                    <span className="font-semibold">Chung Yuan Christian University</span>
                    <br />
                    Department of Psychology
                    <br />
                    <span className="text-sm">2013 - 2017</span>
                  </p>
                </InfoCard>
              </AnimatedListItem>

              {/* Experience Highlight */}
              <AnimatedListItem delay={0.2}>
                <InfoCard
                  icon="/skills.png"
                  title="5+ Years"
                  gradient="from-blue-400 to-cyan-400"
                >
                  <p className="text-sm" style={{ color: "var(--color-textSecondary)" }}>
                    Cross-domain experience in problem-solving
                  </p>
                </InfoCard>
              </AnimatedListItem>

              {/* Skills */}
              <AnimatedListItem delay={0.3} className="md:col-span-3">
                <div
                  className="p-8 rounded-3xl"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "var(--card-shadow)"
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
                    Skills & Expertise
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Frontend", items: ["React.js", "Next.js", "JavaScript", "TypeScript"] },
                      { label: "Styling", items: ["Tailwind CSS", "Material UI", "CSS3", "Responsive"] },
                      { label: "Backend", items: ["Python Flask", "MySQL", "Firebase", "REST API"] },
                      { label: "Tools", items: ["Git", "GitHub", "AWS EC2", "Vercel"] }
                    ].map((category, idx) => (
                      <motion.div
                        key={category.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <h4
                          className="font-bold mb-3 text-sm"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {category.label}
                        </h4>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li
                              key={item}
                              className="text-sm"
                              style={{ color: "var(--color-textSecondary)" }}
                            >
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedListItem>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * InfoCard - 資訊卡片元件
 */
function InfoCard({ icon, title, gradient, children }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full p-8 rounded-3xl"
      style={{
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--card-shadow)"
      }}
    >
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}
      >
        <Image src={icon} width={28} height={28} alt="" />
      </div>
      <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

/**
 * SocialButton - 社交連結按鈕
 */
function SocialButton({ href, icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="w-14 h-14 rounded-2xl flex items-center justify-center"
      style={{
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--card-shadow)"
      }}
    >
      <Image src={icon} width={28} height={28} alt="" />
    </motion.a>
  );
}
