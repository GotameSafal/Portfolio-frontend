import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  CopyCheck,
  ExternalLink,
  Github,
  Linkedin,
  Sparkles,
  MapPin,
  Mail,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { useState } from "react";
import { SkillsSection } from "./Skills";
import SpotifyWidget from "./SpotifyWidget";
import NepalClockWidget from "./NepalClockWidget";
import GitHubGridWidget from "./GitHubGridWidget";

// ── 1. Core Profile & Value Proposition Card ─────────────────────────────────
const ProfileBioCard = () => {
  return (
    <div className="group relative flex flex-col justify-between col-span-1 md:col-span-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 backdrop-blur-md p-6 sm:p-8 shadow-xl transition-all duration-300 overflow-hidden">
      {/* Subtle ambient light glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header pill & badge */}
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400/90">
            Full Stack Developer & Security Analyst
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Crafting resilient systems with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">clean code</span> & deep architectural rigor.
        </h3>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
          I specialize in architecting scalable web applications across the complete stack — from reactive, high-conversion user interfaces (React, Next.js, TypeScript) to robust distributed API backends and cloud services (Node.js, Express, MongoDB, Redis). With a background in application security auditing, I emphasize OWASP safety, performance, and maintainable software engineering.
        </p>
      </div>

      {/* Social & Action Links */}
      <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 mt-4 border-t border-neutral-800/80">
        <a
          href="https://github.com/GotameSafal"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold border border-neutral-700/60 transition-all cursor-pointer"
        >
          <Github size={15} />
          GitHub Profile
          <ArrowUpRight size={13} className="text-neutral-500" />
        </a>

        <a
          href="https://www.linkedin.com/in/safal-gotame-1a8730266"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold border border-neutral-700/60 transition-all cursor-pointer"
        >
          <Linkedin size={15} />
          LinkedIn
          <ArrowUpRight size={13} className="text-neutral-500" />
        </a>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/30 transition-all cursor-pointer"
        >
          <Code2 size={15} />
          Explore Projects
        </a>
      </div>
    </div>
  );
};

// ── 2. Live Availability & Fast Connect Card ─────────────────────────────────
const AvailabilityCard = () => {
  const [copied, setCopied] = useState(false);
  const email = "lamichhanem36@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="group relative flex flex-col justify-between col-span-1 md:col-span-2 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 backdrop-blur-md p-6 sm:p-7 shadow-xl transition-all duration-300">
      <div className="space-y-3">
        {/* Availability Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for Hire
        </div>

        <h4 className="text-lg font-bold text-white">
          Have a project in mind?
        </h4>

        <p className="text-xs text-neutral-400 leading-relaxed">
          Open for full-time engineering roles, contract builds, and technical consultations.
        </p>

        <div className="flex items-center gap-1.5 text-xs text-neutral-400 pt-1">
          <MapPin size={13} className="text-neutral-500" />
          <span>Kathmandu, Nepal (Remote Worldwide)</span>
        </div>
      </div>

      {/* Copy Email Button */}
      <div className="pt-5 mt-4 border-t border-neutral-800/80">
        <button
          onClick={copyEmail}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5 text-emerald-100"
              >
                <CopyCheck size={14} className="text-emerald-300" />
                Email Copied to Clipboard!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5"
              >
                <Copy size={14} />
                Copy Email Address
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

// ── Main About Section ───────────────────────────────────────────────────────
const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative bg-transparent py-16 sm:py-20 text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-screen-xl relative h-full mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 tracking-wider uppercase">
            Engineer Profile
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Me
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Full Stack Developer dedicated to building performant web products, clean distributed architectures, and hardened applications.
          </p>
        </motion.div>

        {/* ── First Bento Row: Identity + Live Availability ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <ProfileBioCard />
          <AvailabilityCard />
        </div>

        {/* ── Second Bento Row: Tech Stack Matrix ── */}
        <div className="mb-6">
          <SkillsSection />
        </div>

        {/* ── Third Bento Row: Live Telemetry Widgets ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="col-span-1 md:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md">
            <SpotifyWidget />
          </div>
          <div className="col-span-1 md:col-span-1 rounded-2xl overflow-hidden shadow-xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md">
            <NepalClockWidget />
          </div>
          <div className="col-span-1 md:col-span-3 rounded-2xl overflow-hidden shadow-xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md">
            <GitHubGridWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
