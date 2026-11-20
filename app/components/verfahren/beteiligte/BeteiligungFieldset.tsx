import { sortBy, without } from "es-toolkit";
import {
  ChangeEventHandler,
  Fragment,
  useCallback,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import FieldsetCard from "~/components/FieldsetCard";
import InputCheckbox from "~/components/InputCheckbox";
import InputField from "~/components/InputField";
import InputRadio from "~/components/InputRadio";
import InputSelect from "~/components/InputSelect";
import {
  Beteiligtenart,
  BeteiligtenartSchema,
  Beteiligung,
} from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import {
  ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT,
  ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT,
} from "~/domains/verfahren/entities/codelisten/anschriftstyp.entity";
import { Kanzleiform } from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import {
  getBeteiligteEmail,
  getBeteiligteTelefon,
} from "~/domains/verfahren/services/beteiligteContactInfo";
import { useTranslations } from "~/services/translations/context";

export const BeteiligungRolleFieldValuesSchema = z.object({
  rollennummer: z.nullish(z.string()),
  rollenbezeichnungId: z.string(),
  referenz: z.array(z.string()).default([]),
  geschaeftszeichen: z.nullish(z.string()),
});

export type BeteiligungRolleFieldValues = z.infer<
  typeof BeteiligungRolleFieldValuesSchema
>;

export const BeteiligungFieldValuesSchema = z.object({
  id: z.nullish(z.string()),
  beteiligtenart: BeteiligtenartSchema,
  rollen: z.array(BeteiligungRolleFieldValuesSchema).default([]),
  vorname: z.nullish(z.string().trim()),
  nachname: z.nullish(z.string().trim()),
  bezeichnung: z.nullish(z.string().trim()),
  kanzleiformId: z.nullish(z.string().trim()).transform((id) => id || null),
  rechtsformId: z.nullish(z.string().trim()).transform((id) => id || null),
  strasse: z.nullish(z.string().trim()),
  hausnummer: z.nullish(z.string().trim()),
  postleitzahl: z.nullish(z.string().trim()),
  ort: z.nullish(z.string().trim()),
  email: z.nullish(z.string().trim()),
  telefon: z.nullish(z.string().trim()),
});

export type BeteiligungFieldValues = z.infer<
  typeof BeteiligungFieldValuesSchema
>;

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

  return {
    id: beteiligung.id,
    beteiligtenart: beteiligung.beteiligtenart,
    rollen: beteiligung.rollen.map((rolle) => ({
      rollennummer: rolle.rollennummer,
      rollenbezeichnungId: rolle.rollenbezeichnung.id,
      referenz: rolle.referenz,
    })),
    vorname: natuerlichePerson?.vorname,
    nachname: natuerlichePerson?.nachname,
    bezeichnung: organisation?.bezeichnung ?? raKanzlei?.bezeichnung,
    rechtsformId: raKanzlei?.rechtsform?.id ?? null,
    kanzleiformId: raKanzlei?.kanzleiform.id ?? null,
    strasse: primaryAnschrift?.strasse ?? "",
    hausnummer: primaryAnschrift?.hausnummer,
    postleitzahl: primaryAnschrift?.postleitzahl,
    ort: primaryAnschrift?.ort,
    email: getBeteiligteEmail(beteiligung),
    telefon: getBeteiligteTelefon(beteiligung),
  };
}

export type BeteiligungFieldsetProps = {
  title: string;
  beteiligungKey: number;
  defaultValues: BeteiligungFieldValues;
  vertretungReferenzOptions?: string[];
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
  prozessbevollmaechtigteRollenbezeichnungId: string;
  errors?: Record<string, string[]>;
};

