"use client";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useAddContactsMutation } from "@redux/api";
const Contact = () => {
  const [formData, setFormData] = useState({
    through: "",
    description: "",
    link: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [addContacts, { isLoading }] = useAddContactsMutation();
  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formObject = new FormData();
    formObject.append("title", formData.through);
    formObject.append("description", formData.description);
    formObject.append("contact", selectedFile);
    formObject.append("redirectUrl", formData.link);
    addContacts(formObject)
      .unwrap()
      .then((response) => toast.success(response.message))
      .catch((error) => console.error(error));
    setFormData({ through: "", description: "", link:'' });
  };
  return (
    <div className="flex min-h-[calc(100vh-230px)] items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={submitHandler}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="through"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Contact through
                </label>
                <input
                  type="text"
                  name="through"
                  onChange={changeHandler}
                  id="through"
                  value={formData.through}
                  placeholder="LinkedIN"
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
                  description
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={changeHandler}
                  id="description"
                  placeholder="let's connect"
                  required
                  value={formData.description}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="link"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Link
                </label>
                <input
                  type="text"
                  name="link"
                  onChange={changeHandler}
                  id="link"
                  value={formData.link}
                  placeholder="http://github.com"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
            </div>
          </div>
          <div>
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
            <Button
              isLoading={isLoading}
              loadingText="Loading"
              type="submit"
              colorScheme="twitter"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
