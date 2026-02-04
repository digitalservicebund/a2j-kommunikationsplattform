import Alert from "~/components/Alert";
import { VerfagrenTileKitchensink } from "~/components/kitchensink/VerfagrenTileKitchensink.static";
import { useTranslations } from "~/services/translations/context";

export const loader = async () => {
  return null;
};

export default function Kitchensink() {
  const { alerts } = useTranslations();
  return (
    <div className="space-y-kern-dimension-large">
      <h1 className="kern-heading-medium">Kitchensink</h1>
      <Alert
        type="info"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />
      <div className="space-y-kern-dimension-large">
        <VerfagrenTileKitchensink />
      </div>
    </div>
  );
}
