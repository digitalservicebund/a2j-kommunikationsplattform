export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export default function InputText({
  label,
  id,
  disabled,
  placeholder,
  onFocus,
  defaultValue,
}: Readonly<InputTextProps>) {
  return (
    <div className="kern-form-input">
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
