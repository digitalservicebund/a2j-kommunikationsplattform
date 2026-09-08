import { fetchBelege } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import {
  fetchEinreichungById,
  submitEinreichungen,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";

type SubmitEinreichungIfNeededOptions = {
  verfahrenId: string;
  einreichungId: string;
};

// Guards against double-submits (e.g. a stale page, double-click, or
// back-navigation) — the API only accepts einreichen while the Einreichung
// is ERSTELLT/FEHLGESCHLAGEN, and rejects it with 409 once a Beleg already
// exists.
export default async function submitEinreichungIfNeeded(
  authData: AuthenticationResponse,
  options: SubmitEinreichungIfNeededOptions,
): Promise<void> {
  const { elemente: existingBelege } = await fetchBelege(authData, options);

  if (existingBelege.length > 0) {
    return;
  }

  const { eTag } = await fetchEinreichungById(authData, {
    verfahrenId: options.verfahrenId,
    id: options.einreichungId,
  });

  await submitEinreichungen(authData, {
    verfahrenId: options.verfahrenId,
    id: options.einreichungId,
    eTag: eTag ?? "",
  });
}
