import { useTranslations } from "~/services/translations/context";

export type PageMetadataOptions = {
  title?: string;
  description?: string;
};

export function PageMetadata({
  title,
  description,
}: Readonly<PageMetadataOptions>) {
  const {
    routes: { PLATFORM_TITLE },
    descriptions: { PLATFORM_DESCRIPTION },
  } = useTranslations();

  return (
    <>
      <title>{title ? `${title} | ${PLATFORM_TITLE}` : PLATFORM_TITLE}</title>
      <meta name="description" content={description || PLATFORM_DESCRIPTION} />
    </>
  );
}
