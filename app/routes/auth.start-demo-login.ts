import { redirect } from "react-router";
import { LoginError } from "~/services/auth/auth.types.ts";
import { magicLinkClient } from "~/services/auth/magicLinkClient.server";
import { logger } from "~/utils/logger.server";

export const loader = async () => {
  try {
    const magicLinkUrl = await magicLinkClient.getMagicLinkUrl();
    return redirect(magicLinkUrl);
  } catch (error) {
    logger.error({ error }, "Demo (magic link) login initiation failed");
    return redirect(`/login?status=${LoginError.Demo}`);
  }
};
