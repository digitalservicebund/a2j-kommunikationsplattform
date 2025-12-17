export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
}

export default function InputText({
  label,
  id,
  disabled,
  placeholder,
  onFocus,
  defaultValue,
  className = "",
}: Readonly<InputTextProps>) {
  return (
    <div className={`kern-form-input ${className}`}>
      <label className="kern-label" htmlFor={id}>
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        onFocus={onFocus}
        className="kern-form-input__input"
        id={id}
        name={id}
        type="text"
        placeholder={placeholder || ""}
        aria-disabled={disabled}
      />
    </div>
  );
}
