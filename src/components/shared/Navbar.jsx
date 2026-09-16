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
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onToggleConsole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rafId = useRef(null);

  // Throttled scroll listener with hysteresis to avoid boundary flickering
  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        console.log("scrollY:", currentY);
        // Hysteresis prevents flickering when hovering around the threshold
        setScrolled((prev) => {
          if (!prev && currentY > 30) return true;
          if (prev && currentY < 15) return false;
          return prev;
        });
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
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
        { threshold: 0.25 }
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
      transition: { duration: 0.25, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  console.log('scrolled', scrolled)
  return (
    <nav
      className={`sticky top-0 z-[99999] text-white will-change-transform border-b transition-all duration-200 ${scrolled
        ? "bg-transparent backdrop-blur-md border-transparent shadow-none"
        : "bg-slate-950 border-neutral-800/80 shadow-lg shadow-black/20"
        }`}

      style={{
        transitionProperty: "background-color, border-color, box-shadow",
        transitionDuration: "200ms",
        transitionTimingFunction: "ease-out",
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 mx-auto max-w-screen-2xl">
        <Link to="/" className="flex items-center space-x-3 shrink-0 group">
          <img
            src="/favicon.ico"
            width={36}
            height={36}
            className="rounded-xl border border-neutral-700/60 p-0.5"
            alt="Safal Gotame logo"
          />
          <span className="hidden text-xl font-bold tracking-tight text-white lg:block group-hover:text-blue-400 transition-colors">
            Safal <span className="text-blue-400">Pariyar</span>
          </span>
        </Link>

        <div className="items-center hidden space-x-6 md:flex">
          <div className="flex space-x-3">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? pathname === link.href
                : activeSection === link.href;
              return link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                    }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                    }`}
                >
                  {link.icon}
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 pl-3 border-l border-neutral-800">
            <button
              onClick={onToggleConsole}
              title="Open Developer Console (`)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/30 rounded-lg hover:bg-emerald-900/40 transition-colors cursor-pointer"
            >
              <TerminalSquare size={14} />
              <span className="hidden lg:inline">~$ console</span>
            </button>
            <Link
              to="/login"
              className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors px-2 py-1"
              title="Admin Login"
            >
              ·admin
            </Link>
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="text-white p-2 rounded-lg hover:bg-neutral-800/60 md:hidden focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
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
            className="w-full overflow-hidden md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800/80"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link, i) => {
                const isActive = link.isRoute
                  ? pathname === link.href
                  : activeSection === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={toggleMenu}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-neutral-300 hover:text-white"
                          }`}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={`#${link.href}`}
                        onClick={toggleMenu}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-neutral-300 hover:text-white"
                          }`}
                      >
                        {link.icon}
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}

              <div className="pt-3 border-t border-neutral-800 space-y-2">
                <button
                  onClick={() => {
                    onToggleConsole();
                    toggleMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/30 rounded-lg hover:bg-emerald-900/40 transition-colors"
                >
                  <TerminalSquare size={14} />
                  ~$ Open Developer Console
                </button>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block text-center text-xs text-neutral-500 hover:text-neutral-300 transition-colors py-1.5"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
