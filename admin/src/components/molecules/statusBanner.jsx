import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { Paragraph } from "../atoms/paragraph";

const styles = {
  info: {
    box: "border-blue-light/25 bg-blue/12 text-blue-light",
    Icon: FiInfo,
    variant: "institutional",
  },
  success: {
    box: "border-[#34d399]/30 bg-[#10b981]/12 text-[#a7f3d0]",
    Icon: FiCheckCircle,
    variant: "ink",
  },
  danger: {
    box: "border-[#f87171]/30 bg-[#ef4444]/12 text-[#fca5a5]",
    Icon: FiAlertCircle,
    variant: "danger",
  },
};

export function StatusBanner({
  text,
  children,
  variant = "info",
  role = "status",
  className = "",
  ...props
}) {
  if (!text && !children) return null;
  const config = styles[variant] || styles.info;
  const { Icon } = config;

  return (
    <div
      {...props}
      role={role}
      className={twMerge(
        "flex items-start gap-2.5 rounded-lg border px-3.5 py-3",
        config.box,
        className,
      )}
    >
      <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-lg" />
      <Paragraph
        size="sm"
        variant={config.variant}
        className="text-current"
        text={text}
      >
        {children}
      </Paragraph>
    </div>
  );
}
