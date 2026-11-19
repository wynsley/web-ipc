import { twMerge } from "tailwind-merge";

const variants = {
  institutional: "border border-blue-light/25 bg-blue/15 text-blue-light",
  neutral: "border border-line bg-soft text-muted",
  light: "border border-white/15 bg-white/10 text-ink",
  warning: "border border-[#f59e0b]/30 bg-[#f59e0b]/12 text-[#fbbf24]",
  danger: "border border-[#f87171]/30 bg-[#ef4444]/12 text-[#fca5a5]",
  success: "border border-[#34d399]/30 bg-[#10b981]/12 text-[#6ee7b7]",
};

export function Badge({
  text,
  children,
  variant = "institutional",
  className = "",
  ...props
}) {
  return (
    <span
      className={twMerge(
        "inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-0.5 font-poppins text-xs font-semibold tracking-tight",
        variants[variant] || variants.institutional,
        className,
      )}
      {...props}
    >
      {children || text}
    </span>
  );
}
