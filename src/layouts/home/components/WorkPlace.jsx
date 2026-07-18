import { motion } from "framer-motion";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWorkplaces } from "@/lib/api";
import { get } from "lodash";
import { Timeline } from "@/components/ui/timeline";

// ── Shared animation variants ────────────────────────────────────────────────
const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const imageItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const PLACEHOLDER_IMAGES = [
  "https://assets.aceternity.com/templates/startup-1.webp",
  "https://assets.aceternity.com/templates/startup-2.webp",
  "https://assets.aceternity.com/templates/startup-3.webp",
  "https://assets.aceternity.com/templates/startup-4.webp",
];

// ── Reusable image grid ──────────────────────────────────────────────────────
const WorkplaceImageGrid = ({ images = [] }) => {
  const sources = images.length > 0 ? images : PLACEHOLDER_IMAGES;

  return (
    <motion.div
      className="grid grid-cols-2 gap-4"
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
    >
      {sources.map((src, index) => {
        const imgSrc = typeof src === "string" ? src : src.url;
        return (
          <motion.div
            key={index}
            variants={imageItemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={imgSrc}
              alt="workplace screenshot"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 transition-all duration-300"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// ── Single timeline entry content ────────────────────────────────────────────
const WorkplaceContent = ({ description, images }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="mb-8 text-xs font-normal text-neutral-300 md:text-sm dark:text-neutral-200">
      {description}
    </p>
    <WorkplaceImageGrid images={images} />
  </motion.div>
);

// ── Static fallback data ─────────────────────────────────────────────────────
const fallbackData = [
  {
    date: "2021–2024",
    title: "Webstudio Nepal",
    job: "Frontend Developer",
    content: (
      <WorkplaceContent
        description="Built and launched Aceternity UI and Aceternity UI Pro from scratch"
        images={[]}
      />
    ),
  },
  {
    date: "2019–2021",
    title: "Freelance Developer",
    job: "Full Stack Developer",
    content: (
      <WorkplaceContent
        description="Developed custom web applications and e-commerce solutions for clients"
        images={[]}
      />
    ),
  },
];

// ── Fetches workplaces and maps to timeline shape ────────────────────────────
const WorkplaceData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["workplaces"],
    queryFn: getWorkplaces,
    staleTime: 1000 * 60 * 5,
    retry: false, // Don't block screen on failure
  });

  if (isLoading) {
    return <WorkplaceLoading />;
  }

  const workplaces = !isError ? get(data, "workplaces", []) : [];

  const timelineData =
    workplaces.length === 0
      ? fallbackData
      : workplaces.map((wp) => ({
          date: wp.duration || "Present",
          title: wp.company || "Company",
          job: wp.position || "Position",
          content: (
            <WorkplaceContent
              description={wp.description || "No description available"}
              images={get(wp, "images", [])}
            />
          ),
        }));

  return <Timeline data={timelineData} />;
};

// ── Loading skeleton ─────────────────────────────────────────────────────────
const WorkplaceLoading = () => (
  <div className="flex items-center justify-center w-full h-64">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
      <p className="text-xl font-medium text-gray-200">
        Loading work experience...
      </p>
    </div>
  </div>
);

// ── Section root ─────────────────────────────────────────────────────────────
const Workplace = () => (
  <section className="relative bg-transparent py-6 text-white overflow-hidden">
    {/* Ambient glows */}
    <motion.div
      className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
    />

    <div className="max-w-screen-lg relative h-full mx-auto p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My Professional <span className="text-blue-400">Journey</span>
        </motion.h2>
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Explore my career path and the projects I've worked on throughout my
          professional experience.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <WorkplaceData />
      </motion.div>
    </div>
  </section>
);

export default Workplace;
