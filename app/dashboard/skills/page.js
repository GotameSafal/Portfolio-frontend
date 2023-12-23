"use client";

import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useGetDetailsQuery, useUpdateSkillsMutation } from "@redux/api";
import toast from "react-hot-toast";
const NewProject = () => {
  const [formData, setFormData] = useState(null);
  const { data, isLoading, isError } = useGetDetailsQuery();
  const [updateSkills, { isLoading: isUpdating }] = useUpdateSkillsMutation();
  useEffect(() => {
    if (data) {
      let response = structuredClone(data.details);
      setFormData({
        frontend: response.skills.frontend.join(","),
        backend: response.skills.backend.join(","),
        others: response.skills.others.join(","),
      });
    }
  }, [data])
  const submitHandler = (e) => {
    e.preventDefault();
    updateSkills(formData)
        .unwrap()
      .then((response) => toast.success(response.message))
      .catch((error) => console.error(error));
  };
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center font-semibod">
        {" "}
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="h-screen w-screen flex items-center justify-center font-semibod">
        {" "}
        Something went wrong
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <p className="text-xs text-red-500 font-semibold">
        *use comma seperated values
      </p>
      <div className="mx-auto w-full max-w-[550px]">
        {formData && (
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <label
                htmlFor="frontend"
                className="mb-3 block text-lg font-bold text-[#07074D]"
              >
                Frontend
              </label>
              <textarea
                name="frontend"
                id="frontend"
                placeholder="Skills you know for client site"
                onChange={changeHandler}
                value={formData.frontend}
                rows={3}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="backend"
                className="mb-3 block text-lg font-bold text-[#07074D]"
              >
                Backend
              </label>
              <textarea
                name="backend"
                id="backend"
                placeholder="Skills you know for backend"
                onChange={changeHandler}
                rows={3}
                value={formData.backend}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="others"
                className="mb-3 block text-lg font-bold text-[#07074D]"
              >
                Others
              </label>
              <textarea
                name="others"
                id="others"
                value={formData.others}
                placeholder="Some other skills you know"
                onChange={changeHandler}
                rows={3}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                required
              />
            </div>
            <div>
              <Button
                isLoading={isUpdating}
                loadingText="Updating"
                className="w-full"
                type="submit"
                colorScheme="twitter"
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewProject;
