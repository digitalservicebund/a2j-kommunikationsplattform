import { clsx } from "clsx";
import { InputEventHandler, useCallback, useState } from "react";
import {
  data,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useSearchParams,
} from "react-router";
import z from "zod";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import Callout from "~/components/Callout";
import Icon from "~/components/Icon";
import InputField from "~/components/InputField";
import InputSelect from "~/components/InputSelect";
import { PageMetadata } from "~/components/PageMetadata";
import { requireAuthSession } from "~/domains/verfahren/application/routeContext.server";
import {
  ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
} from "~/domains/verfahren/entities/codelisten/rollenbezeichnung.entity";
import { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import {
  LiftResponse,
  performLift,
  validateLiftCode,
} from "~/domains/verfahren/infrastructure/repositories/liftRepository.server";
import {
  getBeteiligteByRoleCode,
  getBeteiligteDisplayName,
} from "~/domains/verfahren/services/beteiligteByRole";
import preselectSafeId from "~/domains/verfahren/services/preselectSafeId";
import { authMiddleware } from "~/middleware/auth.server";
import { useTranslations } from "~/services/translations/context";
import { de } from "~/services/translations/de";
import { parseActionFormData } from "~/utils/actionInput";
import { actionError, actionSuccess } from "~/utils/actionResult";
import { isClientSideApiError as is4xxApiError } from "~/utils/apiError";
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
  const authSession = requireAuthSession(context, "loader");
  const code = url.searchParams.get("code");

  if (code !== null) {
    try {
      const { lift, eTag } = await validateLiftCode(authSession, code);
      logger.debug({ lift, eTag }, "Lift code validated successully");
      return data(
        actionSuccess({
          lift,
          eTag,
          safeId: authSession.safeId,
          authorizedForSafeIds: authSession.authorizedForSafeIds,
        }),
      );
    } catch (error) {
      const isCodeInvalid = is4xxApiError(error);
      const status = isCodeInvalid ? 400 : 500;
      const message = isCodeInvalid
        ? de.routes.beitreten.code.invalid
        : de.routes.beitreten.code.internalValidationError;
      return data(actionError(message), { status });
    }
  }

  return null;
}

function buildActionInputSchema(authorizedForSafeIds: string[]) {
  return z.object({
    code: z.string().min(1),
    liftId: z.string().min(1),
    liftETag: z.string().min(1),
    safeId: z
      .string()
      .refine((safeId) => authorizedForSafeIds.includes(safeId)),
  });
}

/**
 * Redeems the submitted lift code so that the user joins the associated
 * Verfahren with the selected SAFE-ID.
 */
export async function action({ request, context }: Route.ActionArgs) {
  const authSession = requireAuthSession(context, "action");

  const formData = await request.formData();
  const { code, liftId, liftETag, safeId } = parseActionFormData(
    formData,
    buildActionInputSchema(authSession.authorizedForSafeIds),
  );

  try {
    const { verfahrenId } = await performLift(authSession, {
      code,
      liftId,
      liftETag,
      safeId,
    });
    logger.debug({ code, verfahrenId }, "Lift performed successfully");
    return redirect(`/verfahren/${verfahrenId}`);
  } catch {
    return data(
      actionError(de.routes.beitreten.joinVerfahren.error.description),
      { status: 500 },
    );
  }
}

