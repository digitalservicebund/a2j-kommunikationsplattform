export default function Kopfzeile({
  isDefaultLayout,
}: {
  isDefaultLayout: boolean;
}) {
  const layoutStyle = isDefaultLayout
    ? "kopfzeile-responsive-default"
    : "kopfzeile-responsive-narrow";

  return (
    <div className="kern-kopfzeile">
      <div className="kern-container">
        <div className={layoutStyle}>
          <div className={`kern-kopfzeile__content`}>
            <span className="kern-kopfzeile__flagge" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 16"
              >
                <path fill="#000" d="M0 .5h24v5.333H0z" />
                <path fill="red" d="M0 5.833h24v5.333H0z" />
                <path fill="#FACA2C" d="M0 11.167h24V16.5H0z" />
              </svg>
            </span>
            <span className="kern-kopfzeile__label">
              Offizielle Website – Bundesrepublik Deutschland
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
