import createClient from "openapi-fetch";
import { paths } from "./schema";

export const client = createClient<paths>({
  // TODO: Change this to an environment variable
  baseUrl: "http://localhost:4000",
});
