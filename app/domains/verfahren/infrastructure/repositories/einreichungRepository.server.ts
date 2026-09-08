import z from "zod";
import {
  EinreichenResponse,
  Einreichung,
  EinreichungErstellenResponse,
} from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import {
  EinreichenResponseSchema,
  EinreichungenSchema,
  EinreichungErstellenResponseSchema,
  EinreichungSchema,
} from "~/domains/verfahren/infrastructure/schemas/einreichung.schema";
import { ValidierungsstatusSchema } from "~/domains/verfahren/infrastructure/schemas/validierungsstatus.schema";
import { AuthenticationResponse } from "~/services/auth/auth.types";

type FetchEinreichungByIdOptions = {
  id: string;
  verfahrenId: string;
};

export type FetchEinreichungByIdResult = {
  einreichung: Einreichung;
  eTag: string | null;
};

export async function fetchEinreichungById(
  authData: AuthenticationResponse,
  options: FetchEinreichungByIdOptions,
): Promise<FetchEinreichungByIdResult> {
  const { data, eTag } = await apiRequest<Einreichung>({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}`,
    schema: EinreichungSchema,
    includeResponseETag: true,
    errorMessage: `Einreichung with id ${options.id} of Verfahren with id ${options.verfahrenId} could not be fetched.`,
  });

  return {
    einreichung: data,
    eTag,
  };
}

type FetchEinreichungenByIdOptions = {
  id: string;
};

export async function fetchEinreichungenById(
  authData: AuthenticationResponse,
  options: FetchEinreichungenByIdOptions,
): Promise<z.infer<typeof EinreichungenSchema>> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.id}/einreichungen`,
    schema: EinreichungenSchema,
    errorMessage: `Einreichungen of Verfahren with id ${options.id} could not be fetched.`,
  });
}

type FetchEinreichungStatusOptions = {
  id: string;
  verfahrenId: string;
};

export async function fetchEinreichungStatus(
  authData: AuthenticationResponse,
  options: FetchEinreichungStatusOptions,
): Promise<Validierungsstatus> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/validierungsstatus`,
    schema: ValidierungsstatusSchema,
    errorMessage: `Validierungsstatus for Einreichung with id ${options.id} of Verfahren with id ${options.verfahrenId} could not be fetched.`,
  });
}

type FetchEinreichungXJustizOptions = {
  verfahrenId: string;
  id: string;
};

export async function fetchEinreichungXJustiz(
  authData: AuthenticationResponse,
  options: FetchEinreichungXJustizOptions,
): Promise<string> {
  return apiRequest<string>({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/xjustiz`,
    responseType: "text",
    errorMessage: `XJustiz-Nachricht for Einreichung with id ${options.id} of Verfahren with id ${options.verfahrenId} could not be fetched.`,
  });
}

export async function createEinreichung(
  authData: AuthenticationResponse,
  verfahrenId: string,
): Promise<EinreichungErstellenResponse> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${verfahrenId}/einreichungen`,
    method: "POST",
    body: { name: "Klageeinreichung" },
    schema: EinreichungErstellenResponseSchema,
    errorMessage: `Einreichung for Verfahren with id ${verfahrenId} could not be created.`,
  });
}

type SubmitEinreichungenOptions = {
  verfahrenId: string;
  id: string;
  eTag: string;
};

export async function submitEinreichungen(
  authData: AuthenticationResponse,
  options: SubmitEinreichungenOptions,
): Promise<EinreichenResponse> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/einreichen`,
    method: "POST",
    eTag: options.eTag,
    schema: EinreichenResponseSchema,
    errorMessage: `Einreichung with id ${options.id} could not be submitted.`,
  });
}
