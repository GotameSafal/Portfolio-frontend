import { technical } from "@utils/skillsList";
import { Bar, Circle } from "./progress";
const SkillSet = () => {
  return (
    <section className="max-w-screen-xl m-auto w-full">
      <h1 className="font-bold text-center text-3xl mb-6">
        My <span className="text-[#0ef]">Skills</span>
      </h1>
      <div className="lg:flex-row flex flex-col  w-full">
        <div className="px-4 lg:px-0 lg:min-w-[640px] w-full">
          <h2 className="text-xl underline underline-offset-8 decoration-8 decoration-gray-800 max-w-[640px] text-center font-semibold mb-4">
            Technical Skills
          </h2>
          <div className="details">
            {technical.map((item) => {
              return (
                <div className="mb-4" key={item.tagname}>
                  <div className="mb-1">{item.icon}</div>
                  <div className="semi-bold lg:text-lg text-md">
                    {item.tagname}
                  </div>
                  <Bar
                    completed={item.progress.completed}
                    label={item.progress.label}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:min-w-[640px] w-full">
          <h2 className="text-xl text-center underline underline-offset-8 decoration-8 mb-4 decoration-gray-800 font-semibold">
            Professional Skills
          </h2>
          <div className="grid sm:grid-cols-2 grid-cols-1 sm:grid-rows-1 grid-rows-2 gap-3">
            <Circle progress={80} sub="Communciation" />

            <Circle progress={75} sub="Problem Solving" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSet;
