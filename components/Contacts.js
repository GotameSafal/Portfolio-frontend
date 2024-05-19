import { FaFacebook, FaGithub, FaLinkedinIn } from "@utils/iconExp";
import { MotionButton, MotionInput, MotionTextarea } from "./MotionDiv";
import { slideIn } from "@utils/motion";
export const ContactIcons = [
  {
    icon: <FaFacebook color="#0a83ed" size={40} />,
    url: "https://www.facebook.com/safal.gotame.5",
    clss: "bg-white",
  },
  {
    icon: <FaLinkedinIn color="white" size={25} />,
    url: "https://www.linkedin.com/in/safal-gotame-1a8730266",
    clss: "bg-[#007ab5]",
  },
  {
    icon: <FaGithub color="black" size={40} />,
    url: "https://github.com/GotameSafal",
    clss: "bg-white",
  },
];

const Contacts = () => {
  return (
    <section>
      <div className="mx-auto mb-12 max-w-screen-xl px-1 sm:px-6 lg:px-8">
        <div className="m flex w-full flex-col gap-6 rounded bg-gray-900 p-4 shadow sm:p-12">
          <p className="text-center text-3xl font-bold leading-7 text-white">
            Contact <span className="text-[#0ef]">Me</span>
          </p>
          <form action="" method="post" className="flex flex-col gap-4">
            <div className="items-center md:flex">
              <div className="flex w-full flex-col md:w-1/2">
                <MotionInput
                  variants={slideIn("left", "spring", 0, 0.8)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  type="text"
                  placeholder="Full Name"
                  className="rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700"
                />
              </div>
              <div className="mt-4 flex w-full flex-col md:ml-6 md:mt-0 md:w-1/2">
                <MotionInput
                  variants={slideIn("right", "spring", 0, 0.8)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  type="email"
                  placeholder="Email"
                  className="rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700"
                />
              </div>
            </div>
            <div className="">
              <MotionInput
                variants={slideIn("left", "spring", 0, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                type="text"
                placeholder="Phonenumber"
                className="w-full rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700"
              />
            </div>
            <div>
              <MotionTextarea
                variants={slideIn("right", "spring", 0, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                type="text"
                placeholder="Your message"
                className="h-36 w-full rounded border-0 bg-gray-800 p-3 text-base leading-none text-gray-50 focus:border-blue-700 sm:h-40"
              ></MotionTextarea>
            </div>
            <div className="flex w-full items-center justify-center">
              <MotionButton
                variants={slideIn("up", "spring", 0, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-6 w-full rounded bg-blue-700 px-10 py-4 font-bold leading-none text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 sm:mt-9"
              >
                Send message
              </MotionButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
