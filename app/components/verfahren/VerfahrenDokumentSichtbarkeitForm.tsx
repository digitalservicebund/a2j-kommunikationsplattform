import { useFetcher } from "react-router";
import VerfahrenSichtbarkeitSelect from "~/components/verfahren/VerfahrenSichtbarkeitSelect";
import { buildKlageeinreichungPath } from "~/config/klageeinreichungRoutes";
import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import type { ActionResult } from "~/utils/actionResult";

type VerfahrenDokumentSichtbarkeitFormProps = {
  dokument: Dokument;
  verfahrenId: string;
  einreichungId: string;
  disabled: boolean;
};

/**
 * Changes the Sichtbarkeit of an uploaded Dokument as soon as another option
 * is selected. Uses a fetcher, so the page (and the focus) stays in place.
 */
export default function VerfahrenDokumentSichtbarkeitForm({
  dokument,
  verfahrenId,
  einreichungId,
  disabled,
}: Readonly<VerfahrenDokumentSichtbarkeitFormProps>) {
  const fetcher = useFetcher<ActionResult<{ formType: string }>>();
  const isSaving = fetcher.state !== "idle";

  // Show the selected option while saving; afterwards, the revalidated
  // Dokument (unchanged, if saving failed)
  const pendingSichtbarkeitAlle = fetcher.formData?.get("sichtbarkeitAlle");
  const sichtbarkeitAlle =
    typeof pendingSichtbarkeitAlle === "string"
      ? pendingSichtbarkeitAlle === "true"
      : dokument.sichtbarkeitAlle;
  const error =
    !isSaving && fetcher.data?.status === "error"
      ? fetcher.data.error
      : undefined;

  const handleChange = (nextSichtbarkeitAlle: boolean) => {
    // aria-disabled doesn't block the change itself
    if (disabled || isSaving) {
      return;
    }

    void fetcher.submit(
      {
        formType: "sichtbarkeit",
        einreichungId,
        dokumentId: dokument.id,
        sichtbarkeitAlle: String(nextSichtbarkeitAlle),
      },
      {
        method: "post",
        action: buildKlageeinreichungPath("dokumente", {
          verfahren: verfahrenId,
        }),
      },
    );
  };

  return (
    <VerfahrenSichtbarkeitSelect
      id={`sichtbarkeit-${dokument.id}`}
      dokumentName={dokument.anzeigename}
      sichtbarkeitAlle={sichtbarkeitAlle}
      onChange={handleChange}
      disabled={disabled || isSaving}
      error={error}
    />
  );
}
