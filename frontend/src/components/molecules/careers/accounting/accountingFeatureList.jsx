import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";
import { BannerBgCurve } from "@/components/molecules/shared/curvePath";

function AccountingFeatureList({ title, items, mirrored = false }) {
  return (
    <article
      className={`relative h-full bg-neutral-white px-6 pt-7 pb-20 ${
        mirrored
          ? "[clip-path:polygon(24px_0,100%_0,100%_100%,0_100%,0_24px)]"
          : "[clip-path:polygon(0_0,calc(100%-24px)_0,100%_24px,100%_100%,0_100%)]"
      }`}
    >
      <Title
        level="h4"
        size="compact"
        variant="secondary"
        weight="bold"
        className="font-hani"
      >
        {title}
      </Title>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 size-1 shrink-0 rounded-full bg-blue-dark/50"
            />
            <Paragraph
              size="compact"
              className="font-poppins leading-relaxed text-neutral-black/85"
            >
              {item}
            </Paragraph>
          </li>
        ))}
      </ul>
      <BannerBgCurve
        design={7}
        color="var(--color-blue-dark)"
        accentColor="var(--color-orange)"
        secondaryAccentColor="var(--color-blue-light)"
        height="h-12"
        className={mirrored ? "-scale-x-100" : ""}
      />
    </article>
  );
}

export { AccountingFeatureList };
