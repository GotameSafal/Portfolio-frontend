import GradientText from "@/components/shared/GradientText";
import TextType from "@/components/shared/TextType";
import { motion, useInView } from "framer-motion";
import Particles from "@/components/shared/Particles";
import {
  Code,
  Database,
  Download,
  Github,
  Linkedin,
  Send,
  Server,
  Briefcase,
  GitCommit,
  Star,
} from "lucide-react";
import { useMemo, useRef, useEffect, useState } from "react";

// ── Animated counter that counts up to a number on mount ──────────────────
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ── Reusable stat card ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, suffix, label, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
  >
    <Icon size={16} className={color} />
    <span className={`text-xl font-bold ${color}`}>
      <AnimatedCounter target={value} suffix={suffix} />
    </span>
    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
  </motion.div>
);

// ── Skill badge (non-draggable, cleaner) ─────────────────────────────────────
const SkillBadge = ({ icon: Icon, label }) => (
  <motion.div
    whileHover={{ scale: 1.08, y: -2 }}
    className="flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10 backdrop-blur-md border-white/20"
  >
    <Icon size={16} className="text-blue-400" />
    <span className="text-sm text-white">{label}</span>
  </motion.div>
);

// ── Floating code snippet card ─────────────────────────────────────────────
const FloatingCodeCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4, duration: 0.7 }}
    className="absolute bottom-8 left-8 hidden lg:block z-20 pointer-events-none"
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="bg-gray-900/90 backdrop-blur-md border border-blue-500/30 rounded-xl p-3 font-mono text-xs shadow-2xl shadow-blue-500/10 w-56"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="ml-auto text-gray-600 text-[10px]">portfolio.js</span>
      </div>
      <div className="space-y-1 text-[11px]">
        <div><span className="text-blue-400">const</span> <span className="text-green-400">dev</span> <span className="text-white">=</span> <span className="text-yellow-400">{"{"}</span></div>
        <div className="pl-3"><span className="text-cyan-400">name</span><span className="text-white">:</span> <span className="text-orange-300">"Safal"</span><span className="text-white">,</span></div>
        <div className="pl-3"><span className="text-cyan-400">stack</span><span className="text-white">:</span> <span className="text-orange-300">"FullStack"</span><span className="text-white">,</span></div>
        <div className="pl-3"><span className="text-cyan-400">open</span><span className="text-white">:</span> <span className="text-green-400">true</span></div>
        <div><span className="text-yellow-400">{"}"}</span></div>
      </div>
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const roles = useMemo(
    () => ["Full-Stack Developer", "Web Architect", "Front-End Developer"],
    []
  );

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    // Verify the file exists before triggering download
    fetch("/resume.pdf", { method: "HEAD" }).then((res) => {
      if (!res.ok) {
        alert("Resume is not available yet. Please check back soon!");
        return;
      }
      link.download = "Safal_Gotame_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };


  const scrollToContact = () => {
    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { icon: Briefcase, value: 2, suffix: "+", label: "Years Exp.", color: "text-blue-400" },
    { icon: Star, value: 15, suffix: "+", label: "Projects", color: "text-yellow-400" },
    { icon: GitCommit, value: 600, suffix: "+", label: "Commits", color: "text-green-400" },
  ];

  return (
    <div className="bg-transparent overflow-x-hidden relative h-screen">
      {/* Particles — disabled when user prefers reduced motion */}
      <div className="absolute inset-0 z-0">
        {!window.matchMedia("(prefers-reduced-motion: reduce)").matches && (
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={300}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        )}
      </div>

      {/* Floating decorative icons */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], y: [-50, 0, -50], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 text-white/20 z-5 pointer-events-none"
      >
        <Code size={100} strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], x: [50, 0, 50], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 text-white/20 z-5 pointer-events-none"
      >
        <Server size={120} strokeWidth={1} />
      </motion.div>

      {/* Floating code card */}
      <FloatingCodeCard />

      <div className="container relative z-10 grid items-center h-full gap-12 px-6 py-12 mx-auto md:grid-cols-2">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-white relative z-20"
          ref={contentRef}
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-950/30 text-green-400 text-xs font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for hire
          </motion.div>

          <div className="space-y-3">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-4xl font-bold w-auto tracking-tight md:text-5xl"
            >
              Safal Pariiyar
            </GradientText>

            <TextType
              text={roles}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="_"
              className="text-2xl font-bold tracking-tight md:text-3xl"
            />
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

          {/* Skill badges */}
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
              <SkillBadge key={index} {...skill} />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 relative z-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 group shadow-lg shadow-blue-600/20"
            >
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              <span>Hire Me</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 group transition-colors"
            >
              <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              <span>Resume</span>
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex mt-2 space-x-4 relative z-20"
          >
            <motion.a
              href="https://github.com/GotameSafal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/safal-gotame-1a8730266"
              whileHover={{ scale: 1.2, y: -3 }}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Linkedin size={20} />
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex gap-3 pt-2 relative z-20"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Avatar */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center relative z-20"
        >
          {/* Glowing ring */}
          <div className="absolute w-[22rem] h-[22rem] rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 blur-2xl animate-pulse" />

          {/* Rotating border ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[21rem] h-[21rem] rounded-full border-2 border-dashed border-blue-500/30"
          />

          <div
            aria-label="Profile photo of Safal Gotame"
            role="img"
            className="relative overflow-hidden border-4 rounded-full shadow-2xl w-80 h-80 border-blue-500/50 shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 mix-blend-overlay z-10" />
            <div
              className="w-full h-full transition-all duration-500"
              style={{
                background: "url(/my.png) no-repeat center center / cover",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;