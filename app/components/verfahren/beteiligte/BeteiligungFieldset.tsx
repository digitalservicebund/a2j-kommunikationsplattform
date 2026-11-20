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
} from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { Kanzleiform } from "~/domains/verfahren/entities/codelisten/kanzleiform.entity";
import { Rechtsform } from "~/domains/verfahren/entities/codelisten/rechtsform.entity";
import {
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME } from "~/domains/verfahren/services/buildPlaceholderBeteiligungInputs";
import { useTranslations } from "~/services/translations/context";

export const BeteiligungRolleFieldValuesSchema = z.object({
  rollennummer: z.nullish(z.string()),
  rollenbezeichnungCode: z.string(),
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
  kanzleiformCode: z
    .nullish(z.string().trim())
    .transform((code) => code || null),
  rechtsformCode: z
    .nullish(z.string().trim())
    .transform((code) => code || null),
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

export type ReferenceableParteiRolle = {
  rollennummer: string;
  rollenbezeichnungCode: string;
};

export type BeteiligungFieldsetProps = {
  title: string;
  beteiligungKey: number;
  defaultValues: BeteiligungFieldValues;
  kanzleiformen: Kanzleiform[];
  rechtsformen: Rechtsform[];
  errors?: Record<string, string[]>;
  /**
   * The Rollen of the Parteien on the same Seite as this Beteiligung. Used
   * to render the checkboxes for selecting the Parteien represented by a
   * Vertretung. Empty if the Beteiligung belongs to neither Seite.
   */
  referenceableParteiRollen: ReferenceableParteiRolle[];
};

export default function BeteiligungFieldset({
  beteiligungKey,
  title,
  defaultValues,
  kanzleiformen,
  rechtsformen,
  referenceableParteiRollen,
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
          value: kanzleiform.code,
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
          value: rechtsform.code,
          label: rechtsform.wert,
        })),
        ["label"],
      ),
    [rechtsformen],
  );

  const vertretungRolleIndex = defaultValues.rollen.findIndex(
    (rolle) =>
      rolle.rollenbezeichnungCode ===
      ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE,
  );
  const vertretungRolle =
    vertretungRolleIndex >= 0
      ? defaultValues.rollen[vertretungRolleIndex]
      : undefined;
  const [vertretungReferenzen, setVertretungReferenzen] = useState(
    vertretungRolle?.referenz ?? [],
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
    <FieldsetCard
      title={title}
      TitleComponent="h4"
      className="self-stretch"
      titleClassName="kern-label"
    >
      {/* Existing Beteiligung ID (if any) */}
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

      {/* Rollen */}
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
            name={rolleInputName(index, "rollenbezeichnungCode")}
            value={rolle.rollenbezeichnungCode}
          />
        </Fragment>
      ))}

      {/* Represented Parteien (if applicable) */}
      {!!vertretungRolle && referenceableParteiRollen.length > 0 && (
        <fieldset className="kern-fieldset">
          <legend className="kern-label">
            {t.routes.verfahrenNeu.beteiligte.form.vertretungReferenzen}
          </legend>
          <div className="kern-fieldset__body kern-fieldset__body--horizontal">
            {referenceableParteiRollen.map((option, index) => {
              const referenzArrayInputName =
                rolleInputName(vertretungRolleIndex, "referenz") + "[]";

              const parteiTranslations =
                option.rollenbezeichnungCode ===
                ROLLENBEZEICHNUNG_CODE_KLAEGERIN
                  ? t.routes.verfahrenNeu.beteiligte.form.klagendePartei
                  : t.routes.verfahrenNeu.beteiligte.form.beklagtePartei;

              return (
                <InputCheckbox
                  key={option.rollennummer}
                  id={`${referenzArrayInputName}-${option.rollennummer}`}
                  name={referenzArrayInputName}
                  label={parteiTranslations.title.replace(
                    "{{number}}",
                    String(index + 1),
                  )}
                  value={option.rollennummer}
                  checked={vertretungReferenzen.includes(option.rollennummer)}
                  onChange={handleVertretungReferenzChange}
                />
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Bezeichnung / Name */}
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
              defaultValue={
                defaultValues.nachname === PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME
                  ? ""
                  : (defaultValues.nachname ?? "")
              }
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
              defaultValue={
                defaultValues.bezeichnung ===
                PLACEHOLDER_BEZEICHNUNG_OR_NACHNAME
                  ? ""
                  : (defaultValues.bezeichnung ?? "")
              }
              errors={errors}
            />
          </>
        )}
      </div>

      {/* Kanzlei-Specific Fields */}
      {beteiligtenart === "raKanzlei" && (
        <div className="kern-gap-md flex w-full">
          <InputSelect
            className="flex-1"
            id={inputName("kanzleiformCode")}
            name={inputName("kanzleiformCode")}
            label={t.routes.verfahrenNeu.beteiligte.form.kanzleiform}
            options={kanzleiformOptions}
            placeholder={t.shared.form.select.placeholder}
            defaultValue={defaultValues.kanzleiformCode ?? undefined}
          />
          <InputSelect
            className="flex-1"
            id={inputName("rechtsformCode")}
            name={inputName("rechtsformCode")}
            label={t.routes.verfahrenNeu.beteiligte.form.rechtsform}
            options={rechtsformOptions}
            placeholder={t.shared.form.select.placeholder}
            defaultValue={defaultValues.rechtsformCode ?? undefined}
            optional={true}
          />
          <InputField
            className="flex-1"
            id={rolleInputName(vertretungRolleIndex, "geschaeftszeichen")}
            name={rolleInputName(vertretungRolleIndex, "geschaeftszeichen")}
            label={t.routes.verfahrenNeu.beteiligte.form.geschaeftszeichen}
            defaultValue={defaultValues.rechtsformCode ?? undefined}
            optional={true}
          />
        </div>
      )}

      {/* Address */}
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

      {/* Communication */}
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
