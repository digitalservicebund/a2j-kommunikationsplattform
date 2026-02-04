import Alert from "~/components/Alert";
import VerfahrenTile, {
  VerfahrenTileProps,
} from "~/components/verfahren/VerfahrenTile";
import { useTranslations } from "~/services/translations/context";

export const loader = async () => {
  return null;
};

const mockVerfahrenComplete: VerfahrenTileProps = {
  id: "123",
  aktenzeichen_gericht: "4 O 123/24",
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
          bevollmaechtigter: {
            id: "bev-1",
            safe_id: "safe-1",
            name: "Rechtsanwalt Dr. Schmidt",
          },
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
          bevollmaechtigter: {
            id: "bev-2",
            safe_id: "safe-2",
            name: "Rechtsanwältin Fischer",
          },
        },
      ],
    },
  ],
};

const mockVerfahrenMinimal: VerfahrenTileProps = {
  id: "456",
  beteiligungen: [],
};

const mockVerfahrenPartial: VerfahrenTileProps = {
  id: "789",
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
};

export default function Kitchensink() {
  const { alerts } = useTranslations();
  return (
    <div className="">
      <h1 className="kern-heading-medium">Kitchensink</h1>
      <Alert
        type="info"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />
      <div className="space-y-kern-dimension-large">
        <section className="bg-yellow-300 pt-40 pb-40"></section>
        <section className="space-y-kern-space-large">
          <h2 className="kern-heading-medium">VerfahrenTile</h2>

          <div className="space-y-kern-space-default">
            <h3 className="kern-heading-small">Vollständige Daten</h3>
            <VerfahrenTile {...mockVerfahrenComplete} />
          </div>

          <div className="space-y-kern-space-default">
            <h3 className="kern-heading-small">
              Minimale Daten (keine Beteiligungen)
            </h3>
            <VerfahrenTile {...mockVerfahrenMinimal} />
          </div>

          <div className="space-y-kern-space-default">
            <h3 className="kern-heading-small">
              Teilweise Daten (nur Kläger:in)
            </h3>
            <VerfahrenTile {...mockVerfahrenPartial} />
          </div>
        </section>
      </div>
    </div>
  );
}
