import { ReactNode } from "react";
import { useNavigate } from "react-router";
import Kopfzeile from "~/components/Kopfzeile.static";
import Logo from "~/components/Logo.static";
import Navigation from "~/components/Navigation.static";
import UserProfile from "~/components/UserProfile.static";
import { useTranslations } from "~/services/translations/context";

const HeaderWrapper = ({ children }: { children: ReactNode }) => (
  <div className="kern-container">
    <div className="gap-kern-space-small pt-kern-space-large flex flex-col">
      {children}
    </div>
    <div className="py-kern-space-large">
      <hr className="kern-divider" aria-hidden="true" />
    </div>
  </div>
);

export default function Header({
  userIsLoggedIn,
  isContentPage,
}: Readonly<{
  userIsLoggedIn: boolean;
  isContentPage: boolean;
}>) {
  const navigate = useNavigate();
  const { buttons } = useTranslations();

  return (
    <header>
      <Kopfzeile />
      {isContentPage ? (
        <HeaderWrapper>
          <div className="gap-kern-space-small flex flex-col items-center justify-between xl:flex-row">
            <Logo />
            {userIsLoggedIn ? (
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
            )}
          </div>
        </HeaderWrapper>
      ) : (
        userIsLoggedIn && (
          <HeaderWrapper>
            <UserProfile />
            <div className="gap-kern-space-small flex flex-col items-center justify-between xl:flex-row">
              <Logo />
              <Navigation />
            </div>
          </HeaderWrapper>
        )
      )}
    </header>
  );
}
