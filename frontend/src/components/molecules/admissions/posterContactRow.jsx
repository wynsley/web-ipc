import { Paragraph } from "@/components/atoms/paragraph";

function PosterContactRow({ icon, children, className }) {
  const Icon = icon;

  return (
    <Paragraph
      size="inherit"
      variant="inherit"
      className={`flex items-center gap-[2cqw] leading-tight ${className}`}
    >
      <Icon
        aria-hidden="true"
        className="size-[5cqw] shrink-0 rounded-full border border-orange p-[0.5cqw] text-orange"
      />
      {children}
    </Paragraph>
  );
}

export { PosterContactRow };
