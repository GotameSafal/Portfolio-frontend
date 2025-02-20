"use client";
import logo from "@/app/favicon.ico";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useLazyGetLoggedInUserDetailsQuery } from "@redux/slices/api";
import { resetConfigUser, setToken, setUser } from "@redux/slices/configUser";
import { AnimatePresence, motion } from "framer-motion";
import {
  Contact,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { getLogout } from "./Apis";
const Navbar = ({ session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { token, user } = useSelector((state) => state.configUser);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [getLoggedInUserDetails] = useLazyGetLoggedInUserDetailsQuery();
  useEffect(() => {
    const userSession = async () => {
      if (session && !token) {
        dispatch(setToken(session.value));
        console.log("changed for token");
      }
      if (token && !user) {
        const res = await getLoggedInUserDetails().unwrap();
        console.log("res of user", res);
        dispatch(setUser(res?.user));
        try {
        } catch (error) {
          console.log("Error fetching user info");
        }
      }
    };
    userSession();
  }, [session, token, dispatch, getLoggedInUserDetails, user]);

  if (pathname.startsWith("/admin")) return <></>;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

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

  // Mobile Menu Variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  return (
    <nav className="sticky top-0 z-50 text-white shadow-lg bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-screen-2xl">
        {/* Logo and Search Container */}
        <div className="flex items-center w-full space-x-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 shrink-0">
            <Image src={logo} width={40} height={40} alt="Eduverse logo" />
            <span className="hidden text-xl font-bold tracking-wider text-white lg:block">
              S-DEV
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-6 md:flex">
          {/* Navigation Links */}
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

          {/* Authentication Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="@assets/image.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="text-white bg-gray-800 border-gray-700"
                >
                  <DropdownMenuItem
                    onSelect={() => {
                      /* Handle profile navigation */
                    }}
                    className="cursor-pointer hover:bg-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={async () => {
                      dispatch(resetConfigUser());
                      await getLogout();
                      toast.success("Successfully logout");
                      router.replace("/");
                    }}
                    className="text-red-400 cursor-pointer hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex w-full text-white bg-transparent border-gray-600 hover:bg-gray-700"
                >
                  <Link href="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu with Smooth Animation */}
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

              {/* Mobile Authentication Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full text-white bg-gray-700 hover:bg-gray-600"
                    >
                      <Image
                        src={user.avatar || "/default-avatar.png"}
                        alt="User avatar"
                        className="w-6 h-6 mr-2 rounded-full"
                      />
                      {user.name}
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        /* Handle logout */
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
