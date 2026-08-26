import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { EinreichenResponseSchema } from "./schemas/einreichungSchema";

type SubmitEinreichungenOptions = {
  verfahrenId: string;
  id: string;
  eTag: string;
};

export type EinreichenResponse = z.infer<typeof EinreichenResponseSchema>;

const buildErrorMessage = (id: string): string =>
  `Einreichung with id ${id} could not be submitted.`;

export default async function submitEinreichungen(
  authData: AuthenticationResponse,
  options: SubmitEinreichungenOptions,
): Promise<EinreichenResponse> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/einreichen`,
    method: "POST",
    eTag: options.eTag,
    schema: EinreichenResponseSchema,
    errorMessage: buildErrorMessage(options.id),
  });
}
