import { authorizeToken } from "../api/authorizeToken.server";
import { getUserSession, updateUserSession } from "./session.server";

/**
 * getBearerToken
 *
 * @see: https://sergiodxa.com/articles/working-with-refresh-tokens-in-remix
 */
export async function getBearerToken(request: Request): Promise<string> {
  const userSession = await getUserSession(request);

  try {
    const accessToken = userSession?.accessToken;
    const refreshToken = userSession?.refreshToken;

    if (refreshToken) {
      console.log("we have an refreshToken");
    }

    if (accessToken) {
      console.log("we have an accessToken");

      // if expired throw an error
      if (new Date(Number(userSession?.expiresIn)) < new Date()) {
        throw new Error("access token expired", {
          cause: "expires in value of API access token has expired",
        });
      }

      const token = await authorizeToken(accessToken);

      await updateUserSession({
        accessToken: token.access_token,
        expiresIn: Number(token.expires_in),
        refreshToken: token.refresh_token,
        request,
      });

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
