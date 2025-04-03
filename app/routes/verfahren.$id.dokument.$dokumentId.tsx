import { LoaderFunction } from "react-router";
import { parse } from "cookie";
import { ServicesContext } from "~/services/servicesContext.server";
import { requireUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  await requireUserSession(request);
  const { id, dokumentId } = params;
  const demoMode =
    parse(request.headers.get("cookie") || "").demoMode === "true";
  const dokumentFile = await ServicesContext.getJustizBackendService(
    demoMode,
  ).getDokumentFile(id!, dokumentId!);

  if (!dokumentFile) {
    throw new Response("Not Found", { status: 404 });
  }

  const { file, fileName } = dokumentFile;

  return new Response(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
};
