import { slideIn } from "@utils/motion";
import { MotionDiv } from "./MotionDiv";
import { PiDownloadSimpleLight } from "react-icons/pi";

const DownloadResume = () => {
  return (
    <MotionDiv
      variants={slideIn("up", "spring", 0, 0.5)}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.1, y: -4, backgroundColor: "tomato" }}
      className="w-12 h-12 rounded-full flex justify-center items-center bg-red-500 fixed bottom-3 right-3"
    >
      <a href="/resume.pdf" download="resume.pdf">
        <PiDownloadSimpleLight size={25} color="white" />
      </a>
    </MotionDiv>
  );
};

export default DownloadResume;
