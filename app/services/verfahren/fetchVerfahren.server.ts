import z from "zod";
import { newVerfahrenSchema } from "~/models/VerfahrenSchema";
import { fetchFromApi } from "../api/fetchFromApi.server";

type FetchVerfahrenOptions = {
  limit?: number;
  offset?: number;
};

const errorMessage = "Die Verfahren konnten nicht abgerufen werden.";

export default async function (options?: FetchVerfahrenOptions) {
  const offset = options?.offset || 0;
  const limit = options?.limit || 10;
  const url = `/verfahren?limit=${limit}&offset=${offset}`;

  const response = await fetchFromApi({
    url,
    errorMessage,
  });

  try {
    return z.array(newVerfahrenSchema).parse(response);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
