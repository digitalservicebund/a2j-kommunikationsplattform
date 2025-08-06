import { useCallback, useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router";

/**
 * useLogoutInactiveUser custom hook
 *
 * @param handleInactivity can be passed from the "outside". For example, only when a user is logged in.
 * @param timeout in ms, 60 minutes is default (1000 (1 second) * 60 (1 minute) * 60).
 */
export const useLogoutInactiveUser = (
  handleInactivity = false,
  // @TODO: use 60 minutes timeout
  // timeout = 1000 * 60 * 60,
  // to verify the logout easier it is set to one minute
  // timeout = 1000 * 60 * 1,
  timeout = 5000,
): void => {
  const fetcher = useFetcher();
  const location = useLocation();
  const [lastActivity, setLastActivity] = useState(Date.now());

  console.log("read and recognize useLogoutInactiveUser...");

  // resets the activity timer on activity
  const handleActivity = useCallback(() => {
    if (!handleInactivity) return;
    console.log("handleActivity was called");

    setLastActivity(Date.now());
  }, []);

  // effect to set up/clean up event listeners on user activity
  useEffect(() => {
    if (!handleInactivity) return;
    console.log("and add event listeners that recognize user activity");

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
      console.log("countdown has ended, logout user...");
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (timeSinceLastActivity > timeout) {
        fetcher.submit(null, {
          method: "post",
          action: "/action/logout-user",
        });
        console.log("fetcher.submit has been called");
      }
    }, timeout);

    // cleanup function for the timer timeout
    return () => clearTimeout(timer);
  }, [lastActivity, fetcher, timeout, location]);
};
