import { KernHeading } from "@kern-ux-annex/kern-react-kit";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <main className={"m-40 flex flex-col items-center"}>
      <KernHeading level={1}>Bitte versuchen Sie es später erneut.</KernHeading>
      <Link to={"/"} className={"kern-btn kern-btn--primary mt-40"}>
        <span className="kern-label">Startseite</span>
      </Link>
    </main>
  );
}
