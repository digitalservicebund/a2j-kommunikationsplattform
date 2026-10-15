import { data, LoaderFunctionArgs, redirect } from "react-router";
import z from "zod";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import { fetchDokumentDownloadLink } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
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
 * Resource route redirecting to a short-lived signed link of the Dokument's
 * file. The link is only fetched on request, since it expires within seconds.
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

  const downloadLink = await fetchDokumentDownloadLink(authSession, {
    verfahrenId: parsedParams.data.id,
    einreichungId: parsedParams.data.einreichungId,
    id: parsedParams.data.dokumentId,
    dispositionType,
  }).catch(rethrowApiNotFoundAsRouteError);

  return redirect(downloadLink);
};
