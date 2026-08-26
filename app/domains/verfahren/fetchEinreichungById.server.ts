import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { EinreichungSchema } from "./schemas/einreichungSchema";

type FetchEinreichungByIdOptions = {
  id: string;
  verfahrenId: string;
};

export type Einreichung = z.infer<typeof EinreichungSchema>;

export type FetchEinreichungByIdResult = {
  einreichung: Einreichung;
  eTag: string | null;
};

const buildErrorMessage = (id: string, verfahrenId: string): string =>
  `Einreichung with id ${id} of Verfahren with id ${verfahrenId} could not be fetched.`;

export default async function fetchEinreichungById(
  authData: AuthenticationResponse,
  options: FetchEinreichungByIdOptions,
): Promise<FetchEinreichungByIdResult> {
  const { data, eTag } = await apiRequest<Einreichung>({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}`,
    schema: EinreichungSchema,
    includeResponseETag: true,
    errorMessage: buildErrorMessage(options.id, options.verfahrenId),
  });

  return {
    einreichung: data,
    eTag,
  };
}
