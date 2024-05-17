import { MotionP } from "@components/MotionDiv";
import SkillSet from "@components/SkillSet";
import { textVariant } from "@utils/motion";
import Image from "next/image";

export default function Pages({ children }) {
  return (
    <main>
      <div className="max-w-screen-xl lg:mx-auto bg-blue flex h-screen lg:flex-row flex-col lg:gap-0 gap-6 mx-6">
        <div
          className="flex flex-col ms:ms-5 h-full justify-center lg:order-none order-1"
        >
          <div className="lg:text-start text-center gap-4">
            <h1 className="lg:text-5xl font-bold text-3xl">
              {"Hi, It's "}
              <span>Safal</span>
            </h1>
            <h3 className="text-animation lg:text-3xl text:lg">
              I am a <span></span>
            </h3>
            <MotionP
            variants={textVariant(0.5)}
             className="lg:text-justify text-center">
              Deserunt aliqua tempor elit enim occaecat laborum cillum sint
              consectetur. Laboris do voluptate do minim in irure incididunt
              enim dolor ipsum laborum non cillum dolore. Ullamco et minim sint
              incididunt Lorem do dolore deserunt.
            </MotionP>
            <div className="my-4">icons</div>
            <div className="flex lg:justify-start justify-center gap-3">
              <button className="py-2 w-32 rounded-sm bg-[#7d6da1] font-semibold text-white">Hire</button>
              <button className="py-2 w-32 text-white rounded-sm bg-[#319795] font-semibold">Contact</button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-full lg:min-w-[640px] lg:order-1 order-none">
          <Image
            className="profile"
            layout="intrinsic"
            src="/profile.jpg"
            alt="profile.jpg"
            width={250}
            height={250}
          />
        </div>
      </div>
      <SkillSet/>
    </main>
  );
}
