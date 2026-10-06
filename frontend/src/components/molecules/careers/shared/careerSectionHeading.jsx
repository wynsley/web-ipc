import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function CareerSectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
  descriptionClassName = "",
}) {
  return (
    <ScrollReveal className={className}>
      <div>
        <Paragraph
          as="span"
          className="mb-4 block font-poppins text-xs tracking-[0.2em] text-blue uppercase"
        >
          {eyebrow}
        </Paragraph>
        <Title
          id={id}
          level="h2"
          variant="institutional"
          weight="bold"
          className="font-hani leading-tight"
          text={title}
        />
      </div>
      <Paragraph
        size="compact"
        className={`font-poppins leading-relaxed ${descriptionClassName}`}
        text={description}
      />
    </ScrollReveal>
  );
}

export { CareerSectionHeading };
