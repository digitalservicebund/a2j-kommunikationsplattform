import React from "react";

type KopfzeileContainerProps = {
  children: React.ReactNode;
};

function KopfzeileContainer({ children }: KopfzeileContainerProps) {
  return (
    <div className="kopfzeile-wrapper">
      <div className="kern-container">{children}</div>
    </div>
  );
}

function KopfzeileContent() {
  return (
    <div className="kern-kopfzeile__content">
      <span className="kern-kopfzeile__flagge" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 16">
          <path fill="#000" d="M0 .5h24v5.333H0z" />
          <path fill="red" d="M0 5.833h24v5.333H0z" />
          <path fill="#FACA2C" d="M0 11.167h24V16.5H0z" />
        </svg>
      </span>
      <span className="kern-kopfzeile__label">
        Offizielle Website – Bundesrepublik Deutschland
      </span>
    </div>
  );
}

export default function Kopfzeile({
  isDefaultLayout,
}: {
  isDefaultLayout: boolean;
}) {
  if (isDefaultLayout) {
    return (
      <KopfzeileContainer>
        <KopfzeileContent />
      </KopfzeileContainer>
    );
  }

  return (
    <KopfzeileContainer>
      <div className="kern-row kern-justify-content-center">
        <div className="kern-col-sm-10 kern-col-md-8 kern-col-lg-6 kern-col-xxl-4 kopfzeile-no-vertical-padding">
          <KopfzeileContent />
        </div>
      </div>
    </KopfzeileContainer>
  );
}
