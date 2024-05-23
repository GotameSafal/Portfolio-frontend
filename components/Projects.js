import { nameWithIcons, projectObj } from "@utils/projectjson";
import { BiCodeAlt, BiLinkExternal } from "@utils/iconExp";
import Image from "next/image";
import { MotionA, MotionDiv, MotionH1, MotionSpan } from "./MotionDiv";
import { slideIn, fadeIn } from "@utils/motion";
import { fetchprojects } from "./Apis";

const Projects = async () => {
  const data = await fetchprojects();
  return (
    <section className="mb-3">
      <MotionH1
        variants={slideIn("left", "spring", 0.5, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="font-bold text-center text-3xl mb-6"
        id="projects"
      >
        Projects
      </MotionH1>
      <div className="projects">
        <div className="projct_containers">
          {data?.projects?.map((item, ind) => (
            <MotionDiv
              variants={slideIn(
                ind % 2 == 0 ? "left" : "right",
                "spring",
                0,
                1
              )}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={ind}
              className="project_container cursor-pointer"
            >
              <div className="project_dot"></div>
              <div className="project_heading text-xl mb-3 ps-2">
                {item.name}
              </div>
              <MotionDiv
                animate={{ transition: { delay: 0, duration: 0.6 } }}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "-10px 9px 40px -6px rgba(209, 172, 239, 0.75) inset",
                }}
                className="box"
              >
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  width="100%"
                  height="100%"
                  layout="intrinsic"
                  className="rounded-sm"
                />
                <h4 className="font-bold sm:text-lg text-base">Description</h4>
                <p className="text-sm leading-tight">{item.description}</p>
                <h4 className="font-bold mt-2">Technologies used</h4>
                <div className="flex flex-wrap gap-3">
                  {item.technologies.map((tag) => (
                    <MotionSpan
                      animate={{
                        transition: { delay: 0, duration: 0.5, damping: 20 },
                      }}
                      whileHover={{ scale: 1.2, y: -6 }}
                      key={tag}
                    >
                      {nameWithIcons[tag]}
                    </MotionSpan>
                  ))}
                </div>
                <div className="flex gap-3 mt-3">
                  <MotionA
                    variants={fadeIn("left", "spring", 1, 0.4)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ backgroundColor: "#cedaee", scale: 1.1 }}
                    target="_blank"
                    className="w-32 rounded-sm cursor-pointer no-underline text-sm p-1 font-bold flex items-center justify-center bg-gray-300"
                    href={item.projecturl}
                  >
                    <span className="me-1">
                      <BiLinkExternal size={20} color="black" />
                    </span>
                    <span>Go live</span>
                  </MotionA>
                  <MotionA
                    variants={fadeIn("right", "spring", 1, 0.4)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ backgroundColor: "#2c78bf", scale: 1.1 }}
                    target="_blank"
                    className="w-32 bg-[#3182ce] text-white font-bold rounded-sm  cursor-pointer no-underline text-sm flex items-center justify-center p-1"
                    href={item.gitsource}
                  >
                    <span className="me-1">
                      <BiCodeAlt size={20} color="white" />
                    </span>
                    <span>Source code</span>
                  </MotionA>
                </div>
              </MotionDiv>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
