import { useTranslations } from "~/services/translations/context";

export default function TestzugangBanner() {
  const { labels } = useTranslations();
  return (
    <div className="bg-kern-feedback-warning-background">
      <div className="kern-container space-x-kern-space-default flex items-center">
        <span
          className="kern-icon kern-icon--warning kern-icon--default bg-kern-feedback-warning"
          aria-hidden="true"
        ></span>
        <p className="kern-body">
          {labels.TESTZUGANG_BANNER_LABEL_PRE}
          <strong>{labels.TESTZUGANG_BANNER_LABEL_BOLD}</strong>
          {labels.TESTZUGANG_BANNER_LABEL_POST}
        </p>
      </div>
    </div>
  );
}
