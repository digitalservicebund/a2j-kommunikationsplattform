import z from "zod";

type FetchVerfahrenOptions = {
  limit?: number;
  dummyData?: boolean;
};

const VerfahrenStatusSchema = z.enum(["Erstellt", "Eingereicht"]);

const VerfahrenSchema = z.object({
  id: z.uuid(),
  aktenzeichen: z.nullable(z.string()),
  status: VerfahrenStatusSchema,
  status_changed: z.iso.datetime(),
  eingereicht_am: z.iso.datetime(),
  gericht_name: z.nullable(z.string()),
});

const VerfahrenResponseSchema = z.object({
  verfahren: z.array(VerfahrenSchema),
});

const errorMessage = "Die Verfahren konnten nicht abgerufen werden.";

export default async function (options?: FetchVerfahrenOptions) {
  if (options?.dummyData) {
    if (options?.limit) {
      return dummyVerfahrenData.slice(0, options.limit);
    }
    return dummyVerfahrenData;
  }

  const offset = 0;
  const limit = options?.limit || 10;
  const userId = "PierreM";
  const baseUrl = "https://kompla.sinc.de";

  const url = `${baseUrl}/api/v1/verfahren?limit=${limit}&offset=${offset}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-User-ID": userId,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // 4xx and 5xx errors
      throw new Error(errorMessage, {
        cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
      });
    }

    try {
      const body = await response.json();
      const parsedVerfahren = VerfahrenResponseSchema.parse(body);
      console.log("Fetched all Verfahren successfully:", parsedVerfahren);
      return parsedVerfahren.verfahren;
    } catch (error) {
      throw new Error(errorMessage, { cause: error });
    }
  } catch (error) {
    // network errors
    throw new Error(errorMessage, { cause: error });
  }
}

const dummyVerfahrenData = [
  {
    id: "e81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    update: "Neue Dokumente der Gegenseite",
    mandantin: "Lisa Schönfeld (Kläger:in)",
    gegenpartei: "Tim Hartmann (Beklagte:r)",
    vertretung: "Rechtsanwalt Dr. Nico Müller",
    geschaeftszeichen: "C173 04/2025",
    gericht_name: "Amtsgericht Spandau",
    aktenzeichen: "42C8372/25",
    verfahrensstand: "Rechtshängig",
    rechtsgebiet: "Mietsachen",
    sachverhalt: "Räumungsklage",
  },
  {
    id: "f81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    update: "Neue Dokumente der Gerichts",
    mandantin:
      "Niklas-Leonhard Theodor Emanuel von und zu Schönborn-Lichtenwalde (Kläger:in)",
    gegenpartei:
      "Annabelle-Christiane Theresia Leonora-Madeleine von Breitenfeld-Rosenegg (Beklagte:r)",
    vertretung:
      "Rechtsanwältin Dr. Charlotte-Victoria Emilie Katharina von Hardenberg-Freystetten-Löwenfels",
    geschaeftszeichen: "C023 03/2025",
    gericht_name: "Amtsgericht Spandau",
    aktenzeichen: "42C8372/25",
    verfahrensstand: "Rechtshängig",
    rechtsgebiet: "Vertragssachen",
    sachverhalt: "Zahlungsklage",
  },
  {
    id: "g81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    mandantin: "Tina Dollinger-Schütz (Beklagte:r)",
    gegenpartei:
      "Sebastian Pfaffner, Timo Stöbel, Jochen Klang, Kai Uwe-Platt, Philippa-Sophie Helena Maria-Theresia von Altenmoor-Hohenleuben, Jonas-Ferdinand Leopold Alexander-Maurice von Eichenhorst-Krumbach (Kläger:in)",
    vertretung: "Rechtsanwalt Lukas Larsen",
    geschaeftszeichen: "C341 03/2025",
    gericht_name: "Amtsgericht Schöneberg",
    aktenzeichen: "43C6487/25",
    verfahrensstand: "Anhängig",
    rechtsgebiet: "Vertragssachen",
    sachverhalt: "Zahlungsklage",
  },
  {
    id: "h81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    abgeschlossen: true,
    urteilsHref: "/urteile/x81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    mandantin: "Janna Woods (Kläger:in)",
    gegenpartei: "Franziska Liebig, Tiffany Drey, Jana Hummel (Beklagte:r)",
    vertretung: "Rechtsanwalt Dr. Berndt Böhmer",
    geschaeftszeichen: "C5947 12/2024",
    gericht_name: "Amtsgericht Kreuzberg",
    aktenzeichen: "548C425/24",
    verfahrensstand: "Erkenntnisverfahren abgeschlossen",
    rechtsgebiet: "Vertragsrecht",
    sachverhalt: "Vertragsaufhebungsklage",
  },
] as const;
