import { Form } from "react-router";
import { LogoutType } from "~/routes/action.logout-user";
import { useTranslations } from "~/services/translations/context";

const LogoutButton = () => {
  const { buttons } = useTranslations();
  return (
    <Form method="post" action="/action/logout-user">
      <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
      <button type="submit" className="kern-btn kern-btn--tertiary">
        <span className="kern-icon kern-icon--close"></span>
        <span className="kern-label">{buttons.ABMELDEN_BUTTON}</span>
      </button>
    </Form>
  );
};

export default function Navigation() {
  const { labels } = useTranslations();
  const navigationLinksList = [
    {
      name: labels.UEBERSICHT_LABEL,
      iconName: "kern-icon--home",
      url: `/`,
    },
    {
      name: labels.VERFAHREN_LABEL,
      iconName: "kern-icon--icon--storage",
      url: `/verfahren`,
    },
    {
      name: labels.MITTEILUNGEN_LABEL,
      iconName: "kern-icon--mail",
      url: "#",
    },
    {
      name: labels.KALENDER_LABEL,
      iconName: "kern-icon--calendar-today",
      url: "#",
    },
  ];
  return (
    <nav>
      <ul className="gap-kern-space-x-large my-0 list-none items-center justify-between pl-0 md:flex xl:flex-wrap">
        {navigationLinksList.map((link) => (
          <li key={link.name}>
            <a
              href={link.url}
              className="kern-link visited:text-kern-action-default"
            >
              <span
                className={`kern-icon ${link.iconName} bg-current`}
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
