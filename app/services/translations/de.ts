// German translations

export const de = {
  footer: {
    PROJECT_DESCRIPTION:
      " Ein Onlineprojekt der DigitalService GmbH des Bundes in Zusammenarbeit mit der BRAK, SINC und im Auftrag des BMJV.",
    FOOTER_ARIA_LABEL: "Rechtliche und weiterführende Informationen",
  },
  login: {
    LOGIN_BUTTON_BEA: "Anmeldung Anwaltschaft (über beA Login)",
    LOGIN_BUTTON_DEVELOPER: "Login als Entwickler*in",
    LOGIN_BUTTON_GERICHTE: "Anmeldung Gerichte",
    LOGIN_BUTTON_TEST_ZUGANG: "Testzugang",
    WELCOME_TITLE:
      "Willkommen auf der Pilotplattform für den digitalen Austausch zwischen Gerichten und Verfahrensbeteiligten.",
  },
  alert: {
    LOGOUT_AUTOMATIC_MESSAGE:
      "Aus Sicherheitsgründen wurden Sie nach 60 Minuten Inaktivität automatisch abgemeldet. Bitte melden Sie sich erneut an.",
    LOGOUT_BY_USER_MESSAGE: "Erfolgreich abgemeldet",
    LOGIN_ERROR_MESSAGE_BEA:
      "Die Anmeldung über beA ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
  },
} as const;

export type RouteName = keyof typeof de;
