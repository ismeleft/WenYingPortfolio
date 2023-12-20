import Image from "next/image";
import { Nav } from "@/Components/Nav/Nav";
import TopSection from "@/Components/Topsection/TopSection";
import About from "@/Components/About/About";
import Footer from "@/Components/Footer/Footer";
import Experience from "@/Components/Experience/Experience";
import Projects from "@/Components/Projects/Projects";

export default function Home() {
  return (
    <>
      <Nav />
      <TopSection />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </>
  );
}
