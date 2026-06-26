import { Suspense, useRef, useState } from "react";
import {
  ActionFunctionArgs,
  Await,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import InputSelect from "~/components/InputSelect";
import deleteDokument from "~/domains/verfahren/deleteDokument.server";
import fetchDokumenteById from "~/domains/verfahren/fetchDokumenteById.server";
import fetchEinreichungenById from "~/domains/verfahren/fetchEinreichungenById.server";
import fetchEinreichungStatus from "~/domains/verfahren/fetchEinreichungStatus.server";
import fetchGerichte from "~/domains/verfahren/fetchGerichte.service";
import fetchVerfahrenById from "~/domains/verfahren/fetchVerfahrenById.server";
import { DokumentSchema } from "~/domains/verfahren/schemas/dokumentSchema";
import { EinreichungSchema } from "~/domains/verfahren/schemas/einreichungSchema";
import { StatusSchema } from "~/domains/verfahren/schemas/statusSchema";
import {
  CodeWertSchema,
  VerfahrenSchema,
} from "~/domains/verfahren/schemas/verfahrenSchema";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

type Verfahren = z.infer<typeof VerfahrenSchema>;
type Einreichung = z.infer<typeof EinreichungSchema>;
type EinreichungStatus = z.infer<typeof StatusSchema>;
type Dokument = z.infer<typeof DokumentSchema>;
type Gericht = z.infer<typeof CodeWertSchema>;
type EinreichungWithStatus = Einreichung & {
  einreichungsStatus: EinreichungStatus;
};
type LoaderData = {
  verfahren: Verfahren;
  einreichungen: EinreichungWithStatus[];
  dokumente: Dokument[][];
  gerichte: Gericht[];
};

// this route requires users to be logged in
export const middleware = [authMiddleware];

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error("No auth data available in loader");
  }

  const { id } = params;

  if (!id) {
    throw new Error("No Verfahren ID provided in params");
  }

  const verfahrenPromise = (await fetchVerfahrenById(authData, {
    id,
  })) as Verfahren;
  const gerichtePromise = (await fetchGerichte(authData)) as Gericht[];
  const einreichungenPromise = (await fetchEinreichungenById(authData, {
    id,
  })) as Einreichung[];

  const filteredEinreichungen = einreichungenPromise.filter((e) => {
    return e.verfahren_id === id;
  });

  const einreichungenWithStatus: EinreichungWithStatus[] = await Promise.all(
    filteredEinreichungen.map(async (einreichung) => ({
      ...einreichung,
      einreichungsStatus: (await fetchEinreichungStatus(authData, {
        id: einreichung.id,
        verfahrenId: einreichung.verfahren_id,
      })) as EinreichungStatus,
    })),
  );

  const dokumentePromise: Dokument[][] = await Promise.all(
    filteredEinreichungen.map(async (einreichung) => {
      const dokumente = (await fetchDokumenteById(authData, {
        id: einreichung.id,
        verfahrenId: einreichung.verfahren_id,
      })) as Dokument[];

      if (!dokumente) {
        return [];
      }

      return dokumente;
    }),
  );

  return {
    verfahren: verfahrenPromise,
    einreichungen: einreichungenWithStatus,
    dokumente: dokumentePromise,
    gerichte: gerichtePromise,
  };
};

