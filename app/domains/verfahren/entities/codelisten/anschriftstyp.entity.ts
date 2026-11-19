import z from "zod";
import { createCodelisteSchema } from "./codeliste.entity";
import { CodeWertSchema } from "./codeWert.entity";

/**
 * Schema for {@link Anschriftstyp}.
 */
export const AnschriftstypSchema = CodeWertSchema;

/**
 * Schema for {@link AnschriftstypListe}.
 */
export const AnschriftstypListeSchema =
  createCodelisteSchema(AnschriftstypSchema);

/**
 * An element of the XJustiz "GDS.Anschriftstyp" code list.
 * @see https://www.xrepository.de/details/urn:xoev-de:xjustiz:codeliste:gds.anschriftstyp
 */
export type Anschriftstyp = z.infer<typeof AnschriftstypSchema>;

/**
 * The {@link Anschriftstyp} code list.
 */
export type AnschriftstypListe = z.infer<typeof AnschriftstypListeSchema>;

// Known Anschriftstyp codes
export const ANSCHRIFTSTYP_CODE_PRIVATANSCHRIFT = "017";
export const ANSCHRIFTSTYP_CODE_DIENST_GESCHAEFTSANSCHRIFT = "003";
