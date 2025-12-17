// fresh copy of GET /verfahren resonse from https://app.kompla-justiz.sinc.de/main/swagger/index.html
export const verfahrenMockData = [
  {
    id: "019abafa-7d81-75de-9550-3f29ff744915",
    aktenzeichen_gericht: "F 3374 09/2026",
    status: "Eingereicht",
    status_changed: "2025-03-22T09:58:54.682761Z",
    eingereicht_am: "2025-11-13T08:25:32.010371Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d82-733a-9f36-d739aa8b182c",
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
            aktenzeichen: "U 8074 02/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7152-9fd5-ae47643e7bd1",
              safe_id: "DE.BRAK_SPT.b2c77f31-7557-4daf-81ba-0a602ad8fd47",
              name: "Dr. Dieter Mönch",
            },
          },
        ],
      },
      {
        id: "019abafa-7d82-7c68-818c-e73cb3e7b789",
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
            aktenzeichen: "C 9778 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7a20-aa11-83453beed2a2",
              safe_id: "DE.BRAK_SPT.4fa6d741-7703-417f-8f04-b0288e5e3e12",
              name: "Rechtsanwalt Katharina-Elisabeth von der Hohenau-Müller",
            },
          },
          {
            aktenzeichen: "L 9403 02/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-71d3-8d55-1c6d062c0842",
              safe_id: "DE.BRAK_SPT.ccb7334e-b9e2-40e1-978d-645faf030b61",
              name: "Dr. Luisa-Maria Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d8c-7dc0-87b8-36fe1dc50a9b",
    aktenzeichen_gericht: "K 9200 06/2026",
    status: "Eingereicht",
    status_changed: "2025-03-28T23:20:18.615328Z",
    eingereicht_am: "2025-11-10T06:32:12.607167Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d8c-7521-b146-2942e484d3a3",
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
            aktenzeichen: "P 3047 07/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-74e3-b190-628d03213d70",
              safe_id: "DE.BRAK_SPT.dd3cc80c-b772-47e3-a52b-d1817256267f",
              name: "Rechtsanwalt Benedikt Weiß",
            },
          },
        ],
      },
      {
        id: "019abafa-7d8d-71d5-9904-3f32da20bed7",
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
            aktenzeichen: "B 3919 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7308-8bd9-8dfbae85416f",
              safe_id: "DE.BRAK_SPT.58a9af18-21bc-4a17-9e7f-29d1ddec3049",
              name: "Rechtsanwalt Dr. Theresa Krug",
            },
          },
        ],
      },
    ],
  },
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
    id: "019abaf9-beab-781f-a94d-2c7cf26d3715",
    aktenzeichen_gericht: "U 8169 13/2025",
    status: "Eingereicht",
    status_changed: "2025-07-12T09:58:21.300639Z",
    eingereicht_am: "2025-10-17T22:49:28.197479Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-beab-7d3b-a540-7a7441feeac8",
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
            aktenzeichen: "N 1625 12/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-beab-7d50-a217-97dfb6f3c602",
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
            aktenzeichen: "D 6885 10/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be88-7cf9-8150-e36d8cb96200",
    aktenzeichen_gericht: "D 9763 09/2024",
    status: "Erstellt",
    status_changed: "2025-05-03T09:50:31.954157Z",
    eingereicht_am: "2025-09-27T09:04:21.280499Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be88-7161-b5de-6aea23084a91",
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
            aktenzeichen: "O 267 05/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7b8b-b435-c44b85437286",
              safe_id: "DE.BRAK_SPT.011a5db0-7121-43f6-88ef-7dcc476f2ed1",
              name: "Rechtsanwalt Dr. Florian Kranz",
            },
          },
        ],
      },
      {
        id: "019abaf9-be89-79a0-b669-98c8e6a0c956",
        name: "Dieter-Maurer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "P 1654 07/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7505-aa6c-a4f281cf7194",
              safe_id: "DE.BRAK_SPT.5f535007-0e06-4c53-8ec4-b07f10560174",
              name: "Rechtsanwalt Anna-Maria-Luise von Hohenstein-Schwarzburg",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be6d-755a-9ab2-f15e301120ab",
    aktenzeichen_gericht: "V 2820 08/2025",
    status: "Eingereicht",
    status_changed: "2025-07-24T21:00:22.854795Z",
    eingereicht_am: "2025-09-24T01:21:31.810114Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6d-7bb5-abec-afe09440ebfb",
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
            aktenzeichen: "D 8394 10/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6e-7e1e-888a-9264b4564681",
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
            aktenzeichen: "I 983 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7dd1-b604-6c1cf944803c",
              safe_id: "DE.BRAK_SPT.7efc18f7-daa8-4f25-b7c7-c63310ae975e",
              name: "Rechtsanwalt Tobias-Ferdinand Karl-Heinz von Römerstein",
            },
          },
        ],
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
    id: "019abaf9-be7c-7ffc-bef0-6465b1d2acda",
    aktenzeichen_gericht: "K 583 03/2026",
    status: "Erstellt",
    status_changed: "2024-12-10T17:17:42.217718Z",
    eingereicht_am: "2025-09-01T08:43:36.476867Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7c-7a39-911b-742c28d1595c",
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
            aktenzeichen: "X 9932 12/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be7d-7800-9243-2e8e24c15bea",
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
            aktenzeichen: "K 8419 07/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "E 3967 13/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7246-9d2e-c306728f018f",
              safe_id: "DE.BRAK_SPT.28ad4beb-cf88-4ac1-9d33-13d44a52e7e6",
              name: "Rechtsanwalt Dr. Christina Höfer",
            },
          },
        ],
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
    id: "019abaf9-be6e-71c1-80af-7c811ccccdc9",
    aktenzeichen_gericht: "Z 1816 07/2025",
    status: "Erstellt",
    status_changed: "2025-06-02T13:27:36.098504Z",
    eingereicht_am: "2025-08-21T07:16:48.556758Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6e-776a-a201-2da8bea2d011",
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
            aktenzeichen: "Q 1575 06/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6f-75bc-9f9b-094aa58906a4",
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
            aktenzeichen: "R 2994 03/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "W 9903 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-78f0-a5a2-c8347eb55f64",
              safe_id: "DE.BRAK_SPT.79408b21-f0ec-4a71-88bb-87306c069c30",
              name: "Rechtsanwalt Dr. Miriam-Johanna-Elisabeth von und zu Löwenstein-Bär-Schäfer-Küster",
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
    id: "019abafa-7d89-7958-9dc2-05fedde7418f",
    aktenzeichen_gericht: "A 5752 04/2026",
    status: "Eingereicht",
    status_changed: "2025-09-06T11:35:14.900573Z",
    eingereicht_am: "2025-08-02T16:13:26.301458Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d89-725c-99ef-2d65eca48709",
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
            aktenzeichen: "Y 3456 05/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d89-74c7-b23a-e96619c92df1",
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
            aktenzeichen: "N 4447 11/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be84-7016-a945-e810de55282b",
    aktenzeichen_gericht: "C 9859 04/2025",
    status: "Erstellt",
    status_changed: "2025-04-14T23:00:12.148512Z",
    eingereicht_am: "2025-07-29T07:41:29.70151Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be84-7127-994c-89543d8151f4",
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
            aktenzeichen: "H 4337 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7250-97cc-716960f003c1",
              safe_id: "DE.BRAK_SPT.7801ac24-5925-47a0-b4f9-396005fb0f62",
              name: "Rechtsanwalt Dr. Christoph Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-be84-75c7-a5cf-7ea345cda348",
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
            aktenzeichen: "N 9474 03/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-beab-7163-9ffe-fb440a6a6deb",
    aktenzeichen_gericht: "H 4023 03/2025",
    status: "Eingereicht",
    status_changed: "2025-09-22T16:47:57.879115Z",
    eingereicht_am: "2025-07-22T08:52:40.378187Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-beab-7821-9809-b7db58c9d1b0",
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
            aktenzeichen: "K 2442 04/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-beab-7b9f-be80-18f8f18e11e8",
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
    id: "019abafa-7c15-7a7f-86ed-fbdb3e3b5552",
    aktenzeichen_gericht: "M 2149 12/2025",
    status: "Eingereicht",
    status_changed: "2025-06-19T15:21:49.021047Z",
    eingereicht_am: "2025-07-12T15:05:49.403546Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7c94-7765-8b19-841b67fe1125",
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
            aktenzeichen: "A 1833 07/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d2a-7db6-a093-0a2e5e8c2f86",
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
            aktenzeichen: "N 948 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7502-a665-24b3a0d8ce89",
              safe_id: "DE.BRAK_SPT.208e9347-874d-498c-8086-bd16a9858edb",
              name: "Dr. Dominik Weiß",
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
    id: "019abaf9-be95-739b-bdde-a336293930f7",
    aktenzeichen_gericht: "V 3809 03/2026",
    status: "Eingereicht",
    status_changed: "2025-08-16T00:21:32.731701Z",
    eingereicht_am: "2025-06-27T05:52:46.413587Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be95-76bd-ba71-3c0724b50ffb",
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
            aktenzeichen: "M 3152 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-71cd-b12f-772e857c2500",
              safe_id: "DE.BRAK_SPT.182970e1-8263-471f-a9c0-f1e588a1390c",
              name: "Dr. Antonia Löhr",
            },
          },
        ],
      },
      {
        id: "019abaf9-be96-7cda-834f-f011f0c4e918",
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
            aktenzeichen: "R 2881 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7042-ad32-c12ab0f7af8f",
              safe_id: "DE.BRAK_SPT.2c720728-1b56-4bff-8ec6-715c9e9eeb59",
              name: "Dr. Günther Weißmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be81-755c-9199-30c3022ff12c",
    aktenzeichen_gericht: "S 6198 08/2025",
    status: "Eingereicht",
    status_changed: "2025-01-29T06:21:44.522034Z",
    eingereicht_am: "2025-06-24T04:10:38.598911Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be81-78b1-b3fd-3e950e73f0c6",
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
            aktenzeichen: "K 1990 07/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be81-7e99-b59a-f55e9b681e6a",
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
    id: "019abaf9-bea6-799b-b67e-534ede0ae5af",
    aktenzeichen_gericht: "O 7313 06/2024",
    status: "Erstellt",
    status_changed: "2025-04-25T01:22:06.895302Z",
    eingereicht_am: "2025-06-18T04:06:25.947714Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea6-7566-bd9f-d1dad6937cc8",
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
            aktenzeichen: "F 7607 12/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea6-789d-9052-9a67bf56823d",
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
            aktenzeichen: "Q 8365 10/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "S 1171 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7125-9382-63a73bbdf18c",
              safe_id: "DE.BRAK_SPT.48b95e39-2f87-47ae-9824-c0a644c33f56",
              name: "Dr. Alina-Maria Krug",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be86-7396-99ca-0caf38c60442",
    aktenzeichen_gericht: "J 5932 08/2024",
    status: "Erstellt",
    status_changed: "2024-12-05T15:20:41.452409Z",
    eingereicht_am: "2025-06-17T20:08:54.834545Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be86-71b6-9d84-99c7e9659396",
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
            aktenzeichen: "Z 9777 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7b4a-b4f9-9ab7a1a2784b",
              safe_id: "DE.BRAK_SPT.7ac25c8a-5b42-4bcd-934e-cca49d0299d6",
              name: "Dr. Andreas Krämer",
            },
          },
        ],
      },
      {
        id: "019abaf9-be86-74e4-a648-00fc2c2f78e2",
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
            aktenzeichen: "Z 318 07/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7c55-9edb-258986c49dda",
              safe_id: "DE.BRAK_SPT.8d91c13e-07cf-452a-a690-d02041149662",
              name: "Rechtsanwalt Dominik-Paul-Henrik von Großmann-Kühn-Schäfer-Weißmann-Brück",
            },
          },
          {
            aktenzeichen: "J 2017 12/2026",
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
    id: "019abaf9-be75-74dd-a0ca-c02cc337cb83",
    aktenzeichen_gericht: "P 4867 07/2026",
    status: "Eingereicht",
    status_changed: "2025-01-15T02:35:41.111142Z",
    eingereicht_am: "2025-06-16T03:30:13.146294Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be76-743e-91b5-304542e327c5",
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
            aktenzeichen: "D 2518 09/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be76-7d8f-b72e-0226825b4bf8",
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
            aktenzeichen: "M 9088 03/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d97-7146-a233-a4e751bb5888",
    aktenzeichen_gericht: "Z 9425 09/2024",
    status: "Erstellt",
    status_changed: "2025-11-17T10:36:28.267235Z",
    eingereicht_am: "2025-06-08T18:11:20.082565Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d97-7899-9d39-f7e1665ff398",
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
            aktenzeichen: "T 7071 13/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d97-7ce1-8a1a-212b29ce96f1",
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
    id: "019abafa-7d68-7760-8849-868e3dc950a0",
    aktenzeichen_gericht: "F 6648 10/2024",
    status: "Erstellt",
    status_changed: "2025-03-28T09:24:13.031446Z",
    eingereicht_am: "2025-05-09T21:42:02.062221Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d68-7250-89bf-2f0faf061d9b",
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
            aktenzeichen: "E 7984 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7e0a-a2d4-c5fb3bd5258d",
              safe_id: "DE.BRAK_SPT.77532984-7cad-423a-9d96-cd05592a2942",
              name: "Dr. Leonhard-Sebastian Philipp von Möser-Schäfer",
            },
          },
        ],
      },
      {
        id: "019abafa-7d68-7356-8357-2259d7ce971b",
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
    ],
  },
  {
    id: "019abafa-7d93-7579-8354-3aa023bdbd7a",
    aktenzeichen_gericht: "C 4018 01/2024",
    status: "Erstellt",
    status_changed: "2025-08-02T21:27:16.937464Z",
    eingereicht_am: "2025-05-04T22:17:50.232426Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d93-7f97-8a7e-86fec5c03e0a",
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
            aktenzeichen: "X 8647 09/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d94-7aca-896f-9617f28e74d3",
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
            aktenzeichen: "U 2086 12/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7b4a-b4f9-9ab7a1a2784b",
              safe_id: "DE.BRAK_SPT.7ac25c8a-5b42-4bcd-934e-cca49d0299d6",
              name: "Dr. Andreas Krämer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5d-7327-9382-1be2c146c414",
    aktenzeichen_gericht: "C 2528 06/2025",
    status: "Eingereicht",
    status_changed: "2025-03-20T02:32:09.95864Z",
    eingereicht_am: "2025-04-23T20:52:16.557352Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5d-72c5-853c-874bf727fa65",
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
            aktenzeichen: "Y 8977 02/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5d-7dab-a9fe-6999faae799c",
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
    id: "019abafa-7d5a-7756-88b3-7e2ba1fa7ff3",
    aktenzeichen_gericht: "I 1449 02/2026",
    status: "Eingereicht",
    status_changed: "2025-07-12T04:39:02.721622Z",
    eingereicht_am: "2025-04-21T20:23:14.968999Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5a-7935-a362-5013606f619f",
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
            aktenzeichen: "W 6449 10/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "W 890 02/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7ee5-b4f1-f02367cc0c80",
              safe_id: "DE.BRAK_SPT.4656c5b4-ba5b-47e4-a985-9d930920e3a0",
              name: "Rechtsanwalt Dr. Florian Schön",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5a-7cd7-86c8-0569d364f34f",
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
            aktenzeichen: "K 668 10/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be67-7ba0-9516-559990a43ddb",
    aktenzeichen_gericht: "H 3598 06/2025",
    status: "Erstellt",
    status_changed: "2025-04-10T01:14:04.61597Z",
    eingereicht_am: "2025-04-18T04:38:02.111686Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6b-7af3-8a64-12853c400dc4",
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
            aktenzeichen: "P 4699 02/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6b-7cab-bc85-cbfa2ec11203",
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
            aktenzeichen: "Q 5863 08/2025",
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
    id: "019abaf9-be99-7554-8161-f684f005a61d",
    aktenzeichen_gericht: "N 6232 08/2025",
    status: "Eingereicht",
    status_changed: "2025-02-22T23:06:59.834716Z",
    eingereicht_am: "2025-03-27T19:52:27.945552Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be99-7030-ae4f-12a3e709f62a",
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
            aktenzeichen: "S 3211 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bf5-936a-11764265952d",
              safe_id: "DE.BRAK_SPT.c7e5e31d-92f6-4710-93e0-0e6f3d984e1d",
              name: "Rechtsanwalt Dr. Fabian Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-be99-7aab-a5e7-aa31e11b7e72",
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
            aktenzeichen: "Z 5260 07/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
            aktenzeichen: "B 2604 10/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d5d-b9e0-be57b9618257",
              safe_id: "DE.BRAK_SPT.ad2350fc-01e2-4574-9a50-2e243da65f1d",
              name: "Rechtsanwalt Dr. Benjamin Weiß",
            },
          },
          {
            aktenzeichen: "U 5426 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7512-b6d1-b1ff3cebe390",
              safe_id: "DE.BRAK_SPT.f441710b-d067-4d02-9aa9-cb325fba5265",
              name: "Rechtsanwalt Gabriele Kraus",
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
    id: "019abafa-7d72-7271-a954-6d05789b3e76",
    aktenzeichen_gericht: "I 6672 05/2026",
    status: "Erstellt",
    status_changed: "2025-05-22T12:46:40.396666Z",
    eingereicht_am: "2025-01-23T12:29:38.665912Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d72-7c73-b975-b1721886c2c7",
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
            aktenzeichen: "C 3359 10/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d73-7975-b354-99830e6e3da2",
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
    id: "019abafa-7d6a-7edb-95fa-c258b77d30a6",
    aktenzeichen_gericht: "D 3747 09/2026",
    status: "Eingereicht",
    status_changed: "2024-12-26T23:18:27.0967Z",
    eingereicht_am: "2025-01-17T12:06:07.652846Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6a-7e4e-acb4-7dca1c6dfd4f",
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
            aktenzeichen: "A 7553 02/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-74cb-9f08-f710c53e64d5",
              safe_id: "DE.BRAK_SPT.3c603108-5376-44b1-ba1a-d7cd71b45285",
              name: "Rechtsanwalt Dr. Leonhard Weiß",
            },
          },
        ],
      },
      {
        id: "019abafa-7d6a-7ff9-b4fe-c8620a3cde1b",
        name: "Paulina Küster",
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
    id: "019abafa-7d79-7483-bc46-291e0b9483aa",
    aktenzeichen_gericht: "R 2384 13/2024",
    status: "Erstellt",
    status_changed: "2025-05-24T20:32:07.434669Z",
    eingereicht_am: "2025-01-09T20:07:52.572293Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d79-71a9-a1f5-05cb45265ce1",
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
            aktenzeichen: "F 7847 10/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d79-7e98-886e-8e017b414a0b",
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
            aktenzeichen: "U 7613 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-760e-b37e-78e426914052",
              safe_id: "DE.BRAK_SPT.0b8b13fa-9db4-44ca-a4f6-330e6e0d1573",
              name: "Dr. Fabian Weißmann",
            },
          },
          {
            aktenzeichen: "O 5115 08/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-799f-859b-ad0030bf554a",
              safe_id: "DE.BRAK_SPT.2fe828c8-230a-42a3-910b-e8a6eba4569c",
              name: "Dr. Katharina Böhm",
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
            aktenzeichen: "H 3578 01/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "F 5090 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7aaa-81e0-001513bdd54c",
              safe_id: "DE.BRAK_SPT.0881de28-ce04-49ab-bfc7-9edff59ad7c5",
              name: "Dr. Johanna Groß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d87-7b9c-87cd-4bace2c40215",
    aktenzeichen_gericht: "J 5529 09/2026",
    status: "Eingereicht",
    status_changed: "2025-03-30T20:54:22.736277Z",
    eingereicht_am: "2024-12-09T11:41:03.595966Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d87-7d10-90e9-e4e06d03f9e8",
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
            aktenzeichen: "F 2638 02/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d87-7efa-be0f-010bae4d7989",
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
            aktenzeichen: "A 8085 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d5d-b9e0-be57b9618257",
              safe_id: "DE.BRAK_SPT.ad2350fc-01e2-4574-9a50-2e243da65f1d",
              name: "Rechtsanwalt Dr. Benjamin Weiß",
            },
          },
          {
            aktenzeichen: "W 3023 06/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-71cc-a5ce-3b863418c43c",
              safe_id: "DE.BRAK_SPT.5fd2a4a0-9e15-43ae-86e3-b999f70765e1",
              name: "Rechtsanwalt Dr. Johanna Möser",
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
    id: "019abafa-7d7a-7c65-b07b-4af1307c0c25",
    aktenzeichen_gericht: "U 3264 10/2026",
    status: "Eingereicht",
    status_changed: "2025-05-04T23:10:16.912518Z",
    eingereicht_am: "2024-11-17T12:38:30.735462Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7a-7c26-9707-58d0b690c510",
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
            aktenzeichen: "A 5600 02/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d7b-70eb-aed1-3739c6db0aed",
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
            aktenzeichen: "S 5553 02/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
    id: "019abafa-7d9f-7a1b-8c39-272966bfa0cb",
    aktenzeichen_gericht: "D 9122 12/2025",
    status: "Erstellt",
    status_changed: "2025-01-11T02:57:22.603747Z",
    eingereicht_am: "2024-11-12T04:38:55.464375Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d9f-7080-af01-5045416093a2",
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
            aktenzeichen: "T 4512 05/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9f-7676-8b07-dd975bcb9bb5",
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
    id: "019abafa-7d6a-76cc-8b5b-c57762b38833",
    aktenzeichen_gericht: "O 7271 05/2024",
    status: "Erstellt",
    status_changed: "2025-09-11T08:34:27.037686Z",
    eingereicht_am: "2024-11-05T08:48:39.092485Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6a-7a13-a66a-e42bb9b6a6f6",
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
            aktenzeichen: "Q 1079 12/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d6b-7857-9ff1-7c9868dccfc3",
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
            aktenzeichen: "C 3533 13/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea7-72e0-87fa-96c740da5e74",
    aktenzeichen_gericht: "T 9120 04/2025",
    status: "Erstellt",
    status_changed: "2025-05-31T08:20:33.13276Z",
    eingereicht_am: "2024-11-04T10:46:00.36334Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea7-79e1-8424-759d8f505807",
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
        id: "019abaf9-bea7-7e36-95d1-e4d96b3d018b",
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
            aktenzeichen: "F 5230 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7b14-8efe-daf00a07dfb5",
              safe_id: "DE.BRAK_SPT.2c7f6ec6-6d97-4169-92b0-50f80174d8ce",
              name: "Rechtsanwalt Dr. Andrea-Lena Vogt",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea4-77c8-a2c7-b8d491a89609",
    aktenzeichen_gericht: "C 4657 12/2026",
    status: "Erstellt",
    status_changed: "2025-02-28T05:58:42.132196Z",
    eingereicht_am: "2024-11-01T15:57:22.236721Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea4-75c8-8b66-81dc05a3489f",
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
            aktenzeichen: "F 8591 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-77f6-91fa-379176dfd710",
              safe_id: "DE.BRAK_SPT.3822e3ab-8018-4b2e-99dd-16c1aab158c7",
              name: "Rechtsanwalt Matthias Köhn",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea4-7664-8c58-4af0c8523457",
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
            aktenzeichen: "I 2436 12/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
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
    id: "019abafa-7d73-7395-a210-e6dfee3860b2",
    aktenzeichen_gericht: "S 9015 03/2025",
    status: "Erstellt",
    status_changed: "2025-07-21T21:27:38.828832Z",
    eingereicht_am: "2024-10-04T14:45:52.33515Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d73-72c6-8aa2-093692554f1e",
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
            aktenzeichen: "L 3956 11/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d73-78cb-b616-67cf3acabd2a",
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
            aktenzeichen: "T 285 05/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d94-774a-9fa6-8215a71355b2",
    aktenzeichen_gericht: "B 7755 09/2024",
    status: "Erstellt",
    status_changed: "2025-01-11T08:50:45.415683Z",
    eingereicht_am: "2024-09-30T14:02:00.323141Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d94-7136-8c54-bbefa546c24c",
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
            aktenzeichen: "A 8268 11/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d95-7f52-8182-f70d956ba683",
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
            aktenzeichen: "Z 2061 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-74dc-907a-0e35da48e3ad",
              safe_id: "DE.BRAK_SPT.555287ac-4df1-4151-960d-ebb9646ef234",
              name: "Dr. Julius Krämer",
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
            aktenzeichen: "Z 2353 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7f28-8d28-e9a960083900",
              safe_id: "DE.BRAK_SPT.73fa03ef-e4da-4814-b33c-e696797f4bff",
              name: "Rechtsanwalt Johanna-Elisabeth-Maria von Krüger-Lösch",
            },
          },
          {
            aktenzeichen: "I 2543 12/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-742c-9ff6-7c9d0b3f9270",
              safe_id: "DE.BRAK_SPT.bd2b9afb-69b9-4f7f-89af-f630558237b6",
              name: "Rechtsanwalt Tobias Möser",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be7d-72ed-bf80-7a4b11601245",
    aktenzeichen_gericht: "B 964 04/2026",
    status: "Erstellt",
    status_changed: "2024-12-30T12:26:37.749973Z",
    eingereicht_am: "2024-09-22T16:41:10.264015Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7d-7502-a156-455ceda626e2",
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
            aktenzeichen: "X 4936 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7153-b038-ec8994dddc83",
              safe_id: "DE.BRAK_SPT.2e575396-4b72-4422-9e51-ff1e27a7ba47",
              name: "Rechtsanwalt Ludwig-Leopold Alexander von Schönberg-Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-be7e-7746-bbba-728e7c100285",
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
            aktenzeichen: "K 5529 03/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abaf9-be80-7d1b-aa1f-f5e86e221b5b",
    aktenzeichen_gericht: "U 6896 03/2024",
    status: "Eingereicht",
    status_changed: "2025-02-18T16:08:49.53498Z",
    eingereicht_am: "2024-09-14T11:19:51.39414Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be80-74f8-868e-a0865c8e5f6e",
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
            aktenzeichen: "W 6812 03/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7887-9e22-e432baa94463",
              safe_id: "DE.BRAK_SPT.21283e8c-ac19-4653-bc1e-2a1f849fbbb1",
              name: "Rechtsanwalt Johannes-Benedikt Albrecht von Löwenhügel",
            },
          },
        ],
      },
      {
        id: "019abaf9-be80-76f1-bd3b-add752f037ef",
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
            aktenzeichen: "Q 7041 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7e69-85b6-5a27b3df2521",
              safe_id: "DE.BRAK_SPT.f4dc8282-9f36-4e0d-9873-0cba0b57de00",
              name: "Rechtsanwalt Dr. Johanna Weiß",
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
    id: "019abafa-7d7c-7cae-aed5-52baff67cc8c",
    aktenzeichen_gericht: "U 1708 06/2024",
    status: "Eingereicht",
    status_changed: "2025-03-22T16:00:50.631271Z",
    eingereicht_am: "2024-09-01T14:51:55.751349Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7c-7450-a346-166c936e657a",
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
            aktenzeichen: "V 113 02/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d7c-7480-afbb-05d45b992344",
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
    id: "019abafa-7d59-7832-899c-0a99b0497e00",
    aktenzeichen_gericht: "C 8171 11/2024",
    status: "Eingereicht",
    status_changed: "2025-07-07T18:56:05.099618Z",
    eingereicht_am: "2024-08-27T06:43:56.776281Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d59-7489-af97-9d24d1fec5cc",
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
            aktenzeichen: "G 5850 08/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d59-7e6b-bc36-547fa25067b5",
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
            aktenzeichen: "E 2372 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7b9c-9a63-141c8327d495",
              safe_id: "DE.BRAK_SPT.424e99b6-7a37-4ec8-837c-17ca870ccf69",
              name: "Dr. Elisa-Maria Voigt",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be92-75a0-bdbf-52b188756a87",
    aktenzeichen_gericht: "K 2995 12/2025",
    status: "Erstellt",
    status_changed: "2025-02-21T02:50:09.499383Z",
    eingereicht_am: "2024-08-16T13:10:37.663605Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be93-7798-bb80-e1fce3ffb69b",
        name: "Alexander Brück",
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
        id: "019abaf9-be93-7e04-93a3-294b6a9d3f01",
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
            aktenzeichen: "A 5254 13/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7843-879b-a99ec2b5c164",
              safe_id: "DE.BRAK_SPT.3dc07e33-606d-49f9-9f8f-565c09d6c8fa",
              name: "Rechtsanwalt Dr. Helena-Sophie Amalia von Brückner-Weißmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be6e-7bdd-9be4-3369267265dd",
    aktenzeichen_gericht: "P 5615 13/2025",
    status: "Eingereicht",
    status_changed: "2025-01-23T00:14:41.462309Z",
    eingereicht_am: "2024-08-16T06:01:37.771784Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6e-70d2-af66-55b8e8981ab2",
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
            aktenzeichen: "U 2783 06/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7b1e-a969-ce0d63e85b5d",
              safe_id: "DE.BRAK_SPT.aecfee8f-8db6-49a2-ba8e-56b2dec61173",
              name: "Rechtsanwalt Dr. Anna-Maria-Katharina-Elisabeth von Löwenstein-Kranz-Schäfer-Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6e-77ee-a779-b645d0b1aa38",
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
            aktenzeichen: "H 2075 08/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-beac-7192-b7a4-44f9d7a0658e",
    aktenzeichen_gericht: "B 4621 09/2024",
    status: "Eingereicht",
    status_changed: "2025-04-19T05:38:37.112996Z",
    eingereicht_am: "2024-08-12T10:04:34.483238Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-beac-7562-be1d-a86501100e26",
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
            aktenzeichen: "R 3200 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7aaa-81e0-001513bdd54c",
              safe_id: "DE.BRAK_SPT.0881de28-ce04-49ab-bfc7-9edff59ad7c5",
              name: "Dr. Johanna Groß",
            },
          },
        ],
      },
      {
        id: "019abaf9-beac-78cd-809e-5d8b3fc80200",
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
            aktenzeichen: "U 3613 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-71cc-a5ce-3b863418c43c",
              safe_id: "DE.BRAK_SPT.5fd2a4a0-9e15-43ae-86e3-b999f70765e1",
              name: "Rechtsanwalt Dr. Johanna Möser",
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
    id: "019abaf9-be8a-7fb3-b5de-9efa663a160d",
    aktenzeichen_gericht: "X 9211 13/2026",
    status: "Erstellt",
    status_changed: "2025-07-14T20:31:11.210974Z",
    eingereicht_am: "2024-07-20T05:44:52.604777Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be8a-758c-8370-253df7fc4fdd",
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
        id: "019abaf9-be8a-7af3-9033-8e800424b8a1",
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
            aktenzeichen: "Y 1861 13/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea7-7534-bd78-8616dc224762",
    aktenzeichen_gericht: "S 9966 08/2024",
    status: "Eingereicht",
    status_changed: "2025-07-04T09:33:14.653878Z",
    eingereicht_am: "2024-07-05T04:43:35.784125Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea8-7067-a0dc-738c1161bccb",
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
            aktenzeichen: "V 7493 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7783-b7d9-595ea49c4ec8",
              safe_id: "DE.BRAK_SPT.bccb5ebf-df3e-4a6e-a168-8b3fbc77bb32",
              name: "Rechtsanwalt Dr. Friedrich-Wilhelm Günther von Schönfeld-Krüger",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea8-7812-9673-51ebc885f7d0",
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
            aktenzeichen: "F 6082 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7b27-b97d-85b3d83a824a",
              safe_id: "DE.BRAK_SPT.bee205c2-a6a5-4dc0-bf89-43a006279ac0",
              name: "Rechtsanwalt Dr. Anna-Lena Krug",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-beac-7197-ac44-704b1ab54ed0",
    aktenzeichen_gericht: "A 5801 03/2026",
    status: "Eingereicht",
    status_changed: "2025-02-04T19:31:16.958818Z",
    eingereicht_am: "2024-07-04T20:42:43.44663Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-beac-79bb-aafb-07ce82f17c63",
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
            aktenzeichen: "K 8399 04/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d5d-b9e0-be57b9618257",
              safe_id: "DE.BRAK_SPT.ad2350fc-01e2-4574-9a50-2e243da65f1d",
              name: "Rechtsanwalt Dr. Benjamin Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-beac-7f1e-aad9-fad4155c3935",
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
            aktenzeichen: "W 7595 11/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abafa-7d69-73ca-ab1a-4a300f45b7fd",
    aktenzeichen_gericht: "B 3214 04/2026",
    status: "Eingereicht",
    status_changed: "2024-11-27T16:44:01.205784Z",
    eingereicht_am: "2024-06-08T12:40:47.680409Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d69-7747-8b08-4bee28369d85",
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
            aktenzeichen: "M 7253 07/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d69-7f0e-a704-f3890f56f31b",
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
            aktenzeichen: "B 6165 03/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be97-78d2-b201-f6d85e73c975",
    aktenzeichen_gericht: "Y 6029 04/2024",
    status: "Erstellt",
    status_changed: "2025-05-03T23:22:38.392027Z",
    eingereicht_am: "2024-06-03T15:11:05.118426Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be97-77b7-b5c5-5d3421f8418a",
        name: "Tobias-Maurer",
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
        id: "019abaf9-be97-7c29-936d-d439491eac2f",
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
            aktenzeichen: "T 2004 13/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d6d-7e57-964d-1d9944760a5e",
    aktenzeichen_gericht: "S 1582 09/2026",
    status: "Erstellt",
    status_changed: "2025-10-10T03:03:03.320939Z",
    eingereicht_am: "2024-05-26T14:47:44.821977Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6d-798d-8217-9bd8376c504d",
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
        id: "019abafa-7d6d-7e22-be34-bf7abc40782b",
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
            aktenzeichen: "V 2456 07/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7e59-8891-c719b027b99a",
              safe_id: "DE.BRAK_SPT.077a13f9-3334-4c15-b9d2-ffa82ca1dc98",
              name: "Rechtsanwalt Dr. Karl-Heinrich Ludwig von Hohenstein-Kranz",
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
    id: "019abaf9-be9c-7c51-8592-e46581a3ac1a",
    aktenzeichen_gericht: "D 9152 06/2024",
    status: "Erstellt",
    status_changed: "2025-07-07T11:45:05.860031Z",
    eingereicht_am: "2024-04-29T01:32:38.96145Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be9c-7336-a854-3f98c1f9f676",
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
            aktenzeichen: "S 6821 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7665-b250-877da911f941",
              safe_id: "DE.BRAK_SPT.57ea75d6-a004-4f2c-b2e2-83c33fcf42ad",
              name: "Rechtsanwalt Gabriele-Luise-Friederike von der Lindenau-Küster-Schönfeld-Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-be9c-787e-a749-aea01c37a199",
        name: "Ludwig-Konstantin-Maximilian von Schönwald-Küster-Schäfer-Weißmann",
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
    id: "019abaf9-be7f-733c-907b-a2125a477486",
    aktenzeichen_gericht: "R 6980 02/2024",
    status: "Erstellt",
    status_changed: "2025-03-19T13:56:17.442401Z",
    eingereicht_am: "2024-04-24T03:11:22.651763Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7f-74ce-a2eb-a1f16928aace",
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
            aktenzeichen: "X 4882 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d73-bf2c-23f7828bd429",
              safe_id: "DE.BRAK_SPT.32ad2a4a-d385-49b6-b49e-62a693bd7e40",
              name: "Dr. Johanna-Lina Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be80-7a53-9770-99e71d642881",
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
    ],
  },
  {
    id: "019abafa-7d5b-7f79-bcf3-2f80028065e7",
    aktenzeichen_gericht: "D 8002 03/2025",
    status: "Erstellt",
    status_changed: "2025-09-20T05:06:14.043458Z",
    eingereicht_am: "2024-04-22T19:21:35.583347Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5b-7919-a19b-da2c08d19f00",
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
            aktenzeichen: "I 5206 11/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5b-7a43-b2ef-afd72a7aac8a",
        name: "Matthias-Lorenz-Friedrich von der Löschau-Krüger-Schönfeld-Weiß",
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
    id: "019abafa-7d6c-7840-b87e-2da7ed41d90c",
    aktenzeichen_gericht: "F 436 03/2024",
    status: "Eingereicht",
    status_changed: "2025-10-30T09:34:03.329498Z",
    eingereicht_am: "2024-04-20T03:46:47.690009Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6c-7950-8306-2992b4d39642",
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
            aktenzeichen: "Y 3228 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7512-b6d1-b1ff3cebe390",
              safe_id: "DE.BRAK_SPT.f441710b-d067-4d02-9aa9-cb325fba5265",
              name: "Rechtsanwalt Gabriele Kraus",
            },
          },
        ],
      },
      {
        id: "019abafa-7d6c-7f5e-b125-b2f8255a9b0a",
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
            aktenzeichen: "U 9075 10/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
            aktenzeichen: "H 5019 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-74e3-b190-628d03213d70",
              safe_id: "DE.BRAK_SPT.dd3cc80c-b772-47e3-a52b-d1817256267f",
              name: "Rechtsanwalt Benedikt Weiß",
            },
          },
          {
            aktenzeichen: "L 5059 07/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7e61-bd15-fef49a678bef",
              safe_id: "DE.BRAK_SPT.6007f82b-d8c8-4ad0-a36e-83215efcee95",
              name: "Dr. Annemarie Scholz",
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
    id: "019abaf9-be87-78e4-bc59-9a6d01bde7f2",
    aktenzeichen_gericht: "E 9599 01/2025",
    status: "Eingereicht",
    status_changed: "2025-04-07T01:35:32.585632Z",
    eingereicht_am: "2024-04-05T01:00:09.169409Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be87-77ac-a96a-15f96352b4c8",
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
            aktenzeichen: "P 5265 01/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be88-792e-b398-574229d77bcb",
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
            aktenzeichen: "U 4907 07/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be8e-76fe-aa4b-2562082f98af",
    aktenzeichen_gericht: "K 2768 03/2026",
    status: "Erstellt",
    status_changed: "2025-08-11T03:01:35.984788Z",
    eingereicht_am: "2024-03-31T17:21:30.145514Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be8f-7167-bb43-9c61ea1ee158",
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
            aktenzeichen: "J 6779 10/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "M 9546 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d21-a404-bea3b68c361b",
              safe_id: "DE.BRAK_SPT.2198b2bc-ccab-4805-bbbb-ab815e6698c5",
              name: "Rechtsanwalt Tobias-Matthias Alexander von Krämer-Böhler",
            },
          },
        ],
      },
      {
        id: "019abaf9-be8f-72a6-b318-5ebf8648b099",
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
            aktenzeichen: "M 8286 07/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea9-710b-bb8d-d1f65f10400b",
    aktenzeichen_gericht: "I 2965 10/2025",
    status: "Eingereicht",
    status_changed: "2025-05-01T19:46:32.43529Z",
    eingereicht_am: "2024-03-29T08:56:41.465689Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea9-74c0-885a-d605501c416e",
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
            aktenzeichen: "C 8869 03/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea9-7f57-ae65-7502be8b7c69",
        name: "Klaus Schäfer",
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
    id: "019abafa-7da0-707b-946b-76bf3c0fbce3",
    aktenzeichen_gericht: "R 2000 03/2025",
    status: "Eingereicht",
    status_changed: "2025-06-21T17:06:43.225279Z",
    eingereicht_am: "2024-03-23T11:44:00.174905Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7da1-7418-89b8-ff38b45a447e",
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
            aktenzeichen: "D 219 07/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7da1-78e4-8438-4968fb1cac99",
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
            aktenzeichen: "U 2193 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7305-82ca-d1a6f02d0417",
              safe_id: "DE.BRAK_SPT.64231082-7cce-4e39-9635-c80bdcf9b26d",
              name: "Rechtsanwalt Andreas Groß",
            },
          },
          {
            aktenzeichen: "S 1162 11/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be91-7b6f-98ee-6599b6e6e93b",
    aktenzeichen_gericht: "G 6218 13/2024",
    status: "Eingereicht",
    status_changed: "2025-04-10T15:01:42.854365Z",
    eingereicht_am: "2024-03-16T08:01:10.163458Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-be91-79f1-b15c-3d9c8241395c",
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
            aktenzeichen: "S 1477 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-79d6-9992-e3447ced5129",
              safe_id: "DE.BRAK_SPT.cda6d2bf-e357-49a2-9d32-eb2264c7d268",
              name: "Rechtsanwalt Dr. Ludwig-Konstantin-Maximilian von Schönwald-Küster-Schäfer-Weißmann",
            },
          },
        ],
      },
      {
        id: "019abaf9-be92-7c05-a042-2b178f4c70cf",
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
            aktenzeichen: "Y 1817 09/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "H 2841 03/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7c84-8aea-c2e132a9888c",
              safe_id: "DE.BRAK_SPT.e98eb43c-d6ba-4756-991b-0b00a8063455",
              name: "Rechtsanwalt Janina Müller",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea6-74e1-a701-dca1b29e73d3",
    aktenzeichen_gericht: "P 8302 02/2025",
    status: "Eingereicht",
    status_changed: "2025-06-25T12:07:04.890894Z",
    eingereicht_am: "2024-03-07T10:43:03.504646Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea6-7875-811d-0d02d2f013ef",
        name: "Gabriele-Luise-Friederike von der Lindenau-Küster-Schönfeld-Weiß",
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
        id: "019abaf9-bea6-7cb5-a37e-419043eb0a96",
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
            aktenzeichen: "N 2508 08/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be70-7107-a7ea-e916ed123147",
    aktenzeichen_gericht: "L 9750 09/2026",
    status: "Eingereicht",
    status_changed: "2025-08-18T18:50:03.600682Z",
    eingereicht_am: "2024-03-03T01:54:57.636453Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be71-702d-b303-029fd5410a9b",
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
            aktenzeichen: "R 6460 07/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7502-a665-24b3a0d8ce89",
              safe_id: "DE.BRAK_SPT.208e9347-874d-498c-8086-bd16a9858edb",
              name: "Dr. Dominik Weiß",
            },
          },
          {
            aktenzeichen: "N 8268 08/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be71-7585-a55b-bc510c9437f8",
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
            aktenzeichen: "M 1386 11/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea9-78e3-97da-da6d58f7eda2",
    aktenzeichen_gericht: "N 9410 09/2024",
    status: "Erstellt",
    status_changed: "2025-07-03T12:45:50.076028Z",
    eingereicht_am: "2024-02-18T14:23:50.011305Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea9-77fa-8737-038bf24f1e68",
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
            aktenzeichen: "T 859 13/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea9-77fc-a8d0-c709aa631d67",
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
            aktenzeichen: "R 8889 03/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "J 9661 06/2025",
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
    id: "019abafa-7d91-741c-af37-1aaaba14a798",
    aktenzeichen_gericht: "O 2216 06/2026",
    status: "Eingereicht",
    status_changed: "2025-05-20T11:30:39.926325Z",
    eingereicht_am: "2024-01-28T23:32:03.193071Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d91-7358-a3b8-cb5ba0ca76d7",
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
            aktenzeichen: "W 6690 09/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d91-7d79-b946-bb23cbd368ac",
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
            aktenzeichen: "F 9862 07/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7265-a99b-41bf9ebf23ab",
              safe_id: "DE.BRAK_SPT.786e6583-ddda-4a6d-81ca-374a855dd1f4",
              name: "Dr. Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
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
    id: "019abaf9-bea1-7638-9ab6-05f9e81b7d2d",
    aktenzeichen_gericht: "E 2536 02/2026",
    status: "Erstellt",
    status_changed: "2025-10-17T03:06:57.440871Z",
    eingereicht_am: "2024-01-14T06:32:23.766348Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea1-79f3-be4e-593f69028ed7",
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
            aktenzeichen: "U 7655 12/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea2-7bf4-a02e-385ce0c2575c",
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
            aktenzeichen: "X 4826 08/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abaf9-be77-7f61-8f83-19134cbe212d",
    aktenzeichen_gericht: "P 7745 09/2026",
    status: "Eingereicht",
    status_changed: "2025-06-25T15:58:43.527369Z",
    eingereicht_am: "2024-01-01T06:58:15.396251Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be77-78c4-8fc7-f87870e55328",
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
            aktenzeichen: "O 5724 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d58-9803-3037a963a92d",
              safe_id: "DE.BRAK_SPT.6e7b8f1b-f3a3-4806-9dac-9d88e04d23af",
              name: "Dr. Lena-Maria Böhm",
            },
          },
          {
            aktenzeichen: "A 4007 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7bfc-936f-f0c738df2221",
              safe_id: "DE.BRAK_SPT.30241b27-f123-48eb-9e5e-45399dd70102",
              name: "Dr. Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-be77-78de-8971-519c38f6e48c",
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
            aktenzeichen: "N 6220 03/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
            aktenzeichen: "S 2109 01/2025",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "Y 8792 13/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7250-97cc-716960f003c1",
              safe_id: "DE.BRAK_SPT.7801ac24-5925-47a0-b4f9-396005fb0f62",
              name: "Rechtsanwalt Dr. Christoph Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea7-760a-b2f7-7680bfc86f1d",
    aktenzeichen_gericht: "T 4837 13/2025",
    status: "Erstellt",
    status_changed: "2025-09-11T20:49:42.826987Z",
    eingereicht_am: "2023-12-30T14:32:39.355553Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea7-700f-8893-60ae91862a7c",
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
            aktenzeichen: "B 6198 10/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7e13-b929-10e45c7b8245",
              safe_id: "DE.BRAK_SPT.0f3a3fed-f674-4a59-a9e4-84b8b3283389",
              name: "Rechtsanwalt Wolfgang Kühn",
            },
          },
          {
            aktenzeichen: "A 6711 01/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea7-7745-88d4-019812012294",
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
            aktenzeichen: "G 5646 01/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abaf9-be6f-7f7f-81a0-32a079fdbc4a",
    aktenzeichen_gericht: "A 4186 13/2026",
    status: "Erstellt",
    status_changed: "2025-10-28T19:28:43.74839Z",
    eingereicht_am: "2023-12-19T19:21:16.890407Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6f-7445-bf57-dc1a0e9093d1",
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
            aktenzeichen: "S 8109 09/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6f-7566-9b4a-c8c004737e8e",
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
    id: "019abafa-7d9e-7275-84a2-f7685cfdcb48",
    aktenzeichen_gericht: "A 680 08/2025",
    status: "Eingereicht",
    status_changed: "2024-11-29T14:40:03.302479Z",
    eingereicht_am: "2023-12-18T22:27:27.524028Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d9e-714a-99c5-c882542375fc",
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
            aktenzeichen: "L 3645 11/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9e-732b-8e0d-7752a37f71a6",
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
    id: "019abafa-7d8c-7023-9426-4aeef66a8df7",
    aktenzeichen_gericht: "Q 296 06/2026",
    status: "Eingereicht",
    status_changed: "2025-07-15T17:25:20.136555Z",
    eingereicht_am: "2023-12-11T15:29:34.89242Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d8c-74b6-9eb2-d83468fe5ea8",
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
            aktenzeichen: "H 6540 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7702-81c6-f0c4ebd81a87",
              safe_id: "DE.BRAK_SPT.512e7f04-8fa5-445b-8769-b2da723d7d62",
              name: "Rechtsanwalt Fabian Groß",
            },
          },
        ],
      },
      {
        id: "019abafa-7d8c-7bf3-95c0-20902a58a73e",
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
            aktenzeichen: "V 8760 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d15-b811-cd4191a4752a",
              safe_id: "DE.BRAK_SPT.35812061-57d0-4f13-8dfb-df8b9fee3e58",
              name: "Dr. Benedikt-Lorenz von Löwenau-Schönfeld",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d67-77fb-8ff0-7fd278e1192a",
    aktenzeichen_gericht: "J 6094 04/2025",
    status: "Eingereicht",
    status_changed: "2025-09-08T22:39:20.444874Z",
    eingereicht_am: "2023-12-11T14:15:59.332146Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d67-75a6-b769-890910100db9",
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
        id: "019abafa-7d67-7e85-904f-d680d5b34474",
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
            aktenzeichen: "M 1706 09/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d78-7f14-8ef7-79d782165b8c",
    aktenzeichen_gericht: "Z 4511 08/2025",
    status: "Erstellt",
    status_changed: "2025-01-24T12:08:18.067655Z",
    eingereicht_am: "2023-11-30T10:40:52.249643Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d78-7470-8687-4124bc31e5e0",
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
            aktenzeichen: "V 2767 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7523-be27-db854244dde6",
              safe_id: "DE.BRAK_SPT.a795399f-53ad-4dde-bd17-0dee2e2887e9",
              name: "Rechtsanwalt Melanie Schäfer",
            },
          },
          {
            aktenzeichen: "E 2569 10/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d78-780d-b830-d4ab7a231514",
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
            aktenzeichen: "V 7658 11/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d60-77df-82f3-8e315665372f",
    aktenzeichen_gericht: "U 4223 08/2024",
    status: "Eingereicht",
    status_changed: "2025-07-07T12:08:05.16817Z",
    eingereicht_am: "2023-11-28T21:50:16.160261Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d60-74a5-9c6c-fa801b4f9a1b",
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
      {
        id: "019abafa-7d60-7c03-93ae-e8709489931a",
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
            aktenzeichen: "C 6656 06/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be72-7526-a4c5-c611ad97efae",
    aktenzeichen_gericht: "Q 388 04/2025",
    status: "Erstellt",
    status_changed: "2025-09-23T07:16:52.818159Z",
    eingereicht_am: "2023-11-28T03:17:14.813023Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be72-79b2-a47a-2f0fa8b83bd0",
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
            aktenzeichen: "J 6285 01/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be72-7bf2-8b60-4e1aa602b19c",
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
            aktenzeichen: "D 1869 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7515-90cb-ec8ddb29a74d",
              safe_id: "DE.BRAK_SPT.535a2910-751e-4c40-8e66-49bb28d8ac47",
              name: "Rechtsanwalt Dr. Christoph-Michael von und zu Großmann-Weiß",
            },
          },
          {
            aktenzeichen: "R 8819 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7ee5-b4f1-f02367cc0c80",
              safe_id: "DE.BRAK_SPT.4656c5b4-ba5b-47e4-a985-9d930920e3a0",
              name: "Rechtsanwalt Dr. Florian Schön",
            },
          },
        ],
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
            aktenzeichen: "D 4629 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-76d9-ad49-d44603be9cac",
              safe_id: "DE.BRAK_SPT.4aaa1fe3-eed8-4ccc-ba19-3026107eec1d",
              name: "Rechtsanwalt Dr. Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
            },
          },
          {
            aktenzeichen: "W 7727 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7ad7-b9f4-9086ab48f5ab",
              safe_id: "DE.BRAK_SPT.3c2c9543-7f5a-4c1b-bd13-5c59043b1fdd",
              name: "Rechtsanwalt Dr. Elisabeth Köhn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d6c-7553-8690-d7c810b8fd13",
    aktenzeichen_gericht: "H 4971 05/2024",
    status: "Eingereicht",
    status_changed: "2025-10-14T10:04:12.246314Z",
    eingereicht_am: "2023-11-09T03:38:15.310412Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6d-7b09-91be-6db3dd86675d",
        name: "Tobias Groß",
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
        id: "019abafa-7d6d-7f49-8d34-9c1ea89f6e86",
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
            aktenzeichen: "P 7764 13/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be6c-7ce0-8efd-80b3c81ad3f6",
    aktenzeichen_gericht: "J 1400 01/2026",
    status: "Erstellt",
    status_changed: "2025-09-04T17:10:23.049876Z",
    eingereicht_am: "2023-11-08T14:07:27.969769Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6d-7154-a7f3-fafe799e29a6",
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
            aktenzeichen: "M 1945 04/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6d-7f14-90a6-58b28a8266f9",
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
            aktenzeichen: "U 2753 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7395-a476-023bffe4904d",
              safe_id: "DE.BRAK_SPT.6d745d61-451d-44a4-bc27-7ed05e10fe36",
              name: "Rechtsanwalt Alexander-Theodor Benjamin von Küster-Braun",
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
    id: "019abafa-7d99-775e-92e2-ab2b32c9b04b",
    aktenzeichen_gericht: "K 9669 05/2024",
    status: "Eingereicht",
    status_changed: "2025-03-11T20:48:50.673925Z",
    eingereicht_am: "2023-10-17T22:05:40.570823Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d99-7a10-8997-0a6f14822e4c",
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
            aktenzeichen: "I 5368 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-7024-8393-10d5595ed59a",
              safe_id: "DE.BRAK_SPT.8ed75643-c44d-4213-a459-f3689ed1824e",
              name: "Dr. Paulina Krüger",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9a-7c0a-918f-4eba609c3d59",
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
            aktenzeichen: "M 7286 03/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7f28-8d28-e9a960083900",
              safe_id: "DE.BRAK_SPT.73fa03ef-e4da-4814-b33c-e696797f4bff",
              name: "Rechtsanwalt Johanna-Elisabeth-Maria von Krüger-Lösch",
            },
          },
          {
            aktenzeichen: "K 1949 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7b6e-ba6d-9d9df08e94b1",
              safe_id: "DE.BRAK_SPT.70ae0eef-f0af-4b2a-83e2-a90c6e9531eb",
              name: "Dr. Karolin Weiß",
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
    id: "019abafa-7da5-7be3-a81b-9524ee21d9e2",
    aktenzeichen_gericht: "E 9942 06/2024",
    status: "Eingereicht",
    status_changed: "2025-09-14T14:15:17.326378Z",
    eingereicht_am: "2023-10-14T23:01:41.19405Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7da5-7c61-b4b6-e2bfb75f3588",
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
            aktenzeichen: "J 6175 13/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7da5-7e2e-95ec-668ca9d08ba8",
        name: "Dieter-Maurer",
        rollen: [
          {
            id: "b727131c-0c32-91ba-3eaa-f44405967b6d",
            wert: "Beklagte(r)",
            code: "028",
          },
        ],
        prozessbevollmaechtigte: [
          {
            aktenzeichen: "D 5245 08/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d54-7610-aa16-939c39485e7a",
    aktenzeichen_gericht: "A 4471 08/2024",
    status: "Erstellt",
    status_changed: "2025-07-07T20:44:13.453911Z",
    eingereicht_am: "2023-10-11T06:38:54.81294Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d57-7c5e-bd1a-70ffdfc96153",
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
            aktenzeichen: "J 6309 08/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d58-7381-b134-2df6a2f47a79",
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
            aktenzeichen: "H 7675 06/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d88-7155-8905-85d3b7cc6ac8",
    aktenzeichen_gericht: "T 6436 05/2026",
    status: "Erstellt",
    status_changed: "2025-01-24T04:57:38.726799Z",
    eingereicht_am: "2023-10-10T01:09:06.426875Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d88-7159-91ff-1f04841e98d1",
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
            aktenzeichen: "Z 5954 03/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d88-79ba-9deb-95ded873a833",
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
            aktenzeichen: "C 5253 13/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
    id: "019abafa-7d69-73e5-a1fe-b9b37fce6c6a",
    aktenzeichen_gericht: "D 5086 11/2024",
    status: "Eingereicht",
    status_changed: "2025-09-13T08:01:01.325425Z",
    eingereicht_am: "2023-10-05T11:08:12.749291Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d69-7070-ac83-15dde4acf2de",
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
            aktenzeichen: "H 3968 12/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7b14-8efe-daf00a07dfb5",
              safe_id: "DE.BRAK_SPT.2c7f6ec6-6d97-4169-92b0-50f80174d8ce",
              name: "Rechtsanwalt Dr. Andrea-Lena Vogt",
            },
          },
        ],
      },
      {
        id: "019abafa-7d69-7c55-8b1a-1f9256ab2eca",
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
            aktenzeichen: "D 7762 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-789e-9c78-57acb11caef0",
              safe_id: "DE.BRAK_SPT.7f1179fb-def3-4619-9cae-5d80c3e3d946",
              name: "Dr. Helene-Marie Augusta von Schwanenburg-Weiß",
            },
          },
        ],
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
    id: "019abafa-7d8b-7260-a103-e1dfa63e4556",
    aktenzeichen_gericht: "E 6997 06/2026",
    status: "Eingereicht",
    status_changed: "2025-08-18T11:44:15.72047Z",
    eingereicht_am: "2023-09-10T02:57:16.241081Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d8b-71a4-a8eb-a67e59c7f156",
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
            aktenzeichen: "Q 9260 13/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d8b-7922-850a-0d3debb74121",
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
            aktenzeichen: "B 9905 12/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
    id: "019abafa-7d9d-719b-a4bf-e2f65cdf4b15",
    aktenzeichen_gericht: "Z 9970 01/2025",
    status: "Erstellt",
    status_changed: "2025-08-15T19:06:05.11063Z",
    eingereicht_am: "2023-08-24T14:09:55.416002Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d9e-707c-8797-08772e1bc3ad",
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
            aktenzeichen: "M 4680 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-77fd-83a0-fb16ddcaf030",
              safe_id: "DE.BRAK_SPT.33dbccad-c479-49d0-92dd-de03390a47db",
              name: "Rechtsanwalt Matthias-Friedrich-Wilhelm von Löwenstein-Krüger-Schäfer-Weiß",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9e-7531-a566-5395d694fc4e",
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
            aktenzeichen: "Y 1943 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7dc2-a58f-663d5675f761",
              safe_id: "DE.BRAK_SPT.9fba0990-ae65-4bef-9eb8-b9b1b9d194f8",
              name: "Rechtsanwalt Dr. Sabine Großmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d74-7579-91f5-cef0f62a6950",
    aktenzeichen_gericht: "F 4656 08/2024",
    status: "Eingereicht",
    status_changed: "2025-11-10T23:47:19.313951Z",
    eingereicht_am: "2023-08-21T22:31:57.912815Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d74-7d8c-820c-cff2f4056e05",
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
            aktenzeichen: "O 9826 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-708e-b6c1-4dbdeef4c562",
              safe_id: "DE.BRAK_SPT.cf796ac6-7404-485d-b9c3-729c492ed0b8",
              name: "Dr. Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abafa-7d75-7f40-83f4-4272e3169757",
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
            aktenzeichen: "M 2838 11/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "S 8900 13/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7f6b-aed4-cd4a5d703fd2",
              safe_id: "DE.BRAK_SPT.b55141f4-feef-41e9-bbc9-e2ace539ed38",
              name: "Rechtsanwalt Friedrich Scholz",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea6-7905-9d40-cab80ef1b28e",
    aktenzeichen_gericht: "F 3103 13/2024",
    status: "Erstellt",
    status_changed: "2025-08-15T09:02:39.97658Z",
    eingereicht_am: "2023-08-18T19:51:18.081692Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea6-708a-a88c-30ad6cf52517",
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
            aktenzeichen: "C 5311 13/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-77fd-83a0-fb16ddcaf030",
              safe_id: "DE.BRAK_SPT.33dbccad-c479-49d0-92dd-de03390a47db",
              name: "Rechtsanwalt Matthias-Friedrich-Wilhelm von Löwenstein-Krüger-Schäfer-Weiß",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea6-7363-8e92-a1127f9aedd3",
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
            aktenzeichen: "X 901 07/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be98-77cc-81e9-f0c792cbc017",
    aktenzeichen_gericht: "R 4861 05/2026",
    status: "Erstellt",
    status_changed: "2025-11-07T18:55:06.491632Z",
    eingereicht_am: "2023-08-17T12:21:01.013464Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be98-7473-bb69-ab98c7214f1a",
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
            aktenzeichen: "M 724 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7512-b6d1-b1ff3cebe390",
              safe_id: "DE.BRAK_SPT.f441710b-d067-4d02-9aa9-cb325fba5265",
              name: "Rechtsanwalt Gabriele Kraus",
            },
          },
          {
            aktenzeichen: "F 7591 13/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-71d3-8d55-1c6d062c0842",
              safe_id: "DE.BRAK_SPT.ccb7334e-b9e2-40e1-978d-645faf030b61",
              name: "Dr. Luisa-Maria Roth",
            },
          },
        ],
      },
      {
        id: "019abaf9-be98-7eca-9854-304fd3203ab4",
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
            aktenzeichen: "O 9495 03/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bd2-a8ff-993d5d5a73f7",
              safe_id: "DE.BRAK_SPT.d1bd24da-fcc6-4708-b957-0a43b4825a1f",
              name: "Rechtsanwalt Markus Höhn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be79-7c5b-b646-2e45ea1ce7e9",
    aktenzeichen_gericht: "S 538 06/2024",
    status: "Eingereicht",
    status_changed: "2025-10-10T11:06:11.908934Z",
    eingereicht_am: "2023-08-14T01:28:06.236647Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7a-7a47-bf6f-2d82e9de1008",
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
            aktenzeichen: "Q 4768 02/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7a20-aa11-83453beed2a2",
              safe_id: "DE.BRAK_SPT.4fa6d741-7703-417f-8f04-b0288e5e3e12",
              name: "Rechtsanwalt Katharina-Elisabeth von der Hohenau-Müller",
            },
          },
        ],
      },
      {
        id: "019abaf9-be7a-7ca5-bbe6-2c944c75f15c",
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
            aktenzeichen: "W 9891 04/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea3-7c82-a134-5678a2062cde",
    aktenzeichen_gericht: "W 4113 13/2025",
    status: "Eingereicht",
    status_changed: "2025-10-09T05:22:33.443248Z",
    eingereicht_am: "2023-08-12T19:22:56.73327Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea3-7009-86e5-b7d67958b260",
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
            aktenzeichen: "S 6000 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7152-9fd5-ae47643e7bd1",
              safe_id: "DE.BRAK_SPT.b2c77f31-7557-4daf-81ba-0a602ad8fd47",
              name: "Dr. Dieter Mönch",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea3-70c1-b4f7-0122ce44cc80",
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
            aktenzeichen: "B 4273 06/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be93-76d3-a84a-b55e215b3b11",
    aktenzeichen_gericht: "K 9922 08/2024",
    status: "Erstellt",
    status_changed: "2025-07-17T15:39:40.956949Z",
    eingereicht_am: "2023-08-05T12:50:06.820393Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be93-7323-b7cd-1db4a0b3a194",
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
            aktenzeichen: "X 137 07/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be94-7fe7-b657-4e50d9e04da6",
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
            aktenzeichen: "X 1629 11/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be97-79d4-9836-c6b3a08f1716",
    aktenzeichen_gericht: "Y 6143 13/2026",
    status: "Eingereicht",
    status_changed: "2024-12-20T13:06:40.86192Z",
    eingereicht_am: "2023-08-01T16:30:56.471941Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be97-7f50-a932-5b282026e78a",
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
            aktenzeichen: "M 4314 08/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7ca9-8536-9e5602085005",
              safe_id: "DE.BRAK_SPT.679d6c39-ad60-418c-afde-5efd38ffefd2",
              name: "Dr. Friedrich-Johannes-Karl von Bärenfels-Schön-Küster-Weißmann",
            },
          },
        ],
      },
      {
        id: "019abaf9-be97-7f9d-b264-b0474229d67f",
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
            aktenzeichen: "U 4309 05/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7fa9-bae8-178d7e26fd5f",
              safe_id: "DE.BRAK_SPT.3dfeef6a-48af-495e-844a-4bc4dba382f7",
              name: "Rechtsanwalt Dr. Miriam Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be99-7a2e-9627-885f37616b22",
    aktenzeichen_gericht: "X 2607 13/2026",
    status: "Eingereicht",
    status_changed: "2025-02-17T23:12:19.780794Z",
    eingereicht_am: "2023-07-31T15:36:15.516423Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be99-7850-af0f-749277a70d64",
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
            aktenzeichen: "S 6750 11/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be99-7c7d-9822-4d89fb3f3d32",
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
            aktenzeichen: "T 6473 09/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d8e-7d26-a16b-8f54231d1962",
    aktenzeichen_gericht: "M 8746 05/2025",
    status: "Eingereicht",
    status_changed: "2025-07-02T04:46:53.005245Z",
    eingereicht_am: "2023-07-29T02:17:42.868646Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d8e-708b-9802-faf251e0d408",
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
            aktenzeichen: "F 4133 03/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d8e-76f3-85ff-6294971eb2d5",
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
            aktenzeichen: "Y 1533 03/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d87-723a-bf71-7cf69ba77b19",
    aktenzeichen_gericht: "I 6547 08/2026",
    status: "Erstellt",
    status_changed: "2025-10-01T20:58:20.734941Z",
    eingereicht_am: "2023-07-17T04:26:09.566414Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d87-7233-a225-c1b9b7e547a6",
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
            aktenzeichen: "S 8356 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-727e-a96b-6cb2ea7a67d7",
              safe_id: "DE.BRAK_SPT.5ab8b11c-a9ac-4e88-829f-8b94526b298e",
              name: "Rechtsanwalt Dr. Sebastian Löhr",
            },
          },
        ],
      },
      {
        id: "019abafa-7d87-7ca5-97b4-922993deee09",
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
            aktenzeichen: "I 6243 04/2025",
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
    id: "019abafa-7d90-719c-b998-2a16c877f589",
    aktenzeichen_gericht: "X 871 10/2024",
    status: "Erstellt",
    status_changed: "2025-03-18T23:54:05.584453Z",
    eingereicht_am: "2023-07-08T13:18:23.132857Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d90-7ce3-9269-987c465c775e",
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
        id: "019abafa-7d90-7e95-a62e-5251d82eae59",
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
            aktenzeichen: "P 1301 03/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be98-73fb-a9ce-3a1167a7b622",
    aktenzeichen_gericht: "Y 5843 07/2024",
    status: "Eingereicht",
    status_changed: "2025-11-18T11:44:57.029337Z",
    eingereicht_am: "2023-06-26T21:14:04.451882Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be98-74ed-89d8-51c92498aa8d",
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
            aktenzeichen: "H 317 01/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be98-750c-9c62-e9fa8ef8850c",
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
            aktenzeichen: "Q 4170 06/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "Q 1550 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d03-a3db-d075dbe7b745",
              safe_id: "DE.BRAK_SPT.599967ae-1295-4ab0-af1f-cbb0763d6a55",
              name: "Dr. Kathrin Hölzer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5b-7e93-9ae9-222ef2e5430f",
    aktenzeichen_gericht: "O 8769 07/2024",
    status: "Erstellt",
    status_changed: "2025-08-11T07:13:05.919777Z",
    eingereicht_am: "2023-06-24T10:59:38.229Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5b-7257-b709-406801e7683c",
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
            aktenzeichen: "H 2906 10/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5b-74c0-8eed-e350affd5601",
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
            aktenzeichen: "B 4068 02/2024",
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
  {
    id: "019abafa-7d9a-74c8-aa70-0161fda36bc3",
    aktenzeichen_gericht: "G 1005 03/2025",
    status: "Eingereicht",
    status_changed: "2025-05-05T22:48:08.533678Z",
    eingereicht_am: "2023-06-22T09:30:02.45222Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d9b-74ef-92b8-23f52026e6a4",
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
            aktenzeichen: "I 9852 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-78d3-9a92-3859048c3a22",
              safe_id: "DE.BRAK_SPT.ff2ad61d-87cf-428c-9e8e-2365e95d3cf1",
              name: "Rechtsanwalt Patrick Löhr",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9b-780c-90bd-6d4c30ef5e8b",
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
            aktenzeichen: "B 1684 09/2026",
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
    id: "019abafa-7d7e-72cb-b952-7ed3a7e14bcb",
    aktenzeichen_gericht: "C 1844 02/2025",
    status: "Eingereicht",
    status_changed: "2025-06-15T22:48:25.238994Z",
    eingereicht_am: "2023-06-19T10:11:54.855469Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7e-76fc-ba2a-a6813ebcd8ea",
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
            aktenzeichen: "Z 982 05/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-76d9-ad49-d44603be9cac",
              safe_id: "DE.BRAK_SPT.4aaa1fe3-eed8-4ccc-ba19-3026107eec1d",
              name: "Rechtsanwalt Dr. Tobias-Günther-Ferdinand von und zu Bärenstein-Schäfer-Krüger",
            },
          },
        ],
      },
      {
        id: "019abafa-7d7f-72a4-bea0-426218776f86",
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
            aktenzeichen: "C 8004 06/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7843-879b-a99ec2b5c164",
              safe_id: "DE.BRAK_SPT.3dc07e33-606d-49f9-9f8f-565c09d6c8fa",
              name: "Rechtsanwalt Dr. Helena-Sophie Amalia von Brückner-Weißmann",
            },
          },
          {
            aktenzeichen: "K 1656 08/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7fd4-ba85-7ce4798a367b",
              safe_id: "DE.BRAK_SPT.143ba6cb-4daa-4048-93a9-b703a9105989",
              name: "Dr. Julia-Maria-Luise von Schönfeld-Weißmann-Küster-Schäfer-Kranz",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d9b-7eec-a344-f646375d7b41",
    aktenzeichen_gericht: "L 508 05/2024",
    status: "Eingereicht",
    status_changed: "2025-09-12T09:17:20.472761Z",
    eingereicht_am: "2023-06-04T11:08:50.576431Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d9c-7144-9bfa-e71abe9e7980",
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
            aktenzeichen: "W 6544 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7496-897c-4e4443162223",
              safe_id: "DE.BRAK_SPT.2842e3de-8c0d-41af-8613-fd789b90cbaf",
              name: "Rechtsanwalt Tobias Schönfeld",
            },
          },
          {
            aktenzeichen: "R 8832 12/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-769a-a680-4bc12cba9e7d",
              safe_id: "DE.BRAK_SPT.1138e23b-7b51-4053-a596-f64bdcbe9d94",
              name: "Dr. Franziska Müller",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9c-77e2-8722-d0a43d8d24d2",
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
            aktenzeichen: "G 3780 03/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d59-7d34-a88d-1a4e276d8940",
    aktenzeichen_gericht: "P 1506 03/2025",
    status: "Eingereicht",
    status_changed: "2025-09-10T20:22:43.944369Z",
    eingereicht_am: "2023-06-04T06:31:26.970254Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d59-7242-bf7a-079b3a1e455c",
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
            aktenzeichen: "L 2039 13/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7c20-839b-35f629dd6143",
              safe_id: "DE.BRAK_SPT.b68e2f02-4f1f-4dee-98e1-2533cffb2711",
              name: "Dr. Helene Groß",
            },
          },
        ],
      },
      {
        id: "019abafa-7d59-72fd-84fa-f38690090619",
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
            aktenzeichen: "O 6318 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7368-a796-506ce5788432",
              safe_id: "DE.BRAK_SPT.575917a7-b5d1-44a5-ba5b-2f02e20c295a",
              name: "Dr. Klaus Schäfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d96-702b-bfe9-e17251c946b8",
    aktenzeichen_gericht: "G 314 12/2025",
    status: "Eingereicht",
    status_changed: "2025-06-01T17:45:39.804455Z",
    eingereicht_am: "2023-06-01T14:08:38.365033Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d97-7490-94cc-05f443c82260",
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
            aktenzeichen: "J 8180 09/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d97-7b31-bb43-bca81a287981",
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
            aktenzeichen: "Z 9825 02/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7da6-7c26-8e19-19a861223ca3",
    aktenzeichen_gericht: "Y 350 03/2026",
    status: "Erstellt",
    status_changed: "2024-12-20T22:23:56.328649Z",
    eingereicht_am: "2023-06-01T06:35:58.613279Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7da6-7d96-bf7d-4dcd9564d38d",
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
            aktenzeichen: "A 4243 02/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7161-97c3-a2fe07e132f5",
              safe_id: "DE.BRAK_SPT.de1d01f9-f7b3-4422-b456-a3954faeb368",
              name: "Rechtsanwalt Maximilian-Johann von und zu Falkenstein",
            },
          },
        ],
      },
      {
        id: "019abafa-7da6-7d9f-a2e8-ce2e2e2ef617",
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
            aktenzeichen: "X 2900 04/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d88-7f04-831c-3aa9e7eee496",
    aktenzeichen_gericht: "T 959 01/2025",
    status: "Erstellt",
    status_changed: "2025-07-16T17:25:14.355101Z",
    eingereicht_am: "2023-05-29T13:38:02.69283Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d88-7f99-8a13-ad31b2228126",
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
            aktenzeichen: "W 1157 12/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "I 8743 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7f40-b1fd-328528ba272d",
              safe_id: "DE.BRAK_SPT.a41ba66e-8844-4bc7-9e72-c5cf5611d2d1",
              name: "Rechtsanwalt Alexander Höfer",
            },
          },
        ],
      },
      {
        id: "019abafa-7d88-7ff8-b68d-7c36eaa87355",
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
            aktenzeichen: "E 1671 10/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
    id: "019abaf9-bea8-7760-a2e8-072ff72f1f79",
    aktenzeichen_gericht: "B 4958 10/2025",
    status: "Eingereicht",
    status_changed: "2025-10-14T19:42:02.945255Z",
    eingereicht_am: "2023-04-16T19:25:55.45191Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea8-7299-ac03-13d76aa31cad",
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
            aktenzeichen: "W 8652 01/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea8-7cdb-879f-1e7cdbc0626d",
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
            aktenzeichen: "F 6103 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d09-b879-f7828cb8562d",
              safe_id: "DE.BRAK_SPT.78541b1b-202f-42f9-90e3-2a6931e94cfc",
              name: "Rechtsanwalt Dr. Elisa-Luise Roth",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d8d-758d-8cd4-96036a57ed9c",
    aktenzeichen_gericht: "G 3645 01/2026",
    status: "Erstellt",
    status_changed: "2025-07-04T01:21:42.107114Z",
    eingereicht_am: "2023-04-16T14:51:17.663024Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d8d-76df-ae8e-3aa08c0a1a53",
        name: "Elisa-Sophie-Luise-Gräfin von Löwenhügel-Küster-Schönfeld-Weiß",
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
        id: "019abafa-7d8d-7e76-a17c-fc4dc4a14678",
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
            aktenzeichen: "I 2167 01/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea7-78d2-bb66-ad5c73551e10",
    aktenzeichen_gericht: "A 6398 07/2024",
    status: "Eingereicht",
    status_changed: "2025-03-01T23:34:43.796351Z",
    eingereicht_am: "2023-04-09T10:29:33.658612Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea7-794f-b543-6d0d39eea7e7",
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
            aktenzeichen: "A 288 04/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea7-7a84-8989-7cb2ae237eb4",
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
            aktenzeichen: "J 187 09/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7da0-769e-ad66-b40c12909ea4",
    aktenzeichen_gericht: "O 8468 04/2025",
    status: "Eingereicht",
    status_changed: "2025-01-03T11:04:24.014575Z",
    eingereicht_am: "2023-04-07T04:47:54.396863Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7da0-7729-8ec1-011b60788c9e",
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
            aktenzeichen: "W 338 12/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "X 1340 04/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-751e-a883-0e4e1214b2ac",
              safe_id: "DE.BRAK_SPT.c8d60e43-835a-45bf-a0b5-e2ad063ce956",
              name: "Rechtsanwalt Dr. Pauline Kranz",
            },
          },
        ],
      },
      {
        id: "019abafa-7da0-77bc-ac06-811662a55c05",
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
            aktenzeichen: "G 7405 04/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d7f-7e9f-9fbf-10e07b74cbf6",
    aktenzeichen_gericht: "A 3362 03/2025",
    status: "Eingereicht",
    status_changed: "2025-10-22T19:10:13.799173Z",
    eingereicht_am: "2023-04-05T02:51:56.308097Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7f-7624-9d57-42ca9b5aba56",
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
            aktenzeichen: "U 7044 07/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d80-799e-8990-542f5f9fbb31",
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
    id: "019abafa-7d77-79ab-9464-62fc9349f487",
    aktenzeichen_gericht: "E 2290 12/2024",
    status: "Eingereicht",
    status_changed: "2025-01-01T00:30:28.858016Z",
    eingereicht_am: "2023-03-14T17:37:12.776061Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d77-7069-a4fd-7005c2e3eb13",
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
            aktenzeichen: "F 9160 03/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f92-b368-4d1d7e345ee1",
              safe_id: "DE.BRAK_SPT.6df555d4-32e8-4962-b08b-db0186b5240d",
              name: "Dr. Elisa Schönfeld",
            },
          },
        ],
      },
      {
        id: "019abafa-7d77-7112-8d99-5ea835543434",
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
            aktenzeichen: "L 2263 06/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d6f-7035-a934-f461e9ca0b86",
    aktenzeichen_gericht: "E 7025 11/2024",
    status: "Eingereicht",
    status_changed: "2025-05-22T13:34:30.170326Z",
    eingereicht_am: "2023-03-13T20:19:36.384308Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d70-73b5-8b97-4bd7ae2c8354",
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
            aktenzeichen: "U 1218 01/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d70-796c-982b-d1b319bc2685",
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
            aktenzeichen: "W 2862 13/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "D 1770 12/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7246-9d2e-c306728f018f",
              safe_id: "DE.BRAK_SPT.28ad4beb-cf88-4ac1-9d33-13d44a52e7e6",
              name: "Rechtsanwalt Dr. Christina Höfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea4-7a18-9c7d-8eb423374fd1",
    aktenzeichen_gericht: "P 8987 12/2025",
    status: "Erstellt",
    status_changed: "2025-09-25T03:53:19.417306Z",
    eingereicht_am: "2023-03-13T06:52:37.153697Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea4-7896-bd26-30e3768f79a0",
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
        id: "019abaf9-bea4-7e5a-a0e5-1acc8012eb88",
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
            aktenzeichen: "G 5510 03/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea5-79e4-a8d5-c3e862330057",
    aktenzeichen_gericht: "C 8046 12/2026",
    status: "Erstellt",
    status_changed: "2025-02-17T20:45:00.711462Z",
    eingereicht_am: "2023-03-02T21:31:33.48285Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea5-7922-8ebf-430f17e9fb8b",
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
            aktenzeichen: "D 8303 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7e59-8891-c719b027b99a",
              safe_id: "DE.BRAK_SPT.077a13f9-3334-4c15-b9d2-ffa82ca1dc98",
              name: "Rechtsanwalt Dr. Karl-Heinrich Ludwig von Hohenstein-Kranz",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea5-79a6-a969-c2b7efe16068",
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
            aktenzeichen: "G 4353 04/2026",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "R 7819 06/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bf5-936a-11764265952d",
              safe_id: "DE.BRAK_SPT.c7e5e31d-92f6-4710-93e0-0e6f3d984e1d",
              name: "Rechtsanwalt Dr. Fabian Weiß",
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
    id: "019abaf9-be98-73d6-adb9-753d6c8e57b6",
    aktenzeichen_gericht: "R 1019 01/2026",
    status: "Erstellt",
    status_changed: "2025-06-08T18:57:19.246925Z",
    eingereicht_am: "2023-02-11T20:31:07.848766Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be98-76f7-a66e-ef2479330b10",
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
        id: "019abaf9-be98-7bda-8b34-b79e8beb1544",
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
            aktenzeichen: "C 3688 12/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5b-7510-9903-ed3e3f3982fe",
    aktenzeichen_gericht: "T 3257 12/2026",
    status: "Eingereicht",
    status_changed: "2025-11-17T16:31:44.4201Z",
    eingereicht_am: "2023-02-06T08:46:11.132103Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5b-78c1-b28c-a5487b6aece5",
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
            aktenzeichen: "Z 6158 03/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5b-7cca-8aa2-1e78e71d9921",
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
            aktenzeichen: "B 2183 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7838-9cf8-0ddccc740739",
              safe_id: "DE.BRAK_SPT.bc2f3271-9045-4663-bb92-b9462c2705ae",
              name: "Rechtsanwalt Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
            },
          },
          {
            aktenzeichen: "P 597 12/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
    id: "019abafa-7d5d-75b0-a045-d42ec3b16108",
    aktenzeichen_gericht: "Z 4004 09/2026",
    status: "Erstellt",
    status_changed: "2025-01-28T14:48:34.922435Z",
    eingereicht_am: "2023-02-05T08:27:50.261967Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5d-776a-bc8d-84800a2af513",
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
            aktenzeichen: "E 8629 04/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5d-7c83-a703-369dd8f4f513",
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
            aktenzeichen: "D 9935 05/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
    id: "019abafa-7d80-7cd1-9dfc-f489e26a3ad7",
    aktenzeichen_gericht: "I 5706 05/2026",
    status: "Erstellt",
    status_changed: "2025-04-26T00:13:37.434354Z",
    eingereicht_am: "2023-01-26T13:01:58.864094Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d80-7bee-a500-d4e430d521a7",
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
            aktenzeichen: "F 8519 01/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d81-7541-9d20-257fe55330bb",
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
            aktenzeichen: "Q 3354 13/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7bfc-936f-f0c738df2221",
              safe_id: "DE.BRAK_SPT.30241b27-f123-48eb-9e5e-45399dd70102",
              name: "Dr. Charlotte-Luise-Elisabeth von der Hohenau-Schäfer-Krüger-Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be76-7516-9a58-ce325d8a4efd",
    aktenzeichen_gericht: "F 6693 13/2025",
    status: "Eingereicht",
    status_changed: "2025-07-18T12:40:35.570528Z",
    eingereicht_am: "2023-01-21T08:33:48.857686Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be76-7da1-80f0-0eae1a2178fc",
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
            aktenzeichen: "G 7772 04/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be77-7e9b-94b8-c8827f0c0950",
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
            aktenzeichen: "L 1195 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-70ae-b321-e59ce257277a",
              safe_id: "DE.BRAK_SPT.58060767-e984-4ce9-8b7e-e14f7203774c",
              name: "Dr. Marie-Louise Ott",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-beaa-7041-b979-c7677fe6004d",
    aktenzeichen_gericht: "P 4611 02/2024",
    status: "Erstellt",
    status_changed: "2024-12-15T18:11:25.334434Z",
    eingereicht_am: "2023-01-18T00:52:16.796241Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-beaa-7983-b620-2dbc5a5ee774",
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
            aktenzeichen: "J 5460 13/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-beaa-7a51-a700-54305c3e2f86",
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
            aktenzeichen: "W 1285 08/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d65-7911-bf7f-00f0e95320cf",
    aktenzeichen_gericht: "Q 7126 11/2024",
    status: "Erstellt",
    status_changed: "2025-02-14T09:52:14.012646Z",
    eingereicht_am: "2023-01-17T11:12:34.673488Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d66-7934-963f-7f5f41c12b5a",
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
            aktenzeichen: "N 3904 03/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d66-797c-98ed-ece43817575d",
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
            aktenzeichen: "C 1964 03/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5d-785c-ab6f-013441b2f38a",
    aktenzeichen_gericht: "L 598 02/2024",
    status: "Eingereicht",
    status_changed: "2024-12-24T06:08:00.33182Z",
    eingereicht_am: "2023-01-13T23:36:42.054034Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5d-7119-8144-b04ab4139d99",
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
            aktenzeichen: "E 4498 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7ad7-b9f4-9086ab48f5ab",
              safe_id: "DE.BRAK_SPT.3c2c9543-7f5a-4c1b-bd13-5c59043b1fdd",
              name: "Rechtsanwalt Dr. Elisabeth Köhn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5d-7cbd-a116-4f9693de243b",
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
            aktenzeichen: "W 5976 08/2026",
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
    id: "019abaf9-bea5-7022-a03a-5f4caae6973b",
    aktenzeichen_gericht: "J 956 11/2026",
    status: "Eingereicht",
    status_changed: "2024-11-28T11:54:19.778761Z",
    eingereicht_am: "2023-01-13T14:57:06.313916Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea5-707b-bc9f-bb9b3a32c07a",
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
            aktenzeichen: "G 5987 04/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-758a-87ed-7f10d35867dd",
              safe_id: "DE.BRAK_SPT.16476b2c-84c6-41ea-bc9e-bd5ab1952e41",
              name: "Rechtsanwalt Dr. Emilia-Charlotte Freifrau von Löwenstein-Kranz",
            },
          },
          {
            aktenzeichen: "N 1736 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-742c-9ff6-7c9d0b3f9270",
              safe_id: "DE.BRAK_SPT.bd2b9afb-69b9-4f7f-89af-f630558237b6",
              name: "Rechtsanwalt Tobias Möser",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea5-7178-b07f-b329608598ef",
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
            aktenzeichen: "R 8099 13/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abaf9-be7e-723a-8857-3bee6b52095e",
    aktenzeichen_gericht: "C 9990 12/2025",
    status: "Erstellt",
    status_changed: "2025-09-23T08:56:14.358379Z",
    eingereicht_am: "2022-12-10T11:18:59.12404Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7e-72f2-83f8-1900d78d983f",
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
            aktenzeichen: "N 2820 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-7f40-b1fd-328528ba272d",
              safe_id: "DE.BRAK_SPT.a41ba66e-8844-4bc7-9e72-c5cf5611d2d1",
              name: "Rechtsanwalt Alexander Höfer",
            },
          },
        ],
      },
      {
        id: "019abaf9-be7e-77fe-ae89-e50eebf34e37",
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
            aktenzeichen: "Q 8751 12/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5e-7b00-90fd-5cf311af9185",
    aktenzeichen_gericht: "A 6974 13/2026",
    status: "Eingereicht",
    status_changed: "2025-10-25T23:14:06.582564Z",
    eingereicht_am: "2022-12-01T13:38:21.801291Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5e-7690-9868-394b91c45065",
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
            aktenzeichen: "C 1675 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-77f5-86b4-800d0f51cb12",
              safe_id: "DE.BRAK_SPT.deaa8f98-4671-4500-8a27-ee7a82d17c4c",
              name: "Dr. Matthias Lösch",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5f-7060-9a4d-8068702273a8",
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
            aktenzeichen: "T 3293 05/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d9d-7b00-a8a6-301a4f880afc",
    aktenzeichen_gericht: "I 4862 04/2025",
    status: "Eingereicht",
    status_changed: "2025-01-28T03:18:19.015594Z",
    eingereicht_am: "2022-11-29T13:41:49.515702Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d9d-78ad-9e30-a1eb9303fd79",
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
            aktenzeichen: "N 6237 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7612-8e68-d392be119978",
              safe_id: "DE.BRAK_SPT.a2c44728-19a2-4305-83d3-2e9e08dec439",
              name: "Dr. Tobias Löhr",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9d-7c2e-bc07-3d3b8e68e759",
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
    ],
  },
  {
    id: "019abaf9-bea7-7c30-a337-4065578db7ab",
    aktenzeichen_gericht: "V 3601 09/2024",
    status: "Eingereicht",
    status_changed: "2025-07-28T08:51:17.513011Z",
    eingereicht_am: "2022-11-24T04:32:16.79775Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea7-7252-b134-66f3e17d3a0b",
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
            aktenzeichen: "M 9760 13/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-7eda-828c-e3dce8576122",
              safe_id: "DE.BRAK_SPT.c318fdf9-22c7-4ea3-b926-73946c5a8e53",
              name: "Dr. Matthias Kübler",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea7-78f1-986f-ef66eef48a9d",
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
            aktenzeichen: "B 2820 12/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d76-b6d0-15dc985ef528",
              safe_id: "DE.BRAK_SPT.d01820b4-2f42-4761-93a2-40a1e26933a7",
              name: "Rechtsanwalt Dr. Tobias-Maurer",
            },
          },
        ],
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
    id: "019abaf9-bea3-76a0-8498-dbfb25630ac5",
    aktenzeichen_gericht: "H 8342 11/2026",
    status: "Eingereicht",
    status_changed: "2024-12-07T22:25:03.66928Z",
    eingereicht_am: "2022-11-03T12:17:30.271761Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea3-7739-97d8-45adccad85cf",
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
            aktenzeichen: "E 678 10/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea3-7f04-b53d-b9f95a69c1df",
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
            aktenzeichen: "Y 4512 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-70bb-8d0b-1a8559f7ec84",
              safe_id: "DE.BRAK_SPT.832150f2-555c-4f40-a60e-057e26e186df",
              name: "Rechtsanwalt Dr. Florian Weiß",
            },
          },
          {
            aktenzeichen: "V 3699 06/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-70dd-8d0b-231efa3c9b1c",
              safe_id: "DE.BRAK_SPT.9b10be7b-a2b7-4f76-8f78-0594a8e73642",
              name: "Dr. Miriam Hölzer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d98-7c1f-aa49-43f2d812625d",
    aktenzeichen_gericht: "E 5805 02/2025",
    status: "Erstellt",
    status_changed: "2025-05-29T21:49:01.751329Z",
    eingereicht_am: "2022-11-03T00:48:06.247768Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d99-79d0-880e-c794ff5096cd",
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
            aktenzeichen: "A 6846 13/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d99-7c22-a2bb-0f8db9c42471",
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
            aktenzeichen: "F 2930 01/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea4-7f1e-bfae-f82aac4ed027",
    aktenzeichen_gericht: "S 676 04/2026",
    status: "Erstellt",
    status_changed: "2025-02-19T13:49:02.677995Z",
    eingereicht_am: "2022-10-31T20:08:42.757731Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea5-779d-a11d-7f7e0a9fa876",
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
            aktenzeichen: "T 3347 01/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea5-7fbe-9925-25bd3385c43a",
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
            aktenzeichen: "P 8935 06/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7612-8e68-d392be119978",
              safe_id: "DE.BRAK_SPT.a2c44728-19a2-4305-83d3-2e9e08dec439",
              name: "Dr. Tobias Löhr",
            },
          },
          {
            aktenzeichen: "V 2525 10/2026",
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
    id: "019abaf9-beab-7860-8491-c71336381d3b",
    aktenzeichen_gericht: "Y 8018 05/2026",
    status: "Eingereicht",
    status_changed: "2025-01-10T07:00:15.358607Z",
    eingereicht_am: "2022-10-21T02:16:27.682382Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-beab-7058-97fb-412fa82211e1",
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
            aktenzeichen: "P 8239 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-760e-b37e-78e426914052",
              safe_id: "DE.BRAK_SPT.0b8b13fa-9db4-44ca-a4f6-330e6e0d1573",
              name: "Dr. Fabian Weißmann",
            },
          },
          {
            aktenzeichen: "Y 3832 10/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-beab-79c2-9ab4-37a951c2d5ef",
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
            aktenzeichen: "J 6928 12/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-71af-b9e1-dbe04466fea3",
              safe_id: "DE.BRAK_SPT.55f6d9de-da3b-4591-8f58-7067a390aab7",
              name: "Rechtsanwalt Daniela Brück",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-bea8-7713-87b4-1bed4e3bd6f6",
    aktenzeichen_gericht: "B 6175 02/2025",
    status: "Eingereicht",
    status_changed: "2025-06-27T11:42:10.664249Z",
    eingereicht_am: "2022-10-18T15:34:46.045382Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea8-713d-980d-9e007c17c793",
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
            aktenzeichen: "R 7604 11/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea8-7bbc-982e-1c99ac76e268",
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
            aktenzeichen: "Z 5404 11/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-beaa-7578-a7fe-da5f5f8520d5",
    aktenzeichen_gericht: "S 997 09/2025",
    status: "Erstellt",
    status_changed: "2025-06-18T04:21:32.313374Z",
    eingereicht_am: "2022-10-09T15:36:15.191466Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-beaa-76e8-b637-2cd6d824e0f0",
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
        id: "019abaf9-beaa-7af8-87a9-63597e633cf3",
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
            aktenzeichen: "N 4012 06/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abaf9-be7b-7ed9-a1e5-1ee0f3725962",
    aktenzeichen_gericht: "H 5902 02/2024",
    status: "Erstellt",
    status_changed: "2025-05-06T06:04:28.385265Z",
    eingereicht_am: "2022-10-04T04:53:11.509738Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7b-706f-90b8-239b31e40e1d",
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
            aktenzeichen: "O 8086 08/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7053-9161-075a553546d2",
              safe_id: "DE.BRAK_SPT.519d5510-f509-442f-835c-828707f25852",
              name: "Rechtsanwalt Dr. Helene-Mara Kühn",
            },
          },
          {
            aktenzeichen: "C 519 03/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be7b-7f70-84b7-a8bf216b8750",
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
            aktenzeichen: "Q 6492 11/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d8e-7220-80c9-e82cfd61c098",
    aktenzeichen_gericht: "A 729 08/2025",
    status: "Eingereicht",
    status_changed: "2025-03-29T19:31:41.019459Z",
    eingereicht_am: "2022-09-23T21:15:00.719016Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d8e-7c87-8e5a-3ec8e0a9fb3c",
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
            aktenzeichen: "A 7653 12/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-70ae-b321-e59ce257277a",
              safe_id: "DE.BRAK_SPT.58060767-e984-4ce9-8b7e-e14f7203774c",
              name: "Dr. Marie-Louise Ott",
            },
          },
        ],
      },
      {
        id: "019abafa-7d8f-7ff9-b920-3f8f137e0eee",
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
            aktenzeichen: "J 10000 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7ebb-a80b-4dd7daf3d3f7",
              safe_id: "DE.BRAK_SPT.12df46eb-fedd-4f40-a86a-50062811b24a",
              name: "Rechtsanwalt Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
            },
          },
          {
            aktenzeichen: "X 3505 05/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d76-b6d0-15dc985ef528",
              safe_id: "DE.BRAK_SPT.d01820b4-2f42-4761-93a2-40a1e26933a7",
              name: "Rechtsanwalt Dr. Tobias-Maurer",
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
    id: "019abaf9-be8d-7d12-809c-05ba08cfc542",
    aktenzeichen_gericht: "Z 3080 02/2026",
    status: "Eingereicht",
    status_changed: "2025-07-14T15:30:38.754341Z",
    eingereicht_am: "2022-09-15T15:30:17.892837Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be8d-7028-93d3-a88300e58660",
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
            aktenzeichen: "J 9340 07/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
          {
            aktenzeichen: "T 6904 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7fb9-b841-1495d7b15ac2",
              safe_id: "DE.BRAK_SPT.fe50bdf5-af67-4788-9a30-4faa6e9e015e",
              name: "Dr. Leonhard Kühn",
            },
          },
        ],
      },
      {
        id: "019abaf9-be8d-7585-b184-7b4254519d77",
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
            aktenzeichen: "D 5526 05/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5c-79bf-806d-60b74bb1b010",
    aktenzeichen_gericht: "I 6986 10/2026",
    status: "Eingereicht",
    status_changed: "2025-06-27T06:15:48.585902Z",
    eingereicht_am: "2022-09-14T02:08:25.727895Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5c-7579-a9ef-acebe1f26c47",
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
            aktenzeichen: "E 6662 07/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7fb9-b841-1495d7b15ac2",
              safe_id: "DE.BRAK_SPT.fe50bdf5-af67-4788-9a30-4faa6e9e015e",
              name: "Dr. Leonhard Kühn",
            },
          },
          {
            aktenzeichen: "F 8630 08/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5c-7639-a4b5-4d2826528cce",
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
            aktenzeichen: "Y 2582 13/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
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
            aktenzeichen: "Y 504 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7e32-b9f6-9e083012e12d",
              safe_id: "DE.BRAK_SPT.c4b96a8a-4a63-416a-8dd2-6a5a00ae3b2f",
              name: "Dr. Klara-Louise Braun",
            },
          },
          {
            aktenzeichen: "E 2311 03/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7fac-a4ef-58168f68168f",
              safe_id: "DE.BRAK_SPT.47144281-05ce-43a5-a254-6494e36d2976",
              name: "Dr. Ferdinand-Julius Maximilian von Krämer-Höfer",
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
    id: "019abaf9-bea9-7942-a575-a8c768c33afa",
    aktenzeichen_gericht: "T 7757 05/2024",
    status: "Erstellt",
    status_changed: "2025-09-26T18:34:03.598754Z",
    eingereicht_am: "2022-08-12T18:37:29.308778Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea9-7c4a-b991-2a98bdb4e68e",
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
            aktenzeichen: "Z 1695 13/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-beaa-7990-85a7-0e557cef141f",
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
            aktenzeichen: "S 4219 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-79f0-88f9-7093dff91fed",
              safe_id: "DE.BRAK_SPT.8a9323ad-337e-4840-8e20-2fa3cf5dc442",
              name: "Rechtsanwalt Miriam-Luise Ott",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7da3-75e7-bafd-6b9407e62934",
    aktenzeichen_gericht: "H 699 05/2024",
    status: "Erstellt",
    status_changed: "2025-10-23T06:52:44.048026Z",
    eingereicht_am: "2022-07-25T04:37:54.058717Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7da4-73c0-b988-82077e73c1bb",
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
            aktenzeichen: "S 8372 10/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-71af-b9e1-dbe04466fea3",
              safe_id: "DE.BRAK_SPT.55f6d9de-da3b-4591-8f58-7067a390aab7",
              name: "Rechtsanwalt Daniela Brück",
            },
          },
        ],
      },
      {
        id: "019abafa-7da4-79a1-a047-afc69fc5fc5b",
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
            aktenzeichen: "D 7369 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7186-99c7-84e43d8c3a85",
              safe_id: "DE.BRAK_SPT.00b40b55-1566-4057-8a99-e8e15c7024e6",
              name: "Rechtsanwalt Stefan Kranz",
            },
          },
          {
            aktenzeichen: "G 7132 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7b1e-a969-ce0d63e85b5d",
              safe_id: "DE.BRAK_SPT.aecfee8f-8db6-49a2-ba8e-56b2dec61173",
              name: "Rechtsanwalt Dr. Anna-Maria-Katharina-Elisabeth von Löwenstein-Kranz-Schäfer-Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be8c-7655-9688-c4d3f74e2386",
    aktenzeichen_gericht: "U 3595 12/2026",
    status: "Erstellt",
    status_changed: "2025-11-19T10:24:33.736218Z",
    eingereicht_am: "2022-07-23T09:37:06.096695Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be8c-7207-a5a8-edf29c302a70",
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
            aktenzeichen: "Y 8550 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7c71-90c0-8cdcc7ebae3c",
              safe_id: "DE.BRAK_SPT.92aef33d-e03e-45de-887e-3c67cc4019e8",
              name: "Rechtsanwalt Dr. Benjamin-Lukas Franz-Josef von Schönhagen",
            },
          },
        ],
      },
      {
        id: "019abaf9-be8c-77f0-a6f6-4fb09af8bed8",
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
            aktenzeichen: "U 7994 08/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7fe5-8d57-5ef39e5814d6",
              safe_id: "DE.BRAK_SPT.772cea89-e2e2-40f6-b5b7-05aea0c9bd13",
              name: "Dr. Alexander Brück",
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
    id: "019abafa-7d63-7f63-bb99-0e7d19d08aa0",
    aktenzeichen_gericht: "Q 7190 07/2024",
    status: "Eingereicht",
    status_changed: "2025-11-08T00:11:19.576064Z",
    eingereicht_am: "2022-07-06T13:44:55.743529Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d63-7ed6-8568-ad4a0a8bdc5b",
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
            aktenzeichen: "D 9932 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-77f6-91fa-379176dfd710",
              safe_id: "DE.BRAK_SPT.3822e3ab-8018-4b2e-99dd-16c1aab158c7",
              name: "Rechtsanwalt Matthias Köhn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d64-728a-a6ad-946e78da0c36",
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
            aktenzeichen: "N 9471 03/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "D 603 02/2026",
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
    id: "019abafa-7d92-7b2d-96b1-c32b58adf6c0",
    aktenzeichen_gericht: "E 2746 02/2025",
    status: "Erstellt",
    status_changed: "2025-03-15T13:31:08.586442Z",
    eingereicht_am: "2022-06-24T11:54:30.519789Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d92-711c-86e8-73291b15be89",
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
            aktenzeichen: "G 7067 07/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d93-7407-be09-9033eaed80b5",
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
            aktenzeichen: "K 1017 09/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d92-72cd-a184-f845276224dd",
    aktenzeichen_gericht: "J 3924 13/2024",
    status: "Eingereicht",
    status_changed: "2025-11-06T10:46:23.35186Z",
    eingereicht_am: "2022-06-24T08:27:33.135861Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d92-7b86-807e-a3e3f63aafc5",
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
            aktenzeichen: "L 8538 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7e69-85b6-5a27b3df2521",
              safe_id: "DE.BRAK_SPT.f4dc8282-9f36-4e0d-9873-0cba0b57de00",
              name: "Rechtsanwalt Dr. Johanna Weiß",
            },
          },
        ],
      },
      {
        id: "019abafa-7d92-7d20-993a-21a7c32eba46",
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
            aktenzeichen: "P 141 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7588-b1c7-918f7891e413",
              safe_id: "DE.BRAK_SPT.9ca6e7ea-5f08-4edc-909c-b7eec5873814",
              name: "Rechtsanwalt Carina Weiß",
            },
          },
          {
            aktenzeichen: "U 1718 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7be4-9c29-a41ce5a7fa2e",
              safe_id: "DE.BRAK_SPT.6d82549d-8b8b-454b-a094-1a27a8b4e952",
              name: "Rechtsanwalt Dr. Laurenz Böhler",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be7c-74d3-b2e1-3a8ee22f1705",
    aktenzeichen_gericht: "C 2049 03/2026",
    status: "Erstellt",
    status_changed: "2025-10-27T17:50:07.285851Z",
    eingereicht_am: "2022-06-21T22:41:00.920441Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7c-780b-a231-8e6a6797bb13",
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
            aktenzeichen: "D 9493 01/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be7c-7cbf-abdf-e9709eb99301",
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
            aktenzeichen: "U 8535 09/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-79dd-86e0-6bf44bcf0c89",
              safe_id: "DE.BRAK_SPT.fa542d69-0b3b-4630-9ae9-af30ee99d421",
              name: "Rechtsanwalt Dr. Johanna Großmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d76-73a2-9355-d05e85b076da",
    aktenzeichen_gericht: "A 2460 02/2025",
    status: "Erstellt",
    status_changed: "2024-11-29T04:16:17.596468Z",
    eingereicht_am: "2022-06-16T12:21:25.494574Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d76-768e-acd6-8f759e9d9caf",
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
            aktenzeichen: "F 1984 01/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d76-7da7-9c24-83790e541ac5",
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
            aktenzeichen: "F 5112 02/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7505-aa6c-a4f281cf7194",
              safe_id: "DE.BRAK_SPT.5f535007-0e06-4c53-8ec4-b07f10560174",
              name: "Rechtsanwalt Anna-Maria-Luise von Hohenstein-Schwarzburg",
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
    id: "019abaf9-bea5-7e3d-82a0-907d795d3a09",
    aktenzeichen_gericht: "G 6035 13/2024",
    status: "Erstellt",
    status_changed: "2025-04-15T03:29:57.304295Z",
    eingereicht_am: "2022-06-03T10:12:06.312286Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea5-7419-99a3-f51b7b55710c",
        name: "Markus Groß",
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
        id: "019abaf9-bea5-7de3-86f4-73a93b103a8c",
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
            aktenzeichen: "J 3827 03/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be6b-7060-b629-0fe78fdc235a",
    aktenzeichen_gericht: "M 9205 05/2025",
    status: "Erstellt",
    status_changed: "2025-07-24T06:25:45.2312Z",
    eingereicht_am: "2022-06-01T11:47:36.9946Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6c-77e0-80b3-04f8ab876bb5",
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
            aktenzeichen: "O 8206 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7308-8bd9-8dfbae85416f",
              safe_id: "DE.BRAK_SPT.58a9af18-21bc-4a17-9e7f-29d1ddec3049",
              name: "Rechtsanwalt Dr. Theresa Krug",
            },
          },
          {
            aktenzeichen: "F 6062 13/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-78ed-928d-b00ca2adc7eb",
              safe_id: "DE.BRAK_SPT.80eae167-ff69-49c6-a383-5fc4fc76f4f6",
              name: "Dr. Friedrich Kübler",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6c-7862-9a74-56204f50706d",
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
            aktenzeichen: "F 9172 03/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be9a-7eb7-846a-05853955f2cb",
    aktenzeichen_gericht: "M 1675 05/2024",
    status: "Erstellt",
    status_changed: "2025-04-04T03:23:43.096418Z",
    eingereicht_am: "2022-05-17T01:59:17.343655Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be9b-74b2-a154-3e872eee0862",
        name: "Leonhard Höfer",
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
        id: "019abaf9-be9b-7574-97e5-f33abc2a65ef",
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
            aktenzeichen: "F 3525 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7265-a99b-41bf9ebf23ab",
              safe_id: "DE.BRAK_SPT.786e6583-ddda-4a6d-81ca-374a855dd1f4",
              name: "Dr. Franziska-Anneliese-Madeleine von Brückner-Schönfeld-Weiß-Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d9f-773e-af1e-b8e7e99a52ff",
    aktenzeichen_gericht: "N 2836 07/2025",
    status: "Erstellt",
    status_changed: "2025-09-30T19:36:14.387681Z",
    eingereicht_am: "2022-05-14T15:35:35.064351Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7da0-725e-b3a1-bcba6ba14c34",
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
        id: "019abafa-7da0-7807-bda0-6cd71f0f3c47",
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
            aktenzeichen: "N 445 02/2025",
            bevollmaechtigter: {
              id: "019aa757-29ea-7042-ad32-c12ab0f7af8f",
              safe_id: "DE.BRAK_SPT.2c720728-1b56-4bff-8ec6-715c9e9eeb59",
              name: "Dr. Günther Weißmann",
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
    id: "019abafa-7d60-7b56-8ff6-c16898123204",
    aktenzeichen_gericht: "Y 7055 09/2024",
    status: "Erstellt",
    status_changed: "2025-11-11T04:43:47.480761Z",
    eingereicht_am: "2022-04-22T15:10:49.786834Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d61-74ea-aa11-6d3bd00d0fb7",
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
            aktenzeichen: "A 7958 13/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-7e61-bd15-fef49a678bef",
              safe_id: "DE.BRAK_SPT.6007f82b-d8c8-4ad0-a36e-83215efcee95",
              name: "Dr. Annemarie Scholz",
            },
          },
        ],
      },
      {
        id: "019abafa-7d61-75ac-b25e-c9bbcaa0c4a3",
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
            aktenzeichen: "L 5875 03/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d7c-7081-afed-19f3bbaddcfc",
    aktenzeichen_gericht: "Z 1518 08/2024",
    status: "Erstellt",
    status_changed: "2025-11-23T06:36:28.062796Z",
    eingereicht_am: "2022-04-20T05:41:47.432694Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7c-7d10-a9c9-5654f97e92cc",
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
            aktenzeichen: "N 2795 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7fac-a4ef-58168f68168f",
              safe_id: "DE.BRAK_SPT.47144281-05ce-43a5-a254-6494e36d2976",
              name: "Dr. Ferdinand-Julius Maximilian von Krämer-Höfer",
            },
          },
        ],
      },
      {
        id: "019abafa-7d7d-7c0e-b45d-388177250076",
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
            aktenzeichen: "Q 4317 12/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be83-7863-9806-5c8675510e10",
    aktenzeichen_gericht: "D 6153 01/2025",
    status: "Erstellt",
    status_changed: "2025-10-28T21:02:41.662735Z",
    eingereicht_am: "2022-04-20T01:02:26.169582Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be83-7ad4-a233-88959adad618",
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
            aktenzeichen: "U 9297 05/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be83-7d9b-b951-1304b885b9f1",
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
            aktenzeichen: "S 6226 11/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7da0-7a8a-be46-84b9e5c9fa28",
    aktenzeichen_gericht: "J 3948 03/2024",
    status: "Erstellt",
    status_changed: "2025-05-10T23:46:09.824388Z",
    eingereicht_am: "2022-04-18T15:31:36.112603Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7da0-7653-9822-6d14b7fa65d2",
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
            aktenzeichen: "V 2413 02/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7da0-7695-99e3-12ed05a2ed88",
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
            aktenzeichen: "I 5475 01/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be89-7729-9e37-8a23f25e9131",
    aktenzeichen_gericht: "R 5508 03/2024",
    status: "Erstellt",
    status_changed: "2025-02-06T23:54:14.852577Z",
    eingereicht_am: "2022-04-04T19:43:00.393943Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be89-72d9-a6d6-4a2630625b63",
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
            aktenzeichen: "N 2392 07/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be89-7d53-95d0-949943e3ff9a",
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
    id: "019abaf9-bea9-7d22-9a7e-0ea1fc678b32",
    aktenzeichen_gericht: "P 4838 03/2026",
    status: "Erstellt",
    status_changed: "2025-06-11T23:24:35.298599Z",
    eingereicht_am: "2022-04-04T12:06:36.045053Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea9-7e72-9d9d-13f893c197a4",
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
            aktenzeichen: "U 9235 04/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-74dc-907a-0e35da48e3ad",
              safe_id: "DE.BRAK_SPT.555287ac-4df1-4151-960d-ebb9646ef234",
              name: "Dr. Julius Krämer",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea9-7e75-a830-f7aeeb96a4c7",
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
            aktenzeichen: "F 436 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7ee2-974f-800a2dbc5278",
              safe_id: "DE.BRAK_SPT.4c645541-a637-440b-a366-7a4f5866d246",
              name: "Rechtsanwalt Matthias-Sebastian-Friedrich von Großmann-Hölzer-Weiß-Krüger",
            },
          },
          {
            aktenzeichen: "H 3959 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-751a-96ad-9bc8066f1cbe",
              safe_id: "DE.BRAK_SPT.bc88008d-20ae-4b31-8080-303220e01a00",
              name: "Rechtsanwalt Dr. Tobias-Leonhard-Sebastian von Brückner-Schäfer-Kühn-Weißmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be6c-73b7-8acd-e96b688a56e5",
    aktenzeichen_gericht: "L 7344 10/2024",
    status: "Erstellt",
    status_changed: "2025-05-20T02:44:53.594619Z",
    eingereicht_am: "2022-03-29T14:07:33.404852Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-be6c-7312-a978-51ce5650345b",
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
            aktenzeichen: "A 7674 04/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be6c-7dc5-aeea-21d7f604d60f",
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
            aktenzeichen: "J 4142 09/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
            aktenzeichen: "V 476 07/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7efa-8d6b-ddb6ef505a97",
              safe_id: "DE.BRAK_SPT.ad742edd-39bb-407a-b9de-9eed81525b3c",
              name: "Dr. Markus Kühn",
            },
          },
          {
            aktenzeichen: "S 136 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7fa9-bae8-178d7e26fd5f",
              safe_id: "DE.BRAK_SPT.3dfeef6a-48af-495e-844a-4bc4dba382f7",
              name: "Rechtsanwalt Dr. Miriam Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be9d-7aec-9a05-6ce29e8be468",
    aktenzeichen_gericht: "D 9277 12/2024",
    status: "Eingereicht",
    status_changed: "2025-06-26T21:44:10.725446Z",
    eingereicht_am: "2022-03-03T07:27:40.682777Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be9e-7c67-a234-26a15936de23",
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
            aktenzeichen: "U 4249 02/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7c20-839b-35f629dd6143",
              safe_id: "DE.BRAK_SPT.b68e2f02-4f1f-4dee-98e1-2533cffb2711",
              name: "Dr. Helene Groß",
            },
          },
        ],
      },
      {
        id: "019abaf9-be9f-7e3c-8262-0e753035db78",
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
            aktenzeichen: "V 2278 07/2025",
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
            aktenzeichen: "D 8193 07/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bbe-a327-13ddad6980dd",
              safe_id: "DE.BRAK_SPT.675ddb29-d910-4c6e-ba51-7fd8ce7bddfa",
              name: "Rechtsanwalt Fabian Krüger",
            },
          },
          {
            aktenzeichen: "Y 1722 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-756d-9881-8c49f6f1319f",
              safe_id: "DE.BRAK_SPT.57ed0a91-981f-4f36-8e74-4a45be37babc",
              name: "Rechtsanwalt Dr. Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5c-77a4-8e4a-137bf4a8913b",
    aktenzeichen_gericht: "Z 5483 04/2024",
    status: "Erstellt",
    status_changed: "2025-10-06T01:13:46.855757Z",
    eingereicht_am: "2022-02-27T01:40:48.923833Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5c-709c-8888-d7e899709f54",
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
            aktenzeichen: "N 4917 02/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5c-7690-90de-f602d9ee5609",
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
            aktenzeichen: "G 4546 02/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-79f0-88f9-7093dff91fed",
              safe_id: "DE.BRAK_SPT.8a9323ad-337e-4840-8e20-2fa3cf5dc442",
              name: "Rechtsanwalt Miriam-Luise Ott",
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
            aktenzeichen: "F 1069 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-78d3-9a92-3859048c3a22",
              safe_id: "DE.BRAK_SPT.ff2ad61d-87cf-428c-9e8e-2365e95d3cf1",
              name: "Rechtsanwalt Patrick Löhr",
            },
          },
          {
            aktenzeichen: "K 3961 09/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7217-b50a-7d74fd8cf09d",
              safe_id: "DE.BRAK_SPT.41f98142-9db1-4aaf-a631-084f78bfb79d",
              name: "Rechtsanwalt Dr. Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5f-7872-a541-aa9f6c890123",
    aktenzeichen_gericht: "M 5198 07/2025",
    status: "Erstellt",
    status_changed: "2025-05-11T01:35:30.265231Z",
    eingereicht_am: "2022-01-18T05:59:13.782796Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5f-78c8-8355-40ab201f2b51",
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
            aktenzeichen: "W 4129 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-789b-be3d-e356c2c0c60d",
              safe_id: "DE.BRAK_SPT.b46f1ee1-da8c-4802-bf7f-502a87b0dbef",
              name: "Rechtsanwalt Dr. Jonas-Maurer",
            },
          },
        ],
      },
      {
        id: "019abafa-7d60-78a7-adb2-79f51c560680",
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
    id: "019abaf9-be99-7544-ba14-f8b88c31ffad",
    aktenzeichen_gericht: "P 3379 04/2024",
    status: "Erstellt",
    status_changed: "2024-12-21T02:08:31.038993Z",
    eingereicht_am: "2022-01-12T23:43:59.484426Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be99-79b0-8385-f2de242d313f",
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
            aktenzeichen: "A 1865 03/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be9a-766f-8efc-7076c26fbb52",
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
            aktenzeichen: "V 6547 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7fac-a4ef-58168f68168f",
              safe_id: "DE.BRAK_SPT.47144281-05ce-43a5-a254-6494e36d2976",
              name: "Dr. Ferdinand-Julius Maximilian von Krämer-Höfer",
            },
          },
          {
            aktenzeichen: "L 6708 11/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f92-b368-4d1d7e345ee1",
              safe_id: "DE.BRAK_SPT.6df555d4-32e8-4962-b08b-db0186b5240d",
              name: "Dr. Elisa Schönfeld",
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
            aktenzeichen: "D 7236 07/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
            },
          },
          {
            aktenzeichen: "R 8540 02/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-7fe5-a5a8-18b99767be5c",
              safe_id: "DE.BRAK_SPT.e6781d7e-c5a3-4258-995b-48d204e2cc86",
              name: "Rechtsanwalt Katharina Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be83-7dd0-9149-49824cf435ab",
    aktenzeichen_gericht: "Z 4628 12/2025",
    status: "Erstellt",
    status_changed: "2024-12-30T00:53:56.918928Z",
    eingereicht_am: "2021-12-27T17:17:01.307854Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be83-74da-89d1-5e5a77425caf",
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
            aktenzeichen: "H 7659 09/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be84-71b2-855e-a21474117ce9",
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
    id: "019abafa-7d9c-7cf0-b915-7c85cc8a6e09",
    aktenzeichen_gericht: "U 1292 02/2026",
    status: "Erstellt",
    status_changed: "2025-07-04T13:28:05.512359Z",
    eingereicht_am: "2021-12-18T16:48:52.388571Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d9c-7c77-b1af-d655598a148b",
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
            aktenzeichen: "M 4165 05/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d9d-7b3c-b3c0-54a482f2d791",
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
    id: "019abaf9-be74-791f-915f-1435a7db7e67",
    aktenzeichen_gericht: "S 1558 10/2024",
    status: "Eingereicht",
    status_changed: "2025-01-03T07:01:08.568073Z",
    eingereicht_am: "2021-11-29T04:06:05.640466Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abaf9-be74-75c0-bfe4-11b713db5711",
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
            aktenzeichen: "X 9865 11/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be74-75c5-8af9-f83658a14c7d",
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
    ],
  },
  {
    id: "019abafa-7d6a-7af0-9dd0-73c4466a457e",
    aktenzeichen_gericht: "B 2846 04/2026",
    status: "Eingereicht",
    status_changed: "2025-05-07T18:06:33.227447Z",
    eingereicht_am: "2021-11-19T13:17:00.842482Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6a-7ab1-893f-7874a3f69206",
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
            aktenzeichen: "T 2483 13/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d6a-7ea7-8482-70f917b2740a",
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
    id: "019abaf9-beaa-76c5-b1fe-35b95a878922",
    aktenzeichen_gericht: "R 6683 13/2024",
    status: "Erstellt",
    status_changed: "2025-09-16T14:38:58.451158Z",
    eingereicht_am: "2021-11-10T17:02:03.279032Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-beaa-71cb-8334-c2ddcbdca316",
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
            aktenzeichen: "X 4336 13/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-beaa-7ca8-a7b5-d4699ea88f10",
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
            aktenzeichen: "P 1387 10/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abafa-7d5b-7dc3-b1af-a252946520e0",
    aktenzeichen_gericht: "P 3407 01/2024",
    status: "Erstellt",
    status_changed: "2025-08-29T13:18:28.375828Z",
    eingereicht_am: "2021-10-20T02:18:33.483425Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5b-7b01-8158-72c81e598527",
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
            aktenzeichen: "M 3204 07/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5b-7de8-a380-3a920b1582ae",
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
            aktenzeichen: "F 9568 08/2024",
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
    id: "019abaf9-bcca-7a2e-95d4-abb28f4e107f",
    aktenzeichen_gericht: "F 1849 04/2024",
    status: "Eingereicht",
    status_changed: "2025-08-22T18:53:17.41743Z",
    eingereicht_am: "2021-10-12T02:43:28.235256Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-bd6f-7a6d-afeb-8d368a0154a7",
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
            aktenzeichen: "Z 5569 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7e0a-a2d4-c5fb3bd5258d",
              safe_id: "DE.BRAK_SPT.77532984-7cad-423a-9d96-cd05592a2942",
              name: "Dr. Leonhard-Sebastian Philipp von Möser-Schäfer",
            },
          },
        ],
      },
      {
        id: "019abaf9-be25-7560-9f71-402cfc1151d0",
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
    id: "019abafa-7d5c-7de9-b09c-31ec50a63fe2",
    aktenzeichen_gericht: "V 5319 02/2026",
    status: "Erstellt",
    status_changed: "2025-01-29T06:48:07.395752Z",
    eingereicht_am: "2021-10-05T13:43:19.93714Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5c-7ae1-a183-fc402ce2b4e0",
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
            aktenzeichen: "Z 2775 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7c71-90c0-8cdcc7ebae3c",
              safe_id: "DE.BRAK_SPT.92aef33d-e03e-45de-887e-3c67cc4019e8",
              name: "Rechtsanwalt Dr. Benjamin-Lukas Franz-Josef von Schönhagen",
            },
          },
          {
            aktenzeichen: "Y 6987 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d21-a404-bea3b68c361b",
              safe_id: "DE.BRAK_SPT.2198b2bc-ccab-4805-bbbb-ab815e6698c5",
              name: "Rechtsanwalt Tobias-Matthias Alexander von Krämer-Böhler",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5c-7b98-bb79-3cef6f77c9f7",
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
            aktenzeichen: "Q 7460 13/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-742c-9ff6-7c9d0b3f9270",
              safe_id: "DE.BRAK_SPT.bd2b9afb-69b9-4f7f-89af-f630558237b6",
              name: "Rechtsanwalt Tobias Möser",
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
    id: "019abaf9-be85-7e17-85ef-1fdd4763da9a",
    aktenzeichen_gericht: "A 2096 02/2025",
    status: "Erstellt",
    status_changed: "2025-05-27T11:12:10.935803Z",
    eingereicht_am: "2021-09-19T17:50:46.261682Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abaf9-be85-7548-a80c-0d973681d816",
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
            aktenzeichen: "K 7679 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7488-880b-a10a6c09e807",
              safe_id: "DE.BRAK_SPT.fd0888c9-93df-4739-a770-872c4f13b697",
              name: "Rechtsanwalt Johanna-Luise Friederike von Bärenfels-Schmidt",
            },
          },
        ],
      },
      {
        id: "019abaf9-be85-7be0-bb9d-b4994696946d",
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
            aktenzeichen: "B 3453 05/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7368-a796-506ce5788432",
              safe_id: "DE.BRAK_SPT.575917a7-b5d1-44a5-ba5b-2f02e20c295a",
              name: "Dr. Klaus Schäfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d6e-7034-ab53-14b7fc205d9c",
    aktenzeichen_gericht: "D 7090 12/2026",
    status: "Erstellt",
    status_changed: "2025-09-01T20:10:35.546107Z",
    eingereicht_am: "2021-09-19T13:35:03.205569Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6e-732c-8ccb-294d562c3e3e",
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
      {
        id: "019abafa-7d6e-75ac-a9e9-06ebbc7c93a1",
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
            aktenzeichen: "E 7132 07/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
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
    id: "019abaf9-be7e-7043-96cb-4d4cffe766dd",
    aktenzeichen_gericht: "G 7633 13/2025",
    status: "Eingereicht",
    status_changed: "2025-07-15T15:14:25.029715Z",
    eingereicht_am: "2021-08-25T16:24:41.9113Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7f-7b02-b5c9-bfd26930874f",
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
            aktenzeichen: "N 4215 05/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7576-82a8-0fa09911b18f",
              safe_id: "DE.BRAK_SPT.155aa827-241e-40dc-a41d-5fc3780dfd6b",
              name: "Dr. Anna-Lena-Marie von Schönbrunn-Kühn",
            },
          },
        ],
      },
      {
        id: "019abaf9-be7f-7c1e-bab3-ac119ead5124",
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
            aktenzeichen: "F 9442 04/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d62-7fcd-8f06-f36808cd9ae2",
    aktenzeichen_gericht: "P 2329 02/2025",
    status: "Eingereicht",
    status_changed: "2025-03-17T01:22:36.951105Z",
    eingereicht_am: "2021-08-17T09:35:27.727558Z",
    gericht: {
      id: "fa824b2d-405e-4314-706c-361f29702c1f",
      wert: "Amtsgericht Frankfurt",
      code: "M1201",
    },
    beteiligungen: [
      {
        id: "019abafa-7d62-7c5b-ba73-c85e781f4fcd",
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
            aktenzeichen: "L 5736 04/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-71cd-b12f-772e857c2500",
              safe_id: "DE.BRAK_SPT.182970e1-8263-471f-a9c0-f1e588a1390c",
              name: "Dr. Antonia Löhr",
            },
          },
        ],
      },
      {
        id: "019abafa-7d63-773f-ba6d-40e8e2523727",
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
            aktenzeichen: "L 4199 01/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "P 3046 05/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-756d-9881-8c49f6f1319f",
              safe_id: "DE.BRAK_SPT.57ed0a91-981f-4f36-8e74-4a45be37babc",
              name: "Rechtsanwalt Dr. Markus-Leonhard-Sebastian von Krüger-Schäfer-Weiß-Küster-Höfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5a-7c93-938b-09feae7ae8f3",
    aktenzeichen_gericht: "R 3165 02/2025",
    status: "Erstellt",
    status_changed: "2025-08-27T11:02:33.507142Z",
    eingereicht_am: "2021-08-16T22:32:18.230724Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5a-767d-baeb-8787507d66d0",
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
            aktenzeichen: "Z 2757 01/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5a-7cbc-8063-acdbc77e7ff4",
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
            aktenzeichen: "V 7846 02/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be94-76f3-93b4-d62bb0c0d167",
    aktenzeichen_gericht: "A 9801 04/2024",
    status: "Erstellt",
    status_changed: "2025-09-30T18:18:52.3353Z",
    eingereicht_am: "2021-08-02T15:56:46.888735Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be94-70cd-9fb6-52414258f0ae",
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
            aktenzeichen: "W 2142 12/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be94-7c25-9795-6ed276cb2789",
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
    id: "019abaf9-be84-7907-8458-2f941203ee75",
    aktenzeichen_gericht: "A 1529 12/2025",
    status: "Eingereicht",
    status_changed: "2025-06-28T16:16:52.710879Z",
    eingereicht_am: "2021-07-22T06:25:02.360532Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be84-7834-9159-94b7b43ea69b",
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
            aktenzeichen: "M 6976 12/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be85-71b2-9406-eacaafc3bcac",
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
            aktenzeichen: "D 1959 12/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abaf9-be75-793d-abb2-c2f02dda89c2",
    aktenzeichen_gericht: "K 5489 11/2026",
    status: "Eingereicht",
    status_changed: "2025-01-22T13:51:30.352838Z",
    eingereicht_am: "2021-07-09T23:10:12.762469Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be75-769f-8cf2-e672fe8196fc",
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
            aktenzeichen: "T 3713 10/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be75-7995-9451-742eaafd5651",
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
            aktenzeichen: "K 8244 06/2024",
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
    id: "019abafa-7d7e-7eab-924c-22a7e811afcb",
    aktenzeichen_gericht: "L 6934 05/2025",
    status: "Erstellt",
    status_changed: "2025-05-31T21:48:11.010208Z",
    eingereicht_am: "2021-06-28T12:36:17.382988Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7e-7d2c-9ca5-df66c81cff6a",
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
            aktenzeichen: "X 6482 07/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f9a-9a5d-a3ef160609f5",
              safe_id: "DE.BRAK_SPT.d303ac6f-240e-4d48-8fd9-9fc07d28fe58",
              name: "Dr. Alina-Mara Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d7e-7e8a-a185-c4412964742c",
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
            aktenzeichen: "S 1524 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f0a-b83a-1a691234c8ba",
              safe_id: "DE.BRAK_SPT.22381726-b17f-4d86-bfc2-80995b0df4fd",
              name: "Rechtsanwalt Dr. Sabine Schäfer",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-beac-7c63-9bf5-4bcd0b74b99a",
    aktenzeichen_gericht: "L 6909 11/2024",
    status: "Erstellt",
    status_changed: "2025-04-24T09:28:09.089362Z",
    eingereicht_am: "2021-06-28T11:47:26.471585Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-beac-74b0-ad24-50d862724589",
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
            aktenzeichen: "Y 3880 10/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-beac-76c2-934b-bf1bb1c11e08",
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
            aktenzeichen: "Z 5592 08/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
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
    id: "019abafa-7d5a-71f6-a185-a0a06ff89fd6",
    aktenzeichen_gericht: "S 3988 08/2024",
    status: "Erstellt",
    status_changed: "2025-03-02T22:24:40.869888Z",
    eingereicht_am: "2021-06-22T17:57:48.834928Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5a-7a77-ae08-6cba38005083",
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
            aktenzeichen: "U 6409 03/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5a-7b69-8fc1-28d4ab656c92",
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
            aktenzeichen: "B 7498 05/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7da7-710b-987b-7d43aa946440",
    aktenzeichen_gericht: "F 5520 07/2026",
    status: "Eingereicht",
    status_changed: "2025-10-12T20:55:16.71018Z",
    eingereicht_am: "2021-06-22T14:47:59.129009Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7da8-79cf-a9eb-fb448dc3a76c",
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
            aktenzeichen: "Z 872 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7e05-8c8b-af91e43b01ac",
              safe_id: "DE.BRAK_SPT.cfcff95b-bfb9-47b2-9d88-74ecfb3ddb43",
              name: "Rechtsanwalt Dr. Sabine-Christina von und zu Großwald-Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7da8-7e0a-91e0-b4504ed0c93e",
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
            aktenzeichen: "T 1374 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29ea-755b-96bb-7bc9a2519c1e",
              safe_id: "DE.BRAK_SPT.6c7983ce-70a1-48a9-bcf5-3d4ac94b4829",
              name: "Rechtsanwalt Dr. Leonhard Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d71-7ed1-a599-747cf008b8aa",
    aktenzeichen_gericht: "Z 7997 13/2024",
    status: "Eingereicht",
    status_changed: "2025-05-26T22:36:30.534444Z",
    eingereicht_am: "2021-06-14T08:40:41.622085Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d71-7400-96cd-60df27c76203",
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
            aktenzeichen: "I 4742 12/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d72-7332-baf3-cff36edffb1d",
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
    id: "019abafa-7d96-7fdb-b014-c9bcc9d7619e",
    aktenzeichen_gericht: "O 9807 06/2026",
    status: "Erstellt",
    status_changed: "2025-08-10T11:20:58.21001Z",
    eingereicht_am: "2021-05-22T15:20:58.579702Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d96-7d2d-a999-84b27f896b7f",
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
            aktenzeichen: "D 9377 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7ca9-8536-9e5602085005",
              safe_id: "DE.BRAK_SPT.679d6c39-ad60-418c-afde-5efd38ffefd2",
              name: "Dr. Friedrich-Johannes-Karl von Bärenfels-Schön-Küster-Weißmann",
            },
          },
        ],
      },
      {
        id: "019abafa-7d96-7eaf-a46d-816d59284048",
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
            aktenzeichen: "V 769 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7c10-8690-306044f5a637",
              safe_id: "DE.BRAK_SPT.b523630a-fb1e-4ad7-b1ba-ab366abbeed4",
              name: "Rechtsanwalt Alina-Theresa Viktoria von der Grünenau",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-beab-7157-8b5e-a6220f9071d5",
    aktenzeichen_gericht: "F 6257 03/2024",
    status: "Eingereicht",
    status_changed: "2025-01-05T06:26:10.152396Z",
    eingereicht_am: "2021-05-21T12:44:15.013412Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-beab-76af-b7f4-eb7cc640cd58",
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
            aktenzeichen: "K 311 08/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-751d-9cfd-1cf2c32c25a8",
              safe_id: "DE.BRAK_SPT.a71ffa80-f821-4ab5-b98c-70d37bbc7174",
              name: "Rechtsanwalt Matthias-Leonhard Theodor von Weißenthal",
            },
          },
        ],
      },
      {
        id: "019abaf9-beab-7ffd-836c-5f0bb5a74dfb",
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
            aktenzeichen: "R 930 02/2026",
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
    id: "019abaf9-bea8-71d7-afb9-51846596c54c",
    aktenzeichen_gericht: "L 9562 13/2024",
    status: "Eingereicht",
    status_changed: "2025-06-29T10:36:03.950164Z",
    eingereicht_am: "2021-05-19T21:46:22.6124Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea8-71ee-a925-289881434cb3",
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
            aktenzeichen: "U 4535 06/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-751e-a883-0e4e1214b2ac",
              safe_id: "DE.BRAK_SPT.c8d60e43-835a-45bf-a0b5-e2ad063ce956",
              name: "Rechtsanwalt Dr. Pauline Kranz",
            },
          },
          {
            aktenzeichen: "A 1259 07/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea8-73d8-81d4-08bcc418914f",
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
            aktenzeichen: "D 2065 04/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
            aktenzeichen: "W 4788 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-751e-a883-0e4e1214b2ac",
              safe_id: "DE.BRAK_SPT.c8d60e43-835a-45bf-a0b5-e2ad063ce956",
              name: "Rechtsanwalt Dr. Pauline Kranz",
            },
          },
          {
            aktenzeichen: "R 718 01/2024",
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
    id: "019abafa-7d89-76b7-a5db-ae6eb70d4e1f",
    aktenzeichen_gericht: "J 1039 07/2025",
    status: "Erstellt",
    status_changed: "2025-11-23T10:15:38.937435Z",
    eingereicht_am: "2021-04-21T04:54:23.996488Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d8a-75fb-ad81-213b29bc5abf",
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
            aktenzeichen: "J 2547 02/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d8a-76c8-a23b-df2816a21f9a",
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
            aktenzeichen: "B 9388 01/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d85-75dd-a030-35263b24d09a",
    aktenzeichen_gericht: "O 5268 09/2024",
    status: "Erstellt",
    status_changed: "2025-04-11T18:23:58.077352Z",
    eingereicht_am: "2021-04-14T10:05:45.334173Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d85-70e3-b596-40a19ec48e5a",
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
            aktenzeichen: "A 3186 03/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bd2-a8ff-993d5d5a73f7",
              safe_id: "DE.BRAK_SPT.d1bd24da-fcc6-4708-b957-0a43b4825a1f",
              name: "Rechtsanwalt Markus Höhn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d86-7ca4-a816-0f4c7698a421",
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
    id: "019abaf9-be9f-7c4c-abdd-527247e815ed",
    aktenzeichen_gericht: "A 6594 12/2026",
    status: "Erstellt",
    status_changed: "2025-09-10T19:00:04.392591Z",
    eingereicht_am: "2021-03-28T21:54:40.03744Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea0-7939-8676-ebd719f15861",
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
            aktenzeichen: "A 5588 09/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea0-7eba-afdb-0d41c5f25f62",
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
            aktenzeichen: "F 1703 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7e61-bd15-fef49a678bef",
              safe_id: "DE.BRAK_SPT.6007f82b-d8c8-4ad0-a36e-83215efcee95",
              name: "Dr. Annemarie Scholz",
            },
          },
          {
            aktenzeichen: "T 4614 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-73f3-a181-02e945154374",
              safe_id: "DE.BRAK_SPT.3fa716cd-bc21-4eff-98af-c8584aa99a55",
              name: "Rechtsanwalt Dr. Paulina-Luise Katharina von Hölzer-Schönfeld",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be73-77aa-b9b0-3841afdd3648",
    aktenzeichen_gericht: "N 3539 11/2026",
    status: "Eingereicht",
    status_changed: "2025-06-08T10:50:41.318846Z",
    eingereicht_am: "2021-03-25T03:08:14.647348Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be73-71dc-a234-f00335383f80",
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
            aktenzeichen: "P 346 10/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be73-74a5-bd14-818ae91bc2cd",
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
            aktenzeichen: "W 3629 12/2025",
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
    id: "019abaf9-bea2-7f08-b870-c07e9b975e2a",
    aktenzeichen_gericht: "D 1080 06/2024",
    status: "Eingereicht",
    status_changed: "2025-03-26T21:57:50.081068Z",
    eingereicht_am: "2021-02-21T10:08:53.820593Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-bea2-736d-beb8-cbd27e492bce",
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
            aktenzeichen: "F 5004 13/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7c10-8690-306044f5a637",
              safe_id: "DE.BRAK_SPT.b523630a-fb1e-4ad7-b1ba-ab366abbeed4",
              name: "Rechtsanwalt Alina-Theresa Viktoria von der Grünenau",
            },
          },
        ],
      },
      {
        id: "019abaf9-bea3-7642-9b37-b09bb31424af",
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
            aktenzeichen: "L 4833 08/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7588-b1c7-918f7891e413",
              safe_id: "DE.BRAK_SPT.9ca6e7ea-5f08-4edc-909c-b7eec5873814",
              name: "Rechtsanwalt Carina Weiß",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be8a-7010-b07c-bd5b88f3bc87",
    aktenzeichen_gericht: "Q 3783 03/2026",
    status: "Eingereicht",
    status_changed: "2025-06-21T01:01:51.347451Z",
    eingereicht_am: "2021-02-18T18:45:29.732732Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be8b-744d-a454-dcb1871c4f5b",
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
            aktenzeichen: "U 1519 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7838-9cf8-0ddccc740739",
              safe_id: "DE.BRAK_SPT.bc2f3271-9045-4663-bb92-b9462c2705ae",
              name: "Rechtsanwalt Elisa-Maria-Theresa von Hohenberg-Weiß-Krüger-Schönfeld-Kühn",
            },
          },
        ],
      },
      {
        id: "019abaf9-be8b-76a5-99b5-27858466277c",
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
            aktenzeichen: "R 6147 07/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d7d-7a3b-a3ee-41504c6be2e3",
    aktenzeichen_gericht: "H 8581 08/2025",
    status: "Eingereicht",
    status_changed: "2025-03-01T00:53:27.009199Z",
    eingereicht_am: "2021-02-05T15:44:12.290496Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7d-779f-b31d-b40e2bf695e6",
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
            aktenzeichen: "C 2726 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bbe-a327-13ddad6980dd",
              safe_id: "DE.BRAK_SPT.675ddb29-d910-4c6e-ba51-7fd8ce7bddfa",
              name: "Rechtsanwalt Fabian Krüger",
            },
          },
        ],
      },
      {
        id: "019abafa-7d7d-7fe5-9ab2-020b2f467fad",
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
            aktenzeichen: "Z 5777 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-737a-a28d-f7a0cb19584b",
              safe_id: "DE.BRAK_SPT.5ed13414-1652-4cad-87d1-218507269889",
              name: "Rechtsanwalt Johanna-Marie-Isabell-Elisa von Weißmann-Hölzer-Kranz-Schönfeld",
            },
          },
          {
            aktenzeichen: "L 331 08/2026",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
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
    id: "019abafa-7d7b-723b-a196-31ae9d250ae6",
    aktenzeichen_gericht: "S 6588 04/2024",
    status: "Eingereicht",
    status_changed: "2025-02-09T08:09:54.362956Z",
    eingereicht_am: "2021-01-21T17:38:59.786468Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d7b-7b4e-866b-adec8342a65a",
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
        id: "019abafa-7d7b-7fb3-ba4a-2aabeef5a002",
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
            aktenzeichen: "N 7817 13/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d61-7462-9e61-504315ab74c5",
    aktenzeichen_gericht: "K 2602 02/2025",
    status: "Erstellt",
    status_changed: "2025-05-16T15:27:28.08222Z",
    eingereicht_am: "2021-01-20T06:43:20.155485Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d61-7744-8636-ccc57e3f3ab8",
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
            aktenzeichen: "A 4742 12/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d58-9803-3037a963a92d",
              safe_id: "DE.BRAK_SPT.6e7b8f1b-f3a3-4806-9dac-9d88e04d23af",
              name: "Dr. Lena-Maria Böhm",
            },
          },
        ],
      },
      {
        id: "019abafa-7d62-7822-8ea6-42e7f58da6f9",
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
            aktenzeichen: "T 7356 10/2024",
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
    id: "019abaf9-be82-7583-94a0-dbf689ea677c",
    aktenzeichen_gericht: "O 1879 07/2024",
    status: "Erstellt",
    status_changed: "2025-11-23T17:11:17.933784Z",
    eingereicht_am: "2021-01-17T22:26:15.835755Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be82-7b13-ace1-5b04fa6c3890",
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
            aktenzeichen: "L 4486 01/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-7bbe-a327-13ddad6980dd",
              safe_id: "DE.BRAK_SPT.675ddb29-d910-4c6e-ba51-7fd8ce7bddfa",
              name: "Rechtsanwalt Fabian Krüger",
            },
          },
        ],
      },
      {
        id: "019abaf9-be83-7773-a1a2-7f2ce4dfea33",
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
            aktenzeichen: "T 2560 10/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-727e-a96b-6cb2ea7a67d7",
              safe_id: "DE.BRAK_SPT.5ab8b11c-a9ac-4e88-829f-8b94526b298e",
              name: "Rechtsanwalt Dr. Sebastian Löhr",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d98-7ac4-bdd0-d9051312cf31",
    aktenzeichen_gericht: "N 1802 07/2024",
    status: "Eingereicht",
    status_changed: "2025-01-01T21:37:53.173852Z",
    eingereicht_am: "2021-01-10T02:42:25.569802Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abafa-7d98-7ee4-8d17-da014ecf3bb0",
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
            aktenzeichen: "Z 5841 02/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
          {
            aktenzeichen: "H 2456 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d73-bf2c-23f7828bd429",
              safe_id: "DE.BRAK_SPT.32ad2a4a-d385-49b6-b49e-62a693bd7e40",
              name: "Dr. Johanna-Lina Böhm",
            },
          },
        ],
      },
      {
        id: "019abafa-7d98-7f8a-b5cf-bb8e02fa0775",
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
            aktenzeichen: "C 7904 09/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be90-7b49-9b59-bd27b8e6ba94",
    aktenzeichen_gericht: "N 6710 02/2026",
    status: "Eingereicht",
    status_changed: "2025-02-16T23:26:20.370001Z",
    eingereicht_am: "2021-01-09T19:07:10.714069Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be90-73de-921b-3384453beb1f",
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
            aktenzeichen: "B 1246 03/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be90-790e-98bf-9a11ce64d56f",
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
            aktenzeichen: "Q 908 06/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-764d-bff0-e1806924d76d",
              safe_id: "DE.BRAK_SPT.6f003a0d-ac5f-48d6-b04f-fe4659f42f56",
              name: "Rechtsanwalt Benedikt Krämer",
            },
          },
          {
            aktenzeichen: "M 7767 02/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7f9a-9a5d-a3ef160609f5",
              safe_id: "DE.BRAK_SPT.d303ac6f-240e-4d48-8fd9-9fc07d28fe58",
              name: "Dr. Alina-Mara Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be81-772b-8c18-d21b62ea10e4",
    aktenzeichen_gericht: "J 8931 04/2024",
    status: "Eingereicht",
    status_changed: "2025-09-24T04:30:18.286787Z",
    eingereicht_am: "2021-01-07T03:06:34.250058Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be81-708d-b8b6-4af3ea43938c",
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
        id: "019abaf9-be81-782f-9e06-4f360f9fe7ed",
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
            aktenzeichen: "E 1031 05/2025",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be96-72fb-a289-355e4defd1a8",
    aktenzeichen_gericht: "M 1716 06/2025",
    status: "Eingereicht",
    status_changed: "2025-07-31T23:07:34.580518Z",
    eingereicht_am: "2020-12-31T23:06:40.352611Z",
    gericht: {
      id: "789846d5-6228-8653-a0c9-55531d7c5c48",
      wert: "Amtsgericht Bremen",
      code: "H1101",
    },
    beteiligungen: [
      {
        id: "019abaf9-be96-75c9-82e9-8963f5ed31dd",
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
            aktenzeichen: "W 8603 04/2025",
            bevollmaechtigter: {
              id: "019aa757-29ec-7217-b50a-7d74fd8cf09d",
              safe_id: "DE.BRAK_SPT.41f98142-9db1-4aaf-a631-084f78bfb79d",
              name: "Rechtsanwalt Dr. Helena-Elisabeth-Margarethe von Brück-Kühn-Weiß-Schäfer-Krüger",
            },
          },
        ],
      },
      {
        id: "019abaf9-be97-7a3f-856f-913d36611103",
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
            aktenzeichen: "B 8186 01/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d87-78a9-8846-ff2dc5e98d07",
    aktenzeichen_gericht: "R 6356 01/2025",
    status: "Eingereicht",
    status_changed: "2025-06-30T05:04:07.747134Z",
    eingereicht_am: "2020-12-27T08:03:31.380145Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abafa-7d87-78dc-b4cf-5172ddf2479d",
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
            aktenzeichen: "B 3212 04/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7aa1-af28-bbe07a8fea1e",
              safe_id: "DE.BRAK_SPT.61c9678e-a474-4251-8c01-5c4e6616d559",
              name: "Rechtsanwalt Florian Bär",
            },
          },
        ],
      },
      {
        id: "019abafa-7d87-7c0a-be5e-e69c08b15ca3",
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
            aktenzeichen: "I 9832 01/2026",
            bevollmaechtigter: {
              id: "019aa757-29eb-7d03-a3db-d075dbe7b745",
              safe_id: "DE.BRAK_SPT.599967ae-1295-4ab0-af1f-cbb0763d6a55",
              name: "Dr. Kathrin Hölzer",
            },
          },
          {
            aktenzeichen: "M 7668 07/2025",
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
    id: "019abaf9-be78-70c5-ae19-9aaa5955a301",
    aktenzeichen_gericht: "Z 1511 03/2024",
    status: "Erstellt",
    status_changed: "2025-02-07T02:47:37.5416Z",
    eingereicht_am: "2020-12-21T23:07:48.9706Z",
    gericht: {
      id: "e4538212-a524-2e37-93fd-daaef19209a2",
      wert: "Amtsgericht Köln",
      code: "R3306",
    },
    beteiligungen: [
      {
        id: "019abaf9-be78-7f56-8478-1715b17a436e",
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
            aktenzeichen: "S 9172 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29ea-7f6b-aed4-cd4a5d703fd2",
              safe_id: "DE.BRAK_SPT.b55141f4-feef-41e9-bbc9-e2ace539ed38",
              name: "Rechtsanwalt Friedrich Scholz",
            },
          },
        ],
      },
      {
        id: "019abaf9-be79-7524-af55-e3c653d2b520",
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
            aktenzeichen: "U 9184 01/2024",
            bevollmaechtigter: {
              id: "019aa757-29ec-7ebb-a80b-4dd7daf3d3f7",
              safe_id: "DE.BRAK_SPT.12df46eb-fedd-4f40-a86a-50062811b24a",
              name: "Rechtsanwalt Alina-Marie-Katharina von Krüger-Lösch-Weiß-Kühn-Schönfeld",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d5c-70b6-9f57-fe1395cf6f33",
    aktenzeichen_gericht: "K 8630 09/2025",
    status: "Erstellt",
    status_changed: "2025-01-25T00:18:24.328867Z",
    eingereicht_am: "2020-12-21T00:20:13.373756Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abafa-7d5c-78ab-85a0-6d3a4ba77eb4",
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
            aktenzeichen: "R 488 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7fa9-bae8-178d7e26fd5f",
              safe_id: "DE.BRAK_SPT.3dfeef6a-48af-495e-844a-4bc4dba382f7",
              name: "Rechtsanwalt Dr. Miriam Krüger",
            },
          },
        ],
      },
      {
        id: "019abafa-7d5c-7c93-9d2b-bbb19546b581",
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
            aktenzeichen: "H 7185 10/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abaf9-be7f-711d-8316-81e5d3a089c4",
    aktenzeichen_gericht: "T 4081 01/2026",
    status: "Erstellt",
    status_changed: "2025-05-20T06:01:53.080254Z",
    eingereicht_am: "2020-12-18T07:13:57.141288Z",
    gericht: {
      id: "1e4d18ee-8101-9aed-1e7d-134ec4cb4531",
      wert: "Amtsgericht Erding",
      code: "D2411",
    },
    beteiligungen: [
      {
        id: "019abaf9-be7f-7328-8fe4-edf61bda84b5",
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
        id: "019abaf9-be7f-771a-ad6e-016103d91d46",
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
            aktenzeichen: "Q 4679 08/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7dc2-a58f-663d5675f761",
              safe_id: "DE.BRAK_SPT.9fba0990-ae65-4bef-9eb8-b9b1b9d194f8",
              name: "Rechtsanwalt Dr. Sabine Großmann",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d68-718e-936f-96acc3b49e83",
    aktenzeichen_gericht: "M 2450 10/2025",
    status: "Eingereicht",
    status_changed: "2025-09-29T11:27:05.935341Z",
    eingereicht_am: "2020-12-13T23:08:12.471799Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d68-7291-be12-ca16d8e29c56",
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
            aktenzeichen: "X 5460 09/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7d09-b879-f7828cb8562d",
              safe_id: "DE.BRAK_SPT.78541b1b-202f-42f9-90e3-2a6931e94cfc",
              name: "Rechtsanwalt Dr. Elisa-Luise Roth",
            },
          },
        ],
      },
      {
        id: "019abafa-7d69-717c-b00d-01490868dae8",
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
            aktenzeichen: "F 9829 03/2025",
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
            aktenzeichen: "P 9442 11/2026",
            bevollmaechtigter: {
              id: "019aa757-29ec-7161-97c3-a2fe07e132f5",
              safe_id: "DE.BRAK_SPT.de1d01f9-f7b3-4422-b456-a3954faeb368",
              name: "Rechtsanwalt Maximilian-Johann von und zu Falkenstein",
            },
          },
          {
            aktenzeichen: "N 8468 07/2024",
            bevollmaechtigter: {
              id: "019aa757-27d2-7e21-9460-7b45a06266e3",
              safe_id: "DE.BRAK_SPT.54e1f8d7-8b23-4a96-9c01-2f3e7a6d5b82.5b9a",
              name: "Paula Krüger",
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
  {
    id: "019abaf9-be98-7028-b892-a714d3252dfe",
    aktenzeichen_gericht: "H 5072 02/2024",
    status: "Eingereicht",
    status_changed: "2025-08-13T03:40:12.353454Z",
    eingereicht_am: "2020-12-07T05:54:22.862726Z",
    gericht: {
      id: "243117a4-9658-863b-4a00-000aeb462b43",
      wert: "Amtsgericht Hannover",
      code: "P2305",
    },
    beteiligungen: [
      {
        id: "019abaf9-be98-7db3-ae24-b1a0d49bca9f",
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
            aktenzeichen: "S 607 02/2024",
            bevollmaechtigter: {
              id: "019abaf9-a52f-7217-9f48-5c50193a014e",
              safe_id: "DE.BRAK_SPT.c89b1d58-f513-424d-8bd9-ec9d3ab4acb6",
              name: "Dieter Böhm",
            },
          },
        ],
      },
      {
        id: "019abaf9-be98-7fd4-9539-f3780860ea6c",
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
    ],
  },
  {
    id: "019abafa-7d6e-7455-90f2-a35049e15513",
    aktenzeichen_gericht: "P 4804 11/2026",
    status: "Erstellt",
    status_changed: "2025-08-25T12:57:48.53593Z",
    eingereicht_am: "2020-12-02T16:12:20.175268Z",
    gericht: {
      id: "d58d2e36-7b5e-4b35-20a1-1f49ea275c0a",
      wert: "Amtsgericht Düsseldorf",
      code: "R1101",
    },
    beteiligungen: [
      {
        id: "019abafa-7d6e-764c-9088-81edd9997056",
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
            aktenzeichen: "M 6904 03/2025",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d6f-7293-8256-51acf70dfd67",
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
            aktenzeichen: "T 1084 10/2024",
            bevollmaechtigter: {
              id: "019aa757-29eb-7ae7-8afc-9f73eab04eef",
              safe_id: "DE.BRAK_SPT.a0fbce2e-c289-4ee3-a37a-5fd09344f76b",
              name: "Rechtsanwalt Julia-Maria Roth",
            },
          },
          {
            aktenzeichen: "X 4189 11/2024",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
    ],
  },
  {
    id: "019abafa-7d84-7a6a-b79d-544964f00013",
    aktenzeichen_gericht: "U 4220 11/2025",
    status: "Erstellt",
    status_changed: "2025-08-21T11:46:20.871348Z",
    eingereicht_am: "2020-11-27T13:52:26.72141Z",
    gericht: {
      id: "a8122807-8430-69ad-9d16-36b4b2675017",
      wert: "Amtsgericht Charlottenburg",
      code: "F1103",
    },
    beteiligungen: [
      {
        id: "019abafa-7d84-71fd-9ba9-0507b9dde099",
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
            aktenzeichen: "D 8227 01/2026",
            bevollmaechtigter: {
              id: "019abafa-737c-74c3-baf1-7f13dd20246b",
              safe_id: "DE.BRAK_SPT.db38e58b-8d15-41ed-8f8a-840f61146fff",
              name: "Miriam Kühn",
            },
          },
        ],
      },
      {
        id: "019abafa-7d85-71d3-b81d-4890fb32bcf4",
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
            aktenzeichen: "U 9214 10/2025",
            bevollmaechtigter: {
              id: "019aa757-29eb-760e-958d-d3a360f60456",
              safe_id: "DE.BRAK_SPT.7cad5522-047a-4938-9076-9f2e583f4a11",
              name: "Rechtsanwalt Jonas-Luca Weiß",
            },
          },
        ],
      },
    ],
  },
];
