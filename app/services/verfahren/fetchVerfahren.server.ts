import z from "zod";
import VerfahrenSchema from "~/models/VerfahrenSchema";
import { fetchFromApi } from "../api/fetchFromApi.server";

type FetchVerfahrenOptions = {
  limit?: number;
  offset?: number;
};

const errorMessage = "Die Verfahren konnten nicht abgerufen werden.";

export default async function (options?: FetchVerfahrenOptions) {
  const offset = options?.offset || 0;
  // TODO: change default limit to 100, according to UX requirements
  const limit = options?.limit || 5;
  const peekLimit = limit + 1; // to check if there are more items available
  const url = `/verfahren?limit=${peekLimit}&offset=${offset}`;

  const response = await fetchFromApi({
    url,
    errorMessage,
  });

  console.log("Fetched Verfahren response:", response);

  try {
    const items = z
      .object({
        verfahren: z.array(VerfahrenSchema),
      })
      .parse(response);
    const hasMore = items.verfahren.length > limit;
    const verfahren = hasMore
      ? items.verfahren.slice(0, limit)
      : items.verfahren;
    return { verfahren, hasMore };
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
