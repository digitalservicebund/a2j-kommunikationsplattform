import HeaderNavigation from "~/components/HeaderNavigation";
import LogoHeader from "~/components/LogoHeader";
import UserProfileCell from "~/components/UserProfileCell";

export default function PageHeader() {
  return (
    <header>
      <div className="kern-row kern-align-items-center">
        <div className="kern-col kopfzeile-no-vertical-padding">
          <LogoHeader />
        </div>
        <div className="kern-col kopfzeile-no-vertical-padding">
          <HeaderNavigation />
        </div>
      </div>
      <div className="kern-row kern-align-items-center kern-justify-content-end ">
        <div className="kern-col kopfzeile-no-vertical-padding">
          <UserProfileCell />
        </div>
      </div>
      <hr className="kern-divider" aria-hidden="true" />
    </header>
  );
}
