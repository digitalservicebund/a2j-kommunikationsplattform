import { LoaderFunction } from "@remix-run/node";
import { requireUserSession } from "~/services/session.server";

export default function Dashboard() {
  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>Dashboard</h1>
    </main>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);
  return null;
};
