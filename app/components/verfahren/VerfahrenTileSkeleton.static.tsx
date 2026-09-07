import { clsx } from "clsx";

const SkeletonBlock = () => (
  <div className="w-full space-y-(--kern-metric-space-x-large)">
    <div className="space-y-(--kern-metric-space-small)">
      <div className="rounded-kern-default h-(--kern-metric-dimension-large) max-w-352 bg-(--kern-color-layout-background-hued)"></div>
      <div className="rounded-kern-default h-(--kern-metric-dimension-large) max-w-224 bg-(--kern-color-layout-background-hued)"></div>
    </div>
    <div className="space-y-(--kern-metric-space-small)">
      <div className="rounded-kern-default h-(--kern-metric-dimension-large) max-w-352 bg-(--kern-color-layout-background-hued)"></div>
      <div className="rounded-kern-default h-(--kern-metric-dimension-large) max-w-224 bg-(--kern-color-layout-background-hued)"></div>
    </div>
  </div>
);

export default function VerfahrenTileSkeleton() {
  const cssClasses = clsx(
    "relative",
    "after:border-y-1 sm:after:border-x-1 sm:after:rounded-kern-default after:border-kern-layout-border",
    "after:absolute after:top-0 after:-right-16 after:bottom-0 after:-left-16",
  );

  return (
    <div className={cssClasses} data-testid="verfahren-tile-skeleton">
      <div className="kern-gap-lg kern-px-md flex w-full animate-pulse flex-col items-center py-(--kern-metric-dimension-large)">
        <div className="flex w-full space-x-(--kern-metric-space-small)">
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </div>
        <div className="rounded-kern-default h-1 w-full bg-(--kern-color-layout-background-hued)"></div>
        <div className="flex w-full">
          <div className="w-full space-y-(--kern-metric-space-x-large)">
            <div className="rounded-kern-default h-(--kern-metric-dimension-x-large) w-352 max-w-full bg-(--kern-color-layout-background-hued)"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
