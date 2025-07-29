"use server";

import { client } from "@/api";
import { getFormObject } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  if (result.response.status === 401) {
    return {
      error: {
        data,
        message: "Email or password is incorrect",
      },
    };
  } else if (result.error) {
    // @ts-expect-error No error schema defined
    console.log(result.error);
    return {
      error: {
        data,
        message: "Could not log in user. Please try again",
      },
    };
  }

  const reqCookies = await cookies();
  reqCookies.set("jwt", result.data.access_token, {
    maxAge: 1 * 1000 * 60 * 60,
  });

  redirect("/");
}
