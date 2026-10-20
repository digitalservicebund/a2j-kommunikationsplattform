import z from "zod";
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
  return apiRequest({
    authSession,
    path: `/api/v1/verfahren/${options.verfahrenId}/belege`,
    searchParams: { einreichung_id: options.einreichungId },
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
  return apiRequest({
    authSession,
    path: `/api/v1/verfahren/${options.verfahrenId}/belege/${options.id}/downloadlink`,
    searchParams: {
      ttl: options.ttl,
      disposition_type: options.dispositionType,
    },
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
