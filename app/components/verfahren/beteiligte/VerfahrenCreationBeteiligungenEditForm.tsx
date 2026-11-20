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
import resolveCodeWertId from "~/domains/verfahren/services/resolveCodeWertId";
import {
  BeteiligungFieldValuesSchema,
  existingBeteiligungToFieldValues,
} from "./BeteiligungFieldset";
import { partitionBeteiligungItemsBySeite } from "./partitionBeteiligungItemsBySeite";
import VerfahrenCreationBeteiligungSeiteFieldset, {
  BeteiligungFieldsetItem,
} from "./VerfahrenCreationBeteiligungSeiteFieldset";

function defaultBeteiligungFieldsetItems(
  klagendeParteiRollenbezeichnungId: string,
  beklagteParteiRollenbezeichnungId: string,
  prozessbevollmaechtigteRollenbezeichnungId: string,
): BeteiligungFieldsetItem[] {
  return [
    {
      key: 0,
      defaultValues: BeteiligungFieldValuesSchema.parse({
        beteiligtenart: "natuerlichePerson",
        rollen: [
          {
            rollennummer: `0:${klagendeParteiRollenbezeichnungId}`,
            rollenbezeichnungId: klagendeParteiRollenbezeichnungId,
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
            rollennummer: `1:${prozessbevollmaechtigteRollenbezeichnungId}`,
            rollenbezeichnungId: prozessbevollmaechtigteRollenbezeichnungId,
            referenz: [`0:${klagendeParteiRollenbezeichnungId}`],
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
            rollennummer: `2:${beklagteParteiRollenbezeichnungId}`,
            rollenbezeichnungId: beklagteParteiRollenbezeichnungId,
          },
        ],
      }),
    },
  ];
}

function dummyBeteiligungFieldsetItems(
  klagendeParteiRollenbezeichnungId: string,
  beklagteParteiRollenbezeichnungId: string,
  prozessbevollmaechtigteRollenbezeichnungId: string,
  kanzleiformen: Kanzleiform[],
): BeteiligungFieldsetItem[] {
  const items = defaultBeteiligungFieldsetItems(
    klagendeParteiRollenbezeichnungId,
    beklagteParteiRollenbezeichnungId,
    prozessbevollmaechtigteRollenbezeichnungId,
  );
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
    kanzleiformId: resolveCodeWertId(
      kanzleiformen,
      KANZLEIFORM_CODE_EINZELANWALT,
    ),
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
  klagendeParteiRollenbezeichnungId: string;
  beklagteParteiRollenbezeichnungId: string;
  prozessbevollmaechtigteRollenbezeichnungId: string;
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
};

export default function VerfahrenCreationBeteiligungenEditForm({
  existingBeteiligungen,
  klagendeParteiRollenbezeichnungId,
  beklagteParteiRollenbezeichnungId,
  prozessbevollmaechtigteRollenbezeichnungId,
  kanzleiformen,
  rechtsformen,
}: VerfahrenBeteiligungenEditFormProps) {
  const [items, setItems] = useState(() => {
    if (existingBeteiligungen.length > 0) {
      return existingBeteiligungen.map((beteiligung, index) => ({
        key: index,
        defaultValues: existingBeteiligungToFieldValues(beteiligung),
      }));
    } else {
      return defaultBeteiligungFieldsetItems(
        klagendeParteiRollenbezeichnungId,
        beklagteParteiRollenbezeichnungId,
        prozessbevollmaechtigteRollenbezeichnungId,
      );
    }
  });

  const rollennummerToRollenbezeichnungId = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of items) {
      for (const rolle of item.defaultValues.rollen) {
        if (rolle.rollennummer) {
          map.set(rolle.rollennummer, rolle.rollenbezeichnungId);
        }
      }
    }
    return map;
  }, [items]);

  const { klagendenseite, beklagtenseite } = useMemo(
    () =>
      partitionBeteiligungItemsBySeite(
        items,
        {
          klagendePartei: klagendeParteiRollenbezeichnungId,
          beklagtePartei: beklagteParteiRollenbezeichnungId,
          prozessbevollmaechtigte: prozessbevollmaechtigteRollenbezeichnungId,
        },
        rollennummerToRollenbezeichnungId,
      ),
    [
      items,
      klagendeParteiRollenbezeichnungId,
      beklagteParteiRollenbezeichnungId,
      prozessbevollmaechtigteRollenbezeichnungId,
      rollennummerToRollenbezeichnungId,
    ],
  );

  const handleAddPartei = useCallback((rollenbezeichnungId: string) => {
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
                rollennummer: `${key}:${rollenbezeichnungId}`,
                rollenbezeichnungId,
              },
            ],
          }),
        },
      ] satisfies BeteiligungFieldsetItem[];
    });
  }, []);

  const handleAddProzessbevollmaechtigte = useCallback(
    (parteiRollenbezeichnungId: string) => {
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
                  rollennummer: `${key}:${prozessbevollmaechtigteRollenbezeichnungId}`,
                  rollenbezeichnungId:
                    prozessbevollmaechtigteRollenbezeichnungId,
                  referenz: Array.from(
                    rollennummerToRollenbezeichnungId.entries(),
                  )
                    .filter(
                      ([_rollennummer, rollenbezeichnungId]) =>
                        rollenbezeichnungId === parteiRollenbezeichnungId,
                    )
                    .map(([rollennummer]) => rollennummer),
                },
              ],
            }),
          },
        ] satisfies BeteiligungFieldsetItem[];
      });
    },
    [
      prozessbevollmaechtigteRollenbezeichnungId,
      rollennummerToRollenbezeichnungId,
    ],
  );

  const handleFillInDummyData: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      flushSync(() => setItems([]));
      setItems(
        dummyBeteiligungFieldsetItems(
          klagendeParteiRollenbezeichnungId,
          beklagteParteiRollenbezeichnungId,
          prozessbevollmaechtigteRollenbezeichnungId,
          kanzleiformen,
        ),
      );
    }, [
      klagendeParteiRollenbezeichnungId,
      beklagteParteiRollenbezeichnungId,
      prozessbevollmaechtigteRollenbezeichnungId,
      kanzleiformen,
    ]);

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
        title="Klagendenseite"
        items={klagendenseite}
        parteiRollenbezeichnungId={klagendeParteiRollenbezeichnungId}
        prozessbevollmaechtigteRollenbezeichnungId={
          prozessbevollmaechtigteRollenbezeichnungId
        }
        kanzleiformen={kanzleiformen}
        rechtsformen={rechtsformen}
        onAddPartei={handleAddPartei}
        onAddProzessbevollmaechtigte={handleAddProzessbevollmaechtigte}
      />

      {/* Beklagtenseite */}
      <VerfahrenCreationBeteiligungSeiteFieldset
        title="Beklagtennseite"
        items={beklagtenseite}
        parteiRollenbezeichnungId={beklagteParteiRollenbezeichnungId}
        prozessbevollmaechtigteRollenbezeichnungId={
          prozessbevollmaechtigteRollenbezeichnungId
        }
        kanzleiformen={kanzleiformen}
        rechtsformen={rechtsformen}
        onAddPartei={handleAddPartei}
        onAddProzessbevollmaechtigte={handleAddProzessbevollmaechtigte}
      />
    </div>
  );
}
