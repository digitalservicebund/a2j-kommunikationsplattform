import { useEffect, useState } from "react";

export function useScrolledPastThreshold(threshold = 0.3): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPast(window.scrollY > window.innerHeight * threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPast;
}
