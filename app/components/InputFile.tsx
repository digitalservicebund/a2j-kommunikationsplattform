import { InputHTMLAttributes, Ref } from "react";
import InputLabel from "./InputLabel";

export interface InputFileProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  id: string;
  className?: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export default function InputFile({
  label,
  id,
  className = "",
  optional,
  hint,
  error,
  accept,
  ref,
  required,
  "aria-required": ariaRequired,
  ...inputProps
}: Readonly<InputFileProps>) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div
      className={`kern-form-input ${error ? "kern-form-input--error" : ""} ${className}`.trim()}
    >
      <InputLabel htmlFor={id} optional={optional}>
        {label}
      </InputLabel>
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
        accept={accept}
        aria-required={required || ariaRequired || undefined}
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
