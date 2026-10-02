import { clsx } from "clsx";
import { Link, useLocation } from "react-router";
import { Form } from "react-router";
import Button from "~/components/Button";
import Kopfzeile from "~/components/layout/Kopfzeile";
import Logo from "~/components/layout/Logo.";
import TestEnvironmentBanner from "~/components/layout/TestEnvironmentBanner.static";
import UserProfile from "~/components/layout/UserProfile";
import { config } from "~/config/config";
import { LogoutType } from "~/services/auth/auth.types";
import { useTranslations } from "~/services/translations/context";
import Navigation from "./Navigation";

const LoginButton = () => {
  const t = useTranslations();
  return (
    <Link to="/login" className="kern-link">
      <span className="kern-icon kern-icon--login kern-icon--account-circle"></span>
      <span>{t.layout.header.login}</span>
    </Link>
  );
};

const LogoutButton = () => {
  const t = useTranslations();
  return (
    <Form method="post" action="/action/logout-user">
      <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
      <Button
        appearance="tertiary"
        size="small"
        type="submit"
        label={t.layout.header.logout}
      >
        <span className="kern-icon kern-icon--logout"></span>
      </Button>
    </Form>
  );
};

interface HeaderProps {
  userIsLoggedIn?: boolean;
  isContentPage?: boolean;
}

export default function Header({
  userIsLoggedIn = false,
}: Readonly<HeaderProps>) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const showTestzugangBanner = config().ENVIRONMENT !== "production";

  return (
    <header className="kern-mb-lg">
      {showTestzugangBanner && <TestEnvironmentBanner />}
      <Kopfzeile />

      <div
        className={clsx(
          "kern-container",
          "kern-py-md",
          "kern-gap-sm",
          "kern-gap-md",
          "flex",
          "flex-col",
          "justify-between",
          "items-center",
          "lg:flex-row",
          "lg:flex-gap-none",
          "lg:items-center",
          isLoginPage && "justify-center",
        )}
      >
        <Logo />

        <div className="kern-gap-md-lg flex flex-col items-center lg:flex-row">
          {userIsLoggedIn ? (
            <>
              <UserProfile />
              <LogoutButton />
            </>
          ) : !isLoginPage ? (
            <LoginButton />
          ) : null}
        </div>
      </div>

      {userIsLoggedIn ? (
        <Navigation />
      ) : (
        <hr
          className="kern-divider bg-(--kern-color-neutral-050) dark:bg-(--kern-color-neutral-700)"
          aria-hidden="true"
        />
      )}
    </header>
  );
}
