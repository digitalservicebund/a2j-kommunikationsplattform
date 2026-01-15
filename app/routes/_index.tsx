import { redirect } from "react-router";
import Uebersicht from "~/components/Uebersicht.static";
import { getAuthData } from "~/services/auth/authSession.server";

export async function loader({ request }: { request: Request }) {
  const authData = await getAuthData(request);

  if (!authData) {
    throw redirect("/login");
  }
}

export default function IndexPage() {
  return <Uebersicht />;
}
