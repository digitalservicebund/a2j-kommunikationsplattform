import { InputHTMLAttributes } from "react";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
  optional?: boolean;
  hint?: string;
  error?: string;
}

export default function InputField({
  label,
  id,
  className = "",
  optional,
  disabled,
  hint,
  error,
  type = "text",
  ...inputProps
}: Readonly<InputFieldProps>) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div
      className={`kern-form-input ${error ? "kern-form-input--error" : ""} ${className}`.trim()}
    >
      <label className="kern-label" htmlFor={id}>
        {label}
        {optional && <span className="kern-label__optional">- Optional</span>}
      </label>
      {hint && (
        <div className="kern-hint" id={hintId}>
          {hint}
        </div>
      )}
      <input
        type={type}
        className={`kern-form-input__input ${error ? "kern-form-input__input--error" : ""}`.trim()}
        id={id}
        name={id}
        aria-disabled={disabled}
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
