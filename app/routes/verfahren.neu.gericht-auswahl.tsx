import { useState } from "react";
import { Link } from "react-router";
import { PageMetadata } from "~/components/PageMetadata";
import VerfahrenSelect from "~/components/verfahren/VerfahrenSelect";
import { buildKlageeinreichungPath } from "~/config/klageeinreichungRoutes";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import {
  ZOV_EINGABESYSTEM_URL,
  ZOV_GERICHTE,
} from "~/domains/verfahren/entities/gericht/zovGerichte";
import { fetchGerichte } from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import buildGerichtAuswahlOptions from "~/domains/verfahren/services/buildGerichtAuswahlOptions";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";
import { Route } from "./+types/verfahren.neu.gericht-auswahl";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const authSession = requireAuthSession(context, "loader");
  const { elemente: komplaGerichte } = await fetchGerichte(authSession);

  return {
    gerichtOptions: buildGerichtAuswahlOptions(komplaGerichte, ZOV_GERICHTE),
  };
}

export default function VerfahrenNeuGerichtAuswahl({
  loaderData,
}: Route.ComponentProps) {
  const { routes, shared, buttons } = useTranslations();
  const { gerichtOptions } = loaderData;
  const [selectedValue, setSelectedValue] = useState("");

  const selectedGericht = gerichtOptions.find(
    ({ value }) => value === selectedValue,
  );
  const availableOptions = [
    selectedGericht?.komplaGerichtId &&
      routes.verfahrenGerichtAuswahl.klageEinreichenKompla,
    selectedGericht?.isZov &&
      routes.verfahrenGerichtAuswahl.klageErstellenEingabesystem,
  ].filter((option): option is string => Boolean(option));
  const optionsAnnouncement = selectedGericht
    ? routes.verfahrenGerichtAuswahl.optionsAnnouncement
        .replace("{{gericht}}", selectedGericht.label)
        .replace("{{optionen}}", availableOptions.join(", "))
    : "";

  return (
    <>
      <PageMetadata title={routes.verfahrenGerichtAuswahl.subline} />

      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
          <h1 className="kern-heading-large">
            {routes.verfahrenGerichtAuswahl.headline}
          </h1>
          <div className="kern-pt-xl">
            <div className="kern-p-lg kern-gap-lg flex flex-col rounded-(--kern-metric-border-radius-default) border border-layout-border">
              <h2 className="kern-heading-medium">
                {routes.verfahrenGerichtAuswahl.subline}
              </h2>

              <p className="kern-body">
                {routes.verfahrenGerichtAuswahl.intro}
              </p>

              <VerfahrenSelect
                id="gericht"
                label={shared.form.labels.empfaengergericht}
                placeholder={shared.form.select.placeholder}
                options={gerichtOptions}
                selectedValue={selectedValue}
                onChange={(event) => setSelectedValue(event.target.value)}
              />

              {/* Always rendered, so screen readers pick up content changes */}
              <p className="kern-sr-only" aria-live="polite">
                {optionsAnnouncement}
              </p>

              <div className="kern-gap-md flex flex-wrap">
                <Link to="/" className="kern-btn kern-btn--secondary">
                  <span className="kern-label">{buttons.prev}</span>
                </Link>

                {selectedGericht?.komplaGerichtId && (
                  <Link
                    to={buildKlageeinreichungPath("dokumente", {
                      gericht: selectedGericht.komplaGerichtId,
                    })}
                    className="kern-btn kern-btn--primary"
                  >
                    <span className="kern-label">
                      {routes.verfahrenGerichtAuswahl.klageEinreichenKompla}
                    </span>
                  </Link>
                )}

                {selectedGericht?.isZov && (
                  <a
                    href={ZOV_EINGABESYSTEM_URL}
                    className="kern-btn kern-btn--secondary"
                  >
                    <span className="kern-label">
                      {
                        routes.verfahrenGerichtAuswahl
                          .klageErstellenEingabesystem
                      }
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
