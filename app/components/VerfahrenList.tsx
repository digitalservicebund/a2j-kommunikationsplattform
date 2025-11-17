import VerfahrenTile from "~/components/VerfahrenTile";
import { useVerfahrenPagination } from "~/components/hooks/verfahren";
import VerfahrenTileSkeleton from "~/components/skeletons/VerfahrenTileSkeleton.static";

// number of skeletons per “page” – reuse your existing constant
const SKELETONS = [
  { id: "skeleton-1" },
  { id: "skeleton-2" },
  { id: "skeleton-3" },
  { id: "skeleton-4" },
];

export function VerfahrenList() {
  const { items, pending } = useVerfahrenPagination();

  return (
    <>
      <p className="kern-body kern-body--muted">
        {`${items.length} Verfahren`}
      </p>

      {items.map((data) => (
        <VerfahrenTile key={data.id} {...data} />
      ))}

      {/* 👇 when loading the *next* batch, show skeletons under existing items */}
      {pending && SKELETONS.map((s) => <VerfahrenTileSkeleton key={s.id} />)}
    </>
  );
}