export default function Beitreten({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const t = useTranslations();

  const code = searchParams.get("code") ?? undefined;
  const lifted = loaderData?.status === "success" ? loaderData.data : undefined;
  const error = loaderData?.status === "error" ? loaderData.error : undefined;

  return (
    <>
      <PageMetadata title={t.routes.beitreten.pageTitle} />

      <h1 className="kern-heading">{t.routes.beitreten.title}</h1>
      <p className="kern-subline">{t.routes.beitreten.subtitle}</p>

      {lifted ? (
        <LiftConfirmationForm
          lift={lifted.lift}
          liftETag={lifted.eTag}
          code={code!}
          verfahren={lifted.lift.verfahren}
          safeId={lifted.safeId}
          authorizedForSafeIds={lifted.authorizedForSafeIds}
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
}: Readonly<{
  initialCode?: string;
  error?: string;
}>) {
  const t = useTranslations();

  const handleCodeBeforeInput = useCallback<
    InputEventHandler<HTMLInputElement>
  >((e) => {
    // Allow only letters, numbers and dashes to be inserted, which are the
    // only characters allowed in lift codes.
    if (e.data && !/^[a-zA-Z0-9-]+$/.test(e.data)) {
      e.preventDefault();
    }
  }, []);

  return (
    <Form
      method="GET"
      className={clsx(
        "kern-mt-md",
        "kern-px-lg",
        "kern-py-md",
        "kern-gap-lg",
        "flex",
        "flex-col",
        "rounded-(--kern-metric-border-radius-large)",
        "border",
        "border-(--kern-color-decorative-border-contextual)",
      )}
    >
      <InputField
        id="code"
        inputClassName="uppercase placeholder:normal-case"
        label={t.routes.beitreten.code.label}
        hint={t.routes.beitreten.code.hint}
        placeholder={t.routes.beitreten.code.placeholder}
        onBeforeInput={handleCodeBeforeInput}
        defaultValue={initialCode}
        errors={error ? [t.routes.beitreten.code.invalid] : undefined}
      />

      <div className="kern-gap-md flex justify-end">
        <Link to="/" className="kern-btn kern-btn--secondary">
          <span className="kern-label">{t.shared.cancel}</span>
        </Link>

        <Button
          type="submit"
          appearance="primary"
          label={t.routes.beitreten.validateCode}
          icon="arrow-forward"
          iconPosition="trailing"
        />
      </div>
    </Form>
  );
}

function LiftConfirmationForm({
  code,
  lift,
  liftETag,
  verfahren,
  safeId,
  authorizedForSafeIds,
}: Readonly<{
  code: string;
  lift: LiftResponse;
  liftETag: string;
  verfahren: Verfahren;
  safeId: string | null;
  authorizedForSafeIds: string[];
}>) {
  const t = useTranslations();
  const actionData = useActionData();
  const [selectedSafeId, setSelectedSafeId] = useState(
    preselectSafeId(safeId, authorizedForSafeIds),
  );

  const klagende = getBeteiligteByRoleCode(
    verfahren.beteiligungen,
    ROLLENBEZEICHNUNG_CODE_KLAEGERIN,
  );
  const beklagte = getBeteiligteByRoleCode(
    verfahren.beteiligungen,
    ROLLENBEZEICHNUNG_CODE_BEKLAGTE,
  );

  return (
    <Form method="POST" className="kern-mt-md kern-alert kern-alert--success">
      <input type="hidden" name="liftId" value={lift.id} />
      <input type="hidden" name="liftETag" value={liftETag} />
      <input type="hidden" name="code" value={code} />

      <div className="kern-alert__header">
        <Icon name="success" />
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

        <InputSelect
          id="safeId"
          label={t.routes.safeIdAuswahl.label}
          hint={t.routes.safeIdAuswahl.intro}
          options={authorizedForSafeIds.map((id) => ({ value: id, label: id }))}
          selectedValue={selectedSafeId}
          onChange={(event) => setSelectedSafeId(event.target.value)}
        />

        <Callout type="info" title={t.routes.beitreten.yourRole.title}>
          <span
            dangerouslySetInnerHTML={{
              __html: t.routes.beitreten.yourRole.description,
            }}
          />
        </Callout>

        {actionData?.error && (
          <Alert
            type="error"
            title={t.routes.beitreten.joinVerfahren.error.title}
            message={actionData.error}
          ></Alert>
        )}

        <div className="kern-gap-md flex justify-end">
          <Link to="/beitreten" className="kern-btn kern-btn--secondary">
            <Icon name="arrow-back" />
            <span className="kern-label">{t.buttons.prev}</span>
          </Link>

          <Button
            type="submit"
            appearance="primary"
            label={t.routes.beitreten.joinVerfahren.label}
            icon="check"
            iconPosition="trailing"
          />
        </div>
      </div>
    </Form>
  );
}
