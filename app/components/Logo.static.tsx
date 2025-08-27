export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`gap-kern-space-small flex flex-row flex-wrap items-center justify-center break-all ${className}`}
    >
      <span
        className="kern-icon kern-icon--network_node kern-icon--large"
        aria-hidden
      />
      <h1 className="kern-heading-large">Kommunikationsplattform</h1>
    </div>
  );
}
