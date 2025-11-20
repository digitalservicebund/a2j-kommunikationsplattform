// English translations

import { Translations } from "~/services/translations/index";

export const en: Translations = {
  buttons: {
    LOGIN_BUTTON_BEA: "Login for lawyers (via beA Login)",
    LOGIN_BUTTON_DEVELOPER: "Login as developer",
    LOGIN_BUTTON_GERICHTE: "Login for courts",
    LOGIN_BUTTON_TEST_ZUGANG: "Test access",
    ABMELDEN_BUTTON: "Logout",
    ANMELDEN_BUTTON: "Login",
    BACK_BUTTON: "Back",
    SHOW_VERFAHREN_DETAILS: "Show case details",
    SHOW_URTEIL: "Show judgment",
    LOAD_MORE_VERFAHREN: "Load more cases",
  },
  errorMessages: {
    TRY_LATER_MESSAGE: "Please try again later.",
    LOGIN_ERROR_MESSAGE: "Login error",
    UNKNOWN_PAGE_LABEL: "Error 404",
    UNKNOWN_PAGE_HEADING: "Page could not be found",
    UNKNOWN_PAGE_BODY:
      "The page you requested is unfortunately not available. There may be various reasons for this. If you entered the URL directly, please check the spelling. Try to find the page again from the home page.",
    SERVER_ERROR_LABEL: "Error 500",
    SERVER_ERROR_HEADING: "An internal server error has occurred",
    SERVER_ERROR_BODY:
      "The error is on our side. We are already working on a solution. If the problem persists, please contact our support.",
    GENERIC_ERROR_LABEL: "An error has occurred",
    GENERIC_ERROR_HEADING: "Something went wrong",
    GENERIC_ERROR_BODY: "Please try again later.",
    API_GET_VERFAHREN_ERROR_MESSAGE:
      "The cases could not be loaded. There may be various reasons for this. Please try again later.",
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
    TOO_MANY_RESULTS_TITLE: "Too many results found",
    TOO_MANY_RESULTS_MESSAGE:
      "To get to the desired content faster, please use the filter options or enter a targeted search via the free text search.",
  },
  labels: {
    FOOTER_ARIA_LABEL: "Legal and further information",
    UEBERSICHT_LABEL: "Overview",
    VERFAHREN_LABEL: "Cases",
    MITTEILUNGEN_LABEL: "Messages",
    KALENDER_LABEL: "Calendar",
    VERFAHREN_DETAILS_LABEL: "Case details",
    DATEIANSICHT_LABEL: "File view",
    KOPFZEILE_LABEL: "Official website – Federal Republic of Germany",
    LOGO_LABEL: "Kommunikationsplattform",
    LOGGED_IN_AS_LABEL: "Logged in as:",
    TO_START_PAGE_LABEL: "Home",
    CONTACT_SUPPORT_LABEL: "Contact support",
    MORE_THAN_100_VERFAHREN_LABEL: "More than 100 cases",
  },
  titles: {
    PLATFORM_TITLE: "Communication Platform | Justice Services",
    WELCOME_TITLE:
      "Welcome to the pilot platform for digital exchange between courts and parties involved in proceedings.",
    DATENSCHUTZ_TITLE: "Privacy Policy for the Website",
    WEITERE_INFORMATIONEN_TITLE: "Further Information",
    BARRIEREFREIHEIT_TITLE: "Accessibility Statement",
    HILFE_UND_KONTAKT_TITLE: "Help and Contact",
    OPEN_SOURCE_CODE_TITLE: "Open Source Code",
    IMPRESSUM_TITLE: "Imprint",
  },
  descriptions: {
    PROJECT_DESCRIPTION:
      "An online project by DigitalService GmbH of the Federal Government in cooperation with BRAK, SINC and on behalf of the BMJV.",
    PLATFORM_DESCRIPTION:
      "Welcome to the pilot platform for digital exchange between courts and parties involved in proceedings.",
  },
  contentLinkLabels: {
    DATENSCHUTZ_LINK_LABEL: "Data protection",
    WEITERE_INFORMATIONEN_LINK_LABEL: "Further information",
    BARRIEREFREIHEIT_LINK_LABEL: "Accessibility",
    HILFE_UND_KONTAKT_LINK_LABEL: "Help and contact",
    OPEN_SOURCE_CODE_LINK_LABEL: "Open source code",
    IMPRESSUM_LINK_LABEL: "Imprint",
  },
} as const;

export default en;
