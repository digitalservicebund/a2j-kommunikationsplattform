import { authorizeToken } from "../api/authorizeToken.server";
import { refreshAccessToken } from "../api/refreshToken.server";
import {
  getUserSession,
  updateUserSessionWithApiTokens,
} from "./session.server";

/**
 * getBearerToken
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(request: Request): Promise<string> {
  const userSession = await getUserSession(request);

  try {
    const apiAccessToken = userSession?.apiAccessToken;

    if (apiAccessToken) {
      // if expired throw an error
      if (new Date(Number(userSession?.apiAcessExpiresAt)) < new Date()) {
        throw new Error("API access expired");
      }

      // return the token
      return apiAccessToken;
    } else {
      // if not present, get an api access token
      const accessToken = userSession?.accessToken ?? "";
      const token = await authorizeToken(accessToken);

      await updateUserSessionWithApiTokens(
        token.access_token,
        Number(token.expires_in),
        token.refresh_token,
        Number(token.refresh_expires_in),
        request,
      );

      // return a fresh token (token exchange)
      return token.access_token;
    }
  } catch (error) {
    console.log("error 1", error);

    if (error) {
      console.log("error 2 is:", JSON.stringify(error));

      const apiRefreshToken = userSession?.apiRefreshToken ?? "";
      const token = await refreshAccessToken(apiRefreshToken);

      await updateUserSessionWithApiTokens(
        token.access_token,
        Number(token.expires_in),
        token.refresh_token,
        Number(token.refresh_expires_in),
        request,
      );

      // return a fresh token (refresh token exchange)
      return token.access_token;
    }

    // throw again any unexpected error that could've happened
    throw error;
  }
}
