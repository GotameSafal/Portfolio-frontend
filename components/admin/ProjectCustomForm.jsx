import React, { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { projectFormObject, technologiesOption } from "./adminObjects";
import FormInput from "@components/FormInput";
import { Button } from "@components/ui/button";
import { yupSchema } from "./adminObjects";
import { yupResolver } from "@hookform/resolvers/yup";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { motion } from "framer-motion";
import { Input } from "@components/ui/input";
import { Badge } from "@components/ui/badge";
import { X } from "lucide-react";
import { Label } from "@components/ui/label";
import {
  useAddProjectMutation,
  useUpdateProjectsMutation,
} from "@redux/slices/api";
import { get } from "lodash";
import { toast } from "react-toastify";
import Image from "next/image";
const ProjectCustomForm = memo(({ title, project }) => {
  const [addProject, { isLoading, isSuccess }] = useAddProjectMutation();
  const [updateProject, { isLoading: isupdating, isSuccess: onSuccess }] =
    useUpdateProjectsMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (isSuccess) {
      reset();
      setSelectedImage(null);
    }
    if (title !== "Add" && project?.imgUrl?.url)
      setSelectedImage(project?.imgUrl?.url);
  }, [isSuccess, reset, project.imgUrl.url, title]);

  const {
    handleSubmit,
    reset,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      name: title === "Add" ? "" : get(project, "name", ""),
      description: title === "Add" ? "" : get(project, "description", ""),
      detailedDescription:
        title === "Add" ? "" : get(project, "detailedDescription", ""),
      file: title === "Add" ? "" : get(project, "file", ""),
      projecturl: title === "Add" ? "" : get(project, "projecturl", ""),
      gitsource: title === "Add" ? "" : get(project, "gitsource", ""),
      technologies: title === "Add" ? [] : get(project, "technologies", []),
    },
  });

  const handleSelect = (value) => {
    setValue(
      "technologies",
      technologies?.includes(value)
        ? technologies.filter((item) => item !== value)
        : [...technologies, value]
    );
  };
  const onSubmit = async (values) => {
    const form = new FormData();
    form.append("name", values.name);
    form.append("description", values.description);
    form.append("detailedDescription", values?.detailedDescription);
    values.file && form.append("file", values?.file);
    form.append("projecturl", values.projecturl);
    form.append("gitsource", values?.gitsource);
    form.append("technologies", JSON.stringify(values?.technologies));
    console.log("values", form);
    try {
      let res = null;
      if (title === "Add") res = await addProject(form).unwrap();
      else res = await updateProject({ id: project._id, data: form }).unwrap();
      console.log("res", res);
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const fileChangeHandler = (e) => {
    const file = e.target?.files[0];
    const image = URL.createObjectURL(file);
    setSelectedImage(image);
    setValue("file", file);
  };

  const { technologies, file } = watch();
  console.log("project", project);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-2">
        {projectFormObject?.map(
          ({ label, placeholder, name, type, lg, multiline }) => (
            <FormInput
              key={name}
              label={label}
              placeholder={placeholder}
              type={type}
              lg={lg}
              multiline={multiline}
              errors={errors}
              register={register}
              name={name}
            />
          )
        )}

        <div className="col-span-12 space-y-2">
          <Label htmlFor="technologies">Technologies</Label>
          <Controller
            control={control}
            name="technologies"
            render={() => (
              <Select onValueChange={handleSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select technologies" />
                </SelectTrigger>
                <SelectContent>
                  {technologiesOption?.map((tech, index) => (
                    <SelectItem key={index} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies?.map((tech, index) => (
              <Badge key={index} className="cursor-pointer" variant="secondary">
                {tech}{" "}
                <X
                  size={14}
                  className="ml-2 transition-all duration-200 hover:scale-125"
                  onClick={() => handleSelect(tech)}
                />
              </Badge>
            ))}
          </div>
        </div>
        <div classname="col-span-12">
          <Label htmlFor="upload">
            <motion.div
              className="flex items-center gap-1 px-3 py-2 font-semibold text-white bg-teal-300 rounded-md cursor-pointer hover:bg-teal-700 w-fit "
              type="btn"
            >
              <Upload /> Upload
            </motion.div>
          </Label>
          <Input
            id="upload"
            className="hidden"
            onChange={fileChangeHandler}
            type="file"
            placeholder="Insert File"
          />
          {selectedImage && (
            <div className="w-full" style={{ marginTop: "8px" }}>
              <Image
                src={
                  selectedImage ||
                  (typeof formik.values.thumbnail === "string"
                    ? formik.values.thumbnail
                    : "")
                }
                alt="Preview"
                style={{
                  width: "20px",
                  height: "90px",
                  objectFit: "contain",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Button
        isLoading={isLoading || isupdating}
        loadingText="Submitting..."
        className="w-full mt-4"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
});
ProjectCustomForm.displayName = "ProjectCustomForm";
export default ProjectCustomForm;
