import { getProjects } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { get } from "lodash";
import { ExternalLink, Github, MoveRight, X } from "lucide-react";
import { Suspense, useState } from "react";

// Fallback projects in case API fails
const fallbackProjects = [
  {
    id: 1,
    title: "AI Portfolio Intelligence",
    description:
      "Cutting-edge AI platform for intelligent investment strategies and real-time market analysis.",
    detailedDescription:
      "Revolutionary machine learning system utilizing advanced predictive algorithms to optimize investment portfolio performance, providing personalized financial insights and risk management.",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "Docker"],
    githubLink: "https://github.com/username/ai-portfolio",
    liveLink: "https://ai-portfolio-demo.com",
    image: "/sc1.png",
  },
  {
    id: 2,
    title: "Decentralized Social Network",
    description:
      "Blockchain-powered social platform ensuring user privacy, data ownership, and transparent content monetization.",
    detailedDescription:
      "Innovative decentralized social networking solution built on blockchain technology, providing users complete control over their personal data, interactions, and content monetization.",
    technologies: ["Solidity", "React Native", "Web3.js", "IPFS", "Ethereum"],
    githubLink: "https://github.com/username/decentralized-social",
    liveLink: "https://decentralized-social.network",
    image: "/sc2.png",
  },
  // Add more fallback projects as needed
];

// Fixed Modal Component
export const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-bl from-gray-900 to-gray-800 border-white/10"
      >
        <button
          className="absolute p-2 rounded-sm top-5 right-5 bg-gray-800 hover:bg-gray-700"
          onClick={onClose}
        >
          <X size={18} className="text-white" />
        </button>

        <img
          src={get(project, "imgUrl.url", project.image || "")}
          alt={project.title}
          className="w-full h-64 object-cover rounded-t-2xl"
        />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">
            {project.title}
          </h5>
          <p className="mb-3 font-normal text-neutral-400">
            {project.description}
          </p>
          <p className="mb-3 font-normal text-neutral-400">
            {project.detailedDescription}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-3">
              {project.technologies &&
                project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-gray-700 text-white rounded-full"
                  >
                    {tech}
                  </span>
                ))}
            </div>

            <div className="flex space-x-3 mt-4">
              <a
                href={get(project, "liveLink", project.liveLink || "#")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </a>

              {get(project, "githubLink", project.githubLink) &&
                get(project, "githubLink", project.githubLink).trim() !==
                  "" && (
                  <a
                    href={get(project, "githubLink", project.githubLink || "#")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    <Github size={16} className="mr-2" />
                    GitHub
                  </a>
                )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Fixed ProjectCard Component
export const ProjectCard = ({ project, setPreview }) => {
  const [visible, setVisible] = useState(false);
  const previewImage = get(project, "imgUrl.url", project.image || "");

  return (
    <>
      <div
        className="py-4 justify-between md:flex items-center"
        onMouseEnter={() => setPreview(previewImage)}
        onMouseLeave={() => setPreview(null)}
      >
        <div className="space-y-1">
          <h3 className="font-semibold md:text-lg text-gray-200 text-base text-start">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-amber-400">
            {project.technologies &&
              project.technologies.map((tech, index) => (
                <span key={index}>
                  {tech}
                  {index < project.technologies.length - 1 ? " • " : ""}
                </span>
              ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}
          className="flex items-center text-sm gap-2 mt-2 md:mt-0 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Read More</span>
          <MoveRight size={16} />
        </button>
      </div>

      {visible && (
        <ProjectModal project={project} onClose={() => setVisible(false)} />
      )}
    </>
  );
};

// Component to fetch and display projects
const ProjectsData = ({ setPreview }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get projects from API or use fallback
  const projects =
    get(data, "projects", []).length > 0
      ? get(data, "projects", [])
      : fallbackProjects;

  return (
    <>
      {projects.map((project, index) => (
        <div key={project._id || project.id}>
          <div className="bg-gradient-to-r w-full h-[1px] from-transparent via-white to-transparent" />
          <ProjectCard project={project} setPreview={setPreview} />
        </div>
      ))}
    </>
  );
};

// Loading fallback component
const ProjectsLoading = () => (
  <div className="flex items-center justify-center py-20">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      <p className="text-xl text-white">Loading projects...</p>
    </div>
  </div>
);

// Main ProjectSection component
const ProjectSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const [preview, setPreview] = useState(null);

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <section
      id="projects"
      className="relative h-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 sm:py-16"
    >
      <div
        onMouseMove={handleMouseMove}
        className="max-w-screen-lg relative h-full mx-auto px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="relative z-10">Featured Projects</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl text-sm sm:text-base"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A showcase of my recent work, featuring web applications and
            software solutions built with modern technologies and best
            practices.
          </motion.p>
        </motion.div>

        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsData setPreview={setPreview} />
        </Suspense>

        {preview && (
          <motion.img
            src={preview}
            alt="Project preview"
            className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
            style={{ x: springX, y: springY }}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
