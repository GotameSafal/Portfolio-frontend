import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Mail, MapPin, MessageSquare } from "lucide-react";
import Form from "./Form";


// Premium mini map component to mock geolocation coordinates
const MiniMap = () => (
  <div className="relative w-full h-32 rounded-xl bg-slate-950 border border-white/5 overflow-hidden flex items-center justify-center group">
    {/* Abstract Grid Map background */}
    <div 
      className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105"
      style={{
        backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
        backgroundSize: "16px 16px"
      }}
    />
    {/* Waves from pinpoint */}
    <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 animate-ping" />
    
    <div className="relative z-10 flex flex-col items-center gap-1">
      <MapPin className="text-blue-500 animate-bounce" size={20} />
      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Kathmandu, Nepal</span>
    </div>
  </div>
);

const Contacts = () => {
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

  const contactDetails = [
    { icon: MapPin, label: "Location", val: "Kathmandu, Nepal", color: "text-cyan-400 bg-cyan-950/30" },
    { icon: Mail, label: "Email", val: "lamichhanem36@gmail.com", color: "text-blue-400 bg-blue-950/30" },
  ];


  return (
    <section id="contacts" className="overflow-hidden bg-transparent py-16 relative">
      {/* Glow overlays */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="max-w-screen-lg px-4 mx-auto sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Title */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get in <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Have an exciting opportunity or just want to chat? Drop me a message below.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Info side (2 cols) */}
          <motion.div className="md:col-span-2 space-y-6" variants={itemVariants}>
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="text-blue-500" size={18} />
                Contact Info
              </h3>

              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, label, val, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${color}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</p>
                      <p className="text-xs text-gray-200 mt-0.5">{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials buttons row */}
              <div className="pt-2 flex gap-2">
                {ContactIcons.map((obj, idx) => (
                  <motion.a
                    key={idx}
                    href={obj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center shadow"
                  >
                    {obj.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Geolocation Card */}
            <MiniMap />
          </motion.div>

          {/* Form side (3 cols) */}
          <motion.div 
            className="md:col-span-3 bg-slate-900/60 p-6 rounded-2xl border border-white/5 shadow-xl relative"
            variants={itemVariants}
          >
            <Form />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacts;

export const ContactIcons = [
  {
    icon: <Facebook color="#60a5fa" size={18} />,
    url: "https://www.facebook.com/safal.gotame.5",
  },
  {
    icon: <Linkedin color="#60a5fa" size={16} />,
    url: "https://www.linkedin.com/in/safal-gotame-1a8730266",
  },
  {
    icon: <Github color="#60a5fa" size={18} />,
    url: "https://github.com/GotameSafal",
  },
];
