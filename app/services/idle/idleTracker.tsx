import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

type IdleTrackerProps = {
  children: React.ReactNode;
  handler: () => void;
  minutes?: number;
};

const IdleTrackerContext = createContext<{ resetIdle: () => void } | undefined>(
  undefined,
);

/**
 * IdleTrackerProvider
 *
 * Executes a passed handler function after n * minutes.
 */
export const IdleTrackerProvider = ({
  minutes = 60,
  handler,
  children,
}: IdleTrackerProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdle = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => {
        handler();
      },
      1000 * 60 * minutes,
    );
  };

  useEffect(() => {
    const handleActivity = () => resetIdle();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    resetIdle();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);

      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const value = useMemo(() => ({ resetIdle }), [resetIdle]);

  return (
    <IdleTrackerContext.Provider value={value}>
      {children}
    </IdleTrackerContext.Provider>
  );
};

/**
 * useIdleTracker
 *
 * Custom hook to reset the idleTracker within the app.
 */
export const useIdleTracker = () => useContext(IdleTrackerContext)!;
