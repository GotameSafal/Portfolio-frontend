"use client";
import { useDispatch } from "react-redux";
import { useDoLoginMutation } from "@redux/slices/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { setToken } from "@redux/slices/configUser";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [doLogin, { isSuccess, isLoading }] = useDoLoginMutation();
  const { register, handleSubmit, reset, formState } = useForm();

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  const submitHandler = async (formdata) => {
    try {
      const res = await doLogin(formdata).unwrap();
      console.log("res", res);
      if (res.success) {
        dispatch(setToken(res?.token));
        toast.success(res.message);
        router.push("/admin");
      }
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-start min-h-screen bg-white">
      <Card className="w-full max-w-lg p-4 mx-auto">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="mt-10 space-y-2" >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative z-0 col-span-2">
              <input
                type="email"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                {...register("email")}
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Email
              </label>
            </div>
            <div className="relative z-0 col-span-2">
              <input
                type="password"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                {...register("password")}
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Password
              </label>
            </div>
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Submitting..."
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Page;
