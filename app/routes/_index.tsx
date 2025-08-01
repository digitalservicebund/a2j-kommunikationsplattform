import {
  KernButton,
  KernDivider,
  KernHeading,
  KernIcon,
  KernText,
} from "@kern-ux-annex/kern-react-kit";
import { Link, useLoaderData } from "react-router";
import { NarrowPageLayout } from "~/components/NarrowPageLayout";
import { PageMetadata } from "~/components/PageMetadata";
import { config } from "~/config/config";

export async function loader() {
  const environment = config().ENVIRONMENT;
  return { environment };
}

export default function IndexPage() {
  const { environment } = useLoaderData<typeof loader>();

  return (
    <>
      <PageMetadata />
      <NarrowPageLayout>
        <div className="login">
          <div className="login__container">
            <div className="logo">
              <KernIcon icon="network_node" size="large" />
              <KernHeading size="large" level={1}>
                Kommunikationsplattform
              </KernHeading>
            </div>

            <KernDivider />

            <KernText type="subline">
              Willkommen auf der Pilotplattform für den digitalen Austausch
              zwischen Gerichten und Verfahrensbeteiligten.
            </KernText>

            <div className="login__buttons">
              <Link
                to="/login"
                className="kern-btn kern-btn--block kern-btn--primary"
              >
                <span className="kern-label">Anmeldung Anwaltschaft</span>
              </Link>

              <KernButton
                text="Anmeldung Gerichte"
                variant="primary"
                disabled
                className="kern-btn--block"
              />

              {/* only render "Testzugang" demo link for non production environments */}
              {environment !== "production" && (
                <Link
                  to="/prototype/verfahren"
                  className="kern-btn kern-btn--block kern-btn--secondary"
                  onClick={() => {
                    document.cookie = "demoMode=true; path=/; max-age=3600"; // 1 hour
                  }}
                  data-testid="demoBtn"
                >
                  <span className="kern-label">Testzugang</span>
                </Link>
              )}
            </div>

            <KernDivider />
          </div>
        </div>
      </NarrowPageLayout>
    </>
  );
}
