import { getProjects } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { get } from "lodash";
import { ExternalLink, Github, MoveRight, X, ChevronRight, Cpu, Layers, Database, Globe, Filter } from "lucide-react";
import { Suspense, useState, useMemo } from "react";

// Fallback shown only if API fails — update with real projects
const fallbackProjects = [
  {
    id: 1,
    title: "Smart Farm Management System",
    description:
      "A comprehensive web-based SaaS solution for modern farm operations, tracking livestock, breeding, inventory, and financial reports.",
    detailedDescription:
      "A precision digital farming platform that enables livestock batch management, breeding/lineage tracing with automated offspring tracking, real-time inventory alerts for feed & medicine, and batch-level profit & loss reports with dynamic multi-currency configurations.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "HeroUI"],
    githubLink: "https://github.com/GotameSafal/Smart-Farm",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "StreamVault (Media Harvest)",
    description:
      "A production-grade, privacy-focused media downloading ecosystem and local-first media toolkit powered by yt-dlp and FFmpeg.",
    detailedDescription:
      "A complete cross-platform ecosystem to download media from standard platforms. Features intelligent stream-copy video clipping, WebSocket-based live progress broadcasts, and a plugin/AI service layer. Includes a FastAPI server, a rich CLI, a Chrome Extension, and a Tauri desktop application.",
    technologies: ["FastAPI", "Python", "SQLite", "React", "Tailwind CSS", "Tauri", "Chrome Extension API", "yt-dlp", "FFmpeg"],
    githubLink: "https://github.com/GotameSafal/MediaHarvest",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "OmniNode IoT Platform",
    description:
      "A dual-component IoT platform featuring a React Native mobile dashboard and a high-performance Node.js server broker.",
    detailedDescription:
      "A real-time IoT monitoring system. It combines 'iot-mobile' (a cross-platform React Native dashboard styled with Tamagui that displays live device telemetry, interactive graphs, and push notification thresholds) with 'iot-server' (a robust TypeScript Node.js backend acting as a gateway and API broker for device communication).",
    technologies: ["React Native", "Expo", "Tamagui", "Node.js", "TypeScript", "Express", "WebSockets", "MQTT", "MongoDB"],
    githubLink: "https://github.com/GotameSafal/OmniNode",
    liveLink: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
];


// Reusable architecture node block
const ArchNode = ({ icon: Icon, label, colorClass }) => (
  <div className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium ${colorClass}`}>
    <Icon size={14} />
    <span>{label}</span>
  </div>
);

// Architecture diagram component
const ArchDiagram = ({ technologies = [] }) => {
  const layers = [
    { icon: Globe, label: "Frontend", colorClass: "bg-blue-900/40 border-blue-500/40 text-blue-300" },
    { icon: Cpu, label: technologies.includes("Node.js") ? "Node.js API" : "REST API", colorClass: "bg-green-900/40 border-green-500/40 text-green-300" },
    { icon: Database, label: technologies.find(t => ["MongoDB","PostgreSQL","MySQL"].includes(t)) || "Database", colorClass: "bg-orange-900/40 border-orange-500/40 text-orange-300" },
    { icon: Layers, label: "Deployment", colorClass: "bg-purple-900/40 border-purple-500/40 text-purple-300" },
  ];

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {layers.map((node, i) => (
        <div key={i} className="flex items-center gap-1">
          <ArchNode {...node} />
          {i < layers.length - 1 && (
            <ChevronRight size={12} className="text-gray-600 shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

const CASE_STUDY_TABS = ["Overview", "Architecture", "Engineering"];

export const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const liveLink = get(project, "liveLink", project.liveLink || "#");
  const githubLink = get(project, "githubLink", project.githubLink || "");
  const imgSrc = get(project, "imgUrl.url", project.image || "");
  const techs = project.technologies || [];

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-gray-950 border border-white/10 shadow-2xl flex flex-col"
      >
        {/* Cover image */}
        {imgSrc && (
          <div className="relative h-48 shrink-0">
            <img src={imgSrc} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="px-5 pt-3 pb-2 border-b border-gray-800 shrink-0">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-400 mt-0.5">{project.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pt-3 shrink-0">
          {CASE_STUDY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">The Challenge</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {project.detailedDescription || project.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs bg-gray-800 text-gray-200 rounded-full border border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Architecture" && (
              <motion.div key="arch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">System Architecture</h4>
                  <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
                    <ArchDiagram technologies={techs} />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/30 text-xs text-blue-200 leading-relaxed">
                  <span className="font-semibold text-blue-400">Flow:</span>{" "}
                  Client sends requests via HTTPS → REST API layer validates & processes → Data persisted in DB → CDN-cached responses returned to client.
                </div>
              </motion.div>
            )}

            {activeTab === "Engineering" && (
              <motion.div key="eng" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Key Technical Decisions</h4>
                  <ul className="space-y-2.5">
                    {[
                      { title: "Component Architecture", detail: "Adopted feature-first folder structure to maintain high cohesion and low coupling between modules." },
                      { title: "State Management", detail: "Used TanStack Query for server-state and React Context for lightweight auth state — avoiding Redux overhead." },
                      { title: "Performance", detail: "Implemented Suspense boundaries + lazy loading to reduce initial TTI and improve perceived performance." },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2.5 p-3 bg-gray-900 rounded-lg border border-gray-800">
                        <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-white">{item.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        <div className="flex gap-2 px-5 py-3 border-t border-gray-800 shrink-0">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
          {githubLink && githubLink.trim() !== "" && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Fixed Premium Card Component
export const ProjectCard = ({ project }) => {
  const [visible, setVisible] = useState(false);
  const previewImage = get(project, "imgUrl.url", project.image || "");

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group flex flex-col h-full bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden shadow-xl"
      >
        {/* Card Image Cover with Hover Effect */}
        <div className="relative h-48 overflow-hidden bg-slate-950 shrink-0">
          {previewImage ? (
            <img
              src={previewImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-slate-900 text-gray-600">
              <Layers size={36} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          
          {/* Quick link action overlay */}
          <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setVisible(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500 transition-colors"
            >
              Learn More
            </button>
            {get(project, "liveLink") && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
            {project.technologies &&
              project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-gray-800 text-[10px] text-gray-300 rounded-full border border-gray-700/60"
                >
                  {tech}
                </span>
              ))}
            {project.technologies && project.technologies.length > 3 && (
              <span className="text-[10px] text-gray-500 self-center">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {visible && (
          <ProjectModal project={project} onClose={() => setVisible(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Component to fetch, filter and display projects
const ProjectsData = ({ filter }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const projects =
    !isError && get(data, "projects", []).length > 0
      ? get(data, "projects", [])
      : fallbackProjects;

  // useMemo MUST be before any early return — Rules of Hooks
  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) =>
      project.technologies?.some((tech) =>
        tech.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [projects, filter]);

  if (isLoading) {
    return <ProjectsLoading />;
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="col-span-full py-16 text-center text-gray-500">
        No projects found matching the filter "{filter}".
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {filteredProjects.map((project) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={project._id || project.id}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

// Loading fallback component
const ProjectsLoading = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((n) => (
      <div key={n} className="h-[320px] rounded-2xl bg-slate-900/40 border border-white/5 animate-pulse flex flex-col p-5 justify-between">
        <div className="h-40 rounded-xl bg-slate-800" />
        <div className="space-y-2 mt-4">
          <div className="h-4 w-2/3 bg-slate-800 rounded" />
          <div className="h-3 w-full bg-slate-800 rounded" />
        </div>
        <div className="h-6 w-1/3 bg-slate-800 rounded mt-4" />
      </div>
    ))}
  </div>
);

// Main ProjectSection component
const ProjectSection = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "React", "Node.js", "Python", "TypeScript", "IoT"];



  return (
    <section
      id="projects"
      className="relative h-auto bg-transparent text-white py-12 sm:py-16"
    >
      <div className="max-w-screen-lg relative h-full mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 relative inline-block animate-gradient"
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
          </div>

          {/* Premium Filter Controls */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === cat
                    ? "bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20"
                    : "bg-slate-800 text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <ProjectsData filter={filter} />
      </div>
    </section>
  );
};

export default ProjectSection;
