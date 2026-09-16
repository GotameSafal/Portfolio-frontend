import { motion } from "framer-motion";
import { ArrowUp, Heart, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactIcons } from "./Contacts";

const MotionLink = motion(Link);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", path: "#" },
    { name: "About", path: "#about" },
    { name: "Projects", path: "#projects" },
    { name: "Experience", path: "#experience" },
    { name: "Contact", path: "#contacts" },
  ];

  const contactInfo = [
    {
      icon: <MapPin size={15} className="text-cyan-400" />,
      text: "Kathmandu, Nepal",
      subtext: "UTC+5:45",
    },
    {
      icon: <Mail size={15} className="text-blue-400" />,
      text: "lamichhanem36@gmail.com",
      href: "mailto:lamichhanem36@gmail.com",
    },
  ];

  const techBadges = [
    { label: "React 19", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20" },
    { label: "Vite 7", color: "text-violet-400 border-violet-500/30 bg-violet-950/20" },
    { label: "Tailwind 4", color: "text-sky-400 border-sky-500/30 bg-sky-950/20" },
    { label: "Framer Motion", color: "text-pink-400 border-pink-500/30 bg-pink-950/20" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
      },
    },
  };

  return (
    <footer className="bg-transparent border-t border-neutral-800/80 relative z-10">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Brand & Bio Column (5 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-4">
            <MotionLink
              to="/"
              className="inline-flex items-center space-x-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/favicon.ico"
                width={36}
                height={36}
                className="rounded-xl border border-neutral-700/60 p-0.5"
                alt="Safal Gotame logo"
              />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Safal <span className="text-blue-400">Gotame</span>
              </span>
            </MotionLink>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Software Engineer & Full Stack Developer specialized in architecting responsive, reliable, and high-performance digital products.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {ContactIcons.map((obj, ind) => (
                <motion.a
                  key={ind}
                  href={obj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={obj.name}
                  className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {obj.icon}
                </motion.a>
              ))}

              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-blue-400 hover:border-neutral-700 transition-all cursor-pointer shadow-sm ml-1"
                title="Back to Top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </motion.div>

          {/* Quick Links Column (3 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-neutral-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all text-xs">
                      →
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info Column (4 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Direct Inquiries
            </h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3 text-xs">
                  <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
                    {info.icon}
                  </div>
                  <div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-neutral-300 hover:text-blue-400 transition-colors font-medium break-all block"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-neutral-300 font-medium block">{info.text}</span>
                    )}
                    {info.subtext && (
                      <span className="text-[10px] text-neutral-500 font-mono">{info.subtext}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright + Tech Stack bar */}
      <div className="border-t border-neutral-800/80 py-6 bg-neutral-950/40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-xs text-center md:text-left">
            © {currentYear} <span className="font-semibold text-white">Safal Gotame</span>. All Rights Reserved.
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {techBadges.map(({ label, color }) => (
              <span
                key={label}
                className={`px-2.5 py-0.5 text-[10px] font-mono border rounded-full ${color}`}
              >
                {label}
              </span>
            ))}
          </div>

          <p className="text-neutral-500 text-xs flex items-center gap-1">
            <span>Engineered with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>in Kathmandu, Nepal</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
