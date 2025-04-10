// not used for this test so far (introduced with ../inputs/Checkbox component)
import { useField } from "@rvf/react-router";

export function useStringField(
  name: string,
  options?: Parameters<typeof useField>[1],
) {
  const { defaultValue, ...props } = useField(name, options);
  return {
    ...props,
    defaultValue: typeof defaultValue === "string" ? defaultValue : undefined,
  };
}
