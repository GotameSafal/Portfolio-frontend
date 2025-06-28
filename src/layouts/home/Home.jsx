import React from "react";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/Projects";
import Workplace from "./components/WorkPlace";
import Footer from "./components/Footer";
import AboutSection from "./components/About";
import Contacts from "./components/Contacts";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <Workplace />
      <Contacts />
      <Footer />
    </main>
  );
};

export default Home;
