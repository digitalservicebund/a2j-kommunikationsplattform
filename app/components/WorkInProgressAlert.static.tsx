import { useTranslations } from "~/services/translations/context";

export default function WorkInProgressAlert() {
  const { alerts } = useTranslations();
  return (
    <div
      className="kern-alert kern-alert--warning my-kern-space-default"
      role="alert"
    >
      <div className="kern-alert__header">
        <span
          className="kern-icon kern-icon--warning kern-icon--small"
          aria-hidden
        ></span>
        <span className="kern-title">{alerts.WORK_IN_PROGRESS_TITLE}</span>
      </div>
      <div className="kern-alert__body">
        <p className="kern-body">{alerts.WORK_IN_PROGRESS_MESSAGE}</p>
      </div>
    </div>
  );
}
