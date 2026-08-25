import { z } from "zod";
import { BelegSchema } from "~/domains/verfahren/schemas/belegSchema";
export default function VerfahrenBelegStatusAlert({ beleg }: { beleg: Beleg }) {
  const { routes } = useTranslations();

  const typeClass = {
    ERSTELLT: "kern-alert--success",
    IN_BEARBEITUNG: "kern-alert--info",
  }[beleg.status];

  const iconType = {
    ERSTELLT: "kern-icon--success",
    IN_BEARBEITUNG: "kern-icon--info",
  }[beleg.status];

  const timeStamp = new Date(beleg.erstellt_am).toLocaleDateString();
  const timeMessage = `Eingang: ${timeStamp}`;
  const belegPendingMessage = (
    <div className="space-y-kern-space-default flex flex-col">
      <span>{routes.verfahrenNeu.step3.belegStatus.pending.copy}</span>
      <span>{`${timeMessage} · Aktenzeichen folgt mit der Bestätigung`}</span>
    </div>
  );
  const belegReadyMessage = (
    <div className="space-y-kern-space-default flex flex-col">
      <span>{routes.verfahrenNeu.step3.belegStatus.ready.copy}</span>
      <span>{timeMessage}</span>
      <div className="space-x-kern-space-default flex items-center justify-start">
        <Button
          appearance="primary"
          label={
            routes.verfahrenNeu.step3.belegStatus.ready
              .buttonLabelDownloadConfirmation
          }
        />
        <Button
          appearance="secondary"
          label={
            routes.verfahrenNeu.step3.belegStatus.ready
              .buttonLabelToVerfahrenOverview
          }
        />
      </div>
    </div>
  );

  const isBelegReady = beleg.status === "ERSTELLT";
  const belegTitle = isBelegReady
    ? routes.verfahrenNeu.step3.belegStatus.ready.headline
    : routes.verfahrenNeu.step3.belegStatus.pending.headline;
  const belegMessage = isBelegReady ? belegReadyMessage : belegPendingMessage;

  return (
    <div className={`kern-alert ${typeClass}`} role="alert">
      <div className="kern-alert__header">
        <span className={`kern-icon ${iconType}`} aria-hidden="true"></span>
        <span className="kern-title">{belegTitle}</span>
      </div>
      <div className="kern-alert__body">
        {belegMessage && <p className="kern-body">{belegMessage}</p>}
      </div>
    </div>
  );
}

import Button from "~/components/Button";
import { useTranslations } from "~/services/translations/context";

export type Beleg = z.infer<typeof BelegSchema>;
