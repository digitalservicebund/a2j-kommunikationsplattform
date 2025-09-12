import { type LoaderFunctionArgs, redirect } from "react-router";

const redirectionMap = {
  "anmeldung-teilnahme-kommunikationsplattform":
    "https://app.formbricks.com/s/cmf2nqcww661jtl01u8a5uo4n",
};

export function loader({ params }: LoaderFunctionArgs) {
  const requestedSite = params["*"];
  if (!requestedSite || !(requestedSite in redirectionMap)) {
    throw new Response(null, { status: 404 });
  }
  return redirect(redirectionMap[requestedSite as keyof typeof redirectionMap]);
}
