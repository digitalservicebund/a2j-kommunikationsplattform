export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
  optional?: boolean;
}

export default function InputText({
  label,
  id,
  className = "",
  optional,
  disabled,
  ...inputProps
}: Readonly<InputTextProps>) {
  return (
    <div className={`kern-form-input ${className}`}>
      <label className="kern-label" htmlFor={id}>
        {label}
        {optional && <span className="kern-label__optional">- Optional</span>}
      </label>
      <input
        type="text"
        className="kern-form-input__input"
        id={id}
        name={id}
        aria-disabled={disabled}
        {...inputProps}
      />
    </div>
  );
}
