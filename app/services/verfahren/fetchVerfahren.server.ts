import z from "zod";
import { serverConfig } from "~/config/config.server";
import { newVerfahrenSchema } from "~/models/VerfahrenSchema";

import { VERFAHREN_PAGE_LIMIT } from "~/constants/verfahren";
import { getBearerToken } from "~/services/auth/getBearerToken.server";

const fetchVerfahrenOptionsSchema = z.object({
  offset: z.number().int().nonnegative().default(0),
  limit: z.number().int().positive().default(VERFAHREN_PAGE_LIMIT),
  gericht: z.guid().optional().or(z.literal("")),
});

export type FetchVerfahrenOptions = z.infer<typeof fetchVerfahrenOptionsSchema>;

const ERROR_MESSAGE = "Die Verfahren konnten nicht abgerufen werden.";

export default async function fetchVerfahren(
  request: Request,
  options?: FetchVerfahrenOptions,
) {
  const bearerToken = await getBearerToken(request);

  if (!bearerToken) {
    throw new Error("No bearer token available");
  }

  const { limit, offset, gericht } = fetchVerfahrenOptionsSchema.parse(
    options ?? {},
  );

  const url = new URL(`${serverConfig().KOMPLA_API_URL}/api/v1/verfahren`);

  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  if (gericht) url.searchParams.set("gericht", gericht);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE, {
      cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
    });
  }

  const data = await response.json();

  try {
    return newVerfahrenSchema.array().parse(data);
  } catch (error) {
    throw new Error(ERROR_MESSAGE, { cause: error });
  }
}
