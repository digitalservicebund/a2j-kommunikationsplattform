import z from "zod";
import { NatuerlichePersonRequestSchema } from "~/domains/verfahren/schemas/beteiligungenRequestSchema";

type NatuerlichePersonRequest = z.infer<typeof NatuerlichePersonRequestSchema>;

export type ParteiFormValues = {
  vorname: string;
  nachname: string;
  strasse: string;
  hausnummer: string;
  postleitzahl: string;
  ort: string;
  email: string;
  telefon: string;
};

export type BeteiligungCodeIds = {
  rollenbezeichnungId: string;
  anschriftstypId: string;
  staatId: string;
  emailTelekommunikationsartId: string;
  telefonTelekommunikationsartId: string;
};

function buildAnschriften(
  partei: ParteiFormValues,
  codeIds: BeteiligungCodeIds,
): NatuerlichePersonRequest["anschriften"] {
  const hasAddress = [
    partei.strasse,
    partei.hausnummer,
    partei.postleitzahl,
    partei.ort,
  ].some(Boolean);

  if (!hasAddress) {
    return null;
  }

  return [
    {
      anschriftstyp_id: codeIds.anschriftstypId,
      strasse: partei.strasse || null,
      hausnummer: partei.hausnummer || null,
      postleitzahl: partei.postleitzahl || null,
      ort: partei.ort || null,
      postfachnummer: null,
      staat_id: codeIds.staatId,
    },
  ];
}

function buildKommunikationsanschluesse(
  partei: ParteiFormValues,
  codeIds: BeteiligungCodeIds,
): NatuerlichePersonRequest["kommunikationsanschluesse"] {
  const kommunikationsanschluesse = [
    partei.email
      ? {
          telekommunikationsart_id: codeIds.emailTelekommunikationsartId,
          verbindung: partei.email,
        }
      : null,
    partei.telefon
      ? {
          telekommunikationsart_id: codeIds.telefonTelekommunikationsartId,
          verbindung: partei.telefon,
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
        rollennummer: null,
        rollenbezeichnung_id: codeIds.rollenbezeichnungId,
        geschaeftszeichen: null,
        referenz: null,
      },
    ],
    anschriften: buildAnschriften(partei, codeIds),
    kommunikationsanschluesse: buildKommunikationsanschluesse(partei, codeIds),
  };
}
