import { Link } from "react-router";
import Icon, { IconName } from "~/components/Icon";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  title: string;
  message?: string;
  redirectUrl?: string;
  redirectText?: string;
}

export default function Alert({
  type,
  title,
  message,
  redirectUrl,
  redirectText,
}: Readonly<AlertProps>) {
  const typeClasses: Record<AlertType, string> = {
    success: "kern-alert--success",
    error: "kern-alert--danger",
    warning: "kern-alert--warning",
    info: "kern-alert--info",
  };

  const icons: Record<AlertType, IconName> = {
    success: "success",
    error: "danger",
    warning: "warning",
    info: "info",
  };

  const showBody = Boolean(message || (redirectUrl && redirectText));

  return (
    <div className={`kern-alert ${typeClasses[type]}`} role="alert">
      <div className="kern-alert__header">
        <Icon name={icons[type]} />
        <span className="kern-title">{title}</span>
      </div>
      {showBody && (
        <div className="kern-alert__body">
          {message && <p className="kern-body">{message}</p>}
          {redirectUrl && redirectText && (
            <Link to={redirectUrl} className="kern-link">
              <Icon name="arrow-forward" />
              {redirectText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
