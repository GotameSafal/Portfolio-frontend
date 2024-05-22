"use client";
import { RiMenuFoldLine, RxCross2 } from "@utils/iconExp";
import { navVariants } from "@utils/motion";
import { navlist } from "@utils/navList";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <section className="dark-mode:text-gray-200 dark-mode:bg-gray-800 w-full bg-white text-gray-700">
      <div className="mx-auto mb-2 flex max-w-screen-xl border-b px-4 items-center justify-between md:px-6 lg:px-8">
        <div className="flex flex-row items-center px-4 py-2">
          <Link href="/">
            <img
              src="/sdev.png"
              alt="logo"
              className="rounded-full lg:w-9 lg:h-9 w-7 h-7"
            />
          </Link>
        </div>
        <nav className="flex-grow pb-4 flex  items-center justify-end md:pb-0 md:text-xl sm:text-base text-sm">
          {navlist.map((item) => {
            return (
              <motion.a
                variants={navVariants}
                initial="hidden"
                animate="show"
                key={item}
                className="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-base font-semibold focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:ml-4 md:mt-0"
                href={item.url}
              >
                <motion.p whileHover={{ y: -10 }}>{item.name}</motion.p>
              </motion.a>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
