import z from "zod";

export const ValidierungslaufStatus = z.enum([
  "AUSSTEHEND",
  "LAEUFT",
  "ABGESCHLOSSEN",
]);

const ValidierungsstatusErgebnis = z.enum([
  "NICHT_VERFUEGBAR",
  "GRUEN",
  "GELB",
  "ROT",
]);

export const ValidierungsstatusSchema = z.object({
  validierungslauf_status: ValidierungslaufStatus,
  ergebnis: ValidierungsstatusErgebnis,
  fehler: z.array(z.string()),
});

export type Validierungsstatus = z.infer<typeof ValidierungsstatusSchema>;
