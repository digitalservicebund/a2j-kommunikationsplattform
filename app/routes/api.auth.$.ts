import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { auth } from "~/services/auth/betterAuth.server";

export const loader = ({ request }: LoaderFunctionArgs) =>
  auth.handler(request);
export const action = ({ request }: ActionFunctionArgs) =>
  auth.handler(request);
