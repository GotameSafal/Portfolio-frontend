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

// Map skill name -> icon component + color
const skillConfig = [
  { key: "html", icon: FaHtml5, color: "#E34F26" },
  { key: "css", icon: FaCss3Alt, color: "#1572B6" },
  { key: "js", icon: SiJavascript, color: "#F7DF1E" },
  { key: "ts", icon: SiTypescript, color: "#3178C6" },
  { key: "react", icon: FaReact, color: "#61DAFB" },
  { key: "nextjs", icon: SiNextdotjs, color: "#ffffff" },
  { key: "nodejs", icon: FaNodeJs, color: "#339933" },
  { key: "express", icon: SiExpress, color: "#ffffff" },
  { key: "mongodb", icon: SiMongodb, color: "#47A248" },
  { key: "mysql", icon: GrMysql, color: "#00758F" },
  { key: "github", icon: FaGithub, color: "#ffffff" },
  { key: "docker", icon: FaDocker, color: "#2496ED" },
  { key: "firebase", icon: SiFirebase, color: "#FFCA28" },
  { key: "tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { key: "mui", icon: SiMui, color: "#007FFF" },
];

export const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const icons = (size = 24, reverse = false) => {
    const list = reverse ? [...skillConfig].reverse() : skillConfig;
    return list.map(({ key, icon: Icon, color }) => (
      <motion.div
        key={key}
        whileHover={{ scale: 1.25 }}
        onHoverStart={() => setHoveredSkill(key)}
        onHoverEnd={() => setHoveredSkill(null)}
        className="cursor-pointer bg-slate-950/80 p-1.5 rounded-full border border-white/5 shadow-md flex items-center justify-center shrink-0"
      >
        <Icon size={size} color={color} />
      </motion.div>
    ));
  };

  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-4 bg-slate-900/60 border border-white/5 backdrop-blur-md rounded-2xl relative overflow-hidden flex flex-col md:flex-row h-full min-h-[18rem] md:min-h-0">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content side */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 text-white space-y-3 p-6 flex flex-col justify-between relative z-10"
      >
        <div className="space-y-2">
          <h4 className="font-bold text-lg text-white">Tech Stack</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            I specialize in modern technologies and tools that enable the development of high-performance web applications.
          </p>
        </div>

        {/* Skill details box */}
        <div className="h-16 flex items-center">
          {hoveredSkill ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white/5 backdrop-blur-xs px-3 py-2 rounded-xl border border-white/10"
            >
              <h5 className="font-semibold text-xs text-blue-400 capitalize">
                {hoveredSkill === "js"
                  ? "JavaScript"
                  : hoveredSkill === "ts"
                  ? "TypeScript"
                  : hoveredSkill === "nextjs"
                  ? "Next.js"
                  : hoveredSkill === "nodejs"
                  ? "Node.js"
                  : hoveredSkill === "mui"
                  ? "Material UI"
                  : hoveredSkill}
              </h5>
              <p className="text-[10px] text-gray-300 truncate mt-0.5">
                {hoveredSkill === "html" && "Semantic markup for structural content"}
                {hoveredSkill === "css" && "Styling and layout with modern CSS"}
                {hoveredSkill === "js" && "Dynamic client-side programming"}
                {hoveredSkill === "ts" && "Type-safe JavaScript development"}
                {hoveredSkill === "react" && "Component-based UI development"}
                {hoveredSkill === "nextjs" && "React framework for production"}
                {hoveredSkill === "nodejs" && "JavaScript runtime for backend"}
                {hoveredSkill === "express" && "Web framework for Node.js"}
                {hoveredSkill === "mongodb" && "NoSQL document database"}
                {hoveredSkill === "mysql" && "Relational database management"}
                {hoveredSkill === "github" && "Version control and collaboration"}
                {hoveredSkill === "docker" && "Containerization for deployment"}
                {hoveredSkill === "firebase" && "App development platform"}
                {hoveredSkill === "tailwind" && "Utility-first CSS framework"}
                {hoveredSkill === "mui" && "React UI component library"}
              </p>
            </motion.div>
          ) : (
            <p className="text-[10px] text-gray-500 italic">
              Hover over any icon to view details
            </p>
          )}
        </div>
      </motion.div>

      {/* Orbiting icons side */}
      <div className="w-full md:w-1/2 relative h-48 md:h-full overflow-hidden flex items-center justify-center min-h-[12rem] z-10">
        <div className="absolute inset-0 flex items-center justify-center scale-95">
          {/* Inner ring */}
          <OrbitingCircles iconSize={26} radius={50} speed={1.5}>
            {icons(18)}
          </OrbitingCircles>

          {/* Outer ring */}
          <OrbitingCircles iconSize={26} radius={90} reverse speed={1.2}>
            {icons(18, true)}
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
};
