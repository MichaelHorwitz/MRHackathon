import { client } from "@/api";
import { getBearerToken } from "@/lib/utils.server";
import { ProfileForm } from "./form";

export default async function Page() {
  const token = await getBearerToken();
  const data = await client.GET("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (
    <ProfileForm
      defaultValue={{
        name: data.data?.name,
        email: data.data?.email,
      }}
    />
  );
}
