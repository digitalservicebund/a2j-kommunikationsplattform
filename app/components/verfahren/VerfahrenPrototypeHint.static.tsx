import {
  PROTOTYPE_HIGHLIGHT_LABEL,
  PROTOTYPE_HINT_SUFFIX,
} from "~/components/verfahren/presentation/placeholders";

type VerfahrenPrototypeHintProps = {
  className?: string;
};

export default function VerfahrenPrototypeHint({
  className = "kern-body kern-body--small",
}: Readonly<VerfahrenPrototypeHintProps>) {
  return (
    <p className={className}>
      <span className="bg-kern-feedback-info-background">
        {PROTOTYPE_HIGHLIGHT_LABEL}
      </span>{" "}
      {PROTOTYPE_HINT_SUFFIX}
    </p>
  );
}
