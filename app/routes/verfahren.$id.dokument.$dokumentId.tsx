import { LoaderFunction } from "react-router";
import { ServicesContext } from "~/services/servicesContext.server";
import { requireUserSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { demoMode } = await requireUserSession(request);
  const { id, dokumentId } = params;
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
