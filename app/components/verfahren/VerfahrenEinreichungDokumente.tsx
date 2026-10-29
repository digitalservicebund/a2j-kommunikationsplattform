import VerfahrenDokumenteList from "~/components/verfahren/VerfahrenDokumenteList";
import VerfahrenDokumentUploadForm from "~/components/verfahren/VerfahrenDokumentUploadForm";
import type { DokumentWithValidierungsstatus } from "~/domains/verfahren/application/loadDokumenteWithValidierungsstatus.server";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";

type VerfahrenEinreichungDokumenteProps = {
  verfahrenId: string | undefined;
  einreichung: Pick<Einreichung, "id" | "name"> | undefined;
  dokumente: DokumentWithValidierungsstatus[];
  schriftstueckLabel?: string;
  allowSchriftstueck?: boolean;
  disabled: boolean;
};

export default function VerfahrenEinreichungDokumente({
  verfahrenId,
  einreichung,
  dokumente,
  schriftstueckLabel,
  allowSchriftstueck,
  disabled,
}: Readonly<VerfahrenEinreichungDokumenteProps>) {
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
