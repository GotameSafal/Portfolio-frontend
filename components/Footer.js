import Image from "next/image";
import { ContactIcons } from "./Contacts";
import { MotionA, MotionDiv, MotionLi, MotionSpan } from "./MotionDiv";
import { slideIn } from "@utils/motion";
import logo from "@app/favicon.ico";
const Footer = () => {
  return (
    <footer className="p-4 bg-gray-900 border-t-2 shadow bg md:px-6 md:py-4">
      <div className="flex flex-col items-center max-w-screen-xl m-auto sm:flex-row sm:justify-between">
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
            src={logo}
            width={32}
            height={32}
            className="h-8 mr-4 rounded- full"
            alt="sdev logo"
          />
          <span className="self-center text-xl font-semibold text-white whitespace-nowrap">
            S-<span className="text-[#0ef]">Dev</span>
          </span>
        </MotionA>
        <ul className="flex flex-wrap items-center gap-5 mb-6 sm:mb-0">
          {ContactIcons.map((obj, ind) => (
            <MotionLi
              variants={slideIn("right", "spring", 0.2 * ind, 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.2,
                y: -8,
              }}
              className={` transition-transform scale-50 rounded-full ${obj.clss}`}
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
      <hr className="font-bold border-gray-200 sm:my-6 sm:mx-auto dark:border-gray-700" />
      <MotionSpan
        variants={slideIn("up", "spring", 0, 0.9)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="block pt-3 text-sm text-center text-gray-500 sm:text-center dark:text-gray-400 sm:pt-0"
      >
        © {}
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
