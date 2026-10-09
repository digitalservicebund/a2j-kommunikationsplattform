import { AuthSession } from "~/services/auth/auth.types";
import { apiRequest } from "../api/apiClient";
import {
  GerichtInformation,
  GerichtInformationSchema,
} from "../schemas/gerichtInformation.schema";

export function fetchGerichtInformation(
  authSession: AuthSession,
  gerichtId: string,
): Promise<GerichtInformation> {
  return apiRequest({
    authSession,
    path: `/api/v1/informationen/gerichte/${gerichtId}`,
    schema: GerichtInformationSchema,
  });
}
