import Alert from "~/components/Alert";
import {
  TOO_MANY_RESULTS_THRESHOLD,
  VERFAHREN_PAGE_LIMIT,
} from "~/constants/verfahren";
import { useTranslations } from "~/services/translations/context";

enum CounterState {
  NoVerfahren = "NO_VERFAHREN",
  NoResult = "NO_RESULT",
  TooMany = "TOO_MANY",
  Default = "DEFAULT",
}

function getCounterState(count: number, hasFilters: boolean): CounterState {
  if (count === 0) {
    if (hasFilters) {
      return CounterState.NoResult;
    }
    return CounterState.NoVerfahren;
  }

  if (count > TOO_MANY_RESULTS_THRESHOLD) return CounterState.TooMany;

  return CounterState.Default;
}

export function VerfahrenCounter({
  count,
  hasFilters,
}: Readonly<{
  count: number;
  hasFilters: boolean;
}>) {
  const { labels, alerts } = useTranslations();

  const displayState = getCounterState(count, hasFilters);

  const formattedCount =
    count >= VERFAHREN_PAGE_LIMIT
      ? labels.MORE_THAN_100_VERFAHREN_LABEL
      : `${count} ${labels.VERFAHREN_LABEL}`;

  let countInfo: string;
  let alertTitle: string | null = null;
  let alertMessage: string | null = null;

  switch (displayState) {
    case CounterState.NoVerfahren: {
      countInfo = `0 ${labels.VERFAHREN_LABEL}`;
      alertTitle = alerts.NO_VERFAHREN_FOUND_TITLE;
      alertMessage = alerts.NO_VERFAHREN_FOUND_MESSAGE;
      break;
    }

    case CounterState.NoResult: {
      countInfo = `0 ${labels.RESULTS_LABEL}`;
      alertTitle = alerts.NO_VERFAHREN_FOUND_WITH_FILTERS_TITLE;
      alertMessage = alerts.NO_VERFAHREN_FOUND_WITH_FILTERS_MESSAGE;
      break;
    }

    case CounterState.TooMany: {
      countInfo = formattedCount;
      alertTitle = alerts.TOO_MANY_RESULTS_TITLE;
      alertMessage = alerts.TOO_MANY_RESULTS_MESSAGE;
      break;
    }

    case CounterState.Default:
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
