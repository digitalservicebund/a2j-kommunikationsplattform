import { clsx } from "clsx";

const SkeletonBlock = () => (
  <div className="space-y-kern-space-x-large w-full">
    <div className="space-y-kern-space-small">
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-352"></div>
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-224"></div>
    </div>
    <div className="space-y-kern-space-small">
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-352"></div>
      <div className="bg-kern-feedback-loader-background h-kern-dimension-large rounded-kern-default max-w-224"></div>
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
    <div className={cssClasses}>
      <div className="gap-kern-space-large py-kern-dimension-large px-kern-space-default flex w-full animate-pulse flex-col items-center">
        <div className="space-x-kern-space-small flex w-full">
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </div>
        <div className="bg-kern-feedback-loader-background rounded-kern-default h-1 w-full"></div>
        <div className="flex w-full">
          <div className="space-y-kern-space-x-large w-full">
            <div className="bg-kern-feedback-loader-background h-kern-dimension-x-large rounded-kern-default w-352 max-w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
