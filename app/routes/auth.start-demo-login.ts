import { redirect } from "react-router";
import { magicLinkClient } from "~/services/auth/magicLinkClient.server";
import { LoginError } from "./action.login-user";

export const loader = async () => {
  try {
    const magicLinkUrl = await magicLinkClient.getMagicLinkUrl();
    return redirect(magicLinkUrl);
  } catch (error) {
    console.error("Demo (magic link) login initiation failed:", error);
    return redirect(`/login?status=${LoginError.Demo}`);
  }
};
