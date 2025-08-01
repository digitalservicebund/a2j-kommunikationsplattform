const PLATFORM_TITLE = "Kommunikationsplattform | Justiz-Services";
const PLATFORM_DESCRIPTION =
  "Willkommen auf der Pilotplattform für den digitalen Austausch zwischen Gerichten und Verfahrensbeteiligten.";

function pageTitle(text?: string) {
  if (text) {
    return `${text} | ${PLATFORM_TITLE}`;
  } else {
    return PLATFORM_TITLE;
  }
}

export type PageMetadataOptions = {
  title?: string;
  description?: string;
};

export function PageMetadata({ title, description }: PageMetadataOptions) {
  return (
    <>
      <title>{pageTitle(title)}</title>
      <meta name="description" content={description || PLATFORM_DESCRIPTION} />
    </>
  );
}
