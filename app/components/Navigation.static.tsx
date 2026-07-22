import { Form } from "react-router";
import { LogoutType } from "~/routes/action.logout-user";
import { useTranslations } from "~/services/translations/context";

const LogoutButton = () => {
  const { buttons } = useTranslations();
  return (
    <Form method="post" action="/action/logout-user">
      <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
      <button type="submit" className="kern-btn kern-btn--tertiary">
        <span className="kern-icon kern-icon--logout"></span>
        <span className="kern-label">{buttons.ABMELDEN_BUTTON}</span>
      </button>
    </Form>
  );
};

export default function Navigation() {
  const { shared } = useTranslations();
  const navigationLinksList = [
    {
      name: shared.UEBERSICHT_LABEL,
      iconName: "kern-icon--home",
      url: "/",
    },
  ];
  return (
    <ul className="gap-kern-space-small md:gap-kern-space-x-large my-0 flex list-none flex-col items-center justify-between pl-0 text-center md:flex-row md:text-left xl:flex-wrap">
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
  );
}
