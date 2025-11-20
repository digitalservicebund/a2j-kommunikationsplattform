import Alert from "~/components/Alert";
import { useTranslations } from "~/services/translations/context";

export function VerfahrenCountInfo({
  count,
}: Readonly<{
  count: number;
}>) {
  const { labels, alerts } = useTranslations();

  const countInfo =
    count < 100
      ? `${count} ${labels.VERFAHREN_LABEL}`
      : labels.MORE_THAN_100_VERFAHREN_LABEL;

  let alert: { title: string; message: string } | undefined;

  if (count === 0) {
    alert = {
      title: alerts.NO_VERFAHREN_FOUND_TITLE,
      message: alerts.NO_VERFAHREN_FOUND_MESSAGE,
    };
  } else if (count > 50) {
    alert = {
      title: alerts.TOO_MANY_RESULTS_TITLE,
      message: alerts.TOO_MANY_RESULTS_MESSAGE,
    };
  }

  return (
    <>
      <p className="kern-body kern-body--muted">{countInfo}</p>
      {alert && (
        <Alert type="info" title={alert.title} message={alert.message} />
      )}
    </>
  );
}
