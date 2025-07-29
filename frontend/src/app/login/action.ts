"use server";

import { client } from "@/api";
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
  const { data: value } = submission;

  const result = await client.POST("/auth/login", {
    body: {
      email: value.email,
      password: value.password,
    },
  });

  console.log("DATA", result.data);
  console.log("ERROR", result.error);

  console.log(submission.data);
  return {
    error: {
      data,
      message: "Not implemented",
    },
  };
}
