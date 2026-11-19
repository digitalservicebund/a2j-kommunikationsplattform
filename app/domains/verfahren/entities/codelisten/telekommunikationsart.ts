import { z } from "zod";
import { createCodelisteSchema } from "./codeliste.entity";
import { CodeWertSchema } from "./codeWert.entity";

/**
 * Schema for {@link Telekommunikationsart}.
 */
export const TelekommunikationsartSchema = CodeWertSchema.extend({
  beschreibung: z.nullable(z.string()),
});

/**
 * Schema for {@link TelekommunikationsartListe}.
 */
export const TelekommunikationsartListeSchema = createCodelisteSchema(
  TelekommunikationsartSchema,
);

/**
 * An element of the XJustiz "GDS.Telekommunikationsart" code list.
 * @see https://www.xrepository.de/details/urn:xoev-de:xjustiz:codeliste:gds.telekommunikationsart
 */
export type Telekommunikationsart = z.infer<typeof TelekommunikationsartSchema>;

/**
 * The {@link Telekommunikationsart} code list.
 */
export type TelekommunikationsartListe = z.infer<
  typeof TelekommunikationsartListeSchema
>;

// Known Telekommunikationsart codes
export const TELEKOMMUNIKATIONSART_CODE_EMAIL = "001";
export const TELEKOMMUNIKATIONSART_CODE_MOBILTELEFON = "004";
