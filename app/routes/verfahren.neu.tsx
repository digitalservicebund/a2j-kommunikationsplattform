import { ReactNode, useState } from "react";
import { Link } from "react-router";
import InputSelect from "~/components/InputSelect.tsx";
import { PageMetadata } from "~/components/PageMetadata";
import VerfahrenSelect from "~/components/verfahren/VerfahrenSelect";
import { buildKlageeinreichungPath } from "~/config/klageeinreichungRoutes";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import {
  ZOV_EINGABESYSTEM_URL,
  ZOV_GERICHTE,
} from "~/domains/verfahren/entities/gericht/zovGerichte";
import { fetchGerichte } from "~/domains/verfahren/infrastructure/repositories/stammdatenRepository.server";
import buildGerichtAuswahlOptions, {
  GerichtAuswahlOption,
} from "~/domains/verfahren/services/buildGerichtAuswahlOptions";
import { authMiddleware } from "~/middleware/auth.server";
import { Translations } from "~/services/translations";
import { useTranslations } from "~/services/translations/context";
import { Route } from "./+types/verfahren.neu";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const authSession = requireAuthSession(context, "loader");
  const { elemente: komplaGerichte } = await fetchGerichte(authSession);

  return {
    safeId: authSession.safeId,
    authorizedForSafeIds: authSession.authorizedForSafeIds,
    gerichtOptions: buildGerichtAuswahlOptions(komplaGerichte, ZOV_GERICHTE),
  };
}

export default function VerfahrenNeu({ loaderData }: Route.ComponentProps) {
  const t = useTranslations();
  const { gerichtOptions, safeId, authorizedForSafeIds } = loaderData;

  const safeIdOptions = authorizedForSafeIds.map((id) => ({
    value: id,
    label: id,
  }));

  const [selectedSafeId, setSelectedSafeId] = useState(
    safeId && authorizedForSafeIds.includes(safeId)
      ? safeId
      : (authorizedForSafeIds[0] ?? ""),
  );
  const [selectedGerichtValue, setSelectedGerichtValue] = useState("");

  const selectedGericht = gerichtOptions.find(
    ({ value }) => value === selectedGerichtValue,
  );
  const availableOptions = [
    selectedGericht?.komplaGerichtId &&
      t.routes.verfahrenGerichtAuswahl.klageEinreichenKompla,
    selectedGericht?.isZov &&
      t.routes.verfahrenGerichtAuswahl.klageErstellenEingabesystem,
  ].filter((option): option is string => Boolean(option));
  const optionsAnnouncement = selectedGericht
    ? t.routes.verfahrenGerichtAuswahl.gerichtOptionsAnnouncement
        .replace("{{gericht}}", selectedGericht.label)
        .replace("{{optionen}}", availableOptions.join(", "))
    : "";

  return (
    <>
      <PageMetadata title={t.routes.verfahrenGerichtAuswahl.subline} />

      <div className="kern-row">
        <div className="kern-col-12 kern-col-xl-10 kern-col-xl-offset-1">
          <h1 className="kern-heading-large">
            {t.routes.verfahrenGerichtAuswahl.headline}
          </h1>
          <SelectCard
            header={t.routes.safeIdAuswahl.subline}
            body={t.routes.safeIdAuswahl.intro}
          >
            <InputSelect
              id="safeId"
              label={t.routes.verfahrenNeu.dokumente.safeId}
              options={safeIdOptions}
              selectedValue={selectedSafeId}
              onChange={(event) => setSelectedSafeId(event.target.value)}
            />
          </SelectCard>
          <SelectCard
            header={t.routes.verfahrenGerichtAuswahl.subline}
            body={t.routes.verfahrenGerichtAuswahl.intro}
          >
            <VerfahrenSelect
              id="gericht"
              label={t.shared.form.labels.empfaengergericht}
              placeholder={t.shared.form.select.placeholder}
              options={gerichtOptions}
              selectedValue={selectedGerichtValue}
              onChange={(event) => setSelectedGerichtValue(event.target.value)}
            />

            {/* Always rendered, so screen readers pick up content changes */}
            <p className="kern-sr-only" aria-live="polite">
              {optionsAnnouncement}
            </p>
            <GerichtSelectLinks
              t={t}
              selectedGericht={selectedGericht}
              selectedSafeId={selectedSafeId}
            />
          </SelectCard>
        </div>
      </div>
    </>
  );
}

function SelectCard({
  header,
  body,
  children,
}: Readonly<{ header: string; body: string; children: ReactNode }>) {
  return (
    <div className="kern-pt-xl">
      <div className="kern-p-lg kern-gap-lg flex flex-col rounded-(--kern-metric-border-radius-default) border border-layout-border">
        <h2 className="kern-heading-medium">{header}</h2>

        <p className="kern-body">{body}</p>
        {children}
      </div>
    </div>
  );
}

function GerichtSelectLinks({
  t,
  selectedGericht,
  selectedSafeId,
}: Readonly<{
  t: Translations;
  selectedGericht: GerichtAuswahlOption | undefined;
  selectedSafeId: string;
}>) {
  return (
    <div className="kern-gap-md flex flex-wrap">
      <Link to="/" className="kern-btn kern-btn--secondary">
        <span className="kern-label">{t.buttons.prev}</span>
      </Link>

      {selectedGericht?.komplaGerichtId && (
        <Link
          to={buildKlageeinreichungPath("dokumente", {
            gericht: selectedGericht.komplaGerichtId,
            safeId: selectedSafeId,
          })}
          className="kern-btn kern-btn--primary"
        >
          <span className="kern-label">
            {t.routes.verfahrenGerichtAuswahl.klageEinreichenKompla}
          </span>
        </Link>
      )}

      {selectedGericht?.isZov && (
        <a
          href={ZOV_EINGABESYSTEM_URL}
          className="kern-btn kern-btn--secondary"
        >
          <span className="kern-label">
            {t.routes.verfahrenGerichtAuswahl.klageErstellenEingabesystem}
          </span>
        </a>
      )}
    </div>
  );
}
