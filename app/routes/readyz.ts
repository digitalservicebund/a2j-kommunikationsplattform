import type { LoaderFunction } from "react-router";

/**
 * @see: https://kubernetes.io/docs/reference/using-api/health-checks/
 */
export const loader: LoaderFunction = async () => {
  return Response.json({ status: "ok" });
};
