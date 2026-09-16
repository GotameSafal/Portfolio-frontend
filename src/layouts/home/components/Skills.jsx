import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDocker,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiMui,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { Layers } from "lucide-react";

// Map skill name -> icon component + color
const skillConfig = [
  { key: "react", name: "React", icon: FaReact, color: "#61DAFB", desc: "Component-driven interfaces & state architectures" },
  { key: "nextjs", name: "Next.js", icon: SiNextdotjs, color: "#ffffff", desc: "SSR, ISR, Server Actions, & production routing" },
  { key: "ts", name: "TypeScript", icon: SiTypescript, color: "#3178C6", desc: "Strict end-to-end type safety across client & server" },
  { key: "js", name: "JavaScript (ES6+)", icon: SiJavascript, color: "#F7DF1E", desc: "Core asynchronous programming & DOM manipulation" },
  { key: "nodejs", name: "Node.js", icon: FaNodeJs, color: "#339933", desc: "High-throughput asynchronous event-driven runtimes" },
  { key: "express", name: "Express.js", icon: SiExpress, color: "#ffffff", desc: "RESTful endpoints, middleware chains, & security layers" },
  { key: "mongodb", name: "MongoDB", icon: SiMongodb, color: "#47A248", desc: "NoSQL schema modeling, aggregation pipelines, & indexing" },
  { key: "mysql", name: "MySQL", icon: GrMysql, color: "#00758F", desc: "Relational database structuring & ACID transactions" },
  { key: "docker", name: "Docker", icon: FaDocker, color: "#2496ED", desc: "Containerized reproducible build & deployment environments" },
  { key: "github", name: "GitHub & CI/CD", icon: FaGithub, color: "#ffffff", desc: "Collaborative Git workflows, automated pipelines, & PR audits" },
  { key: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", desc: "Utility-first responsive layouts & design systems" },
  { key: "firebase", name: "Firebase", icon: SiFirebase, color: "#FFCA28", desc: "Cloud auth, storage buckets, & real-time telemetry" },
];

export const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const activeSkillObj = skillConfig.find((s) => s.key === hoveredSkill);

  const icons = (size = 24, reverse = false) => {
    const list = reverse ? [...skillConfig].reverse() : skillConfig;
    return list.map(({ key, icon: Icon, color }) => (
      <motion.div
        key={key}
        whileHover={{ scale: 1.25 }}
        onHoverStart={() => setHoveredSkill(key)}
        onHoverEnd={() => setHoveredSkill(null)}
        className="cursor-pointer bg-neutral-950 p-2 rounded-xl border border-neutral-800 shadow-md flex items-center justify-center shrink-0 hover:border-blue-500/50 transition-colors"
      >
        <Icon size={size} color={color} />
      </motion.div>
    ));
  };

  return (
    <div className="w-full rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row shadow-xl transition-all duration-300">
      {/* Subtle background ambient lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content description side */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Technical Arsenal
            </span>
          </div>

          <h4 className="font-extrabold text-xl sm:text-2xl text-white">
            Core Languages, Frameworks & Infrastructure
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Engineered with modern toolchains to ensure high velocity, type safety, low latency, and zero-compromise security.
          </p>
        </div>

        {/* Skill details box */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 min-h-[4.5rem] flex items-center">
          {activeSkillObj ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-neutral-950/80 p-3 rounded-xl border border-neutral-800"
            >
              <h5 className="font-bold text-xs text-blue-400 flex items-center gap-2">
                <span>{activeSkillObj.name}</span>
              </h5>
              <p className="text-xs text-neutral-300 mt-1">
                {activeSkillObj.desc}
              </p>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-neutral-700 animate-pulse" />
              <span>Hover over any rotating technology to inspect capability</span>
            </div>
          )}
        </div>
      </div>

      {/* Orbiting visualizer side */}
      <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden flex items-center justify-center min-h-[16rem] z-10 bg-neutral-950/20 border-t md:border-t-0 md:border-l border-neutral-800/60">
        <div className="absolute inset-0 flex items-center justify-center scale-95">
          {/* Inner ring */}
          <OrbitingCircles iconSize={28} radius={55} speed={1.5}>
            {icons(18)}
          </OrbitingCircles>

          {/* Outer ring */}
          <OrbitingCircles iconSize={28} radius={105} reverse speed={1.2}>
            {icons(18, true)}
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
