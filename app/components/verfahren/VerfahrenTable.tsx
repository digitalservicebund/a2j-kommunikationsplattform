import { useCallback } from "react";
import { Link, useNavigate } from "react-router";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { useTranslations } from "~/services/translations/context";
import { getVerfahrenStatusPresentation } from "./presentation/statusPresentation";
import { getVerfahrenDisplayName } from "./presentation/verfahrenDisplayName";
import VerfahrenStatusBadge from "./VerfahrenStatusBadge.static";

export function VerfahrenTable({
  verfahrenItems,
  isLoading,
}: Readonly<{
  isLoading: boolean;
  verfahrenItems: Verfahren[];
}>) {
  return (
    <>
      <table className="kern-table">
        <thead className="kern-table__head">
          <tr className="kern-table__row bg-(--kern-color-layout-background-hued)">
            <th scope="col" className="kern-table__header kern-p-md">
              Verfahren
            </th>
            <th
              scope="col"
              className="kern-table__header kern-p-md"
              style={{ width: "1%", textWrap: "nowrap" }}
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody className="kern-table__body">
          {verfahrenItems.map((verfahren) => (
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
  const translations = useTranslations();
  const navigate = useNavigate();

  const statusPresentation = getVerfahrenStatusPresentation(
    verfahren.status,
    translations.shared.statusPresentation.verfahren,
  );

  const verfahrenDetailsPath = `/verfahren/${verfahren.id}`;

  const navigateToVerfahrenDetails = useCallback(() => {
    navigate(verfahrenDetailsPath);
  }, [navigate, verfahrenDetailsPath]);

  return (
    <tr
      className="kern-table__row cursor-pointer hover:bg-(--kern-color-action-state-indicator-tint-hover-opacity)"
      onClick={navigateToVerfahrenDetails}
    >
      <th scope="row" className="kern-table__cell kern-p-md">
        <Link
          className="kern-link font-(--kern-typography-font-weight-medium)"
          to={`/verfahren/${verfahren.id}`}
        >
          {getVerfahrenDisplayName(verfahren)}
        </Link>
        <p className="kern-body kern-body--small kern-m-none text-(--kern-color-layout-text-muted)">
          {verfahren.aktenzeichenGericht} · {verfahren.gericht.wert}
        </p>
      </th>

      {/* Status */}
      <td className="kern-table__cell kern-p-md align-middle text-nowrap">
        <VerfahrenStatusBadge
          small
          tone={statusPresentation.badgeClassModifier}
          label={statusPresentation.label}
        />
      </td>
    </tr>
  );
}
