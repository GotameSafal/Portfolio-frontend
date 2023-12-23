"use Client";
import { Circle, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
const SkillCard = ({ iconClass, iconName, skillName, skillClass, data }) => {
  return (
    <motion.div className="w-full sm:w-full min-h-[330px] p-4 shadow-md drop-shadow-md">
      <div className="flex border-b py-3 border-gray-500 gap-4 items-center">
        <Circle size="40px" className={iconClass}>
          {iconName}
        </Circle>
        <Heading as="h3" size="md" className={skillClass}>
          {skillName}
        </Heading>
      </div>
      <ul className="px-14 py-3 list">
        {data?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCard;
