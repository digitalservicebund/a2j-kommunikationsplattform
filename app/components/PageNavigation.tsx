import Column from "~/components/Column";
import HeaderNavigation from "~/components/HeaderNavigation";
import LogoHeader from "~/components/LogoHeader";
import Row from "~/components/Row";
import UserProfileCell from "~/components/UserProfileCell";

export default function PageNavigation() {
  return (
    <section>
      <Row>
        <Column>
          <LogoHeader />
        </Column>
        <Column>
          <HeaderNavigation />
        </Column>
      </Row>
      <Row>
        <Column>
          <UserProfileCell />
        </Column>
      </Row>
    </section>
  );
}
