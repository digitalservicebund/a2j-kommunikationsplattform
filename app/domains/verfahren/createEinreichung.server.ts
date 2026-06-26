import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { EinreichungSchema } from "./schemas/einreichungSchema";

export type Einreichung = z.infer<typeof EinreichungSchema>;

const errorMessage = "Einreichung konnte nicht erstellt werden.";

export default async function createEinreichung(
  authData: AuthenticationResponse,
  verfahrenId: string,
): Promise<Einreichung> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${verfahrenId}/einreichungen`,
    method: "POST",
    body: { name: "Klageeinreichung" },
    errorMessage,
  });
}
