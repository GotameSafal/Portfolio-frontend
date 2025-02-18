import FormInput from "@components/FormInput";
import { Button } from "@components/ui/button";
import { DialogContent, DialogTitle } from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} from "@redux/slices/api";
import { get } from "lodash";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { skillsOption } from "./adminObjects";
const SkillCustomForm = ({ title = "Add", data }) => {
  console.log("datadkjfwoeir", data);
  const [addSkill, { isSuccess, isLoading }] = useAddSkillMutation();
  const [updateSkill, { isLoading: isUpdating }] = useUpdateSkillMutation();
  const {
    handleSubmit,
    reset,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: title === "Add" ? "" : get(data, "skills"),
      skill_name: title === "Add" ? "" : get(data, "skill_name"),
      proficiency: title === "Add" ? "" : get(data, "proficiency"),
    },
  });
  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess]);
  const handleSelect = (value) => {
    setValue("skills", value);
  };
  const submitHandler = async (values) => {
    console.log("values, update", values);
    try {
      let res;
      if (title === "Add") res = await addSkill(values).unwrap();
      else res = await updateSkill(values).unwrap();
      if (res.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };
  return (
    <DialogContent>
      <DialogTitle>{title} Skill</DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 space-y-2">
            <Label htmlFor="technologies">Technologies</Label>
            <Controller
              control={control}
              name="skills"
              render={({ field }) => (
                <Select
                  disabled={title !== "Add"}
                  value={field.value || ""}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleSelect(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technologies" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillsOption?.map((skills, index) => (
                      <SelectItem key={index} value={skills}>
                        {skills}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {formObj?.map(({ label, placeholder, name, type, lg, multiline }) => (
            <FormInput
              label={label}
              placeholder={placeholder}
              type={type}
              lg={lg}
              multiline={multiline}
              errors={errors}
              register={register}
              name={name}
            />
          ))}
        </div>
        <div className="py-2">
          <Button
            isLoading={isLoading || isUpdating}
            type="submit"
            className="w-full"
          >
            {title}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default SkillCustomForm;
const formObj = [
  {
    label: "Skill Name",
    placeholder: "Enter Skills Name",
    className: "sm:col-span-6 col-span-12 ",
    name: "skill_name",
    type: "text",
  },
  {
    label: "proficiency",
    placeholder: "Enter Skills Name",
    className: "sm:col-span-6 col-span-12 ",
    name: "proficiency",
    typ: "number",
  },
];
