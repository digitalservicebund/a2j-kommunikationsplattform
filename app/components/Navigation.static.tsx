import { Form } from "react-router";
import { LogoutType } from "~/routes/action.logout-user";

const baseUrl = "/uebersicht";
const LogoutButton = () => {
  return (
    <Form method="post" action="/action/logout-user">
      <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
      <button type="submit" className="kern-link cursor-pointer bg-transparent">
        <span className="kern-icon kern-icon--close kern-icon--default"></span>
        <span>Abmelden</span>
      </button>
    </Form>
  );
};

const navigationLinksList = [
  {
    name: "Übersicht",
    iconName: "kern-icon--home",
    url: baseUrl,
  },
  {
    name: "Verfahren",
    iconName: "kern-icon--icon--storage",
    url: `${baseUrl}/verfahren`,
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
];

export default function Navigation() {
  return (
    <nav>
      <ul className="gap-kern-space-x-large my-0 list-none items-center justify-between pl-0 md:flex xl:flex-wrap">
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
