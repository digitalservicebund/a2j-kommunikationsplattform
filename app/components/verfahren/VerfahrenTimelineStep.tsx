import { ReactNode } from "react";

export type VerfahrenTimelineStepProps = {
  timelineLabel: string;
  iconClassName?: string;
  showConnector?: boolean;
  // The step's content, e.g. a card or an accordion.
  children: ReactNode;
};

/**
 * One row of the Verfahren timeline: a label (date or "Entwurf") on the left,
 * an icon with a connector line to the next step, and the step's content.
 */
export default function VerfahrenTimelineStep({
  timelineLabel,
  iconClassName = "kern-icon--check",
  showConnector = true,
  children,
}: Readonly<VerfahrenTimelineStepProps>) {
  return (
    <div className="kern-gap-md flex items-stretch">
      <div className="w-20 flex-[0_0_auto]">
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
            className="kern-mt-sm min-h-4 w-0.5 flex-1 bg-(--kern-color-decorative-border-default) p-0"
          ></div>
        ) : null}
      </div>
      <div className="kern-pb-md min-w-0 flex-1">{children}</div>
    </div>
  );
}
