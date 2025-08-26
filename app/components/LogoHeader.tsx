export default function LogoHeader({ className = "" }: { className?: string }) {
  return (
    <div className={`logo ${className}`}>
      <span
        className="kern-icon kern-icon--network_node kern-icon--large"
        aria-hidden
      />
      <h1 className="kern-heading-large">Kommunikationsplattform</h1>
    </div>
  );
}
