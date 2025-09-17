import { redirect } from "react-router";
import { getUserSession } from "~/services/prototype.session.server";

export async function loader({ request }: { request: Request }) {
  const userSession = await getUserSession(request);
  if (userSession) {
    throw redirect("/uebersicht");
  } else {
    throw redirect("/login");
  }
}

export default function IndexPage() {
  return null;
}
