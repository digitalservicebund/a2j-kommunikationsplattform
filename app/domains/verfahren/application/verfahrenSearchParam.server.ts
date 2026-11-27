import { redirect } from "react-router";
import z from "zod";
import { KLAGEEINREICHUNG_PATHS } from "~/config/klageeinreichungRoutes";

// The id ends up in API paths, so anything but an id (e.g. containing "/" or
// "..") must be rejected. z.guid() rather than z.uuid(), as the latter also
// requires a valid UUID version, which the API's ids don't guarantee.
const VerfahrenIdSchema = z.guid();

/**
 * Reads the draft's Verfahren id from the optional `?verfahren=` search
 * param. An invalid id can't identify a draft, so the user starts over by
 * picking a court.
 */
export function readVerfahrenSearchParam(
  searchParams: URLSearchParams,
): string | undefined {
  const verfahrenId = searchParams.get("verfahren");

  if (verfahrenId === null) {
    return undefined;
  }

  if (!VerfahrenIdSchema.safeParse(verfahrenId).success) {
    throw redirect(KLAGEEINREICHUNG_PATHS.neu);
  }

  return verfahrenId;
}

/**
 * Like `readVerfahrenSearchParam()`, but for steps that require a draft:
 * without it, the user starts over by picking a court.
 */
export function requireVerfahrenSearchParam(
  searchParams: URLSearchParams,
): string {
  const verfahrenId = readVerfahrenSearchParam(searchParams);

  if (!verfahrenId) {
    throw redirect(KLAGEEINREICHUNG_PATHS.neu);
  }

  return verfahrenId;
}
