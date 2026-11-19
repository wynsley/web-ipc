import { twMerge } from "tailwind-merge";

const base =
  "min-h-28 w-full rounded-lg border bg-soft px-3.5 py-2.5 font-poppins text-base text-ink transition-colors duration-150 placeholder:text-muted/65 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60";

export function Textarea({
  id,
  name,
  value,
  defaultValue,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  rows = 4,
  error = false,
  className = "",
  ...props
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      disabled={disabled}
      rows={rows}
      aria-invalid={error || undefined}
      className={twMerge(
        base,
        error
          ? "border-[#f87171] bg-[#ef4444]/10"
          : "border-line hover:border-blue-light/50",
        className,
      )}
      {...props}
    />
  );
}
