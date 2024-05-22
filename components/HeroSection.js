import {
  MotionButton,
  MotionDiv,
  MotionH1,
  MotionH3,
  MotionP,
} from "@components/MotionDiv";
import { buttonVariants, slideIn, textVariant } from "@utils/motion";
import Image from "next/image";
const HeroSection = () => {
  return (
    <div className="max-w-screen-xl lg:mx-auto bg-blue flex h-screen lg:flex-row flex-col lg:gap-0 gap-6 mx-6">
      <div className="flex flex-col ms:ms-5 h-full justify-center lg:order-none order-1">
        <div className="lg:text-start text-center gap-4">
          <MotionH1
            variants={textVariant(0.3)}
            initial="hidden"
            animate="show"
            className="lg:text-5xl font-bold text-3xl"
          >
            {"Hi, It's "}
            <span className="">Safal</span>
          </MotionH1>
          <MotionH3
            variants={textVariant(0.2)}
            initial="hidden"
            animate="show"
            className="text-animation lg:text-3xl text:lg"
          >
            I am a <span></span>
          </MotionH3>
          <MotionP
            variants={textVariant(0.5)}
            initial="hidden"
            animate="show"
            className="text-justify sm:text-base text-sm my-1"
          >
            Deserunt aliqua tempor elit enim occaecat laborum cillum sint
            consectetur. Laboris do voluptate do minim in irure incididunt enim
            dolor ipsum laborum non cillum dolore. Ullamco et minim sint
            incididunt Lorem do dolore deserunt.
          </MotionP>
          <div className="flex lg:justify-start mt-2 justify-center gap-3">
            <MotionButton
              variants={buttonVariants}
              initial="hidden"
              animate="show"
              className="py-2 w-32 rounded-sm bg-[#aa88fa] hover:scale-110 transition-transform hover:bg-[#48386e] font-semibold text-white"
            >
              Hire
            </MotionButton>
            <MotionButton
              variants={buttonVariants}
              initial="hidden"
              animate="show"
              className="py-2 w-32 text-white rounded-sm bg-[#319795] transition-transform hover:bg-[#2e6a69] font-semibold hover:scale-110"
            >
              Contact
            </MotionButton>
          </div>
        </div>
      </div>
      <MotionDiv
        variants={slideIn("right", "spring", 0.5, 1)}
        initial="hidden"
        animate="show"
        className="flex justify-center items-center h-full lg:min-w-[640px] lg:order-1 order-none"
      >
        <Image
          className="profile"
          layout="intrinsic"
          src="/profile.jpg"
          alt="profile.jpg"
          width={250}
          height={250}
        />
      </MotionDiv>
    </div>
  );
};
export default HeroSection;
