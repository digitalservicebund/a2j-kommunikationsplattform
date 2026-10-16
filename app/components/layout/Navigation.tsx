import { NavLink } from "react-router";
import { useTranslations } from "~/services/translations/context";

export default function Navigation() {
  const t = useTranslations();

  const navigationLinks = [
    {
      name: t.layout.navigation.home,
      iconName: "home",
      url: "/",
    },
  ];

  return (
    <nav
      aria-label={t.layout.navigation.ariaLabel}
      className="bg-(--kern-color-neutral-050) dark:bg-(--kern-color-neutral-700)"
    >
      <div className="kern-container">
        <ul className="kern-gap-sm kern-gap-lg-md my-0 flex list-none flex-col items-center justify-between pl-0 text-center md:flex-row md:text-left xl:flex-wrap">
          {navigationLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.url}
                className="kern-link kern-py-md visited:text-(--kern-color-action-default)"
              >
                <span
                  className={`kern-icon kern-icon--default kern-icon--${link.iconName} bg-current`}
                  aria-hidden="true"
                ></span>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
