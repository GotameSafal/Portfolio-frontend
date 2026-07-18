import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

const NepalClockWidget = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      // Kathmandu is UTC + 5:45 (345 minutes offset)
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const kathmandu = new Date(utc + 3600000 * 5.75);
      
      let hrs = kathmandu.getHours();
      const mins = String(kathmandu.getMinutes()).padStart(2, "0");
      const secs = String(kathmandu.getSeconds()).padStart(2, "0");
      const ampm = hrs >= 12 ? "PM" : "AM";
      hrs = hrs % 12 || 12; // convert to 12-hour format
      
      setTime(`${hrs}:${mins}:${secs} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="col-span-1 bg-gradient-to-br from-indigo-950 to-slate-950 p-4 flex flex-col justify-between border border-indigo-500/20 relative"
    >
      <div className="flex justify-between items-start text-indigo-400">
        <Clock size={18} />
        <span className="flex items-center gap-1 text-[9px] bg-indigo-500/10 border border-indigo-500/30 px-1.5 py-0.5 rounded text-indigo-300 font-medium">
          <MapPin size={8} />
          GMT +5:45
        </span>
      </div>

      <div className="my-2">
        <h4 className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
          Local Time
        </h4>
        <div className="text-sm md:text-base font-mono font-bold text-white mt-1">
          {time || "--:--:-- --"}
        </div>
        <p className="text-[9px] text-gray-400 mt-0.5">Kathmandu, Nepal</p>
      </div>

      <div className="flex items-center gap-1.5 text-[9px] text-indigo-200">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
        <span>Status: Coding Active</span>
      </div>
    </motion.div>
  );
};

export default NepalClockWidget;
