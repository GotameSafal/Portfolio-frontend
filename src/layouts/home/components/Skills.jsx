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
  { key: "nextjs", icon: SiNextdotjs, color: undefined }, // monochrome
  { key: "nodejs", icon: FaNodeJs, color: "#339933" },
  { key: "express", icon: SiExpress, color: undefined }, // monochrome
  { key: "mongodb", icon: SiMongodb, color: "#47A248" },
  { key: "mysql", icon: GrMysql, color: "#00758F" },
  { key: "github", icon: FaGithub, color: undefined }, // monochrome
  { key: "docker", icon: FaDocker, color: "#2496ED" },
  { key: "firebase", icon: SiFirebase, color: "#FFCA28" },
  { key: "tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { key: "mui", icon: SiMui, color: "#007FFF" },
];

export const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const icons = (size = 30, reverse = false) => {
    const list = reverse ? [...skillConfig].reverse() : skillConfig;
    return list.map(({ key, icon: Icon, color }) => (
      <motion.div
        key={key}
        whileHover={{ scale: 1.2 }}
        onHoverStart={() => setHoveredSkill(key)}
        onHoverEnd={() => setHoveredSkill(null)}
        className="cursor-pointer"
      >
        <Icon size={size} color={color} />
      </motion.div>
    ));
  };

  return (
    <div className="col-span-4 bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
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
        className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
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

      <div className="z-10 w-full h-full flex">
        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/2 text-white space-y-3 p-6 relative"
        >
          <motion.h4
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-semibold text-xl text-gray-200"
          >
            Tech Stack
          </motion.h4>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300"
          >
            I specialize in a variety of languages, frameworks, and tools that
            allow me to build robust and scalable applications.
          </motion.p>

          {/* Skill info that appears when hovering over an icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 h-20"
          >
            {hoveredSkill ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20"
              >
                <h5 className="font-medium text-white capitalize">
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
                <p className="text-sm text-gray-300 mt-1">
                  {hoveredSkill === "html" &&
                    "Semantic markup for structured content"}
                  {hoveredSkill === "css" &&
                    "Styling and layout with modern CSS"}
                  {hoveredSkill === "js" && "Dynamic client-side programming"}
                  {hoveredSkill === "ts" && "Type-safe JavaScript development"}
                  {hoveredSkill === "react" && "Component-based UI development"}
                  {hoveredSkill === "nextjs" &&
                    "React framework for production"}
                  {hoveredSkill === "nodejs" &&
                    "JavaScript runtime for backend"}
                  {hoveredSkill === "express" && "Web framework for Node.js"}
                  {hoveredSkill === "mongodb" && "NoSQL document database"}
                  {hoveredSkill === "mysql" && "Relational database management"}
                  {hoveredSkill === "github" &&
                    "Version control and collaboration"}
                  {hoveredSkill === "docker" &&
                    "Containerization for deployment"}
                  {hoveredSkill === "firebase" && "App development platform"}
                  {hoveredSkill === "tailwind" && "Utility-first CSS framework"}
                  {hoveredSkill === "mui" && "React UI component library"}
                </p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className="text-sm text-gray-400 italic"
              >
                Hover over an icon to learn more about my skills
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Orbiting icons side */}
        <div className="absolute inset-y-0 md:inset-y-9 start-[45%] scale-125 overflow-hidden flex-col flex h-[15rem] w-full items-center justify-center">
          {/* Inner ring */}
          <OrbitingCircles iconSize={35}>{icons(40)}</OrbitingCircles>

          {/* Outer ring */}
          <OrbitingCircles iconSize={27} radius={100} reverse speed={2}>
            {icons(30, true)}
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
};
