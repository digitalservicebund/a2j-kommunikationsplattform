import z from "zod";
import { createCodelisteSchema } from "./codeliste.entity";
import { CodeWertSchema } from "./codeWert.entity";

/**
 * Schema for {@link Gericht}.
 */
export const GerichtSchema = CodeWertSchema;

/**
 * Schema for {@link GerichtListe}.
 */
export const GerichtListeSchema = createCodelisteSchema(GerichtSchema);

/**
 * An element of the XJustiz "GDS.Gerichte" code list.
 * @see https://www.xrepository.de/details/urn:xoev-de:xjustiz:codeliste:gds.gerichte
 */
export type Gericht = z.infer<typeof GerichtSchema>;

/**
 * The {@link Gericht} code list.
 */
export type GerichtListe = z.infer<typeof GerichtListeSchema>;
