"use server";
import { cookies } from "next/headers";

export const getLogout = async()=>{
  (await cookies()).delete("portfolio");
}