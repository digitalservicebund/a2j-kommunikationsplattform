import { redirect } from "react-router";
import Uebersicht from "~/components/Uebersicht.static";
import { getUserSession } from "~/services/auth/session.server";

export async function loader({ request }: { request: Request }) {
  const userSession = await getUserSession(request);
  if (userSession) {
    return null;
  } else {
    throw redirect("/login");
  }
}

export default function IndexPage() {
  return <Uebersicht />;
}
