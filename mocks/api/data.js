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

export const mockNewVerfahren = [
  {
    id: "0199cd30-ac46-768f-b695-5a75b21b64af",
    aktenzeichenGericht: null,
    status: "Erstellt",
    statusChanged: "2025-10-10T08:15:43.116718Z",
    eingereichtAm: null,
    gericht: null,
    beteiligungen: [],
  },
  {
    id: "0199dc44-cc85-7ac0-bc4a-fb685ed41f34",
    aktenzeichenGericht: null,
    status: "Erstellt",
    statusChanged: "2025-10-13T06:32:00.3193Z",
    eingereichtAm: null,
    gericht: null,
    beteiligungen: [],
  },
  {
    id: "0199dcbf-0449-74e3-bcb4-6c57afb41fc5",
    aktenzeichenGericht: null,
    status: "Erstellt",
    statusChanged: "2025-10-13T08:45:30.056134Z",
    eingereichtAm: null,
    gericht: null,
    beteiligungen: [],
  },
  {
    id: "019a34b6-4f17-7e13-a87c-86a0bf5bbfd6",
    aktenzeichenGericht: null,
    status: "Erstellt",
    statusChanged: "2025-10-30T10:42:34.334688Z",
    eingereichtAm: null,
    gericht: null,
    beteiligungen: [],
  },
  {
    id: "019a34f9-467c-726e-89da-b727a4afee63",
    aktenzeichenGericht: "Z8546 06/2025",
    status: "Eingereicht",
    statusChanged: "2024-12-12T06:11:27.140898Z",
    eingereichtAm: "2025-07-12T15:45:49.798414Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019a34f9-467c-73d0-a9ec-bc2fcd8de123",
        name: "Andrea Goldner",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F2474012024",
            bevollmaechtigter: {
              id: "019a34f9-4576-7b69-883b-06a7a1e7ac0b",
              safeId: "TestStein",
              name: "Dr. Rita JohnstonAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            },
          },
        ],
      },
      {
        id: "019a34f9-467c-757b-b980-1846338741f1",
        name: "Air Berlin",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z7387092024",
            bevollmaechtigter: {
              id: "019a34f9-456f-7788-a393-3680269d4e07",
              safeId: "DE.BRAK_SPT.c37e8b59-54d2-4e6a-b5d3-f8a2c9e1d774.7b32",
              name: "Dr. Marvin FriesenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019a34f9-4680-7ab6-b5e9-ef2e77368a60",
    aktenzeichenGericht: "D84 03/2025",
    status: "Eingereicht",
    statusChanged: "2025-03-23T21:22:50.195679Z",
    eingereichtAm: "2025-04-24T20:52:04.141542Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019a34f9-4680-70df-946b-c85bc7e46719",
        name: "Ada Nienow",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S3339122024",
            bevollmaechtigter: {
              id: "019a34f9-4576-7b69-883b-06a7a1e7ac0b",
              safeId: "TestStein",
              name: "Dr. Rita JohnstonAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            },
          },
        ],
      },
      {
        id: "019a34f9-4680-795e-9b67-220e958d621e",
        name: "Condor",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K1594052024",
            bevollmaechtigter: {
              id: "019a34f9-456f-7b94-ac79-0c5fb9b9e2e0",
              safeId: "DE.BRAK_SPT.fb72a4c9-3e1d-41a6-8b2c-0d6e5f9a7b34.8c51",
              name: "Dr. Randall KutchAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            },
          },
        ],
      },
      {
        id: "019a34f9-4680-7cff-b564-86196a55f228",
        name: "Ryanair",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O2251092023",
            bevollmaechtigter: {
              id: "019a34f9-456f-7fd3-ba08-2d16cae9c2f7",
              safeId: "DE.BRAK_SPT.e81f4b27-3a6d-44e8-b2f1-7a5d3e0c9d17.9fbc",
              name: "Dr. Elizabeth RogahnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            },
          },
          {
            aktenzeichen: "Q1263022025",
            bevollmaechtigter: {
              id: "019a34f9-456f-7788-a393-3680269d4e07",
              safeId: "DE.BRAK_SPT.c37e8b59-54d2-4e6a-b5d3-f8a2c9e1d774.7b32",
              name: "Dr. Marvin FriesenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            },
          },
        ],
      },
    ],
  },
];

