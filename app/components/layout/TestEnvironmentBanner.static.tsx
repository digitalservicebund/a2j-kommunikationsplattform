import { useTranslations } from "~/services/translations/context";

export default function TestEnvironmentBanner() {
  const t = useTranslations();
  return (
    <div className="bg-(--kern-color-feedback-warning-background)">
      <div className="kern-container kern-gap-sm flex items-center">
        <span
          className="kern-icon kern-icon--warning kern-icon--default bg-(--kern-color-feedback-warning)"
          aria-hidden="true"
        ></span>
        <p
          className="kern-body kern-body--small kern-py-xs"
          dangerouslySetInnerHTML={{
            __html: t.layout.testEnvironmentBanner.label,
          }}
        ></p>
      </div>
    </div>
  );
}
