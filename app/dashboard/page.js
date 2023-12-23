"use client";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import {
  useCreateDetailsMutation,
  useDeleteContactsMutation,
  useDeleteProjectMutation,
  useGetDetailsQuery,
} from "@redux/api";
import toast from "react-hot-toast";
const Dashboard = () => {
  const router = useRouter();
  const [filedata, setFiledata] = useState({
    contact: [],
    project: [],
    banner: [],
  });
  const { data, isLoading, isError } = useGetDetailsQuery();
  const [createDetails, { isLoading: isCreating }] = useCreateDetailsMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [deleteContact] = useDeleteContactsMutation();
  const changeHandler = (e) => {
    const { name, files } = e.target;
    setFiledata((prev) => ({ ...prev, [name]: files[0] }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("contact", filedata.contact);
    formData.append("project", filedata.project);
    formData.append("banner", filedata.banner);
    formData.append(
      "skills",
      JSON.stringify({
        frontend:
          "html, css, javascript, tailwind css, react next.js bootstrap, tailwind ui, chakra ui, material ui",
        backend: "node.js express mongodb, mysql, mongoose, php",
        others: "vscode, github, java, c#",
      })
    );
    formData.append(
      "projects",
      JSON.stringify({
        title: "Ecommerce",
        subTitle: "Eazy Shopping",
        description:
          "Do sint quis tempor consectetur magna ipsum reprehenderit dolor occaecat Lorem irure enim. Aute do magna tempor nisi exercitation nulla do non velit occaecat quis. Incididunt eu excepteur fugiat velit proident voluptate.",
        technologies:
          "html, css , javascript, react, nextjs,     chakra ui,   node.js,    express,mongodb",
        goLive: "http://localhost:3000",
        sourceCode: "https://github.com",
      })
    );
    formData.append(
      "contacts",
      JSON.stringify({
        title: "Linked In",
        description: `Hey let's connect right now`,
        redirectUrl: "http://linkedin.com",
      })
    );
    createDetails(formData)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className="lg:w-[80%] h-screen flex flex-col justify-center gap-8 mx-auto lg:px-0 px-2">
      <div>
        <h1 className="font-semibold text-lg">Skills</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/dashboard/skills")}
            leftIcon={<GrUpdate />}
            colorScheme="cyan"
            size="sm"
          >
            Update Skills
          </Button>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-lg">Project</h1>
        {isLoading ? (
          <p className="font-semibold text-lg my-4">Loading...</p>
        ) : (
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-hepader-grou">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Title
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {data?.details?.projects?.map((project, index) => (
                <tr
                  key={index}
                  className="bg-gray-300 border border-b-gray-800 border-grey-500 md:border-none block md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Title
                    </span>
                    {project.title}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Actions
                    </span>
                    <button
                      onClick={() => {
                        deleteProject(project._id)
                          .unwrap()
                          .then((res) => toast.success(res.message))
                          .catch((err) => console.error(err));
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Button
          onClick={() => router.push("/dashboard/project/new")}
          leftIcon={<AddIcon />}
          colorScheme="twitter"
          size="sm"
        >
          New Project
        </Button>
      </div>
      <div>
        <h1 className="font-semibold text-lg">Contacts</h1>
        {isLoading ? (
          <p className="font-semibold text-lg my-4">Loading...</p>
        ) : (
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-hepader-grou">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Title
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {data?.details?.contacts?.map((contact, index) => (
                <tr
                  key={index}
                  className="bg-gray-300 border border-b-gray-800 border-grey-500 md:border-none block md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Title
                    </span>
                    {contact.title}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">
                      Actions
                    </span>
                    <button
                      onClick={() => {
                        deleteContact(contact._id)
                          .unwrap()
                          .then((res) => toast.success(res.message))
                          .catch((err) => console.error(err));
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Button
          onClick={() => router.push("/dashboard/contacts/new")}
          leftIcon={<AddIcon />}
          colorScheme="twitter"
          size="sm"
        >
          Add Contacts
        </Button>
      </div>
      <hr/>
      <div>
        <h1 className="uppercase font-bold text-lg py-2">First time details</h1>
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <label className="w-20" for="contact">
                Contact:
              </label>
              <input
                id="contact"
                type="file"
                onChange={changeHandler}
                name="contact"
              />
            </div>
            <div className="flex  gap-2">
              <label className="w-20" for="project">
                Project:
              </label>
              <input type="file" onChange={changeHandler} name="project" />
            </div>
          </div>
          <div>
            <Button
              size="sm"
              variant="outline"
              colorScheme="twitter"
              isLoading={isCreating}
              type="submit"
            >
              submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Dashboard;
