import { useCallback, useMemo } from "react";
import Button from "~/components/Button";
import { Kanzleiform } from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import { ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE } from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
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
  parteiRollenbezeichnungCode: string;
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
  onAddPartei: (rollenbezeichnungCode: string) => void;
  onAddProzessbevollmaechtigte: (parteiRollenbezeichnungCode: string) => void;
};

function getRolleByBezeichnungCode(
  item: BeteiligungFieldsetItem,
  rollenbezeichnungCode: string,
) {
  return item.defaultValues.rollen.find(
    (rolle) => rolle.rollenbezeichnungCode === rollenbezeichnungCode,
  );
}

function hasRolleWithBezeichnungCode(
  item: BeteiligungFieldsetItem,
  rollenbezeichnungCode: string,
) {
  return !!getRolleByBezeichnungCode(item, rollenbezeichnungCode);
}

export default function VerfahrenCreationBeteiligungSeiteFieldset({
  title,
  items,
  parteiRollenbezeichnungCode,
  kanzleiformen,
  rechtsformen,
  onAddPartei,
  onAddProzessbevollmaechtigte,
}: VerfahrenCreationBeteiligungSeiteFieldsetProps) {
  const t = useTranslations();

  const parteiRollennummern = useMemo(
    () =>
      items.flatMap((item) => {
        const parteiRolle = getRolleByBezeichnungCode(
          item,
          parteiRollenbezeichnungCode,
        );
        return parteiRolle?.rollennummer ? [parteiRolle.rollennummer] : [];
      }),
    [items, parteiRollenbezeichnungCode],
  );

  const handleAddPartei = useCallback(
    () => onAddPartei(parteiRollenbezeichnungCode),
    [onAddPartei, parteiRollenbezeichnungCode],
  );

  const handleAddProzessbevollmaechtigte = useCallback(
    () => onAddProzessbevollmaechtigte(parteiRollenbezeichnungCode),
    [onAddProzessbevollmaechtigte, parteiRollenbezeichnungCode],
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
            const isProzessbevollmaechtigte = hasRolleWithBezeichnungCode(
              item,
              ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
            );
            return (
              <BeteiligungFieldset
                key={item.key}
                beteiligungKey={item.key}
                defaultValues={item.defaultValues}
                title={
                  isProzessbevollmaechtigte
                    ? t.routes.verfahrenNeu.beteiligte.form.prozessbevollmaechtigterWithNumber.replace(
                        "{{number}}",
                        // oxlint-disable-next-line react/immutability
                        String(prozessbevollmaechtigteCounter++),
                      )
                    : t.routes.verfahrenNeu.beteiligte.form.parteiWithNumber.replace(
                        "{{number}}",
                        String(parteiCounter++),
                      )
                }
                kanzleiformen={kanzleiformen}
                rechtsformen={rechtsformen}
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
