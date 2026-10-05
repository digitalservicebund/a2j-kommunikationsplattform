import z from "zod";
import { serverConfig } from "~/config/config.server";
import {
  Beleg,
  ContentDispositionType,
} from "~/domains/verfahren/entities/beleg/beleg.entity";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import {
  BelegeSchema,
  BelegSchema,
} from "~/domains/verfahren/infrastructure/schemas/beleg.schema";
import { AuthSession } from "~/services/auth/auth.types";
import { buildSearchParams } from "~/utils/buildSearchParams";

type FetchBelegByIdOptions = {
  verfahrenId: string;
  id: string;
};

export async function fetchBelegById(
  authSession: AuthSession,
  options: FetchBelegByIdOptions,
): Promise<Beleg> {
  return apiRequest({
    authSession,
    path: `/api/v1/verfahren/${options.verfahrenId}/belege/${options.id}`,
    schema: BelegSchema,
    errorMessage: `Beleg with id ${options.id} of Verfahren with id ${options.verfahrenId} could not be fetched.`,
  });
}

type FetchBelegeOptions = {
  verfahrenId: string;
  einreichungId?: string;
};

export async function fetchBelege(
  authSession: AuthSession,
  options: FetchBelegeOptions,
): Promise<z.infer<typeof BelegeSchema>> {
  const url = new URL(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${options.verfahrenId}/belege`,
  );
  const searchParams = buildSearchParams({
    einreichung_id: options.einreichungId,
  });

  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return apiRequest({
    authSession,
    fullUrl: url.toString(),
    schema: BelegeSchema,
    errorMessage: `Belege for Verfahren with id ${options.verfahrenId} could not be fetched.`,
  });
}

type FetchBelegDownloadLinkOptions = {
  verfahrenId: string;
  id: string;
  ttl?: number;
  dispositionType?: ContentDispositionType;
};

export async function fetchBelegDownloadLink(
  authSession: AuthSession,
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
    authSession,
    fullUrl: url.toString(),
    schema: z.string(),
    errorMessage: `Download link for Beleg with id ${options.id} could not be fetched.`,
  });
}

type FetchLatestBelegForEinreichungOptions = {
  verfahrenId: string;
  einreichungId: string;
};

// The Beleg belongs to the Einreichung, so it's looked up via that
// relationship instead of threading its id through the URL/session.
export async function fetchLatestBelegForEinreichung(
  authSession: AuthSession,
  options: FetchLatestBelegForEinreichungOptions,
): Promise<Beleg | null> {
  const { elemente: belege } = await fetchBelege(authSession, options);
  const latestBeleg = belege.at(-1);

  if (!latestBeleg) {
    return null;
  }

  return fetchBelegById(authSession, {
    verfahrenId: options.verfahrenId,
    id: latestBeleg.id,
  });
}
