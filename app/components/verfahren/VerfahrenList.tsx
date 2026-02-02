import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import { VERFAHREN_SKELETONS } from "~/config/verfahrenSkeletons";
import { Verfahren } from "~/routes/verfahren/_index";

export function VerfahrenList({
  verfahrenItems,
  isLoading,
}: Readonly<{
  isLoading: boolean;
  verfahrenItems: Verfahren[];
}>) {
  return (
    <>
      {verfahrenItems.map((data) => (
        <VerfahrenTile key={data.id} {...data} />
      ))}
      {isLoading &&
        VERFAHREN_SKELETONS.map((s) => <VerfahrenTileSkeleton key={s.id} />)}
    </>
  );
}