export default function BeteiligungFieldset({
  beteiligungKey,
  title,
  defaultValues,
  kanzleiformen,
  rechtsformen,
  vertretungReferenzOptions,
  prozessbevollmaechtigteRollenbezeichnungId,
  errors,
}: BeteiligungFieldsetProps) {
  const t = useTranslations();

  const [beteiligtenart, setBeteiligtenart] = useState(
    defaultValues.beteiligtenart ?? "natuerlichePerson",
  );

  const kanzleiformOptions = useMemo(
    () =>
      sortBy(
        kanzleiformen.map((kanzleiform) => ({
          value: kanzleiform.id,
          label: kanzleiform.wert,
        })),
        ["label"],
      ),
    [kanzleiformen],
  );
  const rechtsformOptions = useMemo(
    () =>
      sortBy(
        rechtsformen.map((rechtsform) => ({
          value: rechtsform.id,
          label: rechtsform.wert,
        })),
        ["label"],
      ),
    [rechtsformen],
  );

  const vertretungRolleIndex = defaultValues.rollen.findIndex(
    (rolle) =>
      rolle.rollenbezeichnungId === prozessbevollmaechtigteRollenbezeichnungId,
  );
  const vertretungRolle =
    vertretungRolleIndex >= 0
      ? defaultValues.rollen[vertretungRolleIndex]
      : undefined;
  const [vertretungReferenzen, setVertretungReferenzen] = useState(
    vertretungRolle?.referenz ?? [],
  );

  // Referenzen to Parteien without a checkbox (e.g., on the other Seite) are
  // submitted as hidden inputs so that they are not lost when saving.
  const hiddenVertretungReferenzen = without(
    vertretungReferenzen,
    ...(vertretungReferenzOptions ?? []),
  );

  const onBeteiligtenartChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      setBeteiligtenart(event.currentTarget.value as Beteiligtenart);
    }, []);

  const handleVertretungReferenzChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setVertretungReferenzen((referenzen) => {
        if (event.target.checked) {
          return [...referenzen, event.target.value];
        } else {
          return without(referenzen, event.target.value);
        }
      });
    }, []);

  // The input names follow the bracket-notation convention from the `qs`
  // library (https://github.com/ljharb/qs#parsing-objects), which is used by
  // the `/verfahren/neu/beteligte` action to parse the form data.

  const inputName = (field: keyof BeteiligungFieldValues) =>
    `beteiligungen[${beteiligungKey}][${field}]`;

  const rolleInputName = (
    index: number,
    field: keyof BeteiligungRolleFieldValues,
    options?: { array: boolean },
  ) =>
    `${inputName("rollen")}[${index}][${field}]${options?.array ? "[]" : ""}`;

  return (
    <FieldsetCard title={title} TitleComponent="h4" className="self-stretch">
      {defaultValues.id && (
        <input type="hidden" name={inputName("id")} value={defaultValues.id} />
      )}

      {/* Beteiligtenart */}
      {beteiligtenart === "raKanzlei" ? (
        <input
          type="hidden"
          name={inputName("beteiligtenart")}
          value={beteiligtenart}
        />
      ) : (
        <fieldset className="kern-fieldset">
          <legend className="kern-label">
            {t.routes.verfahrenNeu.beteiligte.form.beteiligtenart.label}
          </legend>
          <div className="kern-fieldset__body kern-fieldset__body--horizontal">
            <InputRadio
              id={`${inputName("beteiligtenart")}-natuerlichePerson`}
              name={inputName("beteiligtenart")}
              label={
                t.routes.verfahrenNeu.beteiligte.form.beteiligtenart.options
                  .natuerlichePerson
              }
              value="natuerlichePerson"
              checked={beteiligtenart === "natuerlichePerson"}
              onChange={onBeteiligtenartChange}
            />
            <InputRadio
              id={`${inputName("beteiligtenart")}-organisation`}
              name={inputName("beteiligtenart")}
              label={
                t.routes.verfahrenNeu.beteiligte.form.beteiligtenart.options
                  .organisation
              }
              value="organisation"
              checked={beteiligtenart === "organisation"}
              onChange={onBeteiligtenartChange}
            />
          </div>
        </fieldset>
      )}

      {!!vertretungRolle && !!vertretungReferenzOptions && (
        <fieldset className="kern-fieldset">
          <legend className="kern-label">
            {t.routes.verfahrenNeu.beteiligte.form.vertretungReferenzen}
          </legend>
          <div className="kern-fieldset__body kern-fieldset__body--horizontal">
            {vertretungReferenzOptions.map((rollennummer, index) => {
              const referenzArrayInputName =
                rolleInputName(vertretungRolleIndex, "referenz") + "[]";
              return (
                <InputCheckbox
                  key={rollennummer}
                  id={`${referenzArrayInputName}-${rollennummer}`}
                  name={referenzArrayInputName}
                  label={t.routes.verfahrenNeu.beteiligte.form.parteiWithNumber.replace(
                    "{{number}}",
                    String(index + 1),
                  )}
                  value={rollennummer}
                  checked={vertretungReferenzen.includes(rollennummer)}
                  onChange={handleVertretungReferenzChange}
                />
              );
            })}
          </div>
        </fieldset>
      )}

      {hiddenVertretungReferenzen.map((rollennummer) => (
        <input
          key={rollennummer}
          type="hidden"
          name={rolleInputName(vertretungRolleIndex, "referenz", {
            array: true,
          })}
          value={rollennummer}
        />
      ))}

      {defaultValues.rollen.map((rolle, index) => (
        <Fragment key={rolle.rollennummer ?? index}>
          {rolle.rollennummer && (
            <input
              type="hidden"
              name={rolleInputName(index, "rollennummer")}
              value={rolle.rollennummer}
            />
          )}
          <input
            type="hidden"
            name={rolleInputName(index, "rollenbezeichnungId")}
            value={rolle.rollenbezeichnungId}
          />
        </Fragment>
      ))}

      <div className="kern-gap-md flex w-full">
        {beteiligtenart === "natuerlichePerson" ? (
          <>
            <InputField
              key="vorname"
              className="flex-1"
              id={inputName("vorname")}
              name={inputName("vorname")}
              label={t.shared.form.labels.vorname}
              defaultValue={defaultValues.vorname ?? ""}
              errors={errors}
            />
            <InputField
              className="flex-1"
              id={inputName("nachname")}
              name={inputName("nachname")}
              label={t.shared.form.labels.nachname}
              defaultValue={defaultValues.nachname ?? ""}
              errors={errors}
            />
          </>
        ) : (
          <>
            <InputField
              key="bezeichnung"
              className="flex-1"
              id={inputName("bezeichnung")}
              name={inputName("bezeichnung")}
              label={t.shared.form.labels.bezeichnung}
              defaultValue={defaultValues.bezeichnung ?? ""}
              errors={errors}
            />
          </>
        )}
      </div>

      {beteiligtenart === "raKanzlei" && (
        <div className="kern-gap-md flex w-full">
          <InputSelect
            className="flex-1"
            id={inputName("kanzleiformId")}
            name={inputName("kanzleiformId")}
            label={
              t.routes.verfahrenNeu.beteiligte.form.klagendePartei.vertretung
                .kanzleiform
            }
            options={kanzleiformOptions}
            placeholder={t.shared.form.select.placeholder}
            defaultValue={defaultValues.kanzleiformId ?? undefined}
          />
          <InputSelect
            className="flex-1"
            id={inputName("rechtsformId")}
            name={inputName("rechtsformId")}
            label={
              t.routes.verfahrenNeu.beteiligte.form.klagendePartei.vertretung
                .rechtsform
            }
            options={rechtsformOptions}
            placeholder={t.shared.form.select.placeholder}
            defaultValue={defaultValues.rechtsformId ?? undefined}
            optional={true}
          />
        </div>
      )}

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-2"
          label={t.shared.form.labels.strasse}
          id={inputName("strasse")}
          name={inputName("strasse")}
          defaultValue={defaultValues.strasse ?? ""}
          errors={errors}
        />
        <InputField
          className="flex-1"
          label={t.shared.form.labels.hausnummer}
          id={inputName("hausnummer")}
          name={inputName("hausnummer")}
          defaultValue={defaultValues.hausnummer ?? ""}
          errors={errors}
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1"
          label={t.shared.form.labels.postleitzahl}
          id={inputName("postleitzahl")}
          name={inputName("postleitzahl")}
          inputMode="numeric"
          defaultValue={defaultValues.postleitzahl ?? ""}
          errors={errors}
        />
        <InputField
          className="flex-2"
          label={t.shared.form.labels.ort}
          id={inputName("ort")}
          name={inputName("ort")}
          defaultValue={defaultValues.ort ?? ""}
          errors={errors}
        />
      </div>

      <div className="kern-gap-md flex w-full">
        <InputField
          className="flex-1"
          label={t.shared.form.labels.email}
          optional
          id={inputName("email")}
          name={inputName("email")}
          type="email"
          defaultValue={defaultValues.email ?? ""}
          errors={errors}
        />
        <InputField
          className="flex-1"
          label={t.shared.form.labels.telefon}
          optional
          id={inputName("telefon")}
          name={inputName("telefon")}
          type="tel"
          defaultValue={defaultValues.telefon ?? ""}
          errors={errors}
        />
      </div>
    </FieldsetCard>
  );
}
