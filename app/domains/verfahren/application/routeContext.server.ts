import { authContext } from "~/middleware/auth.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";

type ParamsWithId = {
  id?: string;
};

type ContextWithGet = {
  get: (
    context: typeof authContext,
  ) => AuthenticationResponse | null | undefined;
};

export function requireAuthData(
  context: ContextWithGet,
  source: "loader" | "action",
): AuthenticationResponse {
  const authData = context.get(authContext);

  if (!authData) {
    throw new Error(`No auth data available in ${source}`);
  }

  return authData;
}

export function requireVerfahrenId(
  params: ParamsWithId,
  source: "loader" | "action",
): string {
  const { id } = params;

  if (!id) {
    throw new Error(`id is missing in ${source}`);
  }

  return id;
}

export function requireAuthAndVerfahrenId(
  context: ContextWithGet,
  params: ParamsWithId,
  source: "loader" | "action",
): {
  authData: AuthenticationResponse;
  verfahrenId: string;
} {
  return {
    authData: requireAuthData(context, source),
    verfahrenId: requireVerfahrenId(params, source),
  };
}
