"use client";
import { Heading, Button, Text } from "@chakra-ui/react";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
const ProjectCard = ({ data }) => {
  return (
    <div className="w-full cursor-pointer mx-1 sm:mx-1 min-h-[480px] shadow-md drop-shadow-md rounded-sm">
      <img
        className="w-full h-[200px]"
        src={data.image.url ? data.image.url : "bg1.avif"}
        alt="default"
      />
      <div className="flex flex-col px-2 ">
        <Heading as="h3" size="md" className="py-2 ">
          {data.title}
        </Heading>
        <Heading as="h4" size="sm" className=" text-gray-700">
          {data?.subTitle}
        </Heading>
        <Text className="text-justify py-2">{data?.description}</Text>
        <div className="flex flex-wrap my-2">
          <Text className="text-md font-semibold me-2">Technologies :</Text>
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
            <Button
              rounded="sm"
              leftIcon={<BiLinkExternal />}
              size="sm"
              colorScheme="gray"
            >
              Go Live
            </Button>
          </a>
          <a href={data?.sourceCode} target="_blank">
            <Button
              rounded="sm"
              leftIcon={<BsCodeSlash />}
              size="sm"
              colorScheme="blue"
            >
              Source code
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
