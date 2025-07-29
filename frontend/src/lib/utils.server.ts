import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

export async function getBearerToken() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt");
  if (!jwt) {
    redirect("/login");
  }
  return jwt.value;
}
