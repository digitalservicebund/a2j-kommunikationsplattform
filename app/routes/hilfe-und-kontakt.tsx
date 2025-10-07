import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function HilfeUndKontaktPage() {
  const { titles } = useTranslations();
  return <ContentPage title={titles.HILFE_UND_KONTAKT_TITLE}>...</ContentPage>;
}
