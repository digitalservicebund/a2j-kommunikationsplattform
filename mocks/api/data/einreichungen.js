export const mockedEinreichungen = [
  // matches first mockVerfahren in default sort order within UI
  {
    id: "3cf0f6be-5e99-11f1-9bd2-325096b39f47",
    verfahren_id: "019c572a-d6d4-77a8-aad7-ae4496fa2463",
    name: "Einreichung Name",
    erstellt_von: "Musterfrau",
    erstellt_am: "2026-05-01T08:13:39.792Z",
    status: "EINGEREICHT",
    gesendet_am: "2026-05-01T08:13:39.792Z",
    eingereicht_am: "2026-05-01T08:13:39.792Z",
  },
  // 2nd mockVerfahren in default sort order
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    verfahren_id: "019c5741-7287-760b-865e-541a69c2aa8d",
    name: "Noch eine Einreichung",
    erstellt_von: "Jane",
    erstellt_am: "2026-06-02T08:13:39.792Z",
    status: "ERSTELLT",
    gesendet_am: "2026-06-02T08:13:39.792Z",
    eingereicht_am: "2026-06-02T08:13:39.792Z",
  },
  {
    id: "f673a416-5e5c-11f1-8b35-325096b39f47",
    verfahren_id: "019c5741-7287-760b-865e-541a69c2aa8d",
    name: "Eine weitere Einreichung",
    erstellt_von: "Doe",
    erstellt_am: "2026-06-01T08:13:39.792Z",
    status: "VALIDIERT",
    gesendet_am: "2026-06-01T08:13:39.792Z",
    eingereicht_am: "2026-06-01T08:13:39.792Z",
  },
  {
    id: "4aec2e8c-5e99-11f1-abc9-325096b39f47",
    verfahren_id: "019c5741-7287-760b-865e-541a69c2aa8d",
    name: "Einreichung Initial",
    erstellt_von: "Musterfrau",
    erstellt_am: "2026-01-01T08:13:39.792Z",
    status: "EINGEREICHT",
    gesendet_am: "2026-01-01T08:13:39.792Z",
    eingereicht_am: "2026-01-01T08:13:39.792Z",
  },
  // matches 3rd mockVerfahren in default sort order
  {
    id: "554e8956-5e99-11f1-8a89-325096b39f47",
    verfahren_id: "019c5733-2edb-7702-84d7-77f416b5f16c",
    name: "Einreichung Name 3",
    erstellt_von: "Musterfrau",
    erstellt_am: "2026-02-01T08:13:39.792Z",
    status: "ERSTELLT",
    gesendet_am: "2026-02-01T08:13:39.792Z",
    eingereicht_am: "2026-02-01T08:13:39.792Z",
  },
  {
    id: "5d118abc-5e99-11f1-8c77-325096b39f47",
    verfahren_id: "019c5733-2edb-7702-84d7-77f416b5f16c",
    name: "Einreichung Name 4",
    erstellt_von: "Musterfrau",
    erstellt_am: "2026-04-01T08:13:39.792Z",
    status: "EINGEREICHT",
    gesendet_am: "2026-04-01T08:13:39.792Z",
    eingereicht_am: "2026-04-01T08:13:39.792Z",
  },
  {
    id: "d77590e8-718e-11f1-bd14-325096b39f47",
    verfahren_id: "019c572a-d6d4-77a8-aad7-ae4496fa2463",
    name: "Klageeinreichung test local",
    erstellt_von: "Musterfrau",
    erstellt_am: "2026-04-01T08:13:39.792Z",
    status: "ERSTELLT",
    gesendet_am: "2026-04-01T08:13:39.792Z",
    eingereicht_am: "2026-04-01T08:13:39.792Z",
  },
];

export const mockedEinreichungenStatus = [
  {
    id: "d77590e8-718e-11f1-bd14-325096b39f47",
    verfahren_id: "019c572a-d6d4-77a8-aad7-ae4496fa2463",
    status: {
      status: "GRUEN",
      validation_messages: [
        {
          status: "GRUEN",
          message: null,
        },
      ],
    },
  },
  {
    id: "3cf0f6be-5e99-11f1-9bd2-325096b39f47",
    verfahren_id: "019c572a-d6d4-77a8-aad7-ae4496fa2463",
    status: {
      status: "GRUEN",
      validation_messages: [
        {
          status: "GRUEN",
          message: null,
        },
      ],
    },
  },
  // 2nd mockVerfahren in default sort order
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    verfahren_id: "019c5741-7287-760b-865e-541a69c2aa8d",
    status: {
      status: "GRUEN",
      validation_messages: [
        {
          status: "GRUEN",
          message: null,
        },
      ],
    },
  },
  {
    id: "f673a416-5e5c-11f1-8b35-325096b39f47",
    verfahren_id: "019c5741-7287-760b-865e-541a69c2aa8d",
    status: {
      status: "ROT",
      validation_messages: [
        {
          status: "ROT",
          message:
            "Die Einreichung enthält ungültige Dateien. Bitte überprüfen Sie die Einreichung und starten Sie eine neue Einreichung.",
        },
      ],
    },
  },
  {
    id: "4aec2e8c-5e99-11f1-abc9-325096b39f47",
    verfahren_id: "019c5741-7287-760b-865e-541a69c2aa8d",
    status: {
      status: "GELB",
      validation_messages: [
        {
          status: "GELB",
          message:
            "Ergänzen Sie die Einreichung um alle relevanten XJustiz-Dateien für eine schnellere Bearbeitung am Gericht.",
        },
      ],
    },
  },
  {
    id: "554e8956-5e99-11f1-8a89-325096b39f47",
    verfahren_id: "019c5733-2edb-7702-84d7-77f416b5f16c",
    status: {
      status: "GRUEN",
      validation_messages: [
        {
          status: "GRUEN",
          message: null,
        },
      ],
    },
  },
  {
    id: "5d118abc-5e99-11f1-8c77-325096b39f47",
    verfahren_id: "019c5733-2edb-7702-84d7-77f416b5f16c",
    status: {
      status: "GELB",
      validation_messages: [
        {
          status: "GELB",
          message:
            "Ergänzen Sie die Einreichung um alle relevanten XJustiz-Dateien für eine schnellere Bearbeitung am Gericht.",
        },
      ],
    },
  },
];
