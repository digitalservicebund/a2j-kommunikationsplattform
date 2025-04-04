import { Check, Minus } from "lucide-react";
import { ReactNode } from "react";
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxGroupProps as AriaCheckboxGroupProps,
  CheckboxProps,
  ValidationResult,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "./utils";

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, "children"> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-2",
      )}
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}

const checkboxStyles = tv({
  base: "flex gap-2 items-center group transition",
  variants: {
    isDisabled: {
      false: "",
      true: "",
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: "w-40 h-40 shrink-0 rounded-sm flex items-center justify-center border-2 transition",
  variants: {
    isSelected: {
      false: "",
      true: "",
    },
    isInvalid: {
      true: "",
    },
    isDisabled: {
      true: "",
    },
  },
});

const iconStyles = "w-40 h-40";

/**
 * Markup needs to be reworked, to match Angie styles, e.g. the following angie CSS
 * definition can't be used by default: .ds-checkbox+label
 * Because in react-aria the <input /> is being rendered within a <span /> by default, which
 * is being rendered in a <label />
 *
 */
export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={boxStyles({
              isSelected: isSelected || isIndeterminate,
              ...renderProps,
            })}
          >
            {isIndeterminate ? (
              <Minus aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <Check aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  );
}
