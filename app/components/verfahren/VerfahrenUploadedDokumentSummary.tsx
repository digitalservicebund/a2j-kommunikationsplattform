import Button from "~/components/Button";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenUploadedDokumentSummaryProps = {
  uploadedDokument: Dokument | undefined;
  verfahrenId: string | undefined;
  einreichungId: string | undefined;
  isSubmitting: boolean;
};

export default function VerfahrenUploadedDokumentSummary({
  uploadedDokument,
  verfahrenId,
  einreichungId,
  isSubmitting,
}: Readonly<VerfahrenUploadedDokumentSummaryProps>) {
  const { shared } = useTranslations();

  return (
    <div className="gap-kern-space-default flex w-full flex-col">
      <div className="p-kern-space-default align-center gap-kern-space-default rounded-kern-default flex flex-wrap border border-(--kern-color-decorative-border-contextual)">
        <div className="flex-1">
          <div className="kern-body kern-body--bold">
            {uploadedDokument?.anzeigename}
          </div>

          <div className="kern-body kern-body--small">
            {formatDokumentSize(uploadedDokument?.sizeInBytes ?? 0)}
          </div>
        </div>

        <div className="flex items-center">
          <input type="hidden" name="verfahrenId" value={verfahrenId} />
          <input type="hidden" name="einreichungId" value={einreichungId} />
          <input type="hidden" name="dokumentId" value={uploadedDokument?.id} />
          <Button
            appearance="secondary"
            className="kern-btn--x-small"
            type="submit"
            name="formType"
            value="delete"
            disabled={isSubmitting}
            label={shared.form.deleteDokument.label}
          >
            <span
              className="kern-icon kern-icon--delete"
              aria-hidden="true"
            ></span>
          </Button>
        </div>
      </div>
    </div>
  );
}
