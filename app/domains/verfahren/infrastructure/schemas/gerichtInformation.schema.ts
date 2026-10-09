import { z } from "zod";

/**
 * @see https://app.kompla-justiz.sinc.de/main/swagger/index.html#model-BankverbindungResponse
 */
const BankverbindungApiSchema = z.object({
  iban: z.string(),
  bank: z.string(),
  bic: z.string(),
  kontoinhaber: z.string(),
});

/**
 * @see https://app.kompla-justiz.sinc.de/main/swagger/index.html#model-GerichtInformationResponse
 */
const GerichtInformationApiSchema = z.object({
  bankverbindungen: z.array(BankverbindungApiSchema),
});

// Currently no transformation to camel-case names is needed as all property
// names are lower-case.
export const BankverbindungSchema = GerichtInformationApiSchema;
export const GerichtInformationSchema = GerichtInformationApiSchema;

export type Bankverbindung = z.infer<typeof BankverbindungSchema>;
export type GerichtInformation = z.infer<typeof GerichtInformationSchema>;
