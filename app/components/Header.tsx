import Column from "~/components/Column";
import Logo from "~/components/Logo";
import Navigation from "~/components/Navigation";
import Row from "~/components/Row";
import UserProfile from "~/components/UserProfile";

export default function Header() {
  return (
    <section>
      <Row>
        <Column>
          <Logo />
        </Column>
        <Column>
          <Navigation />
        </Column>
      </Row>
      <Row>
        <Column>
          <UserProfile />
        </Column>
      </Row>
    </section>
  );
}
