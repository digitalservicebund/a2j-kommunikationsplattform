import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <main className={"m-40 flex flex-col items-center"}>
      <h1 className={"ds-heading-01-bold mb-40 break-all"}>
        Bitte versuchen Sie es später erneut.
      </h1>
      <Link to={"/"} className={"ds-button"}>
        Startseite
      </Link>
    </main>
  );
}
