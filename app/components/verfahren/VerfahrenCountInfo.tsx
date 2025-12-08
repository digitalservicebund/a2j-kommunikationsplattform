import Alert from "~/components/Alert";
import {
  MAX_EXACT_COUNT_DISPLAY,
  TOO_MANY_RESULTS_THRESHOLD,
} from "~/constants/verfahren";
import { useTranslations } from "~/services/translations/context";

type ResultDisplayState =
  | "emptyNoFilters"
  | "emptyWithFilters"
  | "tooManyResults"
  | "default";

function getResultDisplayState(
  count: number,
  hasFilters: boolean,
): ResultDisplayState {
  if (count === 0 && !hasFilters) return "emptyNoFilters";
  if (count === 0 && hasFilters) return "emptyWithFilters";
  if (count > TOO_MANY_RESULTS_THRESHOLD) return "tooManyResults";
  return "default";
}

export function VerfahrenCountInfo({
  count,
  hasFilters,
}: Readonly<{
  count: number;
  hasFilters: boolean;
}>) {
  const { labels, alerts } = useTranslations();

  const displayState = getResultDisplayState(count, hasFilters);

  const formattedCount =
    count >= MAX_EXACT_COUNT_DISPLAY
      ? labels.MORE_THAN_100_VERFAHREN_LABEL
      : `${count} ${labels.VERFAHREN_LABEL}`;

  let countInfo: string;
  let alertTitle: string | null = null;
  let alertMessage: string | null = null;

  switch (displayState) {
    case "emptyNoFilters": {
      countInfo = `0 ${labels.VERFAHREN_LABEL}`;
      alertTitle = alerts.NO_VERFAHREN_FOUND_TITLE;
      alertMessage = alerts.NO_VERFAHREN_FOUND_MESSAGE;
      break;
    }

    case "emptyWithFilters": {
      countInfo = `0 ${labels.RESULTS_LABEL}`;
      alertTitle = alerts.NO_VERFAHREN_FOUND_WITH_FILTERS_TITLE;
      alertMessage = alerts.NO_VERFAHREN_FOUND_WITH_FILTERS_MESSAGE;
      break;
    }

    case "tooManyResults": {
      countInfo = formattedCount;
      alertTitle = alerts.TOO_MANY_RESULTS_TITLE;
      alertMessage = alerts.TOO_MANY_RESULTS_MESSAGE;
      break;
    }

    case "default":
    default: {
      countInfo = formattedCount;
      break;
    }
  }

  return (
    <>
      <p className="kern-body kern-body--muted">{countInfo}</p>
      {alertTitle && alertMessage && (
        <Alert type="info" title={alertTitle} message={alertMessage} />
      )}
    </>
  );
}
