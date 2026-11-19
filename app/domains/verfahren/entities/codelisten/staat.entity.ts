import { z } from "zod";
import { createCodelisteSchema } from "./codeliste.entity";
import { CodeWertSchema } from "./codeWert.entity";

/**
 * Schema for {@link Staat}.
 */
export const StaatSchema = CodeWertSchema;

/**
 * Schema for {@link StaatListe}.
 */
export const StaatListeSchema = createCodelisteSchema(StaatSchema);

/**
 * Known codes from the "BfJ Staat" code list.
 * @see https://www.xrepository.de/details/urn:xoev-de:xjustiz:codeliste:gds.rollenbezeichnung
 */
export type Staat = z.infer<typeof StaatSchema>;

/**
 * The {@link Staat} code list.
 */
export type StaatListe = z.infer<typeof StaatListeSchema>;

// Known Staat codes
export const STAAT_CODE_DEUTSCHLAND = "000";
