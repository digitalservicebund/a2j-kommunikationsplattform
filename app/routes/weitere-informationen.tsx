import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function WeitereInformationenPage() {
  const { titles } = useTranslations();
  return (
    <ContentPage title={titles.WEITERE_INFORMATIONEN_TITLE}>...</ContentPage>
  );
}
