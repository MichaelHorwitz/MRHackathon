"use server";

import { client, toResult } from "@/api";
import { getFormObject } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";
import z from "zod";

const readSchema = z.object({
  id: z.coerce.number(),
});

export async function markAsRead(_state: unknown, formData: FormData) {
  console.log("Mark as read");
  const value = readSchema.parse(getFormObject(formData));

  const result = await client
    .PATCH("/notifs/{id}/read", { params: { path: { id: value.id } } })
    .then(toResult);

  if (result.error) {
    return {
      error: result.error.message,
    };
  }

  redirect("/alerts", RedirectType.replace);
}
