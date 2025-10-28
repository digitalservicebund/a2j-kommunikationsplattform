import Alert from "~/components/Alert";
import { useTranslations } from "~/services/translations/context";

export default function Uebersicht() {
  const { labels, alerts } = useTranslations();
  return (
    <>
      <h1 className="kern-heading-large">{labels.UEBERSICHT_LABEL}</h1>
      <Alert
        type="warning"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />
    </>
  );
}
