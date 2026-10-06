import { fetchBelege } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import {
  fetchEinreichungById,
  submitEinreichungen,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { AuthSession } from "~/services/auth/auth.types";

type SubmitEinreichungIfNeededOptions = {
  verfahrenId: string;
  einreichungId: string;
};

// Guards against double-submits (e.g. a stale page, double-click, or
// back-navigation) — the API only accepts einreichen while the Einreichung
// is ERSTELLT/FEHLGESCHLAGEN, and rejects it with 409 once a Beleg already
// exists.
export default async function submitEinreichungIfNeeded(
  authSession: AuthSession,
  options: SubmitEinreichungIfNeededOptions,
): Promise<void> {
  const { elemente: existingBelege } = await fetchBelege(authSession, options);

  if (existingBelege.length > 0) {
    return;
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
}
