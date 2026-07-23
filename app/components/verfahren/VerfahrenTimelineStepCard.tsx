import { ReactNode } from "react";
import { Link } from "react-router";

type VerfahrenTimelineStepCardProps = {
  timelineLabel: string;
  title: string;
  body: ReactNode;
  editTo: string;
  editLabel: string;
  showConnector?: boolean;
  iconClassName?: string;
};

export default function VerfahrenTimelineStepCard({
  timelineLabel,
  title,
  body,
  editTo,
  editLabel,
  showConnector = true,
  iconClassName = "kern-icon--check",
}: Readonly<VerfahrenTimelineStepCardProps>) {
  return (
    <div className="gap-kern-space-default flex items-stretch">
      <div className="w-80 flex-[0_0_auto]">
        <span className="kern-body kern-body--small kern-body--muted">
          {timelineLabel}
        </span>
      </div>
      <div className="flex flex-[0_0_auto] flex-col items-center">
        <span
          className={`kern-icon ${iconClassName} kern-icon--default`}
          aria-hidden="true"
        ></span>
        {showConnector ? (
          <div
            data-testid="timeline-step-connector"
            className="mt-kern-space-small min-h-16 w-2 flex-1 bg-(--kern-color-decorative-border-default) p-0"
          ></div>
        ) : null}
      </div>
      <div className="pb-kern-space-default flex-1">
        <article className="kern-card kern-card--small">
          <div className="kern-card__container">
            <header className="kern-card__header">
              <h2 className="kern-title">{title}</h2>
            </header>
            <section className="kern-card__body">
              <div className="flex w-full flex-row items-center justify-between">
                <p className="kern-body">{body}</p>
                <Link to={editTo} className="kern-btn kern-btn--tertiary">
                  <span className="kern-label">{editLabel}</span>
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
