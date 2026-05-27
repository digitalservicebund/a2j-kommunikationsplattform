import Alert from "~/components/Alert";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export default function DashboardPage() {
  const { labels, alerts } = useTranslations();
  return (
    <>
      <h1 className="kern-heading-medium">{labels.UEBERSICHT_LABEL}</h1>
      <div className="kern-row">
        <div className="kern-col-12 kern-col-md-8 kern-col-md-offset-2 kern-col-lg-6 kern-col-lg-offset-3">
          <Alert
            type="info"
            title={alerts.WORK_IN_PROGRESS_TITLE}
            message={alerts.WORK_IN_PROGRESS_MESSAGE}
            redirectUrl="/verfahren"
            redirectText="Besuchen Sie die Verfahrensübersicht"
          />
        </div>
      </div>
    </>
  );
}
