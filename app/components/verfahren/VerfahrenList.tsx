import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import VerfahrenTileSkeleton from "~/components/verfahren/VerfahrenTileSkeleton.static";
import { VERFAHREN_SKELETONS } from "~/config/verfahrenSkeletons";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";

export function VerfahrenList({
  verfahrenItems,
  isLoading,
}: Readonly<{
  isLoading: boolean;
  verfahrenItems: Verfahren[];
}>) {
  return (
    <>
      {verfahrenItems.map((verfahren) => (
        <VerfahrenTile key={verfahren.id} {...verfahren} />
      ))}
      {isLoading &&
        VERFAHREN_SKELETONS.map((s) => <VerfahrenTileSkeleton key={s.id} />)}
    </>
  );
}
