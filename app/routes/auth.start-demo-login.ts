import { redirect } from "react-router";
import { getDemoMagicLinkUrl } from "~/services/auth/oAuth.server";
import { LoginError } from "./action.login-user";

export const loader = async () => {
  try {
    const magicLinkUrl = await getDemoMagicLinkUrl();
    return redirect(magicLinkUrl);
  } catch (error) {
    console.error("Demo (magic link) login initiation failed:", error);
    return redirect(`/login?status=${LoginError.Demo}`);
  }
};
