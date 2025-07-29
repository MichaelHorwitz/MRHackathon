"use server";

import { getFormObject } from "@/lib/utils";

export async function login(state: unknown, formData: FormData) {
  console.log("Login");
  const obj = getFormObject(formData);
  await new Promise((res) => setTimeout(res, 1000));
  console.log(obj);
}
