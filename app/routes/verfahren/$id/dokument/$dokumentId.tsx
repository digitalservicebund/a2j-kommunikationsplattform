import {
  href,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router";
import { MatchHandle } from "~/components/Breadcrumbs";
import { getAuthData } from "~/services/auth/authSession.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // @TODO start: solve via middleware
  const authData = await getAuthData(request);
  const userIsLoggedIn = Boolean(authData.authenticationTokens.accessToken);

  if (!userIsLoggedIn) {
    console.log(
      `No active auth data found on "${request.url}" request. Redirecting to login route.`,
    );
    throw redirect(href("/login"));
  }
  // @TODO end

  const { id, dokumentId } = params;
  return { id, dokumentId };
};

export const handle: MatchHandle = {
  breadcrumb: {
    title: "Dateiansicht",
  },
};

type LoaderData = { id?: string; dokumentId?: string };

export default function Dateiansicht() {
  const { id, dokumentId } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1 className="kern-heading-medium">
        Dateiansicht for Verfahren {id} , Document {dokumentId}
      </h1>
    </div>
  );
}