export const action = async ({
  request,
  context,
  params,
}: ActionFunctionArgs) => {
  const { id } = params;
  const authData = context.get(authContext);

  if (!authData) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Keine Authentifizierungsdaten verfügbar.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const formData = await request.formData();
  const deleteDokumentAction = formData.get("deleteDokument");

  // handle document deletion
  if (deleteDokumentAction === "true") {
    const dokumentId = formData.get("dokumentId");
    const verfahrenId = id;
    const einreichungId = formData.get("einreichungId");

    if (
      typeof dokumentId !== "string" ||
      typeof verfahrenId !== "string" ||
      typeof einreichungId !== "string"
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Fehlende Dokument-Parameter.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await deleteDokument(authData, dokumentId, verfahrenId, einreichungId);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return redirect(`/verfahren/${id}`);
};

export default function VerfahrendetailsBearbeiten() {
  const { verfahren, einreichungen, dokumente, gerichte } =
    useLoaderData<LoaderData>();
  const { alerts } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState<"idle" | "submitting">(
    "idle",
  );
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(
    null,
  );
  const [deleteDocumentError, setDeleteDocumentError] = useState<string | null>(
    null,
  );
  const [additionalFiles, setAdditionalFiles] = useState<number[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  // getting/setting the verfahren related data could be
  // moved into a getter/setter functionality in the future
  const klagendePartei = verfahren.beteiligungen?.find((b) =>
    b.rollen?.some((r) => r.wert?.toLowerCase().includes("kläger")),
  );
  const beklagtePartei = verfahren.beteiligungen?.find((b) =>
    b.rollen?.some((r) => r.wert?.toLowerCase().includes("beklag")),
  );
  const klagendeParteiNameParts = klagendePartei?.name?.split(" ") ?? [];
  const beklagteParteiNameParts = beklagtePartei?.name?.split(" ") ?? [];
  const klagendeParteiFirstName =
    klagendeParteiNameParts.length > 1
      ? klagendeParteiNameParts.slice(0, -1).join(" ")
      : (klagendePartei?.name ?? "");
  const klagendeParteiLastName =
    klagendeParteiNameParts.length > 1
      ? klagendeParteiNameParts.slice(-1).join(" ")
      : "";
  const beklagteParteiFirstName =
    beklagteParteiNameParts.length > 1
      ? beklagteParteiNameParts.slice(0, -1).join(" ")
      : (beklagtePartei?.name ?? "");
  const beklagteParteiLastName =
    beklagteParteiNameParts.length > 1
      ? beklagteParteiNameParts.slice(-1).join(" ")
      : "";
  const klagendeParteiLawyer = klagendePartei?.prozessbevollmaechtigte?.[0];
  const courtCode = verfahren.gericht?.code ?? "";
  const claimReference = verfahren.aktenzeichen_gericht ?? "";

  const [hasLawyer, setHasLawyer] = useState(Boolean(klagendeParteiLawyer));

  const gerichteOptions = gerichte.map((g) => {
    return {
      value: g.code || "",
      label: g.wert || "Wert fehlt",
    };
  });

  const [selectedGericht, setSelectedGericht] = useState(courtCode);

  const handleAddFileUpload = () => {
    setAdditionalFiles((prev) => [...prev, prev.length]);
  };

  const handleDeleteFileFromVerfahren = async (
    dokumentId: string,
    einreichungId: string,
  ) => {
    setDeleteDocumentError(null);
    setDeletingDocumentId(dokumentId);

    const formData = new FormData();
    formData.set("deleteDokument", "true");
    formData.set("dokumentId", dokumentId);
    formData.set("einreichungId", einreichungId);

    try {
      const response = await fetch(globalThis.location.href, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn("delete file error: ", errorText);
        setDeleteDocumentError("Dokument konnte nicht gelöscht werden.");
        return;
      }
    } catch (error) {
      setDeleteDocumentError(
        error instanceof Error
          ? error.message
          : "Unbekannter Fehler beim Löschen des Dokuments.",
      );
    } finally {
      setDeletingDocumentId(null);
    }
  };

  const handleRemoveFileUpload = (index: number) => {
    setAdditionalFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadFileUpload = () => {
    alert(
      "POST /api/v1/verfahren/{verfahren-id}/einreichungen/{einreichung-id}/dokumente ist an dieser Stelle noch nicht verfügbar. Wir arbeiten daran.",
    );
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(
      "PATCH /api/v1/verfahren/{id} noch nicht verfügbar. Wir arbeiten daran.\n\nℹ️ Sie werden zur Detailseite dieses Verfahrens weitergeleitet.",
    );

    setIsSubmitting("submitting");

    // Temporary delay before submitting the form while the prototype is active.
    setTimeout(() => {
      // After 3 seconds, submit the form
      formRef.current?.submit();
    }, 3000);
  };

  return (
    <Form
      ref={formRef}
      method="post"
      encType="multipart/form-data"
      className={`${isSubmitting === "submitting" ? "pointer-events-none opacity-50" : ""} relative`}
      onSubmit={handleSubmit}
    >
      <h1 className="kern-heading-medium">Verfahrensbeteiligte & Details</h1>
      <div className="kern-row">
        <div className="kern-col-12 kern-col-md-8 kern-col-md-offset-2 kern-col-lg-6 kern-col-lg-offset-3">
          <Alert
            type="info"
            title={alerts.WORK_IN_PROGRESS_TITLE}
            message={alerts.WORK_IN_PROGRESS_MESSAGE}
          />
        </div>
      </div>

      <div className="kern-row space-y-kern-space-large">
        {/* intro */}
        <div className="kern-col-lg-8 kern-col-12 kern-col-lg-offset-2">
          <span className="kern-badge kern-badge--info my-kern-space-default">
            <span className="kern-label">
              {verfahren.status === "ERSTELLT"
                ? "Verfahren wurde temporär erstellt"
                : "Verfahren wurde bereits eingereicht"}
            </span>
          </span>
          <Suspense fallback={<div>Einreichungsstatus wird geladen ...</div>}>
            <div className="kern-table-responsive">
              <table className="kern-table kern-table--striped mb-kern-space-x-large">
                <caption className="kern-title kern-title--small">
                  Status ihrer Einreichung
                </caption>
                <thead className="kern-table__head">
                  <tr className="kern-table__row">
                    <th scope="col" className="kern-table__header">
                      Detail
                    </th>
                    <th scope="col" className="kern-table__header">
                      Status der Einreichung
                    </th>
                    <th scope="col" className="kern-table__header">
                      Validierungsstatus
                    </th>
                  </tr>
                </thead>
                <tbody className="kern-table__body">
                  <Await resolve={einreichungen}>
                    {(resolvedData: EinreichungWithStatus[]) =>
                      resolvedData && (
                        <>
                          {resolvedData.map((einreichung) => {
                            // by default it is warning
                            let statusBadgeClassModifier = "warning";
                            let statusBadgeLabel = "Wird validiert";
                            if (einreichung.status === "ERSTELLT") {
                              statusBadgeClassModifier = "info";
                              statusBadgeLabel = "Erstellt";
                            }
                            if (einreichung.status === "EINGEREICHT") {
                              statusBadgeClassModifier = "success";
                              statusBadgeLabel = "Eingereicht";
                            }

                            // by default it is warning
                            let einreichungBadgeClassModifier = "warning";
                            let einreichungBadgeLabel = "Gelb";
                            if (
                              einreichung.einreichungsStatus.status === "GRUEN"
                            ) {
                              einreichungBadgeClassModifier = "success";
                              einreichungBadgeLabel = "Grün";
                            }
                            if (
                              einreichung.einreichungsStatus.status === "ROT"
                            ) {
                              einreichungBadgeClassModifier = "danger";
                              einreichungBadgeLabel = "Rot";
                            }
                            return (
                              <tr
                                key={einreichung.id}
                                className="kern-table__row"
                              >
                                <td className="kern-table__cell">
                                  {einreichung.name}
                                </td>
                                <td className="kern-table__cell">
                                  <span
                                    className={`kern-badge kern-badge--small kern-badge--${statusBadgeClassModifier}`}
                                  >
                                    <span
                                      className={`kern-icon kern-icon--${statusBadgeClassModifier}`}
                                      aria-hidden="true"
                                    ></span>
                                    <span className="kern-label">
                                      {statusBadgeLabel}
                                    </span>
                                  </span>
                                </td>
                                <td className="kern-table__cell">
                                  <span
                                    className={`kern-badge kern-badge--small kern-badge--${einreichungBadgeClassModifier}`}
                                  >
                                    <span
                                      className={`kern-icon kern-icon--${einreichungBadgeClassModifier}`}
                                      aria-hidden="true"
                                    ></span>
                                    <span className="kern-label">
                                      {einreichungBadgeLabel}
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )
                    }
                  </Await>
                </tbody>
              </table>
            </div>
          </Suspense>

          <h2 className="kern-title">
            Ergänzen und überprüfen Sie bitte folgende Verfahrensrelevante
            Angaben.
          </h2>
          <p className="kern-body kern-body--bold kern-body--small">
            Je mehr Daten Sie an das Gericht übermitteln, desto schneller kann
            das Verfahren durch mögliche Automation verlaufen.
          </p>
        </div>

        {/* plaintiff data */}
        <div className="kern-col-lg-8 kern-col-12 kern-col-lg-offset-2">
          <div className="kern-card kern-card--small kern-gap-xl">
            <div className="kern-card__container mb-kern-space-default">
              <header className="kern-card__header">
                <hgroup>
                  <h2 className="kern-title">Klagende Partei</h2>
                </hgroup>
              </header>
              <section className="kern-card__body">
                <p className="kern-body">
                  Alle Angaben zur klagenden Partei, dem Kläger oder der
                  Klägerin. Hier können Sie auch angeben, ob eine anwaltliche
                  Vertretung vorhanden ist.
                </p>

                {/* input fields start */}
                <div className="kern-form-input">
                  <label className="kern-label" htmlFor="klagende-partei-name">
                    Vorname
                  </label>
                  <input
                    className="kern-form-input__input"
                    id="klagende-partei-name"
                    name="klagendeParteiName"
                    type="text"
                    defaultValue={klagendeParteiFirstName}
                  />
                </div>
                <div className="kern-form-input">
                  <label
                    className="kern-label"
                    htmlFor="klagende-partei-nachname"
                  >
                    Nachname
                  </label>
                  <input
                    className="kern-form-input__input"
                    id="klagende-partei-nachname"
                    name="klagendeParteiNachname"
                    type="text"
                    defaultValue={klagendeParteiLastName}
                  />
                </div>

                <div className="kern-gap-md flex w-full">
                  <div className="kern-form-input flex-2">
                    <label
                      className="kern-label"
                      htmlFor="klagende-partei-strasse"
                    >
                      Straße
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="klagende-partei-strasse"
                      name="klagendeParteiStrasse"
                      type="text"
                      defaultValue={"Bockenheimer Landstraße"}
                    />
                  </div>
                  <div className="kern-form-input flex-1">
                    <label
                      className="kern-label"
                      htmlFor="klagende-partei-hausnummer"
                    >
                      Hausnummer
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="klagende-partei-hausnummer"
                      name="klagendeParteiHausnummer"
                      type="text"
                      defaultValue={"42-44"}
                    />
                  </div>
                </div>

                <div className="kern-gap-md flex w-full">
                  <div className="kern-form-input flex-1">
                    <label className="kern-label" htmlFor="klagende-partei-plz">
                      Postleitzahl
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="klagende-partei-plz"
                      name="klagendeParteiPlz"
                      type="text"
                      defaultValue={"60323"}
                    />
                  </div>
                  <div className="kern-form-input flex-1">
                    <label className="kern-label" htmlFor="klagende-partei-ort">
                      Ort
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="klagende-partei-ort"
                      name="klagendeParteiOrt"
                      type="text"
                      defaultValue={"Frankfurt am Main"}
                    />
                  </div>
                </div>

                <div className="kern-gap-md flex w-full">
                  <div className="kern-form-input flex-1">
                    <label
                      className="kern-label"
                      htmlFor="klagende-partei-email"
                    >
                      E-Mail (optional)
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="klagende-partei-email"
                      name="klagendeParteiEmail"
                      type="email"
                      defaultValue={"emiliakuehn@posteo.de"}
                    />
                  </div>
                  <div className="kern-form-input flex-1">
                    <label
                      className="kern-label"
                      htmlFor="klagende-partei-telefon"
                    >
                      Telefon (optional)
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="klagende-partei-telefon"
                      name="klagendeParteiTelefon"
                      type="tel"
                    />
                  </div>
                </div>

                <hr
                  className="kern-divider border-kern-layout-border mt-kern-space-x-large w-full"
                  aria-hidden="true"
                />

                <div
                  className={`${hasLawyer ? "my-kern-space-default" : "mt-kern-space-default"} kern-form-check`}
                >
                  <input
                    className="kern-form-check__checkbox"
                    id="has-lawyer"
                    name="hasLawyer"
                    type="checkbox"
                    checked={hasLawyer}
                    onChange={(event) => setHasLawyer(event.target.checked)}
                  />
                  <label className="kern-label" htmlFor="has-lawyer">
                    Anwaltliche Vertretung ist vorhanden
                  </label>
                </div>

                {hasLawyer && (
                  <>
                    <h3 className="kern-title kern-title--small">
                      Angaben zum Anwalt
                    </h3>
                    <div className="kern-form-input">
                      <label className="kern-label" htmlFor="lawyer-name">
                        Name der Kanzlei / Sozietät /
                        Berufsausübungsgesellschaft
                      </label>
                      <input
                        className="kern-form-input__input"
                        id="lawyer-name"
                        name="lawyerName"
                        type="text"
                        defaultValue={klagendeParteiLawyer?.name ?? ""}
                      />
                    </div>

                    <div className="kern-gap-md flex w-full">
                      <div className="kern-form-input flex-2">
                        <label className="kern-label" htmlFor="lawyer-strasse">
                          Straße
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="lawyer-strasse"
                          name="lawyerStrasse"
                          type="text"
                          defaultValue={"Römerberg"}
                        />
                      </div>
                      <div className="kern-form-input flex-1">
                        <label
                          className="kern-label"
                          htmlFor="lawyer-hausnummer"
                        >
                          Hausnummer
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="lawyer-hausnummer"
                          name="lawyerHausnummer"
                          type="text"
                          defaultValue={"2"}
                        />
                      </div>
                    </div>

                    <div className="kern-gap-md flex w-full">
                      <div className="kern-form-input flex-1">
                        <label className="kern-label" htmlFor="lawyer-plz">
                          Postleitzahl
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="lawyer-plz"
                          name="lawyerPlz"
                          type="text"
                          defaultValue={"60311"}
                        />
                      </div>
                      <div className="kern-form-input flex-1">
                        <label className="kern-label" htmlFor="lawyer-ort">
                          Ort
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="lawyer-ort"
                          name="lawyerOrt"
                          type="text"
                          defaultValue={"Frankfurt am Main"}
                        />
                      </div>
                    </div>

                    <div className="kern-gap-md flex w-full">
                      <div className="kern-form-input flex-1">
                        <label className="kern-label" htmlFor="lawyer-email">
                          E-Mail (optional)
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="lawyer-email"
                          name="lawyerEmail"
                          type="email"
                          defaultValue={"kanzlei@ra-boehm.de"}
                        />
                      </div>
                      <div className="kern-form-input flex-1">
                        <label className="kern-label" htmlFor="lawyer-telefon">
                          Telefon (optional)
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="lawyer-telefon"
                          name="lawyerTelefon"
                          type="tel"
                          defaultValue={"06921994731"}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* input fields end */}
              </section>
            </div>
          </div>
        </div>

        {/* defendant data */}
        <div className="kern-col-lg-8 kern-col-12 kern-col-lg-offset-2">
          <div className="kern-card kern-card--small kern-gap-xl">
            <div className="kern-card__container mb-kern-space-default">
              <header className="kern-card__header">
                <hgroup>
                  <h2 className="kern-title">Beklagte Partei</h2>
                </hgroup>
              </header>
              <section className="kern-card__body">
                <p className="kern-body">
                  Alle Angaben zur beklagten Partei, dem Beklagten oder der
                  Beklagten.
                </p>

                {/* input fields start */}
                <div className="kern-form-input">
                  <label
                    className="kern-label"
                    htmlFor="beklagte-partei-vorname"
                  >
                    Vorname
                  </label>
                  <input
                    className="kern-form-input__input"
                    id="beklagte-partei-vorname"
                    name="beklagteParteiVorname"
                    type="text"
                    defaultValue={beklagteParteiFirstName}
                  />
                </div>
                <div className="kern-form-input">
                  <label
                    className="kern-label"
                    htmlFor="beklagte-partei-nachname"
                  >
                    Nachname
                  </label>
                  <input
                    className="kern-form-input__input"
                    id="beklagte-partei-nachname"
                    name="beklagteParteiNachname"
                    type="text"
                    defaultValue={beklagteParteiLastName}
                  />
                </div>

                <div className="kern-gap-md flex w-full">
                  <div className="kern-form-input flex-2">
                    <label
                      className="kern-label"
                      htmlFor="beklagte-partei-strasse"
                    >
                      Straße
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="beklagte-partei-strasse"
                      name="beklagteParteiStrasse"
                      type="text"
                    />
                  </div>
                  <div className="kern-form-input flex-1">
                    <label
                      className="kern-label"
                      htmlFor="beklagte-partei-hausnummer"
                    >
                      Hausnummer
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="beklagte-partei-hausnummer"
                      name="beklagteParteiHausnummer"
                      type="text"
                    />
                  </div>
                </div>

                <div className="kern-gap-md flex w-full">
                  <div className="kern-form-input flex-1">
                    <label className="kern-label" htmlFor="beklagte-partei-plz">
                      Postleitzahl
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="beklagte-partei-plz"
                      name="beklagteParteiPlz"
                      type="text"
                    />
                  </div>
                  <div className="kern-form-input flex-1">
                    <label className="kern-label" htmlFor="beklagte-partei-ort">
                      Ort
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="beklagte-partei-ort"
                      name="beklagteParteiOrt"
                      type="text"
                    />
                  </div>
                </div>

                <div className="kern-gap-md flex w-full">
                  <div className="kern-form-input flex-1">
                    <label
                      className="kern-label"
                      htmlFor="beklagte-partei-email"
                    >
                      E-Mail (optional)
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="beklagte-partei-email"
                      name="beklagteParteiEmail"
                      type="email"
                    />
                  </div>
                  <div className="kern-form-input flex-1">
                    <label
                      className="kern-label"
                      htmlFor="beklagte-partei-telefon"
                    >
                      Telefon (optional)
                    </label>
                    <input
                      className="kern-form-input__input"
                      id="beklagte-partei-telefon"
                      name="beklagteParteiTelefon"
                      type="tel"
                    />
                  </div>
                </div>
                {/* input fields end */}
              </section>
            </div>
          </div>
        </div>

        {/* Verfahren details */}
        <div className="kern-col-lg-8 kern-col-12 kern-col-lg-offset-2">
          <div className="kern-card kern-card--small kern-gap-xl">
            <div className="kern-card__container mb-kern-space-default">
              <header className="kern-card__header">
                <hgroup>
                  <h2 className="kern-title">Verfahrensdetails</h2>
                </hgroup>
              </header>
              <section className="kern-card__body">
                <p className="kern-body">Relevante Angaben zum Verfahren.</p>

                {/* input fields start */}
                <div className="kern-form-input">
                  <label className="kern-label" htmlFor="claim-rubrum">
                    Rubrum
                  </label>
                  <input
                    className="kern-form-input__input"
                    id="claim-rubrum"
                    name="claimRubrum"
                    type="text"
                  />
                </div>
                <div className="kern-form-input">
                  <label className="kern-label" htmlFor="claim-reference">
                    Aktenzeichen / Referenz
                  </label>
                  <input
                    className="kern-form-input__input"
                    id="claim-reference"
                    name="claimReference"
                    type="text"
                    defaultValue={claimReference}
                  />
                </div>

                <InputSelect
                  label="Gericht"
                  id="claim-court"
                  placeholder="Bitte auswählen"
                  options={gerichteOptions}
                  onChange={(e) => setSelectedGericht(e.target.value)}
                  selectedValue={selectedGericht}
                />

                <div className="kern-form-input">
                  <label className="kern-label" htmlFor="claim-additional">
                    Weitere Erläuterungen
                  </label>
                  <textarea
                    className="kern-form-input__input"
                    id="claim-additional"
                    name="claimAdditional"
                    rows={4}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Verfahren related docs */}
        <div className="kern-col-lg-8 kern-col-12 kern-col-lg-offset-2">
          <div className="kern-gap-xl">
            <div className="mb-kern-space-default">
              <header className="">
                <hgroup>
                  <h2 className="kern-title">Anlagen & Beweismittel</h2>
                </hgroup>
              </header>
              <section className="">
                <p className="kern-body">
                  Hier haben Sie die Möglichkeit weitere Dateien anzufügen.
                </p>

                <Suspense fallback={<div>Dokumente werden geladen ...</div>}>
                  <Await resolve={dokumente}>
                    {(resolvedData: Dokument[][]) =>
                      resolvedData && (
                        <div className="kern-table-responsive">
                          <table className="kern-table">
                            <caption className="kern-title kern-title--small">
                              Hochgeladene Dokumente
                            </caption>

                            <thead className="kern-table__head">
                              <tr className="kern-table__row">
                                <th scope="col" className="kern-table__header">
                                  Datei
                                </th>
                                <th scope="col" className="kern-table__header">
                                  Status
                                </th>
                                <th scope="col" className="kern-table__header">
                                  Dateigröße (KB)
                                </th>
                                <th scope="col" className="kern-table__header">
                                  Virenscanstatus
                                </th>
                                <th scope="col" className="kern-table__header">
                                  Aktion
                                </th>
                              </tr>
                            </thead>

                            <tbody className="kern-table__body">
                              {resolvedData.map((dokumente) => {
                                const dokument = dokumente[0];

                                if (!dokument) {
                                  return null;
                                }

                                // by default it is warning
                                let badgeClassModifier = "warning";
                                let badgeLabel = "In Bearbeitung";
                                if (dokument.viren_scan_status === "SAUBER") {
                                  badgeClassModifier = "success";
                                  badgeLabel = "Geprüft und virenfrei";
                                }
                                if (
                                  dokument.viren_scan_status === "INFIZIERT"
                                ) {
                                  badgeClassModifier = "danger";
                                  badgeLabel = "Infiziert";
                                }
                                if (
                                  dokument.viren_scan_status ===
                                  "FEHLGESCHLAGEN"
                                ) {
                                  badgeClassModifier = "danger";
                                  badgeLabel = "Fehlgeschlagen";
                                }

                                // by default it is info
                                let statusClassModifier = "warning";
                                let statusLabel = "Wird validiert";
                                if (dokument.status === "ERSTELLT") {
                                  statusClassModifier = "info";
                                  statusLabel = "Erstellt";
                                }
                                if (dokument.status === "EINGEREICHT") {
                                  statusClassModifier = "success";
                                  statusLabel = "Eingereicht";
                                }

                                return (
                                  <tr
                                    key={dokument.id}
                                    className="kern-table__row"
                                  >
                                    <td className="kern-table__cell">
                                      {dokument.name}
                                    </td>
                                    <td className="kern-table__cell">
                                      <span
                                        className={`kern-badge kern-badge--small kern-badge--${statusClassModifier}`}
                                      >
                                        <span
                                          className={`kern-icon kern-icon--${statusClassModifier}`}
                                          aria-hidden="true"
                                        ></span>
                                        <span className="kern-label">
                                          {statusLabel}
                                        </span>
                                      </span>
                                    </td>
                                    <td className="kern-table__cell">
                                      {Number.parseFloat(
                                        (
                                          dokument.size_in_bytes / 1000
                                        ).toString(),
                                      ).toFixed(2)}
                                    </td>
                                    <td className="kern-table__cell">
                                      <span
                                        className={`kern-badge kern-badge--small kern-badge--${badgeClassModifier}`}
                                      >
                                        <span
                                          className={`kern-icon kern-icon--${badgeClassModifier}`}
                                          aria-hidden="true"
                                        ></span>
                                        <span className="kern-label">
                                          {badgeLabel}
                                        </span>
                                      </span>
                                    </td>

                                    <td className="kern-table__cell kern-table__cell--action">
                                      {dokument.status !== "EINGEREICHT" && (
                                        <button
                                          className="kern-btn kern-btn--tertiary kern-btn--x-small"
                                          type="button"
                                          disabled={
                                            deletingDocumentId === dokument.id
                                          }
                                          onClick={() =>
                                            handleDeleteFileFromVerfahren(
                                              dokument.id,
                                              dokument.einreichung_id,
                                            )
                                          }
                                        >
                                          <span
                                            className="kern-icon kern-icon--delete"
                                            aria-hidden="true"
                                          ></span>
                                          <span className="kern-label">
                                            {deletingDocumentId === dokument.id
                                              ? "Lösche…"
                                              : "Entfernen"}
                                          </span>
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )
                    }
                  </Await>
                </Suspense>
                {deleteDocumentError ? (
                  <div className="whitespace-normal">
                    <Alert
                      type="error"
                      title="Löschen fehlgeschlagen"
                      message={deleteDocumentError}
                    />
                  </div>
                ) : null}

                {/* Additional file uploads */}
                <div className="border-kern-layout-border rounded-kern-default p-kern-space-default mb-kern-space-default mt-kern-space-x-large w-full border-4">
                  <p className="kern-body">
                    Hier haben Sie die Möglichkeit weitere Dateien anzufügen.
                  </p>
                  {additionalFiles.length > 0 && (
                    <div className="mt-kern-space-large w-full">
                      {additionalFiles.map((fileIndex) => (
                        <div
                          key={fileIndex}
                          className="gap-kern-space-default p-kern-space-small space-y-kern-space-large border-kern-layout-border rounded-kern-default flex flex-row border-2"
                        >
                          <div className="kern-form-input grow">
                            <label
                              className="kern-label"
                              htmlFor={`additional-file-${fileIndex}`}
                            >
                              Datei hier hochladen
                            </label>
                            <input
                              className="kern-form-input__input"
                              id={`additional-file-${fileIndex}`}
                              name={`additionalFile${fileIndex}`}
                              type="file"
                            />
                          </div>
                          <div className="gap-kern-space-default flex flex-col flex-wrap justify-center">
                            <div>
                              <button
                                type="button"
                                className="kern-btn kern-btn--secondary"
                                onClick={() =>
                                  handleRemoveFileUpload(fileIndex)
                                }
                              >
                                <span className="kern-label">Entfernen</span>
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="kern-btn kern-btn--primary"
                                onClick={() => handleUploadFileUpload()}
                              >
                                <span className="kern-label">Hochladen</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new file upload button */}
                  <div className="kern-justify-content-end mt-kern-space-default flex w-full flex-wrap">
                    <button
                      type="button"
                      onClick={handleAddFileUpload}
                      className="kern-btn kern-btn--secondary"
                    >
                      <span className="kern-label">
                        Weitere Datei hinzufügen
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="kern-col-lg-8 kern-col-12 kern-col-lg-offset-2">
          <div className="gap-kern-space-default kern-justify-content-end flex flex-wrap">
            <Link
              to={`/verfahren/neu`}
              className="kern-btn kern-btn--secondary"
            >
              <span className="kern-label">Zurück</span>
            </Link>
            {verfahren.status === "EINGEREICHT" ? (
              <Link
                to={`/verfahren/${verfahren.id}`}
                className="kern-btn kern-btn--primary"
              >
                <span className="kern-label">Zum Verfahren</span>
              </Link>
            ) : (
              <button type="submit" className="kern-btn kern-btn--primary">
                <span className="kern-label">Klage überprüfen</span>
              </button>
            )}
          </div>
        </div>

        {isSubmitting === "submitting" && (
          <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
            <div className="kern-loader kern-loader--visible">
              <span className="kern-sr-only">Wird geladen...</span>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
}
