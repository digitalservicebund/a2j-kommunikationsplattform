import Alert from "~/components/Alert";
import { Translations } from "~/services/translations";
import { useTranslations } from "~/services/translations/context";

type AlertConfig = {
  title: string;
  message: string;
} | null;

type CountInfoMapEntry = {
  countInfo: string;
  alert: AlertConfig;
};

function getCountInfo(
  count: number,
  hasFilters: boolean,
  labels: Translations["labels"],
  alerts: Translations["alerts"],
): CountInfoMapEntry {
  // No results found
  if (count === 0 && !hasFilters) {
    return {
      countInfo: `0 ${labels.VERFAHREN_LABEL}`,
      alert: {
        title: alerts.NO_VERFAHREN_FOUND_TITLE,
        message: alerts.NO_VERFAHREN_FOUND_MESSAGE,
      },
    };
  }

  if (count === 0 && hasFilters) {
    return {
      countInfo: `0 ${labels.RESULTS_LABEL}`,
      alert: {
        title: alerts.NO_VERFAHREN_FOUND_WITH_FILTERS_TITLE,
        message: alerts.NO_VERFAHREN_FOUND_WITH_FILTERS_MESSAGE,
      },
    };
  }
  // Some results found
  const countInfo =
    count < 100
      ? `${count} ${labels.VERFAHREN_LABEL}`
      : labels.MORE_THAN_100_VERFAHREN_LABEL;

  if (count > 50) {
    return {
      countInfo,
      alert: {
        title: alerts.TOO_MANY_RESULTS_TITLE,
        message: alerts.TOO_MANY_RESULTS_MESSAGE,
      },
    };
  }

  return { countInfo, alert: null };
}

export function VerfahrenCountInfo({
  count,
  hasFilters,
}: Readonly<{
  count: number;
  hasFilters: boolean;
}>) {
  const { labels, alerts } = useTranslations();

  const { countInfo, alert } = getCountInfo(count, hasFilters, labels, alerts);

  return (
    <>
      <p className="kern-body kern-body--muted">{countInfo}</p>
      {alert && (
        <Alert type="info" title={alert.title} message={alert.message} />
      )}
    </>
  );
}
