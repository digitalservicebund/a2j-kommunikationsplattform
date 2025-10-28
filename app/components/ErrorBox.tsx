import { Link } from "react-router-dom";

interface ErrorPageProps {
  label: string;
  heading: string;
  body: string;
  redirectUrl?: string;
  redirectText?: string;
}

export default function ErrorBox({
  label,
  heading,
  body,
  redirectUrl,
  redirectText,
}: ErrorPageProps) {
  return (
    <div className="kern-container">
      <p className="kern-body kern-body--muted">{label}</p>
      <h1 className="kern-heading-medium">{heading}</h1>
      <p className="kern-body">{body}</p>
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
  );
}
