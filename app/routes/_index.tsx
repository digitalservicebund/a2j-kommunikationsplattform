import Uebersicht from "~/components/Uebersicht.static";
import { authMiddleware } from "~/middleware/auth.server";

// this route requires users to be logged in
export const middleware = [authMiddleware];

export default function DashboardPage() {
  return <Uebersicht />;
}
