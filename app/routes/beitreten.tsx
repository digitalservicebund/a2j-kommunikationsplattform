import {
  data,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useSearchParams,
} from "react-router";
import Callout from "~/components/Callout";
import InputField from "~/components/InputField";
import { PageMetadata } from "~/components/PageMetadata";
import { requireAuthData } from "~/domains/verfahren/application/routeContext.server";
import { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import {
  LiftResponse,
  performLift,
  validateLiftCode,
} from "~/domains/verfahren/infrastructure/repositories/liftRepository.server";
import {
  getBeteiligteByRoleCode,
  getBeteiligteDisplayName,
  ROLE_CODE_BEKLAGTE,
  ROLE_CODE_KLAEGERIN,
} from "~/domains/verfahren/services/beteiligteByRole";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";
import { de } from "~/services/translations/de";
import { actionError, actionSuccess } from "~/utils/actionResult";
import { logger } from "~/utils/logger.server";
import { Route } from "./+types/beitreten";

// This route requires users to be logged in
export const middleware = [authMiddleware];

/**
 * If a Betrittscode (a.k.a. "lift code") is passed to the route as a query
 * parameter, this loader validates it using the KomPla API and returns the
 * associated information, most notably the Verfahren Verfahren that can
 * be joined with the code.
 */
export async function loader({ url, context }: LoaderFunctionArgs) {
  const authData = requireAuthData(context, "loader");
  const code = url.searchParams.get("code");

  if (code !== null) {
    try {
      const { lift, eTag } = await validateLiftCode(authData, code);
      logger.debug({ lift, eTag }, "Lift code validated successully");
      return data(actionSuccess({ lift, eTag }));
    } catch {
      return data(actionError(de.routes.beitreten.code.invalid), {
        status: 400,
      });
    }
  }
}

/**
 * Redeems the submitted lift code so that the user joins the associated
 * Verfahren.
 */
export async function action({ request, context }: Route.ActionArgs) {
  const authData = requireAuthData(context, "loader");
  const safeId = authData.authenticationTokens.idToken!;

  const formData = await request.formData();
  const code = formData.get("code") as string | null;
  const liftId = formData.get("liftId") as string | null;
  const liftETag = formData.get("liftEtag") as string | null;

  if (!code || !liftId || !liftETag) {
    return data(actionError("Missing parameters"), { status: 400 });
  }

  try {
    const { verfahrenId } = await performLift(authData, {
      code,
      liftId,
      liftETag,
      safeId,
    });
    logger.debug({ code, verfahrenId }, "Lift performed successfully");
    return redirect(`/verfahren/${verfahrenId}`);
  } catch {
    return data(actionError("TODO"), { status: 500 });
  }
}

export default function Beitreten() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const t = useTranslations();

  const code = searchParams.get("code") ?? undefined;
  const { lift, eTag } =
    loaderData?.status === "success" ? loaderData.data! : {};
  const error = loaderData?.status === "error" ? loaderData.error : undefined;

  return (
    <>
      <PageMetadata title={t.routes.beitreten.pageTitle} />

      <h1 className="kern-heading">{t.routes.beitreten.title}</h1>
      <p className="kern-subline">{t.routes.beitreten.subtitle}</p>

      {lift ? (
        <LiftConfirmationForm
          lift={lift}
          liftETag={eTag!}
          code={code!}
          verfahren={lift.verfahren}
        />
      ) : (
        <LiftCodeValidationForm initialCode={code} error={error} />
      )}
    </>
  );
}

