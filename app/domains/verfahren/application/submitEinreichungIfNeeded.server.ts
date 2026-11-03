import { fetchBelege } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import { fetchDokumente } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import {
  fetchEinreichungById,
  submitEinreichungen,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import hasSchriftstueck from "~/domains/verfahren/services/hasSchriftstueck";
import { AuthSession } from "~/services/auth/auth.types";

type SubmitEinreichungIfNeededOptions = {
  verfahrenId: string;
  einreichungId: string;
};

type SubmitEinreichungResult =
  | "submitted"
  | "alreadySubmitted"
  | "missingSchriftstueck";

// Guards against double-submits (e.g. a stale page, double-click, or
// back-navigation) — the API only accepts einreichen while the Einreichung
// is ERSTELLT/FEHLGESCHLAGEN, and rejects it with 409 once a Beleg already
// exists.
export default async function submitEinreichungIfNeeded(
  authSession: AuthSession,
  options: SubmitEinreichungIfNeededOptions,
): Promise<SubmitEinreichungResult> {
  const { elemente: existingBelege } = await fetchBelege(authSession, options);

  if (existingBelege.length > 0) {
    return "alreadySubmitted";
  }

  const { elemente: dokumente } = await fetchDokumente(authSession, options);

  if (!hasSchriftstueck(dokumente)) {
    return "missingSchriftstueck";
  }

  const { eTag } = await fetchEinreichungById(authSession, {
    verfahrenId: options.verfahrenId,
    id: options.einreichungId,
  });

  await submitEinreichungen(authSession, {
    verfahrenId: options.verfahrenId,
    id: options.einreichungId,
    eTag: eTag ?? "",
  });

  return "submitted";
}
