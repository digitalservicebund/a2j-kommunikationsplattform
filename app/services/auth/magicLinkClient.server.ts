import { serverConfig } from "~/config/config.server";
import { MagicLinkStrategy } from "./MagicLinkStrategy.server";

export const magicLinkClient = new MagicLinkStrategy({
  idpIssuer: serverConfig().KOMPLA_IDP_OIDC_ISSUER,
  serviceClientId: serverConfig().KOMPLA_MAGIC_LINK_SERVICE_CLIENT_ID,
  serviceClientSecret: serverConfig().KOMPLA_MAGIC_LINK_SERVICE_CLIENT_SECRET,
  clientId: serverConfig().KOMPLA_MAGIC_LINK_CLIENT_ID,
  redirectUri: serverConfig().KOMPLA_MAGIC_LINK_REDIRECT_URI,
  username: serverConfig().KOMPLA_MAGIC_LINK_DEMO_USERNAME,
  email: serverConfig().KOMPLA_MAGIC_LINK_DEMO_EMAIL,
});
