import z from "zod";
import VerfahrenSchema from "~/models/VerfahrenSchema";
import { VERFAHREN_PAGE_LIMIT } from "~/routes/verfahren/_index";
import { fetchFromApi } from "../api/fetchFromApi.server";

type FetchVerfahrenOptions = {
  limit?: number;
  offset?: number;
};

const errorMessage = "Die Verfahren konnten nicht abgerufen werden.";

export default async function (options?: FetchVerfahrenOptions) {
  const offset = options?.offset || 0;
  const limit = options?.limit || VERFAHREN_PAGE_LIMIT;
  const url = `/verfahren?limit=${limit}&offset=${offset}`;

  const response = await fetchFromApi({
    url,
    errorMessage,
  });

  console.log("Fetched Verfahren response:", response);

  try {
    return z.object({ verfahren: z.array(VerfahrenSchema) }).parse(response);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
