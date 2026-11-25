import z from "zod";
import { createCodelisteSchema } from "./codeliste.entity";
import { CodeWertSchema } from "./codeWert.entity";

/**
 * Schema for {@link Kanzleiform}.
 */
export const KanzleiformSchema = CodeWertSchema;

/**
 * Schema for {@link KanzleiformListe}.
 */
export const KanzleiformListeSchema = createCodelisteSchema(KanzleiformSchema);

/**
 * An element of the XJustiz "GDS.Kanzleiform" code list.
 * @see https://www.xrepository.de/details/urn:xoev-de:xjustiz:codeliste:gds.kanzleiform
 */
export type Kanzleiform = z.infer<typeof KanzleiformSchema>;

/**
 * The {@link Kanzleiform} code list.
 */
export type KanzleiformListe = z.infer<typeof KanzleiformListeSchema>;

// Known Kanzleiform values
export const KANZLEIFORM_CODE_EINZELANWALT = "001";
export const KANZLEIFORM_CODE_SOZIETAET = "002";
