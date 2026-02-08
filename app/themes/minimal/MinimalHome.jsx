"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection, AnimatedList, AnimatedListItem } from "@/Components/shared/AnimatedSection";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { DarkModeToggle } from "@/Components/shared/DarkModeToggle";

/**
 * Minimal 主題 - 首頁
 * 現代極簡主義設計
 */
export function MinimalHome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 左側：文字內容 */}
            <AnimatedSection animation={fadeInLeft} className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium tracking-wider uppercase"
                style={{ color: "var(--color-primary)" }}
              >
                Frontend Developer
              </motion.div>

              <h1
                className="text-6xl md:text-7xl font-bold leading-tight"
                style={{ color: "var(--color-text)" }}
              >
                Hi, I&apos;m
                <br />
                <span style={{ color: "var(--color-primary)" }}>Wen Ying</span>
              </h1>

              <p
                className="text-xl leading-relaxed max-w-lg"
                style={{ color: "var(--color-textSecondary)" }}
              >
                Building elegant web experiences with modern technologies.
                Passionate about clean code and beautiful design.
              </p>

              {/* CTA 按鈕 */}
              <div className="flex gap-4 pt-4">
                <motion.a
                  href="https://drive.google.com/drive/folders/14RJ3rXDTk4ROtZqLvOWJRjA_QghcZbbV?usp=sharing"
                  target="_blank"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  }}
                >
                  Download CV
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-medium transition-all border-2"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                  }}
                >
                  Contact Me
                </motion.a>
              </div>

              {/* 社交連結 */}
              <div className="flex gap-4 pt-4">
                <motion.a
                  href="https://www.linkedin.com/in/wen-ying-chen/"
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full border"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)"
                  }}
                >
                  <Image src="/linkedin-logo.png" alt="LinkedIn" width={24} height={24} />
                </motion.a>
                <motion.a
                  href="https://github.com/ismeleft"
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full border github-icon-wrapper"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)"
                  }}
                >
                  <Image src="/github-mark.png" alt="GitHub" width={24} height={24} className="github-icon" />
                </motion.a>
              </div>
            </AnimatedSection>

            {/* 右側：圖片（無陰影）*/}
            <AnimatedSection animation={fadeInRight} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src="/plumeria.png"
                  width={400}
                  height={400}
                  alt="Plumeria flower"
                  className="rounded-3xl"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
            style={{ borderColor: "var(--color-border)" }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "var(--color-primary)" }}>
              Get to know more
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              About Me
            </h2>
          </AnimatedSection>

          <AnimatedSection animation={fadeInUp} className="mb-16">
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto" style={{ color: "var(--color-textSecondary)" }}>
              With over five years of cross-domain experience as a sales assistant,
              I have honed my skills in solving complex problems. These experiences
              have laid a solid foundation for my journey into front-end development,
              especially in continuous learning and tackling technological challenges.
            </p>
          </AnimatedSection>

          {/* Info Cards */}
          <AnimatedList className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
            <AnimatedListItem>
              <div
                className="p-8 rounded-2xl border"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--color-primary)", opacity: 0.1 }}
                >
                  <Image src="/education.png" width={24} height={24} alt="Education" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                  Education
                </h3>
                <div style={{ color: "var(--color-textSecondary)" }}>
                  <p className="mb-2">Sep 2013 - June 2017</p>
                  <p className="font-medium">Chung Yuan Christian University</p>
                  <p>Department of Psychology</p>
                </div>
              </div>
            </AnimatedListItem>

            <AnimatedListItem>
              <div
                className="p-8 rounded-2xl border"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--color-primary)", opacity: 0.1 }}
                >
                  <Image src="/skills.png" width={24} height={24} alt="Skills" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                  Skills
                </h3>
                <div className="grid grid-cols-2 gap-6" style={{ color: "var(--color-textSecondary)" }}>
                  <div>
                    <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>Frontend</p>
                    <p className="text-sm leading-relaxed">
                      React.js, Next.js<br />
                      JavaScript, TypeScript<br />
                      Tailwind CSS, Material UI
                    </p>
                  </div>
                  <div>
                    <p className="font-bold mb-2" style={{ color: "var(--color-text)" }}>Other</p>
                    <p className="text-sm leading-relaxed">
                      Git, GitHub<br />
                      Python Flask<br />
                      AWS EC2, Firebase
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedListItem>
          </AnimatedList>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "var(--color-primary)" }}>
              Explore My
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              Experience
            </h2>
          </AnimatedSection>

          <AnimatedList className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
            <AnimatedListItem>
              <div
                className="p-8 rounded-2xl border text-center"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto"
                  style={{ backgroundColor: "var(--color-primary)", opacity: 0.1 }}
                >
                  <Image src="/coding.png" width={24} height={24} alt="Coding" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                  Web Trainee
                </h3>
                <p style={{ color: "var(--color-textSecondary)" }}>
                  Jul 2023 - Dec 2023
                  <br />
                  Wehelp Bootcamp 4th
                </p>
              </div>
            </AnimatedListItem>

            <AnimatedListItem>
              <div
                className="p-8 rounded-2xl border text-center"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto"
                  style={{ backgroundColor: "var(--color-primary)", opacity: 0.1 }}
                >
                  <Image src="/company.png" width={24} height={24} alt="Company" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                  Sales Assistant
                </h3>
                <p style={{ color: "var(--color-textSecondary)" }}>
                  Jul 2018 - Nov 2023
                  <br />
                  Max Vantage WH CO. LTD
                </p>
              </div>
            </AnimatedListItem>
          </AnimatedList>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "var(--color-primary)" }}>
              Browse My
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              Projects
            </h2>
          </AnimatedSection>

          <AnimatedList className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
            <AnimatedListItem>
              <div
                className="p-8 rounded-2xl border text-center flex flex-col"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <Image
                  src="/1.png"
                  width={300}
                  height={300}
                  alt="GratifyME project"
                  className="mx-auto mb-6 rounded-xl"
                />
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
                  GratifyME
                </h3>
                <p className="mb-6" style={{ color: "var(--color-textSecondary)" }}>
                  A Gratitude Journal Web Application
                </p>
                <div className="flex gap-3 justify-center mt-auto">
                  <motion.a
                    href="https://gratifyme.vercel.app/"
                    target="_blank"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg font-medium border-2"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href="https://github.com/ismeleft/gratifyme"
                    target="_blank"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg font-medium"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                    }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </AnimatedListItem>

            <AnimatedListItem>
              <div
                className="p-8 rounded-2xl border text-center flex flex-col"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <Image
                  src="/2.png"
                  width={300}
                  height={300}
                  alt="Taipei Day Trip project"
                  className="mx-auto mb-6 rounded-xl"
                />
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
                  Taipei-Day-Trip
                </h3>
                <p className="mb-6" style={{ color: "var(--color-textSecondary)" }}>
                  An e-commerce website about Taipei tourism.
                </p>
                <div className="flex gap-3 justify-center mt-auto">
                  <motion.a
                    href="http://52.192.139.251:3000/"
                    target="_blank"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg font-medium border-2"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href="https://github.com/ismeleft/taipei-day-trip"
                    target="_blank"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg font-medium"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                    }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </AnimatedListItem>
          </AnimatedList>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "var(--color-primary)" }}>
              Get in Touch
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              Contact Me
            </h2>
          </AnimatedSection>

          <AnimatedSection animation={fadeInUp}>
            <motion.a
              href="mailto:leftleft0813@gmail.com"
              whileHover={{ scale: 1.02, y: -4 }}
              className="flex items-center justify-center gap-4 p-6 rounded-2xl border max-w-md mx-auto"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)"
              }}
            >
              <Image src="/email.png" width={32} height={32} alt="Email" />
              <span className="text-lg" style={{ color: "var(--color-text)" }}>
                leftleft0813@gmail.com
              </span>
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
