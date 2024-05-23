"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const fetchprojects = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`,
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data;
};

export const deleteproject = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = res.json();
  revalidatePath("/dashboard");
  return data;
};
export const addproject = async (formdata) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const data = await res.json();
    revalidatePath("/dashboard");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const login = async (formdata) => {
  try {
    const cookiestore = cookies();
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      {
        ...formdata,
      }
    );
    cookiestore.set("portfolio", data.token, {
      expires: Date.now() + 60 * 60 * 1000,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const sendmail = async (formdata) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sendmail`,
      { ...formdata }
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};
