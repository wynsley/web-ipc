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
  inverse = false,
}) {
  return (
    <ScrollReveal className={className}>
      <div>
        <Paragraph
          as="span"
          className={`mb-4 block font-poppins text-xs tracking-[0.2em] uppercase ${inverse ? "text-neutral-white/75" : "text-blue"}`}
        >
          {eyebrow}
        </Paragraph>
        <Title
          id={id}
          level="h2"
          variant={inverse ? "secondary" : "institutional"}
          weight="bold"
          className="font-hani leading-tight"
          text={title}
        />
      </div>
      <Paragraph
        size="compact"
        variant={inverse ? "primary" : "default"}
        className={`font-poppins leading-relaxed ${descriptionClassName}`}
        text={description}
      />
    </ScrollReveal>
  );
}

export { CareerSectionHeading };
