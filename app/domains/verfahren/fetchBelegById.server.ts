import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { BelegSchema } from "./schemas/belegSchema";

type FetchBelegByIdOptions = {
  verfahrenId: string;
  id: string;
};

const buildErrorMessage = (id: string, verfahrenId: string): string =>
  `Beleg with id ${id} of Verfahren with id ${verfahrenId} could not be fetched.`;

export default async function fetchBelegById(
  authData: AuthenticationResponse,
  options: FetchBelegByIdOptions,
): Promise<z.infer<typeof BelegSchema>> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/belege/${options.id}`,
    schema: BelegSchema,
    errorMessage: buildErrorMessage(options.id, options.verfahrenId),
  });
}
