import z from "zod";
import { serverConfig } from "~/config/config.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { buildSearchParams } from "~/utils/buildSearchParams";
import { apiRequest } from "./apiClient";
import { BelegeSchema } from "./schemas/belegSchema";

type FetchBelegeOptions = {
  verfahrenId: string;
  einreichungId?: string;
};

const buildErrorMessage = (verfahrenId: string): string =>
  `Belege for Verfahren with id ${verfahrenId} could not be fetched.`;

export default async function fetchBelege(
  authData: AuthenticationResponse,
  options: FetchBelegeOptions,
): Promise<z.infer<typeof BelegeSchema>> {
  const url = new URL(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.verfahrenId}/belege`,
  );
  const searchParams = buildSearchParams({
    "einreichung-id": options.einreichungId,
  });

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return apiRequest({
    authData,
    fullUrl: url.toString(),
    schema: BelegeSchema,
    errorMessage: buildErrorMessage(options.verfahrenId),
  });
}
