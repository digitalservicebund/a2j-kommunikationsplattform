import { useTranslations } from "~/services/translations/context";
import WorkInProgressAlert from "./WorkInProgressAlert.static";

export default function Uebersicht() {
  const { labels } = useTranslations();
  return (
    <>
      <h1 className="kern-heading-large">{labels.UEBERSICHT_LABEL}</h1>
      <WorkInProgressAlert />
    </>
  );
}
