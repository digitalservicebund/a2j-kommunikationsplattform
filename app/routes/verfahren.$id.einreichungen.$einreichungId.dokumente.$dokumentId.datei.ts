import { data, LoaderFunctionArgs } from "react-router";
import z from "zod";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import { fetchDokumentDatei } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import buildDokumentDateiHeaders from "~/domains/verfahren/services/buildDokumentDateiHeaders";
import { authMiddleware } from "~/middleware/auth.server";
import { rethrowApiNotFoundAsRouteError } from "~/utils/apiError";

// this route requires users to be logged in
export const middleware = [authMiddleware];

// The ids end up in the KomPla API path, so only GUIDs are let through.
const ParamsSchema = z.object({
  id: z.guid(),
  einreichungId: z.guid(),
  dokumentId: z.guid(),
});

const DispositionSchema = z
  .enum(["inline", "attachment"])
  .catch("inline")
  .transform((disposition) =>
    disposition === "attachment" ? "ATTACHMENT" : "INLINE",
  );

/**
 * Resource route streaming the Dokument's file through the app server, so
 * the URL stays on the app's origin: reloading the tab keeps working and
 * still requires a login, unlike the storage's short-lived signed links.
 */
export const loader = async ({
  context,
  params,
  request,
}: LoaderFunctionArgs) => {
  const authSession = requireAuthSession(context, "loader");
  const parsedParams = ParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    throw data(null, { status: 404 });
  }

  const dispositionType = DispositionSchema.parse(
    new URL(request.url).searchParams.get("disposition"),
  );

  const datei = await fetchDokumentDatei(authSession, {
    verfahrenId: parsedParams.data.id,
    einreichungId: parsedParams.data.einreichungId,
    id: parsedParams.data.dokumentId,
    dispositionType,
    // Stops downloading from the storage when the user cancels the request.
    signal: request.signal,
  }).catch((error: unknown) => {
    // A cancelled download isn't a server failure, so it's answered with
    // 499 ("client closed request") instead of an Error reported to Sentry.
    if (request.signal.aborted) {
      throw data(null, { status: 499 });
    }

    return rethrowApiNotFoundAsRouteError(error);
  });

  return new Response(datei.body, {
    headers: buildDokumentDateiHeaders(datei.headers),
  });
};
