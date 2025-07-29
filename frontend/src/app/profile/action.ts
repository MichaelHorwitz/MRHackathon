"use server";

import { getFormObject } from "@/lib/utils";
import z from "zod";

const profileSchema = z.object({
  name: z.string().trim().nonempty("Name can not be empty"),
  email: z
    .email("Please enter a valid email")
    .nonempty("Email can not be empty"),
  password: z.string().nonempty("Password can not be empty"),
  setting1: z.string().nonempty("Setting #1 can not be empty"),
  setting2: z.string().nonempty("Setting #2 can not be empty"),
});

export type ProfileData = z.infer<typeof profileSchema>;

export async function updateProfile(_state: unknown, formData: FormData) {
  console.log("Update Profile");
  const data = getFormObject(formData);
  const submission = profileSchema.safeParse(getFormObject(formData));
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
