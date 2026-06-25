import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { apiRequest } from "./apiClient";

// API observation: `erstellt_von` is always an empty string — not populated from tokens
export type Einreichung = {
  id: string;
  verfahren_id: string;
  status: "ENTWURF" | "EINGEREICHT";
  erstellt_am: string;
  erstellt_von: string;
};

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
