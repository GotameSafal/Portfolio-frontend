import { technical } from "@utils/skillsList";
import { Bar, Circle } from "./progress";
import { MotionDiv, MotionH1, MotionH2 } from "./MotionDiv";
import { slideIn } from "@utils/motion";
const SkillSet = () => {
  return (
    <section className="max-w-screen-xl m-auto w-full mb-3">
      <MotionH1
        variants={slideIn("left", "spring", 0.5, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="font-bold text-center text-3xl mb-6"
      >
        My <span className="text-[#0ef]">Skills</span>
      </MotionH1>
      <div className="lg:flex-row flex flex-col  w-full">
        <div className="px-4 lg:px-0 lg:min-w-[640px] w-full">
          <MotionH2
            variants={slideIn("down", "spring", 0.6, 0.9)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl underline underline-offset-8 decoration-8 decoration-gray-800 max-w-[640px] text-center font-semibold mb-4"
          >
            Technical Skills
          </MotionH2>
          <div className="details">
            {technical.map((item, ind) => {
              return (
                <MotionDiv
                  variants={slideIn("left", "spring", 0.2 * (ind + 1), 0.4)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mb-4"
                  key={item.tagname}
                >
                  <div className="mb-1">{item.icon}</div>
                  <div className="semi-bold lg:text-lg text-md">
                    {item.tagname}
                  </div>
                  <Bar
                    completed={item.progress.completed}
                    label={item.progress.label}
                  />
                </MotionDiv>
              );
            })}
          </div>
        </div>
        <div className="lg:min-w-[640px] w-full">
          <MotionH2
            variants={slideIn("down", "spring", 0.6, 0.9)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl text-center underline underline-offset-8 decoration-8 mb-4 decoration-gray-800 font-semibold"
          >
            Professional Skills
          </MotionH2>
          <MotionDiv
            variants={slideIn("right", "spring", 0.7, 0.9)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 grid-cols-1 sm:grid-rows-1 grid-rows-2 gap-3"
          >
            <Circle progress={80} sub="Communciation" />

            <Circle progress={75} sub="Problem Solving" />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default SkillSet;
