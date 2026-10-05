import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import { RechtsformSchema } from "~/domains/verfahren/entities/beteiligung/rechtsform.entity";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import { getListeResponseSchema } from "~/domains/verfahren/infrastructure/api/listResponse";
import { AuthSession } from "~/services/auth/auth.types";

export const fetchAnschriftstypenSchema =
  getListeResponseSchema(CodeWertSchema);

export async function fetchAnschriftstypen(
  authSession: AuthSession,
): Promise<z.infer<typeof fetchAnschriftstypenSchema>> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/anschriftstypen",
    schema: fetchAnschriftstypenSchema,
    errorMessage: "Anschriftstyp data could not be fetched.",
  });
}

export const fetchGerichteSchema = getListeResponseSchema(CodeWertSchema);

export async function fetchGerichte(
  authSession: AuthSession,
): Promise<z.infer<typeof fetchGerichteSchema>> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/gerichte",
    schema: fetchGerichteSchema,
    errorMessage: "Gericht data could not be fetched.",
  });
}

export const fetchKanzleiformenSchema = getListeResponseSchema(CodeWertSchema);

export async function fetchKanzleiformen(
  authSession: AuthSession,
): Promise<z.infer<typeof fetchKanzleiformenSchema>> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/kanzleiformen",
    schema: fetchKanzleiformenSchema,
    errorMessage: "Kanzleiform data could not be fetched.",
  });
}

export const fetchRechtsformenSchema = getListeResponseSchema(RechtsformSchema);

export async function fetchRechtsformen(
  authSession: AuthSession,
): Promise<z.infer<typeof fetchRechtsformenSchema>> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/rechtsformen",
    schema: fetchRechtsformenSchema,
    errorMessage: "Rechtsform data could not be fetched.",
  });
}

export const fetchRollenbezeichnungenSchema =
  getListeResponseSchema(CodeWertSchema);

export async function fetchRollenbezeichnungen(
  authSession: AuthSession,
): Promise<z.infer<typeof fetchRollenbezeichnungenSchema>> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/rollenbezeichnungen",
    schema: fetchRollenbezeichnungenSchema,
    errorMessage: "Rollenbezeichnung data could not be fetched.",
  });
}

export const fetchStaatenSchema = getListeResponseSchema(CodeWertSchema);

export async function fetchStaaten(
  authSession: AuthSession,
): Promise<z.infer<typeof fetchStaatenSchema>> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/staaten",
    schema: fetchStaatenSchema,
    errorMessage: "Staat data could not be fetched.",
  });
}

const TelekommunikationsartCodeWertSchema = CodeWertSchema.extend({
  beschreibung: z.nullable(z.string()),
});

export const fetchTelekommunikationsartenSchema = getListeResponseSchema(
  TelekommunikationsartCodeWertSchema,
);

export async function fetchTelekommunikationsarten(
  authSession: AuthSession,
): Promise<z.infer<typeof fetchTelekommunikationsartenSchema>> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/telekommunikationsarten",
    schema: fetchTelekommunikationsartenSchema,
    errorMessage: "Telekommunikationsart data could not be fetched.",
  });
}
