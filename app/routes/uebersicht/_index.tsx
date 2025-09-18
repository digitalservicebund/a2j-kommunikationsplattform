import { withSessionLoader } from "~/services/auth/withSessionLoader";

export const loader = withSessionLoader(async () => {
  return null;
});
export default function Uebersicht() {
  return <h1 className="kern-heading-large">Übersicht</h1>;
}
