import HeaderNavigation from "~/components/HeaderNavigation";
import LogoHeader from "~/components/LogoHeader";
import UserProfileCell from "~/components/UserProfileCell";

export default function PageNavigation() {
  return (
    <div>
      <div className="kern-row kern-align-items-center">
        <div className="kern-col ">
          <LogoHeader />
        </div>
        <div className="kern-col">
          <HeaderNavigation />
        </div>
      </div>
      <div className="kern-row kern-align-items-center">
        <div className="kern-col">
          <UserProfileCell />
        </div>
      </div>
    </div>
  );
}
