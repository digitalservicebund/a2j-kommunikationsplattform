import Icon from "~/components/Icon";
import { useTranslations } from "~/services/translations/context";

export default function TestEnvironmentBanner() {
  const t = useTranslations();
  return (
    <div className="bg-(--kern-color-feedback-warning-background)">
      <div className="kern-container kern-gap-sm flex items-center">
        <Icon name="warning" className="bg-(--kern-color-feedback-warning)" />
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
