import Image from "next/image";
import { ContactIcons } from "./Contacts";
import { MotionA, MotionDiv, MotionLi, MotionSpan } from "./MotionDiv";
import { slideIn } from "@utils/motion";
const Footer = () => {
  return (
    <footer className="p-4 bg-white rounded-t-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
      <div className="flex sm:flex-row flex-col items-center sm:justify-between max-w-screen-xl m-auto">
        <MotionA
          variants={slideIn("left", "spring", 0, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          href="#"
          target="_blank"
          className="flex items-center mb-4 sm:mb-0"
        >
          <Image
            src="/sdev.png"
            width={32}
            height={32}
            className="mr-4 h-8 rounded-full"
            alt="sdev logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            S-<span className="text-[#0ef]">Dev</span>
          </span>
        </MotionA>
        <ul className="flex flex-wrap items-center mb-6 sm:mb-0 gap-5">
          {ContactIcons.map((obj, ind) => (
            <MotionLi
              variants={slideIn("right", "spring", 0.2 * ind, 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.2,
                y: -8,
                boxShadow: "1px 2px 35px 32px white",
              }}
              className={` transition-transform  rounded-full ${obj.clss}`}
              key={ind}
            >
              <a
                href={obj.url}
                target="_blank"
                className="text-sm text-gray-500 hover:underline dark:text-gray-400"
              >
                {obj.icon}
              </a>
            </MotionLi>
          ))}
        </ul>
      </div>
      <hr className="sm:my-6  border-gray-200 sm:mx-auto dark:border-gray-700 font-bold" />
      <MotionSpan
        variants={slideIn("up", "spring", 0, 0.9)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="block text-sm text-center text-gray-500 sm:text-center dark:text-gray-400 sm:pt-0 pt-3"
      >
        © 2024{" "}
        <a
          href="https://sdev-portfolio.vercel.app"
          target="_blank"
          className="hover:underline"
        >
          S-Dev
        </a>{" "}
        | All Rights Reserved.
      </MotionSpan>
    </footer>
  );
};

export default Footer;
