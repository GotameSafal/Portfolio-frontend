import { motion } from "framer-motion";
import {
  Code,
  Database,
  Download,
  Github,
  Linkedin,
  Send,
  Server,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const SkillBadge = ({ icon: Icon, label, ContainerRef }) => (
  <motion.div
    drag
    dragConstraints={ContainerRef}
    dragElastic={1}
    whileHover={{ scale: 1.05 }}
    className="flex cursor-grab items-center gap-2 px-3 py-1 border rounded-full bg-white/10 backdrop-blur-md border-white/20"
  >
    <Icon size={16} className="text-blue-400" />
    <span className="text-sm text-white">{label}</span>
  </motion.div>
);

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState("");
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const roles = useMemo(
    () => ["Full-Stack Developer", "Web Architect", "Front-End Developer"],
    []
  );

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentRole(roles[index]);
      index = (index + 1) % roles.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [roles]);

  const handleClick = () => {
    const pdfUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Safal_Gotame_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle smooth scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contacts");
    if (contactSection) {
      // Add animation class for highlight effect
      contactSection.classList.add("contact-highlight");

      // Smooth scroll to the contact section
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Remove highlight effect after animation completes
      setTimeout(() => {
        contactSection.classList.remove("contact-highlight");
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>

      {/* Floating Tech Elements */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          y: [-50, 0, -50],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 text-white/20"
      >
        <Code size={100} strokeWidth={1} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: [50, 0, 50],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-20 text-white/20"
      >
        <Server size={120} strokeWidth={1} />
      </motion.div>

      <div className="container relative z-10 grid items-center min-h-screen gap-12 px-6 py-12 mx-auto md:grid-cols-2">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-white"
          ref={contentRef}
        >
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight md:text-5xl"
            >
              Safal Gotame
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-12 text-2xl text-blue-300 md:text-3xl"
            >
              {currentRole}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl leading-relaxed text-gray-300"
          >
            Passionate about building scalable web applications that solve
            real-world problems. Combining cutting-edge technologies with
            innovative design to create seamless digital experiences.
          </motion.p>

          {/* Tech Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-2"
          >
            {[
              { icon: Code, label: "React" },
              { icon: Server, label: "Node.js" },
              { icon: Database, label: "MongoDB" },
              { icon: Database, label: "PostgreSQL" },
            ].map((skill, index) => (
              <SkillBadge
                ContainerRef={contentRef}
                key={index}
                icon={skill.icon}
                label={skill.label}
              />
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 group"
            >
              <Send
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span>Hire Me</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="flex items-center gap-2 px-6 py-3 text-white transition-colors rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 group"
            >
              <Download
                size={20}
                className="group-hover:translate-y-1 transition-transform"
              />
              <span>Resume</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex mt-6 space-x-4"
          >
            <motion.a
              href="https://github.com/GotameSafal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-white transition-colors hover:text-blue-400"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/safal-gotame-1a8730266"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-white transition-colors hover:text-blue-400"
            >
              <Linkedin size={24} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={1}
            className="relative cursor-grab overflow-hidden border-4 rounded-full shadow-2xl w-80 h-80 border-blue-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30 mix-blend-overlay"></div>

            <div
              className="w-full transition-all duration-300 filter grayscale hover:grayscale-0 h-full size-[300px] "
              style={{
                background: "url(/my.png) no-repeat center center / cover",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
