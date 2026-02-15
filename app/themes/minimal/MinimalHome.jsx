"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection, AnimatedList, AnimatedListItem } from "@/Components/shared/AnimatedSection";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { DarkModeToggle } from "@/Components/shared/DarkModeToggle";
import { projects } from "@/data/projects";
import { useLanguage } from "@/Components/shared/LanguageContext";
import { translations } from "@/data/translations";

/**
 * Minimal 主題 - 首頁
 * 現代極簡主義設計
 */
export function MinimalHome() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
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
                {t.hero.role}
              </motion.div>

              <h1
                className="text-6xl md:text-7xl font-bold leading-tight"
                style={{ color: "var(--color-text)" }}
              >
                {t.hero.greeting}
                <br />
                <span style={{ color: "var(--color-primary)" }}>Wen Ying</span>
              </h1>

              <p
                className="text-xl leading-relaxed max-w-lg"
                style={{ color: "var(--color-textSecondary)" }}
              >
                {t.hero.bio}
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
                  {t.hero.downloadCv}
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
                  {t.hero.contactMe}
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
              {t.about.label}
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              {t.about.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation={fadeInUp} className="mb-16">
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto" style={{ color: "var(--color-textSecondary)" }}>
              {t.about.bio}
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
                  {t.about.education}
                </h3>
                <div style={{ color: "var(--color-textSecondary)" }}>
                  <p className="mb-2">{t.about.educationDate}</p>
                  <p className="font-medium">{t.about.educationSchool}</p>
                  <p>{t.about.educationDept}</p>
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
                  {t.about.skills}
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
              {t.experience.label}
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              {t.experience.title}
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
                  {t.experience.webTrainee}
                </h3>
                <p style={{ color: "var(--color-textSecondary)" }}>
                  {t.experience.webTraineeDate}
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
                  {t.experience.salesAssistant}
                </h3>
                <p style={{ color: "var(--color-textSecondary)" }}>
                  {t.experience.salesAssistantDate}
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
              {t.projects.label}
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              {t.projects.title}
            </h2>
          </AnimatedSection>

          <AnimatedList className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {projects.map((project) => (
              <AnimatedListItem key={project.id}>
                <div
                  className="p-8 rounded-2xl border text-center flex flex-col h-full"
                  style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                >
                  <div className="relative w-full mb-6" style={{ aspectRatio: "3/2" }}>
                    <Image
                      src={project.thumbnail}
                      fill
                      alt={`${project.title} project`}
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
                    {project.title}
                  </h3>
                  <p className="mb-4" style={{ color: "var(--color-textSecondary)" }}>
                    {language === "zh" ? project.description : project.descriptionEn}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-textSecondary)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 justify-center mt-auto">
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg font-medium border-2"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-text)",
                      }}
                    >
                      {t.projects.liveDemo}
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg font-medium"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                      }}
                    >
                      {t.projects.github}
                    </motion.a>
                  </div>
                </div>
              </AnimatedListItem>
            ))}
          </AnimatedList>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: "var(--color-primary)" }}>
              {t.contact.label}
            </p>
            <h2 className="text-5xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
              {t.contact.title}
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
