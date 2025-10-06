import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function DatenschutzPage() {
  const { titles } = useTranslations();
  return <ContentPage title={titles.DATENSCHUTZ_TITLE}>...</ContentPage>;
}
