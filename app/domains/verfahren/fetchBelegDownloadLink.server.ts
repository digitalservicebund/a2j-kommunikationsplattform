import z from "zod";
import { serverConfig } from "~/config/config.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { buildSearchParams } from "~/utils/buildSearchParams";
import { apiRequest } from "./apiClient";
import { ContentDispositionTypeSchema } from "./schemas/belegSchema";

type FetchBelegDownloadLinkOptions = {
  verfahrenId: string;
  id: string;
  ttl?: number;
  dispositionType?: z.infer<typeof ContentDispositionTypeSchema>;
};

const buildErrorMessage = (id: string): string =>
  `Download link for Beleg with id ${id} could not be fetched.`;

export default async function fetchBelegDownloadLink(
  authData: AuthenticationResponse,
  options: FetchBelegDownloadLinkOptions,
): Promise<string> {
  const url = new URL(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.verfahrenId}/belege/${options.id}/downloadlink`,
  );
  const searchParams = buildSearchParams({
    ttl: options.ttl,
    disposition_type: options.dispositionType,
  });

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return apiRequest({
    authData,
    fullUrl: url.toString(),
    schema: z.string(),
    errorMessage: buildErrorMessage(options.id),
  });
}