function LiftCodeValidationForm({
  initialCode,
  error,
}: {
  initialCode?: string;
  error?: string;
}) {
  const t = useTranslations();

  return (
    <Form
      method="GET"
      className="kern-mt-md kern-px-lg kern-py-md kern-gap-lg flex flex-col rounded-(--kern-metric-border-radius-large) border border-(--kern-color-decorative-border-contextual)"
    >
      <InputField
        id="code"
        label={t.routes.beitreten.code.label}
        hint={t.routes.beitreten.code.hint}
        placeholder={t.routes.beitreten.code.placeholder}
        defaultValue={initialCode}
        errors={error ? [t.routes.beitreten.code.invalid] : undefined}
      />

      <div className="kern-gap-md flex justify-end">
        <Link to="/" className="kern-btn kern-btn--secondary">
          <span className="kern-label">{t.shared.cancel}</span>
        </Link>

        <button type="submit" className="kern-btn kern-btn--primary">
          <span className="kern-label">{t.routes.beitreten.validateCode}</span>
          <span
            className="kern-icon kern-icon--arrow-forward"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </Form>
  );
}

function LiftConfirmationForm({
  code,
  lift,
  liftETag,
  verfahren,
}: Readonly<{
  code: string;
  lift: LiftResponse;
  liftETag: string;
  verfahren: Verfahren;
}>) {
  const t = useTranslations();

  const klagende = getBeteiligteByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_KLAEGERIN,
  );
  const beklagte = getBeteiligteByRoleCode(
    verfahren.beteiligungen,
    ROLE_CODE_BEKLAGTE,
  );

  return (
    <Form method="POST" className="kern-mt-md kern-alert kern-alert--success">
      <input type="hidden" name="liftId" value={lift.id} />
      <input type="hidden" name="liftEtag" value={liftETag} />
      <input type="hidden" name="code" value={code} />

      <div className="kern-alert__header">
        <span
          className="kern-icon kern-icon--success"
          aria-hidden="true"
        ></span>
        <h2 className="kern-title">Verfahren gefunden</h2>
      </div>

      <div className="kern-alert__body kern-gap-md flex">
        <dl className="kern-description-list">
          <div className="kern-description-list-item">
            <dt className="kern-description-list-item__key">
              {t.shared.kurzrubrum.label}
            </dt>
            <dd className="kern-description-list-item__value">
              {verfahren.kurzrubrum ?? t.shared.missing}
            </dd>
          </div>

          <div className="kern-description-list-item">
            <dt className="kern-description-list-item__key">
              {t.shared.gericht.label}
            </dt>
            <dd className="kern-description-list-item__value">
              {verfahren.gericht?.wert ?? t.shared.unknown}
            </dd>
          </div>

          <div className="kern-description-list-item">
            <dt className="kern-description-list-item__key">
              {t.shared.gericht.azLabel}
            </dt>
            <dd className="kern-description-list-item__value">
              {verfahren.aktenzeichenGericht ?? t.shared.unknown}
            </dd>
          </div>

          <div className="kern-description-list-item">
            <dt className="kern-description-list-item__key">
              {t.shared.beteiligte.klaegerLabel}
            </dt>
            <dd className="kern-description-list-item__value">
              {klagende.map(getBeteiligteDisplayName).join(" ")}
            </dd>
          </div>

          <div className="kern-description-list-item">
            <dt className="kern-description-list-item__key">
              {t.shared.beteiligte.beklagteLabel}
            </dt>
            <dd className="kern-description-list-item__value">
              {beklagte.map(getBeteiligteDisplayName).join(" ")}
            </dd>
          </div>
        </dl>

        <Callout type="info" title={t.routes.beitreten.yourRole.title}>
          <span
            dangerouslySetInnerHTML={{
              __html: t.routes.beitreten.yourRole.description,
            }}
          />
        </Callout>

        <div className="kern-gap-md flex justify-end">
          <Link to="/beitreten" className="kern-btn kern-btn--secondary">
            <span
              className="kern-icon kern-icon--arrow-back"
              aria-hidden="true"
            ></span>
            <span className="kern-label">{t.buttons.prev}</span>
          </Link>

          <button type="submit" className="kern-btn kern-btn--primary">
            <span className="kern-label">
              {t.routes.beitreten.joinVerfahren}
            </span>
            <span
              className="kern-icon kern-icon--check"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>
    </Form>
  );
}
