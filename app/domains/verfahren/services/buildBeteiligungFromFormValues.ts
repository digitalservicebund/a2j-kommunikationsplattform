import z from "zod";
import { AnschriftRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.request.schema";
import {
  NatuerlichePersonRequestSchema,
  RaKanzleiRequestSchema,
} from "~/domains/verfahren/infrastructure/schemas/requests/beteiligung.request.schema";
import { KommunikationsanschlussRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/kommunikationsanschluss.request.schema";

type NatuerlichePersonRequest = z.infer<typeof NatuerlichePersonRequestSchema>;
type RaKanzleiRequest = z.infer<typeof RaKanzleiRequestSchema>;
type Anschriften = z.infer<typeof AnschriftRequestSchema>[] | null;
type Kommunikationsanschluesse =
  z.infer<typeof KommunikationsanschlussRequestSchema>[] | null;

type AdresseKontaktFormValues = {
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  ort: string;
  email: string;
  telefon: string;
};

export type ParteiFormValues = AdresseKontaktFormValues & {
  vorname: string;
  nachname: string;
};

export type AnwaltFormValues = AdresseKontaktFormValues & {
  name: string;
};

export type BeteiligungCodeIds = {
  rollenbezeichnungId: string;
  anschriftstypId: string;
  staatId: string;
  emailTelekommunikationsartId: string;
  telefonTelekommunikationsartId: string;
};

export type AnwaltCodeIds = BeteiligungCodeIds & {
  kanzleiformId: string;
};

function buildAnschriften(
  formValues: AdresseKontaktFormValues,
  codeIds: BeteiligungCodeIds,
): Anschriften {
  const hasAddress = [
    formValues.strasse,
    formValues.hausnummer,
    formValues.postleitzahl,
    formValues.ort,
  ].some(Boolean);

  if (!hasAddress) {
    return null;
  }

  return [
    {
      anschriftstyp_id: codeIds.anschriftstypId,
      strasse: formValues.strasse || null,
      hausnummer: formValues.hausnummer || null,
      postleitzahl: formValues.postleitzahl || null,
      ort: formValues.ort || null,
      postfachnummer: null,
      staat_id: codeIds.staatId,
    },
  ];
}

function buildKommunikationsanschluesse(
  formValues: AdresseKontaktFormValues,
  codeIds: BeteiligungCodeIds,
): Kommunikationsanschluesse {
  const kommunikationsanschluesse = [
    formValues.email
      ? {
          telekommunikationsart_id: codeIds.emailTelekommunikationsartId,
          verbindung: formValues.email,
        }
      : null,
    formValues.telefon
      ? {
          telekommunikationsart_id: codeIds.telefonTelekommunikationsartId,
          verbindung: formValues.telefon,
        }
      : null,
  ].filter((eintrag) => eintrag !== null);

  return kommunikationsanschluesse.length > 0
    ? kommunikationsanschluesse
    : null;
}

export default function buildBeteiligungFromFormValues(
  partei: ParteiFormValues,
  codeIds: BeteiligungCodeIds,
  rollennummer: string | null = null,
): NatuerlichePersonRequest | null {
  if (!partei.nachname) {
    return null;
  }

  return {
    beteiligtenart: "natuerlichePerson",
    vorname: partei.vorname || null,
    titel: null,
    namensvorsatz: null,
    nachname: partei.nachname,
    rollen: [
      {
        rollennummer,
        rollenbezeichnung_id: codeIds.rollenbezeichnungId,
        geschaeftszeichen: null,
        referenz: null,
      },
    ],
    anschriften: buildAnschriften(partei, codeIds),
    kommunikationsanschluesse: buildKommunikationsanschluesse(partei, codeIds),
  };
}

export function buildRaKanzleiFromFormValues(
  anwalt: AnwaltFormValues,
  codeIds: AnwaltCodeIds,
  vertreteneRollennummer: string,
): RaKanzleiRequest | null {
  if (!anwalt.name) {
    return null;
  }

  return {
    beteiligtenart: "raKanzlei",
    bezeichnung: anwalt.name,
    rechtsform_id: null,
    kanzleiform_id: codeIds.kanzleiformId,
    rollen: [
      {
        rollennummer: null,
        rollenbezeichnung_id: codeIds.rollenbezeichnungId,
        geschaeftszeichen: null,
        referenz: vertreteneRollennummer,
      },
    ],
    anschriften: buildAnschriften(anwalt, codeIds),
    kommunikationsanschluesse: buildKommunikationsanschluesse(anwalt, codeIds),
  };
}
