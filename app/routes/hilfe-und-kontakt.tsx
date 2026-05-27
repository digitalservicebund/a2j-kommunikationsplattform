import Alert from "~/components/Alert";
import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function HilfeUndKontaktPage() {
  const { alerts, routes } = useTranslations();
  return (
    <ContentPage title={routes.HILFE_UND_KONTAKT_TITLE}>
      <Alert
        type="info"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />
    </ContentPage>
  );
}
