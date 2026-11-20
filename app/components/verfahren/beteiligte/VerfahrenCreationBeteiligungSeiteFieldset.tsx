import { useCallback, useMemo } from "react";
import Button from "~/components/Button";
import { Kanzleiform } from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import { useTranslations } from "~/services/translations/context";
import BeteiligungFieldset, {
  BeteiligungFieldValues,
} from "./BeteiligungFieldset";

export type BeteiligungFieldsetItem = {
  key: number;
  defaultValues: BeteiligungFieldValues;
};

export type VerfahrenCreationBeteiligungSeiteFieldsetProps = {
  title: string;
  items: BeteiligungFieldsetItem[];
  parteiRollenbezeichnungId: string;
  prozessbevollmaechtigteRollenbezeichnungId: string;
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
  onAddPartei: (rollenbezeichnungId: string) => void;
  onAddProzessbevollmaechtigte: (parteiRollenbezeichnungId: string) => void;
};

function getRolleByBezeichnungId(
  item: BeteiligungFieldsetItem,
  rollenbezeichnungId: string,
) {
  return item.defaultValues.rollen.find(
    (rolle) => rolle.rollenbezeichnungId === rollenbezeichnungId,
  );
}

function hasRolleWithBezeichnungId(
  item: BeteiligungFieldsetItem,
  rollenbezeichnungId: string,
) {
  return !!getRolleByBezeichnungId(item, rollenbezeichnungId);
}

export default function VerfahrenCreationBeteiligungSeiteFieldset({
  title,
  items,
  parteiRollenbezeichnungId,
  prozessbevollmaechtigteRollenbezeichnungId,
  kanzleiformen,
  rechtsformen,
  onAddPartei,
  onAddProzessbevollmaechtigte,
}: VerfahrenCreationBeteiligungSeiteFieldsetProps) {
  const t = useTranslations();

  const parteiRollennummern = useMemo(
    () =>
      items.flatMap((item) => {
        const parteiRolle = getRolleByBezeichnungId(
          item,
          parteiRollenbezeichnungId,
        );
        return parteiRolle?.rollennummer ? [parteiRolle.rollennummer] : [];
      }),
    [items, parteiRollenbezeichnungId],
  );

  const handleAddPartei = useCallback(
    () => onAddPartei(parteiRollenbezeichnungId),
    [onAddPartei, parteiRollenbezeichnungId],
  );

  const handleAddProzessbevollmaechtigte = useCallback(
    () => onAddProzessbevollmaechtigte(parteiRollenbezeichnungId),
    [onAddProzessbevollmaechtigte, parteiRollenbezeichnungId],
  );

  let parteiCounter = 1;
  let prozessbevollmaechtigteCounter = 1;

  return (
    <fieldset className="kern-fieldset">
      {/* Heading */}
      <legend className="kern-label">
        <h3 className="kern-label kern-label--large">{title}</h3>
      </legend>

      <div className="kern-fieldset__body">
        <div className="kern-gap-lg flex flex-col self-stretch">
          {/* Parteien & Vertretungen */}
          {items.map((item) => {
            const isProzessbevollmaechtigte = hasRolleWithBezeichnungId(
              item,
              prozessbevollmaechtigteRollenbezeichnungId,
            );
            return (
              <BeteiligungFieldset
                key={item.key}
                beteiligungKey={item.key}
                defaultValues={item.defaultValues}
                title={
                  isProzessbevollmaechtigte
                    ? // oxlint-disable-next-line react/immutability
                      `Prozessbevollmächtigter ${prozessbevollmaechtigteCounter++}`
                    : `Partei ${parteiCounter++}`
                }
                kanzleiformen={kanzleiformen}
                rechtsformen={rechtsformen}
                prozessbevollmaechtigteRollenbezeichnungId={
                  prozessbevollmaechtigteRollenbezeichnungId
                }
                vertretungReferenzOptions={
                  isProzessbevollmaechtigte ? parteiRollennummern : undefined
                }
              />
            );
          })}

          {/* Add Buttons */}
          <div className="kern-gap-md flex">
            <Button
              type="button"
              appearance="secondary"
              onClick={handleAddPartei}
            >
              <span
                className="kern-icon kern-icon--default kern-icon--add"
                aria-hidden="true"
              />
              <span className="kern-label">
                {t.routes.verfahrenNeu.beteiligte.form.addPartei}
              </span>
            </Button>

            <Button
              type="button"
              appearance="secondary"
              onClick={handleAddProzessbevollmaechtigte}
            >
              <span
                className="kern-icon kern-icon--default kern-icon--add"
                aria-hidden="true"
              />
              <span className="kern-label">
                {
                  t.routes.verfahrenNeu.beteiligte.form
                    .addProzessbevollmaechtigte
                }
              </span>
            </Button>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
