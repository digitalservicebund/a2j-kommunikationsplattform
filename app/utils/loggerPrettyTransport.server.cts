import type { PrettyOptions } from "pino-pretty";

module.exports = {
  target: "pino-pretty",
  options: { colorize: true } satisfies PrettyOptions,
};
