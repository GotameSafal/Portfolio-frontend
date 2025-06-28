import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  CopyCheck,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Sparkles,
  Lightbulb,
  Rocket,
  X,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SkillsSection } from "./Skills";
const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="p-4 sm:p-6 flex items-end col-span-3 row-span-2 bg-gradient-to-b from-gray-700 to-gray-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.15 : 0.05,
        }}
        transition={{ duration: 0.8 }}
      />
      <img
        src="assets/coding-pov.png"
        className="absolute scale-[1.5] -right-[5rem] -top-[1rem] md:scale-[2.5] md:right-0 lg:scale-[2.2] opacity-70 sm:opacity-100"
      />
      <div className="z-10 space-y-3 sm:space-y-4 w-full">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl font-bold text-white"
        >
          {`Hi, I'm Safal Gotame`}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-gray-200"
        >
          Over the last 2 years, I developed my frontend and backend dev skills
          to deliver dynamic software and web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-2 sm:gap-3 pt-3 sm:pt-4"
        >
          <motion.a
            href="https://github.com/GotameSafal"
            target="_blank"
            whileHover={{ y: -5, scale: 1.05 }}
            className="p-1.5 sm:p-2 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <Github size={18} className="text-white sm:size-[20px]" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/safal-gotame-1a8730266"
            target="_blank"
            whileHover={{ y: -5, scale: 1.05 }}
            className="p-1.5 sm:p-2 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <Linkedin size={18} className="text-white sm:size-[20px]" />
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ y: -5, scale: 1.05 }}
            className="p-1.5 sm:p-2 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <ExternalLink size={18} className="text-white sm:size-[20px]" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};
