"use client";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useLoginMutation } from "@redux/api";
import { setToken } from "@redux/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [doLogin, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginHandler = (e) => {
    e.preventDefault();

    doLogin(formData)
      .unwrap()
      .then((res) => {
        dispatch(setToken(res.token));
        Cookies.set("sdev", res.token, { expires: 3 });
        toast.success(res.message);
        router.push("/");
      })
      .catch((err) => console.error(err));
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="container mx-auto px-6">
      <div className="flex h-screen flex-col justify-evenly text-center md:flex-row md:items-center md:text-left">
        <div className="flex w-full flex-col">
          <div>
            <Image
              className="fill-stroke mx-auto text-gray-800 md:float-left"
              width={180}
              height={120}
              src="/sdev-high-resolution-logo-black-transparent.png"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-800">S-Dev</h1>
        </div>
        <div className="mx-auto w-full md:mx-0 md:w-full lg:w-9/12">
          <div className="flex w-full flex-col rounded-xl bg-white p-10 shadow-xl">
            <h2 className="mb-5 text-left text-2xl font-bold text-gray-800">
              Sigin
            </h2>
            <form action onSubmit={loginHandler} className="w-full">
              <div id="input" className="my-5 flex w-full flex-col">
                <label htmlFor="email" className="mb-2 text-gray-500">
                  Email
                </label>
                <input
                  onInput={changeHandler}
                  type="email"
                  value={formData.email}
                  name="email"
                  id="email"
                  placeholder="Please insert your username"
                  className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div id="input" className="my-5 flex w-full flex-col">
                <label htmlFor="password" className="mb-2 text-gray-500">
                  Password
                </label>
                <input
                  name="password"
                  onInput={changeHandler}
                  value={formData.password}
                  type="password"
                  id="password"
                  placeholder="Please insert your password"
                  className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  minLength={8}
                />
              </div>
              <div id="button" className="my-5 flex w-full flex-col">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  leftIcon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  }
                  colorScheme="green"
                  className="rounded-sm"
                  size="md"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
