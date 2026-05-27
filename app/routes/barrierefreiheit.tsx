import Alert from "~/components/Alert";
import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function BarrierefreiheitPage() {
  const { alerts, routes } = useTranslations();
  return (
    <ContentPage title={routes.BARRIEREFREIHEIT_TITLE}>
      <Alert
        type="info"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />
    </ContentPage>
  );
}
