import {
  AnschriftstypListe,
  AnschriftstypListeSchema,
} from "~/domains/verfahren/entities/codelisten/anschriftstyp.entity";
import {
  GerichtListe,
  GerichtListeSchema,
} from "~/domains/verfahren/entities/codelisten/gericht.entity";
import {
  KanzleiformListe,
  KanzleiformListeSchema,
} from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import {
  RechtsformListe,
  RechtsformListeSchema,
} from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import {
  RollenbezeichnungListe,
  RollenbezeichnungListeSchema,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import {
  StaatListe,
  StaatListeSchema,
} from "~/domains/verfahren/entities/codelisten/staat.entity";
import {
  TelekommunikationsartListe,
  TelekommunikationsartListeSchema,
} from "~/domains/verfahren/entities/codelisten/telekommunikationsart";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import { AuthSession } from "~/services/auth/auth.types";

export async function fetchAnschriftstypen(
  authSession: AuthSession,
): Promise<AnschriftstypListe> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/anschriftstypen",
    schema: AnschriftstypListeSchema,
    errorMessage: "Anschriftstyp data could not be fetched.",
  });
}

export async function fetchGerichte(
  authSession: AuthSession,
): Promise<GerichtListe> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/gerichte",
    schema: GerichtListeSchema,
    errorMessage: "Gericht data could not be fetched.",
  });
}

export async function fetchKanzleiformen(
  authSession: AuthSession,
): Promise<KanzleiformListe> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/kanzleiformen",
    schema: KanzleiformListeSchema,
    errorMessage: "Kanzleiform data could not be fetched.",
  });
}

export async function fetchRechtsformen(
  authSession: AuthSession,
): Promise<RechtsformListe> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/rechtsformen",
    schema: RechtsformListeSchema,
    errorMessage: "Rechtsform data could not be fetched.",
  });
}

export async function fetchRollenbezeichnungen(
  authSession: AuthSession,
): Promise<RollenbezeichnungListe> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/rollenbezeichnungen",
    schema: RollenbezeichnungListeSchema,
    errorMessage: "Rollenbezeichnung data could not be fetched.",
  });
}

export async function fetchStaaten(
  authSession: AuthSession,
): Promise<StaatListe> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/staaten",
    schema: StaatListeSchema,
    errorMessage: "Staat data could not be fetched.",
  });
}

export async function fetchTelekommunikationsarten(
  authSession: AuthSession,
): Promise<TelekommunikationsartListe> {
  return apiRequest({
    authSession,
    path: "/api/v1/codelisten/telekommunikationsarten",
    schema: TelekommunikationsartListeSchema,
    errorMessage: "Telekommunikationsart data could not be fetched.",
  });
}
