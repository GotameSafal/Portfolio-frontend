"use client";

import Image from "next/image";
const ContactCard = ({ data }) => {
  return (
    <a href={data?.redirectUrl} target="_blank">
      <div
        className="flex cursor-pointer flex-1 w-full flex-col bg-[#f6f6f6] rounded-md shadow-md drop-shadow-md p-5"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="border-b-2 py-2 border-b-gray-400 flex gap-4 items-center">
          <div size={50} className="bg-blue-100">
            <Image
              src={data?.image.url}
              alt="social media"
              width={40}
              height={40}
              className="rounded"
            />
          </div>
          <p className="p-lg font-semibold">{data?.title}</p>
        </div>
        <p className="py-3 ">{data?.description}</p>
      </div>
    </a>
  );
};

export default ContactCard;
