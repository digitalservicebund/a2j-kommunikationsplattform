import { Authenticator } from "remix-auth";
import { CodeChallengeMethod, OAuth2Strategy } from "remix-auth-oauth2";
import { config } from "~/config/config.server";
import { createUserSession } from "./session.server";
import { z } from "zod";

export const UserSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.number(),
});

export type User = z.infer<typeof UserSchema>;

export const authenticator = new Authenticator<User>();

authenticator.use(
  new OAuth2Strategy(
    {
      cookie: "oauth2",
      clientId: config().BRAK_IDP_OIDC_CLIENT_ID,
      clientSecret: config().BRAK_IDP_OIDC_CLIENT_SECRET,
      authorizationEndpoint: `${config().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/auth`,
      tokenEndpoint: `${config().BRAK_IDP_OIDC_ISSUER}/protocol/openid-connect/token`,
      redirectURI: `${config().BRAK_IDP_OIDC_REDIRECT_URI}`,
      // scopes: ["safe_oidc", "email", "profile"], // TODO: Check which scopes we need
      codeChallengeMethod: CodeChallengeMethod.S256,
    },
    async ({ tokens, request }) => {
      const user: User = {
        accessToken: tokens.accessToken(),
        expiresAt: Date.now() + 60 * 60 * 1000 * 24 * 14, // 14 days
      };

      await createUserSession(user, request);

      return user;
    },
  ),
  "bea", // name of the strategy. When you call `authenticate`, you pass this name to use this strategy.
);
