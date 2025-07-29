import createClient, { FetchResponse } from "openapi-fetch";
import { paths } from "./schema";
import z from "zod";

export const client = createClient<paths>({
  // TODO: Change this to an environment variable
  baseUrl: "http://localhost:4000",
});

export type Result<T, E> =
  | {
      data: T;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: E;
    };

const errorSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

export type ErrorData = z.infer<typeof errorSchema>;

/**
 * Helper function to extract Nest.js exception filters. By default swagger can not
 * provide proper type annotations for those
 */
export function toResult<
  T extends Record<string | number, any>,
  Options,
  Media extends `${string}/${string}`
>(
  res: FetchResponse<T, Options, Media>
): Result<NonNullable<(typeof res)["data"]>, ErrorData> {
  if (!res.response.ok) {
    const error = errorSchema.safeParse(res.error as unknown);
    if (!error.success) {
      throw new Error("API Request Failed: " + JSON.stringify(res.error));
    }
    return { error: error.data };
  }
  return { data: res.data! };
}
