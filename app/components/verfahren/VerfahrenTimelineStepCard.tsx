import { ReactNode } from "react";
import { Link } from "react-router";
import VerfahrenTimelineStep from "~/components/verfahren/VerfahrenTimelineStep";
import { useTranslations } from "~/services/translations/context";

export type VerfahrenTimelineStepCardProps = {
  timelineLabel: string;
  title: string;
  body: ReactNode;
  editTo?: string;
  editLabel?: string;
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
  const translations = useTranslations();

  return (
    <VerfahrenTimelineStep
      timelineLabel={timelineLabel}
      iconClassName={iconClassName}
      showConnector={showConnector}
    >
      <article className="kern-card kern-card--small">
        <div className="kern-card__container">
          <header className="kern-card__header">
            <h2 className="kern-title">{title}</h2>
          </header>
          <section className="kern-card__body">
            <div className="flex w-full flex-row items-center justify-between">
              <p className="kern-body">{body}</p>
              {editTo && (
                <Link to={editTo} className="kern-btn kern-btn--tertiary">
                  <span className="kern-label">
                    {editLabel ?? translations.shared.form.labels.edit}
                  </span>
                </Link>
              )}
            </div>
          </section>
        </div>
      </article>
    </VerfahrenTimelineStep>
  );
}
