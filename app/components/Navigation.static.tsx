import { Form } from "react-router";
import { LogoutType } from "~/routes/action.logout-user";

export function LogoutButton() {
  return (
    <Form method="post" action="/action/logout-user">
      <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
      <button type="submit" className="kern-link bg-transparent">
        <span className="kern-icon kern-icon--close kern-icon--default"></span>
        <span>Abmelden</span>
      </button>
    </Form>
  );
}

const navigationLinksList = [
  {
    name: "Verfahren",
    iconName: "kern-icon--home",
    url: "#",
  },
  {
    name: "Mitteilungen",
    iconName: "kern-icon--mail",
    url: "#",
  },
  {
    name: "Kalender",
    iconName: "kern-icon--calendar-today",
    url: "#",
  },
  {
    name: "Profil",
    iconName: "kern-icon--easy-language",
    url: "#",
  },
];

export default function Navigation() {
  return (
    <nav>
      {/* TODO: when ready, use Tailwind instead of navigation-list className */}
      <ul className="gap-kern-space-large my-0 items-center justify-between pl-0 sm:flex sm:flex-wrap">
        {navigationLinksList.map((link) => (
          <li key={link.name}>
            <a href={link.url} className="kern-link">
              <span
                className={`kern-icon ${link.iconName} kern-icon--default`}
                aria-hidden="true"
              ></span>
              {link.name}
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
