import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Paragraph } from "../atoms/paragraph";

export function CheckboxField({ label, className = "", ...props }) {
  return (
    <Label
      className={`flex cursor-pointer items-start gap-3 font-normal ${className}`.trim()}
    >
      <Input type="checkbox" className="mt-0.5" {...props} />
      <Paragraph as="span" size="sm" variant="ink" text={label} />
    </Label>
  );
}
