import { motion } from "framer-motion";
import {
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Copy,
  Check,
  Phone,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Form from "./Form";

// Premium mini map component with Nepal coordinate radar
const MiniMap = () => (
  <div className="relative w-full h-36 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 overflow-hidden flex items-center justify-center group shadow-inner">
    {/* Abstract Grid Map background */}
    <div
      className="absolute inset-0 opacity-25 transition-transform duration-700 group-hover:scale-105"
      style={{
        backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />

    {/* Radar Sweep Effect */}
    <div className="absolute w-40 h-40 rounded-full border border-blue-500/20 pointer-events-none" />
    <span className="absolute w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 animate-ping" />

    <div className="relative z-10 flex flex-col items-center gap-1.5 text-center px-4">
      <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
        <MapPin className="animate-bounce" size={18} />
      </div>
      <div>
        <p className="text-xs font-semibold text-white">Kathmandu, Nepal</p>
        <p className="text-[10px] font-mono text-neutral-400 tracking-wider">
          27.7172° N, 85.3240° E
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Open to Remote & On-site
      </span>
    </div>
  </div>
);

export const ContactIcons = [
  {
    name: "LinkedIn",
    icon: <Linkedin size={18} />,
    url: "https://www.linkedin.com/in/safal-gotame-1a8730266",
    hoverColor: "hover:text-blue-400 hover:border-blue-500/40",
  },
  {
    name: "GitHub",
    icon: <Github size={18} />,
    url: "https://github.com/GotameSafal",
    hoverColor: "hover:text-white hover:border-neutral-600",
  },
  {
    name: "Facebook",
    icon: <Facebook size={18} />,
    url: "https://www.facebook.com/safal.gotame.5",
    hoverColor: "hover:text-sky-400 hover:border-sky-500/40",
  },
];

const Contacts = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="contacts" className="overflow-hidden bg-transparent py-16 sm:py-20 relative">
      {/* Ambient glow overlays */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="max-w-screen-xl px-4 mx-auto sm:px-6 md:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-14" variants={itemVariants}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 tracking-wider uppercase">
            <Sparkles size={12} />
            Let's Connect
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Touch
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Have a project in mind, an engineering role, or an inquiry? Send a message or reach out through my direct contact channels.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Info Column (2 cols) */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <div className="bg-neutral-900/60 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-neutral-800/80 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <MessageSquare size={16} />
                  </span>
                  Contact Information
                </h3>
                <span className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                  <Clock size={12} className="text-blue-400" />
                  Fast Response
                </span>
              </div>

              {/* Direct channels */}
              <div className="space-y-3.5">
                {/* Email Item */}
                <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800/60 hover:border-neutral-700/80 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Email Address</p>
                      <a
                        href="mailto:lamichhanem36@gmail.com"
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-blue-400 transition-colors truncate block"
                      >
                        lamichhanem36@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("lamichhanem36@gmail.com", "email")}
                    className="p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800/60 hover:border-neutral-700/80 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                      <Phone size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Phone / WhatsApp</p>
                      <a
                        href="tel:+9779840843064"
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-indigo-400 transition-colors truncate block font-mono"
                      >
                        +977 9840843064
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("+9779840843064", "phone")}
                    className="p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number"
                  >
                    {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800/60 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-xs sm:text-sm font-medium text-neutral-200">
                      Kathmandu, Nepal (UTC+5:45)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Profiles Row */}
              <div className="pt-2 border-t border-neutral-800/80">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-3">
                  Social Channels
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {ContactIcons.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-950/60 border border-neutral-800 text-neutral-300 text-xs font-medium transition-all cursor-pointer ${item.hoverColor}`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      <ArrowUpRight size={12} className="text-neutral-500" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Geolocation Radar */}
            <MiniMap />
          </motion.div>

          {/* Form Column (3 cols) */}
          <motion.div
            className="lg:col-span-3 bg-neutral-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-neutral-800/80 shadow-xl relative"
            variants={itemVariants}
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Send a Direct Message</h3>
              <p className="text-xs text-neutral-400">
                Fill out the form below. Messages trigger an automated notification to my inbox.
              </p>
            </div>
            <Form />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacts;
