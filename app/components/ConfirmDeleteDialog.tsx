import { useId, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import { useTranslations } from "~/services/translations/context";
import type { ActionResult } from "~/utils/actionResult";

type ConfirmDeleteDialogProps = {
  formType: string;
  fields?: Record<string, string>;
  title: string;
  message: string;
};

/**
 * A dialog that is opened by the "Löschen" button, asking for confirmation
 * before the delete form is submitted to the current route's action.
 */
export default function ConfirmDeleteDialog({
  formType,
  fields = {},
  title,
  message,
}: Readonly<ConfirmDeleteDialogProps>) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const navigation = useNavigation();
  const actionData = useActionData<ActionResult<{ formType?: string }>>();

  const isDeleting =
    navigation.state !== "idle" &&
    navigation.formData?.get("formType") === formType;
  // The action data outlives the dialog, so an error is hidden once the
  // dialog has been closed, until the next attempt returns a new one
  const [dismissedActionData, setDismissedActionData] = useState(actionData);
  const deleteError =
    actionData !== dismissedActionData &&
    actionData?.status === "error" &&
    actionData.data?.formType === formType
      ? actionData.error
      : null;

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <Button
        appearance="secondary"
        type="button"
        className="border-feedback-danger"
        onClick={() => dialogRef.current?.showModal()}
      >
        <span
          className="kern-icon kern-icon--delete bg-feedback-danger"
          aria-hidden="true"
        />
        <span className="kern-label text-feedback-danger">
          {t.shared.form.confirmDelete.open}
        </span>
      </Button>

      <dialog
        ref={dialogRef}
        className="kern-dialog"
        aria-labelledby={titleId}
        // Also fired when closed with the Escape key
        onClose={() => setDismissedActionData(actionData)}
      >
        <Form method="post" preventScrollReset replace>
          <input type="hidden" name="formType" value={formType} />
          {Object.entries(fields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}

          <header className="kern-dialog__header">
            <h2 id={titleId} className="kern-title">
              {title}
            </h2>
          </header>
          <section className="kern-dialog__body">
            <p className="kern-body">{message}</p>
            {deleteError && <Alert type="error" title={deleteError} />}
          </section>
          <footer className="kern-dialog__footer">
            <Button
              appearance="secondary"
              type="button"
              onClick={closeDialog}
              label={t.shared.cancel}
            />
            <Button
              appearance="primary"
              type="submit"
              className="bg-feedback-danger enabled:hover:bg-feedback-danger-hover enabled:active:bg-feedback-danger-active"
              disabled={isDeleting}
              label={t.shared.form.confirmDelete.confirm}
            />
          </footer>
        </Form>
      </dialog>
    </>
  );
}
