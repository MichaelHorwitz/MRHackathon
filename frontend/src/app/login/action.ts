export async function login(state: unknown, formData: FormData) {
  console.log("Login");
  await new Promise((res) => setTimeout(res, 1000));
}
