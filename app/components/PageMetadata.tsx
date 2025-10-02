import { useTranslations } from "~/services/translations/context";

export type PageMetadataOptions = {
  title?: string;
  description?: string;
};

export function PageMetadata({ title, description }: PageMetadataOptions) {
  const { titles, descriptions } = useTranslations();
  function pageTitle(text?: string) {
    if (text) {
      return `${text} | ${titles.PLATFORM_TITLE}`;
    } else {
      return titles.PLATFORM_TITLE;
    }
  }
  return (
    <>
      <title>{pageTitle(title)}</title>
      <meta
        name="description"
        content={description || descriptions.PLATFORM_DESCRIPTION}
      />
    </>
  );
}
