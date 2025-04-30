import { http, HttpResponse } from "msw";

/**
 * All defined Handlers intercept a request and handle its response
 *
 * @see https://mswjs.io/docs/concepts/request-handler
 * @see https://mswjs.io/docs/basics/intercepting-requests
 * @see https://mswjs.io/docs/basics/mocking-responses
 */
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("https://kompla.sinc.de/api/v1/verfahren", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      {
        id: "019681fd-f793-7e83-a327-4f7b0d181d8d",
        aktenzeichen: "JBA-82746242",
        status: "Eingereicht",
        status_changed: "2025-04-29T14:40:27.028746Z",
        eingereicht_am: "2025-04-29T14:40:27.027498Z",
        gericht_name: "Landgericht Frankfurt",
      },
      {
        id: "019681f8-929a-73bb-a616-9761e760e120",
        aktenzeichen: "JBA-17546037",
        status: "Eingereicht",
        status_changed: "2025-04-29T14:34:33.667032Z",
        eingereicht_am: "2025-04-29T14:34:33.543874Z",
        gericht_name: "Landgericht Bonn",
      },
    ]);
  }),
];
