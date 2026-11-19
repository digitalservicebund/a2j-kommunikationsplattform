import { z } from "zod";
import { createCodelisteSchema } from "./codeliste.entity";
import { CodeWertSchema } from "./codeWert.entity";

/**
 * Schema for {@link Rollenbezeichnung}.
 */
export const RollenbezeichnungSchema = CodeWertSchema;

/**
 * Schema for {@link RollenbezeichnungListe}.
 */
export const RollenbezeichnungListeSchema = createCodelisteSchema(
  RollenbezeichnungSchema,
);

/**
 * An element of the XJustiz "GDS.Rollenbezeichnung" code list.
 * @see https://www.xrepository.de/details/urn:xoev-de:xjustiz:codeliste:gds.rollenbezeichnung
 */
export type Rollenbezeichnung = z.infer<typeof RollenbezeichnungSchema>;

/**
 * The {@link Rollenbezeichnung} code list.
 */
export type RollenbezeichnungListe = z.infer<
  typeof RollenbezeichnungListeSchema
>;

// Known Rollenbezeichnung codes
export const ROLLENBEZEICHNUNG_CODE_KLAEGERIN = "101";
export const ROLLENBEZEICHNUNG_CODE_BEKLAGTE = "028";
export const ROLLENBEZEICHNUNG_CODE_PROZESSBEVOLLMAECHTIGTE = "132";
