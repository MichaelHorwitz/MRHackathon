import createClient from "openapi-fetch";
import { paths } from "./schema";

const client = createClient<paths>({
  // TODO: Change this to an environment variable
  baseUrl: "http://localhost:4000",
});
export default client;
