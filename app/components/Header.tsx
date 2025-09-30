import { useNavigate } from "react-router";
import Kopfzeile from "~/components/Kopfzeile.static";
import Logo from "~/components/Logo.static";
import Navigation from "~/components/Navigation.static";
import UserProfile from "~/components/UserProfile.static";

export default function Header({
  userIsLoggedIn,
  isContentPage,
}: {
  userIsLoggedIn: boolean;
  isContentPage: boolean;
}) {
  const navigate = useNavigate();
  console.log("iscontentpage", isContentPage);

  if (isContentPage) {
    return (
      <header>
        <Kopfzeile />
        <div className="kern-container">
          <div className="gap-kern-space-small pt-kern-space-large flex flex-col">
            <div className="gap-kern-space-small flex flex-col items-center justify-between xl:flex-row">
              <Logo />
              {userIsLoggedIn && (
                <button
                  type="button"
                  className="kern-link cursor-pointer bg-transparent"
                  onClick={() => navigate(-1)}
                >
                  <span className="kern-icon kern-icon--arrow-back kern-icon--default"></span>
                  <span>Zurück</span>
                </button>
              )}
            </div>
          </div>
          <div className="py-kern-space-large">
            <hr className="kern-divider" aria-hidden="true" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header>
      <Kopfzeile />
      {userIsLoggedIn && (
        <div className="kern-container">
          <div className="gap-kern-space-small pt-kern-space-large flex flex-col">
            <UserProfile />
            <div className="gap-kern-space-small flex flex-col items-center justify-between xl:flex-row">
              <Logo />
              <Navigation />
            </div>
          </div>
          <div className="py-kern-space-large">
            <hr className="kern-divider" aria-hidden="true" />
          </div>
        </div>
      )}
    </header>
  );
}
