import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function ImpressumPage() {
  const { titles } = useTranslations();
  return <ContentPage title={titles.IMPRESSUM_TITLE}>...</ContentPage>;
}
