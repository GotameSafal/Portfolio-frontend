"use client";
import { login } from "@components/Apis";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const Page = () => {
  const router = useRouter();
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
    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    const res = await login(formdata);
    if (res?.success) router.replace("/dashboard");
  };
  return (
    <div class="flex min-h-screen items-center justify-start bg-white">
      <div class="mx-auto w-full max-w-lg">
        <h1 class="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} class="mt-10">
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="relative z-0 col-span-2">
              <input
                type="email"
                class="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                {...register("email")}
                required
              />
              <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Email
              </label>
            </div>
            <div class="relative z-0 col-span-2">
              <input
                type="password"
                class="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                {...register("password")}
                required
              />
              <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="mt-5 w-full rounded-md bg-black px-10 py-2 text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
