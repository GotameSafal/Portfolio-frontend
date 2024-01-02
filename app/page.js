"use client";
import { Button, Heading } from "@chakra-ui/react";
import { useGetDetailsQuery } from "@redux/api";
import ProjectCard from "@components/ProjectCard";
import ContactCard from "@components/ContactCard";
import SkillCard from "@components/SkillCard";
import {
  BiCodeAlt,
  IoServerOutline,
  PiDotsThreeOutlineDuotone,
} from "@utils/iconExp.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@components/Loader";
export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useGetDetailsQuery();
  return (
    <main className="">
      <section className="md:h-screen h-[80vh] lg:justify-start justify-center flex items-center">
        <div className="lg:ml-16 flex flex-col gap-2">
          <Heading className="font-bold  md:w-[640px] text-center md:text-left w-auto md:px-0 px-4 lg:text-3xl text-lg sm:text-xl md:2xl">
            I am <strong className="text-[#02aab0]">Safal</strong>, a web
            developer proficient in both{" "}
            <strong className="text-[#02aab0]">frontend</strong> and{" "}
            <strong className="text-[#02aab0]">backend</strong>.
          </Heading>
          <div className="flex md:justify-start justify-center">
            <Link href="#about">
              <Button
                variant="outline"
                className="sm:lg md"
                rounded="sm"
                colorScheme="teal"
              >
                Know more
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="sm:h-[590px] bg-[#02aab0] h-auto sm:py-0 py-4 pb-8 w-full flex items-center justify-center"
        style={{ clipPath: `polygon(0 0,100% 0,100% 80%,0 100%)` }}
      >
        <div className="lg:w-[80%] text-white mx-auto flex flex-col sm:flex-row  gap-x-12 gap-y-4 px-2 sm:px-0 ">
          <Heading
            className="uppercase sm:text-xl text-lg tracking-wide flex justify-center"
            as="h1"
          >
            About me
          </Heading>
          <div className="border-l-8 border-gray-700 px-4">
            <p className="text-justify sm:text-base text-sm">
              Motivated web development student pursuing a Bachelor of Computer
              Applications (BCA) degree with a strong passion for creating
              dynamic, full-stack web applications. Proficient in HTML, CSS,
              JavaScript, and experienced in using frameworks like React and
              Node.js. Committed to leveraging technical skills to contribute to
              innovative web projects.
            </p>
            <Button
              className="my-2"
              variant="outline"
              colorScheme="gray"
              size="sm"
              onClick={() => router.push("/resume")}
            >
              Resume
            </Button>
          </div>
        </div>
      </section>
      <section id="skills" className="py-4">
        <div className="h-full lg:w-[80%] sm:px-0 px-2 mx-auto">
          <Heading
            as="h2"
            className="flex justify-center tracking-widem text-lg sm:text-xl"
          >
            Skills
          </Heading>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex gap-y-6 gap-4 sm:flex-row flex-col justify-between">
              <SkillCard
                iconName={<BiCodeAlt size={20} />}
                iconClass={"bg-blue-100 text-blue-500"}
                skillName={"Frontend Developmnt"}
                skillClass={"text-gray-800"}
                data={data?.details?.skills?.frontend}
              />
              <SkillCard
                iconName={<IoServerOutline size={20} />}
                iconClass={"bg-yellow-100 text-yellow-500"}
                skillName={"Backend Development"}
                skillClass={"text-gray-800"}
                data={data?.details?.skills?.backend}
              />
              <SkillCard
                iconName={<PiDotsThreeOutlineDuotone size={20} />}
                iconClass={"bg-red-100 text-red-500"}
                skillName={"Others"}
                skillClass={"text-gray-800"}
                data={data?.details?.skills?.others}
              />
            </div>
          )}
        </div>
      </section>
      <section id="projects" className="py-4">
        <div className="h-full lg:w-[80%] sm:px-0 px-2 mx-auto">
          <Heading
            as="h2"
            className="tracking-wide flex justify-center mb-2 text-lg sm:text-xl"
          >
            Projects
          </Heading>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="gap-y-6 grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 justify-center gap-x-4">
              {data &&
                data?.details?.projects?.map((project, index) => (
                  <ProjectCard key={index} data={project} />
                ))}
            </div>
          )}
        </div>
      </section>
      <section
        id="contacts"
        style={{ clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0% 100%)" }}
        className="py-4 bg-[#57bda9] min-h-[350px]"
      >
        <div className="  lg:w-[80%] sm:px-0 mt-10 px-2 mx-auto">
          <Heading
            as="h2"
            className="flex mb-4 justify-center text-lg sm:text-xl"
          >
            Contact me
          </Heading>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6">
              {data &&
                data?.details?.contacts?.map((contact, index) => (
                  <ContactCard key={index} data={contact} />
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
