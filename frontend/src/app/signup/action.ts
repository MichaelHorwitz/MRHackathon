"use server";

import { getFormObject } from "@/lib/utils";

export async function signup(state: unknown, formData: FormData) {
  console.log("Signup");
  const obj = getFormObject(formData);
  await new Promise((res) => setTimeout(res, 1000));
  console.log(obj);
}
