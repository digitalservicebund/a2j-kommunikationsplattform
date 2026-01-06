import { useNavigate } from "react-router";
import Kopfzeile from "~/components/Kopfzeile.static";
import Logo from "~/components/Logo.static";
import UserProfile from "~/components/UserProfile.static";
import { useTranslations } from "~/services/translations/context";
import Navigation from "./Navigation.static";

interface HeaderProps {
  userIsLoggedIn?: boolean;
  isContentPage?: boolean;
}

export default function Header({
  userIsLoggedIn = false,
  isContentPage = false,
}: Readonly<HeaderProps>) {
  const navigate = useNavigate();
  const { buttons, labels } = useTranslations();

  // The header has a:
  // (1) Kopfzeile,
  // (2) UserProfile,
  // (3) Logo and a
  // (4) dynamic navigation part: this area consists of
  // (4a) a login and go back functionality or
  // (4b) the ability to navigate through the platforms features (e.g. discover current court proceedings).

  // (2)
  const userProfile = userIsLoggedIn ? <UserProfile /> : null;

  // (4a)
  const goBackOrLoginButton = userIsLoggedIn ? (
    <button
      type="button"
      className="kern-link cursor-pointer bg-transparent"
      onClick={() => navigate(-1)}
    >
      <span className="kern-icon kern-icon--arrow-back kern-icon--default"></span>
      <span>{buttons.BACK_BUTTON}</span>
    </button>
  ) : (
    <button
      type="button"
      className="kern-link cursor-pointer bg-transparent"
      onClick={() => navigate("/login")}
    >
      <span className="kern-icon kern-icon--logout kern-icon--default"></span>
      <span>{buttons.ANMELDEN_BUTTON}</span>
    </button>
  );

  // (4b)
  const platformNavigation = userIsLoggedIn ? <Navigation /> : null;

  return (
    <header>
      {/* (1) */}
      <Kopfzeile />
      <nav aria-label={labels.HEADER_ARIA_LABEL}>
        <div className="kern-container">
          <div className="gap-kern-space-small pt-kern-space-large flex flex-col">
            {/* (2) */}
            {!isContentPage && userProfile}
            <div className="gap-kern-space-small flex flex-col items-center justify-between xl:flex-row">
              {/* (3) */}
              <Logo />
              {/* (4) */}
              {isContentPage ? goBackOrLoginButton : platformNavigation}
            </div>
          </div>
          <div className="py-kern-space-large">
            <hr className="kern-divider" aria-hidden="true" />
          </div>
        </div>
      </nav>
    </header>
  );
}
