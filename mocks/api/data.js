/**
 * All defined mocked data for MSW Mocking responses within `./handlers.js`
 */
const mockVerfahrenErstelltAktenzeichen = "42C8372/25";
const mockVerfahrenEingereichtAktenzeichen = "78C8973/25";
const mockVerfahrenEingereichtAktenzeichen1 = "12C4374/25";
const mockVerfahrenEingereichtAktenzeichen2 = "92C2275/25";

export const mockVerfahrenErstelltId = "2ab3cbc7-d00a-48bf-95a1-4d6f07406196";
export const mockVerfahrenEingereichtId =
  "77ba2bbf-be60-4fb3-be3e-132b66a8fe4e";
export const mockVerfahrenEingereichtId1 =
  "50e910ef-721c-4a84-9da9-2709308be07a";
export const mockVerfahrenEingereichtId2 =
  "dd61ed82-d2ab-4dc0-9734-620b46577505";

// response example: /api/v1/verfahren/{verfahren-id}
export const mockVerfahrenErstellt = {
  id: mockVerfahrenErstelltId,
  aktenzeichen: mockVerfahrenErstelltAktenzeichen,
  status: "Erstellt",
  status_changed: "2025-03-08T05:00:29.659Z",
  eingereicht_am: "2024-12-29T22:46:29.329Z",
  gericht_name: "Amtsgericht Spandau",
  // START (not available via API)
  update: "Neue Dokumente der Gegenseite",
  mandantin: "Lisa Schönfeld (Kläger:in)",
  gegenpartei: "Tim Hartmann (Beklagte:r)",
  vertretung: "Rechtsanwalt Dr. Nico Müller",
  geschaeftszeichen: "C173 04/2025",
  verfahrensstand: "Rechtshängig",
  rechtsgebiet: "Mietsachen",
  sachverhalt: "Räumungsklage",
  // END
};

// response example: /api/v1/verfahren/{verfahren-id}
export const mockVerfahrenEingereicht = {
  id: mockVerfahrenEingereichtId,
  aktenzeichen: mockVerfahrenEingereichtAktenzeichen,
  status: "Eingereicht",
  status_changed: "2025-04-03T10:42:08.749Z",
  eingereicht_am: "2025-03-08T04:08:25.169Z",
  gericht_name: "Amtsgericht Spandau",
  // START (not available via API)
  update: "Neue Dokumente der Gerichts",
  mandantin:
    "Niklas-Leonhard Theodor Emanuel von und zu Schönborn-Lichtenwalde (Kläger:in)",
  gegenpartei:
    "Annabelle-Christiane Theresia Leonora-Madeleine von Breitenfeld-Rosenegg (Beklagte:r)",
  vertretung:
    "Rechtsanwältin Dr. Charlotte-Victoria Emilie Katharina von Hardenberg-Freystetten-Löwenfels",
  geschaeftszeichen: "C023 03/2025",
  verfahrensstand: "Rechtshängig",
  rechtsgebiet: "Vertragssachen",
  sachverhalt: "Zahlungsklage",
  // END
};

// response example: /api/v1/verfahren/{verfahren-id}
export const mockVerfahrenEingereicht1 = {
  id: mockVerfahrenEingereichtId1,
  aktenzeichen: mockVerfahrenEingereichtAktenzeichen1,
  status: "Eingereicht",
  status_changed: "2025-04-03T10:42:08.749Z",
  eingereicht_am: "2025-03-08T04:08:25.169Z",
  gericht_name: "Amtsgericht Schöneberg",
  // START (not available via API)
  mandantin: "Tina Dollinger-Schütz (Beklagte:r)",
  gegenpartei:
    "Sebastian Pfaffner, Timo Stöbel, Jochen Klang, Kai Uwe-Platt, Philippa-Sophie Helena Maria-Theresia von Altenmoor-Hohenleuben, Jonas-Ferdinand Leopold Alexander-Maurice von Eichenhorst-Krumbach (Kläger:in)",
  vertretung: "Rechtsanwalt Lukas Larsen",
  geschaeftszeichen: "C341 03/2025",
  verfahrensstand: "Anhängig",
  rechtsgebiet: "Vertragssachen",
  sachverhalt: "Zahlungsklage",
  // END
};

// response example: /api/v1/verfahren/{verfahren-id}
export const mockVerfahrenEingereicht2 = {
  id: mockVerfahrenEingereichtId2,
  aktenzeichen: mockVerfahrenEingereichtAktenzeichen2,
  status: "Eingereicht",
  status_changed: "2025-04-03T10:42:08.749Z",
  eingereicht_am: "2025-03-08T04:08:25.169Z",
  gericht_name: "Amtsgericht Kreuzberg",
  // START (not available via API)
  abgeschlossen: true,
  mandantin: "Janna Woods (Kläger:in)",
  gegenpartei: "Franziska Liebig, Tiffany Drey, Jana Hummel (Beklagte:r)",
  vertretung: "Rechtsanwalt Dr. Berndt Böhmer",
  geschaeftszeichen: "C5947 12/2024",
  verfahrensstand: "Erkenntnisverfahren abgeschlossen",
  rechtsgebiet: "Vertragsrecht",
  sachverhalt: "Vertragsaufhebungsklage",
  // END
};

// mapping for /api/v1/verfahren/{verfahren-id}/akte response examples
export const aktenteileIds = {
  mockVerfahrenErstelltAkte: {
    0: "1efc08e6-520a-4667-a3f1-5018dd20d736",
    1: "2za73fef-1c0a-4b12-8294-45893f178e5a",
    2: "3xya6db9-bfc5-43fc-ba2f-3da34ec5629f",
    3: "4cd8da8b-5ec4-43e4-837f-cbce00d63358",
    4: "5kl62760-f591-401f-bc54-1a8506d81ba3",
  },
  mockVerfahrenEingereichtAkte: {
    0: "a1ec08e6-520a-4667-a3f1-5018dd20d736",
    // for created verfahren by a user
    1: "a2ce08e6-520a-4667-a3f1-5018dd20d736",
  },
};

