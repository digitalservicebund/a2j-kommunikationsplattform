// English translations

import { Translations } from "~/services/translations/index";

export const en: Translations = {
  buttons: {
    LOGIN_BUTTON_BEA: "Login for lawyers (via beA Login)",
    LOGIN_BUTTON_DEVELOPER: "Login as developer",
    LOGIN_BUTTON_GERICHTE: "Login for courts",
    LOGIN_BUTTON_TEST_ZUGANG: "Test access",
    ABMELDEN_BUTTON: "Logout",
    SHOW_VERFAHERN_DETAILS: "Show case details",
  },
  alerts: {
    LOGOUT_AUTOMATIC_TITLE: "Automatically logged out",
    LOGOUT_AUTOMATIC_MESSAGE:
      "For security reasons, you have been automatically logged out after 60 minutes of inactivity. Please log in again.",
    LOGOUT_BY_USER_MESSAGE: "Successfully logged out",
    LOGIN_ERROR_MESSAGE_BEA: "Login via beA failed. Please try again.",
    WORK_IN_PROGRESS_TITLE: "Work in progress",
    WORK_IN_PROGRESS_MESSAGE:
      "This page is still under development. Layouts and displays may change at any time.",
  },
  labels: {
    FOOTER_ARIA_LABEL: "Legal and further information",
    UEBERSICHT_LABEL: "Overview",
    VERFAHREN_LABEL: "Cases",
    MITTEILUNGEN_LABEL: "Messages",
    KALENDER_LABEL: "Calendar",
    VERFAHREN_DETAILS_LABEL: "Case details",
    DATEIANSICHT_LABEL: "File view",
  },
  titles: {
    PLATFORM_TITLE: "Communication Platform | Justice Services",
    WELCOME_TITLE:
      "Welcome to the pilot platform for digital exchange between courts and parties involved in proceedings.",
  },
  descriptions: {
    PROJECT_DESCRIPTION:
      " An online project by DigitalService GmbH of the Federal Government in cooperation with BRAK, SINC and on behalf of the BMJV.",
    PLATFORM_DESCRIPTION:
      "Welcome to the pilot platform for digital exchange between courts and parties involved in proceedings.",
  },
} as const;

export default en;
