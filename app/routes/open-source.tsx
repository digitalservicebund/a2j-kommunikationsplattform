import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function OpenSourcePage() {
  const { titles } = useTranslations();
  return <ContentPage title={titles.OPEN_SOURCE_CODE_TITLE}>...</ContentPage>;
}
