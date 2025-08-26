import { Form } from "react-router";
import { LogoutType } from "~/routes/action.logout-user";

export function LogoutButton() {
  return (
    <Form method="post" action="/action/logout-user">
      <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
      <button type="submit" className="kern-link logout-button">
        <span
          className="kern-icon kern-icon--close kern-icon--default"
          aria-hidden="true"
        ></span>
        <span aria-hidden="true">Abmelden</span>
      </button>
    </Form>
  );
}

const navigationLinksList = [
  {
    name: "Verfahren",
    iconName: "kern-icon--home",
    label: "Verfahren",
    url: "#",
  },
  {
    name: "Mitteilungen",
    iconName: "kern-icon--mail",
    label: "Mitteilungen",
    url: "#",
  },
  {
    name: "Kalender",
    iconName: "kern-icon--calendar-today",
    label: "Kalender",
    url: "#",
  },
  {
    name: "Profil",
    iconName: "kern-icon--easy-language",
    label: "Profil",
    url: "#",
  },
];

export default function HeaderNavigation() {
  return (
    <nav>
      <ul className="kern-task-list__list navigation-list">
        {navigationLinksList.map((link) => (
          <li key={link.name}>
            <a href={link.url} className="kern-link">
              <span
                className={`kern-icon ${link.iconName} kern-icon--default`}
                aria-hidden="true"
              ></span>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}
