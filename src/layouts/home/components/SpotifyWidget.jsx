import { motion } from "framer-motion";
import { Play } from "lucide-react";

const SpotifyWidget = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="col-span-1 md:col-span-2 bg-gradient-to-br from-green-950 to-black p-4 flex flex-col justify-between border border-green-500/20 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/35 text-green-400 text-[10px] font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
          Spotify Active
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="Spotify logo"
          className="w-5 h-5 opacity-80"
        />
      </div>

      <div className="flex items-center gap-3.5 z-10 mt-3">
        {/* Album Art mockup */}
        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700/60 relative overflow-hidden shrink-0 shadow-lg group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Play size={16} className="text-green-400 opacity-60" />
        </div>

        <div className="min-w-0">
          <h4 className="text-white text-xs font-semibold truncate hover:text-green-400 transition-colors cursor-pointer">
            Resonance (Coding Mix)
          </h4>
          <p className="text-[10px] text-gray-400 truncate mt-0.5">
            HOME • Synthwave Sessions
          </p>
        </div>
      </div>

      {/* Audio Visualizer Wave */}
      <div className="flex items-end gap-1.5 h-8 mt-4 z-10">
        {[2, 3, 5, 2, 4, 3, 6, 4, 2, 5, 3, 2, 4, 6, 2].map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-green-500 rounded-t-sm"
            animate={{
              height: [`${height * 4}px`, `${height * 6}px`, `${height * 3}px`, `${height * 4}px`],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SpotifyWidget;
