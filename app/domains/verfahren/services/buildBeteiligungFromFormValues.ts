import z from "zod";
import { AnschriftInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.input.schema";
import {
  NatuerlichePersonInputSchema,
  RaKanzleiInputSchema,
} from "~/domains/verfahren/infrastructure/schemas/requests/beteiligung.input.schema";
import { KommunikationsanschlussInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/kommunikationsanschluss.input.schema";

type NatuerlichePersonInput = z.input<typeof NatuerlichePersonInputSchema>;
type RaKanzleiInput = z.input<typeof RaKanzleiInputSchema>;
type Anschriften = z.input<typeof AnschriftInputSchema>[] | null;
type Kommunikationsanschluesse =
  z.input<typeof KommunikationsanschlussInputSchema>[] | null;

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
      anschriftstypId: codeIds.anschriftstypId,
      strasse: formValues.strasse || null,
      hausnummer: formValues.hausnummer || null,
      postleitzahl: formValues.postleitzahl || null,
      ort: formValues.ort || null,
      postfachnummer: null,
      staatId: codeIds.staatId,
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
          telekommunikationsartId: codeIds.emailTelekommunikationsartId,
          verbindung: formValues.email,
        }
      : null,
    formValues.telefon
      ? {
          telekommunikationsartId: codeIds.telefonTelekommunikationsartId,
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
): NatuerlichePersonInput | null {
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
        rollenbezeichnungId: codeIds.rollenbezeichnungId,
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
): RaKanzleiInput | null {
  if (!anwalt.name) {
    return null;
  }

  return {
    beteiligtenart: "raKanzlei",
    bezeichnung: anwalt.name,
    rechtsformId: null,
    kanzleiformId: codeIds.kanzleiformId,
    rollen: [
      {
        rollennummer: null,
        rollenbezeichnungId: codeIds.rollenbezeichnungId,
        geschaeftszeichen: null,
        referenz: vertreteneRollennummer,
      },
    ],
    anschriften: buildAnschriften(anwalt, codeIds),
    kommunikationsanschluesse: buildKommunikationsanschluesse(anwalt, codeIds),
  };
}
