import Kopfzeile from "~/components/Kopfzeile.static";
import Logo from "~/components/Logo.static";
import Navigation from "~/components/Navigation.static";
import UserProfile from "~/components/UserProfile.static";

export default function Header({
  userIsLoggedIn,
}: {
  userIsLoggedIn: boolean;
}) {
  return (
    <header>
      <Kopfzeile />
      {userIsLoggedIn && (
        <div className="kern-container">
          <div className="gap-kern-space-small flex flex-col">
            <UserProfile />
            <div className="flex flex-wrap items-center justify-between">
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
