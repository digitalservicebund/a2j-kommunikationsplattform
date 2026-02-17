// fresh copy of GET /verfahren resonse from https://app.kompla-justiz.sinc.de/main/swagger/index.html
export const mockVerfahren = [
  {
    id: "019c572a-d6d4-77a8-aad7-ae4496fa2463",
    aktenzeichen_gericht: null,
    status: "ERSTELLT",
    status_changed: "2026-02-13T13:22:31.082452Z",
    eingereicht_am: null,
    gericht: null,
    beteiligungen: [],
  },
  {
    id: "019c5740-36de-7089-a3db-530407ee6684",
    aktenzeichen_gericht: null,
    status: "ERSTELLT",
    status_changed: "2026-02-13T13:45:52.075976Z",
    eingereicht_am: null,
    gericht: null,
    beteiligungen: [],
  },
  {
    id: "019c5741-728d-7b45-8bce-094c33d68086",
    aktenzeichen_gericht: "M 8545 01/2025",
    status: "EINGEREICHT",
    status_changed: "2025-07-25T11:39:32.038236Z",
    eingereicht_am: "2026-01-20T15:02:51.792398Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "b2965bf3-5de6-f51e-4ca3-36cd6bd0b9f1",
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
            id: "a82214fa-3a8c-af97-a1e4-471c4e4588c7",
            name: "Dr. Julia-Maria Roth",
            aktenzeichen: "C 2254 06/2026",
          },
        ],
      },
      {
        id: "d6206130-a943-cd81-e487-f746dbae6b36",
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
            id: "38f88aaa-3082-8bae-0055-90bbc79b9f89",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "D 966 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-7ee6-99de-41d9605697d2",
    aktenzeichen_gericht: "Z 7818 07/2026",
    status: "EINGEREICHT",
    status_changed: "2026-02-01T00:54:13.74434Z",
    eingereicht_am: "2026-01-08T05:28:04.618475Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "31314ce5-0b11-eb69-00f9-9ea3e0abba50",
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
            id: "e485868e-4aa4-b7ad-d2ef-57d80b97b0eb",
            name: "Rechtsanwalt Dr. Nina Schäfer",
            aktenzeichen: "W 2373 13/2026",
          },
        ],
      },
      {
        id: "8a5644a0-0cfd-d8af-b668-de7e68c41f06",
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
            id: "46a43817-90b4-0291-3043-51e357a7889b",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "O 9814 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7287-7a2e-bcf6-3fc31b58abb5",
    aktenzeichen_gericht: "Y 6423 05/2024",
    status: "ERSTELLT",
    status_changed: "2026-02-03T20:30:39.691907Z",
    eingereicht_am: "2025-12-25T03:18:12.740415Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "572f827c-fdfd-d3bb-cd21-d1e67aaebe44",
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
            id: "dcc44467-7079-fded-f344-974b5cb5c3ce",
            name: "Dr. Leonhard Böhm",
            aktenzeichen: "G 4249 07/2024",
          },
          {
            id: "661154f6-9da3-d711-1d83-27622d956a7f",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "A 6873 11/2025",
          },
        ],
      },
      {
        id: "6f74c189-9ebb-1894-1db8-d1fd22af27aa",
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
            id: "70c2dc02-d2f1-6dee-1e10-76b621151a64",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 4890 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed0-7814-9768-2f051964205a",
    aktenzeichen_gericht: "D 5294 12/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-06T00:21:53.834084Z",
    eingereicht_am: "2025-12-20T15:01:51.635561Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "3401cb09-2f24-8dd8-5475-a47ca1038cf2",
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
            id: "12d1f09a-a606-da1e-c150-03d1d2cfcb9a",
            name: "Tim Becker",
            aktenzeichen: "L 1525 09/2024",
          },
        ],
      },
      {
        id: "8cdc5290-07f9-fbcc-355a-016044425fa3",
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
            id: "a6dddb2f-298a-04b8-e3f7-b414432de97a",
            name: "Dr. Hannes Großmann",
            aktenzeichen: "Q 6520 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7622-ae56-487ed7a2949a",
    aktenzeichen_gericht: "W 4425 11/2024",
    status: "ERSTELLT",
    status_changed: "2026-02-08T19:12:34.313635Z",
    eingereicht_am: "2025-12-15T08:40:22.552705Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "9270255f-2073-504a-ebe9-3f11cb492b50",
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
            id: "72bf2519-764d-5590-2f64-bcc62f066bbb",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "N 1397 04/2024",
          },
        ],
      },
      {
        id: "d872abbb-f64d-f1ef-2b67-c2e0f24657ec",
        name: "Johanna-Elise-Margarethe von Hohenau-Krüger-Weiß-Schäfer",
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
    id: "019c5741-7290-7016-a13c-ffb41a260ee9",
    aktenzeichen_gericht: "C 8925 07/2025",
    status: "EINGEREICHT",
    status_changed: "2025-07-23T01:13:10.594997Z",
    eingereicht_am: "2025-12-12T11:38:45.319543Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "8cd9ebfc-1f61-6a12-cbb0-566e3744180a",
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
            id: "7ff69fb1-1329-ef1c-c145-d45f765a2917",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "O 8335 06/2025",
          },
        ],
      },
      {
        id: "93ecd139-695f-94a0-d6db-2c0eb76d600c",
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
            id: "77dfa73c-0bfb-3632-3f9b-1d8a26fbc813",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "L 2750 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-7b12-a42d-5d0470d606e9",
    aktenzeichen_gericht: "O 7718 05/2024",
    status: "EINGEREICHT",
    status_changed: "2025-05-12T21:22:14.651108Z",
    eingereicht_am: "2025-12-11T08:46:36.948274Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "057cbf97-6e5b-77e0-4bea-f80a418a5bdd",
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
            id: "e49a5bda-dffc-9e89-ca7d-6e734ab34fe2",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 2827 01/2025",
          },
        ],
      },
      {
        id: "6bd062fa-748d-d3ea-1343-af18e9a8f96d",
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
            id: "edf57c3c-6765-0646-91b4-038ed7b3b377",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "L 7865 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-711d-a85a-fdc96cd28491",
    aktenzeichen_gericht: "Z 2313 08/2024",
    status: "ERSTELLT",
    status_changed: "2025-11-12T20:30:31.947367Z",
    eingereicht_am: "2025-12-10T05:27:16.98373Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "06afe34b-93d1-6c6c-76c2-05f3aec15e50",
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
            id: "79f44a90-7c13-480a-a33d-ad680e0cb09a",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 9622 04/2024",
          },
        ],
      },
      {
        id: "13ebf317-ebe0-eec4-efed-8a4c638142b5",
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
            id: "e652e4c5-f470-29a3-27ce-b0d9cb279484",
            name: "Rechtsanwalt Emilia-Charlotte Freifrau von Löwenstein-Kranz",
            aktenzeichen: "Y 8126 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7280-bf8c-58a095c98976",
    aktenzeichen_gericht: "C 5873 12/2025",
    status: "EINGEREICHT",
    status_changed: "2025-05-29T07:47:40.094936Z",
    eingereicht_am: "2025-11-20T08:11:39.842955Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "1a782819-372b-67d7-8b56-19a183ab21cf",
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
            id: "66672cf5-f9f5-3d4b-b261-6b652ac4e779",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "P 500 05/2026",
          },
        ],
      },
      {
        id: "c4e10157-9e46-4653-0a9a-3145b28aba52",
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
            id: "6a8d535c-b0c4-253a-e1f4-3660b5a15d2f",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "W 3012 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-7ed2-8b4f-3c04e2bb1130",
    aktenzeichen_gericht: "I 5954 13/2024",
    status: "ERSTELLT",
    status_changed: "2025-12-20T18:35:30.324109Z",
    eingereicht_am: "2025-11-18T23:49:31.222057Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "5213340c-8fd0-fd0a-ba3b-5c8454b30e3a",
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
        id: "eb084461-0435-6a2d-5fae-83741946d1fa",
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
            id: "26321f8b-7a0d-f681-3d27-336228206fe3",
            name: "Rechtsanwalt Dr. Johanna Weiß",
            aktenzeichen: "B 6980 09/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728d-7760-9d7a-3f725b00b6a6",
    aktenzeichen_gericht: "Y 9253 12/2025",
    status: "EINGEREICHT",
    status_changed: "2026-02-09T13:21:32.367522Z",
    eingereicht_am: "2025-10-26T16:14:49.738091Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "05e715ce-4fe4-a693-be0f-f597ef4de600",
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
            id: "65f91d8c-f70a-ff9f-8d75-b2c6d69f5fc7",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "P 2841 11/2026",
          },
        ],
      },
      {
        id: "457e2755-665d-9bfe-0560-838b4ef7724f",
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
            id: "41575658-90f3-eb74-3541-cbf9b029f30e",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 9687 01/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7c62-8cc4-6c34b3cd2331",
    aktenzeichen_gericht: "W 9249 09/2024",
    status: "ERSTELLT",
    status_changed: "2025-11-04T03:17:18.33738Z",
    eingereicht_am: "2025-10-25T17:46:00.776513Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "a626acd7-4ded-0b11-7530-e98040fbeadc",
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
            id: "76b2404a-71f7-42b0-a59f-93955ef86c83",
            name: "Rechtsanwalt Sabine Schäfer",
            aktenzeichen: "D 4758 10/2025",
          },
        ],
      },
      {
        id: "c9fff588-2c1c-d0ca-4e67-972aef16d46b",
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
            id: "ff75017d-a85b-a5e2-ed54-c92e6b7e504e",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "P 6734 10/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed0-7a20-a0f5-f9a9963e26e2",
    aktenzeichen_gericht: "V 2642 12/2024",
    status: "EINGEREICHT",
    status_changed: "2025-05-16T03:47:04.881036Z",
    eingereicht_am: "2025-10-22T09:58:50.496672Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "5ec37b7c-25dc-dd35-87c2-9afbc21a665f",
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
            id: "c7547dfa-8aea-a049-7542-c1a4e9d77d9d",
            name: "Tim Becker",
            aktenzeichen: "K 7183 02/2025",
          },
        ],
      },
      {
        id: "648c3b24-5e79-91b4-6f8f-60446021a83e",
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
            id: "6dd9bc00-9d21-1b6c-32f8-6158d7a879a9",
            name: "Tim Becker",
            aktenzeichen: "J 1215 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-79bc-84d1-6f296de78f7e",
    aktenzeichen_gericht: "L 605 09/2024",
    status: "ERSTELLT",
    status_changed: "2025-10-18T05:49:48.973088Z",
    eingereicht_am: "2025-10-14T16:02:44.494699Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "635e7046-7ea7-ddc9-e718-1c7b42d8fa54",
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
            id: "5d8abaf4-5d08-93f1-f816-a3c6e5999e61",
            name: "Dr. Daniela Brück",
            aktenzeichen: "W 289 04/2024",
          },
        ],
      },
      {
        id: "e5156302-4360-6563-95c2-5a8942fbee66",
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
            id: "18170f87-fdbd-cb7c-24f5-2afc647d9762",
            name: "Tim Becker",
            aktenzeichen: "B 9314 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-7226-a14e-0b3a835983d4",
    aktenzeichen_gericht: "Z 9129 04/2026",
    status: "ERSTELLT",
    status_changed: "2025-10-19T06:06:03.63029Z",
    eingereicht_am: "2025-10-14T06:44:03.667227Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "227da899-7121-bce4-aa11-f72f90546b28",
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
            id: "75c6a078-303f-e70c-4874-15168816404f",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Z 7342 09/2026",
          },
        ],
      },
      {
        id: "dbc7d2d6-3a3c-2e8e-8d81-686cbc65aed4",
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
            id: "0da405e9-3acc-bdce-9b32-c4bee9b2117d",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "U 4447 13/2024",
          },
          {
            id: "b5423343-168b-a49b-ed91-6897417d8860",
            name: "Rechtsanwalt Christoph Weiß",
            aktenzeichen: "A 1335 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7609-84b1-46f6feaa11a4",
    aktenzeichen_gericht: "S 8612 02/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-20T07:16:39.899219Z",
    eingereicht_am: "2025-10-11T11:54:05.291365Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "0a9f85f2-eef3-b102-544a-6c998b3dc9bc",
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
      {
        id: "eb9dda30-546a-f56a-1f98-e379371e26b7",
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
            id: "f1bcac87-e0eb-4809-1ba2-2046489a108c",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "X 3687 05/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-78b4-87ca-ff93191b9bdf",
    aktenzeichen_gericht: "S 6792 04/2025",
    status: "ERSTELLT",
    status_changed: "2025-04-28T03:29:12.520508Z",
    eingereicht_am: "2025-10-03T05:13:59.369408Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "15a7aa32-66c9-9d1f-d947-53f137643026",
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
            id: "c6995b93-260f-a113-9aff-19d95dc59727",
            name: "Rechtsanwalt Gabriele-Luise-Friederike von der Lindenau-Küster-Schönfeld-Weiß",
            aktenzeichen: "J 7951 11/2025",
          },
        ],
      },
      {
        id: "de0d5419-f729-a28f-43d5-b9989dccf1fc",
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
            id: "a2bc0d33-93ed-d4bb-d15f-17904e846019",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "M 9368 09/2026",
          },
          {
            id: "ff8f4e7a-4a03-d702-6bd2-035cbb51b6c3",
            name: "Rechtsanwalt Elisa-Sophie-Luise-Gräfin von Löwenhügel-Küster-Schönfeld-Weiß",
            aktenzeichen: "K 3371 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-77ae-acd9-c7dc4b4bf312",
    aktenzeichen_gericht: "P 1731 06/2026",
    status: "EINGEREICHT",
    status_changed: "2025-02-26T19:24:45.183267Z",
    eingereicht_am: "2025-10-02T03:51:29.941324Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "531b8eb9-1345-38fa-dc07-f21406be7c60",
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
            id: "f84f54e3-7b3f-e28c-e003-f65cf529f206",
            name: "Rechtsanwalt Dr. Florian Bär",
            aktenzeichen: "L 5849 02/2024",
          },
        ],
      },
      {
        id: "a96f2d5b-6856-7940-9ccc-297ccb1e92fb",
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
            id: "0bb52bec-6fb9-e355-c3fd-4ffbd41dda48",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "A 8604 11/2024",
          },
          {
            id: "6e74fea0-dac0-b29e-da4b-7bb792d348b9",
            name: "Rechtsanwalt Dr. Alexander Höfer",
            aktenzeichen: "D 9091 10/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-71b2-915c-4dff69ca1bc9",
    aktenzeichen_gericht: "X 9181 08/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-23T17:13:36.219723Z",
    eingereicht_am: "2025-09-13T09:40:18.417222Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "52ec69cc-5fa0-16f6-a22c-1e12f4514457",
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
            id: "5267c2df-5320-8b29-68cb-e4f3cda4f4e5",
            name: "Rechtsanwalt Dr. Dieter Böhm",
            aktenzeichen: "S 7650 09/2026",
          },
        ],
      },
      {
        id: "e9760758-c78d-4451-e988-92abf4587954",
        name: "Elisa-Luise Roth",
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
    id: "019c5741-728f-7e4e-b6da-4ee0268192d4",
    aktenzeichen_gericht: "G 1561 13/2025",
    status: "ERSTELLT",
    status_changed: "2025-06-14T16:10:57.050765Z",
    eingereicht_am: "2025-09-10T20:06:55.021907Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "06b52313-d8c3-e5a2-498e-ea4e29eb3a6a",
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
            id: "c5795ff2-e289-5f21-c985-56bb5b069b6b",
            name: "Dr. Helene-Isabell-Theresa von Weißmann-Kühn-Schäfer-Bärenfels",
            aktenzeichen: "T 300 02/2024",
          },
        ],
      },
      {
        id: "1eefe7cd-11ea-fc98-0649-5d32b0db92b2",
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
            id: "9134deda-82a6-1afb-4b18-6e4198732f3c",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "M 7128 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-7857-add8-aec32e4e4ef4",
    aktenzeichen_gericht: "C 564 02/2024",
    status: "ERSTELLT",
    status_changed: "2026-01-28T19:45:08.825803Z",
    eingereicht_am: "2025-08-19T21:13:47.690723Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "26421100-724f-0255-c2f5-675d18180daa",
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
            id: "a1791697-3f49-1f78-ac60-b80e0b3b6c34",
            name: "Rechtsanwalt Dr. Miriam-Johanna-Elisabeth von und zu Löwenstein-Bär-Schäfer-Küster",
            aktenzeichen: "R 8465 04/2026",
          },
          {
            id: "28f0ea38-7ff6-ef09-0447-8a4afb1c7714",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "A 3113 07/2025",
          },
        ],
      },
      {
        id: "f9afaee1-add2-7529-d99c-57ac65cdea6d",
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
            id: "6970d55f-56a3-1ccd-6990-32626621abcf",
            name: "Rechtsanwalt Dr. Katharina Böhm",
            aktenzeichen: "I 3198 04/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2eda-75ad-8c6e-b4bde96c85f8",
    aktenzeichen_gericht: "A 5770 13/2026",
    status: "ERSTELLT",
    status_changed: "2025-07-20T15:12:43.450763Z",
    eingereicht_am: "2025-08-17T08:26:28.115057Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "7f8a43af-868a-ec4b-9e4f-6f2b074d0d9d",
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
            id: "8d497643-1513-3bbf-b534-3cf23a58190f",
            name: "Tim Becker",
            aktenzeichen: "P 6493 10/2024",
          },
        ],
      },
      {
        id: "808bba34-43dd-c38f-20b7-ad990c400be9",
        name: "Miriam-Johanna-Elisabeth von und zu Löwenstein-Bär-Schäfer-Küster",
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
    id: "019c5741-728b-7cc2-b80c-f3076f976126",
    aktenzeichen_gericht: "G 2882 01/2024",
    status: "ERSTELLT",
    status_changed: "2026-02-07T11:21:26.273905Z",
    eingereicht_am: "2025-08-03T10:24:43.586051Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "a0fa53e0-3995-1487-f11f-272e85146283",
        name: "Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
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
        id: "bdd84794-1499-cdc9-408b-fdb0af526b07",
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
            id: "36c8133a-e29c-fe66-3254-d84b339925ad",
            name: "Rechtsanwalt Ludwig-Leopold Alexander von Schönberg-Weiß",
            aktenzeichen: "G 8411 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7941-b4d4-69214363fd54",
    aktenzeichen_gericht: "R 4328 05/2024",
    status: "EINGEREICHT",
    status_changed: "2025-12-13T05:16:45.66184Z",
    eingereicht_am: "2025-08-01T06:22:48.537917Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "152f5707-9da3-f31e-0d5a-15a82516c475",
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
            id: "fae2f6ba-4a81-2717-188a-760a72067de0",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "E 3453 09/2024",
          },
        ],
      },
      {
        id: "80a7b11a-2639-6164-b7be-7fe648a872be",
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
            id: "2e167a54-e9d8-aca2-757b-0b9446f6c50d",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Q 9475 02/2024",
          },
          {
            id: "ad6cb16e-3cfd-a827-494e-5af730214a98",
            name: "Rechtsanwalt Dr. Tobias-Ferdinand Karl-Heinz von Römerstein",
            aktenzeichen: "S 3302 05/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-7a6a-8507-4fa6cad1aa9a",
    aktenzeichen_gericht: "M 5569 06/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-11T12:40:15.101777Z",
    eingereicht_am: "2025-07-31T03:58:44.580942Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "1928e3e9-59f9-5c09-4dd4-302d29769180",
        name: "Elisabeth Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "9bf9aed4-1149-95ba-1c66-92d2c8c11901",
            name: "Dr. Timo-Milan Ott",
            aktenzeichen: "A 6098 05/2026",
          },
        ],
      },
      {
        id: "dcc76feb-4d3b-7eeb-8168-d08e84a37bba",
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
            id: "b05ed117-a609-aac0-ed86-b8e4a208fe78",
            name: "Rechtsanwalt Dr. Matthias-Leonhard Theodor von Weißenthal",
            aktenzeichen: "Q 6909 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7b3d-ab51-f51ed1758567",
    aktenzeichen_gericht: "J 5202 04/2024",
    status: "ERSTELLT",
    status_changed: "2026-02-05T18:50:18.738612Z",
    eingereicht_am: "2025-07-15T23:19:47.93081Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "4be0faa8-1dcf-1b6f-3273-b973aa659a30",
        name: "Paulina-Maria-Isabell von und zu Hohenstein-Weiß-Krüger-Schäfer",
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
        id: "b2dea647-0092-398b-4e46-93727b035be9",
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
            id: "bc067ad8-d05c-9150-2069-a7fbe0a0fc89",
            name: "Rechtsanwalt Dr. Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
            aktenzeichen: "X 1581 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7a94-adf2-af71e3447d44",
    aktenzeichen_gericht: "J 7632 01/2024",
    status: "EINGEREICHT",
    status_changed: "2025-11-24T23:08:21.43618Z",
    eingereicht_am: "2025-07-13T18:09:19.504587Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "46f0999b-6e9c-c339-41e3-15bd82a36ab4",
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
            id: "c5375107-fee5-08c1-e2f5-f83f241b9437",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "P 5843 13/2026",
          },
          {
            id: "14cfd3c9-30e4-909d-de6d-5feb5b7a2023",
            name: "Rechtsanwalt Julia-Maria-Luise von Schönfeld-Weißmann-Küster-Schäfer-Kranz",
            aktenzeichen: "M 4510 10/2025",
          },
        ],
      },
      {
        id: "d699ca1d-aa24-7237-3cd7-0a0af0af4e70",
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
            id: "57745b43-d2b6-d789-8797-c59695615f57",
            name: "Dr. Julia-Maria Roth",
            aktenzeichen: "Q 3483 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-70cd-bb55-924ba86bd7e8",
    aktenzeichen_gericht: "H 1533 11/2025",
    status: "ERSTELLT",
    status_changed: "2025-05-20T00:28:34.200204Z",
    eingereicht_am: "2025-06-18T21:24:04.273251Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "69835780-0348-fee6-1bf1-4200843f6e41",
        name: "Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
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
        id: "6ed8fa3a-0ec5-e0a5-e04f-9b40c9ab141c",
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
            id: "83168a19-b06f-1579-75ac-375f48a6bc3f",
            name: "Dr. Sebastian Kranz",
            aktenzeichen: "J 7221 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-7823-ab54-3b084239b8bd",
    aktenzeichen_gericht: "C 6818 10/2024",
    status: "EINGEREICHT",
    status_changed: "2025-06-20T05:28:14.080903Z",
    eingereicht_am: "2025-06-10T02:00:19.954836Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "46db660d-2f73-7a84-47eb-ce7a8583bbf2",
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
            id: "fbeae46f-f0c9-bdb2-6190-b0afcb22b73f",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "A 5995 07/2025",
          },
        ],
      },
      {
        id: "9f0b4079-aefa-1985-95ab-4a0be9edde9c",
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
            id: "30ac9002-167b-08ca-bc48-c5c399484415",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "M 1622 09/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-7819-9ce9-4e199e5ad0e1",
    aktenzeichen_gericht: "I 1113 05/2026",
    status: "EINGEREICHT",
    status_changed: "2026-01-10T14:30:34.887262Z",
    eingereicht_am: "2025-06-04T23:13:26.25686Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "83f307cf-9946-6320-ac78-0b7ea3cf6a28",
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
            id: "e262f2ac-43e9-0c36-9e1a-c8e6b3db88a2",
            name: "Rechtsanwalt Andreas-Friedrich-Johannes von Hohenau-Krämer-Schönfeld-Weißmann",
            aktenzeichen: "R 5556 05/2026",
          },
        ],
      },
      {
        id: "8daab2f0-d0ea-4327-81ad-8c62bab191bc",
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
            id: "ecb59893-7ddf-cd8c-1f03-423db274fb32",
            name: "Tim Becker",
            aktenzeichen: "Z 9743 12/2025",
          },
          {
            id: "a17666bb-7380-c4e3-a691-c65ead2a2d7e",
            name: "Rechtsanwalt Cornelia Groß",
            aktenzeichen: "P 3653 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-799e-9dac-41bd74c756b2",
    aktenzeichen_gericht: "A 5883 12/2026",
    status: "EINGEREICHT",
    status_changed: "2026-01-27T10:27:17.517425Z",
    eingereicht_am: "2025-06-03T23:06:51.365647Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "2d12d6c8-96b0-98bb-629f-ad281cce7c96",
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
            id: "bf8ac0ef-0570-162b-fc12-39a562dcd0a5",
            name: "Dr. Miriam Hölzer",
            aktenzeichen: "H 926 03/2026",
          },
        ],
      },
      {
        id: "36954e46-fd33-6e1f-bf81-e512e33554a0",
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
            id: "a1a9d97b-c395-2f5f-aa6f-b83caa598cfd",
            name: "Dr. Anna-Maria-Luise von Hohenstein-Schwarzburg",
            aktenzeichen: "Z 1334 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-7a85-b2a8-69925b4e1d7b",
    aktenzeichen_gericht: "V 8211 05/2026",
    status: "ERSTELLT",
    status_changed: "2025-07-10T13:43:07.33328Z",
    eingereicht_am: "2025-04-27T23:51:22.557299Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "45835b5f-7bfb-91df-5355-f571849490b7",
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
            id: "9f1aba23-291b-6138-8664-cde040e76af7",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 569 04/2025",
          },
        ],
      },
      {
        id: "5558af83-39b3-e577-7d7b-92dafae5630a",
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
            id: "bf26b560-91c9-6ec6-8812-ff82a410ce66",
            name: "Rechtsanwalt Dr. Karl-Heinrich Ludwig von Hohenstein-Kranz",
            aktenzeichen: "Y 1767 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7a5a-99e6-462edb432a64",
    aktenzeichen_gericht: "B 9683 06/2024",
    status: "EINGEREICHT",
    status_changed: "2025-10-27T12:16:25.337207Z",
    eingereicht_am: "2025-04-09T07:26:35.79114Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "c643fa51-2436-d861-8452-02e23d6a031d",
        name: "Markus Lösch",
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
        id: "d205eec4-a65e-50b6-ccc9-fc604a523d5f",
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
            id: "2ef9690c-7989-d3ec-f5ae-ca3b2786a72d",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "G 2246 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed1-7bfe-bd15-468b5bad042b",
    aktenzeichen_gericht: "L 9837 10/2026",
    status: "EINGEREICHT",
    status_changed: "2025-12-12T22:57:13.70137Z",
    eingereicht_am: "2025-03-24T06:49:50.450568Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "48534ed1-6a67-ea72-9393-2559b156a0d3",
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
            id: "c3708e31-b133-9eb8-0cfc-fe297863b435",
            name: "Rechtsanwalt Antonia Löhr",
            aktenzeichen: "M 6685 03/2024",
          },
        ],
      },
      {
        id: "7353c4fe-b77c-7dfe-fd10-f37d885e0cb3",
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
            id: "b7be4adc-4899-7ff5-ebab-ef6cbe777309",
            name: "Rechtsanwalt Karl-Ludwig-Ferdinand-Maximilian von Schönberg-Kühn-Weißmann",
            aktenzeichen: "O 9288 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecd-77c1-ae32-2ed8f04f5aba",
    aktenzeichen_gericht: "J 884 01/2026",
    status: "ERSTELLT",
    status_changed: "2025-06-17T22:10:23.786032Z",
    eingereicht_am: "2025-03-21T14:22:48.175204Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "af044705-bfd7-6d4e-e582-da4716862d0f",
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
            id: "7b25da11-3817-7c63-233f-a2b48677fbe2",
            name: "Rechtsanwalt Tobias Schönfeld",
            aktenzeichen: "T 9813 11/2026",
          },
        ],
      },
      {
        id: "d6c66819-21ff-1611-d8fc-e313bed3f1e5",
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
            id: "e35dcba0-9d39-7fac-c423-8ad83a1c4256",
            name: "Tim Becker",
            aktenzeichen: "H 6070 03/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-7356-ab44-219bfb53ef3d",
    aktenzeichen_gericht: "F 6609 04/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-23T06:49:24.557218Z",
    eingereicht_am: "2025-03-15T19:16:40.420178Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "112d6f12-c2b4-dc4a-5d3c-b4686d1fa695",
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
            id: "e76963dc-70a0-d171-d6d3-aca5f35225d1",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "L 2449 07/2025",
          },
        ],
      },
      {
        id: "365d788a-38fd-8d0a-26f4-ba6dd09fd467",
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
            id: "8d7d03dc-475b-3373-34c2-592d867a31e9",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 7713 01/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-71d8-b813-59867f4b5538",
    aktenzeichen_gericht: "B 7051 08/2025",
    status: "ERSTELLT",
    status_changed: "2026-01-25T15:15:44.164394Z",
    eingereicht_am: "2025-03-09T20:25:06.999542Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "1d8f26c7-c0e3-8dfd-069c-d3d05664dd88",
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
      {
        id: "86182c7a-79eb-a88f-6907-7004f94e814a",
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
            id: "d65b6076-8478-cf3a-2882-6c7877c11476",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 4643 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-7acd-92b9-2d967e9d27a5",
    aktenzeichen_gericht: "V 5724 12/2024",
    status: "EINGEREICHT",
    status_changed: "2025-04-30T12:50:21.883361Z",
    eingereicht_am: "2025-02-22T13:38:19.920358Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "a4116639-842e-7b63-a64e-d0a42cc18e8a",
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
            id: "b3cfe4f9-270d-7ff8-43d9-482482e65f9c",
            name: "Tim Becker",
            aktenzeichen: "F 419 10/2026",
          },
        ],
      },
      {
        id: "f64d696b-c8b1-91ab-4f31-ab273434a5a4",
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
            id: "4a488c86-c0e5-98c9-5860-6144a332b2d5",
            name: "Dr. Anna-Katharina-Luise von Brückner-Weiß-Krüger-Schäfer-Kühn",
            aktenzeichen: "W 4888 13/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed6-70fc-ba5c-72bc19221708",
    aktenzeichen_gericht: "X 1695 06/2025",
    status: "ERSTELLT",
    status_changed: "2025-07-02T08:05:00.639788Z",
    eingereicht_am: "2025-02-22T11:11:09.051306Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "8489063d-570d-80e4-ea85-949255ea684b",
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
            id: "a0e79f5d-4128-8ce6-e3e1-e2d7da4ca5b0",
            name: "Rechtsanwalt Dr. Tobias-Ferdinand Karl-Heinz von Römerstein",
            aktenzeichen: "F 2196 03/2025",
          },
        ],
      },
      {
        id: "b586739f-423d-1e57-b927-6b43e6c4aa2e",
        name: "Elisa Schönfeld",
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
    id: "019c5741-7288-7ad1-b710-05d94f4562e1",
    aktenzeichen_gericht: "H 8868 11/2026",
    status: "ERSTELLT",
    status_changed: "2025-02-19T01:04:36.66182Z",
    eingereicht_am: "2025-02-20T03:26:00.613864Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "09128776-40cc-7efe-b590-307adff81315",
        name: "Carina-Lena Roth",
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
        id: "17192f91-96b2-79b1-778f-76ce7c8ee125",
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
            id: "3bff9158-6097-8d7f-f9c0-021cb1a7d3f5",
            name: "Rechtsanwalt Friedrich Scholz",
            aktenzeichen: "S 8624 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-75c2-8bff-e5a9ae94a7c1",
    aktenzeichen_gericht: "B 4420 10/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-14T06:39:19.29111Z",
    eingereicht_am: "2025-02-14T13:34:15.456202Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "42837079-b8b9-4c83-8087-a48514a7b1a2",
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
            id: "243fa75d-0189-f3e8-66fd-32f7229ce8ad",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "A 8414 02/2025",
          },
          {
            id: "5fccfdc8-752e-72cc-23fa-e9c859bb19c1",
            name: "Rechtsanwalt Dr. Maximilian-Johann von und zu Falkenstein",
            aktenzeichen: "E 965 02/2024",
          },
        ],
      },
      {
        id: "f0bec6fb-9f7a-21a6-ffbb-b53e8e800876",
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
            id: "5189dcc5-7c25-4c5a-eb7c-f5e8b6098b20",
            name: "Rechtsanwalt Dr. Ferdinand-Julius Maximilian von Krämer-Höfer",
            aktenzeichen: "P 5632 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-7c42-a0b0-9377abb6e273",
    aktenzeichen_gericht: "J 8111 03/2025",
    status: "EINGEREICHT",
    status_changed: "2025-09-09T17:27:35.958592Z",
    eingereicht_am: "2025-02-08T05:10:02.631877Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "543c7f6f-4d22-5b8c-c227-64af4b0c4b1b",
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
            id: "a4518c0f-4f23-1623-4c56-77417d9eec67",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "A 3121 06/2024",
          },
        ],
      },
      {
        id: "ae2c46f8-1e74-1f84-af30-50733d65fc91",
        name: "Elisabeth Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "2164aeed-2617-fd7a-1b3f-c53ac8ff776d",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 9038 11/2025",
          },
          {
            id: "d2e2142f-8a03-2c3f-eb51-57db60f2c714",
            name: "Rechtsanwalt Friedrich-Alexander-Johannes von Hohenstein-Bär-Krüger-Schäfer",
            aktenzeichen: "P 6242 01/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-7f1b-afa5-c4a92cdbae5d",
    aktenzeichen_gericht: "V 1655 07/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-16T21:52:08.508599Z",
    eingereicht_am: "2025-02-06T11:46:16.443087Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "263b07a9-d6c4-1b8c-dc32-01e57aea024a",
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
      {
        id: "c0070ee1-369e-2134-65f9-df006e9de387",
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
            id: "a5938ddb-c39d-2e09-f6b9-ab9c295b8c25",
            name: "Dr. Leonhard-Sebastian Philipp von Möser-Schäfer",
            aktenzeichen: "X 983 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-76aa-ab02-0fd90fdea52c",
    aktenzeichen_gericht: "B 3248 12/2025",
    status: "ERSTELLT",
    status_changed: "2025-02-13T16:25:47.641462Z",
    eingereicht_am: "2025-01-23T20:02:29.012779Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "3297b7da-b881-5895-04d0-21c1a7359545",
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
            id: "0cad2c9c-b6ce-1414-2080-fad002c3eba9",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "O 6525 04/2025",
          },
        ],
      },
      {
        id: "585d1448-1ee0-dc4e-6295-13d7d7702b2f",
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
            id: "e7d572f0-557d-8cf0-28a4-1db99150d40f",
            name: "Rechtsanwalt Dr. Wolfgang Kühn",
            aktenzeichen: "U 3059 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-79e2-a93e-7dcd691cae4c",
    aktenzeichen_gericht: "O 4606 13/2025",
    status: "ERSTELLT",
    status_changed: "2025-12-20T12:17:02.483981Z",
    eingereicht_am: "2025-01-22T00:28:53.724418Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "8cf9781b-13f9-2d80-435c-aa352777dd8c",
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
      {
        id: "ca473ac0-c76c-6113-fec5-b6ce8263eb8d",
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
            id: "0351bd3f-a0ad-690f-7de0-73f1b4658bb4",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 2506 04/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-70bd-9c7d-04f46fb3dad8",
    aktenzeichen_gericht: "W 6010 04/2024",
    status: "ERSTELLT",
    status_changed: "2025-09-16T08:44:52.869379Z",
    eingereicht_am: "2025-01-14T10:22:49.766297Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "5733d7e6-bb2b-a429-570c-feeea927102f",
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
      {
        id: "8e32c347-e0c3-9008-6ad1-6baa09d7604c",
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
            id: "6b5a2fe3-47ad-6bad-b607-e19a4b8820c3",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "N 3013 03/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-758b-9761-393201c36fa5",
    aktenzeichen_gericht: "B 343 07/2025",
    status: "ERSTELLT",
    status_changed: "2025-08-15T01:03:51.279259Z",
    eingereicht_am: "2025-01-06T09:21:40.634985Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "18291211-f1bb-6816-b9b1-d3c0d14503ca",
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
            id: "e3489f2a-32d9-bf93-5ba4-9be19b1c1daa",
            name: "Dr. Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
            aktenzeichen: "U 7839 04/2026",
          },
        ],
      },
      {
        id: "950f3f2c-27b3-54c7-5500-d6e78364bf04",
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
            id: "6dc9cf89-9b69-d298-a2cf-e95135fbead7",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Q 9808 02/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-74f2-9065-e296d27676e6",
    aktenzeichen_gericht: "C 9449 03/2024",
    status: "ERSTELLT",
    status_changed: "2025-07-30T17:40:24.387022Z",
    eingereicht_am: "2025-01-01T04:25:33.389814Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "1f149efa-f38a-9fa4-def3-cce073277ba7",
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
            id: "64b46fa4-5b44-efd7-c80d-830fd5e1cc3b",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "U 7151 05/2026",
          },
        ],
      },
      {
        id: "c7a25757-7d0b-6625-72fd-9beb8ff57c37",
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
    ],
  },
  {
    id: "019c5741-7288-7de4-94c4-ab4032b363f5",
    aktenzeichen_gericht: "E 4694 09/2026",
    status: "EINGEREICHT",
    status_changed: "2025-12-09T11:32:54.507268Z",
    eingereicht_am: "2024-12-22T17:41:42.137695Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "42c41cf0-dddc-fd24-2b6a-8479275f908d",
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
            id: "d71f917a-3399-e661-cf49-e55598c572a8",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "I 9591 09/2025",
          },
          {
            id: "a1ff57fc-d79e-0c0e-eda1-0d7319d42635",
            name: "Rechtsanwalt Paulina Krüger",
            aktenzeichen: "R 7846 03/2024",
          },
        ],
      },
      {
        id: "8f13c103-0496-4fcd-10d4-9001ebe8aaa2",
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
            id: "d418a188-be56-59d7-5cf9-06f6a4309018",
            name: "Rechtsanwalt Dr. Stefan Kranz",
            aktenzeichen: "X 4575 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-78e1-99ad-0dc67c90f7e8",
    aktenzeichen_gericht: "N 1116 05/2026",
    status: "EINGEREICHT",
    status_changed: "2025-07-02T17:35:59.937136Z",
    eingereicht_am: "2024-12-16T07:44:19.793505Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "9479f48e-1755-6595-049c-984a3f19d1ad",
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
            id: "c2511fc4-0050-748c-01b6-a02d06925cf4",
            name: "Tim Becker",
            aktenzeichen: "C 8999 13/2024",
          },
        ],
      },
      {
        id: "a82ddcd7-19c8-84d0-2eb9-df45d41adff8",
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
            id: "8e610794-066b-47c5-e338-1371cf6147eb",
            name: "Dr. Tobias Möser",
            aktenzeichen: "L 6928 11/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-74c9-bf0d-f58262f5d178",
    aktenzeichen_gericht: "N 7335 10/2026",
    status: "EINGEREICHT",
    status_changed: "2025-07-15T05:50:45.36243Z",
    eingereicht_am: "2024-12-11T11:53:27.062239Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "c01b0e5e-97ce-b9d7-e008-383986b731ae",
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
            id: "505f9c4e-d454-6ca2-c50c-2632e1cb14d0",
            name: "Rechtsanwalt Helene Groß",
            aktenzeichen: "V 916 06/2026",
          },
        ],
      },
      {
        id: "c9cc797d-c096-fb33-4bfa-f4fb3fb0be82",
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
            id: "4dda0849-a806-98ba-6d09-3617b837f597",
            name: "Rechtsanwalt Alexander-Theodor Benjamin von Küster-Braun",
            aktenzeichen: "V 161 03/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-7031-9e6d-1d52f2c841f0",
    aktenzeichen_gericht: "R 8381 06/2026",
    status: "EINGEREICHT",
    status_changed: "2025-11-13T00:18:42.080967Z",
    eingereicht_am: "2024-12-11T03:50:13.059585Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "63a6ce1a-563f-2931-b0c1-d4f6f3b4585a",
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
            id: "5f15af83-ed13-bfcf-deb8-69029a78c5ee",
            name: "Tim Becker",
            aktenzeichen: "L 3763 09/2025",
          },
        ],
      },
      {
        id: "91d4e809-7178-d28f-2de7-022d1d320ca7",
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
            id: "332c09e2-093b-bfd3-9d24-2e9715f8a125",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 7556 04/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-7162-966b-14628dafc845",
    aktenzeichen_gericht: "B 6773 01/2024",
    status: "ERSTELLT",
    status_changed: "2025-08-29T05:18:26.395839Z",
    eingereicht_am: "2024-12-06T04:56:19.281707Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "91177b8d-01ba-3755-3b3e-0cf2def22335",
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
            id: "5deaff32-9f50-bd02-7aa0-e6ba1e973dcc",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "S 6202 09/2026",
          },
        ],
      },
      {
        id: "97b4806e-290c-4fad-8c8e-ba86e7bc01f3",
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
            id: "694bef61-bc3e-d518-3199-7cba2495eeb5",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "W 3116 10/2024",
          },
          {
            id: "77e5f6a8-4edf-4531-f268-0c5d8e0d0aac",
            name: "Rechtsanwalt Andreas-Friedrich-Johannes von Hohenau-Krämer-Schönfeld-Weißmann",
            aktenzeichen: "P 5934 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-7921-952c-c2de2e1522b1",
    aktenzeichen_gericht: "E 9177 12/2025",
    status: "EINGEREICHT",
    status_changed: "2025-03-19T22:51:36.81088Z",
    eingereicht_am: "2024-12-05T20:21:51.688465Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "2f632bf9-e57d-179f-697f-cfb5c19b2189",
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
            id: "df9eb64e-3a41-bbe4-e5f0-3aaff9bfaa6a",
            name: "Rechtsanwalt Dr. Annemarie Scholz",
            aktenzeichen: "C 8323 13/2026",
          },
        ],
      },
      {
        id: "e523de35-2320-74e6-3d56-250d5d904316",
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
            id: "0d5a9a65-9d20-753f-54df-98fd79fff6ad",
            name: "Rechtsanwalt Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
            aktenzeichen: "I 300 01/2025",
          },
          {
            id: "92d6493f-0d52-e997-1c48-1a3ac2eb8680",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "L 7739 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed8-7dd3-b7ce-c6f1a0a00f6a",
    aktenzeichen_gericht: "R 8201 10/2026",
    status: "EINGEREICHT",
    status_changed: "2025-03-13T21:18:09.285423Z",
    eingereicht_am: "2024-12-04T07:58:48.41674Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "1bbae890-12c2-9430-3a35-cbbe8df4bcea",
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
            id: "fdacdb96-7e45-f70b-f1ca-c4fa7cb2d331",
            name: "Tim Becker",
            aktenzeichen: "F 3339 06/2026",
          },
          {
            id: "9a4d744c-38cb-bce3-ab23-d230fbec4f4c",
            name: "Rechtsanwalt Christoph-Michael von und zu Großmann-Weiß",
            aktenzeichen: "L 2736 01/2025",
          },
        ],
      },
      {
        id: "4a5ae46e-453a-cfa1-52f3-7310bcafc755",
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
            id: "e1dab8f9-b3f5-a848-1241-3cd1c86088ed",
            name: "Dr. Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
            aktenzeichen: "I 5809 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-768d-86a5-456d8f22bc52",
    aktenzeichen_gericht: "V 8081 08/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-25T19:33:50.085132Z",
    eingereicht_am: "2024-12-01T03:11:27.26861Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "2c039560-0eaf-8e62-5c1f-01bd359e6840",
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
            id: "8d682c50-3f24-e56d-1e31-3bde6aa21858",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "J 7421 11/2025",
          },
          {
            id: "c0d1dc70-a220-9116-f1f9-6f135d0ea79b",
            name: "Dr. Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
            aktenzeichen: "Z 1551 02/2025",
          },
        ],
      },
      {
        id: "c2c94d67-2b4b-a541-58d3-934c314f9375",
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
            id: "e4e2e456-28d8-2ba2-e07a-04aee4147a31",
            name: "Rechtsanwalt Dr. Matthias-Friedrich-Wilhelm von Löwenstein-Krüger-Schäfer-Weiß",
            aktenzeichen: "R 8872 07/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-75ac-81ec-bc06cf1531c6",
    aktenzeichen_gericht: "U 169 01/2026",
    status: "ERSTELLT",
    status_changed: "2025-06-12T14:50:54.44259Z",
    eingereicht_am: "2024-11-19T20:24:28.646209Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "371d2bf0-2c08-c9dc-2759-ce493aeb55c6",
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
            id: "852a2233-29ad-932f-03e8-b2c9d87acae3",
            name: "Rechtsanwalt Friedrich Scholz",
            aktenzeichen: "O 3206 03/2025",
          },
        ],
      },
      {
        id: "62ab50bc-7945-c577-c037-eb43e2d87bfb",
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
            id: "99295cdc-02d7-bce9-d35d-d5b6fa9f3d8c",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "I 1491 10/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edc-7d24-8fd1-25dd49cf5ced",
    aktenzeichen_gericht: "P 9592 10/2026",
    status: "ERSTELLT",
    status_changed: "2026-01-26T03:00:08.371432Z",
    eingereicht_am: "2024-11-11T10:59:48.102602Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "0a95f879-6a03-349a-6ad4-3ec197618f8d",
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
            id: "bf21a3f5-c97e-256f-ef04-4e69f24c3783",
            name: "Tim Becker",
            aktenzeichen: "G 6985 06/2024",
          },
        ],
      },
      {
        id: "a62b1240-b663-02eb-42b4-1f7990430ebb",
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
            id: "8473941b-82d6-7c3e-0132-718c3a1b2871",
            name: "Tim Becker",
            aktenzeichen: "B 2082 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2eda-79b7-a277-07ef2b8205f9",
    aktenzeichen_gericht: "A 571 06/2025",
    status: "ERSTELLT",
    status_changed: "2025-05-17T11:20:56.634118Z",
    eingereicht_am: "2024-11-06T07:56:04.9349Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "2a6a3836-5bbb-51b6-bd95-09356a2ec3a7",
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
            id: "093a63b3-0a5d-75e7-16f2-8c2ca4118182",
            name: "Rechtsanwalt Dr. Sabine Großmann",
            aktenzeichen: "P 8534 10/2024",
          },
        ],
      },
      {
        id: "a846be57-caf8-4a58-f733-b70e59aefe6d",
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
            id: "791dc58e-17d1-b2f5-188d-f95de783f335",
            name: "Tim Becker",
            aktenzeichen: "Z 9933 04/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecf-770a-af99-b9fcea928efe",
    aktenzeichen_gericht: "G 1977 12/2026",
    status: "EINGEREICHT",
    status_changed: "2025-09-14T23:37:24.695709Z",
    eingereicht_am: "2024-11-04T15:22:19.289838Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "13cbc074-ccf3-7b50-77b2-74bdcecb93b7",
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
            id: "a93d0279-0af7-b916-8e17-7efd0a0bacac",
            name: "Tim Becker",
            aktenzeichen: "D 1447 13/2025",
          },
        ],
      },
      {
        id: "c97a547c-7874-8b97-8f57-3c297025e5eb",
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
            id: "7c70653a-fc9b-69c9-ea4a-8e7c78184277",
            name: "Rechtsanwalt Dr. Johanna-Elisabeth-Maria von Krüger-Lösch",
            aktenzeichen: "G 9240 13/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7dd6-a652-56a29c652299",
    aktenzeichen_gericht: "K 5114 01/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-24T17:19:05.203766Z",
    eingereicht_am: "2024-11-03T15:25:04.449773Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "3e83b2a7-c3c0-1707-78a2-d89aed8fc8e3",
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
            id: "1da81ddb-dc4e-bf00-b4a4-ec8ccf7ea658",
            name: "Rechtsanwalt Dr. Matthias-Friedrich-Wilhelm von Löwenstein-Krüger-Schäfer-Weiß",
            aktenzeichen: "X 9153 05/2025",
          },
        ],
      },
      {
        id: "eb908eaf-d397-462d-b885-416c5537599d",
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
            id: "cc782e40-16e6-5810-7721-56894d606d3e",
            name: "Rechtsanwalt Karolin Weiß",
            aktenzeichen: "B 1921 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2eda-726f-b2b1-d7c416a28753",
    aktenzeichen_gericht: "C 4760 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-10-02T08:31:28.673396Z",
    eingereicht_am: "2024-10-20T20:59:21.072147Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "6f3f93ed-87f4-7ed4-68b2-eadb58097006",
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
            id: "93c1813f-20d9-c0cb-1fbb-bbe6260f9d0c",
            name: "Tim Becker",
            aktenzeichen: "I 9034 04/2026",
          },
          {
            id: "3569cb9c-5b8d-fd09-160d-066451050da8",
            name: "Dr. Fabian Groß",
            aktenzeichen: "M 3458 12/2024",
          },
        ],
      },
      {
        id: "98c27fe2-be43-7530-02e6-c35b17c047a2",
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
            id: "f367a9fb-5462-ba53-c83e-32110b9d7c5e",
            name: "Rechtsanwalt Miriam Krüger",
            aktenzeichen: "C 2609 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-7101-b3d4-f96604372c3e",
    aktenzeichen_gericht: "O 2830 11/2026",
    status: "EINGEREICHT",
    status_changed: "2025-04-03T07:19:13.252047Z",
    eingereicht_am: "2024-10-11T23:18:30.893827Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "19211f5d-eeda-2476-5629-2aaa1e8fdbf9",
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
            id: "11b78fd3-ed5b-4adc-6d2f-18308191aa85",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "F 6762 10/2024",
          },
        ],
      },
      {
        id: "df202111-9d88-a720-adc3-9c67f06e1bf6",
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
            id: "4af3ce09-203e-98e7-750e-6b3e4ed4927e",
            name: "Rechtsanwalt Dr. Florian Bär",
            aktenzeichen: "L 5944 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-7e72-bfe7-85c83982a3bd",
    aktenzeichen_gericht: "K 8527 03/2025",
    status: "EINGEREICHT",
    status_changed: "2025-07-02T09:46:36.524748Z",
    eingereicht_am: "2024-10-09T02:40:59.374831Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "3cf6b860-9f33-3f34-2af0-a8f3ef137bde",
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
            id: "0b9828e0-c9f1-52ec-2693-be521a42e7dc",
            name: "Rechtsanwalt Johanna Groß",
            aktenzeichen: "D 3437 13/2024",
          },
        ],
      },
      {
        id: "52163f88-ae1e-214d-5605-b6fe4716805e",
        name: "Leonhard Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "86d3c4a2-9148-c5b0-0af6-fb1a75dbabb8",
            name: "Tim Becker",
            aktenzeichen: "G 162 11/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecc-78d4-884b-d296b3bbc48d",
    aktenzeichen_gericht: "G 2137 06/2024",
    status: "ERSTELLT",
    status_changed: "2025-08-19T04:43:28.428262Z",
    eingereicht_am: "2024-09-23T09:06:55.128889Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "3c5372e0-bfe2-d264-72bd-17f314aa80e2",
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
            id: "281c2a9f-5c55-e747-efec-eac87aa266f9",
            name: "Tim Becker",
            aktenzeichen: "G 5689 03/2024",
          },
        ],
      },
      {
        id: "6248a454-4873-a847-df91-9a90028e7b48",
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
            id: "b95b4b2a-2dcd-c211-f470-fa8af1334ffc",
            name: "Tim Becker",
            aktenzeichen: "E 1448 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-7586-89eb-6d8872af4825",
    aktenzeichen_gericht: "X 942 11/2025",
    status: "EINGEREICHT",
    status_changed: "2025-10-08T21:59:24.363746Z",
    eingereicht_am: "2024-09-18T22:25:19.729057Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "81cbe20f-a2c4-a2b7-8a31-6a71c41b27ca",
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
            id: "64481f94-1d95-6d54-646f-91ba0c2ae140",
            name: "Dr. Laurenz Böhler",
            aktenzeichen: "T 8839 12/2025",
          },
          {
            id: "7526d78a-a62a-5d7a-3a09-3a986675c08a",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 5127 02/2024",
          },
        ],
      },
      {
        id: "f654c853-4501-7c56-393b-be397ec04b3a",
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
            id: "569e0017-5816-cad5-b5f2-b3aa5eaff53e",
            name: "Dr. Katharina-Marie-Elisabeth von Hohenstein-Bärenwald-Krüger-Schäfer",
            aktenzeichen: "Y 9751 12/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecf-739f-8e14-75fd7f4d007d",
    aktenzeichen_gericht: "M 3683 12/2026",
    status: "EINGEREICHT",
    status_changed: "2025-03-19T05:50:23.646256Z",
    eingereicht_am: "2024-09-13T22:24:53.355223Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "c5d67c8b-1a37-c657-daa0-6927b71439d6",
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
            id: "9af1aa4f-8fed-2a0f-3431-22998d4a0853",
            name: "Rechtsanwalt Dieter Mönch",
            aktenzeichen: "A 3203 05/2024",
          },
        ],
      },
      {
        id: "f7c77ca3-7856-9aa3-e241-309cdcde7277",
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
            id: "835faa71-54c5-4996-9af5-3ed9a5334367",
            name: "Rechtsanwalt Claudia-Maria-Theresia Gräfin von Großwald",
            aktenzeichen: "C 1554 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-7bf2-8c56-9a27b9acb201",
    aktenzeichen_gericht: "D 6551 12/2026",
    status: "ERSTELLT",
    status_changed: "2025-04-20T05:32:46.795496Z",
    eingereicht_am: "2024-09-05T20:56:28.996676Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "be22a340-4d72-3687-7d2d-b096274dcb70",
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
            id: "1e8d362a-41ff-47ac-800d-a7becd3df9ee",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "R 8423 06/2024",
          },
        ],
      },
      {
        id: "dd402c10-25b9-5515-f5c1-0b44ef89aa24",
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
            id: "59a38f08-253a-8ac0-44ff-0db393666467",
            name: "Rechtsanwalt Christoph-Michael von und zu Großmann-Weiß",
            aktenzeichen: "T 3106 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-7d8c-bbe4-ef34ecbc26b1",
    aktenzeichen_gericht: "B 623 10/2026",
    status: "ERSTELLT",
    status_changed: "2025-05-25T00:58:45.922193Z",
    eingereicht_am: "2024-08-28T20:56:45.061512Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "836fbd79-8d87-dd87-0448-92b941a5c293",
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
            id: "ad3a7730-e1ce-d216-c63a-2283a360ccad",
            name: "Rechtsanwalt Andreas Groß",
            aktenzeichen: "H 2505 11/2024",
          },
        ],
      },
      {
        id: "a935f049-0f67-4db7-81f5-1ed079fabd58",
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
            id: "9b956fe4-d265-99e7-bfb1-98ca3c57494b",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "R 9603 03/2024",
          },
          {
            id: "2df99b78-9f09-1143-f070-ff050d386ccf",
            name: "Dr. Johanna-Luise Friederike von Bärenfels-Schmidt",
            aktenzeichen: "F 2868 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-7d66-ad9c-034c8b2fc03e",
    aktenzeichen_gericht: "G 3977 12/2025",
    status: "EINGEREICHT",
    status_changed: "2025-10-22T01:02:51.538672Z",
    eingereicht_am: "2024-08-24T03:02:32.843536Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "3e017c2b-f95b-673c-8ea0-e3d1d72ba4ec",
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
            id: "b917f025-fafa-be80-6571-46313732c2c1",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "R 8990 13/2025",
          },
        ],
      },
      {
        id: "f5a4cfdc-0efb-4957-d501-c285708fe1cf",
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
            id: "714deb04-d36f-f045-e9e7-51f6b4759966",
            name: "Dr. Fabian Krüger",
            aktenzeichen: "U 2501 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728b-7558-94b0-0eed60bc3b62",
    aktenzeichen_gericht: "J 8588 06/2024",
    status: "ERSTELLT",
    status_changed: "2025-12-10T21:41:40.050279Z",
    eingereicht_am: "2024-08-23T03:50:19.405165Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "b501f152-e842-9adb-02f5-dc4190c56280",
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
            id: "7c6ecbbd-53ec-3658-65cf-5fab685aefd1",
            name: "Rechtsanwalt Dr. Alexander Höfer",
            aktenzeichen: "T 4145 01/2026",
          },
        ],
      },
      {
        id: "f997e530-95f1-e80a-f8d2-5dc0b5ffcf42",
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
            id: "97637034-c9b4-b6ec-7d9c-9a299825cb13",
            name: "Rechtsanwalt Friedrich Kübler",
            aktenzeichen: "Y 8590 07/2026",
          },
          {
            id: "f94e33e0-9a73-71e1-2b8f-910aad6d366f",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "J 7098 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecf-7d01-838a-ff16268006c7",
    aktenzeichen_gericht: "X 7758 02/2024",
    status: "ERSTELLT",
    status_changed: "2025-08-22T00:44:35.705068Z",
    eingereicht_am: "2024-08-12T22:17:47.778945Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "04f514bd-35d4-6374-53a3-5eaab194db6e",
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
            id: "c3eea2f0-0d60-19a1-366d-967a1f409ebf",
            name: "Rechtsanwalt Dr. Kathrin Hölzer",
            aktenzeichen: "B 8984 10/2024",
          },
        ],
      },
      {
        id: "f9bba8f7-ce37-8880-467f-c7cf5babc07c",
        name: "Miriam Hölzer",
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
    id: "019c5733-2eda-773c-8190-d87efe8f581e",
    aktenzeichen_gericht: "R 8821 11/2025",
    status: "ERSTELLT",
    status_changed: "2025-12-25T06:45:05.331035Z",
    eingereicht_am: "2024-08-06T01:35:54.675874Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "cf05b05a-ec92-7229-32bd-f89262335137",
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
            id: "70a5df5e-21b4-57d5-a4f5-9cf3b16422d0",
            name: "Tim Becker",
            aktenzeichen: "H 4582 10/2026",
          },
        ],
      },
      {
        id: "d2b96ba9-4f23-e514-2ac8-774bea1eeb8e",
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
            id: "5f4b733a-e0c6-3abf-2aa9-479178514f8d",
            name: "Dr. Tobias-Matthias Alexander von Krämer-Böhler",
            aktenzeichen: "F 2218 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-7a3b-9d82-9dcf508dea39",
    aktenzeichen_gericht: "D 7116 09/2026",
    status: "ERSTELLT",
    status_changed: "2025-06-19T07:18:25.825773Z",
    eingereicht_am: "2024-08-05T20:16:50.284317Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "7844313e-095f-d827-613d-17a7169d5f30",
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
            id: "154dd980-3401-4218-1794-ec522dfd535f",
            name: "Dr. Franziska-Madeleine von Hohenlohe-Kühn",
            aktenzeichen: "P 4572 03/2025",
          },
        ],
      },
      {
        id: "b0333356-f242-4f77-bea9-7791bbe7f3bc",
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
    id: "019c5733-2ecd-731e-a384-1aea89e9881b",
    aktenzeichen_gericht: "O 2099 07/2025",
    status: "EINGEREICHT",
    status_changed: "2025-09-21T08:13:17.280174Z",
    eingereicht_am: "2024-08-04T16:45:26.90834Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "18167807-3c07-dbc5-ed0d-8ed7b1f790c6",
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
            id: "0c28b6d7-dd17-3a44-d449-37b82901d356",
            name: "Tim Becker",
            aktenzeichen: "L 7523 02/2025",
          },
        ],
      },
      {
        id: "a08d15d4-a424-ee4c-3b03-4658df6a76a9",
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
            id: "8c2efa1b-a9cc-d109-00b2-f56aef634e9b",
            name: "Tim Becker",
            aktenzeichen: "P 1164 11/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-7363-b238-3bdb0c1a63e8",
    aktenzeichen_gericht: "J 3049 12/2026",
    status: "ERSTELLT",
    status_changed: "2025-08-03T23:43:26.514436Z",
    eingereicht_am: "2024-08-01T21:48:11.163402Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "dff99d1f-9e4f-0cf1-dbd2-58d1f875d5e5",
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
            id: "83822066-08fa-57a9-a4a4-b7e87a09f5d0",
            name: "Dr. Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
            aktenzeichen: "N 1722 05/2026",
          },
        ],
      },
      {
        id: "e7fb74de-cbcf-00e7-e89c-18b710ded4c8",
        name: "Lufthansa",
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
    id: "019c5741-7290-78f7-8c42-8660937cf4de",
    aktenzeichen_gericht: "W 824 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-10-10T07:56:58.429197Z",
    eingereicht_am: "2024-07-30T08:41:16.859103Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "3bf877ec-842e-4626-c618-f38775280a64",
        name: "Elisabeth Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "c036d048-a438-4d4b-0f2a-3922d533f36b",
            name: "Rechtsanwalt Karolin Weiß",
            aktenzeichen: "A 8425 10/2026",
          },
        ],
      },
      {
        id: "52d9c912-7441-87de-05fa-48596092673a",
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
            id: "ef21c3b7-a4c1-a2f0-05f9-42e87672651f",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "X 679 02/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-780f-bbc2-e8c3ab775fca",
    aktenzeichen_gericht: "P 5612 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-13T00:36:56.90123Z",
    eingereicht_am: "2024-07-27T21:20:50.642413Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "09c8deea-3716-4711-9faf-d69b6caddd24",
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
            id: "ffdfb33d-5251-727e-ccb0-2ab12c8e2658",
            name: "Dr. Franziska-Madeleine von Hohenlohe-Kühn",
            aktenzeichen: "A 5832 07/2025",
          },
        ],
      },
      {
        id: "3657a3fa-58e0-23ac-fe42-6b5e0f35e7d3",
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
            id: "195a4a94-ff15-fc26-48e8-3111a3618d6a",
            name: "Rechtsanwalt Paulina Krüger",
            aktenzeichen: "Z 9141 09/2024",
          },
          {
            id: "ff08f8ca-fa4a-5ba9-65af-ab4a24f79ec8",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "A 5056 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-7a6b-a7b3-9cb7a7e8b3f4",
    aktenzeichen_gericht: "B 7016 05/2025",
    status: "ERSTELLT",
    status_changed: "2025-11-06T09:30:31.960004Z",
    eingereicht_am: "2024-07-18T00:44:57.50358Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "06a59ffe-d715-d1fa-fb62-bff836e2f8a7",
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
            id: "ae299eab-e86a-0cfd-03ba-7c79f0a77f3e",
            name: "Rechtsanwalt Dr. Tobias-Ferdinand Karl-Heinz von Römerstein",
            aktenzeichen: "C 5901 05/2026",
          },
          {
            id: "883e4654-b813-8aa1-75f2-56e3ad291ca4",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "R 9201 06/2026",
          },
        ],
      },
      {
        id: "23942e0a-d7bc-2997-7913-17ad933defac",
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
            id: "7ee8e6fa-5b69-f002-e097-c475a0f8ad08",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 2316 04/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-71d5-a98f-8f0ef63d56b2",
    aktenzeichen_gericht: "L 128 02/2024",
    status: "EINGEREICHT",
    status_changed: "2025-05-10T00:09:51.40822Z",
    eingereicht_am: "2024-07-11T17:11:47.457699Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "16342467-41ce-b949-8bf8-83ef91dc4e4f",
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
            id: "e018ab0b-df11-1834-90cb-88eafbb4c1c9",
            name: "Dr. Franz-Josef-Wilhelm-Ludwig von Schönfeld-Groß-Küster-Weißmann",
            aktenzeichen: "N 8701 11/2025",
          },
        ],
      },
      {
        id: "663296ba-d0c9-2aba-da0d-91ed04f51222",
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
            id: "2da6e7f2-bb5c-8b13-9ec9-835ce4e71441",
            name: "Tim Becker",
            aktenzeichen: "D 4615 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-72c6-b1bf-9372688e8901",
    aktenzeichen_gericht: "F 7330 07/2025",
    status: "ERSTELLT",
    status_changed: "2025-04-20T07:04:07.6927Z",
    eingereicht_am: "2024-07-08T18:19:25.113176Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "1ec968b6-284d-9b70-3389-9ec7a9bb39b1",
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
            id: "a015e631-7830-9d32-5b50-af26dd3c716e",
            name: "Dr. Franziska Müller",
            aktenzeichen: "E 4251 05/2026",
          },
          {
            id: "203876bc-854c-71ba-b1b8-3b8f97b9e709",
            name: "Tim Becker",
            aktenzeichen: "C 1540 06/2026",
          },
        ],
      },
      {
        id: "6ea9b464-2705-fe69-a552-fc71c5f51dc3",
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
            id: "28018938-355a-08f6-0d7b-94e6b73135bf",
            name: "Tim Becker",
            aktenzeichen: "J 6306 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ede-70ab-b07a-ead50166ce77",
    aktenzeichen_gericht: "D 5459 04/2026",
    status: "EINGEREICHT",
    status_changed: "2025-06-01T02:47:49.28223Z",
    eingereicht_am: "2024-06-30T09:40:18.01663Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "07168b3e-7d69-8a0e-3d43-07a8e04a2a7a",
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
            id: "94e84c0c-c132-cfc8-fbad-10a2fa45fac3",
            name: "Tim Becker",
            aktenzeichen: "H 8143 12/2025",
          },
        ],
      },
      {
        id: "48cc57c8-11ac-5f27-239c-4b0ef6d5dff7",
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
            id: "1d2eaa0f-7df5-b077-6243-454b3ee08130",
            name: "Rechtsanwalt Dr. Maximilian-Johann von und zu Falkenstein",
            aktenzeichen: "S 6513 08/2025",
          },
          {
            id: "f27e5cc3-931b-3987-1bb5-a23a1c8c4933",
            name: "Tim Becker",
            aktenzeichen: "C 3676 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-7b57-8c80-5de7f3956fd2",
    aktenzeichen_gericht: "V 4876 13/2024",
    status: "ERSTELLT",
    status_changed: "2025-06-27T03:18:37.328599Z",
    eingereicht_am: "2024-06-27T09:04:45.626932Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "b2905b70-0391-5ec8-ed28-958e819ddbea",
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
            id: "f4fd455b-0128-ba24-eb54-ff39143bc6c7",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "S 6888 04/2025",
          },
        ],
      },
      {
        id: "e447a3c4-a458-f573-87ef-8ea0270646d0",
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
            id: "ec001d21-bc40-373c-8bf3-9b08609ed8f8",
            name: "Rechtsanwalt Dr. Fabian Weiß",
            aktenzeichen: "X 1595 04/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed5-7559-857c-238e8e8e3757",
    aktenzeichen_gericht: "H 7834 06/2024",
    status: "ERSTELLT",
    status_changed: "2025-11-21T09:18:43.758083Z",
    eingereicht_am: "2024-06-25T21:21:51.847856Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "16ba3cc7-dc33-924a-1ac5-34239ee75b79",
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
        id: "d1369d65-d8f0-6da9-d764-9ae5486c62e4",
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
            id: "1d024bed-9e67-fb46-d01a-978658cfb69f",
            name: "Rechtsanwalt Dr. Tobias Hölzer",
            aktenzeichen: "A 1655 04/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-712a-aa9e-cd1b6180a88b",
    aktenzeichen_gericht: "G 4629 03/2025",
    status: "ERSTELLT",
    status_changed: "2025-03-15T02:48:46.105087Z",
    eingereicht_am: "2024-06-17T01:27:18.973506Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "4ae36463-12a4-94d0-378a-a24955a6ef6b",
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
            id: "2f12d30b-927a-fe78-f572-adc530a58d29",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 6691 12/2025",
          },
        ],
      },
      {
        id: "95554e31-a0a7-d6b4-b5e1-df2ed3aeffbd",
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
            id: "5c944042-a701-9fa8-769f-eaea5a9ce376",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Q 8214 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-7ccb-ad1f-45f22871f057",
    aktenzeichen_gericht: "Q 4278 09/2024",
    status: "ERSTELLT",
    status_changed: "2026-01-14T23:53:41.523905Z",
    eingereicht_am: "2024-06-13T00:50:21.813026Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "3d0b2a0f-50a2-45c1-c36a-0c0f64aa84b7",
        name: "Matthias Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "6904529e-222e-1e0e-8873-f5f45876c9a2",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Y 5676 07/2026",
          },
        ],
      },
      {
        id: "dbdbb53c-faa2-f523-31e4-54fe3ef5592f",
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
            id: "22296739-91c4-768f-1681-6cf3fda98412",
            name: "Rechtsanwalt Florian Weiß",
            aktenzeichen: "E 5701 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7831-7251-95fe-af5634020db1",
    aktenzeichen_gericht: "D 8948 04/2026",
    status: "EINGEREICHT",
    status_changed: "2025-08-26T14:25:49.249942Z",
    eingereicht_am: "2024-06-09T21:46:53.985376Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "83c78a2d-3515-3d05-922b-109559fd70cc",
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
            id: "589fefe7-0978-63fd-7b14-4c15c14c1c35",
            name: "Rechtsanwalt Friedrich-Wilhelm Günther von Schönfeld-Krüger",
            aktenzeichen: "M 1936 12/2025",
          },
        ],
      },
      {
        id: "f027ac69-4eae-c3bf-726a-a30636c5594e",
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
            id: "6da0818b-5527-866a-add5-81630a0e2c3a",
            name: "Dr. Paula-Lina Bär",
            aktenzeichen: "O 8786 11/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7291-7c76-a8c5-4a1baf45b792",
    aktenzeichen_gericht: "H 6417 03/2025",
    status: "ERSTELLT",
    status_changed: "2025-02-16T21:35:34.793178Z",
    eingereicht_am: "2024-06-09T11:37:10.248777Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "6589b1f5-0289-6547-c461-ed185afa0139",
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
            id: "3f8da1ff-e112-21b9-c075-747ef5327f15",
            name: "Rechtsanwalt Christoph Weiß",
            aktenzeichen: "A 2502 13/2024",
          },
        ],
      },
      {
        id: "a03b1b73-84a9-b457-b4ce-f4518a0fb342",
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
            id: "f5e6c514-c280-c133-e088-12edd3a66b51",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "P 8971 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2eda-7016-b456-d6fafa003a83",
    aktenzeichen_gericht: "I 8340 09/2026",
    status: "ERSTELLT",
    status_changed: "2025-10-07T18:11:52.855379Z",
    eingereicht_am: "2024-06-02T05:32:20.534683Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "93c6c26b-a56b-7197-651e-70f746ad8728",
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
            id: "74b43e0e-04c3-ad3d-c25f-14aa1336a4b4",
            name: "Tim Becker",
            aktenzeichen: "F 8262 12/2024",
          },
        ],
      },
      {
        id: "b97e4078-3911-8e73-d63e-44482fb933d1",
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
            id: "85c0d5f5-78bc-b1c4-01fe-41feeefb8f67",
            name: "Rechtsanwalt Sebastian Löhr",
            aktenzeichen: "P 4924 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-7abf-bfb1-c88ad41ab441",
    aktenzeichen_gericht: "I 1736 05/2024",
    status: "ERSTELLT",
    status_changed: "2025-10-06T23:10:11.987156Z",
    eingereicht_am: "2024-05-21T05:29:49.131873Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "03c31a87-187f-132e-9fce-d0e730f611c2",
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
            id: "45104eec-da5d-e41f-abe8-041a2da3caf6",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "V 5045 07/2025",
          },
        ],
      },
      {
        id: "7ac02e69-e2eb-b766-769e-c97ea1832fd4",
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
            id: "a692b0a2-d5dd-bd59-6903-2269eb595ec8",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Y 8558 06/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ece-7980-a544-5835657c33c0",
    aktenzeichen_gericht: "U 5300 06/2025",
    status: "EINGEREICHT",
    status_changed: "2026-02-01T19:28:22.730625Z",
    eingereicht_am: "2024-05-12T10:06:22.409222Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "23dfa916-fd43-9b45-3854-faf60a428bc3",
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
            id: "3fce3aed-a4ff-5bad-68ad-e123df707797",
            name: "Dr. Helene-Isabell-Theresa von Weißmann-Kühn-Schäfer-Bärenfels",
            aktenzeichen: "I 694 01/2024",
          },
          {
            id: "8be68c0a-3622-9cf8-e641-6de41e5e76c7",
            name: "Tim Becker",
            aktenzeichen: "H 6347 03/2025",
          },
        ],
      },
      {
        id: "2794f95a-0714-e3d0-291f-2a043497d3f6",
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
            id: "b6ae4a33-0fbf-d316-9f41-e8889a50bf1b",
            name: "Rechtsanwalt Ludwig-Leopold Alexander von Schönberg-Weiß",
            aktenzeichen: "T 9158 07/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed5-7aa1-9559-7f3068531ef1",
    aktenzeichen_gericht: "Y 3329 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-09-02T11:27:54.019115Z",
    eingereicht_am: "2024-05-09T01:19:06.057996Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "d4ed307a-0c45-23fa-f9ba-cfaa0e7548d2",
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
            id: "3124283d-46df-f7bf-6da3-ccc58bb8e5aa",
            name: "Dr. Johanna Kübler",
            aktenzeichen: "B 8711 10/2026",
          },
        ],
      },
      {
        id: "e9a0087b-c0b0-7e3a-a0f5-766d071f8644",
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
            id: "1cd8f818-b34f-6ffd-bc6c-277d15322440",
            name: "Tim Becker",
            aktenzeichen: "U 3887 02/2025",
          },
          {
            id: "cd05e0dd-6120-cf7b-27f5-9322107b08b4",
            name: "Dr. Benedikt-Leonhard-Maximilian von Krüger-Brückner-Weiß-Schäfer-Kühn",
            aktenzeichen: "Y 1771 02/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-7171-a7d8-c618e045eae7",
    aktenzeichen_gericht: "B 1937 13/2025",
    status: "ERSTELLT",
    status_changed: "2025-07-15T07:34:27.688304Z",
    eingereicht_am: "2024-04-29T21:24:36.620405Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "e97eff07-3897-b89b-ccb4-c76fd9377c2e",
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
            id: "24cd8628-97b4-278a-cce6-728e323f96cd",
            name: "Dr. Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
            aktenzeichen: "X 1590 07/2025",
          },
        ],
      },
      {
        id: "f61e717b-2aec-2ad0-ffc0-30f4e655e733",
        name: "Lufthansa",
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
    id: "019c5733-2ede-717f-ae3a-f6b206f74854",
    aktenzeichen_gericht: "M 4462 02/2025",
    status: "EINGEREICHT",
    status_changed: "2025-03-17T04:24:56.241385Z",
    eingereicht_am: "2024-04-21T05:21:52.289418Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "5444ab14-0694-9676-abfa-11ec5aef571f",
        name: "Anna-Maria-Katharina-Elisabeth von Löwenstein-Kranz-Schäfer-Weiß",
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
        id: "6b0ea39d-825b-2503-79b9-301db9695ec7",
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
            id: "04ec5868-bddc-5a11-737a-2b126e5e5b61",
            name: "Rechtsanwalt Markus Lösch",
            aktenzeichen: "Q 8920 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-72c4-aa72-382a2bf2877e",
    aktenzeichen_gericht: "I 7847 02/2024",
    status: "EINGEREICHT",
    status_changed: "2025-03-15T22:27:22.96848Z",
    eingereicht_am: "2024-04-13T20:03:40.116039Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "7f4802b0-1389-4fba-db60-7947fadf300c",
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
            id: "e76e6901-48fd-eacd-374c-917148391ee7",
            name: "Dr. Johanna-Elise-Margarethe von Hohenau-Krüger-Weiß-Schäfer",
            aktenzeichen: "L 5803 04/2025",
          },
        ],
      },
      {
        id: "b1b706ba-918b-2634-541c-5e8f8d44116f",
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
            id: "f2da0ff0-247f-e03b-e1bd-02ea8ba0f65e",
            name: "Rechtsanwalt Johanna-Marie-Isabell-Elisa von Weißmann-Hölzer-Kranz-Schönfeld",
            aktenzeichen: "W 4285 13/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-7930-9c5b-a21570299703",
    aktenzeichen_gericht: "H 8793 07/2024",
    status: "ERSTELLT",
    status_changed: "2025-06-20T01:49:09.51165Z",
    eingereicht_am: "2024-04-04T05:49:33.882044Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "59e3ce2c-093f-3767-ce0d-c2c4064ba9a8",
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
            id: "9a74b649-9b86-af53-b792-afe90561c6c8",
            name: "Dr. Franz-Josef-Wilhelm-Ludwig von Schönfeld-Groß-Küster-Weißmann",
            aktenzeichen: "Y 5094 09/2024",
          },
        ],
      },
      {
        id: "a702f4f1-cba3-80bc-8910-b8c14d107ad5",
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
    id: "019c5741-728b-7b50-944e-4bc6e820c6f0",
    aktenzeichen_gericht: "O 2737 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-05-07T07:38:55.365998Z",
    eingereicht_am: "2024-03-28T23:14:17.85392Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "0e243920-1b60-3f3f-4073-12b1193f4a69",
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
            id: "989c785f-ad9d-0c08-3ff3-135da81febaa",
            name: "Rechtsanwalt Dr. Kathrin Hölzer",
            aktenzeichen: "N 5623 05/2026",
          },
        ],
      },
      {
        id: "c6574073-16a5-3b62-d965-3ffb9fd7f6ea",
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
            id: "bc5463ee-9820-7941-5a35-91272a50a526",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "J 4729 12/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-71b4-8706-2a60a4d0b12c",
    aktenzeichen_gericht: "I 2811 02/2026",
    status: "EINGEREICHT",
    status_changed: "2025-06-15T13:25:52.608038Z",
    eingereicht_am: "2024-03-26T10:24:39.239261Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "a0f58f06-6ab7-2e00-2a8c-085a30e874f5",
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
            id: "402e3800-b064-ff4c-f6a5-1264471f656e",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "V 4627 02/2024",
          },
        ],
      },
      {
        id: "be2faf1e-f4b7-7cc9-4852-5ae11b1ac807",
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
            id: "87f35046-28a7-4993-47ce-0308cfcd4703",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "D 1565 06/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-74ef-83eb-e2d5b39d9365",
    aktenzeichen_gericht: "P 8341 03/2026",
    status: "ERSTELLT",
    status_changed: "2025-05-08T21:09:55.278157Z",
    eingereicht_am: "2024-03-22T02:36:53.611653Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "1bb5ba02-4447-127c-6e68-ac33b7d66f3e",
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
            id: "e0ec45a4-f505-5973-11e3-aaed7ffe7801",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "A 6111 12/2024",
          },
        ],
      },
      {
        id: "6dda6259-f987-2c2e-1d08-791f426b0d97",
        name: "Florian Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "6899656d-bd03-6c8b-7b17-45cf81b7c7e5",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Z 4752 09/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecd-7ff8-ac7f-67a7947bbff0",
    aktenzeichen_gericht: "Y 3249 02/2025",
    status: "EINGEREICHT",
    status_changed: "2025-04-08T19:13:19.2215Z",
    eingereicht_am: "2024-03-17T15:55:00.326601Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "7ac1dee4-ad01-f191-43b7-df5a5626c85d",
        name: "Florian Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "b9f0c564-0603-3d51-5979-6a875b0d15ce",
            name: "Tim Becker",
            aktenzeichen: "W 1077 12/2026",
          },
        ],
      },
      {
        id: "b9adbcee-362b-df4e-646b-06cb0b3ffd6c",
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
            id: "9f5aa087-8ca2-e961-f716-f8b11fbdff03",
            name: "Tim Becker",
            aktenzeichen: "L 3460 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728d-7d13-b828-97ef58dd8462",
    aktenzeichen_gericht: "Z 3117 01/2026",
    status: "ERSTELLT",
    status_changed: "2025-02-21T04:29:11.235046Z",
    eingereicht_am: "2024-03-14T23:25:57.206754Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "6fe78236-34ff-a7aa-d8fc-400930ecef3d",
        name: "Miriam Hölzer",
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
        id: "79e69b68-efba-f0ff-5cb5-e2b77c8c627e",
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
            id: "20aebb79-f194-c617-e301-bfe4b3fd408e",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Y 4966 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-7129-87f0-3ed29705a143",
    aktenzeichen_gericht: "N 2634 02/2026",
    status: "EINGEREICHT",
    status_changed: "2025-07-18T22:32:48.835624Z",
    eingereicht_am: "2024-03-14T20:06:57.95353Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "0a56e3e0-e978-ad7c-c3c1-cc68deb30fe1",
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
            id: "8d10ae66-932f-a213-4a60-8f3cffe38aa0",
            name: "Tim Becker",
            aktenzeichen: "V 4582 05/2024",
          },
        ],
      },
      {
        id: "c6f33466-269c-4204-7cc8-4cc27daf3d46",
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
            id: "0d1c52f2-8e1e-d617-4e48-9f8cb5b2839a",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "X 8877 05/2026",
          },
          {
            id: "6b5c4884-905a-406b-57c0-1d8a054b8559",
            name: "Rechtsanwalt Dr. Markus Kühn",
            aktenzeichen: "Q 1862 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-724a-9d9a-82d8afb6cf9b",
    aktenzeichen_gericht: "T 1123 11/2026",
    status: "EINGEREICHT",
    status_changed: "2026-01-17T22:27:19.227379Z",
    eingereicht_am: "2024-03-11T00:14:38.978684Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "4a82bbc1-ba95-3b09-6367-d36a5e74fef3",
        name: "Miriam Krüger",
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
        id: "c0776a8d-3109-88eb-9dc4-0eda9c614a5b",
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
            id: "7851e0bf-e8f1-b64c-22a4-5b50f3b570e7",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "W 3808 12/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-78db-a80e-1ae7a9524328",
    aktenzeichen_gericht: "R 2068 06/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-09T10:38:10.050701Z",
    eingereicht_am: "2024-03-03T16:21:18.141851Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "0c3a8641-6951-2f6c-59c9-fc3ed50aeaa9",
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
            id: "67c6e167-1151-4749-fd29-e3a6976a2327",
            name: "Rechtsanwalt Paulina-Maria-Isabell von und zu Hohenstein-Weiß-Krüger-Schäfer",
            aktenzeichen: "V 5522 06/2025",
          },
        ],
      },
      {
        id: "8d30a46a-4bff-d3e1-bd8c-00a7f253823e",
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
            id: "7086842e-e785-ec7c-63a4-5d923ba9a422",
            name: "Dr. Janina Müller",
            aktenzeichen: "L 7910 13/2026",
          },
          {
            id: "6c5df3a6-219d-dd18-1b93-763d8e8404f2",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "H 1558 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-71d3-9749-0f884c79a56d",
    aktenzeichen_gericht: "T 8585 10/2025",
    status: "ERSTELLT",
    status_changed: "2025-07-09T19:39:04.710769Z",
    eingereicht_am: "2024-02-22T19:11:28.262137Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "a11ba0c1-a74e-5629-b3d9-6f9cad7b2e49",
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
            id: "f498cc30-1de7-1435-816c-ebc7d08e47a1",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "A 8831 09/2026",
          },
        ],
      },
      {
        id: "e2b298bd-dbd4-beda-6b51-ed483cbc1bf0",
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
            id: "350def9e-1f86-5dd0-1bcb-6611dd6b5833",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "P 1199 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-7b62-a664-28ae1a7e6344",
    aktenzeichen_gericht: "Q 8715 03/2024",
    status: "ERSTELLT",
    status_changed: "2025-11-22T23:20:45.447223Z",
    eingereicht_am: "2024-02-19T04:35:37.314882Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "42569f0c-733c-2cae-8864-b7c25b02bc10",
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
            id: "6e8c8f12-5bb1-4fe0-7138-221ff8b917c2",
            name: "Rechtsanwalt Dr. Matthias-Leonhard Theodor von Weißenthal",
            aktenzeichen: "R 9040 08/2026",
          },
        ],
      },
      {
        id: "a3d5502d-04dd-56c4-656f-312373effea5",
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
            id: "9159ab44-d32a-e2d9-47d1-860e2ec4ec3c",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "J 9084 10/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-72ab-9692-ba8cf2ea088b",
    aktenzeichen_gericht: "K 1360 01/2026",
    status: "ERSTELLT",
    status_changed: "2025-08-08T20:30:32.561488Z",
    eingereicht_am: "2024-02-13T04:23:40.909733Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "8b0e5d23-9b2e-ea97-0269-247a66e00a23",
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
            id: "d1f15c9b-39a5-5acf-9dd6-cec3531faa53",
            name: "Rechtsanwalt Dr. Karl-Heinrich Ludwig von Hohenstein-Kranz",
            aktenzeichen: "B 8154 10/2024",
          },
        ],
      },
      {
        id: "9f804bec-6b85-5cd8-571d-73342223b270",
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
            id: "78cafd6d-d3e5-5bf8-9062-ce61b22c474c",
            name: "Rechtsanwalt Dr. Elisabeth Köhn",
            aktenzeichen: "W 4766 07/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-7d43-935f-9a778caec838",
    aktenzeichen_gericht: "E 2863 11/2026",
    status: "EINGEREICHT",
    status_changed: "2025-02-23T03:02:57.605927Z",
    eingereicht_am: "2024-02-10T14:13:08.864949Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "2efc8248-ddd1-bb0b-0d9c-c6fd0a3cf85f",
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
        id: "cf2645b3-c50d-29c5-fbd8-8434e9b73808",
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
            id: "232ad986-baff-60c2-0120-89b62bb7c4e5",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 1829 13/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-7f22-bdff-b419d1ca45a8",
    aktenzeichen_gericht: "M 3495 12/2025",
    status: "ERSTELLT",
    status_changed: "2025-09-05T13:55:16.205265Z",
    eingereicht_am: "2024-02-05T04:09:43.832093Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "84ef35c8-aca7-3630-91d0-13cf87709424",
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
            id: "e2602b57-3555-1716-37f1-1c9832ed505c",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 6156 07/2026",
          },
        ],
      },
      {
        id: "db9eaa26-e47b-b35a-850a-79a4bd572cb4",
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
            id: "db5f66b8-e12c-cf73-d221-f58f65ce9568",
            name: "Dr. Franziska Müller",
            aktenzeichen: "X 3989 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7fed-9102-cac5fa157b8a",
    aktenzeichen_gericht: "Z 4885 09/2024",
    status: "EINGEREICHT",
    status_changed: "2026-01-18T08:11:15.371465Z",
    eingereicht_am: "2024-01-20T16:59:03.924248Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "20d77bb4-02da-00b3-b36b-3fe74bd00ca3",
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
            id: "1d0d0c81-a508-6880-d92c-bef2eb1a3bae",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "S 5659 06/2024",
          },
        ],
      },
      {
        id: "2351da38-1ca9-f702-4542-9dc3df27d597",
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
            id: "9640e371-ed93-1a07-1f1a-1936ffc97acc",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 1225 12/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-7451-a342-c2686085b27c",
    aktenzeichen_gericht: "L 5795 12/2026",
    status: "EINGEREICHT",
    status_changed: "2025-07-22T08:42:24.827958Z",
    eingereicht_am: "2024-01-13T17:59:24.410268Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "3f77ddaf-c726-ca82-458c-b860fe05cff0",
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
            id: "52e3430b-d622-2028-e858-c7ccb0e53dcb",
            name: "Tim Becker",
            aktenzeichen: "V 4175 01/2026",
          },
        ],
      },
      {
        id: "74e47f8e-d372-7f92-e04e-19fb43531fea",
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
            id: "6c9ca363-f769-7f2e-a703-f4d91e4eea32",
            name: "Rechtsanwalt Andreas Groß",
            aktenzeichen: "B 8692 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-72d3-a88f-7876a13bcfcb",
    aktenzeichen_gericht: "B 4234 05/2024",
    status: "EINGEREICHT",
    status_changed: "2025-11-26T19:56:43.735051Z",
    eingereicht_am: "2024-01-11T19:13:50.730048Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "444be3ea-81c2-e039-59b1-258990943894",
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
            id: "6f5d10c1-5019-e7c8-0044-eba081d537bb",
            name: "Rechtsanwalt Dr. Alina-Mara Kühn",
            aktenzeichen: "N 812 05/2025",
          },
        ],
      },
      {
        id: "5b545721-aec2-d9cb-23e9-91cf837c34e4",
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
            id: "c3b1f4e5-ae24-77e6-d2ae-6c4d291ddcfb",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "K 1600 10/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-7fe1-a6f5-7b4da3ea8ca5",
    aktenzeichen_gericht: "F 8836 04/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-28T16:43:58.85503Z",
    eingereicht_am: "2024-01-02T08:08:29.158831Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "6dd613c5-5bd9-9a3e-ffc5-49626b2ad83e",
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
            id: "52c8c613-14bb-e41b-5b60-e94797f7d572",
            name: "Rechtsanwalt Dr. Elisa-Maria Voigt",
            aktenzeichen: "X 8634 03/2025",
          },
        ],
      },
      {
        id: "9784c5f2-aabf-c03c-51ef-d5db463b2f5a",
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
            id: "f36071fd-c2ab-df37-255b-c6daef1ddd12",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "J 643 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728b-7246-b31f-0680c388b8d8",
    aktenzeichen_gericht: "A 7663 04/2024",
    status: "ERSTELLT",
    status_changed: "2025-03-07T05:33:06.609018Z",
    eingereicht_am: "2023-12-26T09:28:44.34575Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "2f713c28-0387-01fb-7df4-633d6b4e45d5",
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
            id: "400a6fcb-8544-d007-adc5-41cb7b36ee25",
            name: "Dr. Elisa Schönfeld",
            aktenzeichen: "O 6200 05/2025",
          },
        ],
      },
      {
        id: "8cbe7692-1b98-075b-1e04-6ec98b4c2fd1",
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
            id: "8a6ce1bd-c818-2bde-f84e-4dcf333bbe53",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "S 4646 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecf-7c37-8791-d80243ad0055",
    aktenzeichen_gericht: "E 2458 09/2024",
    status: "EINGEREICHT",
    status_changed: "2025-09-28T11:38:57.568734Z",
    eingereicht_am: "2023-12-23T06:35:50.665967Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "ba261c1e-f872-ac1e-d08a-1f15a6e38fcb",
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
            id: "e1eb67e5-bbb6-2058-a8ef-f8cece04db07",
            name: "Tim Becker",
            aktenzeichen: "T 4729 01/2024",
          },
        ],
      },
      {
        id: "bff3d646-60f9-e020-6256-3d824511fe8b",
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
            id: "27ffd0c3-2986-4643-bc4d-f575a95e4b70",
            name: "Rechtsanwalt Dr. Florian Kranz",
            aktenzeichen: "F 6825 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ede-73b3-a78b-f5a44ddeeef9",
    aktenzeichen_gericht: "E 435 05/2025",
    status: "ERSTELLT",
    status_changed: "2025-09-28T00:45:56.146051Z",
    eingereicht_am: "2023-12-16T19:29:59.325992Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "a2dd1554-9e4f-2cd7-eb15-3cdc3a70f349",
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
            id: "2ec8e8b2-07e1-8631-b8ca-eb1e60c9efc5",
            name: "Rechtsanwalt Dr. Nina Schäfer",
            aktenzeichen: "X 6446 06/2026",
          },
        ],
      },
      {
        id: "fe8c29cd-9a1c-2c0a-cc92-2750ec2d8d6a",
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
            id: "625fa7c6-b151-33d3-f4df-527a2dc42e86",
            name: "Rechtsanwalt Dr. Ben-Luca Möller",
            aktenzeichen: "W 3381 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-7cd7-b3ff-3b53533e6a18",
    aktenzeichen_gericht: "T 8769 09/2026",
    status: "ERSTELLT",
    status_changed: "2025-09-30T04:57:29.644353Z",
    eingereicht_am: "2023-12-09T03:55:29.472287Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "5e92d7ea-a18f-7683-8028-8e165ee5fde1",
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
            id: "3a722474-57b8-8445-04ee-0ce1baa23ae2",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "U 8115 09/2024",
          },
        ],
      },
      {
        id: "e9b7830d-5756-ccde-1993-6e5c3e20cdad",
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
            id: "9930b533-8666-6438-14fa-5a58568e0281",
            name: "Dr. Benedikt-Leonhard-Maximilian von Krüger-Brückner-Weiß-Schäfer-Kühn",
            aktenzeichen: "X 8128 05/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ede-7fff-aae1-497299a51325",
    aktenzeichen_gericht: "G 3687 03/2024",
    status: "ERSTELLT",
    status_changed: "2025-10-07T06:09:14.732937Z",
    eingereicht_am: "2023-12-07T23:12:47.422378Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "49099a73-3df1-87b8-d234-b79e9d0a1128",
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
            id: "be5f8b3e-374e-121d-8cc9-3ab269204ad9",
            name: "Rechtsanwalt Dr. Wolfgang Kühn",
            aktenzeichen: "N 8852 12/2026",
          },
        ],
      },
      {
        id: "6ca9902d-0927-4c5e-bde7-22992ce116a7",
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
            id: "a4ed2fd6-cd84-c2a4-e177-e97a2a6eaad0",
            name: "Rechtsanwalt Elisa-Sophie-Luise-Gräfin von Löwenhügel-Küster-Schönfeld-Weiß",
            aktenzeichen: "T 1699 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-7f3f-99db-4787bdbc04b1",
    aktenzeichen_gericht: "E 4936 11/2026",
    status: "ERSTELLT",
    status_changed: "2025-02-16T04:37:22.48505Z",
    eingereicht_am: "2023-12-01T08:07:27.094892Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "ce3c27d2-36f7-db72-ed13-c05d282a64e0",
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
            id: "c601462a-d04e-39d1-015a-b3a9c94492de",
            name: "Rechtsanwalt Ludwig-Konstantin-Maximilian von Schönwald-Küster-Schäfer-Weißmann",
            aktenzeichen: "L 5222 05/2024",
          },
        ],
      },
      {
        id: "eac8fa52-fa4d-8078-7497-c595c5a3d161",
        name: "Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
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
    id: "019c5736-7838-7dbb-821a-8886c974a32c",
    aktenzeichen_gericht: "Z 2771 01/2024",
    status: "ERSTELLT",
    status_changed: "2025-03-09T23:36:54.238809Z",
    eingereicht_am: "2023-12-01T00:51:54.666929Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "0cb014fa-9ec3-9950-399a-3375232442df",
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
            id: "487e6405-8713-35c0-0a9e-1f876671b262",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "X 2990 05/2024",
          },
        ],
      },
      {
        id: "4d108c7f-4ee4-6cd7-7561-39aa4089f68f",
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
            id: "d4ca71b0-9ecf-4ffa-727c-8e8d02d2c0a5",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Y 3071 10/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-7ed1-8962-a9d3ced18a54",
    aktenzeichen_gericht: "O 749 10/2026",
    status: "ERSTELLT",
    status_changed: "2025-11-27T23:09:35.06185Z",
    eingereicht_am: "2023-11-22T14:50:39.00076Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "57ea65df-376a-fb15-e654-95e34eac6018",
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
            id: "0947e4f6-a791-fd7c-2edf-28949de3ac03",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "O 178 03/2026",
          },
        ],
      },
      {
        id: "a5ff9424-d7db-b0dd-525e-87109ac35dd6",
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
            id: "9d3239ff-e281-30d8-8468-7ffe53f1910f",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "V 8752 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-715a-89b2-39cd0ed8c7ee",
    aktenzeichen_gericht: "Q 9985 09/2024",
    status: "EINGEREICHT",
    status_changed: "2025-04-13T03:35:38.393668Z",
    eingereicht_am: "2023-11-18T16:56:04.930951Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "82add55c-f3e2-586a-52e7-2ee10514d861",
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
            id: "80f8acbe-ad5d-c8cb-9381-b633f3d3a80f",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "H 5969 04/2026",
          },
        ],
      },
      {
        id: "a8f0c33c-904c-f372-4f84-ae7a7636be61",
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
            id: "63b6fff7-c9f9-0df2-7d5f-8215b10a3666",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "J 364 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-7864-ba20-a1bdd337159b",
    aktenzeichen_gericht: "J 3644 02/2025",
    status: "ERSTELLT",
    status_changed: "2025-04-04T02:23:49.618213Z",
    eingereicht_am: "2023-11-16T18:35:18.537059Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "30eb28e5-511b-73c9-59da-5ed52270ee01",
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
            id: "efc58ecf-15f4-3b7f-1656-cb65f676661d",
            name: "Rechtsanwalt Paulina-Luise Katharina von Hölzer-Schönfeld",
            aktenzeichen: "X 6824 06/2024",
          },
          {
            id: "e08b93f0-3e32-5d8f-38fa-666ab33e6675",
            name: "Tim Becker",
            aktenzeichen: "H 5885 10/2024",
          },
        ],
      },
      {
        id: "95084b4a-d993-4985-b80f-dfe87c88171f",
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
            id: "db102a25-7382-8df6-8f24-8aef616b339a",
            name: "Rechtsanwalt Dr. Florian Bär",
            aktenzeichen: "O 3744 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783a-778d-b4c7-22502fb059db",
    aktenzeichen_gericht: "M 7061 11/2024",
    status: "EINGEREICHT",
    status_changed: "2025-10-30T08:16:56.84389Z",
    eingereicht_am: "2023-11-07T18:46:58.135069Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "d5caf149-e393-b430-b0b9-6a12c4e7962d",
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
            id: "bd18676b-8af3-1a06-ce8a-c11d0ddc112d",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "R 4402 11/2026",
          },
          {
            id: "bef7ed8f-3ed9-66af-326d-fc01a14d3f0b",
            name: "Dr. Gabriele Kraus",
            aktenzeichen: "P 5055 02/2024",
          },
        ],
      },
      {
        id: "d8f14499-86ac-de7e-292d-2dd383fcc383",
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
            id: "dee8b315-9b7f-4077-e4be-4d3b23d4be4d",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "L 8171 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-7717-b074-5e182a28479d",
    aktenzeichen_gericht: "Q 3972 13/2026",
    status: "ERSTELLT",
    status_changed: "2025-08-31T06:11:04.434539Z",
    eingereicht_am: "2023-10-26T19:24:49.742518Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "0c19d45d-4a0d-c7ab-c5b3-f81966b45529",
        name: "Andreas Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "dcd44384-d61d-ba68-8bfe-4e838b9d5d3a",
            name: "Rechtsanwalt Dr. Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
            aktenzeichen: "J 4674 11/2024",
          },
        ],
      },
      {
        id: "c932475c-49db-5e83-893c-eeaacb75f682",
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
            id: "68d69817-fcf8-5923-e61f-383f839ed955",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 5590 07/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed1-7f5f-be4f-d6ed2f18aade",
    aktenzeichen_gericht: "W 2590 07/2025",
    status: "ERSTELLT",
    status_changed: "2025-04-03T02:41:51.709503Z",
    eingereicht_am: "2023-10-23T19:54:06.672558Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "aea32818-4861-a97b-1e4b-eb4e0bb7424f",
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
            id: "da48dd5e-e560-5064-a19c-f635a4b54159",
            name: "Tim Becker",
            aktenzeichen: "E 7877 08/2024",
          },
        ],
      },
      {
        id: "b21395a7-0c10-1750-4eeb-b671f210ee7a",
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
    id: "019c5736-783b-7d21-9dce-5b284aee598e",
    aktenzeichen_gericht: "I 3020 05/2024",
    status: "EINGEREICHT",
    status_changed: "2026-01-14T14:03:16.69892Z",
    eingereicht_am: "2023-10-22T10:17:28.429936Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "0a34386e-d9c2-01db-24ff-a07f08aac3bd",
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
            id: "806b44b8-6687-db61-6034-6b665a2e2761",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 7441 06/2026",
          },
        ],
      },
      {
        id: "58a0fdc6-b19b-b50f-f99f-a5d676a0cd8d",
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
    ],
  },
  {
    id: "019c5741-728b-7e01-9227-2ec6c4f0a21c",
    aktenzeichen_gericht: "I 6127 12/2025",
    status: "ERSTELLT",
    status_changed: "2025-06-26T10:25:22.373443Z",
    eingereicht_am: "2023-10-22T05:15:46.094779Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "8a043fa9-4bbb-9d0a-3c2b-a3a1b3a97120",
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
            id: "d4e936ba-5843-0279-9823-e29345b24b3c",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "C 6597 10/2025",
          },
          {
            id: "f43d3e7f-90ae-ae81-a0e8-7234eb2a72e1",
            name: "Rechtsanwalt Katharina Weiß",
            aktenzeichen: "R 2668 09/2024",
          },
        ],
      },
      {
        id: "91995d03-5e42-e5ca-8f9a-94b1b3343359",
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
            id: "6fbdbecd-d9f7-3f31-18b5-caaa5f35574d",
            name: "Rechtsanwalt Dr. Günther Weißmann",
            aktenzeichen: "K 9927 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-7488-b4b4-49166a6b5b29",
    aktenzeichen_gericht: "P 8778 01/2025",
    status: "EINGEREICHT",
    status_changed: "2025-04-10T20:25:50.935635Z",
    eingereicht_am: "2023-10-17T05:33:00.48794Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "1f52efe2-d0e0-07f1-6191-c67518e91a89",
        name: "Ben-Luca Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "c58f1812-fc52-85dd-1ba2-e78814b26c51",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "V 6996 12/2024",
          },
        ],
      },
      {
        id: "96826b7f-5c26-1ab4-75c2-9305f1e644f4",
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
            id: "dcda8c59-096b-8908-a70e-b4111a4a0cfd",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Z 6026 09/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783a-7a66-8043-69303d16c4fd",
    aktenzeichen_gericht: "L 3562 04/2024",
    status: "ERSTELLT",
    status_changed: "2025-09-27T01:29:21.985632Z",
    eingereicht_am: "2023-10-06T19:01:01.585605Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "7186d9ed-89c9-a013-fd36-eca478afa791",
        name: "Luisa Schäfer",
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
        id: "a10d4a37-801f-7861-8162-6c8e02394fa9",
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
            id: "91784299-2159-f44a-ea9d-41aa734ab790",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "B 4185 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-7c4f-b930-5b74100ed73c",
    aktenzeichen_gericht: "C 1055 12/2024",
    status: "ERSTELLT",
    status_changed: "2025-10-18T10:41:16.787432Z",
    eingereicht_am: "2023-09-26T01:30:58.113961Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "83e44855-6004-e0ee-b508-f920ccfe03fd",
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
            id: "769d337f-d334-2db5-0416-e81bba724d71",
            name: "Rechtsanwalt Antonia Löhr",
            aktenzeichen: "G 6054 09/2025",
          },
        ],
      },
      {
        id: "d3eeeb9a-9a15-70d8-29b0-3c3b53830ba8",
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
            id: "6a320fd3-25ff-9b61-3b95-d83fd6c1f677",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Q 1353 05/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-7de9-9a03-78a4244be011",
    aktenzeichen_gericht: "F 1975 04/2026",
    status: "ERSTELLT",
    status_changed: "2025-07-04T04:30:46.775744Z",
    eingereicht_am: "2023-09-23T07:51:22.601351Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "5fd9b247-8d97-4431-94d3-7c6c2655c857",
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
            id: "3c496303-936b-fbd5-391f-8a0f2217013c",
            name: "Rechtsanwalt Julius Krämer",
            aktenzeichen: "Z 5118 03/2025",
          },
          {
            id: "b8c19f72-b6d3-c237-b06c-b90b8f4bcdc0",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "S 6183 11/2024",
          },
        ],
      },
      {
        id: "853d9562-b4c8-c15f-6382-8d44a6c86100",
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
            id: "64fa2c69-966f-8f5f-bfe5-799d6db24852",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "M 331 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-723c-7fee-b245-f374d98ea526",
    aktenzeichen_gericht: "I 8868 01/2025",
    status: "ERSTELLT",
    status_changed: "2025-10-29T19:42:42.520282Z",
    eingereicht_am: "2023-09-17T08:19:38.288907Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "213dcfe5-d448-98ba-6019-5fa59cc415b2",
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
            id: "b09a266a-4825-8529-409f-330df0a31b51",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Q 9791 01/2026",
          },
        ],
      },
      {
        id: "d34fe4f5-e8ec-90d1-99f4-42c7e7105c93",
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
            id: "1b56a2b3-a4f4-5f91-f6be-0447a1850dad",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "X 9635 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-7179-a230-7a8f53f9ceb0",
    aktenzeichen_gericht: "P 2346 09/2026",
    status: "EINGEREICHT",
    status_changed: "2025-04-02T11:02:48.182137Z",
    eingereicht_am: "2023-09-11T03:23:05.787789Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "44143851-c39e-1dc3-3150-e8157be58b88",
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
        id: "bc0626c5-519e-8c5c-e442-b7acd3fb281a",
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
            id: "f9a86b9f-de04-90be-069d-30fff664ce26",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "W 4313 03/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ede-7c53-a6ea-fbbd2abbfd09",
    aktenzeichen_gericht: "S 1882 12/2025",
    status: "ERSTELLT",
    status_changed: "2025-06-05T14:22:29.298567Z",
    eingereicht_am: "2023-09-10T05:41:06.445002Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "19e2d51b-c383-ab94-8abb-66eb71290f3f",
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
            id: "92ea0897-c0be-2d31-981b-075b6c7efdf5",
            name: "Tim Becker",
            aktenzeichen: "K 8273 11/2026",
          },
        ],
      },
      {
        id: "8c1db4de-6c0a-c089-2780-ed1a928c838a",
        name: "Friedrich Kübler",
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
    id: "019c5733-2ecc-7729-a9b4-b3277a6e4a3b",
    aktenzeichen_gericht: "S 9181 04/2025",
    status: "EINGEREICHT",
    status_changed: "2025-09-11T00:47:44.054633Z",
    eingereicht_am: "2023-09-08T20:33:59.660621Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "ca81dd63-2904-5788-73d9-2b31e532756e",
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
        id: "f5c0edfa-ea8c-28e9-3a32-7b61b04b5cac",
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
            id: "9aac4732-93f0-ff26-6311-dca866a27f49",
            name: "Tim Becker",
            aktenzeichen: "F 4149 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-74b4-924a-6f963557aa51",
    aktenzeichen_gericht: "S 4282 07/2024",
    status: "ERSTELLT",
    status_changed: "2025-07-31T14:23:10.593614Z",
    eingereicht_am: "2023-09-08T19:11:49.14982Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "613acbe4-717e-ff02-0550-911a9d17c0d2",
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
            id: "32c8086e-da14-235e-d7b3-ea7cc224f624",
            name: "Rechtsanwalt Dr. Johanna Möser",
            aktenzeichen: "P 8546 09/2025",
          },
        ],
      },
      {
        id: "c162b420-8716-f2f5-f1e4-21adeb2ece47",
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
            id: "daf57745-9588-2716-5c4a-740585374671",
            name: "Dr. Anna-Maria-Luise von Hohenstein-Schwarzburg",
            aktenzeichen: "L 6610 03/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7df2-bee6-1b8a9e3298b3",
    aktenzeichen_gericht: "M 7857 07/2026",
    status: "EINGEREICHT",
    status_changed: "2025-07-20T11:40:17.676024Z",
    eingereicht_am: "2023-09-02T23:05:02.741439Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "12b09c73-ee27-26de-3367-ab7e63154f33",
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
            id: "9ccbe0e5-1022-1d74-15bc-c0a97344fb26",
            name: "Rechtsanwalt Markus Lösch",
            aktenzeichen: "K 2255 08/2024",
          },
        ],
      },
      {
        id: "77e7e3c5-1e90-1965-7ef4-832f883758e4",
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
    id: "019c5741-728d-7973-9b86-a2603f4a7fd7",
    aktenzeichen_gericht: "N 4129 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-04-26T04:37:34.192461Z",
    eingereicht_am: "2023-08-31T17:58:20.038568Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "a9ff43b3-c4df-94e0-bcc4-aef33cab89b0",
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
            id: "446509b0-b65b-7ce9-4b6d-715faaec31a4",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "O 6565 10/2025",
          },
          {
            id: "7e3159ea-d6a2-aee3-5fab-2d9a06108c51",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Q 2505 07/2025",
          },
        ],
      },
      {
        id: "d20343da-1b81-a6b3-38d8-e8ea9e8e8fe9",
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
            id: "c69db282-f25e-2c52-2a2c-c6a0f2a52470",
            name: "Rechtsanwalt Karl-Ludwig-Ferdinand-Maximilian von Schönberg-Kühn-Weißmann",
            aktenzeichen: "U 5544 09/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed6-7b77-8ac5-ed9f882b7952",
    aktenzeichen_gericht: "R 1695 12/2025",
    status: "ERSTELLT",
    status_changed: "2025-04-16T15:21:36.899838Z",
    eingereicht_am: "2023-08-31T06:39:01.153826Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "57687062-033b-5bd9-7be8-176cf805f4a8",
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
            id: "5a09080f-24c4-1443-42a5-29ef4bbbce52",
            name: "Rechtsanwalt Friedrich-Alexander-Johannes von Hohenstein-Bär-Krüger-Schäfer",
            aktenzeichen: "K 7007 01/2025",
          },
        ],
      },
      {
        id: "64a30403-cda3-c11b-15ef-eb02e091b11e",
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
            id: "edfb56a3-ad2a-78f1-a7b4-b0c305ecad24",
            name: "Tim Becker",
            aktenzeichen: "Z 4528 10/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-7bd4-80d1-4fff9640b14d",
    aktenzeichen_gericht: "J 6841 13/2025",
    status: "ERSTELLT",
    status_changed: "2025-12-27T14:37:49.322398Z",
    eingereicht_am: "2023-08-19T22:24:27.33461Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "cf83c942-34ce-e70d-1b14-3d106c9c1e28",
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
            id: "7d3b1e56-973e-e8bb-4fb6-4351b294c1d6",
            name: "Dr. Helene-Isabell-Theresa von Weißmann-Kühn-Schäfer-Bärenfels",
            aktenzeichen: "Q 1148 09/2025",
          },
        ],
      },
      {
        id: "d6a3a566-87fa-2fda-c41a-e812eab17cd5",
        name: "Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
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
    id: "019c5733-2eca-73e8-9e00-88143b2cf4d6",
    aktenzeichen_gericht: "T 4469 03/2026",
    status: "ERSTELLT",
    status_changed: "2026-01-11T18:22:47.186156Z",
    eingereicht_am: "2023-08-19T13:47:30.687372Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "381914d5-3724-7ba9-dd35-f284c5fd09f7",
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
            id: "abbd1895-b65d-b900-6fd5-7a59b2511eb4",
            name: "Tim Becker",
            aktenzeichen: "E 3093 10/2024",
          },
        ],
      },
      {
        id: "ceacdccb-453a-0ff8-9741-588319332cff",
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
            id: "e08ab24c-e85d-e7ab-95eb-68e0bd1bf4c4",
            name: "Dr. Franziska-Madeleine von Hohenlohe-Kühn",
            aktenzeichen: "P 6575 08/2026",
          },
          {
            id: "eab38233-e5dc-f8c1-0839-6541736ef02c",
            name: "Tim Becker",
            aktenzeichen: "R 8664 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-7e8d-a979-2a40e4665ae4",
    aktenzeichen_gericht: "K 3542 07/2024",
    status: "ERSTELLT",
    status_changed: "2025-04-13T17:07:31.234867Z",
    eingereicht_am: "2023-08-14T18:20:08.523833Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "3d862eb9-89c3-708a-7ac9-a1a180468624",
        name: "Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
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
        id: "d035b2c5-2f78-e48b-ea11-08caf4c349ea",
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
            id: "55cf04f2-8719-36c3-6a96-bfdba5b61898",
            name: "Rechtsanwalt Alina-Theresa Viktoria von der Grünenau",
            aktenzeichen: "Q 788 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2eda-71ff-9f74-62a53cf7553b",
    aktenzeichen_gericht: "R 3524 06/2024",
    status: "EINGEREICHT",
    status_changed: "2025-12-10T03:27:14.246366Z",
    eingereicht_am: "2023-08-10T17:05:17.422886Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "8daaea93-2ccd-a406-5664-4daa476c6940",
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
            id: "9adc25d4-6d2b-0ebb-6506-42db043515c8",
            name: "Tim Becker",
            aktenzeichen: "B 228 05/2026",
          },
        ],
      },
      {
        id: "94c5cca6-7bd4-e33d-8f43-235985c648e2",
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
            id: "98fa50c6-3785-9482-ef37-6637c581695d",
            name: "Tim Becker",
            aktenzeichen: "Y 4811 11/2026",
          },
          {
            id: "757603e4-acd9-f799-e557-d2159cefd9e4",
            name: "Dr. Laurenz Böhler",
            aktenzeichen: "P 5695 09/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-7d9b-ab3b-d7c6eea55b70",
    aktenzeichen_gericht: "E 1193 02/2026",
    status: "EINGEREICHT",
    status_changed: "2026-02-11T07:43:20.031519Z",
    eingereicht_am: "2023-08-05T14:37:31.908737Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "65ce016a-4613-b604-f681-5e1bcd27cf7e",
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
            id: "cdfdefbc-dce7-ceb2-5db3-a81068984567",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "N 5944 02/2026",
          },
          {
            id: "5540cbbb-a56b-19cf-4810-4c9b8d2337ea",
            name: "Rechtsanwalt Dr. Jonas-Maurer",
            aktenzeichen: "X 569 01/2026",
          },
        ],
      },
      {
        id: "93fa9a9b-b857-48ff-3fcc-b159c8312f95",
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
            id: "42b8e886-8eb5-6fba-98b8-217e8134117a",
            name: "Dr. Miriam-Luise Ott",
            aktenzeichen: "F 960 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed6-7758-a473-ea602a9a9502",
    aktenzeichen_gericht: "I 6661 01/2025",
    status: "ERSTELLT",
    status_changed: "2025-06-17T12:00:18.84362Z",
    eingereicht_am: "2023-07-31T13:44:34.303167Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "1e7421ac-0683-1001-5efd-77c793afbf05",
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
            id: "cfe300ac-8a2f-915e-38f0-4e07fad3228f",
            name: "Tim Becker",
            aktenzeichen: "E 6245 09/2025",
          },
        ],
      },
      {
        id: "9c57bf51-f1c1-394a-bb54-59638c49fa94",
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
            id: "94aafcfc-30f9-6fc6-d413-9266fa885144",
            name: "Dr. Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
            aktenzeichen: "W 6337 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-7d52-80bb-25ea2e81e59b",
    aktenzeichen_gericht: "U 8754 02/2025",
    status: "ERSTELLT",
    status_changed: "2025-07-21T14:20:21.543934Z",
    eingereicht_am: "2023-07-31T10:40:48.046128Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "77a94123-91c2-f9f8-f98b-c0243c47f512",
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
            id: "cdb95b7e-a714-dae4-f463-089c785e5abe",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "N 4076 06/2025",
          },
        ],
      },
      {
        id: "f30aa49b-49cf-538c-4a90-3b678aa41cea",
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
            id: "440647c4-07d6-6cd5-7b52-4fc0d5c83323",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "V 9287 12/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-7d58-9846-a40349b0429d",
    aktenzeichen_gericht: "A 4907 01/2024",
    status: "EINGEREICHT",
    status_changed: "2025-06-10T12:11:52.517599Z",
    eingereicht_am: "2023-07-26T17:55:50.867236Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "2cca4465-fff3-d07d-758d-e4d00abc3f53",
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
            id: "15c9e6aa-6d1b-d2c3-ba9f-5699aa7f3517",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "P 9747 02/2025",
          },
        ],
      },
      {
        id: "6303ee15-947c-1d54-57a0-94620dabe919",
        name: "Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
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
    id: "019c5736-7836-7471-8ea0-180f1547abf3",
    aktenzeichen_gericht: "Z 6784 01/2024",
    status: "ERSTELLT",
    status_changed: "2025-04-03T21:21:28.487018Z",
    eingereicht_am: "2023-07-24T12:28:28.124073Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "137c85f1-5a55-5fcf-6d87-aead36c2cc37",
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
            id: "35c1c040-5ab6-f034-6ce5-7853866998fb",
            name: "Dr. Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
            aktenzeichen: "M 3187 06/2026",
          },
        ],
      },
      {
        id: "63f1422e-e317-83a8-7f18-b1fe93b39a6a",
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
    id: "019c5741-728d-70aa-b3dc-d3877c9f168c",
    aktenzeichen_gericht: "S 7307 12/2024",
    status: "ERSTELLT",
    status_changed: "2025-09-29T20:09:41.878218Z",
    eingereicht_am: "2023-07-23T13:36:16.947385Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "0492a4b4-6458-1096-0465-fef1e0117dd0",
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
            id: "5d9b30e1-5446-ab39-e5ae-5c0bd9d97504",
            name: "Dr. Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
            aktenzeichen: "F 5710 03/2024",
          },
        ],
      },
      {
        id: "5129bf5b-6845-e94b-efc7-06df18dea409",
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
            id: "bf5b8c4b-08f8-1aa1-b939-d54c4fa1db77",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 3800 05/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed7-773e-9d6e-a0322c430b9b",
    aktenzeichen_gericht: "H 7306 03/2025",
    status: "EINGEREICHT",
    status_changed: "2025-09-10T05:58:18.259931Z",
    eingereicht_am: "2023-07-19T19:58:01.283205Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "3931acc7-c27a-b04e-41c1-e75e56253f1c",
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
            id: "4e5cb2a0-e7e2-ff26-af69-c4ce14b545ef",
            name: "Tim Becker",
            aktenzeichen: "G 8596 12/2025",
          },
        ],
      },
      {
        id: "f36e2475-6a31-6f0e-ad9f-79ddc8918d37",
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
            id: "5ed55d0b-985b-75e6-ba3f-aee77b94d2ef",
            name: "Dr. Matthias-Lorenz-Friedrich von der Löschau-Krüger-Schönfeld-Weiß",
            aktenzeichen: "G 5690 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ece-7137-a359-0e754342070a",
    aktenzeichen_gericht: "V 7452 09/2025",
    status: "ERSTELLT",
    status_changed: "2025-03-19T03:37:53.745011Z",
    eingereicht_am: "2023-07-19T06:33:45.065149Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "a68a245e-2fe3-267e-ccc1-d4e708d14a40",
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
            id: "d3c3fd2b-7fa7-2361-73e7-9f4eac5c9230",
            name: "Tim Becker",
            aktenzeichen: "Z 8491 01/2026",
          },
        ],
      },
      {
        id: "ae29b7d4-8cf2-a1c0-7c5f-a64c31bb7755",
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
            id: "47ab4599-7052-43f6-6a50-680ad370301f",
            name: "Rechtsanwalt Sabine Schäfer",
            aktenzeichen: "M 3153 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ece-7fb7-97ad-260089cae867",
    aktenzeichen_gericht: "R 6153 06/2026",
    status: "ERSTELLT",
    status_changed: "2025-05-15T10:24:52.53028Z",
    eingereicht_am: "2023-07-17T17:34:54.051109Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "49c2178a-fbc9-ea1c-06b8-71410871f0a2",
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
            id: "f97eb274-d4bf-4553-89db-7aa9b7524159",
            name: "Tim Becker",
            aktenzeichen: "Q 3338 07/2026",
          },
        ],
      },
      {
        id: "e4f2f66a-67d5-e9ea-0ac6-93a2675997ce",
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
            id: "7be7b040-5447-b0d8-b51f-abdf56e792f5",
            name: "Tim Becker",
            aktenzeichen: "W 9785 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-7d2d-b888-2ce18fb41be6",
    aktenzeichen_gericht: "X 6321 04/2026",
    status: "ERSTELLT",
    status_changed: "2026-01-03T18:22:01.725959Z",
    eingereicht_am: "2023-06-21T21:17:11.348494Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "dcc51d2b-8482-bb84-f411-2b7f1acc8fa6",
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
            id: "fe1df804-3532-2344-adb4-27e9f41e57c3",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "C 8214 08/2026",
          },
          {
            id: "bb6f2acc-58d9-e0eb-0fbb-e1c5e7553712",
            name: "Rechtsanwalt Luisa-Maria Roth",
            aktenzeichen: "X 1838 12/2026",
          },
        ],
      },
      {
        id: "e8f20f77-d959-47f3-c5e3-c5c1b6393c3f",
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
            id: "d4852103-596a-b5a0-8de5-15f9e72ab333",
            name: "Dr. Lena-Maria Böhm",
            aktenzeichen: "R 3996 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728b-7b76-833b-6bd93aa99086",
    aktenzeichen_gericht: "M 7502 05/2024",
    status: "EINGEREICHT",
    status_changed: "2026-02-07T08:54:18.085329Z",
    eingereicht_am: "2023-06-21T11:19:21.42918Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "38ac4bea-f2ae-d1a2-60d3-9f3f26016595",
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
            id: "d4187850-7836-8aa4-6086-27e3eaeae22b",
            name: "Dr. Gabriele Kraus",
            aktenzeichen: "J 8402 07/2026",
          },
        ],
      },
      {
        id: "b1a1ec4f-4824-e92c-8fe2-24a09107256c",
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
            id: "f731b281-c37d-e314-daf4-59586ef9d35f",
            name: "Rechtsanwalt Helene Küster",
            aktenzeichen: "Y 7077 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7be7-94c0-d3c40a9b6963",
    aktenzeichen_gericht: "F 8402 11/2025",
    status: "EINGEREICHT",
    status_changed: "2025-11-17T04:47:36.770893Z",
    eingereicht_am: "2023-06-20T11:17:21.905633Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "4622e8cc-1220-0a63-9a6b-8f1842f42845",
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
            id: "dd9eccd4-90c1-3645-eb9b-17b2d012ef00",
            name: "Dr. Tobias Möser",
            aktenzeichen: "E 8722 01/2026",
          },
        ],
      },
      {
        id: "6b164236-f3dc-4a22-db92-cf842d82033d",
        name: "Kathrin Weiß",
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
    id: "019c5741-728e-75fa-bb07-0e6bc458bc1c",
    aktenzeichen_gericht: "K 9905 12/2026",
    status: "ERSTELLT",
    status_changed: "2025-12-02T00:59:01.015477Z",
    eingereicht_am: "2023-06-19T02:58:41.00427Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "31f5e9e9-ab73-e44c-0ceb-af76b56c991b",
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
            id: "60d2d569-15fd-f4f8-482a-7d4f1896da27",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "M 8192 07/2024",
          },
          {
            id: "13de2a61-25cd-8ef2-f209-c2d1db6e42c9",
            name: "Rechtsanwalt Tobias Löhr",
            aktenzeichen: "C 3500 08/2026",
          },
        ],
      },
      {
        id: "54323dd3-6636-443d-0ada-fd2952d87dd1",
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
            id: "4207fb88-58ba-0e3e-b56e-68e323a80de3",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "I 3899 10/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-77e5-7cb2-b0da-c50f6a49d4ce",
    aktenzeichen_gericht: "W 476 04/2025",
    status: "ERSTELLT",
    status_changed: "2025-11-29T17:54:57.290527Z",
    eingereicht_am: "2023-06-02T00:45:58.705585Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "28c4bb00-17de-d184-1f4e-a49f826dcfa5",
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
            id: "438e53dc-ecfd-faa9-1df2-ae3683e3f8d1",
            name: "Dr. Johanna-Lina Böhm",
            aktenzeichen: "Q 2024 03/2026",
          },
          {
            id: "e6dc33ba-84af-8dc4-4d06-3c2993a613ec",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "O 5123 12/2024",
          },
        ],
      },
      {
        id: "69c1b0e8-e595-09ae-9411-e49f3758193e",
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
            id: "8a7ecf53-596c-028d-6e33-250b91f0f963",
            name: "Rechtsanwalt Katharina Weiß",
            aktenzeichen: "Y 1709 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7291-772b-8b9e-4ba29a795218",
    aktenzeichen_gericht: "S 398 02/2025",
    status: "ERSTELLT",
    status_changed: "2025-03-24T09:11:01.894149Z",
    eingereicht_am: "2023-05-29T10:58:29.148049Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "0cde7d66-695c-c0c7-b92d-264ff6304433",
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
            id: "33b4bfd1-5c80-a1d7-9d1e-1c8e12357e67",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "K 4590 10/2025",
          },
        ],
      },
      {
        id: "5376c408-1dd0-c982-7e46-29bd3e77ca40",
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
            id: "0b5894c0-531c-36f6-db81-3b2b1a52544e",
            name: "Dr. Johanna Kübler",
            aktenzeichen: "E 782 05/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-7b99-8bd6-a0abc4df2a61",
    aktenzeichen_gericht: "D 930 09/2024",
    status: "ERSTELLT",
    status_changed: "2025-03-14T23:31:01.690268Z",
    eingereicht_am: "2023-05-26T22:52:35.010651Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "347ff928-eb76-587f-c6ad-4e999e367cd7",
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
        id: "d57506fd-5b61-28c5-1208-3bda4df0fefd",
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
            id: "22ef3022-8ebe-7eda-3048-d00694a6ddfb",
            name: "Dr. Helene-Marie Augusta von Schwanenburg-Weiß",
            aktenzeichen: "C 6591 04/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-7b2a-816e-2fa7bbe752bb",
    aktenzeichen_gericht: "R 2510 06/2025",
    status: "EINGEREICHT",
    status_changed: "2025-10-17T19:22:33.178152Z",
    eingereicht_am: "2023-05-25T14:00:24.022513Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "3db1e478-3f7d-f181-e141-d5c6c08cee95",
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
            id: "f0812bd2-d11d-fe9a-77df-69ec7473be9d",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 9687 11/2026",
          },
        ],
      },
      {
        id: "52375962-33cd-dbd1-cbfc-c6aae45ef2bb",
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
            id: "303d5fb2-8b97-a092-aa8b-bd72d2611f83",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Z 9987 04/2025",
          },
          {
            id: "adb49770-2ad0-6bc6-7105-5ece0abbdbd8",
            name: "Rechtsanwalt Tobias Schönfeld",
            aktenzeichen: "L 7324 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-772f-bcd7-9211700c268f",
    aktenzeichen_gericht: "B 1593 04/2026",
    status: "EINGEREICHT",
    status_changed: "2025-09-08T19:57:41.413813Z",
    eingereicht_am: "2023-05-13T03:47:29.242256Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "15a69d04-f58d-7eba-022c-93186385a131",
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
            id: "83f8ded4-7566-b4ba-a539-92ee65d0755d",
            name: "Rechtsanwalt Dr. Stefan Kranz",
            aktenzeichen: "T 8765 08/2026",
          },
          {
            id: "824d841b-9b30-097b-b20a-40d855477a46",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "H 4098 13/2024",
          },
        ],
      },
      {
        id: "e9e7b9cc-d699-75c2-d76c-156ec2585b06",
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
            id: "79cc2183-ee31-9ee7-7768-08c44aa6fe77",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "J 7979 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-76fd-9717-468cf4e388ce",
    aktenzeichen_gericht: "A 5115 03/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-11T22:31:07.080986Z",
    eingereicht_am: "2023-05-10T13:10:44.528062Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "5f22d25d-e7df-84c4-ad20-976aec33992a",
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
            id: "329c87ec-b232-993a-7612-86a077ae5bba",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "I 7348 07/2026",
          },
          {
            id: "087e29e0-3233-f2cd-b128-d7b54721f131",
            name: "Dr. Janina Müller",
            aktenzeichen: "Z 4317 05/2025",
          },
        ],
      },
      {
        id: "bc8d77f2-ad9d-8a94-ef87-b93bcfe9b033",
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
            id: "49910001-a696-913f-1d74-82137bb53649",
            name: "Dr. Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
            aktenzeichen: "R 227 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-770e-9416-0e369e75e0d2",
    aktenzeichen_gericht: "L 5653 03/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-27T09:32:25.614281Z",
    eingereicht_am: "2023-05-05T00:02:38.331008Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "846ca2b3-07f3-657e-b137-cb0d916be258",
        name: "Leonhard Kühn",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "3f6cb47e-8885-0b0f-1c25-581b8515aba7",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "L 499 08/2024",
          },
        ],
      },
      {
        id: "854423c0-dd0a-1ea1-7832-f95a39a1795a",
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
            id: "cd6b58d5-5b0d-d363-2ba6-25990f575e81",
            name: "Rechtsanwalt Dr. Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
            aktenzeichen: "P 8941 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed6-7616-aa60-3b7c7072ab8e",
    aktenzeichen_gericht: "E 7075 02/2024",
    status: "ERSTELLT",
    status_changed: "2025-07-16T09:49:52.416179Z",
    eingereicht_am: "2023-04-28T16:28:37.804268Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "3ce002fb-7223-ba6f-0682-4aacadbf2d12",
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
            id: "16d1d9a8-d2f9-1ce6-18c1-c1e1fb26af51",
            name: "Dr. Leonhard-Sebastian Philipp von Möser-Schäfer",
            aktenzeichen: "Z 1339 12/2024",
          },
        ],
      },
      {
        id: "df53a3eb-ceb4-5d48-f3b1-f908d131bc1f",
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
            id: "fd1aa7e7-50e7-5d2b-0281-7b63876266e7",
            name: "Tim Becker",
            aktenzeichen: "R 5779 01/2025",
          },
          {
            id: "7a99bd1e-a945-04ed-7048-99632c492868",
            name: "Dr. Miriam Hölzer",
            aktenzeichen: "Q 9161 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-7934-95eb-0775386efc23",
    aktenzeichen_gericht: "Q 1130 07/2025",
    status: "EINGEREICHT",
    status_changed: "2025-06-03T05:41:00.922186Z",
    eingereicht_am: "2023-04-26T00:06:01.389983Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "37178011-5d1a-8dd9-b400-24b27d3ff14e",
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
            id: "2d1a8f3a-2291-a5be-8d05-0cbd7f9c4df1",
            name: "Rechtsanwalt Dr. Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
            aktenzeichen: "H 3772 04/2026",
          },
        ],
      },
      {
        id: "be7793b5-ae37-d035-6e0e-d21b22828da9",
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
            id: "c6530906-0711-daf1-826e-a3486477f5b7",
            name: "Tim Becker",
            aktenzeichen: "X 8386 09/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-73a0-ba13-cf860cda46ee",
    aktenzeichen_gericht: "B 1824 13/2026",
    status: "EINGEREICHT",
    status_changed: "2025-06-15T13:51:34.590816Z",
    eingereicht_am: "2023-04-22T17:04:46.169665Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "453ece73-e945-8c07-f196-4b71c2db77c8",
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
            id: "1b76698f-fe1c-f6f1-3c05-42888a2e3120",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "K 7008 04/2024",
          },
        ],
      },
      {
        id: "b7d21409-582b-0413-e2c9-48065e1493ed",
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
            id: "d93e85f4-8f1e-bc4f-08c6-3d281bc661cf",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 647 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-7552-b4f4-6af0b1ba42c2",
    aktenzeichen_gericht: "X 9807 11/2026",
    status: "ERSTELLT",
    status_changed: "2026-01-05T10:04:14.203202Z",
    eingereicht_am: "2023-04-17T14:24:06.447998Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "2ab62b3c-2285-beb1-1fa3-3a7798354436",
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
            id: "4db26a55-0b3b-b910-e17f-891a2b40f8d2",
            name: "Rechtsanwalt Matthias Lösch",
            aktenzeichen: "W 1948 12/2024",
          },
        ],
      },
      {
        id: "2ac02f21-44af-8e4d-872e-df8d37a17a9e",
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
            id: "cac9dc57-94df-0959-c32a-c201e43aad99",
            name: "Dr. Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
            aktenzeichen: "F 1790 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed8-712b-a740-c1cb5455952b",
    aktenzeichen_gericht: "V 9428 01/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-04T06:50:04.980318Z",
    eingereicht_am: "2023-03-29T22:12:31.85488Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "24569cc5-8ea3-8cd3-1f7a-f89bd16fef63",
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
            id: "7d360a6e-5f96-bd53-c1e5-448b092df733",
            name: "Rechtsanwalt Dr. Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
            aktenzeichen: "I 3637 02/2024",
          },
        ],
      },
      {
        id: "a7829c8e-a91a-4766-d83d-86ff643e4100",
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
            id: "9a78f4fa-2a42-b162-c186-99986d43865a",
            name: "Tim Becker",
            aktenzeichen: "U 8618 13/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-710c-82e4-a279d94e2a72",
    aktenzeichen_gericht: "O 3197 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-09-14T17:55:00.249464Z",
    eingereicht_am: "2023-03-28T21:14:08.541704Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "1bf9b600-f473-4705-8fcf-0a6b24900a28",
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
            id: "29d881ab-123d-c7c0-c688-87014d86b1f9",
            name: "Tim Becker",
            aktenzeichen: "I 146 01/2025",
          },
        ],
      },
      {
        id: "fb57de01-0b8e-eb00-c8fb-243ed4b51013",
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
            id: "d7f84829-4588-2d1a-6d52-b40b5627f302",
            name: "Rechtsanwalt Alexander-Theodor Benjamin von Küster-Braun",
            aktenzeichen: "U 1575 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7a43-b2aa-3b9cb673b854",
    aktenzeichen_gericht: "F 7297 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-03-25T04:03:48.125445Z",
    eingereicht_am: "2023-03-15T00:39:39.527023Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "8c0b0f6d-340b-4309-4180-155816022955",
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
            id: "c6fd12d7-1fa1-5a16-7603-48e9c2fcdb44",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "K 7816 11/2025",
          },
        ],
      },
      {
        id: "ac298de9-1fd2-aa1a-6acb-43ca2a1e5775",
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
            id: "e33b18d5-26bf-cfd8-2db6-62c4ffc63e2b",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "R 1550 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed8-74f4-afe1-d2dd403e5399",
    aktenzeichen_gericht: "M 6868 05/2026",
    status: "EINGEREICHT",
    status_changed: "2025-11-04T20:18:11.028416Z",
    eingereicht_am: "2023-02-26T10:16:50.937944Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "5924463f-30dc-b323-4d69-4cfc2ce0348e",
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
            id: "f5cbdd42-62b3-1de9-602a-5524be664208",
            name: "Tim Becker",
            aktenzeichen: "J 6162 10/2026",
          },
        ],
      },
      {
        id: "fd3b4e16-7faf-2ea3-4eef-9e00e8b702d7",
        name: "Andreas Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "baf147eb-b3f4-d024-71c0-5e2899095d73",
            name: "Tim Becker",
            aktenzeichen: "W 2724 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ece-7e5a-8367-45f968fbaf4d",
    aktenzeichen_gericht: "R 4615 02/2026",
    status: "EINGEREICHT",
    status_changed: "2025-04-12T13:11:30.613689Z",
    eingereicht_am: "2023-02-15T15:28:16.188155Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "213aeb7f-daee-604b-960a-c2ccd33ffe7d",
        name: "Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
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
        id: "7b7d73b5-1285-6351-7b13-288ea6ed4b0d",
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
            id: "1699d436-4dc1-8f0a-070d-cb0a87bf8ef1",
            name: "Tim Becker",
            aktenzeichen: "F 9208 05/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edc-7824-adca-9e7b742a49fe",
    aktenzeichen_gericht: "N 2744 08/2024",
    status: "ERSTELLT",
    status_changed: "2025-05-28T05:39:23.064634Z",
    eingereicht_am: "2023-02-13T07:27:40.578959Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "8625b435-e356-4aa2-52de-312d80ec2814",
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
            id: "48a2fb6c-108d-3d30-f68a-1557ddc6e8d4",
            name: "Rechtsanwalt Benjamin Weiß",
            aktenzeichen: "D 235 07/2025",
          },
        ],
      },
      {
        id: "f0625c86-51b9-597b-f620-56a613abf8cb",
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
            id: "29a1ff89-ff44-5345-8e8f-829385fe1311",
            name: "Dr. Gabriele Kraus",
            aktenzeichen: "Y 3160 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed8-79de-8b9f-202d5b14fa9c",
    aktenzeichen_gericht: "L 8568 01/2025",
    status: "ERSTELLT",
    status_changed: "2025-10-07T13:29:57.991964Z",
    eingereicht_am: "2023-01-31T20:49:45.375545Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "75818f3f-9e77-188a-9d22-af996a3e4483",
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
            id: "369a8692-dbd1-fb7c-9b41-308ee85a5e66",
            name: "Dr. Benedikt-Lorenz von Löwenau-Schönfeld",
            aktenzeichen: "S 5199 02/2025",
          },
        ],
      },
      {
        id: "89fd72cc-3b08-bfe3-e677-3d7f914ee0e6",
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
            id: "8f398589-d2b6-524c-6276-032988040a1d",
            name: "Tim Becker",
            aktenzeichen: "S 7856 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-7b27-b825-a7dc4535ed7e",
    aktenzeichen_gericht: "I 826 11/2024",
    status: "ERSTELLT",
    status_changed: "2026-01-30T21:43:41.040773Z",
    eingereicht_am: "2023-01-29T01:14:08.709256Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "47d41a3b-117e-73c5-11ff-c2587c377ce5",
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
            id: "e7ea833e-6647-2b40-d012-d5e4d0e6c1f3",
            name: "Rechtsanwalt Friedrich Scholz",
            aktenzeichen: "V 3728 05/2024",
          },
        ],
      },
      {
        id: "98b0fb3b-51c0-ec0c-775c-ee352b49b16f",
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
            id: "9af61efa-8656-f586-1eb3-9754d42d2954",
            name: "Tim Becker",
            aktenzeichen: "P 7716 10/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-77de-b257-704f3a14f2da",
    aktenzeichen_gericht: "K 2280 01/2025",
    status: "EINGEREICHT",
    status_changed: "2025-10-23T10:13:02.642491Z",
    eingereicht_am: "2023-01-28T21:17:44.077587Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "481bda9f-222b-fcb4-ad91-9ef265147c9d",
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
            id: "3c285a8f-7419-4233-c593-9dee8d9833ab",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "W 1566 01/2025",
          },
        ],
      },
      {
        id: "5e70f857-c7bb-6045-55a3-e6766e48a06f",
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
            id: "8371a408-ae35-70b4-1814-c63adf68c6c5",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "E 5015 04/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ede-7bbe-a354-c9c1465ab621",
    aktenzeichen_gericht: "C 6467 13/2024",
    status: "ERSTELLT",
    status_changed: "2025-11-10T02:12:29.010986Z",
    eingereicht_am: "2023-01-17T19:28:22.274195Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "a5e14b44-8f7b-311a-5c2d-5cae2d2d4275",
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
            id: "48443aa9-57ed-5ca2-ddcb-58b60ec388b1",
            name: "Tim Becker",
            aktenzeichen: "I 1069 08/2025",
          },
        ],
      },
      {
        id: "b0146be2-6e1c-7743-db2b-e442c7120363",
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
            id: "7c5f96ec-420b-49e8-f04d-c4a5bf928a5c",
            name: "Dr. Benedikt Weiß",
            aktenzeichen: "H 7713 02/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-77af-8786-a283f09c35df",
    aktenzeichen_gericht: "W 3673 08/2024",
    status: "EINGEREICHT",
    status_changed: "2025-08-19T16:50:36.729432Z",
    eingereicht_am: "2023-01-17T06:09:37.079335Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "651d474c-b9bf-9d1f-3d94-d3e536b94bbb",
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
            id: "2795adf3-39f1-30b1-ebf7-a2130926fe03",
            name: "Rechtsanwalt Dr. Andreas Krämer",
            aktenzeichen: "T 2302 12/2025",
          },
        ],
      },
      {
        id: "bfa8e25e-48a0-2270-5459-535f1904a997",
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
            id: "1869b303-33b0-537c-5872-2fe6041fc0f6",
            name: "Rechtsanwalt Leonhard Weiß",
            aktenzeichen: "F 8662 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edc-7c62-b2e8-1e1b1c1ff3c4",
    aktenzeichen_gericht: "N 2604 06/2024",
    status: "EINGEREICHT",
    status_changed: "2025-06-13T21:00:02.539428Z",
    eingereicht_am: "2023-01-11T08:42:34.481981Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "9986001f-ee38-63b8-976f-efa0d9e550ea",
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
            id: "0f070d52-0756-9053-a641-358ba3ede3b5",
            name: "Tim Becker",
            aktenzeichen: "A 1576 12/2025",
          },
        ],
      },
      {
        id: "e34ca8aa-c55c-8696-9ffe-e9be21b36d9e",
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
            id: "55eeca48-83bb-7961-ad6d-a4be8059b6c2",
            name: "Rechtsanwalt Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
            aktenzeichen: "J 6867 03/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7290-7ced-ae4e-9756fb167ff4",
    aktenzeichen_gericht: "I 314 04/2024",
    status: "EINGEREICHT",
    status_changed: "2025-11-25T02:12:11.168724Z",
    eingereicht_am: "2023-01-08T22:38:28.686563Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "44e120d0-41a5-d7ca-db5b-ebad5e07ead2",
        name: "Ben-Luca Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "a29a1691-bd41-3091-b1f7-38f7360ac5b4",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Y 1284 06/2026",
          },
        ],
      },
      {
        id: "ec00cb20-735a-9629-3feb-1b300fab5b05",
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
            id: "1b23791d-e14a-7ffb-ba1b-9f22d82806c6",
            name: "Rechtsanwalt Dr. Dieter Böhm",
            aktenzeichen: "Z 7091 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-797a-8b87-1b56a6544350",
    aktenzeichen_gericht: "N 3535 13/2026",
    status: "ERSTELLT",
    status_changed: "2025-10-21T21:56:35.351474Z",
    eingereicht_am: "2023-01-04T00:52:40.909118Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "6e752456-727b-943f-ed1a-ac92bb6e50ad",
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
            id: "726b6e1f-3f90-437a-1c09-86d45e305489",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "O 4540 11/2025",
          },
        ],
      },
      {
        id: "c248b107-0ffe-c6e4-9cb2-60e16343c0d1",
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
            id: "ce3f5164-7e2d-4864-3a2e-e88d1e7820ab",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "G 3455 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-7428-ad6d-d94c322d1f85",
    aktenzeichen_gericht: "I 6735 01/2025",
    status: "EINGEREICHT",
    status_changed: "2025-06-06T13:49:30.258695Z",
    eingereicht_am: "2022-12-31T22:22:19.861525Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "b52c06ab-bcca-0cab-0b79-e7dd66129ce7",
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
            id: "34dfcebd-7473-9608-945b-9f964794e55c",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "E 3537 13/2025",
          },
          {
            id: "6cad1621-93e7-37da-546c-a79f97291759",
            name: "Rechtsanwalt Johanna Groß",
            aktenzeichen: "P 531 08/2025",
          },
        ],
      },
      {
        id: "e460aaf2-8c4b-d049-0632-12740b94bf76",
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
            id: "59bda793-26ba-2ddd-96ec-de0d946aae5b",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "P 8431 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed1-7882-8c84-5a4acc721a56",
    aktenzeichen_gericht: "Z 6816 02/2024",
    status: "ERSTELLT",
    status_changed: "2025-07-07T03:13:41.676986Z",
    eingereicht_am: "2022-12-29T13:22:36.549135Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "14d38e45-b3bf-1584-1baf-364d189764bd",
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
            id: "1ab7572c-9451-2827-f465-876e899e2a07",
            name: "Tim Becker",
            aktenzeichen: "H 4695 04/2024",
          },
          {
            id: "ac10ecad-8d45-e7eb-38fe-745a543a2db1",
            name: "Dr. Elisa Schönfeld",
            aktenzeichen: "S 1910 11/2026",
          },
        ],
      },
      {
        id: "725d5ad0-f54f-ed57-6115-e8632f93ef9b",
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
            id: "db149131-a417-43e3-218b-a211e882a680",
            name: "Tim Becker",
            aktenzeichen: "C 861 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-71a2-8ccb-e849581707a7",
    aktenzeichen_gericht: "H 5381 08/2025",
    status: "EINGEREICHT",
    status_changed: "2025-06-04T02:34:44.083895Z",
    eingereicht_am: "2022-12-28T10:42:59.322109Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "3cf165cb-80eb-59a6-2b19-41f05efdbae2",
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
            id: "519d4172-5fd3-fa76-11ca-6297e6f37c73",
            name: "Rechtsanwalt Dr. Fabian Weiß",
            aktenzeichen: "N 4236 07/2026",
          },
        ],
      },
      {
        id: "84340b76-f165-fe29-e2ec-2b36a8f6ada2",
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
            id: "ca346a38-6a70-a23c-9a04-e275c4e71c1c",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "L 4787 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edc-789c-91ab-506a414226b1",
    aktenzeichen_gericht: "Q 7656 13/2025",
    status: "EINGEREICHT",
    status_changed: "2025-04-10T20:16:23.174487Z",
    eingereicht_am: "2022-12-17T02:46:22.858772Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "83e012af-743e-e3c9-a38c-383b68f39694",
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
            id: "5b77cc61-92a7-12fd-5958-f49ad0030e8d",
            name: "Rechtsanwalt Helene Küster",
            aktenzeichen: "X 153 11/2026",
          },
          {
            id: "17274a2e-4b91-8436-118b-508016d3258d",
            name: "Tim Becker",
            aktenzeichen: "Z 3656 11/2026",
          },
        ],
      },
      {
        id: "d535a2cd-7d51-d91e-2691-bb859d23122f",
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
            id: "08c01fa2-12a7-d059-0314-e7770f4fff82",
            name: "Tim Becker",
            aktenzeichen: "L 6648 05/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed0-7e97-b44e-5b244fa2bd3a",
    aktenzeichen_gericht: "V 7875 11/2024",
    status: "ERSTELLT",
    status_changed: "2025-03-23T14:45:00.627229Z",
    eingereicht_am: "2022-12-13T20:48:46.986699Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "347d64fe-3328-d42a-da2e-70fed45fe9ac",
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
            id: "cd7d3ffe-c1b7-cccb-5747-73a4176c6258",
            name: "Tim Becker",
            aktenzeichen: "S 5239 06/2026",
          },
        ],
      },
      {
        id: "fae83381-c9aa-0de5-bc26-19a96c235e73",
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
    ],
  },
  {
    id: "019c5736-7837-74bb-9761-aed447de24bf",
    aktenzeichen_gericht: "T 481 11/2024",
    status: "ERSTELLT",
    status_changed: "2025-10-06T19:39:34.185565Z",
    eingereicht_am: "2022-12-01T13:48:15.653454Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "2e7afb91-46de-3495-a29d-f672290f7565",
        name: "Dieter Böhm",
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
        id: "7f2940f5-9dfd-4795-47ba-1e18f36198d9",
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
            id: "9f4b34b3-8c47-664f-2186-8a74faf4df09",
            name: "Dr. Matthias-Lorenz-Friedrich von der Löschau-Krüger-Schönfeld-Weiß",
            aktenzeichen: "V 7749 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-75c6-82d7-bec1a1e620e3",
    aktenzeichen_gericht: "D 4750 04/2026",
    status: "EINGEREICHT",
    status_changed: "2025-03-10T17:05:10.09262Z",
    eingereicht_am: "2022-11-25T22:06:29.884657Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "8e75cc28-d38d-f764-c3de-8b9161673dd2",
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
            id: "987325d3-9d00-94ad-7c9f-18ebdc7d1eaf",
            name: "Rechtsanwalt Matthias Kübler",
            aktenzeichen: "X 5100 13/2026",
          },
        ],
      },
      {
        id: "c41d93eb-5686-59ee-872b-9bb02713cf73",
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
            id: "83a21148-45ff-a549-6bbf-7f9ac4b1fcf7",
            name: "Dr. Daniela Brück",
            aktenzeichen: "G 1350 06/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-7eb6-b9ef-76b8ab6e3e06",
    aktenzeichen_gericht: "R 3285 11/2025",
    status: "EINGEREICHT",
    status_changed: "2025-07-24T01:23:23.212954Z",
    eingereicht_am: "2022-11-25T12:55:35.720122Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "abbfbdae-6f8a-1ea2-cd61-912106641411",
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
            id: "ad98aa3f-e8d3-fb35-340b-db525f91cdd1",
            name: "Dr. Miriam Hölzer",
            aktenzeichen: "M 5487 02/2024",
          },
        ],
      },
      {
        id: "be737f99-1f3b-38a7-7a20-871137331727",
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
            id: "d93849a3-44c1-20c8-29ed-aaa20fc76717",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "K 1690 05/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-784e-8655-b3c25b7607ae",
    aktenzeichen_gericht: "O 6484 02/2024",
    status: "ERSTELLT",
    status_changed: "2025-10-20T18:47:25.300147Z",
    eingereicht_am: "2022-11-23T20:55:04.845791Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "1fd0443d-c794-86f4-62a4-6ab8079f36cb",
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
            id: "33175bf4-efa0-04cc-0cd8-fe5d6f6971f3",
            name: "Rechtsanwalt Dr. Ferdinand-Julius Maximilian von Krämer-Höfer",
            aktenzeichen: "N 748 01/2024",
          },
        ],
      },
      {
        id: "68fc6580-83c4-d78d-e597-bffbb9be9293",
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
            id: "d0e4f144-cfd9-9c40-5b93-eb55c62249c6",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "T 1014 06/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7b5c-8c6f-5334dd8ae1cc",
    aktenzeichen_gericht: "G 8411 03/2025",
    status: "ERSTELLT",
    status_changed: "2026-01-30T16:05:27.158295Z",
    eingereicht_am: "2022-11-22T03:46:50.704503Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "85e6d63c-fbeb-c03f-4c6a-f2d7b5bc461f",
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
            id: "0226a658-76d4-cd23-1fd5-789d33974805",
            name: "Rechtsanwalt Dr. Florian Kranz",
            aktenzeichen: "R 5319 01/2024",
          },
          {
            id: "51a18cd8-2069-ed34-0683-1dea8313ce8b",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "P 3315 09/2024",
          },
        ],
      },
      {
        id: "da691a9d-442d-8e7a-9bb7-1b335f77209b",
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
            id: "cdf4ab9b-ed78-ec51-bb33-96f11de7a693",
            name: "Rechtsanwalt Fabian Weißmann",
            aktenzeichen: "R 7997 03/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7e65-bc1d-fa7655fc4009",
    aktenzeichen_gericht: "S 7558 08/2025",
    status: "ERSTELLT",
    status_changed: "2025-07-28T00:49:12.813891Z",
    eingereicht_am: "2022-10-26T06:52:48.753754Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "936303c2-4184-d2d4-5119-18189d7f8479",
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
            id: "c55ce5e3-fe4a-c963-e74a-34d7705ff2ca",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "H 9657 12/2026",
          },
        ],
      },
      {
        id: "d1eca56c-e42c-1a0e-6517-f04e4962257b",
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
            id: "81f91b91-c84f-ed62-b4f5-c5a5b2b7668f",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "N 6262 07/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecd-7b4d-9b72-c6202a346306",
    aktenzeichen_gericht: "Q 1298 13/2025",
    status: "ERSTELLT",
    status_changed: "2025-08-20T22:50:54.55168Z",
    eingereicht_am: "2022-10-23T20:44:53.890417Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "5969dba7-de0b-28d3-96b3-870dbe711969",
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
            id: "a6439ecd-d2b3-1a55-4398-4e79225d75eb",
            name: "Tim Becker",
            aktenzeichen: "O 1865 05/2026",
          },
        ],
      },
      {
        id: "66a70fe7-45e4-f3a8-e184-00f96010d84a",
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
            id: "a4d95f46-a7c9-58e7-5830-3511f448ce06",
            name: "Rechtsanwalt Katharina-Elisabeth von der Hohenau-Müller",
            aktenzeichen: "L 1026 05/2025",
          },
          {
            id: "8aa57ab2-106b-0e31-c182-db40c0d63a8f",
            name: "Tim Becker",
            aktenzeichen: "D 4509 06/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-7577-b20d-82d9e1d18738",
    aktenzeichen_gericht: "S 178 13/2026",
    status: "EINGEREICHT",
    status_changed: "2025-11-28T00:18:05.707564Z",
    eingereicht_am: "2022-10-16T12:35:42.343659Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "8940267e-1eac-cf7a-46bb-825bd76ba676",
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
            id: "83e63491-850d-7612-191c-f16e324e15b5",
            name: "Rechtsanwalt Sebastian Löhr",
            aktenzeichen: "G 4700 10/2026",
          },
        ],
      },
      {
        id: "faea14e9-62fa-15d4-9472-61e46598eef1",
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
            id: "ac5b2a4c-8bc0-41b5-4be8-7defb9e9b0cb",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "G 8923 07/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-7f45-9145-7ca0d1c6d3bd",
    aktenzeichen_gericht: "H 4860 07/2024",
    status: "ERSTELLT",
    status_changed: "2025-11-17T05:30:03.952575Z",
    eingereicht_am: "2022-09-17T17:23:47.625247Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "cdef1214-62cf-e57b-d3cc-bb2c28231750",
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
            id: "1550b005-f12b-1243-59b8-8a2cab1065df",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "T 8570 05/2026",
          },
        ],
      },
      {
        id: "e208d2ba-aaf3-340d-0601-06dd29e00709",
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
            id: "231f8f40-f456-083a-c165-59b545de4597",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "R 7149 06/2026",
          },
          {
            id: "f361fc6d-f1ee-326d-af90-3c53a09460aa",
            name: "Rechtsanwalt Dr. Tobias Hölzer",
            aktenzeichen: "G 2930 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed1-7565-b24c-94d89d68a38c",
    aktenzeichen_gericht: "I 6495 11/2026",
    status: "ERSTELLT",
    status_changed: "2025-04-30T02:58:02.687033Z",
    eingereicht_am: "2022-09-14T05:45:45.641155Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "c49bedfd-3592-c4ab-9a35-f1036520b179",
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
            id: "129409e3-e623-1186-bdee-9c6ea68a23df",
            name: "Tim Becker",
            aktenzeichen: "H 2023 02/2026",
          },
          {
            id: "9108cb5b-de58-7bde-cd31-a79ae235c17f",
            name: "Rechtsanwalt Friedrich-Wilhelm Günther von Schönfeld-Krüger",
            aktenzeichen: "V 8771 13/2025",
          },
        ],
      },
      {
        id: "efa8a902-297c-b11e-4ce0-9217ded2614f",
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
            id: "7404e527-d9d4-c056-3158-0ece6b45def5",
            name: "Tim Becker",
            aktenzeichen: "Z 5323 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-7311-a827-9ed1faad6d43",
    aktenzeichen_gericht: "L 7201 03/2026",
    status: "ERSTELLT",
    status_changed: "2025-12-23T11:36:04.674996Z",
    eingereicht_am: "2022-09-12T20:40:50.855549Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "9a8efbb5-53e4-0064-90dd-10772f641618",
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
            id: "41a96d0e-fcfb-123f-9915-05d24ea2f787",
            name: "Rechtsanwalt Dr. Tobias-Maurer",
            aktenzeichen: "T 4442 09/2026",
          },
        ],
      },
      {
        id: "f427eeca-ee02-b4d8-ab4f-0489913836d6",
        name: "Paulina-Maria-Isabell von und zu Hohenstein-Weiß-Krüger-Schäfer",
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
    id: "019c5741-728e-72d2-a6e8-e80a3ef68c12",
    aktenzeichen_gericht: "T 6731 03/2025",
    status: "ERSTELLT",
    status_changed: "2025-05-15T13:30:32.208974Z",
    eingereicht_am: "2022-09-10T20:14:45.838728Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "3fb3c2c6-3df8-4389-3b0c-54da85e96ff7",
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
            id: "8a20e899-0bb8-18b2-5d30-7f36e787e828",
            name: "Rechtsanwalt Dr. Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
            aktenzeichen: "G 3341 01/2024",
          },
        ],
      },
      {
        id: "a049ca43-7667-f5de-67f1-d10e4b5ffd59",
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
            id: "e39ef541-93a2-43f8-331c-5d39ab31b01f",
            name: "Rechtsanwalt Dr. Alina-Mara Kühn",
            aktenzeichen: "S 161 01/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728d-7d26-9328-b998b48faf14",
    aktenzeichen_gericht: "O 8489 05/2026",
    status: "EINGEREICHT",
    status_changed: "2025-09-08T02:25:24.724022Z",
    eingereicht_am: "2022-09-10T11:48:44.469284Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "1bbacc05-394a-dcea-e658-156eadd4b14f",
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
            id: "386ee8b5-ed62-7d94-52e4-84de408f8f88",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "R 6217 11/2026",
          },
        ],
      },
      {
        id: "8c1bacc1-cb25-1d15-9eb9-bb0ad6bf4ed7",
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
            id: "0a8d42f8-0455-936f-91c9-6c7f804ba183",
            name: "Rechtsanwalt Dr. Nina Schäfer",
            aktenzeichen: "F 4605 03/2025",
          },
          {
            id: "09c6d367-7aa1-a3e5-9b6b-8471a27cf57c",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "A 1654 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728e-7aa0-9807-62343c500727",
    aktenzeichen_gericht: "S 6468 03/2026",
    status: "EINGEREICHT",
    status_changed: "2025-07-20T05:34:08.120129Z",
    eingereicht_am: "2022-09-07T10:59:52.099109Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "3f5ecfc7-fbbf-dd96-da53-943d9fce4a26",
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
            id: "0cbe2a34-dfaa-53cc-b657-e3330e04ef1c",
            name: "Rechtsanwalt Dr. Johanna Weiß",
            aktenzeichen: "C 9150 10/2025",
          },
        ],
      },
      {
        id: "6dae35bf-9860-d0b8-7df9-e6d607ecc0f6",
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
            id: "de44f1e4-029e-c469-16da-ee7639d88bc7",
            name: "Dr. Patrick Löhr",
            aktenzeichen: "P 6761 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed7-7786-aa28-b8108a789bec",
    aktenzeichen_gericht: "J 2316 12/2025",
    status: "ERSTELLT",
    status_changed: "2026-01-19T23:45:30.902666Z",
    eingereicht_am: "2022-09-02T23:17:44.091309Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "1653188a-5ed7-2303-55c4-c8ac5f4e8551",
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
            id: "65251011-3ec8-909b-83b3-96b370d14bdb",
            name: "Tim Becker",
            aktenzeichen: "U 6096 12/2025",
          },
        ],
      },
      {
        id: "8f1d9569-d99b-516f-ba5d-3775c3c288c4",
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
            id: "ba6cc2e6-b2ed-cf47-e192-b57f5e29f411",
            name: "Rechtsanwalt Dr. Elisabeth Köhn",
            aktenzeichen: "O 8551 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-78a3-8775-7d6bd115391c",
    aktenzeichen_gericht: "Y 7028 04/2025",
    status: "ERSTELLT",
    status_changed: "2025-12-21T07:53:49.30538Z",
    eingereicht_am: "2022-08-29T04:52:00.718384Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "8e98ae89-33c4-f96d-bd68-c6ea936fef7a",
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
            id: "a630ef74-38b4-ba9f-cfb3-25ed89909602",
            name: "Rechtsanwalt Paulina-Luise Katharina von Hölzer-Schönfeld",
            aktenzeichen: "B 7099 11/2024",
          },
        ],
      },
      {
        id: "9b357150-dc97-6d40-9cdd-10c9534b5e61",
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
    id: "019c5736-783a-7b8c-9ff5-cf2ebd25bf2e",
    aktenzeichen_gericht: "E 9170 06/2025",
    status: "EINGEREICHT",
    status_changed: "2025-03-15T13:01:23.785649Z",
    eingereicht_am: "2022-08-20T03:47:13.120173Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "2d8a9b03-7d19-cf48-78d5-fcf989101857",
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
            id: "75dd8d5e-cf3f-cb97-81cb-c0d70f3a01d7",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "O 9130 12/2024",
          },
        ],
      },
      {
        id: "cb5bd234-3a93-4b74-ea17-c3bb47d24c8a",
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
            id: "be845d5f-0442-3f15-2a40-39930769ccf6",
            name: "Rechtsanwalt Dr. Friedrich-Wilhelm-Lukas-Maximilian von Großmann-Schäfer-Kühn-Weiß",
            aktenzeichen: "A 8663 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-750c-a917-d1ac8b94f470",
    aktenzeichen_gericht: "S 7962 12/2026",
    status: "EINGEREICHT",
    status_changed: "2025-06-24T08:45:38.688283Z",
    eingereicht_am: "2022-08-17T00:01:27.046948Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "74df1df0-5478-6b88-6aaf-288754b1ef26",
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
            id: "b052cdb3-b5b9-1531-6bfc-4999c8545d25",
            name: "Rechtsanwalt Ludwig-Konstantin-Maximilian von Schönwald-Küster-Schäfer-Weißmann",
            aktenzeichen: "D 7541 09/2026",
          },
        ],
      },
      {
        id: "af616b47-b72d-8143-98ee-265522198be6",
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
            id: "5046503c-f6fb-cf20-a2b8-e4c4c19efc07",
            name: "Rechtsanwalt Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
            aktenzeichen: "H 5372 01/2024",
          },
          {
            id: "dffd1750-2f5e-d040-13e8-87998c37da90",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "T 7172 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-7a50-b27f-010c2ad20f6d",
    aktenzeichen_gericht: "S 4166 01/2025",
    status: "EINGEREICHT",
    status_changed: "2025-08-11T15:04:52.665841Z",
    eingereicht_am: "2022-08-15T22:44:07.253486Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "45418b6f-b4fb-6a4f-14bd-a11dfa143bc9",
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
            id: "73a0cd59-6951-7c8e-70a3-25f6c5b734f7",
            name: "Rechtsanwalt Fabian Weißmann",
            aktenzeichen: "G 9853 07/2025",
          },
        ],
      },
      {
        id: "6ae09fde-96d6-e42a-32ef-e01576f1ee55",
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
            id: "be193201-f1cc-853d-fb78-25a80db026e4",
            name: "Dr. Franz-Josef-Wilhelm-Ludwig von Schönfeld-Groß-Küster-Weißmann",
            aktenzeichen: "P 7732 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecf-7476-9bfe-ff4496e2f2b7",
    aktenzeichen_gericht: "Y 4351 11/2025",
    status: "ERSTELLT",
    status_changed: "2026-01-01T01:24:57.956352Z",
    eingereicht_am: "2022-08-09T17:24:24.491854Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "27b86e43-8ac4-56fa-165d-c468f9724623",
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
            id: "0cf36fe5-7e8a-c18e-891a-62011de4d683",
            name: "Dr. Florian Schön",
            aktenzeichen: "W 3525 13/2024",
          },
        ],
      },
      {
        id: "2c0b2262-6748-606b-590a-19c6a463ccfd",
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
            id: "4900dc98-b450-ca70-15bf-c87cd9a81428",
            name: "Rechtsanwalt Matthias Lösch",
            aktenzeichen: "Q 2690 02/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7ef2-8a08-b4a2a375291f",
    aktenzeichen_gericht: "X 2571 02/2025",
    status: "EINGEREICHT",
    status_changed: "2025-12-02T02:10:20.515038Z",
    eingereicht_am: "2022-08-07T13:18:49.054604Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "0982237b-a1a9-3c30-c4fa-b6718fb3b9ae",
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
            id: "7c27d08f-4c34-812c-6113-7456f51c9f2d",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "S 1802 01/2026",
          },
        ],
      },
      {
        id: "3dbff351-98d5-248b-ce97-d9ed19d2e3c9",
        name: "Friedrich-Johannes-Karl von Bärenfels-Schön-Küster-Weißmann",
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
    id: "019c5741-728f-74c0-b6fa-e989d16255b8",
    aktenzeichen_gericht: "W 7451 05/2024",
    status: "EINGEREICHT",
    status_changed: "2025-09-04T16:01:01.359488Z",
    eingereicht_am: "2022-07-30T19:43:00.664287Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "3a5327e7-7481-5b75-e51f-82388da4341f",
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
            id: "3a0a7e29-9189-802e-ef05-93fe74e8beb4",
            name: "Rechtsanwalt Dr. Johanna-Elisabeth-Maria von Krüger-Lösch",
            aktenzeichen: "H 428 03/2024",
          },
        ],
      },
      {
        id: "9d100681-049e-f931-cb0d-0ea3e96f1830",
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
            id: "c28f118c-eeee-0c84-862e-fbebe993e736",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "M 8673 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-7440-8118-65388c9406db",
    aktenzeichen_gericht: "F 4416 10/2025",
    status: "ERSTELLT",
    status_changed: "2025-08-21T17:30:32.589681Z",
    eingereicht_am: "2022-07-29T05:09:06.95479Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "c3effafe-95bd-8cb4-9a19-f35c6ba3f7c9",
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
      {
        id: "c4c78bbd-e67f-b237-6732-f12d7f6dd426",
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
            id: "b77e51bb-4943-42fd-83d9-3b018674c23e",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "B 4273 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed7-7dec-a749-2f9cbfbd5aa6",
    aktenzeichen_gericht: "E 9852 13/2024",
    status: "ERSTELLT",
    status_changed: "2026-01-12T06:56:37.845969Z",
    eingereicht_am: "2022-07-28T02:17:38.785399Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "4df0f348-08da-2e10-69b1-aa3e3e366216",
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
            id: "f781d909-6eee-b0af-f0cc-4fbb613715d5",
            name: "Tim Becker",
            aktenzeichen: "S 3410 02/2025",
          },
        ],
      },
      {
        id: "55d5d440-b9bd-a424-8315-630ac16fc0a5",
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
            id: "0de3cac8-c87d-2bad-78fa-854044dcaa5f",
            name: "Rechtsanwalt Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
            aktenzeichen: "C 4576 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed6-7952-9db8-9ed7c69246b6",
    aktenzeichen_gericht: "L 2467 06/2024",
    status: "ERSTELLT",
    status_changed: "2025-07-04T21:45:26.276811Z",
    eingereicht_am: "2022-07-23T03:31:40.314065Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "e560e2bc-11d6-1082-ebd5-c1b6ae62e628",
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
            id: "9c0526ce-4a1d-91a0-e1fa-d4c4999fa3d2",
            name: "Dr. Helene-Marie Augusta von Schwanenburg-Weiß",
            aktenzeichen: "Q 7871 03/2026",
          },
        ],
      },
      {
        id: "ec580395-214d-f533-149c-1559b012a839",
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
            id: "e477ee6e-b8bd-0371-3a8f-878f2f647b54",
            name: "Tim Becker",
            aktenzeichen: "R 5514 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-7120-9000-13eae71b709d",
    aktenzeichen_gericht: "J 8614 03/2025",
    status: "EINGEREICHT",
    status_changed: "2026-02-03T09:47:19.509521Z",
    eingereicht_am: "2022-07-09T10:42:51.718248Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "22db5ccf-f775-c663-fff4-82e308bb5c7b",
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
            id: "a1fa91b2-d461-040b-4310-03fbf840656c",
            name: "Rechtsanwalt Dieter Mönch",
            aktenzeichen: "L 2272 01/2026",
          },
        ],
      },
      {
        id: "78d8cae1-9af2-de84-22ae-a6d068ea7a3e",
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
            id: "7c05ec74-62a8-825f-ffba-8a886fa72292",
            name: "Rechtsanwalt Matthias Weiß",
            aktenzeichen: "K 6972 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed7-77ca-a7fc-2ce110ecb1d8",
    aktenzeichen_gericht: "S 7132 05/2025",
    status: "ERSTELLT",
    status_changed: "2025-05-05T22:52:52.026456Z",
    eingereicht_am: "2022-07-09T07:00:55.926909Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "7b74efb0-5be1-2003-4ade-f8277f9d278d",
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
        id: "e6e2eb26-5476-5538-95a0-600fbba238fc",
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
            id: "4d3d3267-9b8b-efb8-9e20-f637ea5d1440",
            name: "Rechtsanwalt Leonhard Kühn",
            aktenzeichen: "E 4744 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728b-7104-a96f-609c788109b2",
    aktenzeichen_gericht: "V 4147 01/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-15T10:32:08.205463Z",
    eingereicht_am: "2022-07-06T05:27:44.366316Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "1a41bb45-1ed4-c541-2f44-c7785dd572b2",
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
            id: "ccd2c711-f89b-621a-02b7-92bdef292386",
            name: "Rechtsanwalt Alexander-Theodor Benjamin von Küster-Braun",
            aktenzeichen: "L 5690 08/2026",
          },
        ],
      },
      {
        id: "3ec4e885-5ef4-719a-aaaa-3c365e5d703a",
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
    id: "019c5741-728d-76ba-b024-d50c9fb02243",
    aktenzeichen_gericht: "Z 5388 09/2025",
    status: "ERSTELLT",
    status_changed: "2025-12-24T21:38:33.249664Z",
    eingereicht_am: "2022-07-06T00:53:56.380935Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "1923a142-1fc5-88f1-fa59-0e1d8c07237c",
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
            id: "420418cc-12d8-7ce1-2794-6941c121448d",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "M 4343 06/2024",
          },
        ],
      },
      {
        id: "c68c155e-3109-55d6-c5ca-46f751641a6f",
        name: "Florian Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "6a6764b1-0d8c-1b80-3a2e-471b20a0520b",
            name: "Rechtsanwalt Dr. Sabine-Christina von und zu Großwald-Kühn",
            aktenzeichen: "Y 3802 05/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edc-7377-bcf1-4522c3edc8ae",
    aktenzeichen_gericht: "T 7063 09/2025",
    status: "ERSTELLT",
    status_changed: "2026-01-08T14:11:00.753459Z",
    eingereicht_am: "2022-06-20T15:32:22.456682Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "44c68d32-714d-65dc-d7c1-3dcbf232f121",
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
        id: "c4c3b9ee-8340-fa07-d5ab-44f1088821a6",
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
            id: "fc82fed4-44d8-dc06-38c4-312513c87adf",
            name: "Tim Becker",
            aktenzeichen: "P 6656 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-735f-8c9e-2d2a33d35cad",
    aktenzeichen_gericht: "K 7072 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-02-20T04:00:24.637066Z",
    eingereicht_am: "2022-05-23T01:43:35.857793Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "160b2ce3-9b6c-7ccb-94df-dcfb099c04ae",
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
            id: "a5ee87da-4612-2edd-f75b-42214ba79e7e",
            name: "Dr. Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
            aktenzeichen: "Q 8497 02/2025",
          },
        ],
      },
      {
        id: "b598c422-3742-fcaf-29e7-2046e9896a3e",
        name: "Markus Kühn",
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
    id: "019c5741-7289-7480-800f-bc3e76a9ebb4",
    aktenzeichen_gericht: "Y 2414 06/2026",
    status: "EINGEREICHT",
    status_changed: "2025-04-15T02:21:13.214585Z",
    eingereicht_am: "2022-05-22T16:40:41.190475Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "8ae69f72-23b2-b6c7-251b-7d1be53e5f1b",
        name: "Karl-Ludwig-Ferdinand-Maximilian von Schönberg-Kühn-Weißmann",
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
        id: "e3249112-2eeb-6225-91c6-31c331d128ad",
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
            id: "3515eaa8-0e41-3883-de2c-4daf37111720",
            name: "Rechtsanwalt Dr. Wolfgang Kühn",
            aktenzeichen: "V 8673 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-787d-bc1b-2c7d44a515c8",
    aktenzeichen_gericht: "N 6572 03/2025",
    status: "EINGEREICHT",
    status_changed: "2025-07-02T00:38:01.689411Z",
    eingereicht_am: "2022-05-19T11:54:48.947847Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "2feeff6a-3ed7-c7d1-4c3e-bed31be48f74",
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
            id: "c2147c3b-75e7-95b2-5e7a-b3f4cfafca81",
            name: "Dr. Anna-Maria-Luise von Hohenstein-Schwarzburg",
            aktenzeichen: "H 7739 10/2025",
          },
        ],
      },
      {
        id: "818b37c6-0f35-9471-552e-8a8736436ff3",
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
            id: "05d983af-020b-7a50-fae4-4fb89477b093",
            name: "Tim Becker",
            aktenzeichen: "B 9307 03/2024",
          },
          {
            id: "65ce92d4-9383-daeb-f839-8b2c4d2fe2ac",
            name: "Dr. Katharina-Marie-Elisabeth von Hohenstein-Bärenwald-Krüger-Schäfer",
            aktenzeichen: "L 4022 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed0-78d0-8f9a-f2ce79811505",
    aktenzeichen_gericht: "D 283 08/2025",
    status: "ERSTELLT",
    status_changed: "2025-07-05T21:19:26.588671Z",
    eingereicht_am: "2022-05-16T23:03:36.244243Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "2295c338-13b7-327d-e770-a33dc8e4ef22",
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
            id: "46063a23-a176-9402-4469-7963bc73f8fd",
            name: "Tim Becker",
            aktenzeichen: "T 1381 01/2025",
          },
        ],
      },
      {
        id: "30c664e8-dc27-b165-2ea9-053b50a8c603",
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
            id: "1ce66eb2-bcb7-c424-8843-b0601cce01f7",
            name: "Tim Becker",
            aktenzeichen: "S 5008 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-7153-89c3-a5b6bf2d046e",
    aktenzeichen_gericht: "R 7744 03/2024",
    status: "ERSTELLT",
    status_changed: "2025-05-13T13:25:05.790459Z",
    eingereicht_am: "2022-05-15T20:56:05.532512Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "72d040f5-b233-c1df-9cc8-3634574a9479",
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
            id: "6acd72d1-dbe1-058a-c3b2-68db78a0a103",
            name: "Tim Becker",
            aktenzeichen: "N 2448 10/2025",
          },
          {
            id: "579d9e4c-c61f-9d26-159c-d4ddd3907439",
            name: "Rechtsanwalt Klaus Schäfer",
            aktenzeichen: "I 3937 01/2024",
          },
        ],
      },
      {
        id: "80b503fa-b7b5-0042-3600-8df739ffc9c4",
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
            id: "c9946936-62b2-4371-2380-11c90cbd48db",
            name: "Tim Becker",
            aktenzeichen: "E 6307 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728b-7dd7-bcf9-2b634ad722b9",
    aktenzeichen_gericht: "Q 5561 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-10-26T17:55:29.15927Z",
    eingereicht_am: "2022-05-06T21:13:57.246549Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "2ee2fc92-f56d-737e-9767-1ff900081790",
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
            id: "fad667da-7681-d8a6-f270-d1a04d1013bf",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "W 5280 01/2025",
          },
        ],
      },
      {
        id: "d6de533d-7fa2-3e14-4ab8-b91ac5b72858",
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
            id: "357acfe6-79f5-dd92-4f51-b82fa7f310ff",
            name: "Dr. Daniela Brück",
            aktenzeichen: "C 5035 03/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-7c2a-8ad4-993ca7792310",
    aktenzeichen_gericht: "U 8210 06/2026",
    status: "ERSTELLT",
    status_changed: "2025-04-08T00:18:31.267656Z",
    eingereicht_am: "2022-04-25T12:28:52.49636Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "6d89e3f2-fb92-8b49-16d5-19c1cffd6667",
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
            id: "f7f02f85-409d-4a90-844b-2d06c12aa585",
            name: "Rechtsanwalt Dr. Melanie Schäfer",
            aktenzeichen: "X 9053 04/2026",
          },
        ],
      },
      {
        id: "b70b2b8e-b701-570e-e757-263ec018a08a",
        name: "Andreas Krämer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "afdb6474-ac47-40a9-9beb-6160ea18f603",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "X 4508 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed0-7172-9c34-cc5086214875",
    aktenzeichen_gericht: "F 5234 04/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-17T13:52:59.081171Z",
    eingereicht_am: "2022-04-24T09:10:37.889564Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "4bcb61c3-dbf0-09d1-0a05-f86bb821dfed",
        name: "Ryanair",
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
        id: "8018763e-9324-4fc7-f9c6-9ef681759c28",
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
            id: "e64c9e84-5ef2-0937-1a3b-b666a23faa77",
            name: "Tim Becker",
            aktenzeichen: "P 3929 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783a-722e-b90b-d9656460f56e",
    aktenzeichen_gericht: "L 8200 09/2024",
    status: "EINGEREICHT",
    status_changed: "2025-09-19T12:22:04.438431Z",
    eingereicht_am: "2022-04-20T12:13:55.933745Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "13b2c488-155a-ea0d-c99a-da38e70dbbd3",
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
            id: "9bd225bf-9830-ab2c-83b7-ee7f8f1c38bf",
            name: "Rechtsanwalt Elisa-Luise Roth",
            aktenzeichen: "N 9689 01/2026",
          },
        ],
      },
      {
        id: "7ab3bcbc-4ae1-5e6e-f4b2-e4086916f7ab",
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
            id: "ba5d693d-9ad7-0599-8f53-ce9fa642ad62",
            name: "Dr. Dominik Weiß",
            aktenzeichen: "Z 3612 05/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edd-77e4-9784-a6bebe767240",
    aktenzeichen_gericht: "F 130 12/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-09T16:45:14.965294Z",
    eingereicht_am: "2022-04-15T22:52:20.790936Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "78ca4e9a-1803-fde1-fe99-345869cb283b",
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
            id: "b63b2a0d-74bf-43ac-1c1c-a6e91f158b4a",
            name: "Rechtsanwalt Dr. Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
            aktenzeichen: "F 6935 08/2026",
          },
        ],
      },
      {
        id: "f12b89b2-1b7e-471a-e3c5-a5d4aff0791c",
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
            id: "32741c1a-a38b-28da-b1ea-fc6297fe449c",
            name: "Dr. Lena-Maria Böhm",
            aktenzeichen: "N 6268 11/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-768c-b248-0651ac9a4626",
    aktenzeichen_gericht: "R 2949 06/2025",
    status: "ERSTELLT",
    status_changed: "2025-09-09T11:38:59.20429Z",
    eingereicht_am: "2022-04-15T19:37:30.705949Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "000f2203-6342-0e19-f4bf-043d342bab00",
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
            id: "63195cb5-0960-982a-a100-15f184be5735",
            name: "Dr. Marie-Louise Ott",
            aktenzeichen: "U 1491 10/2025",
          },
        ],
      },
      {
        id: "e0d0af47-388c-70cb-7183-55db13a01ec2",
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
            id: "ef5607f8-795d-2596-1758-ec2165e69e61",
            name: "Dr. Anna-Lena-Marie von Schönbrunn-Kühn",
            aktenzeichen: "R 8032 10/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783a-7bce-8f9c-da33125890f2",
    aktenzeichen_gericht: "S 9619 07/2026",
    status: "EINGEREICHT",
    status_changed: "2026-01-17T09:51:23.715676Z",
    eingereicht_am: "2022-04-12T15:10:44.232188Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "52027ab9-60f4-9915-df09-e3cf280cdef4",
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
            id: "4c9d789b-4864-a350-29cb-088c7736fd2e",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "P 9340 04/2024",
          },
        ],
      },
      {
        id: "92c4ff9b-8dfd-c284-6610-6c29a22847ed",
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
            id: "21476b5a-accc-c9ea-a6e3-c4980ab3e529",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "C 5906 07/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-72a5-bcb7-56fc49f63f4d",
    aktenzeichen_gericht: "Y 8602 11/2024",
    status: "EINGEREICHT",
    status_changed: "2025-07-16T14:53:17.924685Z",
    eingereicht_am: "2022-04-12T14:50:14.782075Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "30472a5f-2b73-b963-8531-1df6fa716534",
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
            id: "0b6a96fc-dd39-d938-e539-c949cb70c2c2",
            name: "Dr. Johanna-Elise-Margarethe von Hohenau-Krüger-Weiß-Schäfer",
            aktenzeichen: "A 9902 02/2025",
          },
          {
            id: "d4c62940-fe34-c31a-cbbb-8413727befe5",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "C 2787 13/2026",
          },
        ],
      },
      {
        id: "895ad021-dfc5-6b3a-77bc-c81d5994ce28",
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
            id: "fb90903a-223d-ac8f-0b7d-9a8e1c897141",
            name: "Rechtsanwalt Dr. Sabine Großmann",
            aktenzeichen: "A 8716 07/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2e70-74f7-bc08-a6bd4c65ff71",
    aktenzeichen_gericht: "R 1566 02/2024",
    status: "ERSTELLT",
    status_changed: "2025-04-03T21:34:28.908618Z",
    eingereicht_am: "2022-04-10T07:47:02.883751Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "0e0fc488-fbcf-155b-fc06-734607ff75ac",
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
            id: "9c06e7c7-0ac1-c865-c26f-9a41f5db2fba",
            name: "Rechtsanwalt Matthias Weiß",
            aktenzeichen: "E 5495 12/2024",
          },
          {
            id: "d14192fa-dad1-b69b-f9fe-28152c6f0a69",
            name: "Tim Becker",
            aktenzeichen: "E 8393 08/2026",
          },
        ],
      },
      {
        id: "e7696ff1-d988-fc88-f195-ce801a2ae9c7",
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
            id: "83f9668f-57ab-1cf3-0d94-fc56b77e1d24",
            name: "Rechtsanwalt Johanna Großmann",
            aktenzeichen: "K 5208 11/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed0-7df4-af7d-d742cce192c6",
    aktenzeichen_gericht: "T 435 01/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-16T08:29:28.526382Z",
    eingereicht_am: "2022-04-10T07:30:15.416938Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "2e09362b-e727-23b7-850f-2bad47752f6a",
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
            id: "7ff939cd-a5b0-e258-c4f3-948a270446aa",
            name: "Tim Becker",
            aktenzeichen: "E 5962 12/2026",
          },
        ],
      },
      {
        id: "823a6723-b501-9a66-3808-d2273ef73609",
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
            id: "6eee0330-6efa-91dd-411b-c700bb4dc4a2",
            name: "Rechtsanwalt Paulina-Maria-Isabell von und zu Hohenstein-Weiß-Krüger-Schäfer",
            aktenzeichen: "T 9533 11/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed7-77a1-913e-ecb80af8ebb7",
    aktenzeichen_gericht: "D 3850 04/2026",
    status: "ERSTELLT",
    status_changed: "2025-07-30T02:20:39.880419Z",
    eingereicht_am: "2022-04-08T11:13:10.161843Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "8a2f64b5-cf1f-a421-de01-a32da8f2d3f3",
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
            id: "75d8de31-aed6-b155-02b7-2e74dde9d4cf",
            name: "Dr. Marie-Louise Ott",
            aktenzeichen: "M 5064 07/2026",
          },
          {
            id: "22935b78-4e06-5a19-8525-74d9334be64d",
            name: "Tim Becker",
            aktenzeichen: "E 6931 03/2024",
          },
        ],
      },
      {
        id: "a84da1a6-7228-9411-0c0c-9964c9fdcbfc",
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
            id: "19b6b0aa-f924-d583-7507-2a7ffb497821",
            name: "Tim Becker",
            aktenzeichen: "B 1300 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecc-7e3c-b334-574b788de715",
    aktenzeichen_gericht: "V 5280 08/2026",
    status: "EINGEREICHT",
    status_changed: "2025-11-23T15:28:13.078954Z",
    eingereicht_am: "2022-03-30T15:14:35.37186Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "28dbae8f-c465-6f7a-7fd7-99ff28506a05",
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
            id: "1fdcbf50-a047-8a3d-4de9-0b11c3366aec",
            name: "Rechtsanwalt Karolin Weiß",
            aktenzeichen: "I 6618 02/2025",
          },
        ],
      },
      {
        id: "51ad4b1f-a0cd-1196-6fc5-bddc6064f3ed",
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
            id: "a665a420-0736-3bbb-47f3-29c369cae28f",
            name: "Tim Becker",
            aktenzeichen: "J 502 12/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783a-79e4-9b0c-e533df431a47",
    aktenzeichen_gericht: "Q 525 07/2026",
    status: "ERSTELLT",
    status_changed: "2026-01-28T04:58:58.129414Z",
    eingereicht_am: "2022-03-30T01:34:55.858351Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "19b83d3a-8b1e-dba2-20e0-cbf3feceea23",
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
            id: "9ceb8914-39fe-9399-6818-e4467ae862d3",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Y 5267 03/2025",
          },
        ],
      },
      {
        id: "2ea7c851-f2d4-e979-efc2-d0468427dffb",
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
            id: "87cdbc8b-a8c8-8d2e-cd3d-13e37cdee55f",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Y 7596 09/2025",
          },
          {
            id: "1fb63842-57c8-cff2-ef32-ccd6b7cc589d",
            name: "Rechtsanwalt Elisa-Sophie-Luise-Gräfin von Löwenhügel-Küster-Schönfeld-Weiß",
            aktenzeichen: "I 7216 05/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783a-7596-adb7-2460e23ba394",
    aktenzeichen_gericht: "M 3788 12/2024",
    status: "EINGEREICHT",
    status_changed: "2025-04-26T20:55:30.481979Z",
    eingereicht_am: "2022-03-26T21:20:45.354878Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "08eb6a0b-b47d-456f-0932-129da03f0173",
        name: "Ryanair",
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
        id: "fa5c76fb-a46b-38b7-c28d-9892f963b24d",
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
            id: "79b2cbe6-8006-fc29-5519-92c412123455",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "J 6362 05/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edc-7b4c-8d2a-6eabef443c7c",
    aktenzeichen_gericht: "B 1832 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-09-29T23:16:39.18886Z",
    eingereicht_am: "2022-03-17T07:07:21.121729Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "7fc07cd1-d355-0c22-b34e-8b4b31c2b26b",
        name: "Julia-Maria-Luise von Schönfeld-Weißmann-Küster-Schäfer-Kranz",
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
        id: "dcf9243c-1250-4e40-5fe7-4028d78d584d",
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
            id: "a8826f0b-19af-22e9-cb80-1cb242c3a344",
            name: "Dr. Leonhard Böhm",
            aktenzeichen: "E 3912 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728c-727c-b04d-dc23dc4c644b",
    aktenzeichen_gericht: "D 4137 12/2025",
    status: "ERSTELLT",
    status_changed: "2025-05-30T12:13:55.189071Z",
    eingereicht_am: "2022-03-13T16:00:35.009572Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "1c9e03a6-6f1e-1232-b3a2-104b2830aeec",
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
            id: "62e7dd27-095c-f796-02f6-7588d66804a2",
            name: "Rechtsanwalt Dr. Markus Kühn",
            aktenzeichen: "G 2399 05/2026",
          },
        ],
      },
      {
        id: "dbd3787b-b097-ab7b-445a-88e6b3160c21",
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
    ],
  },
  {
    id: "019c5741-728d-7083-aa89-f309022c818c",
    aktenzeichen_gericht: "T 2679 13/2026",
    status: "ERSTELLT",
    status_changed: "2025-09-11T13:54:58.353866Z",
    eingereicht_am: "2022-03-08T19:14:29.449462Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "78c7b9a6-9695-aad4-4014-913568250d53",
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
            id: "6e77f9b3-6cc1-dfbc-3be1-f81b9f35072c",
            name: "Rechtsanwalt Dr. Ben-Luca Möller",
            aktenzeichen: "P 8212 02/2026",
          },
        ],
      },
      {
        id: "fa42e829-742a-a7bf-bc20-2c6c715314f4",
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
            id: "c300656a-16a5-8c53-3c50-35a3d0865c3d",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "K 9854 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed8-787e-8748-cd726a33c009",
    aktenzeichen_gericht: "I 1596 09/2026",
    status: "ERSTELLT",
    status_changed: "2025-05-11T11:01:26.271933Z",
    eingereicht_am: "2022-03-05T03:43:07.123462Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "69c4b0c3-836e-3836-2658-a206149fddbf",
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
            id: "eccdba59-a8d6-9110-6520-8a4741a79bc7",
            name: "Tim Becker",
            aktenzeichen: "F 9098 07/2026",
          },
          {
            id: "797874e2-fc87-7f29-98e7-e83dbc34f14e",
            name: "Rechtsanwalt Dr. Anna-Lena Krug",
            aktenzeichen: "A 2884 01/2024",
          },
        ],
      },
      {
        id: "f5ddceba-fde0-1ccf-eb8a-75ce3b2555c9",
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
            id: "37f6f3cd-4b71-0090-1a59-ab8cc2872b44",
            name: "Tim Becker",
            aktenzeichen: "Y 296 02/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7e5f-a532-a7e238719cd6",
    aktenzeichen_gericht: "Z 1381 05/2024",
    status: "ERSTELLT",
    status_changed: "2026-01-18T13:50:06.901973Z",
    eingereicht_am: "2022-03-03T10:15:37.258168Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "7ced92da-71f6-95bb-4db9-37f4f64ae86f",
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
            id: "a95be7e1-0818-c8e3-9029-527a7662f808",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "K 7712 07/2025",
          },
        ],
      },
      {
        id: "bc71ffbd-a629-ca1c-ea20-c5614e78b5ee",
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
            id: "fd069dc8-9733-78d1-1094-7fcfe619051f",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "O 3857 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecf-7cdb-ab5d-f6020a4d7311",
    aktenzeichen_gericht: "L 4955 12/2024",
    status: "ERSTELLT",
    status_changed: "2026-02-08T19:26:37.231935Z",
    eingereicht_am: "2022-02-24T06:27:26.319397Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "85842409-15a2-520b-b967-cc2cfe752970",
        name: "Kathrin Weiß",
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
        id: "8a893d85-4aa9-3b7d-2128-ab6afa09e3cc",
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
            id: "a3315f07-fe48-257d-0f6e-471211bf058a",
            name: "Rechtsanwalt Leonhard Weiß",
            aktenzeichen: "S 2668 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-70e4-9c40-2941d4bd4bce",
    aktenzeichen_gericht: "U 2996 02/2026",
    status: "EINGEREICHT",
    status_changed: "2025-06-27T09:08:27.222897Z",
    eingereicht_am: "2022-02-21T11:26:03.678368Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "78f9e42e-5fb8-e67a-531d-24d678586d4c",
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
            id: "42d8eaf3-3a74-7860-dd45-3425d6b4af62",
            name: "Dr. Timo-Milan Ott",
            aktenzeichen: "E 4075 12/2025",
          },
          {
            id: "81e8fb4a-6d8b-7f32-6bf0-66a849902d8d",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "I 3486 09/2026",
          },
        ],
      },
      {
        id: "9da6fa52-6445-751c-cedf-3b83ea6aca80",
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
            id: "5973981c-becf-0718-9dac-8124d1ce6cd1",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "F 3094 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-7787-a366-45c6b21dda83",
    aktenzeichen_gericht: "C 3367 02/2026",
    status: "EINGEREICHT",
    status_changed: "2025-10-09T06:02:51.513673Z",
    eingereicht_am: "2022-02-14T05:51:51.011146Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "2351b665-3ca8-ce8c-3eb0-e6821b9df811",
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
            id: "82dfcb17-4848-01b6-1ad0-b63f3f391cbe",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "J 892 04/2025",
          },
        ],
      },
      {
        id: "a8a893a9-182c-89e7-b9a2-f0f0b62ecbe9",
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
            id: "db50157e-63ab-1a93-a35c-7aba1eb2bee6",
            name: "Rechtsanwalt Dr. Elisa-Maria Voigt",
            aktenzeichen: "Z 5650 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7d7d-bb38-650fc15999fb",
    aktenzeichen_gericht: "Z 4402 07/2025",
    status: "ERSTELLT",
    status_changed: "2025-09-17T19:49:15.501754Z",
    eingereicht_am: "2022-02-12T07:37:48.31338Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "29f99015-1634-3de0-0487-5c53b847eb80",
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
            id: "d8d97562-dc54-09e3-4186-c433f1d49253",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "K 1640 07/2024",
          },
        ],
      },
      {
        id: "807730e4-60e8-1c68-3487-dd0ceec5396f",
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
    id: "019c5736-7836-7c7a-b09f-c9c9b930a979",
    aktenzeichen_gericht: "W 3180 02/2026",
    status: "ERSTELLT",
    status_changed: "2025-12-24T03:27:08.564939Z",
    eingereicht_am: "2022-02-06T19:25:56.987081Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "81d014dc-f30f-75d3-97e6-fa82f55682bb",
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
            id: "f80c3ab0-b987-5d7d-8857-12e26dcc2295",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "L 5216 06/2024",
          },
        ],
      },
      {
        id: "95998570-0cf3-46e7-5163-a2b92573c24d",
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
            id: "f986c560-6e91-ae2f-233f-5b1267f2f7b7",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Q 8234 10/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7288-74fd-8c62-ac81c927f4a8",
    aktenzeichen_gericht: "L 5372 04/2026",
    status: "ERSTELLT",
    status_changed: "2025-03-18T00:46:45.912726Z",
    eingereicht_am: "2022-02-04T10:55:03.671619Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "d80489ef-7ee0-37b0-32da-414daaea367f",
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
            id: "d6af50c3-a40e-912e-d0cf-4946ac197f5a",
            name: "Rechtsanwalt Florian Weiß",
            aktenzeichen: "R 3290 01/2024",
          },
          {
            id: "258dd37a-6fb8-acbb-584c-d8d3ed8f3fbe",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "K 6353 08/2026",
          },
        ],
      },
      {
        id: "e42aa30b-560a-3c6e-1d59-384c6a2ad577",
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
            id: "4155980d-a145-1a68-98ef-e4e05fc3548d",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "T 5601 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7e13-945c-d62097756857",
    aktenzeichen_gericht: "X 7956 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-03-13T02:18:40.147248Z",
    eingereicht_am: "2022-02-02T12:09:41.938457Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "284dac7c-bdd2-8916-6093-1db4f1cf3cda",
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
            id: "9f943066-25dc-76f5-3aef-103afb934292",
            name: "Dr. Paula-Lina Bär",
            aktenzeichen: "C 9581 01/2026",
          },
        ],
      },
      {
        id: "e117b75d-55f9-9c0d-212d-9ad04a285ba5",
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
            id: "a870a3f5-4fab-6a3d-998b-ae0f77e262fd",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Q 2741 04/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edc-7ce9-b32c-e76702e0f5a9",
    aktenzeichen_gericht: "A 3534 01/2024",
    status: "ERSTELLT",
    status_changed: "2025-06-21T05:36:26.168989Z",
    eingereicht_am: "2022-01-31T09:23:11.87163Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "675d04af-f0af-0a29-2677-0905ea229c41",
        name: "Helene-Isabell-Theresa von Weißmann-Kühn-Schäfer-Bärenfels",
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
        id: "94aa56fb-3195-7d8c-0e98-2afef371461a",
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
            id: "96d7c68f-c464-e69b-c047-f568b9ac327a",
            name: "Rechtsanwalt Dr. Elisa-Maria Voigt",
            aktenzeichen: "S 3503 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7a78-b116-71a5247ce786",
    aktenzeichen_gericht: "W 2002 03/2024",
    status: "EINGEREICHT",
    status_changed: "2026-01-26T04:27:08.847959Z",
    eingereicht_am: "2022-01-28T13:40:42.253991Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "3a549ac5-b1c5-a2d8-25cc-2c2afc2d1be8",
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
            id: "cb73771e-3f10-6ba7-c314-4641c1a2da64",
            name: "Rechtsanwalt Miriam Krüger",
            aktenzeichen: "V 7812 07/2025",
          },
        ],
      },
      {
        id: "49223980-3caf-1752-4195-1ae0a5aa4f0a",
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
            id: "c5f28cc2-b4cd-be97-1dec-c8768ca2c35f",
            name: "Rechtsanwalt Klara-Louise Braun",
            aktenzeichen: "Y 1806 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728f-78e3-8273-bf259ba7623e",
    aktenzeichen_gericht: "R 3581 12/2025",
    status: "EINGEREICHT",
    status_changed: "2025-07-22T00:11:29.114836Z",
    eingereicht_am: "2022-01-28T08:31:34.825226Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "46f80701-115d-1cae-2b08-812d827b8d5c",
        name: "Matthias Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "b0ccb744-d906-2347-9e6c-abfce81a9210",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "G 7385 02/2024",
          },
        ],
      },
      {
        id: "eeea6257-8792-d804-4022-d97af7c613dc",
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
            id: "79eb859f-7da1-4320-2f65-5fc60dc037d0",
            name: "Dr. Franziska Müller",
            aktenzeichen: "C 6386 09/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-7b2c-aff5-50f14583dae7",
    aktenzeichen_gericht: "K 309 03/2024",
    status: "ERSTELLT",
    status_changed: "2025-12-31T19:50:16.956778Z",
    eingereicht_am: "2022-01-12T11:50:08.002404Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "953ed82d-5e94-33f7-2bd3-e5a308c01dfb",
        name: "Ryanair",
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
        id: "b1237594-6416-ea77-917e-829530962e76",
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
            id: "63e33362-649e-a537-2c76-3686ecf374f2",
            name: "Rechtsanwalt Carina Weiß",
            aktenzeichen: "G 3160 03/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ecf-71c8-86e5-616da31ba4d3",
    aktenzeichen_gericht: "F 1552 08/2026",
    status: "ERSTELLT",
    status_changed: "2025-10-04T00:39:19.413326Z",
    eingereicht_am: "2022-01-05T00:58:53.483608Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "1a91c8d0-a13b-1082-a0f6-7ddcaf965291",
        name: "Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
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
        id: "2f33e556-8080-1213-685f-a85fd8464ac3",
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
            id: "8c98e7de-a055-4b4e-b1de-beaafe7429a9",
            name: "Tim Becker",
            aktenzeichen: "Z 4679 02/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7291-723c-bc9b-312b472eb7cc",
    aktenzeichen_gericht: "F 948 04/2025",
    status: "ERSTELLT",
    status_changed: "2025-03-24T17:34:10.998718Z",
    eingereicht_am: "2021-12-31T03:56:52.584091Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "5df86348-7727-dcb3-ef16-dff16dc98864",
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
            id: "41d7378e-8a37-7d54-5469-a9cd4216ebee",
            name: "Dr. Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
            aktenzeichen: "Y 3921 11/2025",
          },
        ],
      },
      {
        id: "eb190f61-b54c-87ed-834f-981b23d438ce",
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
            id: "a9c5981e-01e9-a719-e845-53000cbae65d",
            name: "Rechtsanwalt Claudia-Maria-Theresia Gräfin von Großwald",
            aktenzeichen: "Y 4061 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed6-7f21-8230-c0c7b6a51490",
    aktenzeichen_gericht: "Q 5007 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-08-22T01:04:50.000927Z",
    eingereicht_am: "2021-12-22T05:20:24.531226Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "a8612296-0cd9-17f2-1c43-c884ec0f6e5c",
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
            id: "de13dd01-9552-41ae-4652-9bb43b9f11f5",
            name: "Tim Becker",
            aktenzeichen: "R 8834 03/2025",
          },
        ],
      },
      {
        id: "e50bf7ae-3034-daf1-5aeb-8c07e66336e3",
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
            id: "8613948a-baa2-7cd3-e2e8-82339e877f18",
            name: "Rechtsanwalt Dr. Stefan Kranz",
            aktenzeichen: "T 2073 05/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7835-7ca5-b10e-a5aa2655da66",
    aktenzeichen_gericht: "Q 5136 08/2025",
    status: "ERSTELLT",
    status_changed: "2025-03-30T13:36:45.709659Z",
    eingereicht_am: "2021-12-13T00:32:51.004407Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "30adbbcc-aad6-13a7-eff6-ac6f7b43e266",
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
            id: "5c2b660c-4d59-307b-0f93-ce273faebece",
            name: "Rechtsanwalt Dr. Ben-Luca Möller",
            aktenzeichen: "S 2300 12/2024",
          },
        ],
      },
      {
        id: "a6c88b06-5306-8aed-6d2b-58f67268e284",
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
            id: "ae1ad1c7-d36d-683c-96be-cc6cb0fa4105",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "T 1095 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728d-7910-935a-d2931ecfd2b6",
    aktenzeichen_gericht: "K 3031 11/2026",
    status: "EINGEREICHT",
    status_changed: "2025-09-29T02:08:38.569259Z",
    eingereicht_am: "2021-12-07T09:25:33.800219Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "be536dad-191a-3f61-02b0-d208407acb0e",
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
            id: "2fee5870-584e-f84b-af8b-3947c6105780",
            name: "Rechtsanwalt Dr. Markus Höhn",
            aktenzeichen: "Z 3614 01/2026",
          },
        ],
      },
      {
        id: "c7fb3176-5619-71f7-398e-83c8619d3dcd",
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
            id: "1f52ea0c-ca45-62d2-8194-b2866a751f23",
            name: "Rechtsanwalt Friedrich-Alexander-Johannes von Hohenstein-Bär-Krüger-Schäfer",
            aktenzeichen: "J 4648 03/2026",
          },
          {
            id: "493e0396-8881-26f7-062f-38b0e80d5d6a",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "P 8121 11/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7834-74f3-b96f-2fa62df98a96",
    aktenzeichen_gericht: "H 4764 01/2026",
    status: "ERSTELLT",
    status_changed: "2025-10-05T17:04:33.486515Z",
    eingereicht_am: "2021-12-05T01:56:46.563078Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "4e9f0adf-2e8e-4ef4-5a7f-126a31e5c466",
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
            id: "d307f536-a32d-e6a3-0a32-956376ee1a62",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "I 9545 04/2024",
          },
        ],
      },
      {
        id: "fcc98d39-e576-7a90-832f-5a2c68f30318",
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
            id: "1bc8b246-76b6-87e8-e6f7-306374c5d489",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "H 5043 12/2024",
          },
          {
            id: "68c5a809-80fa-032d-5055-e32e7a046c80",
            name: "Rechtsanwalt Friedrich-Johannes-Karl von Bärenfels-Schön-Küster-Weißmann",
            aktenzeichen: "W 3197 08/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7832-7709-af96-fc346b72add3",
    aktenzeichen_gericht: "A 9724 04/2024",
    status: "EINGEREICHT",
    status_changed: "2026-01-22T00:36:42.360215Z",
    eingereicht_am: "2021-11-25T17:06:04.012077Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "cd621030-21e0-2e6c-fd41-80c929153a3b",
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
            id: "d6845837-8d3c-4efa-1c4a-b70ca880c306",
            name: "Rechtsanwalt Dr. Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
            aktenzeichen: "Y 4135 10/2025",
          },
        ],
      },
      {
        id: "d0dca040-cc31-25e9-e0ed-f216a551b075",
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
            id: "5c14df3e-564e-f4bb-f358-52dbc530335a",
            name: "Dr. Laurenz Böhler",
            aktenzeichen: "J 7452 03/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-7269-8f9e-57447c11b889",
    aktenzeichen_gericht: "N 1644 02/2025",
    status: "ERSTELLT",
    status_changed: "2025-05-23T12:39:30.197565Z",
    eingereicht_am: "2021-11-25T12:20:30.431761Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "53d6dbd3-2be3-3adc-860c-8e2cefccf082",
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
            id: "89373d43-a6e9-027b-0ff0-c59a338b6a03",
            name: "Dr. Leonhard Böhm",
            aktenzeichen: "J 2797 13/2024",
          },
        ],
      },
      {
        id: "ff0513fc-e23f-df01-d917-ca1457fcdf54",
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
            id: "f3d594fb-dc85-04bd-6da4-992f12bc445e",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "R 6423 12/2026",
          },
          {
            id: "a4a5201a-4b15-871f-8587-84150cf47423",
            name: "Dr. Johanna Kübler",
            aktenzeichen: "G 7045 06/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed1-7b63-8031-18a4208d3b2d",
    aktenzeichen_gericht: "W 8099 10/2026",
    status: "ERSTELLT",
    status_changed: "2025-04-07T03:20:24.117019Z",
    eingereicht_am: "2021-11-16T15:38:13.566501Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "03473d25-02a9-9b94-d1b0-e139e7fd00e5",
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
            id: "b92a43ce-b7ad-4a65-31d5-7f46816b8c6d",
            name: "Tim Becker",
            aktenzeichen: "C 5812 01/2026",
          },
        ],
      },
      {
        id: "a291ba9f-4ba9-5461-4cfd-d3b8843738f6",
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
    id: "019c5733-2ed1-70d7-a637-9af39579acb9",
    aktenzeichen_gericht: "J 4319 06/2026",
    status: "ERSTELLT",
    status_changed: "2025-12-09T20:01:02.259277Z",
    eingereicht_am: "2021-11-08T09:29:07.209577Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "0e70d8ca-fe49-1902-0d54-70586d8db31d",
        name: "Johanna-Elise-Margarethe von Hohenau-Krüger-Weiß-Schäfer",
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
        id: "e8248aa9-83c8-be82-0a73-f6892c16ffdb",
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
            id: "12534dd7-eec7-24e8-47f8-f8f674156b15",
            name: "Dr. Johanna-Lina Böhm",
            aktenzeichen: "H 8969 10/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed8-70b8-93cb-6a537d28590f",
    aktenzeichen_gericht: "N 5971 10/2024",
    status: "ERSTELLT",
    status_changed: "2025-12-09T21:38:14.906467Z",
    eingereicht_am: "2021-11-03T18:30:31.851431Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "ce7b39dd-307b-d26b-33cf-b7f93abb3c3d",
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
            id: "003e9cde-f79e-bbef-d726-8af22cf3f668",
            name: "Dr. Emilia Kühn",
            aktenzeichen: "O 9988 12/2026",
          },
        ],
      },
      {
        id: "d1e26dce-7adf-a34c-ee10-9c6ff6008cfa",
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
            id: "a36c6e24-a761-3c90-9eab-3ea825a6464c",
            name: "Dr. Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
            aktenzeichen: "W 6860 07/2026",
          },
          {
            id: "834fc284-7064-ddc2-93ab-2f778a364593",
            name: "Tim Becker",
            aktenzeichen: "O 3403 05/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-78de-a7af-55b0e61af9c6",
    aktenzeichen_gericht: "A 622 11/2026",
    status: "ERSTELLT",
    status_changed: "2025-08-28T07:17:59.376567Z",
    eingereicht_am: "2021-11-02T07:48:23.413815Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "293a5873-6d6c-2aa1-44d9-d7a208d63392",
        name: "Lufthansa",
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
        id: "364569bd-f3fc-a60e-d18f-f4b2e870d559",
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
            id: "2e15f1d5-fb26-bbc6-dca6-2a146bcf66ad",
            name: "Rechtsanwalt Christoph Weiß",
            aktenzeichen: "J 6755 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-72e3-b154-ce7642608bce",
    aktenzeichen_gericht: "D 9144 11/2024",
    status: "ERSTELLT",
    status_changed: "2025-11-10T16:13:16.469147Z",
    eingereicht_am: "2021-10-27T14:15:41.776125Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "0eb877da-2f09-cd1f-3ecf-8c43bfe62681",
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
            id: "c42f7b33-c20c-d265-4242-c256b4db1e0f",
            name: "Rechtsanwalt Friedrich Kübler",
            aktenzeichen: "U 5828 07/2024",
          },
        ],
      },
      {
        id: "ea714504-858c-91ec-32e5-abb4e626ea27",
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
            id: "2ee39368-a9ea-6918-2022-684c1e17ab74",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "C 1340 07/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-733d-af27-2bdecd59b336",
    aktenzeichen_gericht: "R 640 12/2024",
    status: "EINGEREICHT",
    status_changed: "2025-02-23T18:44:18.599927Z",
    eingereicht_am: "2021-10-24T10:50:07.231703Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "3f32ac64-74f2-e5e6-1a93-fc0aa72202bf",
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
            id: "711731f3-a299-695a-9cd5-8a7194f9a5ee",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "T 7628 13/2025",
          },
        ],
      },
      {
        id: "6ad2b688-f2f5-06f5-4fec-fa52a7b9879c",
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
    id: "019c5736-7833-7f93-91e4-62d66f4bd6f0",
    aktenzeichen_gericht: "W 1117 10/2026",
    status: "EINGEREICHT",
    status_changed: "2025-12-10T14:57:01.828882Z",
    eingereicht_am: "2021-10-18T00:23:18.408287Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "2cd21cae-ac26-bbc3-2ada-30b752bfafee",
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
            id: "44933ade-da73-def9-1579-7c72e89f4920",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "F 3236 13/2024",
          },
        ],
      },
      {
        id: "762ccac4-a73f-44b6-46af-63a31ffdb722",
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
            id: "a321edc5-6644-4ca8-36c5-c637d64fe299",
            name: "Rechtsanwalt Jonas-Luca Weiß",
            aktenzeichen: "R 2537 13/2024",
          },
          {
            id: "80cc4dcc-fa49-d579-3172-75771af3b9ba",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "I 7175 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7287-7cf6-9ba2-4824346f3e41",
    aktenzeichen_gericht: "Q 3829 03/2024",
    status: "EINGEREICHT",
    status_changed: "2026-02-07T09:44:45.814354Z",
    eingereicht_am: "2021-10-01T05:10:04.613324Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "b3caf2bb-c3eb-c208-6e3c-4a1e30966392",
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
            id: "dc6bd986-7136-1126-e312-a62e4718c3cf",
            name: "Rechtsanwalt Paulina-Luise Katharina von Hölzer-Schönfeld",
            aktenzeichen: "I 6101 04/2024",
          },
        ],
      },
      {
        id: "cd915346-c2c4-354e-7db5-dee39a0781e0",
        name: "Carina Weiß",
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
    id: "019c5733-2ed0-7e65-ab5a-ae3b8621865f",
    aktenzeichen_gericht: "B 2054 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-06-02T09:39:54.691633Z",
    eingereicht_am: "2021-09-28T05:38:41.797081Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "80ec9f5d-77bf-7ecc-c8ba-ffd81c3ca5c2",
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
        id: "8db766d2-ffc3-86f9-500d-6ef5b1b48ab6",
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
            id: "5d2b2232-c3ce-9023-83aa-a28955d057c3",
            name: "Tim Becker",
            aktenzeichen: "P 2327 05/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7836-7c63-a2eb-4bb98c4d562d",
    aktenzeichen_gericht: "A 7948 12/2024",
    status: "ERSTELLT",
    status_changed: "2025-08-07T17:40:58.919439Z",
    eingereicht_am: "2021-09-18T13:54:18.831279Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "58c1bc01-d008-d09f-8b12-976c42a0c462",
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
            id: "9e758aa2-21d7-b8e5-ea48-257d5b189ffe",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "T 8639 04/2025",
          },
        ],
      },
      {
        id: "f05a6af1-d5bb-0e09-2419-42a772e82a8e",
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
            id: "20164539-322f-5e30-16ee-1856397ccf68",
            name: "Rechtsanwalt Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
            aktenzeichen: "Q 5842 08/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-7adf-8e4b-1c0b7dcc670a",
    aktenzeichen_gericht: "T 2886 05/2026",
    status: "EINGEREICHT",
    status_changed: "2025-11-25T04:22:29.73732Z",
    eingereicht_am: "2021-09-15T17:54:30.487124Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "24ceaa1a-27d2-94f9-a71a-8d9425a9e638",
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
            id: "a483fcdc-cd6e-bb14-fc2b-bcb4ba4465c4",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "H 7397 09/2024",
          },
        ],
      },
      {
        id: "79422877-6063-a810-8d1f-9620adef97c7",
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
            id: "e20dd283-527d-866b-b467-14ad62095a69",
            name: "Dr. Florian Schön",
            aktenzeichen: "J 3430 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-74c4-9999-eda10e1ec3ed",
    aktenzeichen_gericht: "Q 6461 07/2025",
    status: "EINGEREICHT",
    status_changed: "2026-02-13T12:36:02.050276Z",
    eingereicht_am: "2021-09-13T06:41:36.418571Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "2b7b2e26-bca2-8daf-f00a-6edcc2649278",
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
            id: "435eeaf4-c884-9d8d-38fb-9ee29f7c37cf",
            name: "Rechtsanwalt Friedrich Kübler",
            aktenzeichen: "A 9029 06/2025",
          },
        ],
      },
      {
        id: "d7dc9e39-4434-e228-0df2-979321ce364a",
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
            id: "678f4c21-398a-0cc3-342e-cd78a3a370ba",
            name: "Dr. Janina Müller",
            aktenzeichen: "V 1666 04/2026",
          },
          {
            id: "93b28036-0c04-5471-0a29-328b7b16a623",
            name: "Tim Becker",
            aktenzeichen: "F 3199 03/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed0-747c-b5fc-cead663120aa",
    aktenzeichen_gericht: "O 5892 11/2024",
    status: "EINGEREICHT",
    status_changed: "2025-08-30T05:48:29.189494Z",
    eingereicht_am: "2021-09-08T04:06:58.046501Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "53ecea36-dfd4-6fa5-4b41-74c43232468a",
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
            id: "15774965-8cf2-11f3-4806-a1ef5f26a35e",
            name: "Tim Becker",
            aktenzeichen: "B 9738 13/2024",
          },
          {
            id: "9ade553a-361c-88ee-5bd2-f512997a9e67",
            name: "Rechtsanwalt Marcel Küster",
            aktenzeichen: "Y 8595 13/2025",
          },
        ],
      },
      {
        id: "85b5a33b-8da9-6814-a0e6-cac5abe28794",
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
            id: "45043f81-3543-c59f-1100-5c0193c455ee",
            name: "Tim Becker",
            aktenzeichen: "Q 9376 04/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed9-714b-bece-e82042472f71",
    aktenzeichen_gericht: "S 4330 06/2024",
    status: "EINGEREICHT",
    status_changed: "2025-06-17T19:34:58.104535Z",
    eingereicht_am: "2021-09-03T04:40:30.231451Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "5f39a7c1-31d4-e201-a3c0-e31eb9abf851",
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
            id: "21fde225-68a5-f2d1-94c7-d42500f9a523",
            name: "Tim Becker",
            aktenzeichen: "D 686 10/2025",
          },
        ],
      },
      {
        id: "7dc6d27e-bd23-1cef-1b77-dca7e4e10ea3",
        name: "Matthias Weiß",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            id: "2365bfc9-e7bc-4b8d-2373-65de3bb0e9cf",
            name: "Tim Becker",
            aktenzeichen: "R 3684 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7838-7344-8967-c91096d82af4",
    aktenzeichen_gericht: "X 863 13/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-17T14:59:23.334313Z",
    eingereicht_am: "2021-08-26T18:27:12.978442Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "417a6c51-7afe-38d9-5881-5fdf2d8dcb86",
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
            id: "5aafc523-ef1f-3053-cba1-8d8284aa9b43",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "S 2305 09/2025",
          },
        ],
      },
      {
        id: "a209b379-66d0-e64b-4026-48c3a52f3368",
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
            id: "c7a6338a-5f7f-519e-b9e5-0bbe006cd255",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "W 1988 01/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed7-7846-a4b7-aee2b58065ab",
    aktenzeichen_gericht: "A 3312 08/2025",
    status: "EINGEREICHT",
    status_changed: "2025-08-17T02:46:42.298661Z",
    eingereicht_am: "2021-08-17T17:15:20.372025Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "32582486-8142-f4e9-5e32-eacaebcfd3b9",
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
            id: "6edd93a9-90c1-cfb7-d324-09d3ad9bbf1e",
            name: "Rechtsanwalt Luisa-Maria Roth",
            aktenzeichen: "N 6960 08/2026",
          },
        ],
      },
      {
        id: "7f74243a-3078-7620-ff80-d1092bc1856d",
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
            id: "d3071825-29ab-0732-3850-915a9218ff2b",
            name: "Tim Becker",
            aktenzeichen: "W 135 05/2026",
          },
          {
            id: "900c3fa5-249a-7dca-9d78-3e3e5482db3f",
            name: "Rechtsanwalt Dr. Markus Kühn",
            aktenzeichen: "J 8230 01/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7839-751c-8242-a382cb380f3d",
    aktenzeichen_gericht: "G 757 11/2025",
    status: "ERSTELLT",
    status_changed: "2025-12-27T14:02:12.024953Z",
    eingereicht_am: "2021-08-12T18:40:05.408513Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "0210973e-e182-c5f3-c6a8-9a2928494dbe",
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
            id: "432728d3-276c-0484-3969-4c5b9af526f1",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "L 360 12/2025",
          },
        ],
      },
      {
        id: "3f635ecf-1e8e-086e-62b5-119134d14964",
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
    id: "019c5733-2edb-702d-bda3-b21c53015bf1",
    aktenzeichen_gericht: "H 3989 09/2025",
    status: "ERSTELLT",
    status_changed: "2026-02-07T08:49:20.405171Z",
    eingereicht_am: "2021-08-03T13:09:18.099466Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "a1b2d032-8ea6-13c3-def6-dc92663d34d8",
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
            id: "2b2462b3-314e-2f02-440b-13db6cd52255",
            name: "Tim Becker",
            aktenzeichen: "B 5894 13/2024",
          },
        ],
      },
      {
        id: "fb8ae30a-6237-87d0-c2cf-df1a0e238770",
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
            id: "720afd99-ce9e-b30d-30b0-9af89322fe61",
            name: "Rechtsanwalt Benedikt Krämer",
            aktenzeichen: "I 2983 08/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed7-7ca4-9676-76b01540f836",
    aktenzeichen_gericht: "O 2269 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-05-18T20:52:02.749664Z",
    eingereicht_am: "2021-07-30T11:31:57.433741Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "1482d745-924e-d2c2-f72e-7e0c19e0c406",
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
      {
        id: "70d24fc2-45dd-133b-a97b-654c50280649",
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
            id: "325b738a-f54a-d4a2-15cf-4c3e4182fa06",
            name: "Rechtsanwalt Dr. Dieter Böhm",
            aktenzeichen: "L 2939 11/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783a-7bf0-999d-03942b613c4d",
    aktenzeichen_gericht: "D 6726 13/2024",
    status: "EINGEREICHT",
    status_changed: "2025-03-22T04:34:10.072396Z",
    eingereicht_am: "2021-07-14T01:05:18.856985Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "79d52a3d-37bc-cd58-c0cd-51429fd941f5",
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
            id: "3f3364cd-b12b-d9eb-b77a-f648375b19c4",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Y 6709 06/2025",
          },
        ],
      },
      {
        id: "e948cb3b-a460-6b41-aa23-2b97db15d230",
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
            id: "dff0baff-1dbc-fd6c-fcd0-2114a231d1f5",
            name: "Dr. Anna-Katharina-Luise von Brückner-Weiß-Krüger-Schäfer-Kühn",
            aktenzeichen: "X 8659 09/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-755f-87e3-e36d97405d7c",
    aktenzeichen_gericht: "X 6954 03/2024",
    status: "EINGEREICHT",
    status_changed: "2025-02-25T22:10:09.564848Z",
    eingereicht_am: "2021-07-08T15:45:26.959557Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "78a27a87-34a6-14db-722b-8d838aab9ba9",
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
            id: "ca98995f-3112-02d0-b36b-7175cf47e686",
            name: "Tim Becker",
            aktenzeichen: "P 5262 13/2025",
          },
        ],
      },
      {
        id: "fba0b74d-5ece-c84d-c4d7-acdaa4d512ab",
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
            id: "0f2f463a-5e19-7b50-1ad9-bfbc5c88d975",
            name: "Tim Becker",
            aktenzeichen: "X 6123 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-783b-77f4-81e0-14d01f885e96",
    aktenzeichen_gericht: "Y 1623 01/2024",
    status: "EINGEREICHT",
    status_changed: "2025-09-15T14:07:36.010933Z",
    eingereicht_am: "2021-07-03T09:57:11.28999Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "becccdd9-8ddc-4053-d96f-311e6d1b3ee4",
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
            id: "cfc110bf-8a27-d73e-b86c-21f33efd23df",
            name: "Rechtsanwalt Dr. Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
            aktenzeichen: "C 9039 03/2024",
          },
        ],
      },
      {
        id: "cbe316e9-64a4-4411-159a-5b5a6e48c38c",
        name: "Johanna Groß",
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
    id: "019c5736-7838-7447-b30b-b0024aa16be1",
    aktenzeichen_gericht: "Z 1253 08/2025",
    status: "ERSTELLT",
    status_changed: "2025-12-29T01:13:34.717895Z",
    eingereicht_am: "2021-06-27T22:27:20.647909Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "5379ff15-b518-c731-681b-4311a81ca8ec",
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
            id: "5899fd5f-11e6-b3f6-41cf-d5d9e6a5f6f5",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "L 5832 13/2024",
          },
        ],
      },
      {
        id: "59791f91-4df6-f811-7ca9-ff98a7e6e1db",
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
            id: "684673c5-cfb6-a242-03fa-a8919a73c3ff",
            name: "Rechtsanwalt Andreas-Friedrich-Johannes von Hohenau-Krämer-Schönfeld-Weißmann",
            aktenzeichen: "Z 1120 06/2025",
          },
          {
            id: "ba2101dd-62cf-d593-99b0-7d11038307fa",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "P 8118 05/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728d-7174-badd-11c822c08dd3",
    aktenzeichen_gericht: "K 2652 08/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-20T15:20:20.455867Z",
    eingereicht_am: "2021-06-25T01:44:10.909156Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "5e28f358-1602-615b-abd1-b926201f55cf",
        name: "Paula-Louise Ott",
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
        id: "a59548df-89a9-2906-ec80-91e21317ff39",
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
            id: "0b699278-769d-bbc6-355a-533279dbaaea",
            name: "Dr. Andrea-Lena Vogt",
            aktenzeichen: "C 5970 10/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-7142-a7d4-abf7dfc6da5a",
    aktenzeichen_gericht: "G 1712 03/2025",
    status: "ERSTELLT",
    status_changed: "2025-04-21T05:40:45.873412Z",
    eingereicht_am: "2021-06-23T05:18:46.609042Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "9f1c77f8-cdda-4d50-fbdb-ef0b49f143bb",
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
            id: "60233ed7-6c2d-6673-6f19-b7457068239d",
            name: "Rechtsanwalt Dr. Kathrin Hölzer",
            aktenzeichen: "V 5670 13/2026",
          },
        ],
      },
      {
        id: "f3b2ac9c-2794-a5cd-1702-9836a210b426",
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
            id: "cf8fdd19-7147-838a-cfe6-0b2a55a1b5de",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "Y 7485 11/2026",
          },
          {
            id: "9344d54a-b3be-9507-0739-cdc35544a9ee",
            name: "Rechtsanwalt Dr. Carola Münch",
            aktenzeichen: "G 9790 11/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728d-7372-93c7-5b8f2ed43852",
    aktenzeichen_gericht: "H 7180 02/2025",
    status: "EINGEREICHT",
    status_changed: "2025-11-25T09:46:42.311784Z",
    eingereicht_am: "2021-06-19T01:08:18.749587Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "b02d3ffb-a3f0-4cbc-ffc3-a6528a446206",
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
            id: "364b4bd4-ee8a-a639-e655-be99c0720ada",
            name: "Dr. Anna-Katharina-Luise von Brückner-Weiß-Krüger-Schäfer-Kühn",
            aktenzeichen: "M 4517 09/2024",
          },
        ],
      },
      {
        id: "f333165f-8cc8-f978-c2e8-da8468236bb5",
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
    id: "019c5741-728b-7268-81e5-a8d0a657ca1e",
    aktenzeichen_gericht: "W 2075 04/2025",
    status: "ERSTELLT",
    status_changed: "2025-02-25T22:29:54.277475Z",
    eingereicht_am: "2021-06-18T08:50:13.629172Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "0608edb3-ed38-13ad-947e-696fc360778f",
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
            id: "db1238cc-81e4-cd9f-62b7-5d907e055176",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "E 6134 08/2024",
          },
        ],
      },
      {
        id: "3a444f67-1212-6d97-4740-f5c8a80411d6",
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
    id: "019c5736-7837-7a78-beba-4d3f3745b071",
    aktenzeichen_gericht: "G 6222 07/2026",
    status: "EINGEREICHT",
    status_changed: "2025-05-30T18:57:13.372894Z",
    eingereicht_am: "2021-06-12T11:19:25.753044Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "0caad88b-ed4e-ab7d-c7be-388c217ed6ed",
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
            id: "863fbe7f-e2ba-4307-e669-341cb21954e3",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "O 1403 12/2026",
          },
        ],
      },
      {
        id: "a34736aa-1ed3-153d-9fef-9deedfd65d14",
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
            id: "7c83b25e-d7b8-8186-f918-e469965e3dd8",
            name: "Dr. Sebastian Kranz",
            aktenzeichen: "D 3779 06/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2ed8-7fb0-ad5c-0d82aa3586a5",
    aktenzeichen_gericht: "T 9068 04/2026",
    status: "EINGEREICHT",
    status_changed: "2025-08-06T21:46:31.271596Z",
    eingereicht_am: "2021-05-24T09:27:51.250973Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "6a7fa088-d5e6-4263-4957-4c2e1368f3f4",
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
            id: "d74a0ab7-95da-19f6-ba77-982b4a96a459",
            name: "Rechtsanwalt Dr. Johanna Möser",
            aktenzeichen: "D 1593 06/2024",
          },
        ],
      },
      {
        id: "941cc330-c4c1-94d2-0d20-ece4920504b4",
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
            id: "da72f563-a07a-0083-2e04-757d865a9b91",
            name: "Rechtsanwalt Dr. Carola Münch",
            aktenzeichen: "L 8408 02/2025",
          },
          {
            id: "df1cd5cc-a9cc-aabb-e25b-458984853a0e",
            name: "Tim Becker",
            aktenzeichen: "Z 2701 02/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7837-764d-85fe-c5e4a2553b0d",
    aktenzeichen_gericht: "B 6350 11/2026",
    status: "EINGEREICHT",
    status_changed: "2025-10-31T05:30:23.662351Z",
    eingereicht_am: "2021-05-21T00:18:50.452734Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "3f3c2c90-536a-289a-39b2-e7787695b74d",
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
            id: "3aa19bbe-7b29-6fb9-25f9-98e4aea3c0dd",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "E 3075 02/2026",
          },
        ],
      },
      {
        id: "42d68a72-f50a-b387-9905-06c3a2d49a1e",
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
            id: "d60e53c1-ee82-9578-ec4a-7b26f2bb4ec3",
            name: "Dr. Johanna-Luise Friederike von Bärenfels-Schmidt",
            aktenzeichen: "J 7075 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5736-7833-7809-9310-8be75526aff7",
    aktenzeichen_gericht: "G 8147 05/2025",
    status: "EINGEREICHT",
    status_changed: "2025-05-25T03:16:45.425461Z",
    eingereicht_am: "2021-05-15T20:41:05.4929Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "2f3a3ede-9a0e-c85f-796c-e7aba60b80d1",
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
            id: "32e80536-d770-c364-d2f0-b9099f3e85d4",
            name: "DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7 DE.BRAK_SPT.8bc14756-d387-4fe9-aa43-f718fd2e4a03.19e7",
            aktenzeichen: "V 7855 06/2026",
          },
        ],
      },
      {
        id: "74ce34a9-2b0e-e823-a6bb-45babdf5df77",
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
    id: "019c5741-7290-77e7-8c1e-b7a478746d69",
    aktenzeichen_gericht: "J 1971 01/2024",
    status: "EINGEREICHT",
    status_changed: "2025-12-14T15:54:12.447752Z",
    eingereicht_am: "2021-05-12T07:55:34.750137Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "53cb765c-15bd-9f2b-e084-db59c8c26bae",
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
            id: "5f0537b3-928d-c317-2540-6b743e84417a",
            name: "Rechtsanwalt Luisa-Maria Roth",
            aktenzeichen: "I 1075 01/2025",
          },
          {
            id: "9d264f0a-6451-7550-4d96-280da0621b6f",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "O 2471 03/2026",
          },
        ],
      },
      {
        id: "e5a90eb2-623b-978f-8d1f-168acb1e5ed2",
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
            id: "83c85077-59c6-c7c7-f7c5-e9fe67e2c7f5",
            name: "Dr. Benedikt Weiß",
            aktenzeichen: "E 3793 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728b-7b57-8611-b167853670f1",
    aktenzeichen_gericht: "I 9226 03/2025",
    status: "EINGEREICHT",
    status_changed: "2025-11-16T05:02:40.857404Z",
    eingereicht_am: "2021-04-25T06:12:05.105441Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "4b35dd93-cbfe-0d46-2fb2-814968b34e26",
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
            id: "0f02d497-f4d1-f77e-65df-9a170779aad6",
            name: "Rechtsanwalt Anna-Maria-Katharina-Elisabeth von Löwenstein-Kranz-Schäfer-Weiß",
            aktenzeichen: "D 1089 06/2024",
          },
          {
            id: "f82e41a0-7067-c9ef-994e-b4944c36f849",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "M 2528 01/2024",
          },
        ],
      },
      {
        id: "a5a05390-3312-741c-4110-c71e05a043cc",
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
            id: "8fc439c9-62f0-f63a-cb0e-4ad79de23e6e",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "R 8892 05/2025",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7660-8a22-27fdfec15dbb",
    aktenzeichen_gericht: "V 5645 02/2025",
    status: "ERSTELLT",
    status_changed: "2025-10-22T08:36:18.761018Z",
    eingereicht_am: "2021-04-20T22:53:14.191485Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "86e7e2fd-3f7b-4744-137e-cf8c3a2c7a46",
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
            id: "0bdd7efa-49fa-ec35-8e02-12f4a2adbb10",
            name: "Rechtsanwalt Johannes-Friedrich von und zu Bärenburg",
            aktenzeichen: "A 356 07/2025",
          },
        ],
      },
      {
        id: "964b2bbf-9d57-9942-6ca0-aa5068a86f47",
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
            id: "57773b31-8377-ab39-58f7-e8cbcf2c3cb9",
            name: "Rechtsanwalt Markus Lösch",
            aktenzeichen: "T 8547 04/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728b-7804-9274-e14ba71ff28e",
    aktenzeichen_gericht: "E 3731 04/2025",
    status: "EINGEREICHT",
    status_changed: "2026-01-06T23:15:46.239669Z",
    eingereicht_am: "2021-03-28T13:13:22.71232Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "e4f97b33-730a-7aa4-25bb-0de74fa6b508",
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
            id: "d1f083c2-d74b-ebb5-7558-e4d5a835b3a3",
            name: "Rechtsanwalt Christoph-Michael von und zu Großmann-Weiß",
            aktenzeichen: "K 125 05/2024",
          },
          {
            id: "69459e05-7d18-bab2-fc6b-f352503bcdd1",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "W 560 07/2025",
          },
        ],
      },
      {
        id: "e7151a27-b45b-0a7e-6c87-f57f06b181c9",
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
            id: "c2b95496-1cce-3111-6b94-926ecc383e3e",
            name: "Rechtsanwalt Dr. Tobias Hölzer",
            aktenzeichen: "D 6070 13/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7f4d-8143-a8ec42609c6f",
    aktenzeichen_gericht: "B 8978 05/2026",
    status: "EINGEREICHT",
    status_changed: "2025-03-04T20:22:47.525364Z",
    eingereicht_am: "2021-03-24T22:34:10.45962Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "54dc236e-a2f4-7822-341a-215b53551fc8",
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
            id: "50126c31-d907-c974-089d-4214040688cf",
            name: "Rechtsanwalt Leonhard Weiß",
            aktenzeichen: "P 5524 13/2024",
          },
          {
            id: "cc20d6b8-8c13-278f-6597-7cca23ee15bb",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "B 3791 02/2026",
          },
        ],
      },
      {
        id: "785f5393-c039-2c17-d1a2-45d07bf88a9f",
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
            id: "1ad6b41e-bc31-92d4-045f-ac2340af213a",
            name: "Dr. Florian Schön",
            aktenzeichen: "E 7802 12/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-728a-7cf9-84d1-4a4a993940a8",
    aktenzeichen_gericht: "F 6561 13/2025",
    status: "ERSTELLT",
    status_changed: "2025-11-09T07:11:10.521746Z",
    eingereicht_am: "2021-03-23T22:43:17.533564Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "b0840e35-7b54-2840-bea3-09b7ef527e5f",
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
      {
        id: "feed3b39-5839-e5ef-c90a-af5dc7518e01",
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
            id: "b791bbfb-de2c-243a-da96-7c0b82865a0f",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "Z 3827 01/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7289-7258-ba98-2cb2ff1edd73",
    aktenzeichen_gericht: "H 9811 02/2025",
    status: "EINGEREICHT",
    status_changed: "2025-03-28T08:26:42.73219Z",
    eingereicht_am: "2021-03-18T19:10:15.503023Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "1a0f1cb4-1c29-17e4-5cb0-950c3b99f6be",
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
            id: "ec76ff55-9939-5c0c-da56-4c9976df1d2c",
            name: "Rechtsanwalt Julia-Maria-Luise von Schönfeld-Weißmann-Küster-Schäfer-Kranz",
            aktenzeichen: "W 6253 03/2026",
          },
        ],
      },
      {
        id: "d2b4b9ab-023a-9589-db7a-b45229d40f11",
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
            id: "c0f17eda-5029-d46b-3a85-28b8b4a3df9c",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "W 2009 02/2024",
          },
        ],
      },
    ],
  },
  {
    id: "019c5733-2edb-7702-84d7-77f416b5f16c",
    aktenzeichen_gericht: "O 7047 04/2024",
    status: "ERSTELLT",
    status_changed: "2026-02-10T23:29:17.827075Z",
    eingereicht_am: "2021-03-05T12:26:00.486284Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "bd2e2fcd-a823-5de6-13fb-68eb8950e7cc",
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
            id: "5b19f0c1-610d-b995-1235-11066aeb16c0",
            name: "Tim Becker",
            aktenzeichen: "K 1824 09/2026",
          },
        ],
      },
      {
        id: "df89b13c-a2ed-9b9a-a724-bbb0668cc6ac",
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
            id: "52fdc42d-d57f-4f26-7be1-c99f193207dd",
            name: "Rechtsanwalt Dr. Annemarie Scholz",
            aktenzeichen: "E 6372 13/2026",
          },
        ],
      },
    ],
  },
  {
    id: "019c5741-7287-760b-865e-541a69c2aa8d",
    aktenzeichen_gericht: "V 3303 09/2025",
    status: "EINGEREICHT",
    status_changed: "2025-05-20T20:48:04.956186Z",
    eingereicht_am: "2021-02-27T02:24:49.168554Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "0c6c4af8-1dd3-bdd8-1354-b728f763d3c1",
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
            id: "6ac56af1-ee21-5283-8667-41f2e02ee861",
            name: "DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca DE.BRAK_SPT.d1acd228-03ab-448c-a085-f1d8a3ba3874.27ca",
            aktenzeichen: "E 583 09/2026",
          },
        ],
      },
      {
        id: "44c8ab6d-ac36-a7a7-9bc6-5164858216dd",
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
            id: "4cdf4b60-45f8-1356-19ce-b5612c717c53",
            name: "Rechtsanwalt Alexander Brück",
            aktenzeichen: "Z 3073 13/2025",
          },
        ],
      },
    ],
  },
];
