import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <motion.div
        ref={ref}
        className="relative max-w-7xl pt-8 mx-auto pb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start md:gap-10"
            variants={itemVariants}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"
                variants={circleVariants}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 8px rgba(59, 130, 246, 0.5)",
                      "0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </motion.div>

              <motion.div
                className="hidden md:block text-xl md:pl-20 text-neutral-500 dark:text-neutral-500"
                variants={itemVariants}
              >
                <motion.p
                  className="md:text-3xl text-xl font-bold text-gray-100"
                  whileHover={{ color: "#60a5fa" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.date}
                </motion.p>
                <motion.p
                  className="md:text-2xl text-lg font-semibold text-gray-400"
                  whileHover={{ color: "#93c5fd" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.job}
                </motion.p>
                <motion.p
                  className="md:text-2xl text-lg font-semibold text-gray-400"
                  whileHover={{ color: "#93c5fd" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.title}
                </motion.p>
              </motion.div>
            </div>

            <motion.div
              className="relative pl-20 pr-4 md:pl-4 w-full"
              variants={itemVariants}
              whileHover={{
                x: 5,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="block md:hidden text-xl text-neutral-500 dark:text-neutral-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.p
                  className="md:text-3xl text-xl font-bold text-gray-100"
                  whileHover={{ color: "#60a5fa" }}
                >
                  {item.date}
                </motion.p>
                <motion.p
                  className="md:text-2xl text-lg font-semibold text-gray-400"
                  whileHover={{ color: "#93c5fd" }}
                >
                  {item.job}
                </motion.p>
                <motion.p
                  className="md:text-2xl text-lg font-semibold text-gray-400"
                  whileHover={{ color: "#93c5fd" }}
                >
                  {item.title}
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-gray-50"
              >
                {item.content}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            animate={{
              boxShadow: [
                "0 0 2px rgba(59, 130, 246, 0.3)",
                "0 0 8px rgba(59, 130, 246, 0.6)",
                "0 0 2px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
