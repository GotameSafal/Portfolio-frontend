"use client";

import { useAddProjectMutation } from "@redux/api";
import { useState } from "react";
import toast from "react-hot-toast";

const NewProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    technologies: "",
    liveAddress: "",
    codeAddress: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [addProject, { isLoading }] = useAddProjectMutation();
  const submitHandler = (e) => {
    e.preventDefault();
    const formObject = new FormData();
    formObject.append("title", formData.title);
    formObject.append("subTitle", formData.subtitle);
    formObject.append("description", formData.description);
    formObject.append("technologies", formData.technologies);
    formObject.append("goLive", formData.liveAddress);
    formObject.append("sourceCode", formData.codeAddress);
    formObject.append("project", selectedFile);
    addProject(formObject)
      .unwrap()
      .then((response) => toast.success(response.message))
      .catch((error) => console.error(error));
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      technologies: "",
      liveAddress: "",
      codeAddress: "",
    });
  };
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={submitHandler}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  id="title"
                  value={formData.title}
                  placeholder="Project title"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="subtitle"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  onChange={changeHandler}
                  id="subtitle"
                  placeholder="Project Subtitle"
                  value={formData.subtitle}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Project description"
              onChange={changeHandler}
              rows={8}
              value={formData.description}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="technologies"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Technologies Used
            </label>
            <textarea
              name="technologies"
              id="technologies"
              placeholder="Technologies used in project. Write in comma seperated."
              onChange={changeHandler}
              rows={4}
              value={formData.technologies}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              required
            />
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="liveAddress"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Go Live url
                </label>
                <input
                  type="text"
                  name="liveAddress"
                  id="liveAddress"
                  placeholder="Project live Url"
                  onChange={changeHandler}
                  value={formData.liveAddress}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                onChange={fileChangeHandler}
                type="file"
                required
              />
            </div>

            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="codeAddress"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Source code url
                </label>
                <input
                  type="text"
                  name="codeAddress"
                  id="codeAddress"
                  placeholder="Project sourcecode"
                  value={formData.codeAddress}
                  onChange={changeHandler}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              isLoading={isLoading}
              loadingText="Loading"
              colorScheme="twitter"
            >
              Submit
            </button>
            <button
              onClick={() =>
                setFormData({
                  title: "",
                  subtitle: "",
                  description: "",
                  technologies: "",
                  liveAddress: "",
                  codeAddress: "",
                })
              }
              type="reset"
              colorScheme="red"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
