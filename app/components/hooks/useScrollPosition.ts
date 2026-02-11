import { RefObject, useEffect, useState } from "react";

export function useScrolledPastThreshold(
  refElement: RefObject<HTMLHeadingElement | null>,
): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const element = refElement?.current;
    if (!element) return;

    const obsercer = new IntersectionObserver(
      ([entry]) => {
        setIsPast(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    obsercer.observe(element);
    return () => {
      obsercer.disconnect();
    };
  }, [refElement]);

  return isPast;
}
