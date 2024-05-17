"use client";
import { RiMenuFoldLine, RxCross2 } from "@utils/iconExp";
import { navVariants } from "@utils/motion";
import { navlist } from "@utils/navList";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      {/* <div className="dark-mode:text-gray-200 dark-mode:bg-gray-800 w-full bg-white text-gray-700">
        <div className="mx-auto flex max-w-screen-xl border-b flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between px-4 py-2">
            <Link href="/">
              <Image
                width={35}
                height={35}
                src="/sdev.png"
                alt="logo"
                className="rounded-full"
              />
            </Link>
            <button className="rounded-full p-2 bg-orange-500 text-white md:hidden focus:outline-none focus:shadow-outline">
              <RxCross2 />
            </button>
            <button className="rounded-full p-2 bg-orange-500 text-white md:hidden focus:outline-none focus:shadow-outline">
              <RiMenuFoldLine />
            </button>
          </div>
          <nav className="hiddmotion.en flex-grow flex-col pb-4 md:flex md:flex-row items-center md:justify-end md:pb-0 text-xl">
            {navlist.map((item) => {
              return (
                <motion.a
                  variants={navVariants}
                  initial="hidden"
                  animate="show"
                  key={item}
                  className="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text- font-semibold focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:ml-4 md:mt-0"
                  href={item.url}
                >
                  <motion.p whileHover={{y:-10}}>{item.name}</motion.p>
                </motion.a>
              );
            })}
          </nav>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
