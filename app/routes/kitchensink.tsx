import { ComponentProps } from "react";
import Alert from "~/components/Alert";
import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import { useTranslations } from "~/services/translations/context";

type VerfahrenTileProps = ComponentProps<typeof VerfahrenTile>;

const mockVerfahrenComplete: VerfahrenTileProps = {
  id: "123",
  aktenzeichen_gericht: "4 O 123/24",
  status: "EINGEREICHT",
  status_changed: "2026-04-15T12:22:30.657924Z",
  eingereicht_am: "2026-04-16T10:22:30.657924Z",
  gericht: {
    id: "gericht-1",
    wert: "Landgericht Frankfurt am Main",
    code: "LG_FFM",
  },
  beteiligungen: [
    {
      id: "bet-1",
      name: "Klaus Müller",
      rollen: [{ id: "rolle-1", wert: "Kläger:in", code: "101" }],
      prozessbevollmaechtigte: [
        {
          aktenzeichen: "GZ-2024/12345",
          id: "bev-1",
          name: "Rechtsanwalt Dr. Schmidt",
        },
      ],
    },
    {
      id: "bet-2",
      name: "Beispiel GmbH",
      rollen: [{ id: "rolle-2", wert: "Beklagte:r", code: "028" }],
      prozessbevollmaechtigte: [
        {
          aktenzeichen: "GZ-2024/67890",
          id: "bev-2",
          name: "Rechtsanwältin Fischer",
        },
      ],
    },
  ],
};

const mockVerfahrenMinimal: VerfahrenTileProps = {
  id: "019d9117-d2d5-775d-9821-8b74b0c6aaac",
  aktenzeichen_gericht: null,
  status: "ERSTELLT",
  status_changed: "2026-04-09T12:22:30.657924Z",
  eingereicht_am: null,
  gericht: null,
  beteiligungen: [],
};

const mockVerfahrenPartial: VerfahrenTileProps = {
  id: "123d9117-d2d5-775d-9821-8b74b0c6aaac",
  aktenzeichen_gericht: "1 S 456/24",
  gericht: {
    id: "gericht-2",
    wert: "Amtsgericht Berlin-Mitte",
    code: "AG_BLN",
  },
  beteiligungen: [
    {
      id: "bet-3",
      name: "Maria Weber",
      rollen: [{ id: "rolle-3", wert: "Kläger:in", code: "101" }],
      prozessbevollmaechtigte: [],
    },
  ],
  status: "EINGEREICHT",
  status_changed: "2026-05-01T12:22:30.657924Z",
  eingereicht_am: "2026-04-28T12:22:30.657924Z",
};

export default function KitchensinkRoute() {
  const { alerts } = useTranslations();
  return (
    <div className="space-y-kern-dimension-large">
      <h1 className="kern-heading-medium">Kitchensink</h1>
      <Alert
        type="info"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />
      <div className="space-y-kern-dimension-large">
        <KitchensinkWrapper label="VerfahrenTile - All data available">
          <VerfahrenTile {...mockVerfahrenComplete} />
        </KitchensinkWrapper>
        <KitchensinkWrapper label="VerfahrenTile - Minimal data available (no Beteiligungen)">
          <VerfahrenTile {...mockVerfahrenMinimal} />
        </KitchensinkWrapper>
        <KitchensinkWrapper label="VerfahrenTile - Partial data available">
          <VerfahrenTile {...mockVerfahrenPartial} />
        </KitchensinkWrapper>
      </div>
    </div>
  );
}

function KitchensinkWrapper({
  label,
  children,
}: Readonly<{
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="bg-kern-orange-050 p-kern-space-default space-x-kern-space-large rounded-kern-border-radius-default min-h-kern-dimension-5x-large flex items-center overflow-hidden">
        <p className="kern-body kern-body--small kern-body--bold">{label}</p>
      </div>
      <div className="pointer-events-none">{children}</div>
    </section>
  );
}
