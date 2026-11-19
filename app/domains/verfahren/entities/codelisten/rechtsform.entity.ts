import z from "zod";
import { createCodelisteSchema } from "./codeliste.entity";
import { CodeWertSchema } from "./codeWert.entity";

/**
 * Schema for {@link Rechtsform}.
 */
export const RechtsformSchema = CodeWertSchema;

/**
 * Schema for {@link RechtsformListe}.
 */
export const RechtsformListeSchema = createCodelisteSchema(RechtsformSchema);

/**
 * An element of the XJustiz "GDS.Rechtsform" code list.
 * @see https://www.xrepository.de/details/urn:xoev-de:xjustiz:codeliste:gds.rechtsform
 */
export type Rechtsform = z.infer<typeof RechtsformSchema>;

/**
 * The {@link Rechtsform} code list.
 */
export type RechtsformListe = z.infer<typeof RechtsformListeSchema>;
