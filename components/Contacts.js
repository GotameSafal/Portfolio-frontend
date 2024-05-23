import { FaFacebook, FaGithub, FaLinkedinIn } from "@utils/iconExp";
import Form from "./Form";
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
          <h2 id="contacts" className="text-center text-3xl font-bold leading-7 text-white">
            Contact <span className="text-[#0ef]">Me</span>
          </h2>
          <Form />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
