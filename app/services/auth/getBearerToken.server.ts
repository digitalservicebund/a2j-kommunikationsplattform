import { authorizeToken } from "../api/authorizeToken.server";
import { getUserSession } from "./session.server";

/**
 * getBearerToken
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(request: Request): Promise<string> {
  const userSession = await getUserSession(request);

  try {
    const accessToken = userSession?.accessToken;

    if (accessToken) {
      console.log("we have an accessToken");

      // if access token is expired, throw an error
      if (userSession?.expiresAt < Date.now()) {
        throw new Error("access token expired", {
          cause: "access token has been revoked or expired",
        });
      }

      const token = await authorizeToken(accessToken);

      // return the token
      return token.access_token;
    } else {
      console.log("we don't have an access token so far, throw error");

      throw new Error("no access token", {
        cause: "access token is needed to authorize API access",
      });
    }
  } catch (error) {
    console.log("error 1", error, JSON.stringify(error));

    if (error) {
      console.log("error 2", error, JSON.stringify(error));

      console.log("refresh token handling is needed");
    }

    // throw again any unexpected error that could've happened
    throw error;
  }
}
