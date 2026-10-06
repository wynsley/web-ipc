import { ScrollMotion } from "../../layouts/scrollMotion";
import { Image } from "../../atoms/image";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";

function WorkplaceTile({
  title,
  image,
  description,
  Icon,
  digital = false,
  delay = 0,
}) {
  if (digital) {
    return (
      <ScrollMotion
        as="article"
        delay={delay}
        y={32}
        scale={0.96}
        className="group relative min-w-0 overflow-hidden rounded-xl2 border border-blue-dark/15 bg-neutral-white p-6 transition-colors hover:border-orange sm:p-8"
      >
        {Icon && (
          <Icon aria-hidden="true" className="mb-8 size-9 text-blue-dark" />
        )}
        <Title
          level="h3"
          size="compact"
          weight="bold"
          variant="institutional"
          className="font-hani"
          text={title}
        />
        <Paragraph
          size="compact"
          className="mt-3 font-poppins leading-relaxed"
          text={description}
        />
        <span
          aria-hidden="true"
          className="mt-6 block h-1 w-10 rounded-full bg-orange"
        />
      </ScrollMotion>
    );
  }
  return (
    <ScrollMotion
      as="figure"
      delay={delay}
      y={32}
      scale={0.96}
      className="workplace-tile relative isolate min-w-0 overflow-hidden bg-blue-dark"
    >
      <Image
        src={image}
        alt={title}
        fill
        imageClassName="workplace-tile__image object-contain"
        decoding="async"
      />
    </ScrollMotion>
  );
}
export { WorkplaceTile };