export const LetsConnect = () => {
  const [copyState, setCopyState] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const email = "lamichhanem36@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopyState(true);
    setTimeout(() => {
      setCopyState(false);
    }, 2000);
  };

  return (
    <motion.div
      className="bg-gradient-to-b col-span-2 from-indigo-800 to-indigo-700 text-white flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 relative overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ opacity: isHovered ? 0.3 : 0.2 }}
      >
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-indigo-300 rounded-full blur-xl"
          animate={{
            x: isHovered ? 10 : 0,
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-20 h-20 bg-purple-400 rounded-full blur-xl"
          animate={{
            x: isHovered ? -10 : 0,
            y: isHovered ? 10 : 0,
          }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      <motion.p
        className="text-center text-lg sm:text-xl font-medium relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Start a project together?
      </motion.p>

      <motion.button
        onClick={copyToClipboard}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 1.05 }}
        className="ring-1 w-[10rem] sm:w-[12rem] rounded-full py-2 sm:py-3 px-4 sm:px-5 ring-indigo-400 bg-black/30 backdrop-blur-sm overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {copyState ? (
            <motion.p
              key="copied"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="flex items-center w-full justify-center gap-1 sm:gap-2"
            >
              <CopyCheck size={14} className="text-green-400 sm:size-[16px]" />
              <span className="text-xs sm:text-sm font-medium">
                Email Copied
              </span>
            </motion.p>
          ) : (
            <motion.p
              initial={{ y: -5 }}
              animate={{ y: 0 }}
              key="copy"
              exit={{ y: -5 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="flex items-center w-full justify-center gap-1 sm:gap-2"
            >
              <Copy size={14} className="sm:size-[16px]" />
              <span className="text-xs sm:text-sm font-medium">Copy Email</span>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        className="text-xs text-indigo-200 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        I'll get back to you within 24 hours
      </motion.p>
    </motion.div>
  );
};

// Process Modal Component
const ProcessModal = ({ isOpen, onClose }) => {
  const steps = [
    {
      title: "Discovery & Planning",
      icon: <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-300" />,
      description:
        "Understanding requirements, defining scope, and planning architecture.",
    },
    {
      title: "Design & Prototyping",
      icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-300" />,
      description:
        "Creating wireframes, designing UI/UX, and building interactive prototypes.",
    },
    {
      title: "Development",
      icon: <Code className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300" />,
      description:
        "Writing clean, maintainable code with modern frameworks and best practices.",
    },
    {
      title: "Testing & Optimization",
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-300" />,
      description:
        "Rigorous testing, performance optimization, and accessibility improvements.",
    },
    {
      title: "Deployment & Maintenance",
      icon: <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-red-300" />,
      description:
        "Smooth deployment, continuous integration, and ongoing support.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 sm:p-6 max-w-xs sm:max-w-md md:max-w-2xl w-full shadow-2xl border border-gray-700 my-8 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                My Development Process
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto pr-1">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 sm:gap-4"
                >
                  <div className="relative">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 border border-gray-700">
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute top-8 sm:top-10 left-1/2 w-0.5 h-8 sm:h-12 bg-gradient-to-b from-gray-700 to-transparent -translate-x-1/2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {step.description}
                    </p>

                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                      {index === 0 && (
                        <>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            Requirements Gathering
                          </span>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            User Research
                          </span>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            Figma
                          </span>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            Wireframing
                          </span>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            React
                          </span>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            Node.js
                          </span>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            Jest
                          </span>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            Lighthouse
                          </span>
                        </>
                      )}
                      {index === 4 && (
                        <>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            CI/CD
                          </span>
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                            Vercel
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8 text-center"
            >
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg text-white text-sm sm:text-base font-medium hover:from-cyan-500 hover:to-cyan-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AboutSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [hoverApproach, setHoverApproach] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const cards = [
    {
      icon: <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-300" />,
      title: "Creative Solutions",
      description:
        "Turning complex problems into elegant, intuitive interfaces and experiences.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300" />,
      title: "Innovation Focus",
      description:
        "Constantly exploring new technologies and approaches to stay ahead of trends.",
    },
    {
      icon: <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-blue-300" />,
      title: "Rapid Delivery",
      description:
        "Efficient development practices that bring ideas to life quickly without sacrificing quality.",
    },
  ];

  // Auto-switch carousel cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000); // Change card every 4 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  // Approach section features
  const approachFeatures = [
    { text: "User-Centered Design", delay: 0 },
    { text: "Performance Optimization", delay: 0.1 },
    { text: "Responsive Layouts", delay: 0.2 },
    { text: "Accessibility", delay: 0.3 },
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-8 sm:py-12 md:py-16 overflow-hidden px-4 sm:px-6">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="md:grid space-y-4 md:space-y-0 grid-cols-1 max-w-screen-lg mx-auto w-full sm:grid-cols-2 md:grid-cols-6 gap-4 my-6 sm:my-8 md:my-12 md:auto-rows-[18rem] *:rounded-xl *:w-full *:h-full relative z-10">
        <About />

        {/* Enhanced My Approach section */}
        <motion.div
          className="col-span-1 sm:col-span-2 md:col-span-3 bg-gradient-to-b from-cyan-800 to-cyan-900 p-4 sm:p-6 flex flex-col justify-center relative overflow-hidden"
          onHoverStart={() => setHoverApproach(true)}
          onHoverEnd={() => setHoverApproach(false)}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              scale: hoverApproach ? 1.2 : 1,
              opacity: hoverApproach ? 0.2 : 0.1,
              x: hoverApproach ? -20 : 0,
            }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              scale: hoverApproach ? 1.1 : 1,
              opacity: hoverApproach ? 0.15 : 0.05,
              y: hoverApproach ? -10 : 0,
            }}
            transition={{ duration: 0.8 }}
          />

          <div className="relative z-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3"
            >
              My Approach
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-cyan-100 mb-3 sm:mb-4"
            >
              I build responsive, accessible applications with modern frameworks
              and clean code practices. My focus is on creating intuitive user
              experiences that solve real problems.
            </motion.p>

            {/* Feature tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-1.5 sm:gap-2 mt-2"
            >
              {approachFeatures.map((feature, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + feature.delay }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-white/10 backdrop-blur-sm rounded-full text-cyan-100 border border-cyan-500/30 flex items-center"
                >
                  <motion.span
                    animate={{
                      opacity: hoverApproach ? 1 : 0.7,
                    }}
                    className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 mr-1 sm:mr-2"
                  />
                  {feature.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Interactive button - now opens modal */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowProcessModal(true)}
              className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-cyan-100 border border-cyan-400/30 rounded-lg bg-white/5 backdrop-blur-sm flex items-center gap-1.5 sm:gap-2"
            >
              <Code size={14} className="sm:size-[16px]" />
              <span>View My Process</span>
              <motion.span
                animate={{
                  x: hoverApproach ? 5 : 0,
                  opacity: hoverApproach ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={12} className="sm:size-[14px]" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Interactive Card Carousel with auto-switching */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 bg-gradient-to-b from-purple-900 to-indigo-900 p-4 sm:p-6 overflow-hidden relative">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400 rounded-full blur-3xl"
              animate={{
                x: [0, -10, 0],
                y: [0, 10, 0],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4"
            >
              What I Bring
            </motion.h3>

            {/* Card Carousel */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-white/20"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg">
                      {cards[activeCard].icon}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">
                        {cards[activeCard].title}
                      </h4>
                      <p className="text-purple-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
                        {cards[activeCard].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {cards.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveCard(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      activeCard === index ? "bg-white" : "bg-white/30"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <LetsConnect />
        <SkillsSection />
      </div>

      {/* Process Modal */}
      <ProcessModal
        isOpen={showProcessModal}
        onClose={() => setShowProcessModal(false)}
      />
    </section>
  );
};

export default AboutSection;
