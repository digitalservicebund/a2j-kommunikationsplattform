import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { LogoutType } from "~/routes/action.logout-user";

/**
 * useLogoutInactiveUser custom hook
 *
 * @param handleInactivity can be passed from the "outside". For example, only when a user is logged in.
 * @param timeout in ms, 60 minutes is default (1000 (1 second) * 60 (1 minute) * 60).
 */
export const useLogoutInactiveUser = (
  handleInactivity = false,
  // @TODO: revert to 60 minutes, after test has been successful
  timeout = 1000 * 60 * 8,
): void => {
  const fetcher = useFetcher();
  const [lastActivity, setLastActivity] = useState(Date.now());

  // resets the activity timer on activity
  const handleActivity = useCallback(() => {
    if (!handleInactivity) return;

    setLastActivity(Date.now());
  }, []);

  // effect to set up/clean up event listeners on user activity
  useEffect(() => {
    if (!handleInactivity) return;

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    // remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [handleActivity]);

  // this effect manages the countdown timer and triggers a form submit
  // to a logout-user action route when the timeout has expired
  useEffect(() => {
    if (!handleInactivity) return;

    const timer = setTimeout(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (timeSinceLastActivity > timeout) {
        fetcher.submit(
          { logoutType: LogoutType.Automatic },
          {
            method: "post",
            action: "/action/logout-user",
          },
        );
      }
    }, timeout);

    // cleanup function for the timer timeout
    return () => clearTimeout(timer);
  }, [lastActivity, fetcher, timeout]);
};
