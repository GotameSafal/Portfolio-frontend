"use client";
import Image from "next/image";
const ProjectCard = ({ data }) => {
  return (
    <div className="w-full cursor-pointer mx-1 sm:mx-1 min-h-[480px] shadow-md drop-shadow-md rounded-sm">
      <Image
        width="100%"
        height={200}
        src={data.image.url ? data.image.url : "bg1.avif"}
        alt="default"
      />
      <div className="flex flex-col px-2 ">
        <h3 as="h3" size="md" className="py-2 ">
          {data.title}
        </h3>
        <h3 as="h4" size="sm" className=" p-gray-700">
          {data?.subTitle}
        </h3>
        <p className="p-justify py-2">{data?.description}</p>
        <div className="flex flex-wrap my-2">
          <p className="p-md font-semibold me-2">Technologies :</p>
          <ul className="flex gap-3 flex-wrap">
            {data?.technologies.map((item, index) => (
              <li
                key={index}
                className="bg-gray-300 rounded-md cursor-pointer px-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex my-3 gap-3">
          <a href={data?.goLive} target="_blank">
            <button
              rounded="sm"
              size="sm"
              colorScheme="gray"
            >
              Go Live
            </button>
          </a>
          <a href={data?.sourceCode} target="_blank">
            <button
              rounded="sm"
              size="sm"
              colorScheme="blue"
            >
              Source code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
