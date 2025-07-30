import { type LoaderFunction } from "react-router";
import { userHasActiveSession } from "~/services/prototype.session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return userHasActiveSession(request)
    .then((data) => {
      if (data) {
        return new Response(null, { status: 200 });
      } else {
        throw new Response(null, { status: 403 });
      }
    })
    .catch((error) => {
      console.log(`Error: request to api/auth/user failed. ${error}`);
      throw new Response(null, { status: 403 });
    });
};
