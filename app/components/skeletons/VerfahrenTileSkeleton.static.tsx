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
  return (
    <div className="gap-kern-space-large py-kern-dimension-large px-kern-space-default border-kern-layout-border rounded-kern-default flex w-full animate-pulse flex-col items-center border">
      <div className="space-x-kern-space-small flex w-full">
        <SkeletonBlock />
        <SkeletonBlock />
        <SkeletonBlock />
      </div>
      <div className="bg-kern-feedback-loader-background rounded-kern-default h-1 w-full"></div>
      <div className="flex w-full">
        <div className="space-y-kern-space-x-large w-full">
          <div className="bg-kern-feedback-loader-background h-kern-dimension-x-large rounded-kern-default w-352"></div>
        </div>
      </div>
    </div>
  );
}
