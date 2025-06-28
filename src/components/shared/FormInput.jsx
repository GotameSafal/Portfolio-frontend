import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; // For multiline inputs
import clsx from "clsx";

const FormInput = ({
  label,
  name,
  register,
  errors,
  placeholder,
  multiline,
  lg,
  type,
}) => {
  return (
    <div className={clsx("space-y-2 col-span-12", lg)}>
      <Label htmlFor={name}>{label}</Label>
      {multiline ? (
        <Textarea id={name} {...register(name)} placeholder={placeholder} />
      ) : (
        <Input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
        />
      )}
      {errors[name] && (
        <div className="text-sm text-red-500">{errors[name].message}</div>
      )}
    </div>
  );
};

export default FormInput;
