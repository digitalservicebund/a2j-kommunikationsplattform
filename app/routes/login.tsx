import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/oauth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate("bea", request);
  return null;
};
