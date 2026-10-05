import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function ComputingJourneyHeading({
  title,
  eyebrow,
  id,
  decorative = false,
  className = "",
}) {
  const Heading = decorative ? Paragraph : Title;
  const headingProps = decorative ? {} : { id, level: "h2" };

  return (
    <div className={className} aria-hidden={decorative || undefined}>
      <span className="mb-3 block font-poppins text-xs tracking-[0.2em] text-orange uppercase">
        {eyebrow}
      </span>
      <Heading
        {...headingProps}
        weight="bold"
        variant="primary"
        className="font-hani text-[clamp(1.6rem,3vw,3rem)]! leading-tight"
        text={title}
      />
    </div>
  );
}

export { ComputingJourneyHeading };
