import { twMerge } from "tailwind-merge";

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 rounded-lg border-0 font-poppins font-semibold transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55";

const sizes = {
  small: "min-h-10 px-3.5 py-2 text-sm",
  sm: "min-h-10 px-3.5 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-[0.94rem]",
  lg: "min-h-12 px-6 py-3 text-base",
};

const variants = {
  default: "",
  primary:
    "border border-blue-light/25 bg-blue text-white hover:bg-[#1d4ed8]",
  secondary:
    "border border-line bg-soft text-ink hover:border-blue-light/40 hover:bg-[#1f2b42]",
  outline:
    "border border-line bg-card text-ink hover:border-blue-light/40 hover:bg-soft",
  light:
    "border border-white/15 bg-white/10 text-ink hover:bg-white/18",
  danger:
    "border border-[#f87171]/30 bg-[#991b1b] text-white hover:bg-[#7f1d1d]",
  link: "min-h-10 bg-transparent px-1 py-1.5 text-sm font-semibold text-blue-light hover:text-white hover:underline active:translate-y-0",
};

export function Button({
  text,
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        base,
        sizes[size] || sizes.md,
        variants[variant] ?? variants.primary,
        className,
      )}
      {...props}
    >
      {text && children ? (
        <>
          {text} {children}
        </>
      ) : (
        text || children
      )}
    </button>
  );
}
