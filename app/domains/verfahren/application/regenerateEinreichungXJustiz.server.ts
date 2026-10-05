import { createEinreichungXJustiz } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { AuthSession } from "~/services/auth/auth.types";

type RegenerateEinreichungXJustizOptions = {
  verfahrenId: string;
  einreichungId: string;
};

export default async function regenerateEinreichungXJustiz(
  authSession: AuthSession,
  options: RegenerateEinreichungXJustizOptions,
): Promise<void> {
  await createEinreichungXJustiz(authSession, {
    verfahrenId: options.verfahrenId,
    id: options.einreichungId,
    ersetzen: true,
  });
}
