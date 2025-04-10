import { useEffect, useState } from "react";
// import { useStringField } from "../utils/useStringField";
import InputError from "./InputError";
import RichText from "../RichText";

export enum CheckboxValue {
  on = "on",
  off = "off",
}

export type CheckboxProps = Readonly<{
  name: string;
  value?: string; // Defaults to "on", see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#value
  label?: string;
  // formId?: string;
  required?: boolean;
  errorMessage?: string;
  // idea: could get a onChange handler for controlled input handling use cases
  onChange?: () => void;
}>;

const Checkbox = ({
  name,
  value = CheckboxValue.on,
  label,
  // formId,
  required = false,
  errorMessage,
  onChange,
}: CheckboxProps) => {
  /**
   * Was `useStringField(name, { formId })``
   *
   * - second useStingFiled param { formId } has been removed due to @rvf/react-router
   * upgrade, see: https://www.rvf-js.io/reference/use-field
   * - depends on a React Context: Therefore ran into an error `Error: useFormContext
   * must be used within a FormProvider` and removed it from this test.
   */
  // const { error, getInputProps, defaultValue } = useStringField(name);
  const error = () => undefined;
  const defaultValue = undefined;

  const errorId = `${name}-error`;
  const className = `ds-checkbox forced-colors:outline forced-colors:border-[ButtonText] ${error() ? "has-error" : ""}`;
  // HTML Forms do not send unchecked checkboxes.
  // For server-side validation we need a same-named hidden field
  // For front-end validation, we need to hide that field if checkbox is checked
  // const alreadyChecked = defaultValue === value
  const [renderHiddenField, setRenderHiddenField] = useState(
    defaultValue !== value,
  );
  const [jsAvailable, setJsAvailable] = useState(false);
  useEffect(() => setJsAvailable(true), []);

  return (
    <div className="flex flex-col flex-nowrap">
      <div className="flex items-center">
        {(!jsAvailable || renderHiddenField) && (
          <input type="hidden" name={name} value={CheckboxValue.off} />
        )}
        <input
          // {...getInputProps({ type: "checkbox", id: name, value })}
          type="checkbox"
          id={name}
          value={value}
          className={className}
          aria-describedby={error() ? errorId : undefined}
          onClick={() => setRenderHiddenField(!renderHiddenField)}
          onChange={onChange}
          required={required}
          defaultChecked={defaultValue === value}
        />

        {label && (
          <label htmlFor={name}>
            <RichText html={label} />
          </label>
        )}
      </div>
      {error() && (
        <InputError id={errorId}>{errorMessage ?? error()}</InputError>
      )}
    </div>
  );
};

export default Checkbox;
