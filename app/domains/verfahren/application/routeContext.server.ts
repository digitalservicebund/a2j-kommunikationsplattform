import { authContext } from "~/middleware/auth.server";
import { AuthSession } from "~/services/auth/auth.types";

type ParamsWithId = {
  id?: string;
};

type ContextWithGet = {
  get: (context: typeof authContext) => AuthSession | null | undefined;
};

export function requireAuthSession(
  context: ContextWithGet,
  source: "loader" | "action",
): AuthSession {
  const authSession = context.get(authContext);

  if (!authSession) {
    throw new Error(`No auth data available in ${source}`);
  }

  return authSession;
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
  authSession: AuthSession;
  verfahrenId: string;
} {
  return {
    authSession: requireAuthSession(context, source),
    verfahrenId: requireVerfahrenId(params, source),
  };
}