// fresh copy of GET /verfahren resonse from https://app.kompla-justiz.sinc.de/main/swagger/index.html
export const mockVerfahrenNewAPIMain = [
  {
    id: "019aa757-2b2e-757c-be15-6c1dd652a405",
    aktenzeichen_gericht: "V 7139 08/2025",
    status: "Erstellt",
    status_changed: "2025-08-16T06:49:40.602103Z",
    eingereicht_am: "2025-10-20T16:37:56.239743Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-76d6-9ca2-2cc68034281f",
        name: "Fabian Krüger",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 219 04/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d09-b879-f7828cb8562d",
              safe_id: "DE.BRAK_SPT.78541b1b-202f-42f9-90e3-2a6931e94cfc",
              name: "Rechtsanwalt Dr. Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-770b-8c2b-ed7d25333839",
        name: "TUI Fly",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b37-7f14-bf1c-046efc0f72ea",
    aktenzeichen_gericht: "N 9616 13/2026",
    status: "Eingereicht",
    status_changed: "2025-01-30T23:00:09.564166Z",
    eingereicht_am: "2025-09-15T03:16:19.237508Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b37-7192-a331-a73a8efff7a0",
        name: "Eurowings",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b37-7d3c-ac20-c9a2f6ee7efe",
        name: "Friedrich Scholz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 5940 10/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-7b83-97c3-ae2121f850b1",
    aktenzeichen_gericht: "I 855 13/2025",
    status: "Erstellt",
    status_changed: "2025-02-24T08:04:50.313347Z",
    eingereicht_am: "2025-09-12T06:27:53.416521Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-76d4-8214-d51b639d1714",
        name: "Benedikt Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 6390 10/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-7aa5-a96a-46869b7f0530",
        name: "Florian Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b36-7280-8feb-41b4be060184",
    aktenzeichen_gericht: "Z 607 05/2026",
    status: "Eingereicht",
    status_changed: "2025-04-15T06:02:26.926987Z",
    eingereicht_am: "2025-08-27T20:04:49.589667Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-71fd-b76c-f65031658bba",
        name: "Ryanair",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 1961 10/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7512-b77e-f3865302c272",
        name: "Johanna Möser",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 7378 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-751d-9cfd-1cf2c32c25a8",
              safe_id: "DE.BRAK_SPT.a71ffa80-f821-4ab5-b98c-70d37bbc7174",
              name: "Rechtsanwalt Matthias-Leonhard Theodor von Weißenthal",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-7d6c-9bff-f3e18b21d481",
    aktenzeichen_gericht: "F 7012 08/2026",
    status: "Erstellt",
    status_changed: "2025-09-12T16:37:00.965968Z",
    eingereicht_am: "2025-08-15T10:28:23.852472Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-7c4b-b539-e7a35615f557",
        name: "Daniela Brück",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 3954 08/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7da0-bfdc-d65c2c34544b",
        name: "Gabriele-Luise-Friederike von der Lindenau-Küster-Schönfeld-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 5084 09/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-7c7e-a8b1-670fba76991c",
    aktenzeichen_gericht: "Q 6960 07/2025",
    status: "Eingereicht",
    status_changed: "2025-02-20T12:08:56.959552Z",
    eingereicht_am: "2025-08-14T01:53:43.607265Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-7837-b9c6-c381ac970e2c",
        name: "Andreas Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b34-7dc1-b2bc-3c137c976301",
        name: "Johanna-Luise Friederike von Bärenfels-Schmidt",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 349 05/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2d-7553-9eb4-54d508b69e98",
    aktenzeichen_gericht: "W 804 12/2024",
    status: "Eingereicht",
    status_changed: "2025-07-09T20:14:00.84988Z",
    eingereicht_am: "2025-08-10T07:36:34.66406Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2d-7cb2-ba17-721374eeac27",
        name: "Dominik Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 4032 08/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2d-7fbe-bcec-fdf458b4d7a4",
        name: "Kathrin Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 5229 04/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b38-7f83-a058-40f1b312a8df",
    aktenzeichen_gericht: "U 893 07/2025",
    status: "Erstellt",
    status_changed: "2025-06-02T11:57:23.41342Z",
    eingereicht_am: "2025-07-15T13:30:06.611402Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b38-7d21-b1b9-4f127a022769",
        name: "Benjamin-Lukas Franz-Josef von Schönhagen",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 1867 09/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b38-7d6b-9675-9b8bcb9ebafd",
        name: "Miriam Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 6160 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7887-9e22-e432baa94463",
              safe_id: "DE.BRAK_SPT.21283e8c-ac19-4653-bc1e-2a1f849fbbb1",
              name: "Rechtsanwalt Johannes-Benedikt Albrecht von Löwenhügel",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b37-7214-a2c2-0107afc609e5",
    aktenzeichen_gericht: "J 9248 06/2024",
    status: "Erstellt",
    status_changed: "2025-08-21T13:30:44.285999Z",
    eingereicht_am: "2025-07-09T13:48:33.558819Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b37-730c-875f-1bc77843050f",
        name: "Jonas-Maurer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 5522 05/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7ebb-a80b-4dd7daf3d3f7",
              safe_id: "DE.BRAK_SPT.12df46eb-fedd-4f40-a86a-50062811b24a",
              name: "Rechtsanwalt Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
            },
          },
        ],
      },
      {
        id: "019aa757-2b37-7894-bc3d-49ce6fa3e461",
        name: "Miriam-Johanna-Elisabeth von und zu Löwenstein-Bär-Schäfer-Küster",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 699 10/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "Y 1706 02/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7576-82a8-0fa09911b18f",
              safe_id: "DE.BRAK_SPT.155aa827-241e-40dc-a41d-5fc3780dfd6b",
              name: "Dr. Anna-Lena-Marie von Schönbrunn-Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-79a2-82ef-154e4e8eb821",
    aktenzeichen_gericht: "I 2441 11/2026",
    status: "Erstellt",
    status_changed: "2025-08-17T10:35:15.151073Z",
    eingereicht_am: "2025-07-02T19:13:29.561828Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-787a-a847-8f5bad7703ff",
        name: "Johanna-Elise-Margarethe von Hohenau-Krüger-Weiß-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 8104 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7b6e-ba6d-9d9df08e94b1",
              safe_id: "DE.BRAK_SPT.70ae0eef-f0af-4b2a-83e2-a90c6e9531eb",
              name: "Dr. Karolin Weiß",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-787e-b3a1-879f4c38eaa8",
        name: "Clara-Louise-Friederike von Brück-Köhler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 5338 01/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-7bea-8b4c-f3463fabeebe",
    aktenzeichen_gericht: "J 9218 03/2024",
    status: "Eingereicht",
    status_changed: "2024-12-14T01:02:02.550258Z",
    eingereicht_am: "2025-06-19T14:03:37.958415Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-711f-bf2f-03932b665b49",
        name: "Hannes Großmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 4215 09/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7bbd-90f8-7f9ae1f9e38e",
        name: "Luisa Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 5275 01/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2e-7c76-a919-fcb2581eb392",
    aktenzeichen_gericht: "F 3101 11/2026",
    status: "Erstellt",
    status_changed: "2025-10-18T16:45:42.683096Z",
    eingereicht_am: "2025-06-07T20:47:24.894499Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-74f6-9dc2-5418e1e6c8f8",
        name: "Helena-Sophie Amalia von Brückner-Weißmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 1100 08/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f92-b368-4d1d7e345ee1",
              safe_id: "DE.BRAK_SPT.6df555d4-32e8-4962-b08b-db0186b5240d",
              name: "Dr. Elisa Schönfeld",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-7eb0-b5d9-fc2e316aa0c5",
        name: "Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 9189 02/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-7fa7-832c-44e5851d7fc8",
    aktenzeichen_gericht: "Q 2991 01/2026",
    status: "Erstellt",
    status_changed: "2025-09-10T00:55:11.299944Z",
    eingereicht_am: "2025-04-13T00:32:30.015054Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-7136-9e20-46b972a98a74",
        name: "Leonhard Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 3255 04/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-75f4-931d-8bc147eaca3c",
        name: "Elisa-Sophie-Luise-Gräfin von Löwenhügel-Küster-Schönfeld-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 6799 02/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7b34-bbfc-c20e863551d4",
              safe_id: "DE.BRAK_SPT.c1e058c4-15ff-49a9-94e3-52b9b138d758",
              name: "Rechtsanwalt Helene Küster",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-71ee-9e80-01f807d52db1",
    aktenzeichen_gericht: "N 3970 03/2024",
    status: "Erstellt",
    status_changed: "2025-10-17T04:23:39.810167Z",
    eingereicht_am: "2025-04-12T12:00:36.83028Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-782e-bc3a-5245e65bdd17",
        name: "Ludwig-Konstantin-Maximilian von Schönwald-Küster-Schäfer-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 3290 03/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d03-a3db-d075dbe7b745",
              safe_id: "DE.BRAK_SPT.599967ae-1295-4ab0-af1f-cbb0763d6a55",
              name: "Dr. Kathrin Hölzer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-7891-957e-709164ef545d",
        name: "Sebastian Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 8568 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7c9c-90db-f15173d33dbb",
              safe_id: "DE.BRAK_SPT.a0a8646e-e762-4785-af4d-3c58c0cace0c",
              name: "Dr. Johanna Kübler",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-73c4-8e50-ca850e998909",
    aktenzeichen_gericht: "H 7865 06/2024",
    status: "Erstellt",
    status_changed: "2025-07-13T01:57:48.901558Z",
    eingereicht_am: "2025-02-12T22:04:34.087041Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-72d8-8be4-30c34200d772",
        name: "Matthias Lösch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 1404 05/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7dee-8f48-8d9ae41adc81",
        name: "Helene Küster",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 5426 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7512-b6d1-b1ff3cebe390",
              safe_id: "DE.BRAK_SPT.f441710b-d067-4d02-9aa9-cb325fba5265",
              name: "Rechtsanwalt Gabriele Kraus",
            },
          },
          {
            aktenzeichen: "B 2604 10/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d5d-b9e0-be57b9618257",
              safe_id: "DE.BRAK_SPT.ad2350fc-01e2-4574-9a50-2e243da65f1d",
              name: "Rechtsanwalt Dr. Benjamin Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-70c1-94ac-add912f7cf90",
    aktenzeichen_gericht: "I 1448 08/2026",
    status: "Erstellt",
    status_changed: "2025-05-26T14:54:48.03805Z",
    eingereicht_am: "2025-01-30T17:22:25.668342Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-7450-942e-43752c9f8e4f",
        name: "Wolfgang Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 1458 06/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-7fc1-8102-e2e57038e82c",
        name: "Friedrich Kübler",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 4014 08/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7c20-839b-35f629dd6143",
              safe_id: "DE.BRAK_SPT.b68e2f02-4f1f-4dee-98e1-2533cffb2711",
              name: "Dr. Helene Groß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2d-73b3-b5ba-cbfecd259611",
    aktenzeichen_gericht: "A 4515 09/2024",
    status: "Erstellt",
    status_changed: "2025-04-24T19:44:33.413319Z",
    eingereicht_am: "2025-01-23T21:28:20.643599Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2d-733b-8fd8-5aba67871e5b",
        name: "Johannes-Benedikt Albrecht von Löwenhügel",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 2822 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-70dd-8d0b-231efa3c9b1c",
              safe_id: "DE.BRAK_SPT.9b10be7b-a2b7-4f76-8f78-0594a8e73642",
              name: "Dr. Miriam Hölzer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2d-765f-9e2e-5d8ce6f8cf8a",
        name: "Paulina-Maria-Isabell von und zu Hohenstein-Weiß-Krüger-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 3246 12/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-713d-bf4b-5011c19880fd",
    aktenzeichen_gericht: "N 1683 02/2025",
    status: "Erstellt",
    status_changed: "2025-09-26T01:05:49.308732Z",
    eingereicht_am: "2025-01-02T15:35:55.525473Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2f-7843-b8b6-ac70b37e1ad4",
        name: "Benedikt Krämer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 8014 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7b4a-b4f9-9ab7a1a2784b",
              safe_id: "DE.BRAK_SPT.7ac25c8a-5b42-4bcd-934e-cca49d0299d6",
              name: "Dr. Andreas Krämer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2f-7b4b-9a03-ac7a80e3f4b6",
        name: "Andreas-Friedrich-Johannes von Hohenau-Krämer-Schönfeld-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 5090 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7aaa-81e0-001513bdd54c",
              safe_id: "DE.BRAK_SPT.0881de28-ce04-49ab-bfc7-9edff59ad7c5",
              name: "Dr. Johanna Groß",
            },
          },
          {
            aktenzeichen: "H 3578 01/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-71eb-ac2b-cffb7a79676e",
    aktenzeichen_gericht: "S 8099 06/2024",
    status: "Eingereicht",
    status_changed: "2024-12-22T07:16:58.659556Z",
    eingereicht_am: "2024-11-27T12:12:43.182487Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-71c7-b8e3-c3d2c6184538",
        name: "Stefan Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 8127 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-7e2c-8f1a-6b64ed4ea63b",
        name: "Tobias Möser",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 708 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7153-b038-ec8994dddc83",
              safe_id: "DE.BRAK_SPT.2e575396-4b72-4422-9e51-ff1e27a7ba47",
              name: "Rechtsanwalt Ludwig-Leopold Alexander von Schönberg-Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-7bf6-b49d-b086b2c8fbdc",
    aktenzeichen_gericht: "O 4201 04/2024",
    status: "Eingereicht",
    status_changed: "2025-01-24T05:28:55.901659Z",
    eingereicht_am: "2024-11-16T18:02:25.482291Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2f-72c6-92c7-b1a26b66f530",
        name: "Eurowings",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 8931 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7e59-8891-c719b027b99a",
              safe_id: "DE.BRAK_SPT.077a13f9-3334-4c15-b9d2-ffa82ca1dc98",
              name: "Rechtsanwalt Dr. Karl-Heinrich Ludwig von Hohenstein-Kranz",
            },
          },
          {
            aktenzeichen: "B 2485 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7750-ae6a-6b09c9b84c00",
              safe_id: "DE.BRAK_SPT.aeaaed10-cdeb-421d-a467-369b29bb38aa",
              name: "Dr. Cornelia Groß",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2f-7c26-81ef-5a0c8e8c5557",
        name: "Ferdinand-Julius Maximilian von Krämer-Höfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 7305 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7305-82ca-d1a6f02d0417",
              safe_id: "DE.BRAK_SPT.64231082-7cce-4e39-9635-c80bdcf9b26d",
              name: "Rechtsanwalt Andreas Groß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2e-7395-b940-896ea31cba2c",
    aktenzeichen_gericht: "C 8850 12/2024",
    status: "Erstellt",
    status_changed: "2025-01-06T09:57:31.323978Z",
    eingereicht_am: "2024-11-08T20:18:02.80842Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-7647-bb95-f54c20908c2b",
        name: "Anna-Maria-Luise von Hohenstein-Schwarzburg",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 7653 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7be4-9c29-a41ce5a7fa2e",
              safe_id: "DE.BRAK_SPT.6d82549d-8b8b-454b-a094-1a27a8b4e952",
              name: "Rechtsanwalt Dr. Laurenz Böhler",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-7b6b-a502-5cf7a7c6a423",
        name: "Friedrich-Wilhelm-Lukas-Maximilian von Großmann-Schäfer-Kühn-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b31-74ce-a206-3d8566a47135",
    aktenzeichen_gericht: "S 7307 08/2024",
    status: "Erstellt",
    status_changed: "2025-05-11T06:06:01.839007Z",
    eingereicht_am: "2024-10-30T18:57:05.561719Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-71c3-af61-9878a9953e01",
        name: "Alina-Mara Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 7035 01/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "M 3189 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7368-a796-506ce5788432",
              safe_id: "DE.BRAK_SPT.575917a7-b5d1-44a5-ba5b-2f02e20c295a",
              name: "Dr. Klaus Schäfer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b31-7761-aeaa-d18b8c05490f",
        name: "Jonas-Luca Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 5796 03/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-73c6-9be9-5f188022fe14",
    aktenzeichen_gericht: "R 7260 05/2025",
    status: "Eingereicht",
    status_changed: "2025-02-16T02:53:37.299598Z",
    eingereicht_am: "2024-09-28T12:28:16.280487Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-7b25-be10-90b212b8464b",
        name: "Johanna Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 652 04/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-7b71-81a1-3b1d88a59188",
        name: "Friedrich-Johannes-Karl von Bärenfels-Schön-Küster-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 2543 12/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-742c-9ff6-7c9d0b3f9270",
              safe_id: "DE.BRAK_SPT.bd2b9afb-69b9-4f7f-89af-f630558237b6",
              name: "Rechtsanwalt Tobias Möser",
            },
          },
          {
            aktenzeichen: "Z 2353 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7f28-8d28-e9a960083900",
              safe_id: "DE.BRAK_SPT.73fa03ef-e4da-4814-b33c-e696797f4bff",
              name: "Rechtsanwalt Johanna-Elisabeth-Maria von Krüger-Lösch",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-74cc-a5c7-81cf915656f5",
    aktenzeichen_gericht: "K 1627 10/2024",
    status: "Erstellt",
    status_changed: "2025-10-05T17:15:27.657822Z",
    eingereicht_am: "2024-09-20T14:05:48.064786Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-728b-b6c9-efc2eec89ee4",
        name: "Maximilian-Johann von und zu Falkenstein",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 1836 08/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-708e-b6c1-4dbdeef4c562",
              safe_id: "DE.BRAK_SPT.cf796ac6-7404-485d-b9c3-729c492ed0b8",
              name: "Dr. Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7e15-9e27-8921996617f7",
        name: "Markus Groß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 9352 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7f40-b1fd-328528ba272d",
              safe_id: "DE.BRAK_SPT.a41ba66e-8844-4bc7-9e72-c5cf5611d2d1",
              name: "Rechtsanwalt Alexander Höfer",
            },
          },
          {
            aktenzeichen: "C 6549 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-73fd-82bc-873a871408ed",
    aktenzeichen_gericht: "E 7886 01/2024",
    status: "Erstellt",
    status_changed: "2025-02-01T20:36:22.36386Z",
    eingereicht_am: "2024-09-05T02:33:31.638149Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-7e49-aba7-9f614c320e2d",
        name: "Tobias-Mara Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b36-7fea-ba16-0d610c4da6cb",
        name: "Julia-Maria Roth",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 8152 01/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-7b40-98cd-f5989887de6f",
    aktenzeichen_gericht: "W 1601 13/2026",
    status: "Erstellt",
    status_changed: "2025-06-11T12:07:12.598653Z",
    eingereicht_am: "2024-07-30T17:08:21.525692Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-7234-a411-b1dc6df64243",
        name: "Lena-Maria Böhm",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 821 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-799f-859b-ad0030bf554a",
              safe_id: "DE.BRAK_SPT.2fe828c8-230a-42a3-910b-e8a6eba4569c",
              name: "Dr. Katharina Böhm",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-7ed7-9e4e-75eb3f8ae9e8",
        name: "Leonhard Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b31-7da6-9182-516e00dcfe68",
    aktenzeichen_gericht: "H 8986 11/2026",
    status: "Eingereicht",
    status_changed: "2024-11-30T10:19:19.885765Z",
    eingereicht_am: "2024-07-27T12:34:22.731345Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-7293-ab22-4ef669633bd1",
        name: "Dieter-Maurer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b31-76be-a939-a1002b2011b7",
        name: "Tobias Schönfeld",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 2491 10/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2e-764a-9af1-478d97c3a1a6",
    aktenzeichen_gericht: "J 8557 12/2026",
    status: "Eingereicht",
    status_changed: "2025-02-09T18:00:24.421861Z",
    eingereicht_am: "2024-06-20T19:07:52.802379Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-78eb-8e7d-cd74fc150173",
        name: "Alexander Krug",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 8127 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7783-b7d9-595ea49c4ec8",
              safe_id: "DE.BRAK_SPT.bccb5ebf-df3e-4a6e-a168-8b3fbc77bb32",
              name: "Rechtsanwalt Dr. Friedrich-Wilhelm Günther von Schönfeld-Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-7ddf-9447-d8d23e63363c",
        name: "Matthias-Leonhard Theodor von Weißenthal",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 8365 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b31-7c2a-a582-1dc47e182bb2",
    aktenzeichen_gericht: "S 7160 06/2024",
    status: "Eingereicht",
    status_changed: "2024-12-27T22:17:26.40164Z",
    eingereicht_am: "2024-06-18T02:49:17.961088Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-7d41-b1a0-204e66023728",
        name: "Tobias-Matthias Alexander von Krämer-Böhler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 160 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7843-879b-a99ec2b5c164",
              safe_id: "DE.BRAK_SPT.3dc07e33-606d-49f9-9f8f-565c09d6c8fa",
              name: "Rechtsanwalt Dr. Helena-Sophie Amalia von Brückner-Weißmann",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7195-b539-eaf5c2a794a2",
        name: "Florian Brück",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 4965 02/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2e-77bb-a4e0-22615c770c7d",
    aktenzeichen_gericht: "F 3798 09/2026",
    status: "Erstellt",
    status_changed: "2025-10-29T04:08:54.474007Z",
    eingereicht_am: "2024-05-14T01:19:32.79808Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-7985-99b0-7e8131836866",
        name: "Lufthansa",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 9193 03/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7505-aa6c-a4f281cf7194",
              safe_id: "DE.BRAK_SPT.5f535007-0e06-4c53-8ec4-b07f10560174",
              name: "Rechtsanwalt Anna-Maria-Luise von Hohenstein-Schwarzburg",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-7bbe-996d-3171d1b2e9bc",
        name: "Emilia-Charlotte Freifrau von Löwenstein-Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 3321 02/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-79bc-a569-053043a02ba1",
    aktenzeichen_gericht: "M 4695 04/2024",
    status: "Eingereicht",
    status_changed: "2024-12-26T16:27:36.595634Z",
    eingereicht_am: "2024-04-10T10:40:11.44816Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-728c-91dc-71be9aebfd59",
        name: "Klaus Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 5059 07/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7e61-bd15-fef49a678bef",
              safe_id: "DE.BRAK_SPT.6007f82b-d8c8-4ad0-a36e-83215efcee95",
              name: "Dr. Annemarie Scholz",
            },
          },
          {
            aktenzeichen: "H 5019 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-74e3-b190-628d03213d70",
              safe_id: "DE.BRAK_SPT.dd3cc80c-b772-47e3-a52b-d1817256267f",
              name: "Rechtsanwalt Benedikt Weiß",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-7ca4-8d62-c5e6c3549f86",
        name: "Claudia-Maria-Theresia Gräfin von Großwald",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 1666 01/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-7631-bc28-01dc78f79e33",
    aktenzeichen_gericht: "Z 9028 07/2024",
    status: "Eingereicht",
    status_changed: "2025-08-21T09:52:17.830603Z",
    eingereicht_am: "2024-03-27T06:17:37.955091Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2f-7328-8293-1bae7975a6ec",
        name: "Anna-Maria-Katharina-Elisabeth von Löwenstein-Kranz-Schäfer-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 8831 08/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2f-7b32-8546-a50c7a5f3d8f",
        name: "Ben-Luca Möller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 9268 03/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-7fa2-86cf-411d7dae6391",
    aktenzeichen_gericht: "K 6800 11/2025",
    status: "Eingereicht",
    status_changed: "2025-03-06T20:37:42.324864Z",
    eingereicht_am: "2024-01-28T22:51:57.14517Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-7cdf-9655-8b7ec623eaa7",
        name: "Benedikt-Leonhard-Maximilian von Krüger-Brückner-Weiß-Schäfer-Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 1282 08/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7eee-8995-39adfbe87397",
        name: "Kathrin Hölzer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 2587 13/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-7640-b9b1-29e6ecbcd3dc",
    aktenzeichen_gericht: "H 2741 11/2025",
    status: "Erstellt",
    status_changed: "2025-11-09T23:07:28.48894Z",
    eingereicht_am: "2024-01-13T23:08:32.693477Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-73f7-855c-bd6fbd20dc16",
        name: "Carina-Lena Roth",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 8095 09/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-7b19-abdb-adef62c44e3f",
        name: "Florian Bär",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 6666 12/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-7d66-93f4-61ce0324bdfe",
    aktenzeichen_gericht: "S 9981 13/2024",
    status: "Eingereicht",
    status_changed: "2025-06-12T13:37:57.744684Z",
    eingereicht_am: "2023-12-31T09:31:56.36883Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-714a-95b7-3c7f43ee722c",
        name: "Alina-Theresa Viktoria von der Grünenau",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 8091 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-760e-b37e-78e426914052",
              safe_id: "DE.BRAK_SPT.0b8b13fa-9db4-44ca-a4f6-330e6e0d1573",
              name: "Dr. Fabian Weißmann",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7b2c-a573-8b7354d7dcc3",
        name: "Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 8792 13/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7250-97cc-716960f003c1",
              safe_id: "DE.BRAK_SPT.7801ac24-5925-47a0-b4f9-396005fb0f62",
              name: "Rechtsanwalt Dr. Christoph Weiß",
            },
          },
          {
            aktenzeichen: "S 2109 01/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b37-7076-915b-811b6617c0fc",
    aktenzeichen_gericht: "G 6956 12/2025",
    status: "Erstellt",
    status_changed: "2025-03-13T11:26:21.679614Z",
    eingereicht_am: "2023-12-28T23:27:50.207501Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b37-70da-b808-3e08bbbc5161",
        name: "Sabine Großmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 1710 06/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b37-7415-b228-29f9fa786c9a",
        name: "Andreas Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 4704 06/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-75e9-abc5-27915b00ce5d",
    aktenzeichen_gericht: "M 7869 10/2024",
    status: "Eingereicht",
    status_changed: "2025-07-29T03:20:39.933693Z",
    eingereicht_am: "2023-12-26T11:44:27.617535Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-7294-856b-f1e93f505a7e",
        name: "Laurenz Böhler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 1685 04/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7cef-81e3-06cdfc37c569",
        name: "Miriam Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 961 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7053-9161-075a553546d2",
              safe_id: "DE.BRAK_SPT.519d5510-f509-442f-835c-828707f25852",
              name: "Rechtsanwalt Dr. Helene-Mara Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-70a0-8b9c-5e1b1e6665e3",
    aktenzeichen_gericht: "G 9943 01/2026",
    status: "Erstellt",
    status_changed: "2025-02-24T14:29:08.343981Z",
    eingereicht_am: "2023-12-19T01:49:15.211784Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-7646-9d5a-c0295ccad225",
        name: "Klara-Louise Braun",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 524 11/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7071-9615-cde4879918bc",
              safe_id: "DE.BRAK_SPT.79a17931-31a3-4b67-a240-52e7968fa89f",
              name: "Rechtsanwalt Matthias Weiß",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-7ab7-bf92-476acadd02e8",
        name: "Miriam Hölzer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 2359 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-751a-96ad-9bc8066f1cbe",
              safe_id: "DE.BRAK_SPT.bc88008d-20ae-4b31-8080-303220e01a00",
              name: "Rechtsanwalt Dr. Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
            },
          },
          {
            aktenzeichen: "X 3319 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d1b-88b2-7ef934b72ab5",
              safe_id: "DE.BRAK_SPT.52276b8b-ad66-48b6-9dba-ab319e2fb65f",
              name: "Rechtsanwalt Sebastian Kranz",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b37-77f1-815b-b08d9c9b6fca",
    aktenzeichen_gericht: "I 1166 05/2025",
    status: "Eingereicht",
    status_changed: "2025-07-09T01:25:50.140969Z",
    eingereicht_am: "2023-12-16T09:28:43.576661Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b37-78d5-a79a-3f245df2e3a4",
        name: "Melanie Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 3963 08/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b37-7aab-8d7c-1758a2b873f7",
        name: "Air Berlin",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b2e-79b8-9068-bdb366370b1e",
    aktenzeichen_gericht: "X 3383 04/2024",
    status: "Eingereicht",
    status_changed: "2025-04-07T14:43:56.85344Z",
    eingereicht_am: "2023-11-18T21:44:29.164947Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-7461-b288-847030013b40",
        name: "Elisabeth Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b2e-78b5-9cb6-6c2040a188e4",
        name: "Miriam-Luise Ott",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 560 10/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2e-7ef7-95c8-cea1e9e8913d",
    aktenzeichen_gericht: "D 6088 05/2024",
    status: "Erstellt",
    status_changed: "2025-07-08T17:26:41.856075Z",
    eingereicht_am: "2023-11-17T02:02:22.743454Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-765f-a9bc-7538d2095fc2",
        name: "Katharina Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 5254 02/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7309-94f4-8d6e3b12cc97",
              safe_id: "DE.BRAK_SPT.9e9282fa-7a9e-4d26-8e4c-fa542d3f3700",
              name: "Rechtsanwalt Dr. Emilia Kühn",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-767a-b0a7-e13308e37e34",
        name: "Tobias Groß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 7727 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7ad7-b9f4-9086ab48f5ab",
              safe_id: "DE.BRAK_SPT.3c2c9543-7f5a-4c1b-bd13-5c59043b1fdd",
              name: "Rechtsanwalt Dr. Elisabeth Köhn",
            },
          },
          {
            aktenzeichen: "D 4629 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-76d9-ad49-d44603be9cac",
              safe_id: "DE.BRAK_SPT.4aaa1fe3-eed8-4ccc-ba19-3026107eec1d",
              name: "Rechtsanwalt Dr. Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2c-75da-b1b4-4d8852bfa766",
    aktenzeichen_gericht: "K 1944 12/2025",
    status: "Erstellt",
    status_changed: "2025-10-01T10:56:42.958199Z",
    eingereicht_am: "2023-10-18T10:08:14.030387Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2d-7000-8b88-aba2eedc6319",
        name: "Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 1285 07/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-7042-ad32-c12ab0f7af8f",
              safe_id: "DE.BRAK_SPT.2c720728-1b56-4bff-8ec6-715c9e9eeb59",
              name: "Dr. Günther Weißmann",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2d-79bd-a2e9-0358b95c6026",
        name: "Janina Müller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 3404 02/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b31-774f-8da9-95bbb79c8384",
    aktenzeichen_gericht: "X 3189 13/2024",
    status: "Erstellt",
    status_changed: "2025-08-31T04:10:28.417685Z",
    eingereicht_am: "2023-10-17T13:15:48.86905Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-7507-8624-1afbe75fcc15",
        name: "Benjamin Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b31-7c5b-bafc-4e0c09bd1086",
        name: "Franziska-Madeleine von Hohenlohe-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 5186 07/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7186-99c7-84e43d8c3a85",
              safe_id: "DE.BRAK_SPT.00b40b55-1566-4057-8a99-e8e15c7024e6",
              name: "Rechtsanwalt Stefan Kranz",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2e-72fa-aca2-316c732d809a",
    aktenzeichen_gericht: "I 8508 08/2026",
    status: "Erstellt",
    status_changed: "2025-07-21T21:42:03.124743Z",
    eingereicht_am: "2023-10-06T14:37:23.40174Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-7e70-8de4-16675eabacfb",
        name: "Alexander Brück",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 3889 04/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-7e93-b461-4e79bdcc05db",
        name: "Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b32-7f7b-bda7-043ef2402b23",
    aktenzeichen_gericht: "J 9645 11/2024",
    status: "Erstellt",
    status_changed: "2025-01-29T10:15:06.631748Z",
    eingereicht_am: "2023-09-24T15:38:17.468629Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-7575-9b80-635f7e00ea43",
        name: "Elisabeth Köhn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 6926 11/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7911-9f5e-4bb0eb947a42",
        name: "Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 4685 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7dd1-b604-6c1cf944803c",
              safe_id: "DE.BRAK_SPT.7efc18f7-daa8-4f25-b7c7-c63310ae975e",
              name: "Rechtsanwalt Tobias-Ferdinand Karl-Heinz von Römerstein",
            },
          },
          {
            aktenzeichen: "L 5787 04/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b37-768f-a445-ac9abdca52e2",
    aktenzeichen_gericht: "W 7928 13/2024",
    status: "Erstellt",
    status_changed: "2024-12-15T11:40:58.158317Z",
    eingereicht_am: "2023-08-29T12:58:08.697733Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b38-72e6-b856-24a4749495c0",
        name: "Friedrich-Alexander-Johannes von Hohenstein-Bär-Krüger-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b38-76a0-8f4b-20b8db69b5ab",
        name: "Andrea-Lena Vogt",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 4551 10/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b31-7dd6-98d3-37cca98e2621",
    aktenzeichen_gericht: "Q 4735 11/2024",
    status: "Erstellt",
    status_changed: "2025-03-19T00:26:53.812975Z",
    eingereicht_am: "2023-08-29T01:09:12.195889Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-7428-b6e3-9879971ba912",
        name: "Johanna Großmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 1201 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b31-78bf-8372-49544c278645",
        name: "Johanna Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 2938 12/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-78d9-bafe-28da5a703902",
    aktenzeichen_gericht: "Q 562 03/2024",
    status: "Erstellt",
    status_changed: "2025-02-22T12:12:17.930934Z",
    eingereicht_am: "2023-06-21T13:18:43.604178Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-7549-b3df-daaecbd7a640",
        name: "Paula-Lina Bär",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 439 08/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7f80-ab7c-9425854c5725",
        name: "Johanna Groß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 3028 01/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-7598-8d53-6988d51b8377",
    aktenzeichen_gericht: "T 3896 08/2024",
    status: "Erstellt",
    status_changed: "2025-09-18T05:27:05.033471Z",
    eingereicht_am: "2023-05-07T02:00:21.480493Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-7e0d-8583-44070c9f5ebd",
        name: "Elisa-Luise Roth",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 4788 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7496-897c-4e4443162223",
              safe_id: "DE.BRAK_SPT.2842e3de-8c0d-41af-8613-fd789b90cbaf",
              name: "Rechtsanwalt Tobias Schönfeld",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-7e7a-88ed-f47f814b1e6f",
        name: "Christoph Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 3546 09/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-7e44-b51b-3a3213be0b32",
    aktenzeichen_gericht: "H 4953 02/2025",
    status: "Erstellt",
    status_changed: "2025-02-03T06:42:53.879545Z",
    eingereicht_am: "2023-04-29T10:47:46.167285Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-71ce-a920-93297d32fdff",
        name: "Johanna-Marie-Isabell-Elisa von Weißmann-Hölzer-Kranz-Schönfeld",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 9482 08/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7787-8ded-64418654c791",
        name: "Anna-Lena-Marie von Schönbrunn-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 6139 02/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-7d57-9a99-04ae6108f6ff",
    aktenzeichen_gericht: "H 932 01/2026",
    status: "Erstellt",
    status_changed: "2025-10-25T00:29:28.022594Z",
    eingereicht_am: "2023-04-20T02:19:41.017775Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-72e3-b906-08edc5bc314d",
        name: "Leonhard Höfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 8202 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7395-a476-023bffe4904d",
              safe_id: "DE.BRAK_SPT.6d745d61-451d-44a4-bc27-7ed05e10fe36",
              name: "Rechtsanwalt Alexander-Theodor Benjamin von Küster-Braun",
            },
          },
          {
            aktenzeichen: "Z 6877 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7a20-aa11-83453beed2a2",
              safe_id: "DE.BRAK_SPT.4fa6d741-7703-417f-8f04-b0288e5e3e12",
              name: "Rechtsanwalt Katharina-Elisabeth von der Hohenau-Müller",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-7d42-84d1-b4a63aece4be",
        name: "Timo-Milan Ott",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 1289 10/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-7c23-be18-08f25176f1e2",
    aktenzeichen_gericht: "G 6006 09/2024",
    status: "Eingereicht",
    status_changed: "2025-05-05T18:10:33.881104Z",
    eingereicht_am: "2023-03-27T01:05:49.327077Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-77b6-a27c-baee7938123c",
        name: "Luisa-Maria Roth",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 9953 12/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7870-9300-f3b92ab5d306",
        name: "Katharina-Marie-Elisabeth von Hohenstein-Bärenwald-Krüger-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 2667 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7767-ab19-cb345c9aa8bb",
              safe_id: "DE.BRAK_SPT.9541db14-27fa-4b71-b43b-732c43987020",
              name: "Rechtsanwalt Dr. Ben-Luca Möller",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b31-7130-bfdc-bb2151279549",
    aktenzeichen_gericht: "U 6470 11/2025",
    status: "Erstellt",
    status_changed: "2025-11-11T18:01:52.604238Z",
    eingereicht_am: "2023-03-25T04:00:10.254153Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-704a-901c-606263e13e66",
        name: "Markus Höhn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 1746 12/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-71af-b9e1-dbe04466fea3",
              safe_id: "DE.BRAK_SPT.55f6d9de-da3b-4591-8f58-7067a390aab7",
              name: "Rechtsanwalt Daniela Brück",
            },
          },
        ],
      },
      {
        id: "019aa757-2b31-7c59-b092-078ca79ed54a",
        name: "Katharina Böhm",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 1131 12/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7ee2-974f-800a2dbc5278",
              safe_id: "DE.BRAK_SPT.4c645541-a637-440b-a366-7a4f5866d246",
              name: "Rechtsanwalt Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2e-7ba8-a479-d560b448eb58",
    aktenzeichen_gericht: "X 1878 03/2024",
    status: "Erstellt",
    status_changed: "2024-11-22T06:59:46.466679Z",
    eingereicht_am: "2023-02-27T20:18:52.818735Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2e-79f8-b507-a3a7f286942c",
        name: "Dieter Mönch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 1511 02/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7246-9d2e-c306728f018f",
              safe_id: "DE.BRAK_SPT.28ad4beb-cf88-4ac1-9d33-13d44a52e7e6",
              name: "Rechtsanwalt Dr. Christina Höfer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2e-7fe4-afe5-390f5e1cda4c",
        name: "Matthias Böhler",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 2809 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7024-8393-10d5595ed59a",
              safe_id: "DE.BRAK_SPT.8ed75643-c44d-4213-a459-f3689ed1824e",
              name: "Dr. Paulina Krüger",
            },
          },
          {
            aktenzeichen: "T 3795 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7c25-9a1a-fd8c97a6b5b4",
              safe_id: "DE.BRAK_SPT.839a11c0-7163-4b1c-8f9b-d921f5ac70c7",
              name: "Rechtsanwalt Clara-Louise-Friederike von Brück-Köhler",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-72b5-bd0e-2b891f728a63",
    aktenzeichen_gericht: "P 9429 12/2026",
    status: "Erstellt",
    status_changed: "2025-04-22T01:05:54.662569Z",
    eingereicht_am: "2023-02-27T12:49:49.790192Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-7233-976e-5d794bb402b6",
        name: "Johannes-Friedrich von und zu Bärenburg",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 1931 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7d08-a618-953e770f8815",
        name: "Florian Lösch",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 1664 06/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-799a-b644-a8b212f28d1d",
              safe_id: "DE.BRAK_SPT.6fd9da1b-280f-4338-bc1c-139b48ee41ca",
              name: "Rechtsanwalt Dr. Carola Münch",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-7110-9a70-b811a8d94e2d",
    aktenzeichen_gericht: "J 7510 01/2025",
    status: "Eingereicht",
    status_changed: "2025-11-18T03:37:21.856477Z",
    eingereicht_am: "2023-02-17T23:55:25.845281Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-7165-b134-9d5ecdda5b46",
        name: "Helene-Isabell-Theresa von Weißmann-Kühn-Schäfer-Bärenfels",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 7819 06/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bf5-936a-11764265952d",
              safe_id: "DE.BRAK_SPT.c7e5e31d-92f6-4710-93e0-0e6f3d984e1d",
              name: "Rechtsanwalt Dr. Fabian Weiß",
            },
          },
          {
            aktenzeichen: "G 4353 04/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7a76-8555-327c533a6472",
        name: "Elisa-Maria Voigt",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 1098 13/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b31-7d60-b22f-22359c4d1363",
    aktenzeichen_gericht: "J 4976 07/2025",
    status: "Erstellt",
    status_changed: "2025-04-02T19:19:56.53721Z",
    eingereicht_am: "2023-02-05T09:53:05.378171Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-75cc-9214-c0e4c45e7914",
        name: "Matthias-Friedrich-Wilhelm von Löwenstein-Krüger-Schäfer-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 8305 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d15-b811-cd4191a4752a",
              safe_id: "DE.BRAK_SPT.35812061-57d0-4f13-8dfb-df8b9fee3e58",
              name: "Dr. Benedikt-Lorenz von Löwenau-Schönfeld",
            },
          },
        ],
      },
      {
        id: "019aa757-2b31-7668-9ed6-e4128e37e4ff",
        name: "Marcel Küster",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 2789 12/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7571-ae15-569b8b0e2aa6",
              safe_id: "DE.BRAK_SPT.3bd11e7f-b79b-4617-8870-488bb8464308",
              name: "Rechtsanwalt Claudia-Maria-Theresia Gräfin von Großwald",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b38-7001-9505-f929bdd8f556",
    aktenzeichen_gericht: "R 684 13/2024",
    status: "Eingereicht",
    status_changed: "2025-07-29T22:59:16.254843Z",
    eingereicht_am: "2023-02-04T07:19:56.142567Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b38-7183-a338-e704b45f7d1d",
        name: "Karl-Heinrich Ludwig von Hohenstein-Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 5850 07/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b38-773d-9189-2efacf4dced4",
        name: "Sebastian Löhr",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 633 04/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2af3-7be8-bc43-72ce43829e66",
    aktenzeichen_gericht: "V 8990 09/2026",
    status: "Eingereicht",
    status_changed: "2025-04-10T22:36:38.028354Z",
    eingereicht_am: "2023-01-08T07:13:31.095397Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b0b-776e-8529-8c21a652541e",
        name: "Gabriele Kraus",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 7331 03/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b23-7021-a129-8bcdd1e54caa",
        name: "TUI Fly",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b36-75fc-aa97-73708bcf3e50",
    aktenzeichen_gericht: "O 9358 10/2025",
    status: "Erstellt",
    status_changed: "2025-07-03T04:07:40.628336Z",
    eingereicht_am: "2023-01-06T22:32:21.326609Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-7842-9863-608192d4f807",
        name: "Tobias-Maurer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 2319 10/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7aec-9e01-6323b1cfa5e5",
        name: "Helene-Mara Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 5055 11/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-77f5-86b4-800d0f51cb12",
              safe_id: "DE.BRAK_SPT.deaa8f98-4671-4500-8a27-ee7a82d17c4c",
              name: "Dr. Matthias Lösch",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-7e2a-8f2a-448b45c51a78",
    aktenzeichen_gericht: "S 7098 09/2025",
    status: "Erstellt",
    status_changed: "2025-06-25T11:02:10.928204Z",
    eingereicht_am: "2022-12-20T18:12:32.528428Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-73ab-9fc8-f034b2d8d3b6",
        name: "Johanna Kübler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 4928 11/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-771d-b305-61872a8808a1",
              safe_id: "DE.BRAK_SPT.3da0dedd-22b1-4af4-b399-f321028b4204",
              name: "Rechtsanwalt Tobias Hölzer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-770e-809f-ff6078b8e6bd",
        name: "Air Berlin",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 2881 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-764d-bff0-e1806924d76d",
              safe_id: "DE.BRAK_SPT.6f003a0d-ac5f-48d6-b04f-fe4659f42f56",
              name: "Rechtsanwalt Benedikt Krämer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-703c-8f81-d865be2b3457",
    aktenzeichen_gericht: "K 7098 13/2026",
    status: "Erstellt",
    status_changed: "2025-08-19T01:40:20.190998Z",
    eingereicht_am: "2022-12-20T17:36:49.59336Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-71d5-b416-b8907f92d271",
        name: "Sabine-Christina von und zu Großwald-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 3313 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7745-968a-7b5b00e2498c",
              safe_id: "DE.BRAK_SPT.3492c35a-b333-4f4c-ab79-9ec49137f5fd",
              name: "Rechtsanwalt Nina Schäfer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-7aa2-8e63-a20b858d25a0",
        name: "Helene Bär",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b33-7d52-8ba8-fafc3bcc2f02",
    aktenzeichen_gericht: "U 835 10/2024",
    status: "Eingereicht",
    status_changed: "2025-11-19T12:59:11.467752Z",
    eingereicht_am: "2022-11-22T13:24:57.350831Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-702f-aa95-8ce9eefa74fd",
        name: "Dieter Böhm",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 4992 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7dc2-a58f-663d5675f761",
              safe_id: "DE.BRAK_SPT.9fba0990-ae65-4bef-9eb8-b9b1b9d194f8",
              name: "Rechtsanwalt Dr. Sabine Großmann",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-769e-bb48-e6319d022117",
        name: "Alexander-Theodor Benjamin von Küster-Braun",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 4271 06/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-7819-921f-f0bab9dfaaa0",
    aktenzeichen_gericht: "F 1816 10/2024",
    status: "Erstellt",
    status_changed: "2025-06-24T17:57:50.571543Z",
    eingereicht_am: "2022-10-27T12:32:32.399489Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-7ce7-9cb1-c2ba19237960",
        name: "Alina-Maria Krug",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 3995 13/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7c10-8690-306044f5a637",
              safe_id: "DE.BRAK_SPT.b523630a-fb1e-4ad7-b1ba-ab366abbeed4",
              name: "Rechtsanwalt Alina-Theresa Viktoria von der Grünenau",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7df6-bc89-0933e80fc6ce",
        name: "Marie-Louise Ott",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 1393 11/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-74de-ae36-0e393bf635a4",
    aktenzeichen_gericht: "E 7730 11/2025",
    status: "Erstellt",
    status_changed: "2025-01-23T06:35:14.06136Z",
    eingereicht_am: "2022-10-22T15:20:58.020778Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2f-7d8d-a384-5fea0ac1bb93",
        name: "Johanna-Lina Böhm",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b2f-7f66-80e6-28b8c5d7576f",
        name: "Alexander Höfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 5695 09/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-795b-870a-fdb7ba047a66",
    aktenzeichen_gericht: "X 8250 05/2024",
    status: "Erstellt",
    status_changed: "2025-05-31T22:45:19.120086Z",
    eingereicht_am: "2022-10-05T16:43:19.340128Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-75fc-895c-83a17ef23201",
        name: "Dieter Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 4501 05/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-7d8c-838e-64685d8f868f",
        name: "Matthias Köhn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 886 09/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-712e-b67d-5ee37780acae",
    aktenzeichen_gericht: "G 4232 05/2026",
    status: "Erstellt",
    status_changed: "2025-02-12T20:17:12.375878Z",
    eingereicht_am: "2022-09-17T12:47:44.18436Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-7186-b248-515cc79162fd",
        name: "Friedrich-Wilhelm Günther von Schönfeld-Krüger",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 6491 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-744d-b705-74c6e188674a",
              safe_id: "DE.BRAK_SPT.bcb218f8-44dc-4ec0-9522-029a227cc097",
              name: "Rechtsanwalt Dr. Markus Lösch",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7491-a8c3-451a04a3894f",
        name: "Anna-Lena Krug",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b34-79b8-ad75-c74866d432df",
    aktenzeichen_gericht: "W 5001 04/2026",
    status: "Erstellt",
    status_changed: "2025-02-21T11:44:10.701646Z",
    eingereicht_am: "2022-09-06T22:39:26.883584Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-7ab4-9182-4f338bd5f867",
        name: "Markus Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 8181 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-70ae-b321-e59ce257277a",
              safe_id: "DE.BRAK_SPT.58060767-e984-4ce9-8b7e-e14f7203774c",
              name: "Dr. Marie-Louise Ott",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-7d4c-b825-8940658731fb",
        name: "Emilia Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 2407 06/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-7d7d-87e9-2afedac002ba",
    aktenzeichen_gericht: "X 9074 05/2024",
    status: "Eingereicht",
    status_changed: "2025-08-01T18:56:21.860234Z",
    eingereicht_am: "2022-08-29T18:03:16.527238Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-740d-ab16-2c5969cc85ae",
        name: "Günther Weißmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 9260 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-754f-a424-5414fe86c17e",
              safe_id: "DE.BRAK_SPT.61c53a7a-a88f-4d09-8b39-2c8b00099bd1",
              name: "Dr. Jonas Kübler",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-758a-b2d5-7ba0c7515746",
        name: "Lufthansa",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 2311 03/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7fac-a4ef-58168f68168f",
              safe_id: "DE.BRAK_SPT.47144281-05ce-43a5-a254-6494e36d2976",
              name: "Dr. Ferdinand-Julius Maximilian von Krämer-Höfer",
            },
          },
          {
            aktenzeichen: "Y 504 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7e32-b9f6-9e083012e12d",
              safe_id: "DE.BRAK_SPT.c4b96a8a-4a63-416a-8dd2-6a5a00ae3b2f",
              name: "Dr. Klara-Louise Braun",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-7599-b8f9-c23e20d16bfe",
    aktenzeichen_gericht: "Q 4211 02/2026",
    status: "Erstellt",
    status_changed: "2025-03-05T17:57:25.97022Z",
    eingereicht_am: "2022-08-15T06:37:44.632379Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2f-75fb-967d-b6011a5f6d46",
        name: "Eurowings",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 7566 06/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2f-7d2b-b173-e6296ad998d8",
        name: "Ludwig-Leopold Alexander von Schönberg-Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 7603 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d21-a404-bea3b68c361b",
              safe_id: "DE.BRAK_SPT.2198b2bc-ccab-4805-bbbb-ab815e6698c5",
              name: "Rechtsanwalt Tobias-Matthias Alexander von Krämer-Böhler",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b38-7f6c-afa2-564f726e4531",
    aktenzeichen_gericht: "C 1920 05/2024",
    status: "Erstellt",
    status_changed: "2025-04-21T01:21:15.816347Z",
    eingereicht_am: "2022-07-17T00:15:31.412537Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b38-775c-9959-ecee209f55f3",
        name: "Condor",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b38-7829-a697-054c0cfa157d",
        name: "Tobias Löhr",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 1950 09/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-7964-8246-5a026a339192",
    aktenzeichen_gericht: "L 9937 05/2026",
    status: "Eingereicht",
    status_changed: "2025-04-23T02:37:56.731507Z",
    eingereicht_am: "2022-06-11T06:44:21.991197Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-7bbc-b1af-b2c2c924576d",
        name: "Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 1307 07/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "S 6560 08/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7be4-86e5-186066686b72",
              safe_id: "DE.BRAK_SPT.37b05118-94c1-4286-8b9f-e41a681a04e3",
              name: "Rechtsanwalt Friedrich-Alexander-Johannes von Hohenstein-Bär-Krüger-Schäfer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-7bc3-83bd-a5a841ec32e5",
        name: "Helene-Marie Augusta von Schwanenburg-Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 3456 05/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-7adf-8cc6-c94059e23ea1",
    aktenzeichen_gericht: "T 7587 09/2026",
    status: "Erstellt",
    status_changed: "2025-02-18T01:34:50.530296Z",
    eingereicht_am: "2022-05-05T02:51:55.140051Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-7558-ad8d-f361c063bea1",
        name: "Ryanair",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 3247 01/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-7bf7-b2a0-4a591d071fe4",
        name: "Fabian Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 8192 05/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-736e-a82f-b2a4634268f6",
    aktenzeichen_gericht: "Q 8138 10/2026",
    status: "Eingereicht",
    status_changed: "2024-12-01T23:28:03.143818Z",
    eingereicht_am: "2022-03-27T17:28:55.936Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2f-7ca5-b4bb-060501963341",
        name: "Franziska Müller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 1513 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f0a-b83a-1a691234c8ba",
              safe_id: "DE.BRAK_SPT.22381726-b17f-4d86-bfc2-80995b0df4fd",
              name: "Rechtsanwalt Dr. Sabine Schäfer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2f-7dc2-903e-3735563ed8d2",
        name: "Patrick Löhr",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b33-7de2-a1ac-d0d36b735260",
    aktenzeichen_gericht: "F 9824 04/2026",
    status: "Erstellt",
    status_changed: "2025-01-23T07:02:41.705518Z",
    eingereicht_am: "2022-03-13T18:32:22.528094Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-745a-b6d5-e2994f1c49a1",
        name: "Florian Schön",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 8176 07/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f9a-9a5d-a3ef160609f5",
              safe_id: "DE.BRAK_SPT.d303ac6f-240e-4d48-8fd9-9fc07d28fe58",
              name: "Dr. Alina-Mara Kühn",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-7b34-a47c-d6fc7d4c9194",
        name: "Air Berlin",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 136 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7fa9-bae8-178d7e26fd5f",
              safe_id: "DE.BRAK_SPT.3dfeef6a-48af-495e-844a-4bc4dba382f7",
              name: "Rechtsanwalt Dr. Miriam Krüger",
            },
          },
          {
            aktenzeichen: "V 476 07/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7efa-8d6b-ddb6ef505a97",
              safe_id: "DE.BRAK_SPT.ad742edd-39bb-407a-b9de-9eed81525b3c",
              name: "Dr. Markus Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b37-75ec-9b7b-88ee5ff7e4f5",
    aktenzeichen_gericht: "I 6775 01/2024",
    status: "Eingereicht",
    status_changed: "2025-05-25T04:39:48.024918Z",
    eingereicht_am: "2022-03-02T14:05:07.954366Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b37-724e-b1a8-e6e93050ed3f",
        name: "Sabine Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 5559 05/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b37-7ff8-b1fc-9b26094501e6",
        name: "Nina Kranz",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 1722 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-756d-9881-8c49f6f1319f",
              safe_id: "DE.BRAK_SPT.57ed0a91-981f-4f36-8e74-4a45be37babc",
              name: "Rechtsanwalt Dr. Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
            },
          },
          {
            aktenzeichen: "D 8193 07/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bbe-a327-13ddad6980dd",
              safe_id: "DE.BRAK_SPT.675ddb29-d910-4c6e-ba51-7fd8ce7bddfa",
              name: "Rechtsanwalt Fabian Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-7594-82f4-d28c0777ea10",
    aktenzeichen_gericht: "S 3823 04/2026",
    status: "Erstellt",
    status_changed: "2025-09-21T07:28:54.050912Z",
    eingereicht_am: "2022-02-18T14:16:28.298243Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-75cd-a788-d3e3d6090964",
        name: "Julius Krämer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 9171 03/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7c69-a53e-928bf06e3cca",
        name: "Condor",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 3961 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7217-b50a-7d74fd8cf09d",
              safe_id: "DE.BRAK_SPT.41f98142-9db1-4aaf-a631-084f78bfb79d",
              name: "Rechtsanwalt Dr. Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
            },
          },
          {
            aktenzeichen: "F 1069 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-78d3-9a92-3859048c3a22",
              safe_id: "DE.BRAK_SPT.ff2ad61d-87cf-428c-9e8e-2365e95d3cf1",
              name: "Rechtsanwalt Patrick Löhr",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-7b1f-99ca-fed01188271a",
    aktenzeichen_gericht: "N 1929 13/2024",
    status: "Erstellt",
    status_changed: "2025-01-22T19:24:58.24061Z",
    eingereicht_am: "2022-01-10T05:40:22.484221Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-76e5-80ed-792a1c220966",
        name: "Johanna-Elisabeth-Maria von Krüger-Lösch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 8917 10/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-716c-ae44-4fbbc68bf4d4",
              safe_id: "DE.BRAK_SPT.4010f47d-c880-41d5-a404-690c9a36df43",
              name: "Dr. Paula-Lina Bär",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-7da1-82f7-cba870c3a001",
        name: "Christina Höfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 5866 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7838-9cf8-0ddccc740739",
              safe_id: "DE.BRAK_SPT.bc2f3271-9045-4663-bb92-b9462c2705ae",
              name: "Rechtsanwalt Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b31-747c-abaf-5ee06835468b",
    aktenzeichen_gericht: "O 7949 03/2024",
    status: "Eingereicht",
    status_changed: "2025-04-13T11:00:49.22475Z",
    eingereicht_am: "2022-01-04T20:01:59.527177Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-700c-9d50-80bf953446df",
        name: "Benedikt-Lorenz von Löwenau-Schönfeld",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 2110 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-79dd-86e0-6bf44bcf0c89",
              safe_id: "DE.BRAK_SPT.fa542d69-0b3b-4630-9ae9-af30ee99d421",
              name: "Rechtsanwalt Dr. Johanna Großmann",
            },
          },
        ],
      },
      {
        id: "019aa757-2b31-788c-84d9-4dea95ed3079",
        name: "Condor",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 8540 02/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-7fe5-a5a8-18b99767be5c",
              safe_id: "DE.BRAK_SPT.e6781d7e-c5a3-4258-995b-48d204e2cc86",
              name: "Rechtsanwalt Katharina Weiß",
            },
          },
          {
            aktenzeichen: "D 7236 07/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-7ffe-bae8-1311411c59e7",
    aktenzeichen_gericht: "Q 6564 07/2024",
    status: "Eingereicht",
    status_changed: "2024-12-28T18:12:20.475178Z",
    eingereicht_am: "2021-11-17T12:55:57.51661Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-7837-8a30-4881d0ee2648",
        name: "Leonhard-Sebastian Philipp von Möser-Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 6783 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-737a-a28d-f7a0cb19584b",
              safe_id: "DE.BRAK_SPT.5ed13414-1652-4cad-87d1-218507269889",
              name: "Rechtsanwalt Johanna-Marie-Isabell-Elisa von Weißmann-Hölzer-Kranz-Schönfeld",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7986-8186-6eeca859d99b",
        name: "Lufthansa",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 9787 01/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2f-7865-aa6b-117781f7fd23",
    aktenzeichen_gericht: "F 4508 05/2024",
    status: "Erstellt",
    status_changed: "2025-11-16T11:41:59.717925Z",
    eingereicht_am: "2021-11-09T15:24:41.772028Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2f-762e-8380-4ad16c21013f",
        name: "Theresa Krug",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 1503 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7612-8e68-d392be119978",
              safe_id: "DE.BRAK_SPT.a2c44728-19a2-4305-83d3-2e9e08dec439",
              name: "Dr. Tobias Löhr",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2f-7fcb-bf6d-3c5cffe83ccb",
        name: "Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 6649 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-760e-958d-d3a360f60456",
              safe_id: "DE.BRAK_SPT.7cad5522-047a-4938-9076-9f2e583f4a11",
              name: "Rechtsanwalt Jonas-Luca Weiß",
            },
          },
          {
            aktenzeichen: "J 1897 11/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-7c58-b8ca-90db26688ca4",
    aktenzeichen_gericht: "M 5042 09/2025",
    status: "Eingereicht",
    status_changed: "2025-10-30T21:03:27.803398Z",
    eingereicht_am: "2021-10-17T21:57:47.117858Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-7a75-8725-0a89bea70bf7",
        name: "Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b30-7bf3-97e4-a4765fb96b5e",
        name: "Tobias-Ferdinand Karl-Heinz von Römerstein",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 3977 13/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-7b7d-ba09-b01b33c728fd",
    aktenzeichen_gericht: "F 387 12/2024",
    status: "Eingereicht",
    status_changed: "2025-04-04T13:32:26.949149Z",
    eingereicht_am: "2021-10-01T11:29:41.257258Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-78d7-b6f2-f94a5a4ed76a",
        name: "Ryanair",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 4994 01/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7eef-ab21-04ff339fe8ae",
        name: "Matthias Kübler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 814 06/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b32-74b0-89d8-b81174ce526e",
    aktenzeichen_gericht: "G 4142 02/2026",
    status: "Eingereicht",
    status_changed: "2025-07-17T09:22:10.466103Z",
    eingereicht_am: "2021-09-10T01:01:24.260814Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b32-7097-845e-7d25f225ae32",
        name: "Christoph-Michael von und zu Großmann-Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 1166 13/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-769a-a680-4bc12cba9e7d",
              safe_id: "DE.BRAK_SPT.1138e23b-7b51-4053-a596-f64bdcbe9d94",
              name: "Dr. Franziska Müller",
            },
          },
        ],
      },
      {
        id: "019aa757-2b32-7740-a7b8-82b7ccf26375",
        name: "Carina Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 9205 07/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d67-8746-f2c8614ee138",
              safe_id: "DE.BRAK_SPT.5157fa04-512a-4821-9a54-8cdd605fe4fb",
              name: "Dr. Marcel Küster",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-7ac7-ab82-3abc819f6c1f",
    aktenzeichen_gericht: "O 156 12/2024",
    status: "Erstellt",
    status_changed: "2025-02-27T05:53:35.531533Z",
    eingereicht_am: "2021-09-09T13:54:18.792732Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-77c7-89ae-6f3dd59c064b",
        name: "Markus Lösch",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 3775 11/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7a98-910e-1ed5acc09027",
        name: "Leonhard Böhm",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 8890 09/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-71f3-9dcb-7a5e1e48dfda",
    aktenzeichen_gericht: "I 1410 08/2025",
    status: "Eingereicht",
    status_changed: "2025-10-05T00:27:29.603027Z",
    eingereicht_am: "2021-09-06T08:21:21.945281Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-71dd-9cb8-aad7cfa865dd",
        name: "Elisa Schönfeld",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 5712 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bd3-bad0-a85c7e31b41c",
              safe_id: "DE.BRAK_SPT.c80a66ed-acd4-4bad-8a4e-35a139a32055",
              name: "Dr. Hannes Großmann",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-76e8-a00d-ac23bbb25186",
        name: "Annemarie Scholz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 5888 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7e05-8c8b-af91e43b01ac",
              safe_id: "DE.BRAK_SPT.cfcff95b-bfb9-47b2-9d88-74ecfb3ddb43",
              name: "Rechtsanwalt Dr. Sabine-Christina von und zu Großwald-Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b31-72a8-9bcb-8f31d8fe0a0f",
    aktenzeichen_gericht: "R 2090 11/2024",
    status: "Erstellt",
    status_changed: "2025-08-21T03:16:06.813132Z",
    eingereicht_am: "2021-07-23T05:59:20.06048Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-746c-80fe-533f7a060267",
        name: "Katharina-Elisabeth von der Hohenau-Müller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 983 10/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b31-7c36-80e8-059b314de71a",
        name: "Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 9232 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7702-81c6-f0c4ebd81a87",
              safe_id: "DE.BRAK_SPT.512e7f04-8fa5-445b-8769-b2da723d7d62",
              name: "Rechtsanwalt Fabian Groß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b37-7db0-a806-041e8b5d1061",
    aktenzeichen_gericht: "U 1997 12/2026",
    status: "Erstellt",
    status_changed: "2025-02-23T13:15:46.326221Z",
    eingereicht_am: "2021-07-19T08:01:51.058812Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b37-7cbf-9766-60b60ca4bd91",
        name: "Helene Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 2626 09/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b37-7de0-b688-96e9c94269b0",
        name: "Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b31-7e45-8e1a-23721e7ad936",
    aktenzeichen_gericht: "Q 7122 06/2025",
    status: "Erstellt",
    status_changed: "2025-03-08T14:23:44.737195Z",
    eingereicht_am: "2021-06-23T06:48:36.842163Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b31-7a26-aef5-4cf675dfaad8",
        name: "Paulina-Luise Katharina von Hölzer-Schönfeld",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 2609 13/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b31-7d55-b744-97921fdfdaef",
        name: "Paula-Louise Ott",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 5604 01/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "X 6723 12/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-758a-87ed-7f10d35867dd",
              safe_id: "DE.BRAK_SPT.16476b2c-84c6-41ea-bc9e-bd5ab1952e41",
              name: "Rechtsanwalt Dr. Emilia-Charlotte Freifrau von Löwenstein-Kranz",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b2d-7982-b9e9-0db740379dfd",
    aktenzeichen_gericht: "Z 5550 01/2026",
    status: "Eingereicht",
    status_changed: "2025-08-02T11:37:13.563814Z",
    eingereicht_am: "2021-06-13T07:06:06.592983Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b2d-7128-95e8-819d58f79b16",
        name: "Cornelia Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 4927 02/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-74dc-907a-0e35da48e3ad",
              safe_id: "DE.BRAK_SPT.555287ac-4df1-4151-960d-ebb9646ef234",
              name: "Dr. Julius Krämer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b2d-7c19-a522-1828c5e739aa",
        name: "Franz-Josef-Wilhelm-Ludwig von Schönfeld-Groß-Küster-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 6541 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7b8b-b435-c44b85437286",
              safe_id: "DE.BRAK_SPT.011a5db0-7121-43f6-88ef-7dcc476f2ed1",
              name: "Rechtsanwalt Dr. Florian Kranz",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-702f-8f47-50388785421d",
    aktenzeichen_gericht: "F 5531 05/2026",
    status: "Erstellt",
    status_changed: "2024-12-11T03:12:40.433568Z",
    eingereicht_am: "2021-05-05T18:41:41.474292Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-789c-9f63-5aadcaa89b6a",
        name: "Carola Münch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 5789 08/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-79d2-9162-81fc7560f6b0",
              safe_id: "DE.BRAK_SPT.09d13b11-2303-476a-8568-6612e8ad17f6",
              name: "Rechtsanwalt Anna-Katharina-Luise von Brückner-Weiß-Krüger-Schäfer-Kühn",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7dff-8267-6f0b0b0f8144",
        name: "TUI Fly",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 718 01/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "W 4788 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-751e-a883-0e4e1214b2ac",
              safe_id: "DE.BRAK_SPT.c8d60e43-835a-45bf-a0b5-e2ad063ce956",
              name: "Rechtsanwalt Dr. Pauline Kranz",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-73c6-a68a-6a576e9ceebd",
    aktenzeichen_gericht: "I 7762 09/2025",
    status: "Erstellt",
    status_changed: "2025-01-07T21:29:23.911644Z",
    eingereicht_am: "2021-04-26T06:10:42.604463Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-72e8-9d43-2010cbdc8d6d",
        name: "Ben-Luca Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa757-2b33-7913-967f-94b4e38b6b2c",
        name: "Fabian Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 3708 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b33-72d6-ac3d-a927d455c6f6",
    aktenzeichen_gericht: "Y 7233 13/2024",
    status: "Erstellt",
    status_changed: "2024-12-17T08:17:54.778029Z",
    eingereicht_am: "2021-04-02T20:04:31.186589Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b33-725b-8332-132e8ab9a518",
        name: "Karolin Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 5700 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b33-7b35-8115-9356607a12bf",
        name: "Florian Kranz",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b37-7810-bdca-eba9fb7245fe",
    aktenzeichen_gericht: "H 6784 05/2025",
    status: "Erstellt",
    status_changed: "2025-02-17T21:15:10.716658Z",
    eingereicht_am: "2021-03-29T22:46:06.240918Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa757-2b37-7288-a2ea-c4280aa30413",
        name: "Antonia Löhr",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 3056 05/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b37-7315-b683-1f310809ccec",
        name: "Matthias Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b35-70a3-bf01-f93edb1c7088",
    aktenzeichen_gericht: "G 9810 11/2026",
    status: "Erstellt",
    status_changed: "2025-07-08T07:04:35.449924Z",
    eingereicht_am: "2021-03-29T20:23:36.62787Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-7878-9a3a-99ec51b612a0",
        name: "Anna-Katharina-Luise von Brückner-Weiß-Krüger-Schäfer-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 4942 09/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7b9f-911b-d338084d8adf",
        name: "Fabian Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa757-2b34-7a2c-9480-bb626ebc298f",
    aktenzeichen_gericht: "A 6127 06/2026",
    status: "Erstellt",
    status_changed: "2025-09-30T12:41:41.011272Z",
    eingereicht_am: "2021-03-05T13:35:57.047785Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-75d5-ab5b-b01680149d0e",
        name: "Paulina Krüger",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 6845 02/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-789b-be3d-e356c2c0c60d",
              safe_id: "DE.BRAK_SPT.b46f1ee1-da8c-4802-bf7f-502a87b0dbef",
              name: "Rechtsanwalt Dr. Jonas-Maurer",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-7727-86b3-5d943c7ce376",
        name: "Julia-Maria-Luise von Schönfeld-Weißmann-Küster-Schäfer-Kranz",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 567 10/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-74cb-9f08-f710c53e64d5",
              safe_id: "DE.BRAK_SPT.3c603108-5376-44b1-ba1a-d7cd71b45285",
              name: "Rechtsanwalt Dr. Leonhard Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b30-7f5f-846d-3a1ac12f78d8",
    aktenzeichen_gericht: "E 4320 03/2026",
    status: "Eingereicht",
    status_changed: "2024-12-28T18:26:40.893119Z",
    eingereicht_am: "2021-02-25T19:54:22.896454Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b30-74a4-b3b3-cf72589d51ef",
        name: "Paulina Küster",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 2296 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7bfc-936f-f0c738df2221",
              safe_id: "DE.BRAK_SPT.30241b27-f123-48eb-9e5e-45399dd70102",
              name: "Dr. Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
            },
          },
        ],
      },
      {
        id: "019aa757-2b30-7c12-b293-6cf70d90c0cd",
        name: "Jonas Kübler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 6047 08/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b34-70e5-bd60-7a856dc6fd77",
    aktenzeichen_gericht: "X 2422 04/2026",
    status: "Eingereicht",
    status_changed: "2025-04-23T12:06:10.746409Z",
    eingereicht_am: "2021-02-23T19:49:50.427631Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa757-2b34-7838-9e4d-b21a46e8f956",
        name: "Tobias Hölzer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 4256 07/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b34-7c4a-9366-773328d3d167",
        name: "Matthias-Lorenz-Friedrich von der Löschau-Krüger-Schönfeld-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 6430 09/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b36-754f-97db-97288bd7ca05",
    aktenzeichen_gericht: "I 2615 08/2025",
    status: "Eingereicht",
    status_changed: "2025-03-12T20:59:05.870044Z",
    eingereicht_am: "2021-02-02T10:48:44.964743Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa757-2b36-713f-973c-c915db1bdb4a",
        name: "Pauline Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 4469 08/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
      {
        id: "019aa757-2b36-7140-939c-c96f7cebdb7e",
        name: "Karl-Ludwig-Ferdinand-Maximilian von Schönberg-Kühn-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 6946 02/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa757-2b35-7300-978a-afd40ca1ae38",
    aktenzeichen_gericht: "V 8336 01/2024",
    status: "Erstellt",
    status_changed: "2025-10-02T01:22:47.958396Z",
    eingereicht_am: "2020-12-12T01:09:40.075215Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa757-2b35-74f3-af5e-0b5169167394",
        name: "Alexander Brück",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 8468 07/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "P 9442 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7161-97c3-a2fe07e132f5",
              safe_id: "DE.BRAK_SPT.de1d01f9-f7b3-4422-b456-a3954faeb368",
              name: "Rechtsanwalt Maximilian-Johann von und zu Falkenstein",
            },
          },
        ],
      },
      {
        id: "019aa757-2b35-756f-bd66-0316f7e96730",
        name: "Nina Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 6369 04/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7488-880b-a10a6c09e807",
              safe_id: "DE.BRAK_SPT.fd0888c9-93df-4739-a770-872c4f13b697",
              name: "Rechtsanwalt Johanna-Luise Friederike von Bärenfels-Schmidt",
            },
          },
        ],
      },
    ],
  },
];

