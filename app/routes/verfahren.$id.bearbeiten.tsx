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
import Alert from "~/components/Alert";
import VerfahrenTileSkeleton from "~/components/verfahren/VerfahrenTileSkeleton.static";
import fetchVerfahrenById from "~/domains/verfahren/fetchVerfahrenById.server";
import { authContext, authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

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

  const dataPromise = fetchVerfahrenById(authData, { id });

  return {
    data: dataPromise,
  };
};

export const action = async ({ context, params }: ActionFunctionArgs) => {
  const authData = context.get(authContext);

  if (!authData) {
    return {
      success: false,
      error: "Keine Authentifizierungsdaten verfügbar.",
    };
  }

  const { id } = params;

  return redirect(`/verfahren/${id}`);
};

export default function VerfahrendetailsBearbeiten() {
  const { data } = useLoaderData<{
    data: Promise<ReturnType<typeof fetchVerfahrenById>>;
  }>();

  const { alerts } = useTranslations();
  const [hasLawyer, setHasLawyer] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState<"idle" | "submitting">(
    "idle",
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting("submitting");

    // @TODO:
    // - remove this timeout, when the real API has been connected
    // - handle API response and possible errors accordingly
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
      className={`${isSubmitting === "submitting" ? "pointer-events-none opacity-50" : ""}`}
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

      <Suspense fallback={<VerfahrenTileSkeleton />}>
        <Await resolve={data}>
          {(resolvedData) => (
            <div className="kern-row space-y-kern-space-large">
              <div className="kern-col-xl-6 kern-col-lg-8 kern-col-12 kern-col-lg-offset-2 kern-col-xl-offset-3">
                <span className="kern-badge kern-badge--info mb-kern-space-default">
                  <span className="kern-label">
                    {resolvedData.status === "ERSTELLT"
                      ? "Verfahren wurde temporär erstellt"
                      : "Verfahren wurde bereits eingereicht"}
                  </span>
                </span>
                {resolvedData.status === "ERSTELLT" && (
                  <p className="kern-body">
                    Ergänzen Sie bitte folgende Verfahrensrelevante Angaben. Am
                    Ende der Seite kann die Klage überprüft und eingereicht
                    werden.
                  </p>
                )}
              </div>

              <div className="kern-col-xl-6 kern-col-lg-8 kern-col-12 kern-col-lg-offset-2 kern-col-xl-offset-3">
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
                        Klägerin. Hier können Sie auch angeben, ob eine
                        anwaltliche Vertretung vorhanden ist.
                      </p>

                      {/* input fields start */}
                      <div className="kern-form-input">
                        <label
                          className="kern-label"
                          htmlFor="klagende-partei-name"
                        >
                          Vorname
                        </label>
                        <input
                          className="kern-form-input__input"
                          id="klagende-partei-name"
                          name="klagendeParteiName"
                          type="text"
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
                          />
                        </div>
                      </div>

                      <div className="kern-gap-md flex w-full">
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="klagende-partei-plz"
                          >
                            Postleitzahl
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-plz"
                            name="klagendeParteiPlz"
                            type="text"
                          />
                        </div>
                        <div className="kern-form-input flex-1">
                          <label
                            className="kern-label"
                            htmlFor="klagende-partei-ort"
                          >
                            Ort
                          </label>
                          <input
                            className="kern-form-input__input"
                            id="klagende-partei-ort"
                            name="klagendeParteiOrt"
                            type="text"
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

                      <div
                        className={`${hasLawyer ? "my-kern-space-default" : "mt-kern-space-default"} kern-form-check`}
                      >
                        <input
                          className="kern-form-check__checkbox"
                          id="has-lawyer"
                          name="hasLawyer"
                          type="checkbox"
                          checked={hasLawyer}
                          onChange={(event) =>
                            setHasLawyer(event.target.checked)
                          }
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
                            />
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-2">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-strasse"
                              >
                                Straße
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-strasse"
                                name="lawyerStrasse"
                                type="text"
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
                              />
                            </div>
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-plz"
                              >
                                Postleitzahl
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-plz"
                                name="lawyerPlz"
                                type="text"
                              />
                            </div>
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-ort"
                              >
                                Ort
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-ort"
                                name="lawyerOrt"
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="kern-gap-md flex w-full">
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-email"
                              >
                                E-Mail (optional)
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-email"
                                name="lawyerEmail"
                                type="email"
                              />
                            </div>
                            <div className="kern-form-input flex-1">
                              <label
                                className="kern-label"
                                htmlFor="lawyer-telefon"
                              >
                                Telefon (optional)
                              </label>
                              <input
                                className="kern-form-input__input"
                                id="lawyer-telefon"
                                name="lawyerTelefon"
                                type="tel"
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

              <div className="kern-col-xl-6 kern-col-lg-8 kern-col-12 kern-col-lg-offset-2 kern-col-xl-offset-3">
                <div className="kern-card kern-card--small kern-gap-xl">
                  <div className="kern-card__container mb-kern-space-default">
                    <header className="kern-card__header">
                      <hgroup>
                        <h2 className="kern-title">Beklagte Partei</h2>
                      </hgroup>
                    </header>
                    <section className="kern-card__body">
                      <p className="kern-body">
                        Alle Angaben zur beklagten Partei, dem Beklagten oder
                        der Beklagten.
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
                          <label
                            className="kern-label"
                            htmlFor="beklagte-partei-plz"
                          >
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
                          <label
                            className="kern-label"
                            htmlFor="beklagte-partei-ort"
                          >
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

              {/* could be extracted into a separate component part later */}
              <div className="kern-col-xl-6 kern-col-lg-8 kern-col-12 kern-col-lg-offset-2 kern-col-xl-offset-3">
                <div className="kern-card kern-card--small kern-gap-xl">
                  <div className="kern-card__container mb-kern-space-default">
                    <header className="kern-card__header">
                      <hgroup>
                        <h2 className="kern-title">Verfahrensdetails</h2>
                      </hgroup>
                    </header>
                    <section className="kern-card__body">
                      <p className="kern-body">
                        Relevante Angaben zum Verfahren.
                      </p>

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
                        />
                      </div>

                      <div className="kern-form-input">
                        <label className="kern-label" htmlFor="claim-court">
                          Gericht
                        </label>
                        <div className="kern-form-input__select-wrapper">
                          <select
                            className="kern-form-input__select"
                            id="claim-court"
                          >
                            <option>Bitte auswählen</option>
                            <option>Amtsgericht Charlottenburg</option>
                            <option>Amtsgericht Düsseldorf</option>
                            <option>Amtsgericht Köln</option>
                          </select>
                        </div>
                      </div>

                      <div className="kern-form-input">
                        <label
                          className="kern-label"
                          htmlFor="claim-additional"
                        >
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
              <div className="kern-col-xl-6 kern-col-lg-8 kern-col-12 kern-col-lg-offset-2 kern-col-xl-offset-3">
                <div className="gap-kern-space-default kern-justify-content-end flex flex-wrap">
                  <Link
                    to={`/verfahren/neu`}
                    className="kern-btn kern-btn--secondary"
                  >
                    <span className="kern-label">Zurück</span>
                  </Link>
                  {resolvedData.status === "EINGEREICHT" ? (
                    <Link
                      to={`/verfahren/${resolvedData.id}`}
                      className="kern-btn kern-btn--primary"
                    >
                      <span className="kern-label">Zum Verfahren</span>
                    </Link>
                  ) : (
                    <button
                      type="submit"
                      className="kern-btn kern-btn--primary"
                    >
                      <span className="kern-label">Klage überprüfen</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </Form>
  );
}
