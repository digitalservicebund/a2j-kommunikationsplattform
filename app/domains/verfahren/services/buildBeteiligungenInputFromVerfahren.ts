import z from "zod";
import type { Beteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { BeteiligungInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/beteiligung.input.schema";

type BeteiligungInput = z.input<typeof BeteiligungInputSchema>;

function buildBeteiligungInput(beteiligung: Beteiligung): BeteiligungInput {
  const shared = {
    rollen: beteiligung.rollen.map((rolle) => ({
      rollennummer: rolle.rollennummer,
      rollenbezeichnungId: rolle.rollenbezeichnung.id,
      geschaeftszeichen: rolle.geschaeftszeichen,
      referenz: rolle.referenz,
    })),
    anschriften:
      beteiligung.anschriften?.map((anschrift) => ({
        anschriftstypId: anschrift.anschriftstyp?.id ?? null,
        strasse: anschrift.strasse,
        hausnummer: anschrift.hausnummer,
        postleitzahl: anschrift.postleitzahl,
        ort: anschrift.ort,
        postfachnummer: anschrift.postfachnummer,
        staatId: anschrift.staat?.id ?? null,
      })) ?? null,
    kommunikationsanschluesse:
      beteiligung.telekommunikation?.map((telekommunikation) => ({
        telekommunikationsartId: telekommunikation.telekommunikationsart.id,
        verbindung: telekommunikation.verbindung,
      })) ?? null,
  };

  if (beteiligung.beteiligtenart === "natuerlichePerson") {
    return {
      beteiligtenart: beteiligung.beteiligtenart,
      vorname: beteiligung.vorname,
      titel: beteiligung.titel,
      namensvorsatz: beteiligung.namensvorsatz,
      nachname: beteiligung.nachname,
      ...shared,
    };
  }

  if (beteiligung.beteiligtenart === "organisation") {
    return {
      beteiligtenart: beteiligung.beteiligtenart,
      bezeichnung: beteiligung.bezeichnung,
      ...shared,
    };
  }

  return {
    beteiligtenart: beteiligung.beteiligtenart,
    bezeichnung: beteiligung.bezeichnung,
    rechtsformId: beteiligung.rechtsform?.id ?? null,
    kanzleiformId: beteiligung.kanzleiform.id,
    ...shared,
  };
}

/**
 * Maps the Beteiligungen of a fetched Verfahren back into the input shape of
 * a Verfahren update, so that an update of other Verfahren fields can resend
 * them unchanged (the update replaces all Beteiligungen).
 */
export default function buildBeteiligungenInputFromVerfahren(
  beteiligungen: readonly Beteiligung[] | null,
): BeteiligungInput[] | null {
  if (!beteiligungen?.length) {
    return null;
  }

  return beteiligungen.map(buildBeteiligungInput);
}
