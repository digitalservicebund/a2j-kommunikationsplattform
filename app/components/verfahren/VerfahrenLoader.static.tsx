type VerfahrenLoaderProps = {
  active: boolean;
  label: string;
};

export default function VerfahrenLoader({
  active,
  label,
}: Readonly<VerfahrenLoaderProps>) {
  if (!active) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center">
      <div className="kern-loader kern-loader--visible">
        <span className="kern-sr-only">{label}</span>
      </div>
    </div>
  );
}
