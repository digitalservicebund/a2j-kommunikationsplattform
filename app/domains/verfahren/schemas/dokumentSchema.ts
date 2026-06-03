import z from "zod";

/**
 * DokumentSchema
 *
 * See Dokument Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const DokumentTypeSchema = z.enum([
  "XJUSTIZ",
  "ANHANG",
  "SCHRIFTSTUECK",
]);

export const VirenScanStatusSchema = z.enum([
  "AUSSTEHEND",
  "IN_BEARBEITUNG",
  "FEHLGESCHLAGEN",
  "INFIZIERT",
  "SAUBER",
]);

export const DokumentSchema = z.object({
  id: z.string(),
  einreichung_id: z.string(),
  status: z.enum(["ERSTELLT", "VALIDIERT", "EINGEREICHT"]),
  name: z.nullable(z.string()),
  size_in_bytes: z.number(),
  type: DokumentTypeSchema,
  viren_scan_status: VirenScanStatusSchema,
  gesendet_am: z.nullable(z.string()),
  eingereicht_am: z.nullable(z.string()),
  erstellt_von: z.nullable(z.string()),
  erstellt_am: z.string(),
});

export const DokumenteSchema = z.array(DokumentSchema);
