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
  return (
    <div>
      <p className="kern-body kern-body--muted">{label}</p>
      <h1 className="kern-heading-medium">{heading}</h1>
      <p className="kern-body whitespace-pre-line">{body}</p>
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
