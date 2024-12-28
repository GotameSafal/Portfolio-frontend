import { FaFacebook, FaGithub, FaLinkedinIn } from "@utils/iconExp";
import Form from "./Form";
import {Facebook, Linkedin, Github} from "lucide-react"
const Contacts = () => {
  return (
    <section className="overflow-hidden bg-gray-900">
      <div className="max-w-screen-xl px-1 mx-auto mb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full gap-6 p-4 bg-gray-900 rounded shadow m sm:p-12">
          <h2 id="contacts" className="text-3xl font-bold leading-7 text-center text-white">
            Contact <span className="text-[#0ef]">Me</span>
          </h2>
          <Form />
        </div>
      </div>
    </section>
  );
};

export default Contacts;

export const ContactIcons = [
  {
    icon: <Facebook color="#0a83ed" size={35} />,
    url: "https://www.facebook.com/safal.gotame.5",
    clss: "bg-white p-1",
  },
  {
    icon: <Linkedin color="white" size={30} />,
    url: "https://www.linkedin.com/in/safal-gotame-1a8730266",
    clss: "bg-[#007ab5] p-2",
  },
  {
    icon: <Github color="black" size={35} />,
    url: "https://github.com/GotameSafal",
    clss: "bg-white p-1",
  },
];