// response example: /api/v1/verfahren/{verfahren-id}/akte
export const mockVerfahrenErstelltAkte = {
  id: "20354d7a-e4fe-47af-8ff6-187bca92f3f9",
  aktenzeichen: mockVerfahrenErstelltAktenzeichen,
  aktenteile: [
    // start
    {
      id: aktenteileIds.mockVerfahrenErstelltAkte[0],
      name: "Vorakte",
      // "parent_id" is not filled by the JBA at the moment
      // therefore also blank here for now
      parent_id: "",
    },
    {
      id: aktenteileIds.mockVerfahrenErstelltAkte[1],
      name: "Hauptakte",
      parent_id: "",
    },
    {
      id: aktenteileIds.mockVerfahrenErstelltAkte[2],
      name: "Eingänge",
      parent_id: "",
    },
    {
      id: aktenteileIds.mockVerfahrenErstelltAkte[3],
      name: "Ausgänge",
      parent_id: "",
    },
    {
      id: aktenteileIds.mockVerfahrenErstelltAkte[4],
      name: "Entwürfe",
      parent_id: "",
    },
  ],
};

// response example: /api/v1/verfahren/{verfahren-id}/akte
export const mockVerfahrenEingereichtAkte = {
  id: "1ac348f0-b00c-415a-825b-22e1c2b0f88a",
  aktenzeichen: mockVerfahrenEingereichtAktenzeichen,
  aktenteile: [
    {
      id: aktenteileIds.mockVerfahrenEingereichtAkte[0],
      name: "Vorakte",
      parent_id: "",
    },
  ],
};

// 6 Aktenteile example Dokumente
export const mockAktenteilDokumente = [
  // 0
  [
    {
      id: "12e22b26-41a3-40d7-ba79-a22914a1bb80",
      name: "Akteninnendeckel.docx",
      dokument_klasse: "Andere / Sonstige",
    },
    {
      id: "2e2a004-49f0-4ed9-ba43-90901ff7e4f4",
      name: "Aktendeckel.docx",
      dokument_klasse: "Andere / Sonstige",
    },
  ],
  // 1
  [
    {
      id: "32eb7f26-41a3-40d7-ba79-a22914a1bb80",
      name: "Hauptakte-Beispiel.docx",
      dokument_klasse: "Andere / Sonstige",
    },
    {
      id: "4022f0a4-49f0-4ed9-ba43-90901ff7e4f4",
      name: "Beschluss.pdf",
      dokument_klasse: "Andere / Sonstige",
    },
  ],
  // 2
  [
    {
      id: "52ab7f26-41a3-4ed7-ba79-a22914a1bb80",
      name: "Rückmeldung.docx",
      dokument_klasse: "Andere / Sonstige",
    },
    {
      id: "6e2s30a4-49f0-4ed9-b2a3-90901ff7e4f4",
      name: "Rückmeldung-Entwurf.docx",
      dokument_klasse: "Andere / Sonstige",
    },
    {
      id: "7e2s30a4-49f0-4ed9-b2a3-90901ff7e4f4",
      name: "Test.docx",
      dokument_klasse: "Andere / Sonstige",
    },
  ],
  // 3
  [
    {
      id: "852s30a4-49f0-4ed9-b2a3-90901ff7e4f4",
      name: "Anschreiben.docx",
      dokument_klasse: "Andere / Sonstige",
    },
    {
      id: "92eb7f26-41a3-40d7-ba89-a22914a1bb80",
      name: "dokument (3).pdf",
      dokument_klasse: "Andere / Sonstige",
    },
  ],
  // 4
  [
    {
      id: "10eb3216-41a3-4aa7-ba79-a22914ccbb80",
      name: "BigBuckBunny_Test.pdf",
      dokument_klasse: "Andere / Sonstige",
    },
  ],
  // 5
  [
    {
      id: "11a3c216-41a3-4aa7-ba79-a22914ccbb80",
      name: "Dokument_uploaded.pdf",
      dokument_klasse: "Andere / Sonstige",
    },
  ],
];

export const getDokumentByAktenteilId = (aktenteilId) => {
  let dokumente;

  switch (aktenteilId) {
    // mockVerfahrenErstellt
    case aktenteileIds.mockVerfahrenErstelltAkte[0]:
      dokumente = mockAktenteilDokumente[0];
      break;
    case aktenteileIds.mockVerfahrenErstelltAkte[1]:
      dokumente = mockAktenteilDokumente[1];
      break;
    case aktenteileIds.mockVerfahrenErstelltAkte[2]:
      dokumente = mockAktenteilDokumente[2];
      break;
    case aktenteileIds.mockVerfahrenErstelltAkte[3]:
      dokumente = mockAktenteilDokumente[3];
      break;
    case aktenteileIds.mockVerfahrenErstelltAkte[4]:
      dokumente = mockAktenteilDokumente[4];
      break;
    // mockVerfahrenEingereicht
    case aktenteileIds.mockVerfahrenEingereichtAkte[0]:
      dokumente = mockAktenteilDokumente[0];
      break;
    // this case mocks any Verfahren that was created "eingereicht"
    // by a user: we show a "Dokument_uploaded.pdf" for each upload
    // action by a user
    case aktenteileIds.mockVerfahrenEingereichtAkte[1]:
      dokumente = mockAktenteilDokumente[5];
      break;
    // return default docs, e.g. for verfahren created by a user
    default:
      dokumente = mockAktenteilDokumente[0];
  }

  return dokumente;
};
