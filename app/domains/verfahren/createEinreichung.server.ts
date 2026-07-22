import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { EinreichungSchema } from "./schemas/einreichungSchema";

export type Einreichung = z.infer<typeof EinreichungSchema>;

const buildErrorMessage = (id: string): string =>
  `Einreichung for Verfahren with id ${id} could not be created.`;

export default async function createEinreichung(
  authData: AuthenticationResponse,
  verfahrenId: string,
): Promise<Einreichung> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${verfahrenId}/einreichungen`,
    method: "POST",
    body: { name: "Klageeinreichung" },
    errorMessage: buildErrorMessage(verfahrenId),
  });
}
