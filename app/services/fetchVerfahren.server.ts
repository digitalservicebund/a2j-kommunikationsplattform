import z from "zod";
import dummyVerfahrenData from "~/models/dummyVerfahrenData";
import VerfahrenSchema from "~/models/VerfahrenSchema";
import fetchFromApi from "./fetchFromApi.server";

type FetchVerfahrenOptions = {
  limit?: number;
  offset?: number;
  dummyData?: boolean;
};

const errorMessage = "Die Verfahren konnten nicht abgerufen werden.";

export default async function (options?: FetchVerfahrenOptions) {
  if (options?.dummyData) {
    if (options?.limit) {
      return dummyVerfahrenData.slice(0, options.limit);
    }
    return dummyVerfahrenData;
  }

  const offset = options?.offset || 0;
  const limit = options?.limit || 10;
  const url = `/api/v1/verfahren?limit=${limit}&offset=${offset}`;

  const response = await fetchFromApi({
    url,
    errorMessage,
  });

  try {
    return z.object({ verfahren: z.array(VerfahrenSchema) }).parse(response)
      .verfahren;
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
