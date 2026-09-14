import { getProjects } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { get } from "lodash";
import {
  ExternalLink,
  Github,
  X,
  ChevronRight,
  Cpu,
  Layers,
  Database,
  Globe,
  Video,
  Play,
  Film,
  Sparkles,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { useState, useMemo } from "react";

// Fallback shown only if API fails — high quality technical projects
const fallbackProjects = [
  {
    id: 1,
    title: "Smart Farm Management System",
    description:
      "Eliminates livestock financial opacity and feed waste with automated lineage tracking and batch profit/loss analytics.",
    detailedDescription:
      "PROBLEM SOLVED: Modern livestock farms frequently suffer from chaotic paper records, untracked breeding lineage, unmonitored feed/medicine inventory expiry, and an inability to calculate true profit per batch of animals.\n\nBUSINESS IMPACT & SOLUTION: Engineered an end-to-end digital precision farming platform. Features an automated breeding tracking engine with offspring batch generation, real-time stock decay/expiry alerts, and automated multi-currency Profit & Loss financial accounting per livestock batch.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubLink: "",
    liveLink: "#",
    videoUrl: "https://res.cloudinary.com/dzat8mbl6/video/upload/v1789051798/merge_aqaom9.mp4",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "FieldOps Multi-Tenant Service Platform",
    description:
      "Eliminates dispatch chaos, paper checklists, and billing delays for field service & workforce companies.",
    detailedDescription:
      "PROBLEM SOLVED: Service companies (HVAC, Solar, Plumbing, Electrical) lose thousands monthly due to manual job dispatching, unrecorded field parts, missing job signatures, and week-long delays in issuing customer invoices.\n\nBUSINESS IMPACT & SOLUTION: Built a full-stack multi-tenant workforce management platform. Connects office dispatchers with field technicians in real time. Features live Socket.IO technician dispatching, mobile site navigation, digital execution checklists, photo proof upload, customer e-signatures, and instant post-job invoicing.",
    technologies: ["Next.js", "React Native", "Expo", "TypeScript", "Node.js", "Express", "Socket.IO", "Redis", "MongoDB"],
    githubLink: "",
    liveLink: "https://fieldops-art.vercel.app",
    videoUrl: "",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "OmniNode IoT Platform (Mobile & Server)",
    description:
      "Prevents hardware downtime and manual sensor monitoring for distributed IoT devices and ESP32 hardware networks.",
    detailedDescription:
      "PROBLEM SOLVED: Managing remote IoT hardware and ESP32 microcontrollers requires reliable device monitoring, rapid telemetry ingestion, and instantaneous alert dispatching before catastrophic failures occur.\n\nBUSINESS IMPACT & SOLUTION: Architected a dual-component IoT hub combining 'iot-server' (a high-throughput TypeScript event gateway with rule automation engines and push dispatchers) and 'iot-mobile' (a Tamagui-styled React Native dashboard providing live device telemetry, threshold alerting, and device automation control).",
    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "WebSockets", "MQTT", "MongoDB"],
    githubLink: "",
    liveLink: "#",
    videoUrl: "https://res.cloudinary.com/dzat8mbl6/video/upload/v1789052206/omninode_squished_tg3thi.mp4",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
];

// Reusable architecture node block
const ArchNode = ({ icon: Icon, label, colorClass }) => (
  <div className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium ${colorClass}`}>
    <Icon size={16} />
    <span>{label}</span>
  </div>
);

// Architecture diagram component
const ArchDiagram = ({ technologies = [] }) => {
  const layers = [
    { icon: Globe, label: "Client Layer", colorClass: "bg-blue-500/10 border-blue-500/30 text-blue-300" },
    { icon: Cpu, label: technologies.includes("Node.js") ? "Node.js API" : "Backend Services", colorClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" },
    { icon: Database, label: technologies.find((t) => ["MongoDB", "PostgreSQL", "Redis"].includes(t)) || "Database & Cache", colorClass: "bg-amber-500/10 border-amber-500/30 text-amber-300" },
    { icon: Layers, label: "Cloud & CDN", colorClass: "bg-purple-500/10 border-purple-500/30 text-purple-300" },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {layers.map((node, i) => (
        <div key={i} className="flex items-center gap-2">
          <ArchNode {...node} />
          {i < layers.length - 1 && (
            <ChevronRight size={14} className="text-neutral-600 shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

// ── Project Modal Component ──────────────────────────────────────────────────
export const ProjectModal = ({ project, initialTab = "Overview", onClose }) => {
  const videoUrl = get(project, "videoUrl", project.videoUrl || "");
  const tabs = videoUrl
    ? ["Overview", "Video Demo", "Architecture", "Engineering"]
    : ["Overview", "Architecture", "Engineering"];
  const [activeTab, setActiveTab] = useState(
    initialTab === "Video Demo" && videoUrl ? "Video Demo" : "Overview"
  );
  const liveLink = get(project, "liveLink", project.liveLink || "#");
  const githubLink = get(project, "githubLink", project.githubLink || "");
  const imgSrc = get(project, "imgUrl.url", project.image || "");
  const techs = project.technologies || [];

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 backdrop-blur-md bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col"
      >
        {/* Cover image banner */}
        {imgSrc && activeTab !== "Video Demo" && (
          <div className="relative h-44 sm:h-52 shrink-0 overflow-hidden bg-neutral-900">
            <img src={imgSrc} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-700/60"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="px-6 pt-5 pb-3 border-b border-neutral-800/80 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            {videoUrl && (
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full flex items-center gap-1.5">
                <Video size={12} /> Walkthrough
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-3 shrink-0 overflow-x-auto border-b border-neutral-900 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === tab
                  ? tab === "Video Demo"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20"
                    : "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent"
              }`}
            >
              {tab === "Video Demo" && <Play size={12} fill="currentColor" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Case Study & Solution
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                    {project.detailedDescription || project.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5">
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {techs.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs bg-neutral-900 text-neutral-300 rounded-lg border border-neutral-800 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Video Demo" && (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Film size={14} /> Product Demonstration Video
                  </h4>
                  <span className="text-xs text-neutral-500">Cloudinary Stream</span>
                </div>
                <div className="relative rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-inner">
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    playsInline
                    poster={imgSrc}
                    className="w-full max-h-[340px] object-contain rounded-xl"
                  >
                    Your browser does not support HTML5 video playback.
                  </video>
                </div>
              </motion.div>
            )}

            {activeTab === "Architecture" && (
              <motion.div
                key="arch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                    System Architecture Overview
                  </h4>
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <ArchDiagram technologies={techs} />
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 leading-relaxed">
                  <span className="font-semibold text-blue-400">Data Pipeline:</span>{" "}
                  Client triggers UI dispatch → Authenticated REST/WebSocket API router → Service business logic & validation layer → Persistent storage with indexed querying → Real-time response hydration.
                </div>
              </motion.div>
            )}

            {activeTab === "Engineering" && (
              <motion.div
                key="eng"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Key Technical Decisions
                </h4>
                <ul className="space-y-2.5">
                  {[
                    {
                      title: "Component Modularity",
                      detail:
                        "Structured around domain-driven feature folders for clear separation of concerns, loose coupling, and rapid scaling.",
                    },
                    {
                      title: "State & Query Caching",
                      detail:
                        "Leveraged TanStack Query for server state caching and optimistic UI updates, keeping the bundle lightweight.",
                    },
                    {
                      title: "Performance & Responsive UX",
                      detail:
                        "Configured code-split vendor chunking and image lazy-loading to optimize Core Web Vitals.",
                    },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 p-3 bg-neutral-900/70 rounded-xl border border-neutral-800"
                    >
                      <ChevronRight size={14} className="text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center gap-2.5 px-6 py-3.5 border-t border-neutral-800/80 bg-neutral-950 shrink-0">
          {liveLink && liveLink !== "#" && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <ExternalLink size={13} />
              Visit Live App
            </a>
          )}
          {githubLink && githubLink.trim() !== "" && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl transition-colors cursor-pointer border border-neutral-800"
            >
              <Github size={13} />
              Source Code
            </a>
          )}
          {videoUrl && activeTab !== "Video Demo" && (
            <button
              onClick={() => setActiveTab("Video Demo")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-xl transition-colors cursor-pointer ml-auto border border-rose-500/20"
            >
              <Play size={12} fill="currentColor" />
              Watch Video
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ── Bento-Style Project Card ─────────────────────────────────────────────────
export const ProjectCard = ({ project }) => {
  const [visible, setVisible] = useState(false);
  const [initialTab, setInitialTab] = useState("Overview");
  const previewImage = get(project, "imgUrl.url", project.image || "");
  const videoUrl = get(project, "videoUrl", project.videoUrl || "");
  const liveLink = get(project, "liveLink", project.liveLink || "");
  const githubLink = get(project, "githubLink", project.githubLink || "");

  const handleOpenModal = (tab = "Overview") => {
    setInitialTab(tab);
    setVisible(true);
  };

  return (
    <>
      <div className="group relative flex flex-col h-full rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Media Preview Container */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-950 shrink-0">
          {previewImage ? (
            <img
              src={previewImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-950/20 to-neutral-950 text-neutral-600">
              <Layers size={36} />
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            {videoUrl ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-neutral-950/80 text-rose-400 backdrop-blur-md rounded-full border border-rose-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                Video Demo
              </span>
            ) : <div />}

            <button
              onClick={() => handleOpenModal("Overview")}
              className="pointer-events-auto p-1.5 rounded-xl bg-neutral-950/80 hover:bg-blue-600 text-neutral-300 hover:text-white backdrop-blur-md border border-neutral-800 transition-colors cursor-pointer"
              title="Expand Details"
            >
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
        </div>

        {/* Card Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3
              onClick={() => handleOpenModal("Overview")}
              className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
            >
              {project.title}
            </h3>
            <p className="text-neutral-400 text-xs mt-2 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-4 pt-3 border-t border-neutral-800/60">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.technologies &&
                project.technologies.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-neutral-800/80 text-[11px] font-medium text-neutral-300 rounded-md border border-neutral-700/60"
                  >
                    {tech}
                  </span>
                ))}
              {project.technologies && project.technologies.length > 4 && (
                <span className="px-1.5 py-0.5 text-[10px] text-neutral-500 self-center">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* Direct Action Buttons (No hover dependency) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenModal("Overview")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors cursor-pointer border border-neutral-700/60"
              >
                <Code2 size={13} />
                Case Study
              </button>

              {liveLink && liveLink !== "#" && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  title="Live Demo"
                >
                  <ExternalLink size={14} />
                </a>
              )}

              {githubLink && githubLink.trim() !== "" && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-neutral-700/60"
                  title="GitHub Repository"
                >
                  <Github size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {visible && (
          <ProjectModal
            project={project}
            initialTab={initialTab}
            onClose={() => setVisible(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ── Projects Data & Filtering ────────────────────────────────────────────────
const ProjectsData = ({ filter, onFilterCategoriesChange }) => {
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
      <div className="col-span-full py-16 text-center text-neutral-500">
        No projects found for category "{filter}".
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredProjects.map((project) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            key={project._id || project.id}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Skeleton loader
const ProjectsLoading = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((n) => (
      <div
        key={n}
        className="h-[360px] rounded-2xl bg-neutral-900/40 border border-neutral-800 animate-pulse flex flex-col p-5 justify-between"
      >
        <div className="h-44 rounded-xl bg-neutral-800" />
        <div className="space-y-2 mt-4">
          <div className="h-4 w-2/3 bg-neutral-800 rounded" />
          <div className="h-3 w-full bg-neutral-800 rounded" />
        </div>
        <div className="h-8 w-full bg-neutral-800 rounded mt-4" />
      </div>
    ))}
  </div>
);

// ── Main Section ─────────────────────────────────────────────────────────────
const ProjectSection = () => {
  const [filter, setFilter] = useState("All");

  const categories = [
    { label: "All" },
    { label: "React" },
    { label: "Next.js" },
    { label: "TypeScript" },
    { label: "Node.js" },
    { label: "React Native" },
  ];

  return (
    <section
      id="projects"
      className="relative bg-transparent text-white py-16 sm:py-20"
    >
      <div className="max-w-screen-xl relative h-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 tracking-wider uppercase">
              <Sparkles size={12} />
              Portfolio Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Projects
              </span>
            </h2>
            <p className="text-neutral-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Full-stack platforms, scalable backends, real-time dispatch systems, and IoT solutions built for real-world reliability.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setFilter(cat.label)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat.label
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-500/40"
                    : "bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <ProjectsData filter={filter} />
      </div>
    </section>
  );
};

export default ProjectSection;
