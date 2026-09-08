import { clsx } from "clsx";

const SkeletonBlock = () => (
  <div className="w-full space-y-(--kern-metric-space-x-large)">
    <div className="space-y-(--kern-metric-space-small)">
      <div className="h-(--kern-metric-dimension-large) max-w-88 rounded-(--kern-metric-border-radius-default) bg-(--kern-color-layout-background-hued)"></div>
      <div className="h-(--kern-metric-dimension-large) max-w-56 rounded-(--kern-metric-border-radius-default) bg-(--kern-color-layout-background-hued)"></div>
    </div>
    <div className="space-y-(--kern-metric-space-small)">
      <div className="h-(--kern-metric-dimension-large) max-w-88 rounded-(--kern-metric-border-radius-default) bg-(--kern-color-layout-background-hued)"></div>
      <div className="h-(--kern-metric-dimension-large) max-w-56 rounded-(--kern-metric-border-radius-default) bg-(--kern-color-layout-background-hued)"></div>
    </div>
  </div>
);

export default function VerfahrenTileSkeleton() {
  const cssClasses = clsx(
    "relative",
    "after:border-y-1 sm:after:border-x-1 sm:after:rounded-(--kern-metric-border-radius-default) after:border-(--kern-color-layout-border)",
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
        <div className="h-0 w-full rounded-(--kern-metric-border-radius-default) bg-(--kern-color-layout-background-hued)"></div>
        <div className="flex w-full">
          <div className="w-full space-y-(--kern-metric-space-x-large)">
            <div className="h-(--kern-metric-dimension-x-large) w-88 max-w-full rounded-(--kern-metric-border-radius-default) bg-(--kern-color-layout-background-hued)"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
