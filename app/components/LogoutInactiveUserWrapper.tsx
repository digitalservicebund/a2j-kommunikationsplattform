import { ReactNode } from "react";
import { useLogoutInactiveUser } from "./hooks/useLogoutInactiveUser";

/**
 * This component registers the useLogoutInactiveUser custom hook.
 */
export function LogoutInactiveUserWrapper({
  children,
  handleInactivity,
}: Readonly<{ children: ReactNode; handleInactivity: boolean }>) {
  useLogoutInactiveUser(handleInactivity);
  return <>{children}</>;
}
