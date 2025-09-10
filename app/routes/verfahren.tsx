import VerfahrenTile from "~/components/VerfahrenTile";

const dummyVerfahrenData = [
  {
    id: "e81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    update: "Neue Dokumente der Gegenseite",
    detailsHref: "/verfahren/e81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    mandantin: "Lisa Schönfeld (Kläger:in)",
    gegenpartei: "Tim Hartmann (Beklagte:r)",
    vertretung: "Rechtsanwalt Dr. Nico Müller",
    geschaeftszeichen: "C173 04/2025",
    gericht: "Amtsgericht Spandau",
    aktenzeichen: "42C8372/25",
  },
  {
    id: "f81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    update: "Neue Dokumente der Gerichts",
    detailsHref: "/verfahren/f81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    mandantin:
      "Niklas-Leonhard Theodor Emanuel von und zu Schönborn-Lichtenwalde (Kläger:in)",
    gegenpartei:
      "Annabelle-Christiane Theresia Leonora-Madeleine von Breitenfeld-Rosenegg (Beklagte:r)",
    vertretung:
      "Rechtsanwältin Dr. Charlotte-Victoria Emilie Katharina von Hardenberg-Freystetten-Löwenfels",
    geschaeftszeichen: "C023 03/2025",
    gericht: "Amtsgericht Spandau",
    aktenzeichen: "42C8372/25",
  },
  {
    id: "g81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    detailsHref: "/verfahren/g81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    mandantin: "Tina Dollinger-Schütz (Beklagte:r)",
    gegenpartei:
      "Sebastian Pfaffner, Timo Stöbel, Jochen Klang, Kai Uwe-Platt, Philippa-Sophie Helena Maria-Theresia von Altenmoor-Hohenleuben, Jonas-Ferdinand Leopold Alexander-Maurice von Eichenhorst-Krumbach (Kläger:in)",
    vertretung: "Rechtsanwalt Lukas Larsen",
    geschaeftszeichen: "C341 03/2025",
    gericht: "Amtsgericht Schöneberg",
    aktenzeichen: "43C6487/25",
  },
  {
    id: "h81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    abgeschlossen: true,
    detailsHref: "/verfahren/h81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    urteilsHref: "/urteile/x81d4fae-7dec-11d0-a765-00a0c91e6bf4",
    mandantin: "Janna Woods (Kläger:in)",
    gegenpartei: "Franziska Liebig, Tiffany Drey, Jana Hummel (Beklagte:r)",
    vertretung: "Rechtsanwalt Dr. Berndt Böhmer",
    geschaeftszeichen: "C5947 12/2024",
    gericht: "Amtsgericht Kreuzberg",
    aktenzeichen: "548C425/24",
  },
];

export default function Verfahren() {
  return (
    <>
      {/* TODO: For future reference, add new components here  */}
      <h1 className="kern-heading-large">Verfahren</h1>
      <hr className="kern-divider" aria-hidden />
      <h1 className="kern-heading-large">Suche</h1>
      <hr className="kern-divider my-kern-space-large" aria-hidden />
      <div className="mb-kern-space-large gap-y-kern-space-large flex flex-col">
        {dummyVerfahrenData.map((data) => (
          <VerfahrenTile key={data.id} {...data} />
        ))}
      </div>
    </>
  );
}
