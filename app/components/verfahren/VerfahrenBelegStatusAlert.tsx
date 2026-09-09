import { useEffect } from "react";
import { useFetcher, useNavigate, useParams } from "react-router";
import Button from "~/components/Button";
import type { Beleg } from "~/domains/verfahren/entities/beleg/beleg.entity";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

type DownloadBelegActionResult = {
  downloadUrl: string;
};

export default function VerfahrenBelegStatusAlert({
  beleg,
}: Readonly<{ beleg: Beleg }>) {
  const { routes, shared } = useTranslations();
  const downloadFetcher = useFetcher<ActionResult<DownloadBelegActionResult>>();
  const isDownloading = downloadFetcher.state !== "idle";
  const navigate = useNavigate();
  const params = useParams();
  const verfahrenID = params.id;

  useEffect(() => {
    if (downloadFetcher.data?.status === "success") {
      globalThis.location.href = downloadFetcher.data.data.downloadUrl;
    }
  }, [downloadFetcher.data]);

  const handleDownload = () => {
    downloadFetcher.submit(
      { formType: "download-beleg", belegId: beleg.id },
      { method: "post" },
    );
  };

  const handleToVerfahrenOverview = () => {
    if (!verfahrenID) return;
    navigate(`/verfahren/${verfahrenID}`);
  };

  const typeClass = {
    ERSTELLT: "kern-alert--success",
    IN_BEARBEITUNG: "kern-alert--info",
  }[beleg.status];

  const iconType = {
    ERSTELLT: "kern-icon--success",
    IN_BEARBEITUNG: "kern-icon--info",
  }[beleg.status];

  const timeStamp = new Date(beleg.erstelltAm).toLocaleDateString();
  const timeMessage = `Eingang: ${timeStamp}`;
  const belegPendingMessage = (
    <div className="flex flex-col space-y-(--kern-metric-space-default)">
      <span>{routes.verfahrenNeu.step3.belegStatus.pending.copy}</span>
      <span>{`${timeMessage} · Aktenzeichen folgt mit der Bestätigung`}</span>
    </div>
  );
  const belegReadyMessage = (
    <div className="flex flex-col space-y-(--kern-metric-space-default)">
      <span>{routes.verfahrenNeu.step3.belegStatus.ready.copy}</span>
      <span>{timeMessage}</span>
      <div className="flex items-center justify-start space-x-(--kern-metric-space-default)">
        <Button
          type="button"
          appearance="primary"
          disabled={isDownloading}
          onClick={handleDownload}
          label={
            isDownloading
              ? shared.loading
              : routes.verfahrenNeu.step3.belegStatus.ready
                  .buttonLabelDownloadConfirmation
          }
        />
        <Button
          type="button"
          appearance="secondary"
          onClick={handleToVerfahrenOverview}
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
        <div className="kern-body">{belegMessage}</div>
      </div>
    </div>
  );
}
