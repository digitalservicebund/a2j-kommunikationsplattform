export default function WorkInProgressAlert() {
  return (
    <div
      className="kern-alert kern-alert--warning my-kern-space-default"
      role="alert"
    >
      <div className="kern-alert__header">
        <span
          className="kern-icon kern-icon--warning kern-icon--small"
          aria-hidden
        ></span>
        <span className="kern-title">Work in progress</span>
      </div>
      <div className="kern-alert__body">
        <p className="kern-body">
          Diese Seite ist noch in der Entwicklung. Darstellungen und Layouts
          können sich jederzeit ändern.
        </p>
      </div>
    </div>
  );
}
