import { twMerge } from "tailwind-merge";

const textBase =
  "min-h-11 w-full rounded-lg border bg-soft px-3.5 py-2.5 font-poppins text-base text-ink transition-colors duration-150 placeholder:text-muted/65 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60";

const checkboxBase =
  "size-5 shrink-0 cursor-pointer rounded accent-blue-light focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60";

export function Input({
  id,
  type = "text",
  name,
  value,
  defaultValue,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  error = false,
  className = "",
  ...props
}) {
  const isCheckbox = type === "checkbox";
  const isCustomControl = type === "radio" || type === "file";

  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      disabled={disabled}
      aria-invalid={error || undefined}
      className={twMerge(
        isCheckbox
          ? checkboxBase
          : isCustomControl
            ? ""
            : twMerge(
                textBase,
                error
                  ? "border-[#f87171] bg-[#ef4444]/10"
                  : "border-line hover:border-blue-light/50",
              ),
        className,
      )}
      {...props}
    />
  );
}
