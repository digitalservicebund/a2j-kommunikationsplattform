export const de = {
  buttons: {
    prev: "Zurück",
    LOGIN_BUTTON_BEA: "Anwaltschaft (mit beA anmelden)",
    LOGIN_BUTTON_DEVELOPER: "Login als Entwickler*in",
    LOGIN_BUTTON_DEMO_LABEL: "Gastzugang",
    LOGIN_BUTTON_KOMPLA_IDP_LABEL: "KomPla-IdP-Login",
    ABMELDEN_BUTTON: "Abmelden",
    ANMELDEN_BUTTON: "Anmelden",
    SHOW_VERFAHREN_DETAILS: "Verfahrensdetails anzeigen",
    SHOW_URTEIL: "Urteil anzeigen",
    LOAD_MORE_VERFAHREN: "Weitere Verfahren laden",
    SEARCH_BUTTON: "Suchen",
    SCROLL_TO_TOP_BUTTON: "Zum Seitenanfang",
  },
  errorMessages: {
    TRY_LATER_MESSAGE: "Bitte versuchen Sie es später erneut.",
    LOGIN_ERROR_MESSAGE: "Fehler bei der Anmeldung",
    UNKNOWN_PAGE_LABEL: "Fehler 404",
    UNKNOWN_PAGE_HEADING: "Seite konnte nicht gefunden werden",
    UNKNOWN_PAGE_BODY:
      "Die von Ihnen gewünschte Seite ist leider nicht verfügbar. Dies kann verschiedene Ursachen haben. \nWenn Sie die URL direkt eingegeben haben, überprüfen Sie die Schreibweise.\nVersuchen Sie, die Seite von der Startseite aus erneut zu finden.",
    SERVER_ERROR_LABEL: "Fehler 500",
    SERVER_ERROR_HEADING: "Ein interner Serverfehler ist aufgetreten",
    SERVER_ERROR_BODY:
      "Der Fehler liegt auf unserer Seite. Wir arbeiten bereits an einer Lösung. \nFalls das Problem bestehen bleibt, kontaktieren Sie unseren Support.",
    GENERIC_ERROR_LABEL: "Ein Fehler ist aufgetreten",
    GENERIC_ERROR_HEADING: "Etwas ist schiefgelaufen",
    GENERIC_ERROR_BODY: "Bitte versuchen Sie es später erneut.",
    API_GET_VERFAHREN_ERROR_MESSAGE:
      "Die Verfahren konnten nicht geladen werden. Dies kann verschiedene Ursachen haben. Versuchen Sie es zu einem späteren Zeitpunkt noch einmal.",
  },
  alerts: {
    LOGOUT_AUTOMATIC_TITLE: "Automatisch abgemeldet",
    LOGOUT_AUTOMATIC_MESSAGE:
      "Aus Sicherheitsgründen wurden Sie nach 60 Minuten Inaktivität automatisch abgemeldet. Bitte melden Sie sich erneut an.",
    LOGOUT_BY_USER_MESSAGE: "Erfolgreich abgemeldet",
    LOGIN_ERROR_BEA_TITLE: "Fehler bei der Anmeldung",
    LOGIN_ERROR_BEA_MESSAGE:
      "Die Anmeldung über beA ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
    LOGIN_ERROR_DEMO_TITLE: "Fehler beim Testzugang",
    LOGIN_ERROR_DEMO_MESSAGE:
      "Die Anmeldung über den Testzugang ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
    LOGIN_ERROR_KOMPLA_IDP_TITLE: "Fehler beim KomPla-IdP-Login",
    LOGIN_ERROR_KOMPLA_IDP_MESSAGE:
      "Die Anmeldung über den KomPla-IdP-Login ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
    WORK_IN_PROGRESS_TITLE: "Vorläufige Ansicht",
    WORK_IN_PROGRESS_MESSAGE:
      "Diese Seite ist noch in der Entwicklung. Darstellungen und Layouts können sich jederzeit ändern.",
    TOO_MANY_RESULTS_TITLE: "Es wurden sehr viele Ergebnisse gefunden",
    TOO_MANY_RESULTS_MESSAGE:
      "Um schneller zum gewünschten Inhalt zu gelangen, nutzen Sie bitte die Filteroptionen oder geben Sie direkt eine gezielte Suche über die freie Textsuche ein.",
    NO_VERFAHREN_FOUND_TITLE: "Aktuell liegen keine Verfahren vor",
    NO_VERFAHREN_FOUND_MESSAGE:
      "Nach einer erfolgreichen Einreichung oder Zuteilung werden die entsprechenden Verfahren hier angezeigt.",
    NO_VERFAHREN_FOUND_WITH_FILTERS_TITLE:
      "Keine passenden Ergebnisse gefunden",
    NO_VERFAHREN_FOUND_WITH_FILTERS_MESSAGE:
      "Es konnten keine passenden Ergebnisse für Ihre Suche/Filtereinstellungen gefunden werden. Bitte überprüfen Sie Ihre Eingaben oder ändern Sie die Filter, um andere Ergebnisse zu sehen.",
  },
  shared: {
    loading: "Wird geladen...",
    dokumentType: {
      anhang: "Anhang",
      schriftstueck: "Schriftstück",
      xjustiz: "XJustiz",
    },
    form: {
      search: {
        placeholder:
          "Freie Textsuche zum Beispiel nach Aktenzeichen, Parteien, Gerichten, ...",
      },
      select: {
        placeholder: "Bitte auswählen",
      },
      selectDokumentType: {
        label: "Dateityp",
        hint: "Wählen Sie einen Dateityp zur besseren Zuordnung",
        error:
          "Bitte wählen Sie zwischen einem Schriftstück, einem Anhang oder einer XJustiz Datei.",
      },
      uploadDokument: {
        label: "Datei hochladen",
        hint: "Erlaubte Formate: PDF, DOCX. Maximale Dateigröße ist 104 MB.",
        error:
          "Keine Datei ausgewählt? Ist ihre Datei zu groß? Oder der Dateityp wird nicht unterstützt. Bitte laden Sie eine Datei mit maximal 104 MB hoch. Unterstützte Dateitypen sind: *.pdf, *.doc, *.docx und *.xml (XJustiz).",
      },
      deleteDokument: {
        label: "Entfernen",
      },
      submit: {
        title: "Fehler beim Absenden des Formulars",
        message: "Bitte versuchen Sie es später erneut.",
      },
      labels: {
        forename: "Vorname",
        lastname: "Nachname",
        street: "Straße",
        houseNumber: "Hausnummer",
        postcode: "Postleitzahl",
        place: "Ort",
        eMail: "E-Mail (optional)",
        phone: "Telefon (optional)",
        rubrum: "Rubrum",
        legalRepresentativesReferenceNumber:
          "Geschäftszeichen des Prozessbevollmächtigten",
        recipientCourt: "Empfängergericht",
        subjectMatterOfTheProceedings: "Verfahrensgegenstand",
        edit: "Bearbeiten",
      },
    },
    beteiligte: {
      klaegerLabel: "Klagende Partei",
      beklagteLabel: "Beklagte Partei",
      fallbackLabel: "Keine Beteiligten angegeben.",
    },
    gericht: {
      briefSummaryTitle: "Empfängergericht",
      label: "Gericht",
      azLabel: "Aktenzeichen",
      kontoinhaberLabel: "Zahlungsempfänger",
      ibanLabel: "IBAN",
    },
    HEADER_ARIA_LABEL: "Hauptmenü",
    FOOTER_ARIA_LABEL: "Rechtliche und weiterführende Informationen",
    UEBERSICHT_LABEL: "Übersicht",
    VERFAHREN_LABEL: "Verfahren",
    VERFAHREN_DETAILS_LABEL: "Verfahrensdetails",
    DATEIANSICHT_LABEL: "Dateiansicht",
    KOPFZEILE_LABEL: "Offizielle Website – Bundesrepublik Deutschland",
    LOGO_LABEL: "Kommunikationsplattform",
    LOGO_ARIA_LABEL: "Kommmunikationsplattform - Zurück zur Startseite",
    LOGGED_IN_AS_LABEL: "Angemeldet als:",
    TO_START_PAGE_LABEL: "Zur Startseite",
    CONTACT_SUPPORT_LABEL: "Kontaktieren Sie den Support",
    MORE_THAN_100_VERFAHREN_LABEL: "Mehr als 100 Verfahren",
    SHOW_ALL_LABEL: "Alle anzeigen",
    RESULTS_LABEL: "Ergebnisse",
    SEARCH_LABEL: "Suche",
    SORT_LABEL: "Sortierung",
    COURT_LABEL: "Zuständiges Gericht",
    VERFAHREN_EINREICHUNGEN_LATEST_FIRST_LABEL: "Neuste Einreichungen zuerst",
    VERFAHREN_EINREICHUNGEN_OLDEST_FIRST_LABEL: "Älteste Einreichungen zuerst",
    VERFAHREN_AKTENZEICHEN_ASC_LABEL: "Aktenzeichen des Gerichts (A↓Z)",
    VERFAHREN_AKTENZEICHEN_DESC_LABEL: "Aktenzeichen des Gerichts (Z↓A)",
    TESTZUGANG_BANNER_LABEL_PRE: "Sie befinden sich aktuell in der ",
    TESTZUGANG_BANNER_LABEL_BOLD: "öffentlichen Testumgebung",
    TESTZUGANG_BANNER_LABEL_POST:
      ". Die angezeigten Daten sind zufällig generiert und entsprechen nicht realen Vorgängen.",
  },
  routes: {
    login: {
      headline: "Anmeldung",
      intro:
        "Willkommen auf der Pilotplattform für den digitalen Austausch zwischen Gerichten und Verfahrensbeteiligten.",
    },
    index: {
      headline: "Alle Verfahren in der Übersicht",
    },
    verfahrenNeu: {
      step1: {
        headline: "Neue Klage einreichen",
        progress: "Schritt 1 von 3",
        subline: "Klageschrift hochladen",
        intro:
          "Laden Sie Ihre Klageschrift als PDF- oder Word-Datei hoch. Wir extrahieren die wichtigsten Daten automatisch für Sie.",
        analysis: {
          hint: "Wir lesen Beteiligte, Gericht und Streitgegenstand aus und füllen das Formular vor.",
          label: "Automatische Analyse der Klageschrift aktivieren",
        },
        navigation: {
          next: "Datei hochladen und weiter",
        },
      },
      step2: {
        headline: "Neue Klage einreichen",
        progress: "Schritt 2 von 3",
        subline: "Verfahrensbeteiligte & Details",
        intro: "Bitte prüfen und ergänzen Sie die Angaben zu den Beteiligten.",
        navigation: {
          next: "Weiter zur Überprüfung",
        },
        notification: {
          headline: "Daten automatisch übernommen",
          copy: "Wir haben die Angaben aus Ihrer Klageschrift vorausgefüllt. Bitte prüfen Sie alle Felder sorgfältig.",
        },
        form: {
          plaintiff: {
            title: "Klagende Partei",
            description:
              "Alle Angaben zur klagenden Partei, dem Kläger oder der Klägerin. Hier können Sie auch angeben, ob eine anwaltliche Vertretung vorhanden ist.",
            hasLawyer: {
              checkbox: "Anwaltliche Vertretung ist vorhanden",
              title: "Angaben zum Anwalt",
              nameOfLawFirm:
                "Name der Kanzlei / Sozietät / Berufsausübungsgesellschaft",
            },
          },
          defendant: {
            title: "Beklagte Partei",
            description:
              "Alle Angaben zur beklagten Partei, dem Beklagten oder der Beklagten.",
          },
          verfahrenDetails: {
            title: "Verfahrensdetails",
          },
          assets: {
            title: "Anlagen & Beweismittel",
            description:
              "Fügen Sie Beweismittel und weitere Dokumente hinzu (optional).",
          },
        },
      },
      step3: {
        headline: "Neue Klage einreichen",
        progress: "Schritt 3 von 3",
        subline: "Überprüfung & Abgabe",
        navigation: {
          next: "Klage einreichen & Abgabe ans Gericht",
        },
        summary: {
          aktenzeichen: "Az. wird vergeben",
          gericht: "Gericht ist unbekannt",
          badgeLabels: {
            ready: "Bereit zur Abgabe",
            soon: "Noch wenige Schritte zur Abgabe",
          },
        },
        proceduralSteps: {
          headline: "Verfahrensschritte",
          einreichung: {
            timelineLabel: "Entwurf",
            basisdaten: {
              label: "Basisdaten",
              titleLabel: "Aktuelle Einreichung",
              artLabel: "Art der Einreichung",
              gzLabel: "Geschäftszeichen",
              createdLabel: "Erstellt am",
            },
            additionalData: {
              label: "Weitere Daten",
              rubrumLabel: "Rubrum",
              verfahrensgegenstandLabel: "Verfahrensgegenstand",
            },
            dokumente: {
              uploadedAtLabel: "hochgeladen am",
            },
            submit: " Klage einreichen & Abgabe ans Gericht",
          },
          assets: {
            title: "Anlagen & Beweismittel",
            filesAddedLabel: "Datei(en) hinzugefügt",
          },
          addDetails: {
            title: "Verfahrensbeteiligte & Details erfasst",
          },
          klageschriftUpload: {
            title: "Klageschrift hochgeladen",
          },
        },
      },
    },
    verfahrenDetails: {
      headline: "Verfahrensdetailseite",
    },
    PLATFORM_TITLE: "Kommunikationsplattform | Justiz-Services",
    DATENSCHUTZ_TITLE: "Datenschutzerklärung zur Webseite",
    WEITERE_INFORMATIONEN_TITLE: "Weitere Informationen",
    BARRIEREFREIHEIT_TITLE: "Erklärung zur Barrierefreiheit",
    HILFE_UND_KONTAKT_TITLE: "Hilfe und Kontakt",
    OPEN_SOURCE_CODE_TITLE: "Open Source Code",
    IMPRESSUM_TITLE: "Impressum",
  },
  descriptions: {
    PROJECT_DESCRIPTION:
      "Ein Onlineprojekt der DigitalService GmbH des Bundes in Zusammenarbeit mit der BRAK, SINC und im Auftrag des BMJV.",
    PLATFORM_DESCRIPTION:
      "Willkommen auf der Pilotplattform für den digitalen Austausch zwischen Gerichten und Verfahrensbeteiligten.",
  },
  contentLinkLabels: {
    DATENSCHUTZ_LINK_LABEL: "Datenschutz",
    WEITERE_INFORMATIONEN_LINK_LABEL: "Weitere Informationen",
    BARRIEREFREIHEIT_LINK_LABEL: "Barrierefreiheit",
    HILFE_UND_KONTAKT_LINK_LABEL: "Hilfe und Kontakt",
    OPEN_SOURCE_CODE_LINK_LABEL: "Open Source Code",
    IMPRESSUM_LINK_LABEL: "Impressum",
  },
  breadcrumb: {
    start: "Start",
    verfahrenNeu: "Neue Klage einreichen",
    verfahrenId: "Verfahren",
    verfahrenIdBearbeiten: "Bearbeitung",
  },
} as const;

export default de;
