import { createEinreichungXJustiz } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";

type RegenerateEinreichungXJustizOptions = {
  verfahrenId: string;
  einreichungId: string;
};

export default async function regenerateEinreichungXJustiz(
  authData: AuthenticationResponse,
  options: RegenerateEinreichungXJustizOptions,
): Promise<void> {
  await createEinreichungXJustiz(authData, {
    verfahrenId: options.verfahrenId,
    id: options.einreichungId,
    ersetzen: true,
  });
}
