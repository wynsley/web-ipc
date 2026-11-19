import { twMerge } from "tailwind-merge";

const variants = {
  ghost:
    "bg-transparent text-muted hover:bg-white/10 hover:text-ink",
  soft: "border border-line bg-soft text-blue-light hover:border-blue-light/40 hover:bg-blue hover:text-white",
  light: "bg-white/10 text-white hover:bg-white/20",
};

export function IconButton({
  label,
  children,
  type = "button",
  variant = "ghost",
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "inline-grid h-9 w-9 cursor-pointer place-items-center rounded-md border-0 transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant] || variants.ghost,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
