import { useTranslations } from "~/services/translations/context";

export default function TestzugangBanner() {
  const { shared } = useTranslations();
  return (
    <div className="bg-(--kern-color-feedback-warning-background)">
      <div className="kern-container flex items-center space-x-(--kern-metric-space-default)">
        <span
          className="kern-icon kern-icon--warning kern-icon--default bg-(--kern-color-feedback-warning)"
          aria-hidden="true"
        ></span>
        <p className="kern-body">
          {shared.TESTZUGANG_BANNER_LABEL_PRE}
          <strong>{shared.TESTZUGANG_BANNER_LABEL_BOLD}</strong>
          {shared.TESTZUGANG_BANNER_LABEL_POST}
        </p>
      </div>
    </div>
  );
}
