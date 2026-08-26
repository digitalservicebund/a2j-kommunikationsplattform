import { AuthenticationResponse } from "~/services/auth/auth.types";
import fetchBelegById from "./fetchBelegById.server";
import fetchBelege from "./fetchBelege.server";
import type { Beleg } from "./schemas/belegSchema";

type FetchLatestBelegForEinreichungOptions = {
  verfahrenId: string;
  einreichungId: string;
};

// The Beleg belongs to the Einreichung, so it's looked up via that
// relationship instead of threading its id through the URL/session.
export default async function fetchLatestBelegForEinreichung(
  authData: AuthenticationResponse,
  options: FetchLatestBelegForEinreichungOptions,
): Promise<Beleg | null> {
  const { elemente: belege } = await fetchBelege(authData, options);
  const latestBeleg = belege.at(-1);

  if (!latestBeleg) {
    return null;
  }

  return fetchBelegById(authData, {
    verfahrenId: options.verfahrenId,
    id: latestBeleg.id,
  });
}
