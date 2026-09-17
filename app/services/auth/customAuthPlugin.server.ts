import { createAuthEndpoint } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import { z } from "zod";
import { AuthenticationProvider } from "./auth.types";

const signInCustomBodySchema = z.object({
  provider: z.enum([
    AuthenticationProvider.DEMO,
    AuthenticationProvider.DEVELOPMENT,
  ]),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number(),
  idToken: z.string().optional(),
});

/**
 * Mints a Better Auth session for the Demo/Developer login paths, which
 * skip the real OAuth2 round-trip; the caller must obtain tokens beforehand.
 */
export function customAuthPlugin() {
  return {
    id: "custom-auth",
    endpoints: {
      signInCustom: createAuthEndpoint(
        "/sign-in/custom",
        {
          method: "POST",
          body: signInCustomBodySchema,
        },
        async (ctx) => {
          const { provider, accessToken, refreshToken, expiresAt, idToken } =
            ctx.body;

          const user = await ctx.context.internalAdapter.createUser(
            {
              email: `${provider}-${crypto.randomUUID()}@no-email.kompla-justiz.internal`,
              name: provider,
              emailVerified: false,
              authProvider: provider,
            },
            { method: "custom" },
          );

          await ctx.context.internalAdapter.createAccount({
            userId: user.id,
            providerId: provider,
            accountId: user.id,
            accessToken,
            refreshToken,
            accessTokenExpiresAt: new Date(expiresAt),
            idToken,
          });

          const session = await ctx.context.internalAdapter.createSession(
            user.id,
          );

          await setSessionCookie(ctx, { session, user });

          return ctx.json({ success: true });
        },
      ),
    },
  };
}
