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
