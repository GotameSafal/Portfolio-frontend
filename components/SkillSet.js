"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import {
  Code,
  Database,
  Server,
  Cpu,
  CloudLightning,
  Zap,
  Rocket,
  Target,
} from "lucide-react";
import { useGetSkillsQuery } from "@redux/slices/api";

const skills = [
  {
    category: "Frontend",
    icon: Code,
    color: "bg-blue-500",
    skills: [
      { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
      { name: "Next.js", level: 90, color: "from-gray-800 to-gray-600" },
      { name: "TypeScript", level: 85, color: "from-blue-600 to-indigo-600" },
      { name: "Tailwind", level: 88, color: "from-cyan-500 to-blue-500" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "bg-green-500",
    skills: [
      { name: "Node.js", level: 90, color: "from-green-500 to-emerald-500" },
      { name: "Express", level: 85, color: "from-gray-700 to-gray-500" },
      { name: "Python", level: 80, color: "from-yellow-500 to-amber-500" },
      { name: "Django", level: 75, color: "from-green-600 to-emerald-700" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "bg-purple-500",
    skills: [
      { name: "MongoDB", level: 88, color: "from-green-500 to-emerald-600" },
      { name: "PostgreSQL", level: 85, color: "from-blue-600 to-indigo-700" },
      { name: "Redis", level: 75, color: "from-red-500 to-rose-600" },
      { name: "GraphQL", level: 70, color: "from-pink-500 to-purple-600" },
    ],
  },
  {
    category: "DevOps",
    icon: CloudLightning,
    color: "bg-orange-500",
    skills: [
      { name: "Docker", level: 85, color: "from-blue-600 to-cyan-500" },
      { name: "Kubernetes", level: 75, color: "from-blue-500 to-indigo-600" },
      { name: "AWS", level: 80, color: "from-orange-500 to-yellow-500" },
      { name: "CI/CD", level: 70, color: "from-gray-700 to-gray-900" },
    ],
  },
];

const AnimatedSkillsShowcase = () => {
  const { data, isLoading } = useGetSkillsQuery();

  const getColorForProficiency = (proficiency) => {
    if (proficiency >= 90) return "from-green-500 to-emerald-500";
    if (proficiency >= 80) return "from-blue-500 to-cyan-500";
    if (proficiency >= 70) return "from-yellow-500 to-amber-500";
    if (proficiency >= 60) return "from-orange-500 to-yellow-400";
    return "from-gray-400 to-gray-600";
  };

  const categoryStyles = {
    Frontend: { icon: "Code", color: "bg-blue-500" },
    Backend: { icon: "Server", color: "bg-green-500" },
    Database: { icon: "Database", color: "bg-purple-500" },
    DevOps: { icon: "CloudLightning", color: "bg-orange-500" },
  };

  const skills = data?.skills?.map((category) => {
    const categoryStyle = categoryStyles[category.skills] || {};
    return {
      category: category.skills,
      icon: categoryStyle.icon || "DefaultIcon",
      color: categoryStyle.color || "bg-gray-500",
      skills: category.options.map((skill) => ({
        name: skill.skill_name,
        level: skill.proficiency,
        color: getColorForProficiency(skill.proficiency),
      })),
    };
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (skills && skills.length > 0) {
      setSelectedCategory(skills[0].category);
    }
  }, [skills]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    animate(scope.current, {
      scale: [1, 1.1, 0.9, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    });
  };

  if (isLoading || !selectedCategory) {
    return <p>Loading...</p>;
  }
  return (
    <div className="relative min-h-screen px-4 py-16 overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.2, 0.9],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute rounded-full -top-20 -right-20 w-96 h-96 bg-blue-500/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.2, 0.9],
          rotate: [0, -360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute rounded-full -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 blur-3xl"
      />

      <div className="container relative z-10 mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-5xl font-bold tracking-tight text-center text-white"
        >
          Tech <span className="text-blue-400">Skill Arsenal</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-4 mb-16 space-x-4 overflow-x-auto md:overflow-hidden"
        >
          {skills.map((skill) => {
            const SkillIcon = skill.icon;
            return (
              <motion.button
                key={skill.category}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 10, -10, 0],
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(skill.category)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl 
                  transition-all duration-300 group
                  ${
                    selectedCategory === skill.category
                      ? `${skill.color} text-white`
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }
                `}
              >
                <SkillIcon
                  size={24}
                  className="transition-transform group-hover:rotate-12"
                />
                {skill.category}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            ref={scope}
            key={selectedCategory}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {skills
              .filter((cat) => cat.category === selectedCategory)
              .map((category) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 border shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <category.icon
                      size={40}
                      className={`${category.color} p-2 rounded-xl`}
                    />
                    <h3 className="text-3xl font-bold text-white">
                      {category.category} Skills
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, type: "spring" }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between text-white/80">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full h-3 overflow-hidden rounded-full bg-white/20">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1.5,
                              type: "spring",
                              delay: 0.2,
                            }}
                            className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center p-8 border shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <Target
                  size={40}
                  className="p-2 text-white bg-green-500 rounded-xl"
                />
                <h3 className="text-3xl font-bold text-white">
                  Proficiency Levels
                </h3>
              </div>
              <div className="space-y-4 text-white/80">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Zap size={24} className="text-green-500" />
                  <span className="font-medium">Expert (80-100%)</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <Rocket size={24} className="text-yellow-500" />
                  <span className="font-medium">Advanced (60-79%)</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <Cpu size={24} className="text-blue-500" />
                  <span className="font-medium">Intermediate (40-59%)</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedSkillsShowcase;
