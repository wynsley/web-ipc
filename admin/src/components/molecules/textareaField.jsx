import { useId } from "react";
import { Label } from "../atoms/label";
import { Paragraph } from "../atoms/paragraph";
import { Textarea } from "../atoms/textarea";

export function TextareaField({
  label,
  className = "",
  errorMessage,
  ...props
}) {
  const id = useId();
  return (
    <div className={`grid gap-1.5 ${className}`.trim()}>
      <Label htmlFor={id} text={label} />
      <Textarea
        id={id}
        {...props}
        error={Boolean(errorMessage) || props.error}
        aria-describedby={
          [props["aria-describedby"], errorMessage && `${id}-error`]
            .filter(Boolean)
            .join(" ") || undefined
        }
      />
      {errorMessage && (
        <Paragraph
          id={`${id}-error`}
          size="sm"
          variant="danger"
          text={errorMessage}
        />
      )}
    </div>
  );
}
