"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Code, Globe, Github, ExternalLink } from "lucide-react";
import { useGetProjectsQuery } from "@redux/slices/api";
import Link from "next/link";
import { Linkedin } from "lucide-react";

const ProjectCard = ({ project, onDetailView }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className="relative group">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 
        to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 
        transition duration-300 blur-sm group-hover:blur-lg"
      ></div>

      <div
        className="relative h-full bg-white/90 dark:bg-gray-900/90 
        rounded-2xl overflow-hidden border border-gray-200 
        dark:border-gray-700 
        transform transition duration-300 
        hover:scale-[1.02] hover:shadow-2xl"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project?.title}
            </h3>
            <div className="flex space-x-3">
              {project?.gitsource && (
                <Link
                  href={project?.gitsource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <Github />
                </Link>
              )}
              {project?.projecturl && (
                <Link
                  href={project.projecturl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-purple-600"
                >
                  <ExternalLink />
                </Link>
              )}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            {project?.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => onDetailView(project)}
            className="flex items-center justify-center w-full py-3 mt-4 text-white transition rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            <Code className="mr-2" /> Explore Project
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetailModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center 
      bg-black/70 backdrop-blur-xl p-4"
    >
      <motion.div
        layoutId={`project-${project.id}`}
        className="grid w-full max-w-4xl overflow-hidden bg-white shadow-2xl dark:bg-gray-900 rounded-3xl md:grid-cols-3"
      >
        <div className="col-span-3 p-4 space-y-6 md:col-span-2 md:p-10 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30">
          <div className="mb-6 overflow-hidden shadow-lg rounded-2xl">
            <Image
              src={project?.imgUrl?.url}
              alt={"project image png"}
              className="object-cover w-full"
              width={400}
              height={400}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-4xl dark:text-white">
            {project?.title}
          </h2>
          <p className="text-justify text-gray-700 md:text-lg text-md dark:text-gray-300">
            {project?.detailedDescription}
          </p>
        </div>

        <div className="col-span-3 p-4 space-y-6 md:col-span-1 md:p-8 bg-white/90 dark:bg-gray-800/90">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold md:text-xl dark:text-white">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project?.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-indigo-800 bg-indigo-100 rounded-full cursor-pointer dark:bg-indigo-900/30 dark:text-indigo-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold md:text-xl dark:text-white">
              Project Links
            </h3>
            <div className="flex space-x-4">
              {project?.gitsource && (
                <Linkedin
                  href={project.gitsource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                >
                  <Github className="mr-2" /> GitHub
                </Linkedin>
              )}
              {project?.projecturl && (
                <Link
                  href={project?.projecturl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600"
                >
                  <Globe className="mr-2" /> Live Demo
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 text-white transition rounded-lg md:mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            Close Project
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { data } = useGetProjectsQuery();
  // const projects = [
  //   {
  //     id: 1,
  //     title: "AI Portfolio Intelligence",
  //     description:
  //       "Cutting-edge AI platform for intelligent investment strategies and real-time market analysis.",
  //     detailedDescription:
  //       "Revolutionary machine learning system utilizing advanced predictive algorithms to optimize investment portfolio performance, providing personalized financial insights and risk management.",
  //     technologies: ["Python", "TensorFlow", "React", "FastAPI", "Docker"],
  //     githubLink: "https://github.com/username/ai-portfolio",
  //     liveLink: "https://ai-portfolio-demo.com",
  //     image: "/api/placeholder/800/600", // Replace with actual project image
  //   },
  //   {
  //     id: 2,
  //     title: "Decentralized Social Network",
  //     description:
  //       "Blockchain-powered social platform ensuring user privacy, data ownership, and transparent content monetization.",
  //     detailedDescription:
  //       "Innovative decentralized social networking solution built on blockchain technology, providing users complete control over their personal data, interactions, and content monetization.",
  //     technologies: ["Solidity", "React Native", "Web3.js", "IPFS", "Ethereum"],
  //     githubLink: "https://github.com/username/decentralized-social",
  //     liveLink: "https://decentralized-social.network",
  //     image: "/api/placeholder/800/600", // Replace with actual project image
  //   },
  //   {
  //     id: 3,
  //     title: "Decentralized Social Network",
  //     description:
  //       "Blockchain-powered social platform ensuring user privacy, data ownership, and transparent content monetization.",
  //     detailedDescription:
  //       "Innovative decentralized social networking solution built on blockchain technology, providing users complete control over their personal data, interactions, and content monetization.",
  //     technologies: ["Solidity", "React Native", "Web3.js", "IPFS", "Ethereum"],
  //     githubLink: "https://github.com/username/decentralized-social",
  //     liveLink: "https://decentralized-social.network",
  //     image: "/api/placeholder/800/600", // Replace with actual project image
  //   },
  // ];
  console.log(data);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8"
      id="projects"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          Innovative Tech Projects
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid gap-8 md:grid-cols-2"
        >
          {data?.projects?.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDetailView={setSelectedProject}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default Projects;
