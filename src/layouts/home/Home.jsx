import React from "react";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/Projects";
import Workplace from "./components/WorkPlace";
import Footer from "./components/Footer";
import AboutSection from "./components/About";
import Contacts from "./components/Contacts";

const Home = () => {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-100 relative overflow-hidden font-sans select-none">
      {/* Dynamic ambient mesh glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[50%] left-[20%] w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[70%] right-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] left-[-5%] w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <Workplace />
        <Contacts />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
