import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";
import VerfahrenTile from "~/components/verfahren/VerfahrenTile";
import { Verfahren } from "~/routes/verfahren/_index";

const SKELETONS = [
  { id: "skeleton-1" },
  { id: "skeleton-2" },
  { id: "skeleton-3" },
  { id: "skeleton-4" },
];

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
      {isLoading && SKELETONS.map((s) => <VerfahrenTileSkeleton key={s.id} />)}
    </>
  );
}
