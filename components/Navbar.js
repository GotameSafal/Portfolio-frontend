"use client";
import { navbarState, setScreen } from "@redux/navbar";
import { getToken, setToken } from "@redux/user";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, useDisclosure } from "@chakra-ui/react";
import { SideBar } from "./Sidebar";
import { RiMenuFoldLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";
import Link from "next/link";
import toast from "react-hot-toast";
const Navbar = ({ cookie }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const { screen } = useSelector(navbarState);
  useEffect(() => {
    if (cookie) {
      dispatch(setToken(cookie.value));
    }
  }, [cookie]);
  useEffect(() => {
    const handler = () => {
      dispatch(setScreen(window.innerWidth));
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  useEffect(() => {
    if (isOpen && screen >= 768) {
      onClose();
    }
  }, [screen]);

  const logoutHandler = () => {
    Cookies.remove("sdev");
    toast.success('Successfully logged out')
    dispatch(setToken(null));
  };

  return (
    <>
      <div className="dark-mode:text-gray-200 dark-mode:bg-gray-800 w-full bg-white text-gray-700">
        <div className="mx-auto flex max-w-screen-xl border-b flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between px-4 py-2">
            <Link href="/">
              <Image
                width={55}
                height={55}
                src="/sdev-high-resolution-logo-black-transparent.png"
                alt="logo"
                className="rounded-full"
              />
            </Link>
            {isOpen ? (
              <button
                onClick={onClose}
                className="rounded-full p-2 bg-orange-500 text-white md:hidden focus:outline-none focus:shadow-outline"
              >
                <RxCross2 />
              </button>
            ) : (
              <button
                onClick={onOpen}
                className="rounded-full p-2 bg-orange-500 text-white md:hidden focus:outline-none focus:shadow-outline"
              >
                <RiMenuFoldLine />
              </button>
            )}
          </div>
          <nav className="hidden flex-grow flex-col pb-4 md:flex md:flex-row items-center md:justify-end md:pb-0">
            <a
              className="dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:mt-0"
              href="#about"
            >
              About me
            </a>
            <a
              className="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:ml-4 md:mt-0"
              href="#skills"
            >
              Skills
            </a>
            <a
              className="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:ml-4 md:mt-0"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:ml-4 md:mt-0"
              href="#contacts"
            >
              Contact
            </a>
            {token && (
              <a
                className="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:ml-4 md:mt-0"
                href="/dashboard"
              >
                Dashboard
              </a>
            )}
            {token ? (
              <Button
                onClick={logoutHandler}
                colorScheme="gray"
                className="rounded-sm ml-4"
                size="sm"
              >
                logout
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  colorScheme="twitter"
                  className="rounded-sm ml-4"
                  size="sm"
                >
                  login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
      <SideBar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

export default Navbar;
