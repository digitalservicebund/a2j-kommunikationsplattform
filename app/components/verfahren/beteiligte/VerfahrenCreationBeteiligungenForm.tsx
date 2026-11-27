import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import Button from "~/components/Button";
import { config } from "~/config/config";
import { Beteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import {
  ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT,
  ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
} from "~/domains/verfahren/entities/codelisten/anschriftstyp.entity";
import {
  Kanzleiform,
  KANZLEIFORM_CODE_EINZELANWALT,
} from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import {
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "~/domains/verfahren/services/beteiligteContactInfo";
import { PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME } from "~/domains/verfahren/services/buildPlaceholderBeteiligungInputs";
import generateRollennummer from "~/domains/verfahren/services/generateRollennummer";
import { useTranslations } from "~/services/translations/context";
import {
  BeteiligungFieldValues,
  BeteiligungFieldValuesSchema,
  BeteiligungRolleFieldValues,
} from "./BeteiligungFieldset";
import { partitionBeteiligungItemsBySeite } from "./partitionBeteiligungItemsBySeite";
import VerfahrenCreationBeteiligungSeiteFieldset, {
  BeteiligungFieldsetItem,
} from "./VerfahrenCreationBeteiligungSeiteFieldset";

function generateRolle(
  key: number,
  rollenbezeichnungCode: string,
  referenz: string[] = [],
): BeteiligungRolleFieldValues {
  return {
    rollennummer: generateRollennummer(key, rollenbezeichnungCode),
    rollenbezeichnungCode,
    referenz,
  };
}

function dummyBeteiligungFieldsetItems(): BeteiligungFieldsetItem[] {
  return [
    {
      key: 0,
      defaultValues: BeteiligungFieldValuesSchema.parse({
        beteiligtenart: "natuerlichePerson",
        rollen: [generateRolle(0, ROLLENBEZEICHNUNG_CODE_KLAEGERIN)],
        vorname: "Erika",
        nachname: "Mustermann",
        strasse: "Heidestraße",
        hausnummer: "17",
        postleitzahl: "51147",
        ort: "Köln",
        email: "erika.mustermann@example.com",
        telefon: "0170123456",
      }),
    },
    {
      key: 1,
      defaultValues: BeteiligungFieldValuesSchema.parse({
        beteiligtenart: "raKanzlei",
        rollen: [
          generateRolle(1, ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE, [
            generateRollennummer(0, ROLLENBEZEICHNUNG_CODE_KLAEGERIN),
          ]),
        ],
        bezeichnung: "Rechtsanwalt Dr. Kathrin Hölzer",
        strasse: "Hauptstraße",
        hausnummer: "15",
        postleitzahl: "80123",
        ort: "München",
        kanzleiformCode: KANZLEIFORM_CODE_EINZELANWALT,
      }),
    },
    {
      key: 2,
      defaultValues: BeteiligungFieldValuesSchema.parse({
        beteiligtenart: "natuerlichePerson",
        rollen: [generateRolle(2, ROLLENBEZEICHNUNG_CODE_BEKLAGTE)],
        vorname: "Emine",
        nachname: "Kartal",
        strasse: "Eichenring",
        hausnummer: "115",
        postleitzahl: "30270",
        ort: "Hannover",
      }),
    },
  ];
}

export function existingBeteiligungToFieldValues(
  beteiligung: Beteiligung,
): BeteiligungFieldValues {
  const natuerlichePerson =
    beteiligung?.beteiligtenart === "natuerlichePerson"
      ? beteiligung
      : undefined;
  const organisation =
    beteiligung?.beteiligtenart === "organisation" ? beteiligung : undefined;
  const raKanzlei =
    beteiligung?.beteiligtenart === "raKanzlei" ? beteiligung : undefined;

  const anschriftstyp = natuerlichePerson
    ? ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT
    : ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT;
  const primaryAnschrift = beteiligung?.anschriften?.find(
    (anschrift) => anschrift.anschriftstyp?.code === anschriftstyp,
  );

  // When the draft Verfahren was initially created, required fields for the
  // initial list of Beteiligungen was filled with placeholder values. We
  // filter those out so that they are not shown to the user.
  const dropPlaceholderValue = (
    requiredFieldValue: string | null | undefined,
  ) =>
    requiredFieldValue === PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME
      ? ""
      : (requiredFieldValue ?? "");

  return {
    id: beteiligung.id,
    beteiligtenart: beteiligung.beteiligtenart,
    rollen: beteiligung.rollen.map((rolle) => ({
      rollennummer: rolle.rollennummer,
      rollenbezeichnungCode: rolle.rollenbezeichnung.code,
      referenz: rolle.referenz,
      geschaeftszeichen: rolle.geschaeftszeichen,
    })),
    vorname: natuerlichePerson?.vorname,
    nachname: dropPlaceholderValue(natuerlichePerson?.nachname),
    bezeichnung: dropPlaceholderValue(
      organisation?.bezeichnung ?? raKanzlei?.bezeichnung,
    ),
    rechtsformCode: raKanzlei?.rechtsform?.code ?? null,
    kanzleiformCode: raKanzlei?.kanzleiform.code ?? null,
    strasse: primaryAnschrift?.strasse ?? "",
    hausnummer: primaryAnschrift?.hausnummer,
    postleitzahl: primaryAnschrift?.postleitzahl,
    ort: primaryAnschrift?.ort,
    email: getBeteiligteEmail(beteiligung),
    telefon: getBeteiligteTelefon(beteiligung),
  };
}

function existingBeteiligungenToFieldsetItems(
  beteiligungen: Beteiligung[],
): BeteiligungFieldsetItem[] {
  return beteiligungen.map((beteiligung, index) => ({
    key: index,
    defaultValues: existingBeteiligungToFieldValues(beteiligung),
  }));
}

export type VerfahrenBeteiligungenFormProps = {
  existingBeteiligungen: Beteiligung[];
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
};

export default function VerfahrenCreationBeteiligungenForm({
  existingBeteiligungen,
  kanzleiformen,
  rechtsformen,
}: Readonly<VerfahrenBeteiligungenFormProps>) {
  const t = useTranslations();

  const [items, setItems] = useState(() =>
    existingBeteiligungen.length > 0
      ? existingBeteiligungenToFieldsetItems(existingBeteiligungen)
      : [],
  );

  const rollennummerToRollenbezeichnungCode = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of items) {
      for (const rolle of item.defaultValues.rollen) {
        if (rolle.rollennummer) {
          map.set(rolle.rollennummer, rolle.rollenbezeichnungCode);
        }
      }
    }
    return map;
  }, [items]);

  const { klagendenseite, beklagtenseite } = useMemo(
    () =>
      partitionBeteiligungItemsBySeite(
        items,
        rollennummerToRollenbezeichnungCode,
      ),
    [items, rollennummerToRollenbezeichnungCode],
  );

  const handleAddPartei = useCallback((rollenbezeichnungCode: string) => {
    setItems((previousItems) => {
      const key = previousItems.length;
      return [
        ...previousItems,
        {
          key,
          defaultValues: BeteiligungFieldValuesSchema.parse({
            beteiligtenart: "natuerlichePerson",
            rollen: [generateRolle(key, rollenbezeichnungCode)],
          }),
        },
      ] satisfies BeteiligungFieldsetItem[];
    });
  }, []);

  const handleAddProzessbevollmaechtigte = useCallback(
    (parteiRollenbezeichnungCode: string) => {
      setItems((previousItems) => {
        const key = previousItems.length;
        return [
          ...previousItems,
          {
            key,
            defaultValues: BeteiligungFieldValuesSchema.parse({
              beteiligtenart: "raKanzlei",
              rollen: [
                generateRolle(
                  key,
                  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
                  Array.from(rollennummerToRollenbezeichnungCode.entries())
                    .filter(
                      ([_rollennummer, rollenbezeichnungCode]) =>
                        rollenbezeichnungCode === parteiRollenbezeichnungCode,
                    )
                    .map(([rollennummer]) => rollennummer),
                ),
              ],
            }),
          },
        ] satisfies BeteiligungFieldsetItem[];
      });
    },
    [rollennummerToRollenbezeichnungCode],
  );

  const handleFillInDummyData: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      flushSync(() => setItems([]));
      setItems(dummyBeteiligungFieldsetItems());
    }, []);

  return (
    <div>
      {/* Button to fill in dummy data (local development only) */}
      {config().ENVIRONMENT === "development" && (
        <Button
          appearance="secondary"
          type="button"
          className="kern-btn--x-small kern-mt-sm self-start"
          onClick={handleFillInDummyData}
          label="Fill details with dummy data"
        />
      )}

      {/* Klagendenseite */}
      <VerfahrenCreationBeteiligungSeiteFieldset
        title={t.routes.verfahrenNeu.beteiligte.form.klagendenseite.title}
        items={klagendenseite}
        parteiRollenbezeichnungCode={ROLLENBEZEICHNUNG_CODE_KLAEGERIN}
        kanzleiformen={kanzleiformen}
        rechtsformen={rechtsformen}
        onAddPartei={handleAddPartei}
        onAddProzessbevollmaechtigte={handleAddProzessbevollmaechtigte}
      />

      {/* Beklagtenseite */}
      <VerfahrenCreationBeteiligungSeiteFieldset
        title={t.routes.verfahrenNeu.beteiligte.form.beklagtenseite.title}
        items={beklagtenseite}
        parteiRollenbezeichnungCode={ROLLENBEZEICHNUNG_CODE_BEKLAGTE}
        kanzleiformen={kanzleiformen}
        rechtsformen={rechtsformen}
        onAddPartei={handleAddPartei}
        onAddProzessbevollmaechtigte={handleAddProzessbevollmaechtigte}
      />
    </div>
  );
}
