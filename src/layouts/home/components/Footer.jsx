import { slideIn } from "@/lib/motion_function";
import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { Link } from "react-router-dom";

// Import ContactIcons from Contacts component to maintain consistency
import { ContactIcons } from "./Contacts";

// Wrap Link with motion
const MotionLink = motion(Link);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "#projects" },
    { name: "Experience", path: "#experience" },
    { name: "Contact", path: "#contacts" },
  ];

  const contactInfo = [
    { icon: <MapPin size={16} />, text: "Kathmandu, Nepal" },
    { icon: <Mail size={16} />, text: "lamichhanem36@gmail.com" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        damping: 12,
      },
    },
  };

  return (
    <footer className="bg-transparent border-t border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-4"
          >
            <MotionLink
              to="/"
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src="/favicon.ico"
                width={40}
                height={40}
                className="rounded-full"
                alt="S-Dev logo"
              />
              <span className="text-2xl font-bold text-white">
                S-<span className="text-[#0ef]">Dev</span>
              </span>
            </MotionLink>

            <motion.p className="text-gray-400 mt-2 max-w-md">
              Building responsive, accessible applications with modern
              frameworks and clean code practices.
            </motion.p>

            {/* Social Icons */}
            <motion.div className="flex space-x-4 mt-4">
              {ContactIcons.map((obj, ind) => (
                <motion.a
                  key={ind}
                  href={obj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${obj.clss} rounded-full flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * ind }}
                >
                  {obj.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li key={index}>
                  {link.path.startsWith("#") ? (
                    <motion.a
                      href={link.path}
                      className="text-gray-400 hover:text-[#0ef] transition-colors flex items-center space-x-2"
                      whileHover={{ x: 5 }}
                    >
                      <span>→</span>
                      <span>{link.name}</span>
                    </motion.a>
                  ) : (
                    <MotionLink
                      to={link.path}
                      className="text-gray-400 hover:text-[#0ef] transition-colors flex items-center space-x-2"
                      whileHover={{ x: 5 }}
                    >
                      <span>→</span>
                      <span>{link.name}</span>
                    </MotionLink>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-3 text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="text-[#0ef]"
                    whileHover={{ scale: 1.2 }}
                  >
                    {info.icon}
                  </motion.span>
                  <span>{info.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright + Tech Stack bar */}
      <motion.div
        className="border-t border-gray-800 py-6"
        variants={slideIn("up", "spring", 0, 0.9)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <motion.p
            className="text-gray-400 text-sm text-center md:text-left"
            whileHover={{ color: "#0ef" }}
          >
            © {currentYear} <span className="font-semibold">S-Dev</span>. All
            Rights Reserved.
          </motion.p>

          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "React 19", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20" },
              { label: "Vite 7", color: "text-violet-400 border-violet-500/30 bg-violet-950/20" },
              { label: "Tailwind 4", color: "text-sky-400 border-sky-500/30 bg-sky-950/20" },
              { label: "Framer Motion", color: "text-pink-400 border-pink-500/30 bg-pink-950/20" },
            ].map(({ label, color }) => (
              <span
                key={label}
                className={`px-2 py-0.5 text-[10px] font-mono border rounded-full ${color}`}
              >
                {label}
              </span>
            ))}
          </div>

          <motion.p
            className="text-gray-500 text-xs mt-2 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Designed &amp; Developed with
            <motion.span
              className="text-red-500 mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              ♥
            </motion.span>
            by Safal Gotame
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
