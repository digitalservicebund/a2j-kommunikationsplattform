import { clsx } from "clsx";
import { ReactNode } from "react";
import { useTranslations } from "~/services/translations/context";

export interface InputLabelProps {
  htmlFor: string;
  children: ReactNode;
  // https://www.kern-ux.de/komponenten/form-inputs/text#optional
  optional?: boolean;
  className?: string;
}

export default function InputLabel({
  htmlFor,
  children,
  optional = false,
  className,
}: Readonly<InputLabelProps>) {
  const t = useTranslations();

  return (
    <label className={clsx("kern-label", className)} htmlFor={htmlFor}>
      {children}
      {optional && (
        <>
          {" "}
          <span className="kern-label__optional">
            {t.shared.form.optionalSuffix}
          </span>
        </>
      )}
    </label>
  );
}
