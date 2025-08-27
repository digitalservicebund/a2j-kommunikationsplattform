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
          {/* TODO: when ready, use Tailwind instead of navigation-logo-row className */}
          <div className="navigation-logo-row">
            <Logo />
            <Navigation />
          </div>
          <UserProfile />
        </div>
      )}
    </header>
  );
}
