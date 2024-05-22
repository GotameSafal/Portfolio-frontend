"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";

export const fetchprojects = async () => {
  const res = await fetch("http://localhost:8000/api/projects", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

export const deleteproject = async (id) => {
  const res = await fetch(`http://localhost:8000/api/projects/${id}`, {
    method: "DELETE",
  });
  const data = res.json();
  revalidatePath("/dashboard");
  return data;
};
export const addproject = async (formdata) => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/projects`, {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    revalidatePath("/dashboard");
    console.log(data.message);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (data) => {
  try{  
  const res =   await axios.post("http://localhost:8000/api/login", data)
  return res

  }catch(error){
    console.log(error)
  }
};
