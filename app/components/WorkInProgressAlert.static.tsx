import Alert from "~/components/Alert";
import { useTranslations } from "~/services/translations/context";

export default function WorkInProgressAlert() {
  const { alerts } = useTranslations();
  return (
    <Alert
      type="warning"
      title={alerts.WORK_IN_PROGRESS_TITLE}
      message={alerts.WORK_IN_PROGRESS_MESSAGE}
    />
  );
}
