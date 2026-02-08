"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/Components/shared/AnimatedSection";

/**
 * Bento Grid 主題 - 首頁
 * 使用 Bento Box 網格佈局設計
 */
export function BentoHome() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 頁面標題 */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              Welcome to My Space
            </h1>
            <p className="text-xl" style={{ color: "var(--color-textSecondary)" }}>
              Frontend Developer • Problem Solver • Lifelong Learner
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Bento Grid 佈局 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Hero Card - 大卡片 */}
          <BentoCard
            className="md:col-span-7 md:row-span-2"
            delay={0}
            bgColor="var(--color-primary)"
          >
            <div className="h-full flex flex-col justify-between p-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80 text-sm font-medium mb-4"
                >
                  Frontend Developer
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                  Hi, I'm Wen Ying
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/90 text-lg leading-relaxed mb-8"
                >
                  Building elegant web experiences with React, Next.js, and modern technologies.
                  Passionate about clean code and beautiful design.
                </motion.p>
              </div>

              {/* CTA 按鈕 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <motion.a
                  href="https://drive.google.com/drive/folders/14RJ3rXDTk4ROtZqLvOWJRjA_QghcZbbV?usp=sharing"
                  target="_blank"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-medium shadow-lg"
                >
                  Download CV
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-white/30 text-white rounded-xl font-medium backdrop-blur-sm"
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </div>
          </BentoCard>

          {/* Profile Image Card */}
          <BentoCard
            className="md:col-span-5"
            delay={0.1}
            bgColor="var(--color-secondary)"
          >
            <div className="h-full flex items-center justify-center p-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/plumeria.png"
                  width={300}
                  height={300}
                  alt="Plumeria flower"
                  className="rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </BentoCard>

          {/* Social Links Card */}
          <BentoCard
            className="md:col-span-5"
            delay={0.2}
            bgColor="var(--color-tertiary)"
          >
            <div className="h-full flex flex-col justify-center p-6">
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                Connect
              </h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/wen-ying-chen/"
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center"
                >
                  <Image src="/linkedin-logo.png" alt="LinkedIn" width={32} height={32} />
                </motion.a>
                <motion.a
                  href="https://github.com/ismeleft"
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center"
                >
                  <Image src="/github-mark.png" alt="GitHub" width={32} height={32} />
                </motion.a>
              </div>
            </div>
          </BentoCard>

          {/* Education Card */}
          <BentoCard
            className="md:col-span-4"
            delay={0.3}
            bgColor="var(--color-surface)"
          >
            <div className="h-full flex flex-col justify-between p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                <Image src="/education.png" width={24} height={24} alt="Education" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
                  Education
                </h3>
                <p className="text-sm" style={{ color: "var(--color-textSecondary)" }}>
                  Chung Yuan Christian University
                  <br />
                  Psychology (2013-2017)
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Skills Card */}
          <BentoCard
            className="md:col-span-8 md:row-span-2"
            delay={0.4}
            bgColor="var(--color-surface)"
          >
            <div className="h-full p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Image src="/skills.png" width={24} height={24} alt="Skills" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                  Skills & Technologies
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { category: "Frontend", skills: ["React.js", "Next.js", "JavaScript", "TypeScript"] },
                  { category: "Styling", skills: ["Tailwind CSS", "Material UI", "CSS3"] },
                  { category: "Tools", skills: ["Git", "GitHub", "VS Code"] },
                  { category: "Backend", skills: ["Python Flask", "MySQL", "Firebase"] },
                  { category: "Cloud", skills: ["AWS EC2", "Vercel"] },
                  { category: "Others", skills: ["REST API", "Responsive Design"] }
                ].map((group, idx) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="space-y-2"
                  >
                    <h4 className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>
                      {group.category}
                    </h4>
                    <ul className="space-y-1">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-sm"
                          style={{ color: "var(--color-textSecondary)" }}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* About Card */}
          <BentoCard
            className="md:col-span-12"
            delay={0.5}
            bgColor="var(--color-surface)"
          >
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
                About Me
              </h3>
              <p className="text-lg leading-relaxed max-w-4xl" style={{ color: "var(--color-textSecondary)" }}>
                With over five years of cross-domain experience as a sales assistant,
                I have honed my skills in solving complex problems. These experiences
                have laid a solid foundation for my journey into front-end development,
                especially in continuous learning and tackling technological challenges.
                Embracing the mantra "stay hungry, stay foolish", I am constantly exploring
                new technologies, committed to ongoing growth in the tech field.
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}

/**
 * BentoCard - Bento Grid 卡片元件
 */
function BentoCard({ children, className = "", delay = 0, bgColor = "var(--color-surface)" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3 }
      }}
      className={`rounded-3xl shadow-lg overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        minHeight: "200px"
      }}
    >
      {children}
    </motion.div>
  );
}
