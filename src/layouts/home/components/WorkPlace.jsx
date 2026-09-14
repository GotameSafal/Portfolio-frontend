import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getWorkplaces } from "@/lib/api";
import { get } from "lodash";
import { Timeline } from "@/components/ui/timeline";
import { Briefcase, Calendar, CheckCircle2, Building2 } from "lucide-react";

// ── Image Gallery (Only rendered if authentic images are provided) ────────────
const WorkplaceImageGrid = ({ images = [] }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((src, index) => {
        const imgSrc = typeof src === "string" ? src : src.url;
        return (
          <a
            key={index}
            href={imgSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/50 hover:border-neutral-700 transition-colors"
          >
            <img
              src={imgSrc}
              alt="Project screenshot"
              loading="lazy"
              className="h-28 sm:h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/30 transition-colors" />
          </a>
        );
      })}
    </div>
  );
};

// ── Single timeline entry card ───────────────────────────────────────────────
const WorkplaceContent = ({
  company,
  position,
  duration,
  description,
  technologies = [],
  images = [],
}) => {
  const isCurrent = duration.toLowerCase().includes("present");

  // Parse responsibilities or description
  const bulletPoints = (() => {
    if (Array.isArray(description)) {
      return description.filter(Boolean);
    }
    if (typeof description === "string") {
      const lines = description
        .split(/\n|●/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      return lines;
    }
    return [];
  })();

  return (
    <div className="w-full rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-5 md:p-7 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl">
      {/* Top Header inside Card */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-800/80 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Briefcase className="w-4 h-4" />
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {position}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
            <Building2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>{company}</span>
          </div>
        </div>

        {/* Status / Duration Pill */}
        <div className="flex items-center gap-2">
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Current
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-800/70 px-3 py-1 text-xs font-medium text-neutral-300 border border-neutral-700/60">
            <Calendar className="w-3 h-3 text-neutral-400" />
            {duration}
          </span>
        </div>
      </div>

      {/* Responsibilities list */}
      {bulletPoints.length > 0 && (
        <ul className="space-y-2.5 mb-6 text-sm text-neutral-300">
          {bulletPoints.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-blue-400/80 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech Stack Chips */}
      {technologies.length > 0 && (
        <div className="pt-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2.5">
            Core Technologies & Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-lg bg-neutral-800/90 px-2.5 py-1 text-xs font-medium text-neutral-300 border border-neutral-700/60 hover:border-blue-500/50 hover:text-blue-300 hover:bg-neutral-800 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Real project/workplace screenshots if available */}
      {images && images.length > 0 && <WorkplaceImageGrid images={images} />}
    </div>
  );
};

// ── Static fallback data ─────────────────────────────────────────────────────
const fallbackData = [
  {
    date: "Jan 2024 – Present",
    title: "Web Studio Nepal",
    job: "Full Stack Developer",
    content: (
      <WorkplaceContent
        company="Web Studio Nepal"
        position="Full Stack Developer"
        duration="Jan 2024 – Present"
        description={[
          "Architect and build production web applications using React, Next.js, TypeScript, Node.js, Express.js, and MongoDB.",
          "Collaborate with cross-functional design and engineering teams to deliver responsive, performant software.",
          "Design reusable UI design systems and modular architectures to scale development velocity.",
          "Integrate secure REST APIs, third-party services, and real-time communication modules.",
          "Optimize Core Web Vitals, application latency, accessibility (WCAG), and responsive ergonomics.",
          "Deliver projects across e-commerce, healthcare, hospitality, and enterprise domains.",
        ]}
        technologies={[
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Tailwind CSS",
          "Redux Toolkit",
          "Socket.IO",
        ]}
        images={[]}
      />
    ),
  },
  {
    date: "Aug 2023 – Jan 2024",
    title: "Raechal Enterprise",
    job: "Security Analyst",
    content: (
      <WorkplaceContent
        company="Raechal Enterprise"
        position="Security Analyst"
        duration="Aug 2023 – Jan 2024"
        description={[
          "Conducted systematic security monitoring and baseline vulnerability assessments across web applications.",
          "Partnered with development teams to review code and promote OWASP Top 10 secure coding principles.",
          "Streamlined incident tracking, security audit reporting, and internal vulnerability documentation.",
        ]}
        technologies={[
          "Linux",
          "Security Auditing",
          "Vulnerability Assessment",
          "OWASP",
          "Documentation",
        ]}
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
    retry: false,
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
              company={wp.company || "Company"}
              position={wp.position || "Position"}
              duration={wp.duration || "Present"}
              description={
                wp.responsibilities && wp.responsibilities.length > 0
                  ? wp.responsibilities
                  : wp.description || ""
              }
              technologies={get(wp, "technologies", [])}
              images={get(wp, "images", [])}
            />
          ),
        }));

  return <Timeline data={timelineData} />;
};

// ── Loading skeleton ─────────────────────────────────────────────────────────
const WorkplaceLoading = () => (
  <div className="flex flex-col items-center justify-center w-full py-16 space-y-4">
    <div className="w-10 h-10 border-2 border-neutral-700 border-t-blue-500 rounded-full animate-spin" />
    <p className="text-sm font-medium text-neutral-400 tracking-wide">
      Loading career experience...
    </p>
  </div>
);

// ── Section root ─────────────────────────────────────────────────────────────
const Workplace = () => (
  <section
    id="experience"
    className="relative bg-transparent py-16 text-white overflow-hidden"
  >
    {/* Ambient Glows */}
    <div className="pointer-events-none absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
    <div className="pointer-events-none absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10" />

    <div className="max-w-screen-xl relative h-full mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          Career Milestones
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Experience</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          A track record of crafting robust full-stack applications, scaling web systems, and upholding software security.
        </p>
      </motion.div>

      <div>
        <WorkplaceData />
      </div>
    </div>
  </section>
);

export default Workplace;
