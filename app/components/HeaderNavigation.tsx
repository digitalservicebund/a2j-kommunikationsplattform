import { Form } from "react-router";
import { LogoutType } from "~/routes/action.logout-user";

export default function HeaderNavigation() {
  return (
    <nav>
      <ul className="kern-task-list__list navigation-list">
        <li>
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--home kern-icon--default"
              aria-hidden="true"
            ></span>
            Verfahren
          </a>
        </li>
        <li>
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--mail kern-icon--default"
              aria-hidden="true"
            ></span>
            Mitteilungen
          </a>
        </li>
        <li>
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--calendar-today kern-icon--default"
              aria-hidden="true"
            ></span>
            Kalender
          </a>
        </li>
        <li>
          <a href="#" className="kern-link">
            <span
              className="kern-icon kern-icon--easy-language kern-icon--default"
              aria-hidden="true"
            ></span>
            Profil
          </a>
        </li>
        <li>
          <Form method="post" action="/action/logout-user">
            <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
            <button type="submit" className="kern-link logout-button">
              <span
                className="kern-icon kern-icon--close kern-icon--default"
                aria-hidden="true"
              ></span>
              <span className="" aria-hidden="true">
                Abmelden
              </span>
            </button>
          </Form>
        </li>
      </ul>
    </nav>
  );
}
