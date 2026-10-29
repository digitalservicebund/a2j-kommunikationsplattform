import VerfahrenDokumenteList from "~/components/verfahren/VerfahrenDokumenteList";
import VerfahrenDokumentUploadForm from "~/components/verfahren/VerfahrenDokumentUploadForm";
import type { DokumentWithValidierungsstatus } from "~/domains/verfahren/application/loadDokumenteWithValidierungsstatus.server";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";

type VerfahrenEinreichungDokumenteProps = {
  verfahrenId: string | undefined;
  // Undefined until the Einreichung exists (e.g. before the Klageeinreichung's
  // first upload)
  einreichung: Pick<Einreichung, "id" | "name"> | undefined;
  dokumente: DokumentWithValidierungsstatus[];
  // Overrides the Schriftstück's label, e.g. to call it the Klageschrift
  schriftstueckLabel?: string;
  allowSchriftstueck?: boolean;
  disabled: boolean;
};

/**
 * Lists the Dokumente of a draft Einreichung and uploads further ones. Used
 * for the Klageeinreichung's Dokumente step and the Weitere Einreichung.
 */
export default function VerfahrenEinreichungDokumente({
  verfahrenId,
  einreichung,
  dokumente,
  schriftstueckLabel,
  allowSchriftstueck,
  disabled,
}: Readonly<VerfahrenEinreichungDokumenteProps>) {
  // The system-generated XJustiz-Dokument isn't the user's upload
  const uploadedDokumente = dokumente.filter(({ typ }) => typ !== "XJUSTIZ");

  return (
    <div className="kern-gap-lg flex w-full flex-col">
      {verfahrenId && einreichung && uploadedDokumente.length > 0 && (
        <VerfahrenDokumenteList
          verfahrenId={verfahrenId}
          dokumente={uploadedDokumente}
          einreichung={einreichung}
          allowSchriftstueck={allowSchriftstueck}
          schriftstueckLabel={schriftstueckLabel}
          disabled={disabled}
        />
      )}

      <VerfahrenDokumentUploadForm
        // Resets the type and file after each successful upload, but keeps
        // them after a failed one
        key={uploadedDokumente.length}
        einreichungId={einreichung?.id}
        hasSchriftstueck={uploadedDokumente.some(
          ({ typ }) => typ === "SCHRIFTSTUECK",
        )}
        schriftstueckLabel={schriftstueckLabel}
        disabled={disabled}
      />
    </div>
  );
}
