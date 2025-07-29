"use server";

import { getFormObject } from "@/lib/utils";
import z from "zod";

const loginSchema = z.object({
  email: z.email("Please enter an email"),
  password: z.string().nonempty("Please enter a password"),
});

export async function login(state: unknown, formData: FormData) {
  console.log("Login");
  const data = getFormObject(formData);
  const submission = loginSchema.safeParse(getFormObject(formData));
  if (!submission.success) {
    return {
      error: {
        data,
        message: submission.error.issues[0]?.message,
      },
    };
  }
  await new Promise((res) => setTimeout(res, 1000));

  console.log(submission.data);
  return {
    error: {
      data,
      message: "Not implemented",
    },
  };
}
