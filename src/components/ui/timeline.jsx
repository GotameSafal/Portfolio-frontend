import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data = [] }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div
        ref={ref}
        className="relative max-w-5xl mx-auto pt-4 pb-12"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-start pt-6 md:pt-12 md:gap-8 group"
          >
            {/* Left Column (Timeline Node & Meta) */}
            <div className="sticky flex items-center md:flex-col md:items-start z-30 top-36 self-start md:w-56 lg:w-64 shrink-0 pl-12 md:pl-10 mb-4 md:mb-0">
              {/* Timeline Indicator Node */}
              <div className="h-9 w-9 absolute left-0 md:left-0 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-lg group-hover:border-blue-500/60 transition-colors duration-300">
                <div className="h-3.5 w-3.5 rounded-full bg-blue-500/80 group-hover:bg-blue-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              </div>

              {/* Date & Period Label */}
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400/90 mb-0.5">
                  {item.date}
                </span>
                <span className="text-base font-semibold text-neutral-200 group-hover:text-white transition-colors">
                  {item.title}
                </span>
                <span className="text-xs text-neutral-400">
                  {item.job}
                </span>
              </div>
            </div>

            {/* Right Column (Card Content) */}
            <div className="relative pl-12 md:pl-0 pr-2 md:pr-4 w-full">
              {item.content}
            </div>
          </div>
        ))}

        {/* Dynamic Vertical Scroll Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-4 md:left-4 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-neutral-800 via-neutral-800/80 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)] pointer-events-none"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
          />
        </div>
      </div>
    </div>
  );
};
