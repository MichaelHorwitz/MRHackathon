"use server";

import { getFormObject } from "@/lib/utils";
import z from "zod";

const signupSchema = z
  .object({
    name: z.string().trim().nonempty("Please enter your name"),
    email: z.email("Please enter an email"),
    password: z.string().nonempty("Please enter a password"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords did not match",
  });

export async function signup(_state: unknown, formData: FormData) {
  console.log("Signup");
  const data = getFormObject(formData);
  const submission = signupSchema.safeParse(getFormObject(formData));
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
      message: "Not Implemented",
    },
  };
}
