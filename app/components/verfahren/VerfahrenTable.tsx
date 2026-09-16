import { Link } from "react-router";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { useTranslations } from "~/services/translations/context";
import { getVerfahrenStatusPresentation } from "./presentation/statusPresentation";
import { getVerfahrenDisplayName } from "./presentation/verfahrenDisplayName";
import VerfahrenStatusBadge from "./VerfahrenStatusBadge.static";

export function VerfahrenTable({
  items,
  isLoading,
}: Readonly<{
  isLoading: boolean;
  items: Verfahren[];
}>) {
  const t = useTranslations();

  return (
    <>
      <table className="kern-table border-(--kern-color-layout-border)">
        <thead className="kern-table__head">
          <tr className="kern-table__row bg-(--kern-color-layout-background-hued)">
            <th scope="col" className="kern-table__header kern-p-md">
              {t.shared.verfahren}
            </th>
            <th
              scope="col"
              className="kern-table__header kern-p-md"
              style={{ width: "1%", textWrap: "nowrap" }}
            >
              {t.shared.status.label}
            </th>
          </tr>
        </thead>

        <tbody className="kern-table__body">
          {items.map((verfahren) => (
            <VerfahrenTableRow key={verfahren.id} verfahren={verfahren} />
          ))}

          {/* TODO: Loading state */}
          {isLoading && null}
        </tbody>
      </table>
    </>
  );
}

function VerfahrenTableRow({ verfahren }: Readonly<{ verfahren: Verfahren }>) {
  const t = useTranslations();

  const statusPresentation = getVerfahrenStatusPresentation(
    verfahren.status,
    t.shared.status.verfahren,
  );

  return (
    <tr className="kern-table__row relative hover:bg-(--kern-color-action-state-indicator-tint-hover-opacity)">
      <th scope="row" className="kern-table__cell kern-p-md">
        <Link
          className="kern-link font-(--kern-typography-font-weight-medium) no-underline after:absolute after:inset-0 visited:text-(--kern-color-action-default-contextual)"
          to={`/verfahren/${verfahren.id}`}
        >
          {getVerfahrenDisplayName(verfahren)}
        </Link>
        <p className="kern-body kern-body--small m-0 p-0 text-(--kern-color-layout-text-muted)">
          {verfahren.aktenzeichenGericht ?? t.shared.gericht.azLabel} {" · "}
          {verfahren.gericht?.wert ?? t.shared.gericht.unknown}
        </p>
      </th>

      {/* Status */}
      <td className="kern-table__cell kern-p-md align-middle text-nowrap">
        <div className="kern-gap-lg flex justify-between">
          <VerfahrenStatusBadge
            className="flex-stretch"
            small
            tone={statusPresentation.badgeClassModifier}
            label={statusPresentation.label}
          />
          <span className="kern-icon kern-icon--chevron-right"></span>
        </div>
      </td>
    </tr>
  );
}
