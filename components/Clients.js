"use client";
import { FaCloudUploadAlt, FiEdit, MdDelete } from "@utils/iconExp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addproject, deleteproject } from "./Apis";
export const EditButton = ({ id }) => {
  const router = useRouter();
  return (
    <button
      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
      type="button"
      onClick={() => router.push(`/dashboard/${id}`)}
    >
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <FiEdit />
      </span>
    </button>
  );
};
export const DeleteButton = ({ id }) => {
  const deleteHandler = async (id) => {
    const deleteddata = await deleteproject(id);
  };
  return (
    <button
      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white  hover:bg-red-300  bg-red-500 active:bg-gray-900/20"
      type="button"
      onClick={() => deleteHandler(id)}
    >
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <MdDelete />
      </span>
    </button>
  );
};

export const NewProject = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmit = async (data) => {
    const ProjectData = new FormData();
    ProjectData.append("name", data.name);
    ProjectData.append("projecturl", data.project_url);
    ProjectData.append("gitsource", data.gitsource);
    ProjectData.append("technologies", data.technologies);
    ProjectData.append("description", data.description);
    ProjectData.append("project_image", data.project_image[0]);
    const res = await addproject(ProjectData)
  };
  return (
    <div className="w-full max-w-lg">
      <h1 className="text-2xl font-bold">New Project</h1>
      <form
        className="mt-10"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative z-0">
            <input
              type="text"
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              {...register("name")}
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
              Project name
            </label>
          </div>
          <div className="relative z-0">
            <input
              type="text"
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              {...register("project_url")}
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
              Project url
            </label>
          </div>
          <div className="relative z-0 col-span-2">
            <input
              type="text"
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              {...register("gitsource")}
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
              Github source
            </label>
          </div>
          <div className="relative z-0 col-span-2">
            <input
              type="text"
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              {...register("technologies")}
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
              Technologies
            </label>
          </div>
          <div className="bg-grey-lighter flex w-full items-center justify-center">
            <label className="text-blue border-blue hover:bg-blue flex w-64 cursor-pointer flex-col items-center rounded-lg border bg-white px-4 py-6 uppercase tracking-wide shadow-lg hover:text-gray-200">
              <FaCloudUploadAlt size={32} />
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input
                type="file"
                className="hidden"
                {...register("project_image")}
              />
            </label>
          </div>
          <div className="relative z-0 col-span-2">
            <textarea
              rows="5"
              className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              {...register("description")}
            ></textarea>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
              {" "}
              Description
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 w-full rounded-md font-bold bg-black px-10 py-2 text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
};
