import Button from "~/components/Button";
import formatDokumentSize from "~/components/verfahren/presentation/formatDokumentSize";
import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import { useTranslations } from "~/services/translations/context";

type VerfahrenUploadedKlageschriftProps = {
  klageschrift: Dokument | undefined;
  verfahrenId: string | undefined;
  einreichungId: string | undefined;
  isSubmitting: boolean;
};

export default function VerfahrenUploadedKlageschrift({
  klageschrift,
  verfahrenId,
  einreichungId,
  isSubmitting,
}: Readonly<VerfahrenUploadedKlageschriftProps>) {
  const { shared } = useTranslations();

  return (
    <div className="kern-gap-md flex w-full flex-col">
      <div className="kern-p-md align-center kern-gap-md flex flex-wrap rounded-(--kern-metric-border-radius-default) border border-(--kern-color-decorative-border-contextual)">
        <div className="flex-1">
          <div className="kern-body kern-body--bold">
            {klageschrift?.anzeigename}
          </div>

          <div className="kern-body kern-body--small">
            {formatDokumentSize(klageschrift?.sizeInBytes ?? 0)}
          </div>
        </div>

        <div className="flex items-center">
          <input type="hidden" name="verfahrenId" value={verfahrenId} />
          <input type="hidden" name="einreichungId" value={einreichungId} />
          <input type="hidden" name="dokumentId" value={klageschrift?.id} />
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
