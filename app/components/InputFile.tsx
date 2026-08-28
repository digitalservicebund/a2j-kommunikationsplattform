import { InputHTMLAttributes, Ref } from "react";

export interface InputFileProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  id: string;
  className?: string;
  hint?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export default function InputFile({
  label,
  id,
  className = "",
  hint,
  error,
  ref,
  ...inputProps
}: Readonly<InputFileProps>) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div
      className={`kern-form-input ${error ? "kern-form-input--error" : ""} ${className}`.trim()}
    >
      <label className="kern-label" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <div className="kern-hint" id={hintId}>
          {hint}
        </div>
      )}
      <input
        ref={ref}
        type="file"
        className={`kern-form-input__input ${error ? "kern-form-input__input--error" : ""}`.trim()}
        id={id}
        name={id}
        aria-describedby={
          [hintId, errorId].filter(Boolean).join(" ") || undefined
        }
        {...inputProps}
      />
      {error && (
        <p className="kern-error" id={errorId}>
          <span
            className="kern-icon kern-icon--danger kern-icon--md"
            aria-hidden="true"
          ></span>
          <span className="kern-body">{error}</span>
        </p>
      )}
    </div>
  );
}
