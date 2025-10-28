import { Link } from "react-router-dom";

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

  const iconClasses: Record<AlertType, string> = {
    success: "kern-icon--success",
    error: "kern-icon--danger",
    warning: "kern-icon--warning",
    info: "kern-icon--info",
  };

  const showBody = Boolean(message || (redirectUrl && redirectText));

  return (
    <div className={`kern-alert ${typeClasses[type]}`} role="alert">
      <div className="kern-alert__header">
        <span
          className={`kern-icon ${iconClasses[type]}`}
          aria-hidden="true"
        ></span>
        <span className="kern-title">{title}</span>
      </div>
      {showBody && (
        <div className="kern-alert__body">
          {message && <p className="kern-body">{message}</p>}
          {redirectUrl && redirectText && (
            <Link to={redirectUrl} className="kern-link">
              <span
                className="kern-icon kern-icon--arrow-forward"
                aria-hidden="true"
              />
              {redirectText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
