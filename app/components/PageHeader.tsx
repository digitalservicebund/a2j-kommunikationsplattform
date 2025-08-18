import Kopfzeile from "~/components/Kopfzeile";

export default function PageHeader({
  isDefaultLayout,
}: {
  isDefaultLayout: boolean;
}) {
  return (
    <header>
      <Kopfzeile isDefaultLayout={isDefaultLayout} />
    </header>
  );
}
