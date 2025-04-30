import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

/**
 * Request interception by MSW
 *
 * @see https://mswjs.io/docs/getting-started
 */
console.log("Start request interception by MSW: https://mswjs.io/");
export const server = setupServer(...handlers);
