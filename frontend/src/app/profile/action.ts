"use server";

import { client } from "@/api";
import { getFormObject } from "@/lib/utils";
import { getBearerToken } from "@/lib/utils.server";
import { redirect } from "next/navigation";
import z from "zod";

const profileSchema = z.object({
  name: z.string().trim().nonempty("Name can not be empty"),
  email: z
    .email("Please enter a valid email")
    .nonempty("Email can not be empty"),
  password: z.string(),
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
  const { data: value } = submission;
  const token = await getBearerToken();
  const result = await client.PUT("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      email: value.email,
      name: value.name,
    }
  });
  if (result.response.status !== 200){
    return {
      error: {
        data,
        message: "Could not update",
      },
    };
  }
  redirect("/profile")
  // return result.data;
}
