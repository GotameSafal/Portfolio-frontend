"use client";
import { MotionButton, MotionInput, MotionTextarea } from "./MotionDiv";
import { slideIn } from "@utils/motion";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
const schema = yup.object().shape({
  fullname: yup
    .string()
    .min(3)
    .max(50)
    .required("**Please enter valid fullname"),
  email: yup.string().email().required("**Please enter valid email"),
  phone: yup
    .string()
    .matches(/^[0-9]{6,14}$/, "**Please enter valid phone number")
    .required("**Please enter valid phone number"),
  message: yup
    .string()
    .min(5)
    .max(10000)
    .required("**Please enter valid message"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitform = async (data) => {
    // const res = await sendmail(data);
    // if (res.success) alert(res.message);
    console.log('data')
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(submitform)} className="flex flex-col gap-4">
      <div className="items-center md:flex">
        <div className="flex flex-col w-full md:w-1/2">
          <MotionInput
            variants={slideIn("left", "spring", 0, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            type="text"
            placeholder="Full Name"
            className="p-3 leading-none bg-gray-800 border-0 rounded text-gray-50 focus:border-blue-700"
            {...register("fullname")}
          />
          <p className="text-xs font-bold text-red-500">
            {errors?.fullname?.message}
          </p>
        </div>
        <div className="flex flex-col w-full mt-4 md:ml-6 md:mt-0 md:w-1/2">
          <MotionInput
            variants={slideIn("right", "spring", 0, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            type="email"
            placeholder="Email"
            className="p-3 leading-none bg-gray-800 border-0 rounded text-gray-50 focus:border-blue-700"
            {...register("email")}
          />
          <p className="text-xs font-bold text-red-500">
            {errors?.email?.message}
          </p>
        </div>
      </div>
      <div className="">
        <MotionInput
          variants={slideIn("left", "spring", 0, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          type="text"
          placeholder="Phonenumber"
          className="w-full p-3 leading-none bg-gray-800 border-0 rounded text-gray-50 focus:border-blue-700"
          {...register("phone")}
        />
        <p className="text-xs font-bold text-red-500">
          {errors?.phone?.message}
        </p>
      </div>
      <div>
        <MotionTextarea
          variants={slideIn("right", "spring", 0, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          type="text"
          placeholder="Your message"
          className="w-full p-3 text-base leading-none bg-gray-800 border-0 rounded h-36 text-gray-50 focus:border-blue-700 sm:h-40"
          {...register("message")}
        ></MotionTextarea>
        <p className="text-xs font-bold text-red-500">
          {errors?.message?.message}
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <MotionButton
          variants={slideIn("up", "spring", 0, 0.8)}
          initial="hidden"
          disabled={isSubmitting}
          whileInView="show"
          viewport={{ once: true }}
          className="w-full px-10 py-4 mt-6 font-bold leading-none text-white bg-blue-700 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 sm:mt-9"
          type="submit"
        >
          Send message
        </MotionButton>
      </div>
    </form>
  );
};

export default Form;
