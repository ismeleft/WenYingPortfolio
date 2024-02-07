import Image from "next/image";
import { Nav } from "@/Components/Nav/Nav";
import TopSection from "@/Components/Topsection/TopSection";
import About from "@/Components/About/About";
import Footer from "@/Components/Footer/Footer";
import Experience from "@/Components/Experience/Experience";
import Projects from "@/Components/Projects/Projects";
import Contact from "@/Components/Contact/Contact";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <TopSection />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
