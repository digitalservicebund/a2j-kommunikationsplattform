import { KitchensinkWrapper } from "~/components/kitchensink/KitchensinkWrapper";
import VerfahrenTile, {
  VerfahrenTileProps,
} from "~/components/verfahren/VerfahrenTile";
import { useTranslations } from "~/services/translations/context";

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

export function VerfagrenTileKitchensink() {
  const {
    routes: { kitchensink },
  } = useTranslations();
  return (
    <>
      <KitchensinkWrapper label={kitchensink.verfahrenTile.allDataAvailable}>
        <VerfahrenTile {...mockVerfahrenComplete} />
      </KitchensinkWrapper>
      <KitchensinkWrapper
        label={kitchensink.verfahrenTile.minimalDataAvailable}
      >
        <VerfahrenTile {...mockVerfahrenMinimal} />
      </KitchensinkWrapper>
      <KitchensinkWrapper
        label={kitchensink.verfahrenTile.partialDataAvailable}
      >
        <VerfahrenTile {...mockVerfahrenPartial} />
      </KitchensinkWrapper>
    </>
  );
}
