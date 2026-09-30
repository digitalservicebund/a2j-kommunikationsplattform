import pino from "pino";
import { config } from "~/config/config";

export const logger = pino({
  level: config().LOG_LEVEL,
  browser: { asObject: true },
});
