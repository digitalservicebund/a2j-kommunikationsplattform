import { dictionaries } from "~/services/translations";

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
}: Readonly<ErrorPageProps>) {
  const { errorMessages } = dictionaries["de"];

  return (
    <div>
      <p className="kern-body kern-body--muted">
        {label ?? errorMessages.GENERIC_ERROR_LABEL}
      </p>
      <h1 className="kern-heading-medium">
        {heading ?? errorMessages.GENERIC_ERROR_HEADING}
      </h1>
      <p className="kern-body whitespace-pre-line">
        {body ?? errorMessages.GENERIC_ERROR_BODY}
      </p>
      {redirectUrl && redirectText && (
        <a href={redirectUrl} className="kern-link">
          <span
            className="kern-icon kern-icon--arrow-forward"
            aria-hidden="true"
          />
          {redirectText}
        </a>
      )}
    </div>
  );
}