// fresh copy of GET /verfahren response from https://app.kompla-justiz.sinc.de/develop/swagger/index.html
export const mockVerfahrenNewAPIDevelop = [
  {
    id: "019aa60d-0851-7361-8829-0746b4ace405",
    aktenzeichen_gericht: "K 2378 12/2024",
    status: "Erstellt",
    status_changed: "2025-07-24T19:43:44.800381Z",
    eingereicht_am: "2025-11-08T03:28:04.896492Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0851-7884-95b7-15f30f3313df",
        name: "Matthias Lösch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 2994 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0852-78a9-9f1b-118b54b41441",
        name: "Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 1688 10/2024",
            bevollmaechtigter: {
              id: "019a5e70-4edb-7322-bcbf-f0865ec6b475",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Dr. Shirley RomagueraShirley RomagueraShirley Romaguera",
            },
          },
          {
            aktenzeichen: "Z 3363 13/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7d15-a571-de9420801246",
              safe_id: "DE.BRAK_SPT.6751635b-66d0-46b1-9d6d-2c5e1dfd539a",
              name: "Rechtsanwalt Matthias Kübler",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085d-7290-bb91-2131788488d9",
    aktenzeichen_gericht: "L 4566 08/2025",
    status: "Eingereicht",
    status_changed: "2025-06-15T03:24:53.991337Z",
    eingereicht_am: "2025-10-23T18:14:44.713104Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-085d-76b3-b905-84ee8066abda",
        name: "Ferdinand-Julius Maximilian von Krämer-Höfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 226 13/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7401-b2bc-ce2e6741ee2a",
              safe_id: "DE.BRAK_SPT.511fd75b-0376-4745-a428-d5b1f9ff0738",
              name: "Dr. Markus Höhn",
            },
          },
        ],
      },
      {
        id: "019aa60d-085d-77e8-9300-160b0d17e4fb",
        name: "Marie-Louise Ott",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0857-7160-ac9e-8fa68ffe94df",
    aktenzeichen_gericht: "E 9965 02/2024",
    status: "Eingereicht",
    status_changed: "2025-05-23T20:04:05.793482Z",
    eingereicht_am: "2025-09-15T22:22:55.010465Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0857-759f-9d88-7b24518e8a8d",
        name: "Alexander Höfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 2175 08/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7cd1-a839-c10b2d7bbfa5",
              safe_id: "DE.BRAK_SPT.754b93e3-0479-4d9f-b28e-81e2bac17d29",
              name: "Dr. Matthias Weiß",
            },
          },
        ],
      },
      {
        id: "019aa60d-0858-706c-975d-6c3457642222",
        name: "Alexander Brück",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 3603 01/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0861-7e09-a3a3-c2432dbfa94f",
    aktenzeichen_gericht: "W 310 12/2025",
    status: "Eingereicht",
    status_changed: "2025-02-11T18:41:49.084251Z",
    eingereicht_am: "2025-09-09T07:06:27.387117Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-0861-7ada-a919-2351c62adc4f",
        name: "Matthias-Lorenz-Friedrich von der Löschau-Krüger-Schönfeld-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 1343 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-777b-963a-fa760ecefa16",
              safe_id: "DE.BRAK_SPT.be444dc2-cc88-4d07-b5ce-efa2e191341c",
              name: "Dr. Miriam-Johanna-Elisabeth von und zu Löwenstein-Bär-Schäfer-Küster",
            },
          },
        ],
      },
      {
        id: "019aa60d-0861-7e99-9ba5-6448063ab393",
        name: "Helene Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 4590 01/2025",
            bevollmaechtigter: {
              id: "019a5e70-4edb-71ca-b2b7-42ed926bb324",
              safe_id: "DE.BRAK_SPT.c37e8b59-54d2-4e6a-b5d3-f8a2c9e1d774.7b32",
              name: "Dr. Derrick SauerDerrick SauerDerrick SauerDerrick SauerDerrick SauerDerrick Saue",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0862-7ab3-837e-8550b9d8913f",
    aktenzeichen_gericht: "B 8910 08/2024",
    status: "Eingereicht",
    status_changed: "2024-12-19T20:19:49.582191Z",
    eingereicht_am: "2025-08-05T10:33:44.061333Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0862-7614-af60-58261149df55",
        name: "Timo-Milan Ott",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 9579 03/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7ba7-93ad-7ece5c5f1cc0",
              safe_id: "DE.BRAK_SPT.e08efffb-9602-4d98-bdf0-1ae356cb9e61",
              name: "Rechtsanwalt Dr. Elisa-Maria Voigt",
            },
          },
        ],
      },
      {
        id: "019aa60d-0862-7a92-8b72-966abe7d2472",
        name: "Ben-Luca Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-084d-7b96-9a3e-a107aad7aed8",
    aktenzeichen_gericht: "A 422 04/2026",
    status: "Erstellt",
    status_changed: "2025-06-26T17:48:18.729882Z",
    eingereicht_am: "2025-07-26T03:57:24.357969Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-084d-7630-b95a-3a4162ba0dde",
        name: "Miriam Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 4445 02/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7466-beab-adc47feb0782",
              safe_id: "DE.BRAK_SPT.9d71e2cd-2348-4192-8a77-d2cf0cf20005",
              name: "Dr. Lena-Maria Böhm",
            },
          },
        ],
      },
      {
        id: "019aa60d-084d-7c0d-a2be-41c51d13ce3c",
        name: "Melanie Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 6011 08/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085c-7fe3-aae8-f8b9dc292115",
    aktenzeichen_gericht: "U 9914 09/2024",
    status: "Eingereicht",
    status_changed: "2025-05-22T02:13:02.120959Z",
    eingereicht_am: "2025-07-03T03:25:46.329978Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-085c-76c3-953d-5286c85017b2",
        name: "Matthias-Leonhard Theodor von Weißenthal",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 8230 04/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-787d-b3e1-7ffa7d1b77e5",
              safe_id: "DE.BRAK_SPT.de4b9d93-84ed-453a-bb76-c5b00bdccb56",
              name: "Rechtsanwalt Dr. Paulina-Luise Katharina von Hölzer-Schönfeld",
            },
          },
        ],
      },
      {
        id: "019aa60d-085c-7dd6-8df2-5d92fd081b86",
        name: "Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 7945 09/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7e2e-9519-f864061e313c",
              safe_id: "DE.BRAK_SPT.b2c29760-36e9-4609-83eb-57ac9c6b25de",
              name: "Rechtsanwalt Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084d-748a-9ddf-0d8bc9ddffff",
    aktenzeichen_gericht: "E 8862 12/2024",
    status: "Eingereicht",
    status_changed: "2025-02-27T08:01:33.818481Z",
    eingereicht_am: "2025-06-29T22:55:07.55202Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-084d-7608-9614-c25e1a57ce41",
        name: "Alexander Brück",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 5605 08/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084d-76cc-b2a8-51d86c3e3b0e",
        name: "Benedikt-Leonhard-Maximilian von Krüger-Brückner-Weiß-Schäfer-Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 2631 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7674-a936-5610d267f437",
              safe_id: "DE.BRAK_SPT.e9d627e8-aa22-4694-ab1c-704789c883e6",
              name: "Rechtsanwalt Dr. Timo-Milan Ott",
            },
          },
          {
            aktenzeichen: "J 2667 10/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7e3d-9923-a6d00d2ae9c1",
              safe_id: "DE.BRAK_SPT.73dfb3bd-0aa3-4786-824b-cc40cadc76f5",
              name: "Rechtsanwalt Dr. Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0859-7ba2-a97c-dbb6ce0cdfc6",
    aktenzeichen_gericht: "K 298 13/2024",
    status: "Erstellt",
    status_changed: "2024-12-19T13:26:44.631145Z",
    eingereicht_am: "2025-04-30T05:38:14.151329Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-0859-7314-a166-29fa3fe9393a",
        name: "TUI Fly",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-0859-77b5-9baa-962ef96ecf74",
        name: "Jonas Kübler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 8665 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0853-7624-8cb8-6747fc66fe2b",
    aktenzeichen_gericht: "E 9896 02/2024",
    status: "Eingereicht",
    status_changed: "2025-10-16T03:05:16.472219Z",
    eingereicht_am: "2025-04-26T21:06:52.632927Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-0853-7259-b9fb-9a16d8084cb0",
        name: "Alexander Krug",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 1921 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-718e-a674-42dc016ab664",
              safe_id: "DE.BRAK_SPT.a235d3df-2362-44c1-99df-14b0122f08f2",
              name: "Rechtsanwalt Friedrich-Johannes-Karl von Bärenfels-Schön-Küster-Weißmann",
            },
          },
        ],
      },
      {
        id: "019aa60d-0853-7cf2-8c69-907ef59679f2",
        name: "Ludwig-Leopold Alexander von Schönberg-Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 6432 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0858-7ea1-9f26-52432c717994",
    aktenzeichen_gericht: "M 938 07/2025",
    status: "Erstellt",
    status_changed: "2025-10-02T07:35:25.319525Z",
    eingereicht_am: "2025-04-09T14:54:10.158013Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0858-74d1-adee-a3f405e3b5bf",
        name: "Paulina Krüger",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 9250 12/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0858-7b99-a18d-d1994adc3c92",
        name: "Matthias Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-085a-70ce-ad87-8a656c50cd43",
    aktenzeichen_gericht: "V 7622 06/2026",
    status: "Eingereicht",
    status_changed: "2025-11-16T06:10:44.484139Z",
    eingereicht_am: "2025-04-07T07:05:38.50012Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085a-7597-a6f4-de820fc21f59",
        name: "Lufthansa",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 5068 08/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "K 652 02/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7274-9ad9-0c710d58ba85",
              safe_id: "DE.BRAK_SPT.e42ba6c5-ca5a-41df-b865-d80db820ac8d",
              name: "Rechtsanwalt Dr. Anna-Maria-Luise von Hohenstein-Schwarzburg",
            },
          },
        ],
      },
      {
        id: "019aa60d-085a-797d-a402-273d8a59c325",
        name: "Helena-Sophie Amalia von Brückner-Weißmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 2431 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0863-7e3e-96ec-5d3cff917535",
    aktenzeichen_gericht: "G 6813 04/2026",
    status: "Erstellt",
    status_changed: "2025-05-29T22:00:06.193065Z",
    eingereicht_am: "2025-03-18T03:04:50.370992Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-0863-7a46-8265-e3880cf0fa30",
        name: "Paulina Küster",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 4683 09/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7c40-938b-857f8cb0adc2",
              safe_id: "DE.BRAK_SPT.2f6890c8-9b87-4b40-8f41-44df9ccc6884",
              name: "Rechtsanwalt Dr. Jonas-Maurer",
            },
          },
        ],
      },
      {
        id: "019aa60d-0863-7fc7-97fe-f0355688bca3",
        name: "Paula-Lina Bär",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 5263 09/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085e-7217-a4ab-e80f503d3b0d",
    aktenzeichen_gericht: "X 555 02/2026",
    status: "Eingereicht",
    status_changed: "2024-11-23T07:20:11.787013Z",
    eingereicht_am: "2025-03-10T05:20:27.67453Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-085e-75e8-8f6e-3a7f5e723a4b",
        name: "Maximilian-Johann von und zu Falkenstein",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 1035 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7b00-aa95-ba86e9668ddd",
              safe_id: "DE.BRAK_SPT.864b5502-f8b9-4653-b9ce-3f588f0faa83",
              name: "Rechtsanwalt Dr. Karolin Weiß",
            },
          },
        ],
      },
      {
        id: "019aa60d-0860-779d-935d-0f5ea4f1614a",
        name: "Florian Brück",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-084e-7701-84d0-c5e8cf7072d8",
    aktenzeichen_gericht: "S 7394 04/2024",
    status: "Erstellt",
    status_changed: "2025-10-30T22:00:13.829774Z",
    eingereicht_am: "2025-03-09T09:49:54.007341Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-084f-740a-a87c-8904dcb8f74f",
        name: "Marcel Küster",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 6469 13/2024",
            bevollmaechtigter: {
              id: "019a5e70-4edb-7919-a815-817ff7bcec9a",
              safe_id: "DE.BRAK_SPT.7b9d3a62-8f4e-4c1a-a9f5-3d7e8c9f0b22.1a9d",
              name: "Dr. Olivia CummerataOlivia CummerataOlivia Cu",
            },
          },
        ],
      },
      {
        id: "019aa60d-084f-7a31-824e-0906ed757b4d",
        name: "Sabine Großmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0852-7ea7-bc54-d1d77d01c297",
    aktenzeichen_gericht: "K 1266 08/2024",
    status: "Eingereicht",
    status_changed: "2025-10-12T02:43:19.719842Z",
    eingereicht_am: "2025-03-01T08:55:39.104098Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-0852-7215-bb4b-f3ad61ae8546",
        name: "Johanna-Elise-Margarethe von Hohenau-Krüger-Weiß-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 4481 12/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0852-721d-9773-27dd18a315ee",
        name: "Wolfgang Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 5103 02/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084d-7036-aba6-c85097f28a26",
    aktenzeichen_gericht: "H 5574 08/2025",
    status: "Eingereicht",
    status_changed: "2024-11-30T00:12:26.904066Z",
    eingereicht_am: "2025-01-21T10:55:03.419436Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-084d-7cb3-a298-eece33b2125d",
        name: "Theresa Krug",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 5829 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084e-704a-9028-be2d6c784b27",
        name: "Air Berlin",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 7718 08/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085c-742d-b693-471e856136fd",
    aktenzeichen_gericht: "I 3881 05/2025",
    status: "Erstellt",
    status_changed: "2024-12-24T17:45:35.675883Z",
    eingereicht_am: "2024-12-21T23:29:58.064456Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-085c-70c6-9357-164825559258",
        name: "Günther Weißmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 9058 07/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7d77-8b19-07bb373faaeb",
              safe_id: "DE.BRAK_SPT.1c28852e-705b-4e92-9c5b-8e89f2ad457a",
              name: "Rechtsanwalt Dr. Tobias Möser",
            },
          },
        ],
      },
      {
        id: "019aa60d-085c-79a3-b9a6-853cd7570e87",
        name: "Carina-Lena Roth",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 9183 10/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "U 420 13/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7ed0-83b1-ea6cce0081dd",
              safe_id: "DE.BRAK_SPT.9438925c-a2d3-435f-94cc-bc54f07108ee",
              name: "Rechtsanwalt Johanna-Elisabeth-Maria von Krüger-Lösch",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084c-7b7e-8ecd-da7c7aabb12c",
    aktenzeichen_gericht: "K 2031 06/2024",
    status: "Erstellt",
    status_changed: "2025-03-21T11:48:10.967635Z",
    eingereicht_am: "2024-12-18T18:17:31.891221Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-084c-725d-8847-827304772ea6",
        name: "Tobias-Ferdinand Karl-Heinz von Römerstein",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 2420 01/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084c-7f25-9619-2318b3100028",
        name: "Gabriele-Luise-Friederike von der Lindenau-Küster-Schönfeld-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 471 10/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7add-92dc-5cab586d8b6f",
              safe_id: "DE.BRAK_SPT.a6c6cfba-ab31-4a2a-a1b0-15078773cd39",
              name: "Dr. Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0852-7bf2-b1df-ae805af8dfbf",
    aktenzeichen_gericht: "H 8445 11/2025",
    status: "Eingereicht",
    status_changed: "2024-12-19T01:16:20.985718Z",
    eingereicht_am: "2024-12-02T09:44:35.511784Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0852-7947-bc1b-a2b1a56c57e9",
        name: "Franz-Josef-Wilhelm-Ludwig von Schönfeld-Groß-Küster-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-0852-7ca3-97fe-33609ab36898",
        name: "Helene-Mara Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 7933 09/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085e-7f84-ae52-8723ea8eeaf3",
    aktenzeichen_gericht: "D 567 05/2024",
    status: "Eingereicht",
    status_changed: "2024-12-17T22:43:48.401478Z",
    eingereicht_am: "2024-11-14T14:47:46.208418Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085e-718e-a32d-ba0a1312fdf1",
        name: "Florian Kranz",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 4463 10/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7b27-9224-b292de1201ba",
              safe_id: "DE.BRAK_SPT.917e0c98-1dfb-4432-b903-ec30ec3c9514",
              name: "Rechtsanwalt Dr. Theresa Krug",
            },
          },
        ],
      },
      {
        id: "019aa60d-085e-746b-bc09-45500d94407a",
        name: "Pauline Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 1482 03/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7802-af1d-74eb10ca487f",
              safe_id: "DE.BRAK_SPT.c0090d0d-b371-422c-8448-9cdfc01cad8d",
              name: "Rechtsanwalt Daniela Brück",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0852-7d83-b2fb-acaebec9732b",
    aktenzeichen_gericht: "A 8128 06/2024",
    status: "Eingereicht",
    status_changed: "2025-03-28T13:32:56.318376Z",
    eingereicht_am: "2024-11-12T22:08:56.897354Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0852-7151-869e-9f93a6007a7f",
        name: "Johanna Kübler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 3245 12/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0852-71c7-acc1-1576a0316960",
        name: "Tobias Groß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 429 04/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7b02-a2d7-d6cfb7eff1bb",
              safe_id: "DE.BRAK_SPT.3065f6b4-951b-4b4d-b573-7dc48a5a5084",
              name: "Dr. Christoph Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084e-79b7-b4d7-6a3e7bf5b175",
    aktenzeichen_gericht: "Y 1781 10/2026",
    status: "Erstellt",
    status_changed: "2025-05-04T22:40:47.599675Z",
    eingereicht_am: "2024-10-25T06:51:28.651742Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-084e-706c-9474-07471a2ced59",
        name: "Elisa-Sophie-Luise-Gräfin von Löwenhügel-Küster-Schönfeld-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 9194 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084e-7d42-9a66-f3211acd647d",
        name: "Klara-Louise Braun",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 9927 13/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7509-8064-5fb326fdc109",
              safe_id: "DE.BRAK_SPT.c3d26d7d-2a9c-40f4-875d-802a9add6e40",
              name: "Rechtsanwalt Franziska Müller",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0859-7e10-8596-318173cf71eb",
    aktenzeichen_gericht: "A 1261 05/2024",
    status: "Erstellt",
    status_changed: "2025-02-12T21:38:05.103241Z",
    eingereicht_am: "2024-09-22T01:29:26.250524Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0859-7757-8e58-09fe03d19189",
        name: "Leonhard Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 3518 13/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-76d1-85d0-f6b87b21e762",
              safe_id: "DE.BRAK_SPT.508d0efb-25d0-4594-9738-e1e09bdf1e2d",
              name: "Dr. Alexander-Theodor Benjamin von Küster-Braun",
            },
          },
        ],
      },
      {
        id: "019aa60d-0859-7a1e-93b2-969355737662",
        name: "Anna-Lena Krug",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 6654 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084a-7787-bdae-b82748dcf42c",
    aktenzeichen_gericht: "I 9183 07/2024",
    status: "Erstellt",
    status_changed: "2025-10-21T12:27:19.418184Z",
    eingereicht_am: "2024-09-20T12:13:21.047689Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-084b-76da-ac31-ae5f195e35b0",
        name: "Stefan Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 8005 01/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084b-7f55-b58d-e7788114fef6",
        name: "Markus Groß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 1100 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-774b-b149-765c3122e442",
              safe_id: "DE.BRAK_SPT.f43bfb3a-4b5e-4996-ae91-8e5bd2fdf277",
              name: "Rechtsanwalt Dr. Janina Müller",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085a-763e-ab88-1d6eccac48b8",
    aktenzeichen_gericht: "M 9839 02/2025",
    status: "Erstellt",
    status_changed: "2025-02-18T19:44:47.084113Z",
    eingereicht_am: "2024-09-20T07:50:05.400065Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-085a-7e4c-b3f1-ac5cbe28e3ae",
        name: "Cornelia Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 9942 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7946-83eb-8a49471c317e",
              safe_id: "DE.BRAK_SPT.e92419cb-8ce9-4c00-9f08-ecb78c735c4d",
              name: "Rechtsanwalt Christoph-Michael von und zu Großmann-Weiß",
            },
          },
        ],
      },
      {
        id: "019aa60d-085b-7810-a31a-062c61f45ed4",
        name: "Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0865-73fb-bdb1-c0dfb212796b",
    aktenzeichen_gericht: "B 6197 08/2024",
    status: "Erstellt",
    status_changed: "2025-01-27T02:23:01.533777Z",
    eingereicht_am: "2024-08-06T13:33:34.631405Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0865-711d-b780-832e47d04d9a",
        name: "Lufthansa",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 8169 12/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7ce2-be48-89546f973aa2",
              safe_id: "DE.BRAK_SPT.2ae649c5-628c-4625-9c60-29307cae3062",
              name: "Rechtsanwalt Dr. Benjamin Weiß",
            },
          },
          {
            aktenzeichen: "V 3715 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7728-bb89-1f65e12a5f9d",
              safe_id: "DE.BRAK_SPT.63459f0b-398e-4719-b318-b914513577e0",
              name: "Rechtsanwalt Dr. Benjamin-Lukas Franz-Josef von Schönhagen",
            },
          },
        ],
      },
      {
        id: "019aa60d-0865-7ee7-a2ef-3b05a8f506ee",
        name: "Benedikt Krämer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 4851 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0857-72ae-853b-604b661776df",
    aktenzeichen_gericht: "J 5347 13/2026",
    status: "Erstellt",
    status_changed: "2025-02-25T01:36:33.438619Z",
    eingereicht_am: "2024-07-26T04:16:01.610995Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0857-7b4c-b3de-83090b639fb4",
        name: "Dieter-Maurer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-0857-7f62-a4ea-06aefa0b77d1",
        name: "Kathrin Hölzer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 9152 06/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085a-7ac3-8cb0-3c1b14484dcc",
    aktenzeichen_gericht: "Q 7041 11/2026",
    status: "Eingereicht",
    status_changed: "2025-07-14T23:23:04.641913Z",
    eingereicht_am: "2024-06-26T12:21:09.872636Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-085a-754c-b422-e049351d4565",
        name: "Friedrich-Wilhelm Günther von Schönfeld-Krüger",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 4514 04/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-085a-7d6a-83e7-e3e8890b8f30",
        name: "Andreas Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-085c-7492-a525-2448cb549b77",
    aktenzeichen_gericht: "G 1323 08/2024",
    status: "Erstellt",
    status_changed: "2025-04-12T16:04:48.476836Z",
    eingereicht_am: "2024-05-19T04:18:14.896243Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085c-764f-bc46-cbced416c6d9",
        name: "Condor",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-085c-7870-9a96-8bbca52db82f",
        name: "Ben-Luca Möller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 7003 09/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0865-7baa-992e-55d035298298",
    aktenzeichen_gericht: "W 6403 01/2024",
    status: "Erstellt",
    status_changed: "2025-11-14T19:07:41.714388Z",
    eingereicht_am: "2024-04-28T19:15:34.634032Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0865-7663-854a-1cfe29ae0505",
        name: "Sabine Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 8657 05/2024",
            bevollmaechtigter: {
              id: "019a5e70-4edb-7b9e-a643-01489e93c168",
              safe_id: "DE.BRAK_SPT.18bc47a2-6f3e-4fd9-9b25-7f0c8d4a9e61.3d8b",
              name: "Dr. Moses RiceMoses RiceMos",
            },
          },
        ],
      },
      {
        id: "019aa60d-0865-7707-87c8-23132a619897",
        name: "Katharina Böhm",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-085b-7abc-a607-306094a463a6",
    aktenzeichen_gericht: "K 3631 07/2024",
    status: "Erstellt",
    status_changed: "2025-10-24T14:33:50.814966Z",
    eingereicht_am: "2024-04-18T18:16:19.784661Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085b-702d-a13b-3409d543bcb9",
        name: "Miriam Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 5750 13/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7287-b186-e8eead2abb8b",
              safe_id: "DE.BRAK_SPT.11191b3a-4f40-42d0-9414-3c415812544f",
              name: "Rechtsanwalt Helene Groß",
            },
          },
        ],
      },
      {
        id: "019aa60d-085b-79f2-a553-ae1aa09ebae4",
        name: "Fabian Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 2858 09/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0856-7e9d-a147-c6835c6ea5ae",
    aktenzeichen_gericht: "A 7412 07/2025",
    status: "Eingereicht",
    status_changed: "2025-03-17T10:02:01.996174Z",
    eingereicht_am: "2024-04-10T12:32:24.279037Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0856-7073-9bcc-d2ae1436c3ae",
        name: "Dieter Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "A 7877 05/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0856-76f2-b43d-f60fd6faf829",
        name: "Florian Bär",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 4180 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0858-7343-abd4-8139514b8e3f",
    aktenzeichen_gericht: "T 6558 02/2024",
    status: "Eingereicht",
    status_changed: "2025-06-10T22:28:27.970843Z",
    eingereicht_am: "2024-03-26T16:23:39.082809Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-0859-716f-9597-7c5d94660e2a",
        name: "Friedrich-Alexander-Johannes von Hohenstein-Bär-Krüger-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 942 01/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7a19-878e-e863dceacc82",
              safe_id: "DE.BRAK_SPT.cbe61fbe-fa59-437c-b7b0-eaeaf3d92d15",
              name: "Rechtsanwalt Fabian Krüger",
            },
          },
        ],
      },
      {
        id: "019aa60d-0859-75ee-96c8-854b5973d188",
        name: "Miriam-Luise Ott",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 799 04/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7644-b3ce-9cc4b0f0991e",
              safe_id: "DE.BRAK_SPT.3957d6b3-5bd0-47b4-8d85-93a4e6f4c44e",
              name: "Rechtsanwalt Dr. Johanna-Lina Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0864-71b4-84da-4770b354a3bd",
    aktenzeichen_gericht: "L 4990 01/2024",
    status: "Eingereicht",
    status_changed: "2025-10-21T04:17:42.528174Z",
    eingereicht_am: "2024-02-23T15:42:47.833635Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0864-72fc-9fb0-fcdd1953209b",
        name: "Gabriele Kraus",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 6267 13/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0864-77b2-9c8b-b87106b0e40c",
        name: "Sebastian Löhr",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0852-78af-96b3-831d87d82cab",
    aktenzeichen_gericht: "G 884 13/2026",
    status: "Erstellt",
    status_changed: "2025-01-27T01:04:12.88378Z",
    eingereicht_am: "2024-01-05T20:49:56.544938Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0852-71ac-b37b-b72a1621d1b3",
        name: "Air Berlin",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 8106 08/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0852-795a-9d59-74f55e8e91ca",
        name: "Leonhard Böhm",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 6160 07/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0861-70c9-abe4-559bde20b34e",
    aktenzeichen_gericht: "F 3000 05/2026",
    status: "Eingereicht",
    status_changed: "2025-09-24T22:14:40.802471Z",
    eingereicht_am: "2024-01-04T01:18:36.158626Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0861-7284-820f-f28f72efb382",
        name: "Karolin Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 1661 11/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0861-7e6e-835a-b7bf63b6ea06",
        name: "Tobias Möser",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0850-743b-a88d-e9783882f8c3",
    aktenzeichen_gericht: "Y 3322 04/2024",
    status: "Erstellt",
    status_changed: "2025-07-28T04:09:04.205953Z",
    eingereicht_am: "2023-12-20T05:00:15.517787Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0850-700b-a7c2-8d94ea5efb7d",
        name: "Alina-Maria Krug",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 3627 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0850-79b6-b965-d1c1256f0253",
        name: "Lufthansa",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 8693 06/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085d-76c6-8ad6-3324d6e99e8c",
    aktenzeichen_gericht: "M 604 05/2026",
    status: "Erstellt",
    status_changed: "2025-11-11T08:40:11.385432Z",
    eingereicht_am: "2023-12-18T10:59:50.347662Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-085d-79c6-a70b-5b1567386d97",
        name: "Christina Höfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 4691 04/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "Q 7676 09/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7111-bc34-b37a2e794fc9",
              safe_id: "DE.BRAK_SPT.5d0a709a-1d6e-4291-859a-9207d3504fa0",
              name: "Rechtsanwalt Helene-Mara Kühn",
            },
          },
        ],
      },
      {
        id: "019aa60d-085d-7b75-a871-d1f7adcc1f06",
        name: "Johanna-Luise Friederike von Bärenfels-Schmidt",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 7741 01/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7200-961e-61e7628078a2",
              safe_id: "DE.BRAK_SPT.7313c2f5-af6e-49d4-b16b-f39dd62106c3",
              name: "Rechtsanwalt Dr. Leonhard Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085d-773e-8663-10e720a6f54b",
    aktenzeichen_gericht: "H 5985 10/2025",
    status: "Erstellt",
    status_changed: "2025-02-11T21:30:28.506954Z",
    eingereicht_am: "2023-12-07T11:38:03.539445Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085d-7378-ab83-97f3ab86e62b",
        name: "Elisabeth Köhn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 4473 12/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-085d-7af4-bfca-c3cbca09a3ef",
        name: "Florian Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0865-7e04-959a-1f6a365b6b33",
    aktenzeichen_gericht: "O 8665 03/2024",
    status: "Eingereicht",
    status_changed: "2025-04-21T23:31:11.930512Z",
    eingereicht_am: "2023-12-06T14:47:54.590209Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0865-704a-bc7e-0267ce0255bd",
        name: "Paulina-Maria-Isabell von und zu Hohenstein-Weiß-Krüger-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 2978 12/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-750a-ad53-3dee175dac9a",
              safe_id: "DE.BRAK_SPT.1416f55e-edef-43b0-a005-b5777b8c57c7",
              name: "Dr. Benedikt-Lorenz von Löwenau-Schönfeld",
            },
          },
        ],
      },
      {
        id: "019aa60d-0865-7ca2-ba73-282bb180b1ac",
        name: "Sabine-Christina von und zu Großwald-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 6896 05/2025",
            bevollmaechtigter: {
              id: "019a5e70-4edb-7867-8011-66ad50de7063",
              safe_id: "DE.BRAK_SPT.6d5a72e1-91b3-4782-baf4-2c6f8e1a3c55.2e1d",
              name: "Dr. Tina BartolettiTina BartolettiTina Bartole",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0850-7d16-b60a-0759529a75e2",
    aktenzeichen_gericht: "R 8906 06/2025",
    status: "Eingereicht",
    status_changed: "2025-06-16T13:14:55.162217Z",
    eingereicht_am: "2023-11-29T04:45:34.975038Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0850-7b05-9936-11973989b748",
        name: "Alexander-Theodor Benjamin von Küster-Braun",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 4388 05/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7dbd-98be-7563e698cd82",
              safe_id: "DE.BRAK_SPT.4b49a9f6-58d5-4292-9b54-3a2ac6e3d20f",
              name: "Dr. Tobias Hölzer",
            },
          },
        ],
      },
      {
        id: "019aa60d-0850-7bc2-a126-31c395ea3f84",
        name: "Friedrich Kübler",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 2218 03/2026",
            bevollmaechtigter: {
              id: "019a5e70-4edb-7016-8d8e-b5f6821bb316",
              safe_id: "DE.BRAK_SPT.fb72a4c9-3e1d-41a6-8b2c-0d6e5f9a7b34.8c51",
              name: "Dr. Olive HeidenreichOl",
            },
          },
          {
            aktenzeichen: "R 1056 07/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084b-77c6-995f-c695df6edb73",
    aktenzeichen_gericht: "T 2054 05/2026",
    status: "Eingereicht",
    status_changed: "2025-04-08T18:17:23.282819Z",
    eingereicht_am: "2023-11-26T00:05:04.300057Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-084b-7151-950e-2686c74c9fad",
        name: "Alina-Theresa Viktoria von der Grünenau",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 2103 05/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084c-73c1-b9ff-c2521bc6e2d3",
        name: "Condor",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 2378 11/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7b67-aeb1-39c91b9f00fd",
              safe_id: "DE.BRAK_SPT.9157e454-32c1-48e0-863d-725bfa60f286",
              name: "Rechtsanwalt Dr. Sabine Schäfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084e-7aaa-9266-02d30ad3becf",
    aktenzeichen_gericht: "I 4192 01/2025",
    status: "Erstellt",
    status_changed: "2025-08-28T23:44:42.446932Z",
    eingereicht_am: "2023-10-29T22:37:01.837947Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-084e-77b5-8ae5-d2caba77a30c",
        name: "Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 2642 05/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-720e-badd-dbe5c3f842e6",
              safe_id: "DE.BRAK_SPT.5e5d2015-83f0-42b9-a58a-e43863e1806f",
              name: "Rechtsanwalt Dr. Ludwig-Leopold Alexander von Schönberg-Weiß",
            },
          },
          {
            aktenzeichen: "V 3309 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7939-a01f-b797dd8e9f50",
              safe_id: "DE.BRAK_SPT.1442eed1-18c5-4195-89ce-603d8962ebd3",
              name: "Rechtsanwalt Klara-Louise Braun",
            },
          },
        ],
      },
      {
        id: "019aa60d-084e-7973-92df-4ec67ff8b7b7",
        name: "Andreas Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 6770 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-74d3-bb63-82735b23102f",
              safe_id: "DE.BRAK_SPT.84885b67-cfcd-472b-99b2-11f0dea8fae6",
              name: "Rechtsanwalt Johannes-Friedrich von und zu Bärenburg",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085e-7b50-a647-d45e86e920ac",
    aktenzeichen_gericht: "O 6309 07/2025",
    status: "Erstellt",
    status_changed: "2024-12-11T15:34:38.373334Z",
    eingereicht_am: "2023-10-24T14:42:08.601362Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-085e-785e-af62-514a96f4abaf",
        name: "TUI Fly",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 936 13/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7d8c-8406-38a7245d020c",
              safe_id: "DE.BRAK_SPT.8d1790f1-9b4c-40b0-b326-19d696696955",
              name: "Dr. Ben-Luca Möller",
            },
          },
          {
            aktenzeichen: "G 3677 06/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-77c8-9d7a-56214e62e99f",
              safe_id: "DE.BRAK_SPT.dfd01f63-5e5a-4ee8-9258-c6142d40a7fd",
              name: "Rechtsanwalt Carina Weiß",
            },
          },
        ],
      },
      {
        id: "019aa60d-085e-7ee8-b1a3-544157b6a6d3",
        name: "Leonhard-Sebastian Philipp von Möser-Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 1031 08/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7b38-a7ca-51c15f7d0696",
              safe_id: "DE.BRAK_SPT.b21d2f9b-09fc-43f1-9abe-011c6f5af387",
              name: "Rechtsanwalt Johanna-Luise Friederike von Bärenfels-Schmidt",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0855-7b2e-b4b6-1282cbd694e8",
    aktenzeichen_gericht: "V 2946 09/2026",
    status: "Eingereicht",
    status_changed: "2025-10-05T09:53:48.219605Z",
    eingereicht_am: "2023-07-05T13:13:54.555199Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0855-772a-8338-878365af92ce",
        name: "Johanna Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-0855-78c1-8380-15fd933c06bf",
        name: "Elisa-Maria Voigt",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 8699 03/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085b-7755-af86-957bd7f060b7",
    aktenzeichen_gericht: "D 5850 08/2026",
    status: "Eingereicht",
    status_changed: "2025-03-26T23:33:29.423457Z",
    eingereicht_am: "2023-04-22T07:33:10.250636Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085b-7356-aebc-c11b79a144d3",
        name: "Paula-Louise Ott",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 9344 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7bfc-acee-65d21621121f",
              safe_id: "DE.BRAK_SPT.d13b1d49-4cfd-4710-ae8b-2e5332fdbd5f",
              name: "Rechtsanwalt Dr. Katharina Böhm",
            },
          },
        ],
      },
      {
        id: "019aa60d-085b-7807-94d7-a81929140d8f",
        name: "Christoph Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 676 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7656-a853-a45bf4583fde",
              safe_id: "DE.BRAK_SPT.206f5008-d668-4ef7-8b7f-ff4c022a34e1",
              name: "Dr. Andreas-Friedrich-Johannes von Hohenau-Krämer-Schönfeld-Weißmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0856-79b6-b3fb-5c07fac6cfe0",
    aktenzeichen_gericht: "I 709 01/2026",
    status: "Erstellt",
    status_changed: "2025-05-21T21:59:51.45139Z",
    eingereicht_am: "2023-04-21T08:36:25.343722Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-0856-7a05-884f-71947c9b1e28",
        name: "Eurowings",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 5827 06/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7b55-b84e-07c04dbaec4f",
              safe_id: "DE.BRAK_SPT.8366c2f2-0b6e-4c3e-9634-78a22de05531",
              name: "Rechtsanwalt Emilia-Charlotte Freifrau von Löwenstein-Kranz",
            },
          },
        ],
      },
      {
        id: "019aa60d-0856-7c71-8a25-c7202a4082c4",
        name: "Franziska-Madeleine von Hohenlohe-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 8990 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0857-70fd-abb5-811023a73b81",
    aktenzeichen_gericht: "W 2070 04/2026",
    status: "Eingereicht",
    status_changed: "2025-04-06T16:40:34.415387Z",
    eingereicht_am: "2023-04-19T01:48:52.158359Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0857-73e6-8fb0-8189be29007b",
        name: "Tobias Hölzer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 1887 02/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0857-79af-82f3-9f83dca30f57",
        name: "Carina Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 9288 07/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0855-77de-9185-7f03cabe7f70",
    aktenzeichen_gericht: "H 1014 11/2024",
    status: "Erstellt",
    status_changed: "2025-06-30T03:12:30.958134Z",
    eingereicht_am: "2023-04-10T02:23:11.431313Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-0855-7049-9c33-2d94692237b9",
        name: "Helene-Isabell-Theresa von Weißmann-Kühn-Schäfer-Bärenfels",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 6097 08/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0855-76ad-b991-5103ea597fcd",
        name: "Matthias Köhn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 2581 05/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0854-7463-af2c-0166e0c17e3a",
    aktenzeichen_gericht: "B 4302 12/2024",
    status: "Erstellt",
    status_changed: "2025-07-14T11:04:18.962568Z",
    eingereicht_am: "2023-04-04T16:01:15.057958Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0854-7d14-aa95-780b34f6fb11",
        name: "Johannes-Benedikt Albrecht von Löwenhügel",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 8943 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-72af-b8e6-2b013445c69a",
              safe_id: "DE.BRAK_SPT.9955803e-d4ce-406b-852d-6ca644ee8cb2",
              name: "Rechtsanwalt Dr. Elisabeth Köhn",
            },
          },
        ],
      },
      {
        id: "019aa60d-0854-7f50-9760-fe2cacc46f92",
        name: "Helene Bär",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 9757 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0857-7fb1-81e6-12f84ac734bd",
    aktenzeichen_gericht: "P 3454 09/2024",
    status: "Eingereicht",
    status_changed: "2025-04-24T19:52:36.650172Z",
    eingereicht_am: "2023-03-31T22:40:08.447179Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0857-79f3-aa6e-9baf6593b68d",
        name: "Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 2049 05/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0857-7ce8-9bd4-a47cac16f5cb",
        name: "Johannes-Friedrich von und zu Bärenburg",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 5035 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0853-77ba-aed0-be88939de62f",
    aktenzeichen_gericht: "B 2995 09/2024",
    status: "Erstellt",
    status_changed: "2025-10-21T18:43:39.360624Z",
    eingereicht_am: "2023-03-06T09:07:11.808802Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0853-7cec-b9de-b15e57c65905",
        name: "Sebastian Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 3383 09/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7aa9-8919-26a795472fa7",
              safe_id: "DE.BRAK_SPT.d4b1817d-302e-4628-bfa5-80404622f8f5",
              name: "Rechtsanwalt Christina Höfer",
            },
          },
        ],
      },
      {
        id: "019aa60d-0853-7d0d-b51c-b1cd7a855fa7",
        name: "Johanna-Lina Böhm",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 8793 07/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7a9a-b9fd-c5ec74f90948",
              safe_id: "DE.BRAK_SPT.4d94bc5e-50cc-4496-87aa-e4655d2ae941",
              name: "Rechtsanwalt Dr. Clara-Louise-Friederike von Brück-Köhler",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085d-700b-b070-04a0efc72e9b",
    aktenzeichen_gericht: "B 1761 08/2026",
    status: "Erstellt",
    status_changed: "2025-09-15T06:04:18.649207Z",
    eingereicht_am: "2023-02-16T08:19:04.019917Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-085d-7073-b234-07b6b7c07492",
        name: "Air Berlin",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 8119 04/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-085d-72bb-ae2a-b8a5f5c8dc87",
        name: "Fabian Krüger",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 6257 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0854-7635-bcdb-99e6b8fd1ddb",
    aktenzeichen_gericht: "R 2973 12/2024",
    status: "Eingereicht",
    status_changed: "2025-04-02T10:36:00.977031Z",
    eingereicht_am: "2023-02-11T08:31:09.598681Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0855-7369-8030-4819269fb7d8",
        name: "Matthias-Friedrich-Wilhelm von Löwenstein-Krüger-Schäfer-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 1674 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0855-7d86-abfa-6d7c081f30ab",
        name: "Hannes Großmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 9660 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085b-7117-a428-83803d812bee",
    aktenzeichen_gericht: "L 6697 06/2024",
    status: "Eingereicht",
    status_changed: "2025-09-26T06:08:47.603655Z",
    eingereicht_am: "2023-02-03T00:32:11.986603Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-085b-7171-8b7a-5d4a09c0ef31",
        name: "Leonhard Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-085b-7592-9c7b-0577c589c13f",
        name: "Carola Münch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 5969 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0851-729c-a30b-14bfb3c2354b",
    aktenzeichen_gericht: "S 4118 06/2024",
    status: "Eingereicht",
    status_changed: "2025-06-20T17:30:42.506495Z",
    eingereicht_am: "2023-01-29T02:24:56.397969Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0851-7a67-8ec4-f8a8e67e18ec",
        name: "Tobias-Mara Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 6287 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0851-7b8b-b2c9-86eee4461c87",
        name: "Anna-Maria-Luise von Hohenstein-Schwarzburg",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 8401 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084c-743e-b49c-98146e6b8373",
    aktenzeichen_gericht: "D 2008 06/2025",
    status: "Eingereicht",
    status_changed: "2024-11-29T22:29:07.573264Z",
    eingereicht_am: "2023-01-28T03:11:35.700393Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-084c-7447-8cce-d1889d30031f",
        name: "Tobias Schönfeld",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 4565 09/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084c-7939-9020-a1e5a0ec770c",
        name: "Katharina-Marie-Elisabeth von Hohenstein-Bärenwald-Krüger-Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0854-7629-ba87-ef9cfacaddd2",
    aktenzeichen_gericht: "D 1448 09/2025",
    status: "Erstellt",
    status_changed: "2025-05-04T21:39:52.116338Z",
    eingereicht_am: "2023-01-15T08:29:09.747688Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0854-715b-8f28-b0e29403ca88",
        name: "Dieter Mönch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 7992 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0854-77ef-aa51-b98327a79f26",
        name: "Alina-Mara Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-085d-7a46-922a-b8091b5b6130",
    aktenzeichen_gericht: "U 1110 05/2024",
    status: "Eingereicht",
    status_changed: "2025-08-10T14:59:31.660187Z",
    eingereicht_am: "2022-12-03T15:23:27.060778Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085d-7406-b6e4-86fafc9021bb",
        name: "Florian Lösch",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 3035 12/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-733b-920f-57ea09214879",
              safe_id: "DE.BRAK_SPT.de1de5b2-bca8-464c-8d62-26021321de9c",
              name: "Dr. Johanna Kübler",
            },
          },
        ],
      },
      {
        id: "019aa60d-085d-7504-bc24-a903e8b21cd7",
        name: "Daniela Brück",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 5058 02/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0850-7849-80cf-3c1336d03d49",
    aktenzeichen_gericht: "I 3014 05/2025",
    status: "Erstellt",
    status_changed: "2024-12-21T06:56:59.576737Z",
    eingereicht_am: "2022-11-20T01:22:01.489514Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-0850-71db-a6d7-bb1bb65d6bda",
        name: "Dominik Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 9878 03/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0850-725a-a8b0-d0e7c1e70c61",
        name: "Elisa Schönfeld",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 9147 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7f11-8efd-703cdc856512",
              safe_id: "DE.BRAK_SPT.73d1f7bb-3fbe-422a-a179-241394e43a19",
              name: "Rechtsanwalt Tobias Löhr",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085b-7fe0-aa48-ca8192c6c4a3",
    aktenzeichen_gericht: "Z 9471 02/2025",
    status: "Eingereicht",
    status_changed: "2024-12-22T10:50:10.537687Z",
    eingereicht_am: "2022-11-15T10:51:55.735265Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-085b-7715-95c3-0aeb8b7bc7b5",
        name: "Elisabeth Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-085b-7b76-84c4-fbabc6164e72",
        name: "Emilia Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 5913 04/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0856-7cba-9876-9e8828a392b4",
    aktenzeichen_gericht: "Y 4580 05/2026",
    status: "Eingereicht",
    status_changed: "2025-04-23T09:07:53.507751Z",
    eingereicht_am: "2022-10-27T16:07:53.29014Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0856-72ab-a058-0b1862112da0",
        name: "Markus Höhn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 3411 10/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0857-724d-8263-4122844f42dc",
        name: "Benjamin Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 8824 07/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084d-7f80-9696-d558fcaf85f6",
    aktenzeichen_gericht: "C 6978 07/2026",
    status: "Erstellt",
    status_changed: "2025-05-08T19:10:24.317933Z",
    eingereicht_am: "2022-10-25T14:01:37.216274Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-084d-75f3-b34c-2ea67e6cf850",
        name: "Patrick Löhr",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 6262 02/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7f6a-8c9e-1869ee144363",
              safe_id: "DE.BRAK_SPT.b676f70f-efa3-452d-bf31-69109adb0514",
              name: "Rechtsanwalt Marcel Küster",
            },
          },
          {
            aktenzeichen: "U 7410 01/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084d-7f20-bbd2-fe58df301b0e",
        name: "Benjamin-Lukas Franz-Josef von Schönhagen",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 8220 08/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7c3c-af75-b3bbd4748b6f",
              safe_id: "DE.BRAK_SPT.39ce990f-b764-4d6a-b233-6bf0406a3375",
              name: "Dr. Anna-Maria-Katharina-Elisabeth von Löwenstein-Kranz-Schäfer-Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084e-7f00-9744-b644d719db3d",
    aktenzeichen_gericht: "L 9866 06/2024",
    status: "Erstellt",
    status_changed: "2025-02-24T16:55:10.277367Z",
    eingereicht_am: "2022-10-05T07:57:49.555623Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-084e-735a-82bf-66e599e0d1cb",
        name: "Antonia Löhr",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 6876 13/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-084e-7616-bf61-506804a83573",
        name: "Tobias-Maurer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Z 7975 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085a-70cb-b69b-f094eb9ee56c",
    aktenzeichen_gericht: "B 8435 03/2025",
    status: "Eingereicht",
    status_changed: "2025-03-04T22:17:26.113753Z",
    eingereicht_am: "2022-09-29T06:06:43.709065Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-085a-78eb-be77-621252b24de7",
        name: "Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 5916 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7fb8-aaf2-aec62dad7b8f",
              safe_id: "DE.BRAK_SPT.2e5f6b21-5243-4f91-974a-6609b3604a5a",
              name: "Dr. Anna-Lena-Marie von Schönbrunn-Kühn",
            },
          },
        ],
      },
      {
        id: "019aa60d-085a-7f8b-bbda-fb4c4d39aff2",
        name: "Friedrich Scholz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 873 01/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0854-7ae4-a311-ffa622229cd5",
    aktenzeichen_gericht: "J 5202 13/2026",
    status: "Eingereicht",
    status_changed: "2025-09-09T19:19:52.741036Z",
    eingereicht_am: "2022-09-09T00:59:08.062661Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-0854-7503-95bd-75bbedd42b00",
        name: "Julia-Maria Roth",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 1119 10/2024",
            bevollmaechtigter: {
              id: "019a5e70-4edb-705b-926b-664d0b9c6b26",
              safe_id: "DE.BRAK_SPT.9a4e2c11-fb6d-4c8f-bd93-1e7a5f6b3d42.6fa9",
              name: "Dr. Sophie StehrSophie StehrSophie StehrSophie StehrSophie StehrSophie StehrSophie ",
            },
          },
        ],
      },
      {
        id: "019aa60d-0854-7629-aff3-f85f86811c53",
        name: "Leonhard Höfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 9245 12/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0863-7ab1-8751-73f4304d1f00",
    aktenzeichen_gericht: "D 2869 08/2024",
    status: "Erstellt",
    status_changed: "2025-11-21T02:05:19.9327Z",
    eingereicht_am: "2022-09-01T17:17:41.563546Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0863-7757-909a-4467f7c5c66d",
        name: "Luisa Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 1738 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-79c0-84ce-c52b85638517",
              safe_id: "DE.BRAK_SPT.4c841b70-d3b7-4006-a99b-df8e063980b1",
              name: "Rechtsanwalt Dr. Leonhard Böhm",
            },
          },
        ],
      },
      {
        id: "019aa60d-0863-7b70-bab6-b41c3556a996",
        name: "Franziska Müller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 7091 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7770-a54a-7957c1267fda",
              safe_id: "DE.BRAK_SPT.0e155ee6-2690-455a-bfe3-0334fcf53def",
              name: "Rechtsanwalt Dr. Fabian Weißmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-081d-763d-affa-7166cda07691",
    aktenzeichen_gericht: "H 5545 09/2026",
    status: "Eingereicht",
    status_changed: "2025-07-26T03:04:54.535465Z",
    eingereicht_am: "2022-07-17T01:04:33.580944Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-0830-7e64-910c-4bbdec94977d",
        name: "Andrea-Lena Vogt",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 4528 07/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7ee5-b5a7-a39bd09b88e3",
              safe_id: "DE.BRAK_SPT.c394b46f-3737-445c-81c6-79f869c68f6f",
              name: "Rechtsanwalt Dr. Miriam-Luise Ott",
            },
          },
        ],
      },
      {
        id: "019aa60d-0842-790f-9ca8-8de77121be20",
        name: "Johanna Groß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 9561 08/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0850-7148-a962-2a4c9cc2a459",
    aktenzeichen_gericht: "X 4578 06/2025",
    status: "Erstellt",
    status_changed: "2025-05-31T12:06:46.316242Z",
    eingereicht_am: "2022-07-11T18:43:11.358259Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0850-72e9-b23f-fb4161715d05",
        name: "Janina Müller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 8354 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0850-79f5-8d86-15a0249e53c7",
        name: "Eurowings",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0862-77ac-97d1-3baa77b4c9ca",
    aktenzeichen_gericht: "I 3382 03/2024",
    status: "Erstellt",
    status_changed: "2025-06-04T05:37:20.047609Z",
    eingereicht_am: "2022-07-02T06:23:46.559371Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0862-730d-a35c-243f52674845",
        name: "Luisa-Maria Roth",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 8704 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7bbd-9ee6-b6359e018c13",
              safe_id: "DE.BRAK_SPT.1b5eb5fc-9151-46f9-9957-c75062e9b799",
              name: "Dr. Kathrin Hölzer",
            },
          },
        ],
      },
      {
        id: "019aa60d-0862-787f-92de-6ea160243eb8",
        name: "Ludwig-Konstantin-Maximilian von Schönwald-Küster-Schäfer-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 9523 07/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-78bd-b99c-6579016f3ab2",
              safe_id: "DE.BRAK_SPT.c85a54af-9270-4ccc-aab5-62649e3d4c58",
              name: "Rechtsanwalt Dr. Tobias-Maurer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0854-7a7a-86ba-c04320f51e23",
    aktenzeichen_gericht: "S 3695 12/2024",
    status: "Eingereicht",
    status_changed: "2025-02-09T01:51:33.34704Z",
    eingereicht_am: "2022-06-19T11:42:59.955045Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0854-770e-bd4d-6094949d5ef3",
        name: "Ryanair",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 5778 06/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0854-7d51-abb6-496cd736780b",
        name: "Nina Schäfer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "H 1601 06/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0859-732e-ab82-e3ed162244a1",
    aktenzeichen_gericht: "W 4385 11/2026",
    status: "Erstellt",
    status_changed: "2025-03-10T00:17:31.410176Z",
    eingereicht_am: "2022-05-03T03:08:18.933039Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0859-7bcb-9091-59ab72c1c83b",
        name: "Karl-Ludwig-Ferdinand-Maximilian von Schönberg-Kühn-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 8426 06/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-76f9-b592-b9f3d725426d",
              safe_id: "DE.BRAK_SPT.7b118946-003e-4521-b0d3-29e1b1b55529",
              name: "Dr. Dominik Weiß",
            },
          },
          {
            aktenzeichen: "X 5133 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0859-7e60-934d-817b20863cae",
        name: "Lena-Maria Böhm",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 1207 03/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-773b-b4de-478554631be6",
              safe_id: "DE.BRAK_SPT.b89191c4-761a-4b9f-98f5-bf5c2b6fb244",
              name: "Rechtsanwalt Dr. Melanie Schäfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0864-7dec-b66b-9a573f35405a",
    aktenzeichen_gericht: "N 3722 11/2026",
    status: "Eingereicht",
    status_changed: "2025-01-17T04:36:15.699569Z",
    eingereicht_am: "2022-04-27T21:27:46.366223Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-0864-73bc-902b-63ea74f53dfd",
        name: "Fabian Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 3744 05/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7bb7-9a2c-84a0105cea96",
              safe_id: "DE.BRAK_SPT.07bda880-81d1-4cda-95a7-cf25994e860d",
              name: "Rechtsanwalt Dr. Andreas Krämer",
            },
          },
        ],
      },
      {
        id: "019aa60d-0864-794e-b7e4-8be814f61e72",
        name: "Paulina-Luise Katharina von Hölzer-Schönfeld",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "F 1462 05/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0866-7154-b03a-b213176cf597",
    aktenzeichen_gericht: "Y 9905 07/2024",
    status: "Eingereicht",
    status_changed: "2025-06-13T01:40:02.867384Z",
    eingereicht_am: "2022-02-21T08:14:29.907031Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-0866-717c-8cf6-3e9392481871",
        name: "Matthias Kübler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 7470 11/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0866-7897-a659-d0d11a21322b",
        name: "Kathrin Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 6360 07/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-73a2-97a0-2ba2fe4be6c3",
              safe_id: "DE.BRAK_SPT.2009cd68-9544-4350-8718-9a1dc9ed4ffd",
              name: "Rechtsanwalt Andreas Groß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0859-7926-b829-8b4b09ed265f",
    aktenzeichen_gericht: "P 9358 06/2026",
    status: "Eingereicht",
    status_changed: "2025-08-23T04:57:32.287381Z",
    eingereicht_am: "2022-02-15T05:14:24.17289Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019aa60d-0859-71d5-9c78-22264acd2c59",
        name: "Miriam-Johanna-Elisabeth von und zu Löwenstein-Bär-Schäfer-Küster",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 868 11/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0859-785c-a602-ed37753b00c3",
        name: "Annemarie Scholz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 319 10/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-774f-b503-7cbcfe7f95b9",
              safe_id: "DE.BRAK_SPT.9e3b4c77-99f5-4474-9cf5-ddbd42b0c8e8",
              name: "Rechtsanwalt Markus Lösch",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084f-7874-beff-f99507e9cf47",
    aktenzeichen_gericht: "A 1485 03/2026",
    status: "Eingereicht",
    status_changed: "2025-04-01T22:12:58.149053Z",
    eingereicht_am: "2022-02-15T00:52:52.233629Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-084f-708a-9f6c-fcff85b30618",
        name: "TUI Fly",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 5751 05/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7aec-8748-2ff9b7fc3feb",
              safe_id: "DE.BRAK_SPT.9907fdf4-a972-4f33-b6a8-db7b06c7080c",
              name: "Dr. Friedrich-Wilhelm Günther von Schönfeld-Krüger",
            },
          },
          {
            aktenzeichen: "H 9520 13/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-76ab-8d58-65e7a0144cb0",
              safe_id: "DE.BRAK_SPT.408e9ed1-9a6e-4381-9f57-59d9099d46fc",
              name: "Rechtsanwalt Gabriele Kraus",
            },
          },
        ],
      },
      {
        id: "019aa60d-084f-7fbc-92eb-40864c9811c8",
        name: "Katharina Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 1647 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0855-7028-b802-826aa9d38f53",
    aktenzeichen_gericht: "Y 8849 09/2024",
    status: "Eingereicht",
    status_changed: "2025-04-03T14:31:15.654795Z",
    eingereicht_am: "2022-01-21T21:00:51.436172Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0855-7bb6-bab7-00ecf32862cf",
        name: "Tobias-Matthias Alexander von Krämer-Böhler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 4980 02/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-75e4-9aaa-c5e3c460c2f2",
              safe_id: "DE.BRAK_SPT.8b70056e-c8a5-4d50-a310-e091440cff60",
              name: "Dr. Florian Bär",
            },
          },
        ],
      },
      {
        id: "019aa60d-0855-7f1c-b833-6f1cc75853c5",
        name: "Klaus Schäfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 6338 04/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7d3b-a13b-b30a69131018",
              safe_id: "DE.BRAK_SPT.bfdc4473-8a0e-486e-8cd1-b42784982450",
              name: "Rechtsanwalt Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
            },
          },
          {
            aktenzeichen: "P 3923 04/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7591-9069-05942b28035e",
              safe_id: "DE.BRAK_SPT.32653b55-5a30-492d-8a15-a319ae9afe37",
              name: "Dr. Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0857-7277-a407-681112869029",
    aktenzeichen_gericht: "M 3245 07/2026",
    status: "Erstellt",
    status_changed: "2024-12-28T22:48:07.823034Z",
    eingereicht_am: "2022-01-06T22:26:22.225434Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0857-7082-a496-ad813f1a68a6",
        name: "Dieter Böhm",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Y 8465 10/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0857-7142-8efb-2107a7660849",
        name: "Helene-Marie Augusta von Schwanenburg-Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 2997 06/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0853-7a5f-8cb6-6b5e31ff0ebf",
    aktenzeichen_gericht: "N 1547 02/2024",
    status: "Eingereicht",
    status_changed: "2025-06-01T16:36:00.026363Z",
    eingereicht_am: "2021-11-12T08:41:26.027863Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0853-7075-b1e4-c3d9a9a150f1",
        name: "Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-0853-7e02-946c-80be648f261d",
        name: "Katharina-Elisabeth von der Hohenau-Müller",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 4446 08/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085e-715a-8bd0-8940b8f54382",
    aktenzeichen_gericht: "J 4706 09/2025",
    status: "Eingereicht",
    status_changed: "2025-04-15T16:33:47.347417Z",
    eingereicht_am: "2021-11-01T03:54:34.353873Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-085e-71cd-b472-e945c3e8d67f",
        name: "Anna-Katharina-Luise von Brückner-Weiß-Krüger-Schäfer-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 7645 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-085e-7fe6-89f1-adb44fac6e97",
        name: "Anna-Maria-Katharina-Elisabeth von Löwenstein-Kranz-Schäfer-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 8174 07/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-731b-825d-de4ace183a2f",
              safe_id: "DE.BRAK_SPT.0426c2d2-98c8-4fb7-ad7a-3579263b74e1",
              name: "Dr. Carola Münch",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085c-7432-9c00-c081df8dafcc",
    aktenzeichen_gericht: "Y 3388 06/2024",
    status: "Erstellt",
    status_changed: "2025-03-25T23:12:23.775335Z",
    eingereicht_am: "2021-07-27T03:31:48.72139Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019aa60d-085c-707f-aaf5-144ef1dc23cc",
        name: "Miriam Hölzer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "C 7813 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "G 1744 02/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-72dd-8424-5db6d08a8c82",
              safe_id: "DE.BRAK_SPT.d1c3f743-d16d-4708-a48e-0a5e8d0a0450",
              name: "Rechtsanwalt Dr. Karl-Heinrich Ludwig von Hohenstein-Kranz",
            },
          },
        ],
      },
      {
        id: "019aa60d-085c-7344-9f15-99b2759d019d",
        name: "Christoph-Michael von und zu Großmann-Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 9282 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7b9a-9322-f9f769fbb122",
              safe_id: "DE.BRAK_SPT.da36752a-c97c-43e8-a21e-ba20b32449c9",
              name: "Rechtsanwalt Tobias Schönfeld",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0860-7588-ab6b-d43187083735",
    aktenzeichen_gericht: "F 4363 10/2026",
    status: "Eingereicht",
    status_changed: "2025-01-20T05:38:27.968218Z",
    eingereicht_am: "2021-07-06T00:15:12.328801Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0860-7809-bcc3-dfa9d76eece7",
        name: "Johanna Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 9444 06/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0860-7fff-a7dd-9af9b17813ac",
        name: "Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 4328 08/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7344-9323-a724ec5bb56b",
              safe_id: "DE.BRAK_SPT.3417f8e4-9201-4365-9760-0b054ee710e5",
              name: "Rechtsanwalt Dr. Johanna-Marie-Isabell-Elisa von Weißmann-Hölzer-Kranz-Schönfeld",
            },
          },
          {
            aktenzeichen: "I 3145 08/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7a5f-a12c-650e0e6ed412",
              safe_id: "DE.BRAK_SPT.05dbdbb7-b4ff-4dd5-ac22-49de7e1eb8e8",
              name: "Dr. Friedrich-Alexander-Johannes von Hohenstein-Bär-Krüger-Schäfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085a-7ed1-9721-abd15b067fdd",
    aktenzeichen_gericht: "R 8678 02/2024",
    status: "Eingereicht",
    status_changed: "2024-12-17T02:41:42.850918Z",
    eingereicht_am: "2021-07-01T08:36:30.774611Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-085a-7588-b61e-2d043570b260",
        name: "Benedikt-Lorenz von Löwenau-Schönfeld",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 8284 07/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7701-8b1a-73ed43a5c529",
              safe_id: "DE.BRAK_SPT.23a688db-07f8-4b87-b92b-ad55b46c0dc1",
              name: "Rechtsanwalt Dr. Anna-Katharina-Luise von Brückner-Weiß-Krüger-Schäfer-Kühn",
            },
          },
        ],
      },
      {
        id: "019aa60d-085a-786f-9acc-ec1873f7acb3",
        name: "Eurowings",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
    ],
  },
  {
    id: "019aa60d-0851-7c56-a44b-9ae42a4ea902",
    aktenzeichen_gericht: "K 1194 02/2024",
    status: "Erstellt",
    status_changed: "2025-09-20T07:34:09.468584Z",
    eingereicht_am: "2021-06-24T03:42:23.940568Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0851-75be-adfe-3976b757891e",
        name: "Johanna-Elisabeth-Maria von Krüger-Lösch",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "I 8276 13/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7202-bc79-255f1558aa9a",
              safe_id: "DE.BRAK_SPT.2c1a0041-87e9-42c4-ae37-a477bff7272c",
              name: "Dr. Miriam Hölzer",
            },
          },
        ],
      },
      {
        id: "019aa60d-0851-7cbc-8645-88b37e333123",
        name: "Elisa-Luise Roth",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "T 9553 09/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "Z 6966 09/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7ad7-a172-67eb580bcbff",
              safe_id: "DE.BRAK_SPT.3ed779e4-f26e-4365-b3ad-27c866643229",
              name: "Dr. Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0856-7ac2-9019-71039805bf0e",
    aktenzeichen_gericht: "O 4348 10/2026",
    status: "Eingereicht",
    status_changed: "2025-08-06T11:53:53.514776Z",
    eingereicht_am: "2021-05-24T00:56:40.533302Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0856-7304-8501-023ca26f49f6",
        name: "Tobias Löhr",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 7452 07/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7ac2-bf27-157ace2a38f0",
              safe_id: "DE.BRAK_SPT.c720c07e-06ab-42a4-a3b9-29b6891d75da",
              name: "Dr. Luisa-Maria Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0856-795c-b837-12cc7d7c185e",
        name: "Markus Lösch",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 4694 03/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7ed7-bc90-b8d5609e7a4b",
              safe_id: "DE.BRAK_SPT.90998c27-9cfa-4ced-a1be-bee43ef378de",
              name: "Dr. Claudia-Maria-Theresia Gräfin von Großwald",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0855-75c1-bd5a-cfbfbba69b40",
    aktenzeichen_gericht: "T 1968 01/2024",
    status: "Eingereicht",
    status_changed: "2024-12-28T12:53:59.781992Z",
    eingereicht_am: "2021-04-29T08:05:14.414233Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0855-7540-b6c4-3cd83586d061",
        name: "Matthias Böhler",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-0855-7f3f-bbf4-7f51739ac916",
        name: "Julius Krämer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "L 1423 10/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0858-7ff4-816c-ba09e2985d34",
    aktenzeichen_gericht: "Z 2887 04/2026",
    status: "Erstellt",
    status_changed: "2025-03-15T02:46:29.299316Z",
    eingereicht_am: "2021-04-28T04:48:43.562824Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0858-7893-a816-c7eaf44a94c7",
        name: "Claudia-Maria-Theresia Gräfin von Großwald",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "R 9117 04/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7fa0-92a3-8c6bd21acb4e",
              safe_id: "DE.BRAK_SPT.5c582889-72de-4780-ac2a-29ad51fa7065",
              name: "Dr. Jonas-Luca Weiß",
            },
          },
        ],
      },
      {
        id: "019aa60d-0858-7c10-9b93-56f0bfc60c14",
        name: "Markus Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "Q 6012 05/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7fc2-8613-3aa4aa3e0d4f",
              safe_id: "DE.BRAK_SPT.3c68f207-368f-4bde-afa6-f7ec80525313",
              name: "Rechtsanwalt Stefan Kranz",
            },
          },
          {
            aktenzeichen: "Z 2235 13/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085c-701a-a7b9-e2a516f0518a",
    aktenzeichen_gericht: "H 3727 13/2024",
    status: "Eingereicht",
    status_changed: "2025-01-08T11:38:04.799079Z",
    eingereicht_am: "2021-03-19T10:44:16.541923Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-085c-70d5-b6cf-785d4d4baf61",
        name: "Jonas-Maurer",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 4836 12/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-085c-744f-8d3c-3c82b5f60c93",
        name: "Johanna-Marie-Isabell-Elisa von Weißmann-Hölzer-Kranz-Schönfeld",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 9072 04/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7a44-a187-f7defd33fcf7",
              safe_id: "DE.BRAK_SPT.7fb35999-a37b-4eae-98a1-f6c6a1cca8d7",
              name: "Rechtsanwalt Dr. Alina-Theresa Viktoria von der Grünenau",
            },
          },
          {
            aktenzeichen: "C 1394 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0858-7d82-83fa-8d23db8712f3",
    aktenzeichen_gericht: "K 4758 05/2026",
    status: "Erstellt",
    status_changed: "2025-11-01T07:44:23.29844Z",
    eingereicht_am: "2021-02-20T17:22:33.018329Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0858-7029-a1e2-30597144b90d",
        name: "Anna-Lena-Marie von Schönbrunn-Kühn",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "O 5166 13/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0858-73d1-bcff-06350c95e008",
        name: "Nina Kranz",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 3960 12/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7831-8b42-078c12f33406",
              safe_id: "DE.BRAK_SPT.1895d250-8259-4d65-b2fa-b54bbd1b2a1b",
              name: "Rechtsanwalt Dr. Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
            },
          },
          {
            aktenzeichen: "H 3743 11/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7377-b47f-101464ea3fc6",
              safe_id: "DE.BRAK_SPT.c29bf2a7-3799-4bb0-ab26-7049f03e99b3",
              name: "Rechtsanwalt Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084c-7342-ba7d-649f47b0d032",
    aktenzeichen_gericht: "B 821 05/2026",
    status: "Erstellt",
    status_changed: "2025-03-07T11:41:16.799384Z",
    eingereicht_am: "2021-02-19T06:43:54.057052Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-084c-79ad-a26f-ebc528bfa3bd",
        name: "Emilia-Charlotte Freifrau von Löwenstein-Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 8505 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7595-918a-d4938613b14f",
              safe_id: "DE.BRAK_SPT.e09a56d4-4e3e-44e3-92cf-b3d69a6e9d93",
              name: "Rechtsanwalt Dr. Hannes Großmann",
            },
          },
        ],
      },
      {
        id: "019aa60d-084c-7c8b-a271-9519023e2b28",
        name: "Helene Küster",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "J 4395 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0851-7779-82ac-cf9a744fe172",
    aktenzeichen_gericht: "L 1505 01/2024",
    status: "Eingereicht",
    status_changed: "2024-11-23T12:50:39.666465Z",
    eingereicht_am: "2021-01-28T10:56:28.432906Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0851-7486-8f6b-924fa2a47efe",
        name: "Ryanair",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "V 8590 08/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "O 2647 05/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-7241-8e25-151a367af98f",
              safe_id: "DE.BRAK_SPT.90ec2f56-2a03-4d04-bb10-7b561e1e69d6",
              name: "Dr. Katharina Weiß",
            },
          },
        ],
      },
      {
        id: "019aa60d-0851-7757-9f90-97711a798ca4",
        name: "Johanna Großmann",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 3470 06/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0856-78c3-a506-aea17f0558ad",
    aktenzeichen_gericht: "J 4599 05/2026",
    status: "Eingereicht",
    status_changed: "2025-06-09T00:52:48.290479Z",
    eingereicht_am: "2021-01-27T21:29:56.891692Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0856-7343-b737-43a4d9f3e07d",
        name: "Fabian Groß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "X 2278 10/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0856-7886-964b-969871651590",
        name: "Ryanair",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "K 5409 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-75aa-aed7-b203548d91e3",
              safe_id: "DE.BRAK_SPT.4d6fc802-e908-424b-b6d7-1b8fe0dc1e51",
              name: "Rechtsanwalt Dr. Alexander Höfer",
            },
          },
          {
            aktenzeichen: "K 7957 11/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-727d-a2b5-63c026f8cfa7",
              safe_id: "DE.BRAK_SPT.9f00d584-5e83-437a-b82c-2f0eb6c284a0",
              name: "Dr. Wolfgang Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-085d-76af-b967-e36169091cb4",
    aktenzeichen_gericht: "K 4295 04/2024",
    status: "Eingereicht",
    status_changed: "2025-10-09T23:16:41.388607Z",
    eingereicht_am: "2021-01-20T08:47:41.2915Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-085d-7382-8b87-502352979b87",
        name: "Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "G 9253 01/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-780e-bfd2-91784a6fa440",
              safe_id: "DE.BRAK_SPT.02939c7c-ea9a-4338-a3b0-bb17584004dc",
              name: "Rechtsanwalt Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
            },
          },
          {
            aktenzeichen: "D 8432 02/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7fd9-b76c-35f90aaa0f62",
              safe_id: "DE.BRAK_SPT.70d1df1e-e3e2-4b13-8067-d67f19dbd29d",
              name: "Dr. Emilia Kühn",
            },
          },
        ],
      },
      {
        id: "019aa60d-085d-7f7e-80fe-edb89153f5ef",
        name: "Clara-Louise-Friederike von Brück-Köhler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "N 4685 08/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdc-7e4d-bd8d-2faffae63e3b",
              safe_id: "DE.BRAK_SPT.a83472c6-10da-4ef1-93eb-41f3e5e81531",
              name: "Rechtsanwalt Dr. Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0856-74b4-a51a-7ac35f5b4706",
    aktenzeichen_gericht: "N 203 03/2025",
    status: "Erstellt",
    status_changed: "2025-10-11T13:41:07.010096Z",
    eingereicht_am: "2021-01-08T17:22:48.821402Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019aa60d-0856-7475-a1e9-5863445330b3",
        name: "Laurenz Böhler",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 1818 13/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0856-7a8d-bc39-d6d14742df47",
        name: "Julia-Maria-Luise von Schönfeld-Weißmann-Küster-Schäfer-Kranz",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "W 260 10/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0857-7593-8ffc-a13074c9f9e2",
    aktenzeichen_gericht: "K 7787 12/2026",
    status: "Eingereicht",
    status_changed: "2024-12-20T08:53:18.535664Z",
    eingereicht_am: "2021-01-08T05:49:35.260645Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0857-786c-90cc-86ed3b47b0ac",
        name: "Jonas-Luca Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "M 2995 12/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019aa60d-0857-7fc4-bcd3-edcfb2b2fdeb",
        name: "Condor",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 1901 11/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0863-7bb3-bf1c-0d4d612cc50f",
    aktenzeichen_gericht: "G 2160 06/2026",
    status: "Erstellt",
    status_changed: "2025-10-25T18:39:46.365349Z",
    eingereicht_am: "2021-01-01T12:41:21.259765Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019aa60d-0863-7310-9ac1-ee9ad68f3744",
        name: "Andreas-Friedrich-Johannes von Hohenau-Krämer-Schönfeld-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [],
      },
      {
        id: "019aa60d-0863-7403-a20b-4a22e85508ab",
        name: "Johanna Möser",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 221 09/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-74cc-b888-82def3545e59",
              safe_id: "DE.BRAK_SPT.61638459-c5e9-4a16-b35d-6f563af93db5",
              name: "Rechtsanwalt Leonhard Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-084f-7df5-951d-3d2abc13973f",
    aktenzeichen_gericht: "S 9889 10/2026",
    status: "Erstellt",
    status_changed: "2025-01-07T17:05:09.460124Z",
    eingereicht_am: "2021-01-01T10:05:47.301434Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-084f-76e0-a032-841ce2313649",
        name: "Friedrich-Wilhelm-Lukas-Maximilian von Großmann-Schäfer-Kühn-Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "S 9190 03/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-763c-a9b8-81acca6452de",
              safe_id: "DE.BRAK_SPT.cb7c015c-f260-4d70-bb9c-9c3c20915adc",
              name: "Rechtsanwalt Matthias Köhn",
            },
          },
          {
            aktenzeichen: "T 4647 07/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6bda-738c-9f03-80b323ca5b8e",
              safe_id: "DE.BRAK_SPT.f7706365-b2b1-45a0-b7cf-195301f0ae4e",
              name: "Rechtsanwalt Dr. Günther Weißmann",
            },
          },
        ],
      },
      {
        id: "019aa60d-084f-77a0-8589-928c400042e9",
        name: "Benedikt Weiß",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "E 7734 13/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0853-7278-8ce4-88cbf5f54e82",
    aktenzeichen_gericht: "I 7622 02/2025",
    status: "Eingereicht",
    status_changed: "2025-02-14T10:20:15.734305Z",
    eingereicht_am: "2020-12-30T20:41:25.331581Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019aa60d-0853-744d-b05d-aa8547991ac2",
        name: "Friedrich-Johannes-Karl von Bärenfels-Schön-Küster-Weißmann",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "U 305 05/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "U 1779 04/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-7fb6-a91b-30ec9f91e46b",
              safe_id: "DE.BRAK_SPT.c98bd4de-2c77-47e6-a7f4-133d50a88574",
              name: "Rechtsanwalt Dr. Sabine Großmann",
            },
          },
        ],
      },
      {
        id: "019aa60d-0853-79fe-a688-090f731561ec",
        name: "Florian Schön",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 6586 06/2025",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019aa60d-0855-7958-8892-9dc339c88f7d",
    aktenzeichen_gericht: "O 8487 09/2025",
    status: "Erstellt",
    status_changed: "2024-12-23T04:41:50.28041Z",
    eingereicht_am: "2020-11-24T11:35:51.587778Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019aa60d-0855-78f3-9abf-be959760db18",
        name: "Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 5996 13/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
          {
            aktenzeichen: "O 8101 02/2024",
            bevollmaechtigter: {
              id: "019aa5f3-6bdb-712a-90fc-ac3368f9013d",
              safe_id: "DE.BRAK_SPT.54465631-8977-4188-a841-ab16a01fd60b",
              name: "Dr. Klaus Schäfer",
            },
          },
        ],
      },
      {
        id: "019aa60d-0855-7cb4-81b2-1a7399df8dd8",
        name: "Karl-Heinrich Ludwig von Hohenstein-Kranz",
        rollen: [
          {
            id: "c53dd226-7bd9-4da5-19da-5302595a9469",
            wert: "Kläger(in)",
            code: "101",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "B 7905 10/2026",
            bevollmaechtigter: {
              id: "019aa5f3-6b2b-7099-ba83-6459afe3ec16",
              safe_id: "DE.BRAK_SPT.b1e6ed03-cbb2-4ac7-8a9d-50e668f16898",
              name: "Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
];

export const mockKomPlaIdPTokenExchange = {
  access_token: "xxx",
  expires_in: 300,
  refresh_expires_in: 1800,
  refresh_token: "yyy",
  token_type: "Bearer",
  "not-before-policy": 0,
  session_state: "zzz",
  scope: "write:verfahren email profile read:verfahren read:gericht safe-id",
  issued_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
};
