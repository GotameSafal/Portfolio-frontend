"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Contact,
  LayoutDashboard,
  Menu,
  Newspaper,
  TerminalSquare,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onToggleConsole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = ["projects", "contacts"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    {
      href: "/",
      label: "Home",
      isRoute: true,
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      href: "contacts",
      label: "Contacts",
      isRoute: false,
      icon: <Contact className="w-4 h-4 mr-2" />,
    },
    {
      href: "projects",
      label: "Projects",
      isRoute: false,
      icon: <Newspaper className="w-4 h-4 mr-2" />,
    },
  ];

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <nav
      className={`sticky top-0 z-[99999] text-white shadow-lg transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/80 backdrop-blur-md border-b border-white/5"
          : "bg-gradient-to-r from-gray-900 to-gray-800"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-screen-2xl">
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          <img
            src={"/favicon.ico"}
            width={40}
            height={40}
            alt="Eduverse logo"
          />
          <span className="hidden text-xl font-bold tracking-wider text-white lg:block">
            S-DEV
          </span>
        </Link>

        <div className="items-center hidden space-x-6 md:flex">
          <div className="flex space-x-4">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? pathname === link.href
                : activeSection === link.href;
              return link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  className={`flex items-center text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            {import.meta.env.DEV && (
              <button
                onClick={onToggleConsole}
                title="Open Developer Console (`)"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/30 rounded-md hover:bg-emerald-900/40 transition-colors"
              >
                <TerminalSquare size={14} />
                <span className="hidden lg:inline">~$ console</span>
              </button>
            )}
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors px-2 py-1"
              title="Admin Login"
            >
              ·admin
            </Link>
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="absolute w-full overflow-hidden md:hidden bg-gradient-to-r from-gray-900 to-gray-800"
          >
            <div className="px-6 py-4">
              {navLinks.map((link, i) => {
                const isActive = link.isRoute
                  ? pathname === link.href
                  : activeSection === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={toggleMenu}
                        className={`flex items-center py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={`#${link.href}`}
                        onClick={toggleMenu}
                        className={`flex items-center py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {link.icon}
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                {import.meta.env.DEV && (
                  <button
                    onClick={() => { onToggleConsole(); toggleMenu(); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/30 rounded-md hover:bg-emerald-900/40 transition-colors"
                  >
                    <TerminalSquare size={14} />
                    ~$ Open Developer Console
                  </button>
                )}
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block text-center text-xs text-gray-500 hover:text-gray-300 transition-colors py-2"
                >
                  Admin Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
