export default function HeaderNavigation() {
  return (
    <nav className="">
      <ul className="kern-task-list__list flex-row-start navigation">
        <li className="">
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--home kern-icon--default"
              aria-hidden="true"
            ></span>
            Verfahren
          </a>
        </li>
        <li className="">
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--mail kern-icon--default"
              aria-hidden="true"
            ></span>
            Mitteilungen
          </a>
        </li>
        <li className="">
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--calendar-today kern-icon--default"
              aria-hidden="true"
            ></span>
            Kalender
          </a>
        </li>{" "}
        <li className="">
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--easy-language kern-icon--default"
              aria-hidden="true"
            ></span>
            Profil
          </a>
        </li>{" "}
        <li className="">
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--close kern-icon--default"
              aria-hidden="true"
            ></span>
            Abmelden
          </a>
        </li>
      </ul>
    </nav>
  );
}
