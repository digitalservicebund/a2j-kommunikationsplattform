import { useTranslations } from "~/services/translations/context";

export type PageMetadataOptions = {
  title?: string;
  description?: string;
};

export function PageMetadata({
  title,
  description,
}: Readonly<PageMetadataOptions>) {
  const { routes, descriptions } = useTranslations();
  function pageTitle(text?: string) {
    if (text) {
      return `${text} | ${routes.PLATFORM_TITLE}`;
    } else {
      return routes.PLATFORM_TITLE;
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
