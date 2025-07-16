"use client";
// import logo from "@/app/favicon.ico";
import { AnimatePresence, motion } from "framer-motion";
import {
  Contact,
  LayoutDashboard,
  LogIn,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      href: "#contacts",
      label: "Contacts",
      icon: <Contact className="w-4 h-4 mr-2" />,
    },
    {
      href: "#projects",
      label: "Projects",
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
    <nav className="top-0 z-[99999] text-white shadow-lg bg-gradient-to-r from-gray-900 to-gray-800">
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center text-sm font-medium transition-colors duration-200 
                  ${
                    pathname === link.href
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-gray-300 hover:text-white"
                  }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="w-full text-white bg-transparent border-gray-600 hover:bg-gray-700 flex items-center gap-1 py-2 px-4 rounded-md"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
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
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay:
                      navLinks.findIndex((l) => l.href === link.href) * 0.1,
                    duration: 0.3,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className={`flex items-center py-2 text-sm font-medium transition-colors duration-200 
                      ${
                        pathname === link.href
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-gray-300 hover:text-white"
                      }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                <Button
                  asChild
                  variant="outline"
                  className="w-full text-white bg-transparent border-gray-600 hover:bg-gray-700"
                >
                  <Link href="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
