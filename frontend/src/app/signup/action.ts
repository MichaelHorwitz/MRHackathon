"use server";

import { client } from "@/api";
import { getFormObject } from "@/lib/utils";
import { redirect } from "next/navigation";
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
  const { data: value } = submission;

  const result = await client.POST("/auth/signUp", {
    body: {
      email: value.email,
      name: value.name,
      password: value.password,
    },
  });
  if (result.error) {
    // @ts-expect-error No error schema defined
    console.log(result.error);
    return {
      error: {
        data,
        message: "Could not sign up. Please try again",
      },
    };
  }
  redirect("/login");
}
