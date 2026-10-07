import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

function ComputingJourneyHeading({
  title,
  eyebrow,
  id,
  className = "",
}) {

  return (
    <div className={className}>
      <Paragraph
        as="span"
        className="mb-3 block font-poppins text-xs tracking-[0.2em] text-orange uppercase"
      >
        {eyebrow}
      </Paragraph>
      <Title
        id={id}
        level="h2"
        weight="bold"
        variant="primary"
        className="font-hani text-[clamp(1.6rem,3vw,3rem)]! leading-tight"
        text={title}
      />
    </div>
  );
}

export { ComputingJourneyHeading };
