import { motion } from "framer-motion";
import { Facebook, Github, Linkedin } from "lucide-react";
import Form from "./Form";

const Contacts = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 0.8 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="overflow-hidden bg-gray-900 py-16 relative">
      {/* Animated background elements */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
      />

      <motion.div
        className="max-w-screen-xl px-4 mx-auto mb-12 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h2
            id="contacts"
            className="text-4xl font-bold leading-tight text-white mb-4"
            variants={itemVariants}
          >
            Get in{" "}
            <motion.span
              className="text-[#0ef]"
              animate={{
                textShadow: [
                  "0 0 5px rgba(0,238,255,0.3)",
                  "0 0 15px rgba(0,238,255,0.5)",
                  "0 0 5px rgba(0,238,255,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Touch
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </motion.p>
        </motion.div>

        <div className="flex items-center justify-center">
          {/* Contact Form */}
          <motion.div
            className="flex flex-col md:w-1/2 gap-6 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm relative z-10"
            variants={itemVariants}
          >
            <motion.h3
              className="text-2xl font-semibold text-white"
              variants={itemVariants}
            >
              Send Me a Message
            </motion.h3>

            <motion.div variants={itemVariants}>
              <Form />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacts;

export const ContactIcons = [
  {
    icon: <Facebook color="#0a83ed" size={24} />,
    url: "https://www.facebook.com/safal.gotame.5",
    clss: "bg-white p-1",
  },
  {
    icon: <Linkedin color="white" size={20} />,
    url: "https://www.linkedin.com/in/safal-gotame-1a8730266",
    clss: "bg-[#007ab5] p-2",
  },
  {
    icon: <Github color="black" size={24} />,
    url: "https://github.com/GotameSafal",
    clss: "bg-white p-1",
  },
];
