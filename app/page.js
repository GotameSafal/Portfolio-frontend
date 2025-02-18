import Contacts from "@components/Contacts";
import Footer from "@components/Footer";
import HeroSection from "@components/HeroSection";
import Projects from "@components/Projects";
import SkillSet from "@components/SkillSet";

export default function Pages({ children }) {
  return (
    <main>
      <HeroSection />
      <SkillSet />
      <Projects />
      <Contacts />
      <Footer />
    </main>
  );
}
