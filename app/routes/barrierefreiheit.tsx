import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function BarrierefreiheitPage() {
  const { titles } = useTranslations();
  return <ContentPage title={titles.BARRIEREFREIHEIT_TITLE}>...</ContentPage>;
}
