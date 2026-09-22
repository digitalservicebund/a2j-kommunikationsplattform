import { redirect } from "react-router";
import { LoginError } from "~/services/auth/auth.types.ts";
import { magicLinkClient } from "~/services/auth/magicLinkClient.server";

export const loader = async () => {
  try {
    const magicLinkUrl = await magicLinkClient.getMagicLinkUrl();
    return redirect(magicLinkUrl);
  } catch (error) {
    console.error("Demo (magic link) login initiation failed:", error);
    return redirect(`/login?status=${LoginError.Demo}`);
  }
};
