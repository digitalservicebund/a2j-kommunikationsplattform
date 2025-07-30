import { config } from "~/config/config";

/**
 * Sets Cookie secure based on ENVIRONMENT
 *
 * @see: https://github.com/digitalservicebund/a2j-rechtsantragstelle/blob/main/app/util/useSecureCookie.ts
 */
export const useSecureCookie = ["staging", "production"].includes(
  config().ENVIRONMENT,
);
