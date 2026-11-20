import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import Button from "~/components/Button";
import { config } from "~/config/config";
import { Beteiligung } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
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
import { useTranslations } from "~/services/translations/context";
import {
  BeteiligungFieldValuesSchema,
  existingBeteiligungToFieldValues,
} from "./BeteiligungFieldset";
import { partitionBeteiligungItemsBySeite } from "./partitionBeteiligungItemsBySeite";
import VerfahrenCreationBeteiligungSeiteFieldset, {
  BeteiligungFieldsetItem,
} from "./VerfahrenCreationBeteiligungSeiteFieldset";

function defaultBeteiligungFieldsetItems(): BeteiligungFieldsetItem[] {
  return [
    {
      key: 0,
      defaultValues: BeteiligungFieldValuesSchema.parse({
        beteiligtenart: "natuerlichePerson",
        rollen: [
          {
            rollennummer: `0:${ROLLENBEZEICHNUNG_CODE_KLAEGERIN}`,
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
          },
        ],
      }),
    },
    {
      key: 1,
      defaultValues: BeteiligungFieldValuesSchema.parse({
        beteiligtenart: "raKanzlei",
        rollen: [
          {
            rollennummer: `1:${ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE}`,
            rollenbezeichnungCode:
              ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
            referenz: [`0:${ROLLENBEZEICHNUNG_CODE_KLAEGERIN}`],
          },
        ],
      }),
    },
    {
      key: 2,
      defaultValues: BeteiligungFieldValuesSchema.parse({
        beteiligtenart: "natuerlichePerson",
        rollen: [
          {
            rollennummer: `2:${ROLLENBEZEICHNUNG_CODE_BEKLAGTE}`,
            rollenbezeichnungCode: ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
          },
        ],
      }),
    },
  ];
}

function dummyBeteiligungFieldsetItems(): BeteiligungFieldsetItem[] {
  const items = defaultBeteiligungFieldsetItems();
  items[0].defaultValues = {
    ...items[0].defaultValues,
    vorname: "Erika",
    nachname: "Mustermann",
    strasse: "Heidestraße",
    hausnummer: "17",
    postleitzahl: "51147",
    ort: "Köln",
    email: "erika.mustermann@example.com",
    telefon: "0170123456",
  };
  items[1].defaultValues = {
    ...items[1].defaultValues,
    bezeichnung: "Rechtsanwalt Dr. Kathrin Hölzer",
    strasse: "Hauptstraße",
    hausnummer: "15",
    postleitzahl: "80123",
    ort: "München",
    kanzleiformCode: KANZLEIFORM_CODE_EINZELANWALT,
  };
  items[2].defaultValues = {
    ...items[2].defaultValues,
    vorname: "Emine",
    nachname: "Kartal",
    strasse: "Eichenring",
    hausnummer: "115",
    postleitzahl: "30270",
    ort: "Hannover",
  };
  return items;
}

export type VerfahrenBeteiligungenEditFormProps = {
  existingBeteiligungen: Beteiligung[];
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
};

export default function VerfahrenCreationBeteiligungenEditForm({
  existingBeteiligungen,
  kanzleiformen,
  rechtsformen,
}: VerfahrenBeteiligungenEditFormProps) {
  const t = useTranslations();

  const [items, setItems] = useState(() => {
    if (existingBeteiligungen.length > 0) {
      return existingBeteiligungen.map((beteiligung, index) => ({
        key: index,
        defaultValues: existingBeteiligungToFieldValues(beteiligung),
      }));
    } else {
      return defaultBeteiligungFieldsetItems();
    }
  });

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
            rollen: [
              {
                rollennummer: `${key}:${rollenbezeichnungCode}`,
                rollenbezeichnungCode,
              },
            ],
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
                {
                  rollennummer: `${key}:${ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE}`,
                  rollenbezeichnungCode:
                    ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
                  referenz: Array.from(
                    rollennummerToRollenbezeichnungCode.entries(),
                  )
                    .filter(
                      ([_rollennummer, rollenbezeichnungCode]) =>
                        rollenbezeichnungCode === parteiRollenbezeichnungCode,
                    )
                    .map(([rollennummer]) => rollennummer),
                },
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
        title={t.routes.verfahrenNeu.beteiligte.form.klagendenseite}
        items={klagendenseite}
        parteiRollenbezeichnungCode={ROLLENBEZEICHNUNG_CODE_KLAEGERIN}
        kanzleiformen={kanzleiformen}
        rechtsformen={rechtsformen}
        onAddPartei={handleAddPartei}
        onAddProzessbevollmaechtigte={handleAddProzessbevollmaechtigte}
      />

      {/* Beklagtenseite */}
      <VerfahrenCreationBeteiligungSeiteFieldset
        title={t.routes.verfahrenNeu.beteiligte.form.beklagtenseite}
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
