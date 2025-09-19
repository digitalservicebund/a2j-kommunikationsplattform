import z from "zod";

export default z.object({
  id: z.uuid(),
  aktenzeichen: z.nullable(z.string()),
  status: z.enum(["Erstellt", "Eingereicht"]),
  status_changed: z.iso.datetime(),
  eingereicht_am: z.iso.datetime(),
  gericht_name: z.nullable(z.string()),
});
